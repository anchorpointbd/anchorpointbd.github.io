(()=>{
const F=(n,u)=>`${new Intl.NumberFormat('en-US',{maximumFractionDigits:4}).format(n)} ${u}`;
const defs=[
// Civil and infrastructure (8)
['civil','Rectangle area','A = L × W',[['l','Length','m',12],['w','Width','m',8]],v=>[v.l*v.w,'m²']],
['civil','Concrete volume','V = L × W × D',[['l','Length','m',10],['w','Width','m',4],['d','Depth','m',0.2]],v=>[v.l*v.w*v.d,'m³']],
['civil','Reinforcement mass','m = d² ÷ 162 × L',[['d','Bar diameter','mm',16],['l','Total length','m',100]],v=>[v.d*v.d/162*v.l,'kg']],
['civil','Gradient','Grade = rise ÷ run × 100',[['rise','Rise','m',1],['run','Horizontal run','m',20]],v=>[v.rise/v.run*100,'%']],
['civil','Hydrostatic pressure','p = ρgh',[['rho','Fluid density','kg/m³',1000],['h','Depth','m',5]],v=>[v.rho*9.80665*v.h/1000,'kPa']],
['civil','Manning velocity','V = (1/n) R^(2/3) S^(1/2)',[['n','Manning coefficient','-',0.013],['r','Hydraulic radius','m',0.5],['s','Energy slope','m/m',0.001]],v=>[(1/v.n)*Math.pow(v.r,2/3)*Math.sqrt(v.s),'m/s']],
['civil','Simply supported beam reaction','R = wL ÷ 2',[['w','Uniform load','kN/m',8],['l','Span','m',6]],v=>[v.w*v.l/2,'kN per support']],
['civil','Simply supported beam moment','Mmax = wL² ÷ 8',[['w','Uniform load','kN/m',8],['l','Span','m',6]],v=>[v.w*v.l*v.l/8,'kN·m']],
// Mechanical and manufacturing (8)
['mechanical','Torque from power','T = 9550P ÷ rpm',[['p','Power','kW',15],['rpm','Speed','rpm',1450]],v=>[9550*v.p/v.rpm,'N·m']],
['mechanical','Rotational tip speed','v = πD rpm ÷ 60',[['d','Diameter','m',0.5],['rpm','Speed','rpm',1450]],v=>[Math.PI*v.d*v.rpm/60,'m/s']],
['mechanical','Kinetic energy','E = ½mv²',[['m','Mass','kg',100],['v','Velocity','m/s',5]],v=>[0.5*v.m*v.v*v.v/1000,'kJ']],
['mechanical','Linear thermal expansion','ΔL = αLΔT',[['a','Expansion coefficient','µm/m·°C',12],['l','Length','m',8],['dt','Temperature change','°C',40]],v=>[v.a*1e-6*v.l*v.dt*1000,'mm']],
['mechanical','Conductive heat flow','Q = kAΔT ÷ L',[['k','Conductivity','W/m·K',45],['a','Area','m²',2],['dt','Temperature difference','K',30],['l','Thickness','m',0.1]],v=>[v.k*v.a*v.dt/v.l/1000,'kW']],
['mechanical','Belt linear speed','v = πD rpm ÷ 60',[['d','Pulley diameter','m',0.3],['rpm','Pulley speed','rpm',900]],v=>[Math.PI*v.d*v.rpm/60,'m/s']],
['mechanical','Mechanical efficiency','η = Pout ÷ Pin × 100',[['out','Output power','kW',8.5],['in','Input power','kW',10]],v=>[v.out/v.in*100,'%']],
['mechanical','Mass flow rate','ṁ = ρQ',[['rho','Density','kg/m³',998],['q','Volumetric flow','m³/h',25]],v=>[v.rho*v.q/3600,'kg/s']],
// Naval and marine (7)
['marine','Displacement mass','m = ρ × displaced volume',[['rho','Water density','kg/m³',1025],['vol','Displaced volume','m³',120]],v=>[v.rho*v.vol/1000,'tonnes']],
['marine','Block coefficient','Cb = ∇ ÷ (LBT)',[['vol','Displaced volume','m³',120],['l','Waterline length','m',25],['b','Beam','m',6],['t','Draft','m',1.2]],v=>[v.vol/(v.l*v.b*v.t),'-']],
['marine','Froude number','Fn = V ÷ √(gL)',[['v','Speed','knots',20],['l','Waterline length','m',25]],v=>[v.v*0.514444/Math.sqrt(9.80665*v.l),'-']],
['marine','Propeller advance ratio','J = Va ÷ (nD)',[['v','Advance speed','knots',12],['rpm','Shaft speed','rpm',900],['d','Propeller diameter','m',1.2]],v=>[v.v*0.514444/((v.rpm/60)*v.d),'-']],
['marine','Fuel endurance','t = usable fuel ÷ consumption',[['fuel','Usable fuel','L',3000],['rate','Consumption','L/h',180]],v=>[v.fuel/v.rate,'h']],
['marine','Voyage time','t = distance ÷ speed',[['d','Distance','nautical miles',240],['v','Average speed','knots',12]],v=>[v.d/v.v,'h']],
['marine','Trim moment','M = weight × lever',[['w','Shifted weight','tonnes',5],['l','Longitudinal shift','m',8]],v=>[v.w*v.l,'t·m']],
// Electrical and electronics (8)
['electrical','Ohm’s law current','I = V ÷ R',[['v','Voltage','V',230],['r','Resistance','Ω',46]],v=>[v.v/v.r,'A']],
['electrical','Single-phase real power','P = VIpf',[['v','Voltage','V',230],['i','Current','A',20],['pf','Power factor','-',0.85]],v=>[v.v*v.i*v.pf/1000,'kW']],
['electrical','Three-phase real power','P = √3 VIpf',[['v','Line voltage','V',400],['i','Line current','A',20],['pf','Power factor','-',0.85]],v=>[Math.sqrt(3)*v.v*v.i*v.pf/1000,'kW']],
['electrical','Single-phase voltage drop','ΔV = 2LIρ ÷ A',[['l','One-way length','m',40],['i','Current','A',20],['a','Copper area','mm²',6]],v=>[2*v.l*v.i*0.0175/v.a,'V']],
['electrical','Three-phase voltage drop','ΔV = √3LIρ ÷ A',[['l','Length','m',40],['i','Current','A',20],['a','Copper area','mm²',6]],v=>[Math.sqrt(3)*v.l*v.i*0.0175/v.a,'V']],
['electrical','Electrical energy','E = Pt',[['p','Power','kW',5],['t','Operating time','h',8]],v=>[v.p*v.t,'kWh']],
['electrical','Power-factor correction','Qc = P(tanφ₁ − tanφ₂)',[['p','Real power','kW',100],['pf1','Existing power factor','-',0.75],['pf2','Target power factor','-',0.95]],v=>[v.p*(Math.tan(Math.acos(v.pf1))-Math.tan(Math.acos(v.pf2))),'kVAr']],
['electrical','Battery runtime estimate','t = VAhη ÷ P',[['v','Battery voltage','V',24],['ah','Capacity','Ah',200],['eta','Usable fraction','-',0.7],['p','Load','W',500]],v=>[v.v*v.ah*v.eta/v.p,'h']],
// Energy and environment (7)
['energy','Hydraulic pump power','P = ρgQH ÷ η',[['q','Flow','m³/h',25],['h','Head','m',30],['eta','Pump efficiency','%',70]],v=>[1000*9.80665*(v.q/3600)*v.h/(v.eta/100)/1000,'kW']],
['energy','Fan air power','P = QΔp ÷ η',[['q','Airflow','m³/s',2],['dp','Pressure rise','Pa',600],['eta','Efficiency','%',65]],v=>[v.q*v.dp/(v.eta/100)/1000,'kW']],
['energy','Coefficient of performance','COP = useful heat ÷ input power',[['q','Useful cooling or heating','kW',12],['p','Input power','kW',3.5]],v=>[v.q/v.p,'-']],
['energy','Sensible heat transfer','Q = ṁcpΔT',[['m','Mass flow','kg/s',1.2],['cp','Specific heat','kJ/kg·K',4.186],['dt','Temperature change','K',10]],v=>[v.m*v.cp*v.dt,'kW']],
['energy','Solar energy estimate','E = area × irradiance × efficiency',[['a','Panel area','m²',20],['h','Peak-sun hours','h/day',4.5],['eta','System efficiency','%',18]],v=>[v.a*v.h*v.eta/100,'kWh/day']],
['energy','Fuel energy input','E = volume × heating value',[['v','Fuel volume','L',100],['hv','Heating value','MJ/L',35.8]],v=>[v.v*v.hv/1000,'GJ']],
['energy','Emission estimate','CO₂e = activity × factor',[['a','Activity amount','unit',1000],['f','Emission factor','kg CO₂e/unit',0.82]],v=>[v.a*v.f/1000,'t CO₂e']],
// Computing and systems (6)
['computing','Data-transfer time','t = size × 8 ÷ rate',[['s','File size','GB',10],['r','Link rate','Mbps',100]],v=>[v.s*8000/v.r/60,'min']],
['computing','Storage duration','days = capacity ÷ daily generation',[['c','Usable capacity','GB',2000],['d','Daily data','GB/day',80]],v=>[v.c/v.d,'days']],
['computing','System availability','A = uptime ÷ total time × 100',[['up','Uptime','h',720],['down','Downtime','h',2]],v=>[v.up/(v.up+v.down)*100,'%']],
['computing','Required throughput','R = records × bytes × frequency',[['n','Records per sample','-',1000],['b','Bytes per record','bytes',64],['f','Samples per second','Hz',10]],v=>[v.n*v.b*v.f*8/1e6,'Mbps']],
['computing','Sampling interval','Δt = 1 ÷ f',[['f','Sampling frequency','Hz',1000]],v=>[1000/v.f,'ms']],
['computing','Redundant-storage estimate','usable = raw ÷ replication factor',[['raw','Raw storage','TB',12],['factor','Replication factor','-',3]],v=>[v.raw/v.factor,'TB usable']],
// Materials and welding (6)
['materials','Normal stress','σ = F ÷ A',[['f','Force','kN',100],['a','Area','mm²',500]],v=>[v.f*1000/v.a,'MPa']],
['materials','Engineering strain','ε = ΔL ÷ L',[['dl','Extension','mm',1.2],['l','Original length','mm',200]],v=>[v.dl/v.l*100,'%']],
['materials','Elastic modulus','E = σ ÷ ε',[['s','Stress','MPa',200],['e','Strain','%',0.1]],v=>[v.s/(v.e/100)/1000,'GPa']],
['materials','Welding heat input','H = VI60η ÷ (1000S)',[['v','Arc voltage','V',24],['i','Current','A',180],['eta','Thermal efficiency','-',0.8],['s','Travel speed','mm/min',300]],v=>[v.v*v.i*60*v.eta/(1000*v.s),'kJ/mm']],
['materials','Thermal stress restraint estimate','σ = EαΔT',[['e','Elastic modulus','GPa',200],['a','Expansion coefficient','µm/m·°C',12],['dt','Temperature change','°C',50]],v=>[v.e*1000*v.a*1e-6*v.dt,'MPa']],
['materials','Density from mass and volume','ρ = m ÷ V',[['m','Mass','kg',78.5],['v','Volume','m³',0.01]],v=>[v.m/v.v,'kg/m³']]
];
const labels={civil:'Civil and Infrastructure',mechanical:'Mechanical and Manufacturing',marine:'Naval and Marine',electrical:'Electrical and Electronics',energy:'Energy and Environment',computing:'Computing and Systems',materials:'Materials and Welding'};
const root=document.querySelector('#calculatorLibrary');if(!root)return;
const search=document.querySelector('#calculatorSearch');
const select=document.querySelector('#libraryDepartment');
const list=document.querySelector('#calculatorResults');
const count=document.querySelector('#calculatorResultCount');
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let active=0;
const matches=()=>{const term=(search?.value||'').trim().toLowerCase(),dept=select?.value||'all';return defs.map((d,i)=>({d,i})).filter(({d})=>(dept==='all'||d[0]===dept)&&(!term||[d[1],d[2],labels[d[0]],...d[3].flat()].join(' ').toLowerCase().includes(term)))};
function renderWorkspace(i){active=i;const d=defs[i];root.innerHTML=`<article class="library-calculator calculator-workspace" data-library-department="${d[0]}"><p class="tag">${String(i+1).padStart(2,'0')} of 50 · ${esc(labels[d[0]])}</p><h3>${esc(d[1])}</h3><p class="formula">${esc(d[2])}</p><div class="library-fields">${d[3].map(x=>`<label>${esc(x[1])} <small>${esc(x[2])}</small><input type="number" inputmode="decimal" step="any" data-key="${x[0]}" value="${x[3]}"></label>`).join('')}</div><div class="calculator-actions"><button type="button" class="pill ink library-calc">Calculate</button><span class="result" aria-live="polite">Enter values and calculate.</span></div><details><summary>Use boundary</summary><p>Screening calculation only. Verify inputs, units, operating case, applicable standards and discipline-specific limits before consequential use.</p></details></article>`;list?.querySelectorAll('button').forEach(b=>{b.classList.toggle('active',Number(b.dataset.index)===i);b.setAttribute('aria-pressed',Number(b.dataset.index)===i?'true':'false')});root.scrollIntoView({behavior:'smooth',block:'nearest'})}
function renderResults(){const found=matches();if(count)count.textContent=`${found.length} calculator${found.length===1?'':'s'} found`;if(list)list.innerHTML=found.slice(0,8).map(({d,i})=>`<button type="button" data-index="${i}" class="${i===active?'active':''}" aria-pressed="${i===active?'true':'false'}"><span>${esc(d[1])}</span><small>${esc(labels[d[0]])}</small></button>`).join('')+(found.length>8?'<p class="result-hint">Refine the search to narrow the remaining results.</p>':'');if(!found.some(x=>x.i===active)&&found[0])renderWorkspace(found[0].i);if(!found.length)root.innerHTML='<div class="library-empty"><h3>No exact match.</h3><p>Try a discipline, variable, unit or broader term such as power, flow, area, stress or energy.</p></div>'}
list?.addEventListener('click',e=>{const b=e.target.closest('button[data-index]');if(b)renderWorkspace(Number(b.dataset.index))});
root.addEventListener('click',e=>{const b=e.target.closest('.library-calc');if(!b)return;const d=defs[active],v={};let ok=true;root.querySelectorAll('input').forEach(x=>{v[x.dataset.key]=Number(x.value);if(!Number.isFinite(v[x.dataset.key]))ok=false});const out=root.querySelector('.result');try{if(!ok)throw Error();const [value,unit]=d[4](v);if(!Number.isFinite(value))throw Error();out.textContent=F(value,unit);root.firstElementChild.classList.remove('input-error')}catch{out.textContent='Check the inputs. Divisors, efficiencies, lengths and rates must be greater than zero.';root.firstElementChild.classList.add('input-error')}});
search?.addEventListener('input',renderResults);select?.addEventListener('change',renderResults);
renderWorkspace(0);renderResults();window.anchorPointCalculatorCount=defs.length;
})();
