(()=>{
const disciplines={
'Civil and Infrastructure':['load paths','reinforced concrete','structural steel','foundation bearing','slope stability','stormwater drainage','open-channel flow','traffic capacity'],
'Mechanical and Manufacturing':['pump systems','fan systems','heat exchangers','shaft power','bearing life','pressure vessels','machining tolerance','maintenance strategy'],
'Naval and Marine':['vessel stability','resistance and propulsion','bilge systems','fire-main systems','marine electrical distribution','corrosion control','dry-docking'],
'Electrical and Electronics':['three-phase power','voltage drop','short-circuit duty','power factor','motor starting','protection coordination','earthing and bonding','harmonics'],
'Energy and Environment':['energy balance','solar yield','battery storage','fuel efficiency','emissions accounting','heat recovery','lifecycle energy'],
'Computing and Systems':['requirements engineering','system interfaces','reliability allocation','data acquisition','network capacity','cybersecurity controls'],
'Materials and Welding':['material selection','welding heat input','WPS qualification','fatigue','fracture','corrosion mechanisms']
};
const lenses=[
['Fundamentals','Define the physical system, boundary and governing mechanism before selecting an equation.'],
['Equations','Check dimensional consistency, variable definitions and the conditions under which the governing relationship applies.'],
['Measurement','Separate measured values from estimates; record instrument range, uncertainty, timestamp and operating state.'],
['Selection','Compare alternatives against duty, interfaces, environment, maintainability and credible off-design cases.'],
['Installation','Confirm tolerances, access, supports, connections, protection and inspection hold points before acceptance.'],
['Operation','Track the operating envelope and identify which variables indicate drift from intended performance.'],
['Maintenance','Link failure modes to inspection tasks, intervals, spares and the consequence of missed intervention.'],
['Failure','Build the causal chain from symptom to mechanism; test competing explanations before prescribing a remedy.'],
['Safety','Identify stored energy, exposure, safeguards, competent-person requirements and emergency controls.'],
['Standards and evidence','Locate the governing authority, edition, approval basis and traceable evidence needed for the decision.']
];
const sourceFor=d=>d.startsWith('Civil')?'https://eng.libretexts.org/Bookshelves/Civil_Engineering':d.startsWith('Mechanical')?'https://eng.libretexts.org/Bookshelves/Mechanical_Engineering':d.startsWith('Naval')?'https://www.imo.org/en/OurWork/Safety/Pages/Default.aspx':d.startsWith('Electrical')?'https://www.nist.gov/topics/electromagnetics':d.startsWith('Energy')?'https://www.energy.gov/eere/energy-efficiency':d.startsWith('Computing')?'https://www.nist.gov/cyberframework':d.startsWith('Materials')?'https://www.twi-global.com/technical-knowledge':'https://eng.libretexts.org/';
const topics=[];Object.entries(disciplines).forEach(([discipline,names])=>names.forEach(name=>lenses.forEach(([lens,guidance])=>topics.push({discipline,name,lens,title:`${name}: ${lens.toLowerCase()}`,guidance,source:sourceFor(discipline)}))));
const q=document.querySelector('#knowledgeSearch'),filter=document.querySelector('#knowledgeDiscipline'),results=document.querySelector('#knowledgeResults'),count=document.querySelector('#knowledgeCount');
if(!results)return;
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const tokens=s=>(s.toLowerCase().match(/[a-z0-9]+/g)||[]).filter(x=>x.length>2);
function render(){
 const query=(q?.value||'').trim(),qt=tokens(query),dept=filter?.value||'all';
 let ranked=topics.filter(t=>dept==='all'||t.discipline===dept).map((t,i)=>{const hay=tokens(t.title+' '+t.discipline+' '+t.guidance);return{t,i,score:qt.reduce((n,x)=>n+(hay.some(y=>y.includes(x)||x.includes(y))?3:0),0)+(t.name.toLowerCase().includes(query.toLowerCase())&&query?8:0)}}).sort((a,b)=>b.score-a.score||a.i-b.i);
 if(query)ranked=ranked.filter(x=>x.score>0);
 const shown=ranked.slice(0,6);if(count)count.textContent=`${topics.length} topic routes · ${ranked.length} matching`;
 results.innerHTML=shown.length?shown.map(({t})=>`<article><p class="tag">${esc(t.discipline)} · ${esc(t.lens)}</p><h3>${esc(t.name)}</h3><p>${esc(t.guidance)} For this topic, establish inputs, units, operating state, uncertainty and the decision that the evidence must support.</p><div class="knowledge-actions"><a href="${t.source}" rel="noopener">Open authoritative route ↗</a><a href="https://www.google.com/search?q=site%3A${new URL(t.source).hostname}+${encodeURIComponent(t.name+' '+t.lens)}" rel="noopener">Search this source ↗</a></div></article>`).join(''):`<div class="library-empty"><h3>No close topic match.</h3><p>Try the equipment, physical quantity or failure mode—not a full project description. Examples: motor starting, pump cavitation, weld fatigue, drainage flow.</p></div>`;
}
window.anchorPointKnowledgeTopicCount=topics.length;q?.addEventListener('input',render);filter?.addEventListener('change',render);render();
})();