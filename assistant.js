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
