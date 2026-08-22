const q=selector=>document.querySelector(selector);
const money=value=>new Intl.NumberFormat('en-BD',{maximumFractionDigits:2}).format(value);
const number=(selector,{min=-Infinity,max=Infinity,positive=false}={})=>{
  const value=Number(q(selector)?.value);
  if(!Number.isFinite(value)||value<min||value>max||(positive&&value<=0))throw new Error('Check the highlighted inputs and use valid numbers.');
  return value;
};
const show=(selector,message)=>{const target=q(selector);if(target)target.textContent=message;};

const calculations={
  energy(){
    const power=number('#ecPower',{min:0}),hours=number('#ecHours',{min:0,max:24}),rate=number('#ecRate',{min:0});
    const kwh=power/1000*hours,cost=kwh*rate;
    show('#ecResult',money(kwh)+' kWh/day · BDT '+money(cost)+'/day · approximately BDT '+money(cost*30)+'/30 days.');
  },
  tank(){
    const volume=number('#tankVolume',{min:0}),flow=number('#tankFlow',{positive:true}),level=number('#tankLevel',{min:0,max:100});
    const remaining=volume*(1-level/100),minutes=remaining/flow;
    show('#tankResult',money(remaining)+' L remaining · '+money(minutes)+' minutes ('+money(minutes/60)+' hours) at constant flow.');
  },
  power(){
    const factor=number('#phase',{positive:true}),voltage=number('#voltage',{min:0}),current=number('#current',{min:0}),pf=number('#pf',{min:0,max:1});
    const watts=factor*voltage*current*pf;
    show('#powerResult',money(watts/1000)+' kW real power ('+money(watts)+' W), assuming RMS values and steady balanced operation.');
  },
  pressure(){
    const value=number('#pressureValue'),unit=q('#pressureUnit').value;
    const bar=unit==='bar'?value:unit==='psi'?value/14.5037738:unit==='kpa'?value/100:value*10;
    show('#pressureResult',money(bar)+' bar · '+money(bar*14.5037738)+' psi · '+money(bar*100)+' kPa · '+money(bar/10)+' MPa.');
  },
  threeCurrent(){
    const power=number('#tpPower',{min:0})*1000,voltage=number('#tpVoltage',{positive:true}),pf=number('#tpPf',{positive:true,max:1}),efficiency=number('#tpEfficiency',{positive:true,max:100})/100;
    const current=power/(Math.sqrt(3)*voltage*pf*efficiency);
    show('#tpResult',money(current)+' A estimated line current at the stated steady load. Do not use this alone for conductor or protection selection.');
  },
  voltageDrop(){
    const length=number('#vdLength',{min:0}),current=number('#vdCurrent',{min:0}),area=number('#vdArea',{positive:true}),voltage=number('#vdVoltage',{positive:true});
    const drop=2*length*current*.0175/area,percent=drop/voltage*100;
    show('#vdResult',money(drop)+' V drop · '+money(percent)+'% of nominal voltage, using the simplified 20°C copper-resistance model.');
  },
  pumpPower(){
    const flow=number('#pumpFlow',{min:0})/3600,head=number('#pumpHead',{min:0}),efficiency=number('#pumpEff',{positive:true,max:100})/100;
    const hydraulic=1000*9.80665*flow*head/1000,shaft=hydraulic/efficiency;
    show('#pumpResult',money(hydraulic)+' kW hydraulic power · '+money(shaft)+' kW estimated pump shaft power before motor losses and service margin.');
  },
  weldHeat(){
    const voltage=number('#whVoltage',{min:0}),current=number('#whCurrent',{min:0}),speed=number('#whSpeed',{positive:true}),efficiency=number('#whEfficiency',{positive:true,max:1});
    const heat=voltage*current*60*efficiency/(1000*speed);
    show('#weldResult',money(heat)+' kJ/mm estimated heat input. Compare only within the applicable approved WPS and procedure-control framework.');
  },
  payback(){
    const cost=number('#pbCost',{min:0}),saving=number('#pbSaving',{positive:true}),years=cost/saving;
    show('#pbResult',money(years)+' years · approximately '+money(years*12)+' months simple payback, before discounting and other lifecycle effects.');
  },
  npv(){
    const cost=number('#npvCost',{min:0}),cash=number('#npvCash'),rate=number('#npvRate',{min:0})/100,years=Math.trunc(number('#npvYears',{min:1,max:50}));
    let present=0;for(let year=1;year<=years;year++)present+=cash/Math.pow(1+rate,year);
    const npv=present-cost;
    show('#npvResult','BDT '+money(npv)+' NPV · BDT '+money(present)+' present value of benefits over '+years+' years at '+money(rate*100)+'%.');
  },
  breakEven(){
    const fixed=number('#beFixed',{min:0}),price=number('#bePrice',{min:0}),variable=number('#beVariable',{min:0}),margin=price-variable;
    if(margin<=0)throw new Error('Selling price must exceed variable cost for a finite break-even quantity.');
    const quantity=fixed/margin;
    show('#beResult',money(quantity)+' units theoretical break-even quantity · BDT '+money(margin)+' contribution per unit.');
  },
  tipSpeed(){
    const diameter=number('#tsDiameter',{min:0}),rpm=number('#tsRpm',{min:0}),speed=Math.PI*diameter*rpm/60;
    show('#tsResult',money(speed)+' m/s peripheral speed ('+money(speed*3.6)+' km/h), as a kinematic conversion only.');
  }
};

document.querySelectorAll('.calc-btn').forEach(button=>button.addEventListener('click',()=>{
  try{calculations[button.dataset.calc]?.();button.closest('.calculator')?.classList.remove('input-error');}
  catch(error){button.closest('.calculator')?.classList.add('input-error');const result=button.closest('.calculator')?.querySelector('.result');if(result)result.textContent=error.message;}
}));

const roleButtons=document.querySelectorAll('[data-role]');
const calculatorCards=document.querySelectorAll('.calculator[data-roles]');
roleButtons.forEach(button=>button.addEventListener('click',()=>{
  roleButtons.forEach(item=>item.classList.remove('active'));button.classList.add('active');
  const role=button.dataset.role;
  calculatorCards.forEach(card=>{const visible=role==='all'||card.dataset.roles.split(' ').includes(role);card.hidden=!visible;});
}));

const resourceInput=q('#resourceSearch'),resourceButtons=document.querySelectorAll('[data-resource-tag]'),resources=document.querySelectorAll('.resource[data-tags]');
let resourceTag='all';
const filterResources=()=>{
  const term=(resourceInput?.value||'').trim().toLowerCase();
  let visible=0;
  resources.forEach(card=>{
    const haystack=(card.dataset.tags+' '+card.textContent).toLowerCase();
    const matchTag=resourceTag==='all'||card.dataset.tags.split(' ').includes(resourceTag);
    const matchTerm=!term||haystack.includes(term);
    card.hidden=!(matchTag&&matchTerm);if(matchTag&&matchTerm)visible++;
  });
  if(q('#resourceEmpty'))q('#resourceEmpty').hidden=visible!==0;
};
resourceInput?.addEventListener('input',filterResources);
resourceButtons.forEach(button=>button.addEventListener('click',()=>{
  resourceButtons.forEach(item=>item.classList.remove('active'));button.classList.add('active');resourceTag=button.dataset.resourceTag;filterResources();
}));

document.querySelectorAll('.assistant-examples button').forEach(button=>button.addEventListener('click',()=>{
  const input=q('#assistantQuestion');if(input){input.value=button.dataset.question;input.focus();}
}));

