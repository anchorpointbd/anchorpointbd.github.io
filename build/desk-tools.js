const byId=id=>document.getElementById(id);
const displayNumber=(value,digits=10)=>{
  if(!Number.isFinite(value))throw new Error('The result is not finite. Check the expression or units.');
  if(value!==0&&(Math.abs(value)>=1e10||Math.abs(value)<1e-7))return value.toExponential(Math.min(digits,12));
  return Number(value.toPrecision(digits)).toLocaleString('en-US',{maximumFractionDigits:digits});
};

class ExpressionParser{
  constructor(text,mode){this.text=text;this.mode=mode;this.tokens=this.tokenize(text);this.index=0;}
  tokenize(text){
    const tokens=[];let i=0;
    while(i<text.length){
      const rest=text.slice(i),space=rest.match(/^\s+/);if(space){i+=space[0].length;continue;}
      const number=rest.match(/^(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?/i);if(number){tokens.push({type:'number',value:Number(number[0])});i+=number[0].length;continue;}
      const name=rest.match(/^[a-z]+/i);if(name){tokens.push({type:'name',value:name[0].toLowerCase()});i+=name[0].length;continue;}
      const char=rest[0];if('+-*/^()%'.includes(char)){tokens.push({type:char,value:char});i++;continue;}
      throw new Error('Unsupported character near “'+rest.slice(0,8)+'”.');
    }
    tokens.push({type:'end'});return tokens;
  }
  peek(type){return this.tokens[this.index].type===type;}
  take(type){if(!this.peek(type))throw new Error('Expected “'+type+'”.');return this.tokens[this.index++];}
  parse(){const result=this.expression();if(!this.peek('end'))throw new Error('Check the expression after “'+this.tokens[this.index].value+'”.');return result;}
  expression(){let value=this.term();while(this.peek('+')||this.peek('-')){const op=this.tokens[this.index++].type,value2=this.term();value=op==='+'?value+value2:value-value2;}return value;}
  term(){let value=this.unary();while(this.peek('*')||this.peek('/')){const op=this.tokens[this.index++].type,value2=this.unary();if(op==='/'&&value2===0)throw new Error('Division by zero is undefined.');value=op==='*'?value*value2:value/value2;}return value;}
  unary(){if(this.peek('+')){this.index++;return this.unary();}if(this.peek('-')){this.index++;return-this.unary();}return this.power();}
  power(){let value=this.primary();if(this.peek('^')){this.index++;value=Math.pow(value,this.unary());}return value;}
  primary(){
    let value;
    if(this.peek('number'))value=this.take('number').value;
    else if(this.peek('(')){this.index++;value=this.expression();this.take(')');}
    else if(this.peek('name')){
      const name=this.take('name').value;
      if(name==='pi')value=Math.PI;else if(name==='e')value=Math.E;else{this.take('(');const argument=this.expression();this.take(')');value=this.call(name,argument);}
    }else throw new Error('Expected a number, constant, function or parenthesis.');
    while(this.peek('%')){this.index++;value/=100;}return value;
  }
  toRadians(value){return this.mode==='deg'?value*Math.PI/180:this.mode==='grad'?value*Math.PI/200:value;}
  fromRadians(value){return this.mode==='deg'?value*180/Math.PI:this.mode==='grad'?value*200/Math.PI:value;}
  call(name,value){
    const direct={sqrt:Math.sqrt,log:Math.log10,ln:Math.log,abs:Math.abs,exp:Math.exp,floor:Math.floor,ceil:Math.ceil,round:Math.round};
    if(direct[name])return direct[name](value);
    if(['sin','cos','tan'].includes(name))return Math[name](this.toRadians(value));
    if(['asin','acos','atan'].includes(name))return this.fromRadians(Math[name](value));
    throw new Error('Unknown function “'+name+'”.');
  }
}

const scienceInput=byId('scienceExpression'),scienceResult=byId('scienceResult'),scienceProcess=byId('scienceProcess'),scienceHistory=byId('scienceHistory');
const scienceRecords=[];
const evaluateScience=()=>{
  try{
    const expression=scienceInput.value.trim();if(!expression)throw new Error('Enter an expression.');
    const mode=byId('angleMode').value,digits=Number(byId('sciencePrecision').value),value=new ExpressionParser(expression,mode).parse(),formatted=displayNumber(value,digits);
    scienceResult.textContent=formatted;scienceProcess.textContent='Expression: '+expression+'\nAngle mode: '+({deg:'degrees',rad:'radians',grad:'gradians'}[mode])+'\nResult shown to '+digits+' significant digits. Recheck domain, units and applicability before consequential use.';
    scienceRecords.unshift({expression,result:formatted});scienceRecords.splice(8);scienceHistory.innerHTML=scienceRecords.map(item=>'<li><b>'+item.result+'</b>'+item.expression.replace(/[<>&]/g,char=>({'<':'&lt;','>':'&gt;','&':'&amp;'}[char]))+'</li>').join('');
  }catch(error){scienceResult.textContent='Check input';scienceProcess.textContent=error.message;}
};
document.querySelectorAll('.scientific-keys button').forEach(button=>button.addEventListener('click',()=>{
  const action=button.dataset.action;
  if(action==='evaluate'){evaluateScience();return;}if(action==='clear'){scienceInput.value='';scienceResult.textContent='—';scienceProcess.textContent='Expression cleared.';scienceInput.focus();return;}if(action==='back'){scienceInput.value=scienceInput.value.slice(0,-1);scienceInput.focus();return;}
  scienceInput.value+=button.dataset.token||'';scienceInput.focus();
}));
scienceInput?.addEventListener('keydown',event=>{if(event.key==='Enter'){event.preventDefault();evaluateScience();}});
byId('angleMode')?.addEventListener('change',evaluateScience);byId('sciencePrecision')?.addEventListener('change',evaluateScience);
document.querySelectorAll('[data-expression]').forEach(button=>button.addEventListener('click',()=>{if(!scienceInput)return;scienceInput.value=button.dataset.expression||'';evaluateScience();scienceInput.focus()}));

const quantityData={
  length:{label:'Length',base:'m',sectors:['everyday','civil','mechanical','marine','materials'],units:{m:['metre',1],km:['kilometre',1000],cm:['centimetre',.01],mm:['millimetre',.001],'µm':['micrometre',1e-6],in:['inch',.0254],ft:['foot',.3048],yd:['yard',.9144],mi:['mile',1609.344],nmi:['nautical mile',1852]}},
  area:{label:'Area',base:'m²',sectors:['everyday','civil','marine'],units:{'m²':['square metre',1],'km²':['square kilometre',1e6],'cm²':['square centimetre',1e-4],'mm²':['square millimetre',1e-6],ha:['hectare',1e4],acre:['acre',4046.8564224],'ft²':['square foot',.09290304],'in²':['square inch',.00064516]}},
  volume:{label:'Volume',base:'m³',sectors:['everyday','civil','mechanical','marine'],units:{'m³':['cubic metre',1],L:['litre',.001],mL:['millilitre',1e-6],'ft³':['cubic foot',.028316846592],'in³':['cubic inch',1.6387064e-5],'US gal':['US gallon',.003785411784],'Imp gal':['imperial gallon',.00454609],bbl:['oil barrel',.158987294928]}},
  mass:{label:'Mass',base:'kg',sectors:['everyday','mechanical','marine','materials'],units:{kg:['kilogram',1],g:['gram',.001],mg:['milligram',1e-6],t:['metric tonne',1000],lb:['pound',.45359237],oz:['ounce',.028349523125],slug:['slug',14.59390294]}},
  time:{label:'Time',base:'s',sectors:['everyday','business'],units:{s:['second',1],min:['minute',60],h:['hour',3600],day:['day',86400],week:['week',604800],year:['365-day year',31536000]}},
  speed:{label:'Speed',base:'m/s',sectors:['everyday','mechanical','marine'],units:{'m/s':['metre per second',1],'km/h':['kilometre per hour',.2777777777778],'ft/s':['foot per second',.3048],mph:['mile per hour',.44704],kn:['knot',.5144444444444]}},
  acceleration:{label:'Acceleration',base:'m/s²',sectors:['mechanical','marine'],units:{'m/s²':['metre per second squared',1],'ft/s²':['foot per second squared',.3048],g0:['standard gravity',9.80665],Gal:['galileo',.01]}},
  pressure:{label:'Pressure',base:'Pa',sectors:['civil','mechanical','marine','energy'],units:{Pa:['pascal',1],kPa:['kilopascal',1e3],MPa:['megapascal',1e6],bar:['bar',1e5],mbar:['millibar',100],psi:['pound per square inch',6894.757293168],'kgf/cm²':['kilogram-force per square centimetre',98066.5],mmHg:['millimetre of mercury',133.322387415],'mH₂O':['metre of water',9806.65]}},
  force:{label:'Force',base:'N',sectors:['civil','mechanical','marine','materials'],units:{N:['newton',1],kN:['kilonewton',1000],MN:['meganewton',1e6],kgf:['kilogram-force',9.80665],lbf:['pound-force',4.4482216152605]}},
  energy:{label:'Energy and work',base:'J',sectors:['everyday','mechanical','marine','energy'],units:{J:['joule',1],kJ:['kilojoule',1e3],MJ:['megajoule',1e6],Wh:['watt-hour',3600],kWh:['kilowatt-hour',3.6e6],BTU:['international table BTU',1055.05585262],kcal:['kilocalorie',4184],'ft·lbf':['foot pound-force',1.3558179483314]}},
  power:{label:'Power',base:'W',sectors:['everyday','mechanical','marine','electrical','energy'],units:{W:['watt',1],kW:['kilowatt',1000],MW:['megawatt',1e6],'hp (mech)':['mechanical horsepower',745.699871582],'hp (metric)':['metric horsepower',735.49875],'BTU/h':['BTU per hour',.293071070172],'TR':['ton of refrigeration',3516.85284207]}},
  temperature:{label:'Temperature',base:'K',sectors:['everyday','mechanical','marine','energy','materials'],special:'temperature',units:{'°C':['degree Celsius',1],'°F':['degree Fahrenheit',1],K:['kelvin',1],'°R':['degree Rankine',1]}},
  angle:{label:'Plane angle',base:'rad',sectors:['everyday','civil','mechanical','marine'],units:{rad:['radian',1],deg:['degree',Math.PI/180],grad:['gradian',Math.PI/200],turn:['turn',2*Math.PI]}},
  flow:{label:'Volumetric flow',base:'m³/s',sectors:['civil','mechanical','marine','energy'],units:{'m³/s':['cubic metre per second',1],'m³/h':['cubic metre per hour',1/3600],'L/s':['litre per second',.001],'L/min':['litre per minute',.001/60],'US gpm':['US gallon per minute',.003785411784/60],'Imp gpm':['imperial gallon per minute',.00454609/60],cfs:['cubic foot per second',.028316846592]}},
  massflow:{label:'Mass flow',base:'kg/s',sectors:['mechanical','marine','energy'],units:{'kg/s':['kilogram per second',1],'kg/h':['kilogram per hour',1/3600],'t/h':['tonne per hour',1000/3600],'lb/h':['pound per hour',.45359237/3600]}},
  density:{label:'Density',base:'kg/m³',sectors:['civil','mechanical','marine','materials'],units:{'kg/m³':['kilogram per cubic metre',1],'g/cm³':['gram per cubic centimetre',1000],'kg/L':['kilogram per litre',1000],'lb/ft³':['pound per cubic foot',16.01846337396],'lb/US gal':['pound per US gallon',119.826427316]}},
  torque:{label:'Torque',base:'N·m',sectors:['mechanical','marine'],units:{'N·m':['newton metre',1],'kN·m':['kilonewton metre',1000],'N·mm':['newton millimetre',.001],'kgf·m':['kilogram-force metre',9.80665],'lbf·ft':['pound-force foot',1.3558179483314],'lbf·in':['pound-force inch',.1129848290276]}},
  frequency:{label:'Frequency and rotation rate',base:'Hz',sectors:['mechanical','marine','electrical'],units:{Hz:['hertz',1],kHz:['kilohertz',1e3],MHz:['megahertz',1e6],GHz:['gigahertz',1e9],rpm:['revolution per minute',1/60]}},
  dynamicViscosity:{label:'Dynamic viscosity',base:'Pa·s',sectors:['mechanical','marine','energy','materials'],units:{'Pa·s':['pascal second',1],'mPa·s':['millipascal second',.001],cP:['centipoise',.001],P:['poise',.1]}},
  kinematicViscosity:{label:'Kinematic viscosity',base:'m²/s',sectors:['mechanical','marine','energy'],units:{'m²/s':['square metre per second',1],'mm²/s':['square millimetre per second',1e-6],cSt:['centistokes',1e-6],St:['stokes',1e-4],'ft²/s':['square foot per second',.09290304]}},
  data:{label:'Digital information',base:'B',sectors:['everyday','computing'],units:{bit:['bit',.125],B:['byte',1],kB:['kilobyte (decimal)',1e3],MB:['megabyte (decimal)',1e6],GB:['gigabyte (decimal)',1e9],TB:['terabyte (decimal)',1e12],KiB:['kibibyte',1024],MiB:['mebibyte',1048576],GiB:['gibibyte',1073741824]}},
  current:{label:'Electric current',base:'A',sectors:['electrical'],units:{A:['ampere',1],mA:['milliampere',.001],µA:['microampere',1e-6],kA:['kiloampere',1000]}},
  voltage:{label:'Electric potential',base:'V',sectors:['electrical'],units:{V:['volt',1],mV:['millivolt',.001],µV:['microvolt',1e-6],kV:['kilovolt',1000]}},
  resistance:{label:'Electrical resistance',base:'Ω',sectors:['electrical'],units:{Ω:['ohm',1],mΩ:['milliohm',.001],kΩ:['kiloohm',1000],MΩ:['megaohm',1e6]}},
  capacitance:{label:'Capacitance',base:'F',sectors:['electrical'],units:{F:['farad',1],mF:['millifarad',.001],µF:['microfarad',1e-6],nF:['nanofarad',1e-9],pF:['picofarad',1e-12]}},
  inductance:{label:'Inductance',base:'H',sectors:['electrical'],units:{H:['henry',1],mH:['millihenry',.001],µH:['microhenry',1e-6],nH:['nanohenry',1e-9]}}
};
const sectorData={all:'All quantities',everyday:'Everyday',civil:'Civil and Infrastructure',mechanical:'Mechanical and Manufacturing',marine:'Naval and Marine',electrical:'Electrical and Electronics',energy:'Energy and Environment',materials:'Materials and Welding',computing:'Computing and Data',business:'Projects and Business'};
const sectorSelect=byId('conversionSector'),quantitySelect=byId('conversionQuantity'),fromSelect=byId('conversionFrom'),toSelect=byId('conversionTo');
const fillSelect=(select,items)=>{select.innerHTML=items.map(([value,label])=>'<option value="'+value+'">'+label+'</option>').join('');};
const refreshQuantities=()=>{
  const sector=sectorSelect.value,items=Object.entries(quantityData).filter(([,item])=>sector==='all'||item.sectors.includes(sector)).map(([key,item])=>[key,item.label]);fillSelect(quantitySelect,items);refreshUnits();
};
const refreshUnits=()=>{
  const quantity=quantityData[quantitySelect.value];if(!quantity)return;const items=Object.entries(quantity.units).map(([symbol,[name]])=>[symbol,name+' ('+symbol+')']);fillSelect(fromSelect,items);fillSelect(toSelect,items);if(items.length>1)toSelect.selectedIndex=1;convertValue();
};
const temperatureToKelvin=(value,unit)=>unit==='°C'?value+273.15:unit==='°F'?(value-32)*5/9+273.15:unit==='°R'?value*5/9:value;
const kelvinToTemperature=(value,unit)=>unit==='°C'?value-273.15:unit==='°F'?(value-273.15)*9/5+32:unit==='°R'?value*9/5:value;
const convertValue=()=>{
  if(!quantitySelect)return;try{
    const value=Number(byId('conversionValue').value);if(!Number.isFinite(value))throw new Error('Enter a valid number.');
    const quantity=quantityData[quantitySelect.value],from=fromSelect.value,to=toSelect.value;let result,process;
    if(quantity.special==='temperature'){
      const kelvin=temperatureToKelvin(value,from);if(kelvin<0)throw new Error('This value is below absolute zero. Check the value and temperature scale.');result=kelvinToTemperature(kelvin,to);process='Quantity: '+quantity.label+'\nReference scale: kelvin\n1. Convert '+displayNumber(value)+' '+from+' to kelvin = '+displayNumber(kelvin)+' K\n2. Convert '+displayNumber(kelvin)+' K to '+to+' = '+displayNumber(result)+' '+to+'\nTemperature uses an affine scale, so a single multiplication factor is not sufficient.';
    }else{
      const fromFactor=quantity.units[from][1],toFactor=quantity.units[to][1],base=value*fromFactor;result=base/toFactor;const factor=fromFactor/toFactor;process='Quantity: '+quantity.label+'\nReference unit: '+quantity.base+'\nFormula: result = input × source factor ÷ target factor\nSubstitution: '+displayNumber(value)+' × '+displayNumber(fromFactor,12)+' ÷ '+displayNumber(toFactor,12)+'\nCombined factor: '+displayNumber(factor,12)+'\nReference-unit check: '+displayNumber(base,12)+' '+quantity.base;
    }
    byId('conversionLabel').textContent=quantity.label.toUpperCase();byId('conversionResult').textContent=displayNumber(result,12)+' '+to;byId('conversionProcess').textContent=process;
  }catch(error){byId('conversionResult').textContent='Check input';byId('conversionProcess').textContent=error.message;}
};
if(sectorSelect){
  const quantities=Object.values(quantityData),routes=quantities.reduce((total,item)=>{const count=Object.keys(item.units).length;return total+count*(count-1);},0);
  byId('routeCount').textContent=routes.toLocaleString('en-US')+' available conversions across '+quantities.length+' quantities · no registration';
  fillSelect(sectorSelect,Object.entries(sectorData));refreshQuantities();sectorSelect.addEventListener('change',refreshQuantities);quantitySelect.addEventListener('change',refreshUnits);byId('convertButton').addEventListener('click',convertValue);byId('conversionValue').addEventListener('input',convertValue);fromSelect.addEventListener('change',convertValue);toSelect.addEventListener('change',convertValue);byId('swapUnits').addEventListener('click',()=>{const old=fromSelect.value;fromSelect.value=toSelect.value;toSelect.value=old;convertValue();});
}
