(()=>{
  const form=document.querySelector('#assistantForm');
  const box=document.querySelector('#assistant .panel');
  const input=document.querySelector('#assistantQuestion');
  const button=document.querySelector('#assistantAsk');
  if(!form||!box||!input||!button)return;

  let output=document.querySelector('#assistantResult');
  if(!output){
    output=document.createElement('div');
    output.className='result';
    output.id='assistantResult';
    output.setAttribute('aria-live','polite');
    output.hidden=true;
    box.appendChild(output);
  }

  const configured=Boolean(window.AP_CONFIG?.SUPABASE_URL&&window.AP_CONFIG?.SUPABASE_ANON_KEY);
  if(configured){
    box.querySelector('p').textContent='Questions are sent through a secured Supabase Edge Function to OpenRouter Free. No provider key is exposed in this page. Free capacity may be unavailable.';
    button.disabled=false;
    button.textContent='Explain the theory';
    button.title='';
  }

  const run=async()=>{
    const question=input.value.trim();
    if(!question||question.length<12){
      output.hidden=false;
      output.textContent='Please provide a focused theory question of at least 12 characters.';
      return;
    }
    if(!configured){
      output.hidden=false;
      output.textContent='The assistant is not configured yet.';
      return;
    }

    button.disabled=true;
    output.hidden=false;
    output.textContent='Reviewing the theory and safety boundary…';

    try{
      const response=await fetch(`${AP_CONFIG.SUPABASE_URL}/functions/v1/theory-assistant`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
          'Authorization':`Bearer ${AP_CONFIG.SUPABASE_ANON_KEY}`,
          'apikey':AP_CONFIG.SUPABASE_ANON_KEY
        },
        body:JSON.stringify({question})
      });
      const body=await response.json();
      if(!response.ok)throw new Error(body.error||'Request failed');
      output.textContent=body.answer;
    }catch(error){
      output.textContent=`The assistant is unavailable: ${error.message}`;
    }finally{
      button.disabled=false;
    }
  };

  button.onclick=null;
  button.addEventListener('click',run);
  form.addEventListener('submit',event=>{event.preventDefault();run();});
  button.dataset.handler='ready';
})();
