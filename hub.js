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
const departmentSelect=q('#toolDepartment');
let selectedRole='all';
const filterCalculators=()=>{
  const department=departmentSelect?.value||'all';
  calculatorCards.forEach(card=>{
    const roleMatch=selectedRole==='all'||card.dataset.roles.split(' ').includes(selectedRole);
    const departmentMatch=department==='all'||(card.dataset.departments||'').split(' ').includes(department);
    card.hidden=!(roleMatch&&departmentMatch);
  });
};
roleButtons.forEach(button=>button.addEventListener('click',()=>{
  roleButtons.forEach(item=>item.classList.remove('active'));button.classList.add('active');
  selectedRole=button.dataset.role;filterCalculators();
}));
departmentSelect?.addEventListener('change',filterCalculators);

const facultyContent={
  engineering:{eyebrow:'KNOWLEDGE AREA 01 · DEEP FIRST',title:'Engineering',description:'Choose a discipline, then choose the help you need. This first desk grows around real engineering work—not a random list of tools.',departments:[['civil','Civil and Infrastructure','Structures · water · construction · public systems'],['mechanical','Mechanical and Manufacturing','Machines · fluids · production · maintenance'],['marine','Naval and Marine','Ships · ports · propulsion · marine operations'],['electrical','Electrical and Electronics','Power · machines · protection · control'],['energy','Energy and Environment','Efficiency · utilities · emissions · resources'],['computing','Computing and Systems','Data · automation · software · interfaces'],['materials','Materials and Welding','Selection · joining · failure · quality']]},
  business:{eyebrow:'KNOWLEDGE AREA 02 · FOUNDATION',title:'Projects and Business',description:'A practical first layer for turning technical work into organized delivery. It will grow where engineering and business decisions genuinely meet.',departments:[['business','Project Strategy','Scope · stakeholders · outcomes · constraints'],['business','Procurement and Supply','Requirements · offers · interfaces · lifecycle'],['business','Operations','Capacity · reliability · handover · improvement']]},
  finance:{eyebrow:'KNOWLEDGE AREA 03 · FOUNDATION',title:'Finance and Economics',description:'Practical financial reasoning for engineers and project teams—not investment advice. Start with cash flow, lifecycle cost and uncertainty.',departments:[['finance','Engineering Economics','Payback · NPV · lifecycle cost · sensitivity'],['finance','Cost and Budget','Estimate · allowance · contingency · variance'],['finance','Commercial Decisions','Price · value · risk · consequence']]},
  law:{eyebrow:'KNOWLEDGE AREA 04 · FOUNDATION',title:'Law and Governance',description:'Starting routes for obligations, public rules and accountable decisions. Original legal sources remain authoritative and professional advice stays separate.',departments:[['law','Contracts and Obligations','Scope · responsibility · change · records'],['law','Public Governance','Policy · procurement · accountability · evidence'],['law','Standards and Compliance','Jurisdiction · edition · applicability · verification']]},
  human:{eyebrow:'KNOWLEDGE AREA 05 · FOUNDATION',title:'Human Systems and Arts',description:'Engineering is performed by people. This early area connects communication, behavior, design, history and the lived experience of work.',departments:[['human','People at Work','Communication · incentives · fatigue · coordination'],['human','Design and Society','Accessibility · culture · public value · consequence'],['human','Ideas and Expression','Observation · unfinished ideas · reflection · creative practice']]}
};
const facultyTabs=document.querySelectorAll('[data-faculty]');
const renderFaculty=key=>{
  const faculty=facultyContent[key];if(!faculty)return;
  show('#facultyEyebrow',faculty.eyebrow);show('#facultyTitle',faculty.title);show('#facultyDescription',faculty.description);
  const grid=q('#departmentGrid');if(grid)grid.innerHTML=faculty.departments.map(([department,title,description])=>'<button data-department-jump="'+department+'"><b>'+title+'</b><span>'+description+'</span></button>').join('');
};
facultyTabs.forEach(tab=>tab.addEventListener('click',()=>{
  facultyTabs.forEach(item=>{item.classList.remove('active');item.setAttribute('aria-selected','false');});
  tab.classList.add('active');tab.setAttribute('aria-selected','true');renderFaculty(tab.dataset.faculty);
}));
q('#departmentGrid')?.addEventListener('click',event=>{
  const button=event.target.closest('[data-department-jump]');if(!button)return;
  const department=button.dataset.departmentJump;
  if(departmentSelect&&Array.from(departmentSelect.options).some(option=>option.value===department))departmentSelect.value=department;
  filterCalculators();q('#daily')?.scrollIntoView({behavior:'smooth'});
});

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

const dictionaryEntries=[
  {term:'Net positive suction head (NPSH)',keys:'npsh pump cavitation',meaning:'A pressure-energy margin used to assess whether a pump inlet condition is sufficiently above the liquid vapour-pressure condition. Available and required NPSH must be distinguished.',source:'Engineering LibreTexts',url:'https://eng.libretexts.org/'},
  {term:'Power factor',keys:'power factor reactive apparent real electrical',meaning:'The ratio of real power to apparent power under the stated waveform and operating conditions. It affects current and system loading but is not simply “lost power.”',source:'All About Circuits',url:'https://www.allaboutcircuits.com/textbook/'},
  {term:'Welding heat input',keys:'welding heat input wps voltage current travel speed',meaning:'An estimate of energy delivered per unit weld length. It does not by itself define thermal history, mechanical properties or an approved welding procedure.',source:'TWI Knowledge',url:'https://www.twi-global.com/technical-knowledge'},
  {term:'Lifecycle cost',keys:'lifecycle life cycle cost procurement finance decision',meaning:'The relevant costs and consequences across acquisition, operation, maintenance, downtime, change and disposal—not acquisition price alone.',source:'NASA Systems Engineering Handbook',url:'https://www.nasa.gov/reference/systems-engineering-handbook/'},
  {term:'Voltage drop',keys:'voltage drop electrical cable resistance current',meaning:'The reduction in voltage between two points caused by current flowing through impedance. Applicable limits and calculation methods depend on system, conductors, load and governing requirements.',source:'All About Circuits',url:'https://www.allaboutcircuits.com/textbook/'}
];
const dictionaryInput=q('#dictionarySearch'),dictionaryResults=q('#dictionaryResults');
const renderDictionary=()=>{if(!dictionaryResults)return;const term=(dictionaryInput?.value||'').trim().toLowerCase();const matches=term?dictionaryEntries.filter(entry=>(entry.term+' '+entry.keys+' '+entry.meaning).toLowerCase().includes(term)):dictionaryEntries.slice(0,3);dictionaryResults.innerHTML=matches.length?matches.map(entry=>`<article><p class="tag">${entry.term}</p><p>${entry.meaning}</p><a href="${entry.url}" rel="noopener">Continue at ${entry.source} ↗</a></article>`).join(''):'<p class="notice">No indexed term yet. Search the connected sources below or try a broader engineering word.</p>'};
dictionaryInput?.addEventListener('input',renderDictionary);renderDictionary();

