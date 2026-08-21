const q=s=>document.querySelector(s),money=n=>new Intl.NumberFormat('en-BD',{maximumFractionDigits:2}).format(n);document.querySelectorAll('.calc-btn').forEach(b=>b.onclick=()=>{if(b.dataset.calc==='energy'){const kwh=+q('#ecPower').value/1000*+q('#ecHours').value,cost=kwh*+q('#ecRate').value;q('#ecResult').textContent=`${kwh.toFixed(2)} kWh/day · BDT ${money(cost)}/day · approximately BDT ${money(cost*30)}/30 days.`}if(b.dataset.calc==='tank'){const remaining=+q('#tankVolume').value*(1-Math.min(100,Math.max(0,+q('#tankLevel').value))/100),mins=remaining/+q('#tankFlow').value;q('#tankResult').textContent=`${money(remaining)} L remaining · ${money(mins)} minutes (${money(mins/60)} hours) at constant flow.`}if(b.dataset.calc==='power'){const W=+q('#phase').value*+q('#voltage').value*+q('#current').value*+q('#pf').value;q('#powerResult').textContent=`${money(W/1000)} kW real power (${money(W)} W), assuming RMS values and steady balanced operation.`}if(b.dataset.calc==='pressure'){const v=+q('#pressureValue').value,u=q('#pressureUnit').value,bar=u==='bar'?v:u==='psi'?v/14.5037738:u==='kpa'?v/100:v*10;q('#pressureResult').textContent=`${money(bar)} bar · ${money(bar*14.5037738)} psi · ${money(bar*100)} kPa · ${money(bar/10)} MPa.`}});

const assistantBox=document.querySelector('#assistant .panel');
const assistantInput=assistantBox?.querySelector('textarea');
const assistantButton=assistantBox?.querySelector('button');
const assistantOutput=document.createElement('div');
assistantOutput.className='result';assistantOutput.setAttribute('aria-live','polite');assistantOutput.hidden=true;
assistantBox?.appendChild(assistantOutput);
const assistantConfigured=Boolean(window.AP_CONFIG?.SUPABASE_URL&&window.AP_CONFIG?.SUPABASE_ANON_KEY);
if(assistantConfigured)assistantBox.querySelector('p').textContent='Questions are sent through a secured Supabase Edge Function to OpenRouter Free. No provider key is exposed in this page. Free capacity may be unavailable.';
if(assistantButton&&assistantConfigured){assistantButton.disabled=false;assistantButton.textContent='Explain the theory';assistantButton.title='';}
document.querySelector('#assistantForm')?.addEventListener('submit',async event=>{
  event.preventDefault();
  const question=assistantInput?.value.trim();if(!question||question.length<12){assistantOutput.hidden=false;assistantOutput.textContent='Please provide a focused theory question of at least 12 characters.';return}
  if(!assistantConfigured)return;
  assistantButton.disabled=true;assistantOutput.hidden=false;assistantOutput.textContent='Reviewing the theory and safety boundary…';
  try{const response=await fetch(`${AP_CONFIG.SUPABASE_URL}/functions/v1/theory-assistant`,{method:'POST',headers:{'Content-Type':'application/json','Authorization':`Bearer ${AP_CONFIG.SUPABASE_ANON_KEY}`,'apikey':AP_CONFIG.SUPABASE_ANON_KEY},body:JSON.stringify({question})});const body=await response.json();if(!response.ok)throw new Error(body.error||'Request failed');assistantOutput.textContent=body.answer;}catch(error){assistantOutput.textContent=`The assistant is unavailable: ${error.message}`;}finally{assistantButton.disabled=false;}
});
