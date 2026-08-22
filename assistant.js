(()=>{
  const form=document.querySelector('#assistantForm');
  const box=document.querySelector('#assistant .panel');
  const input=document.querySelector('#assistantQuestion');
  const button=document.querySelector('#assistantAsk');
  const consent=document.querySelector('#assistantConsent');
  if(!form||!box||!input||!button||!consent)return;

  let output=document.querySelector('#assistantResult');
  if(!output){
    output=document.createElement('div');
    output.className='result assistant-result';
    output.id='assistantResult';
    output.setAttribute('aria-live','polite');
    output.hidden=true;
    box.appendChild(output);
  }

  const configured=Boolean(window.AP_CONFIG?.SUPABASE_URL&&window.AP_CONFIG?.SUPABASE_ANON_KEY);
  const setReadyState=()=>{
    if(!consent.checked){button.disabled=true;button.textContent='Confirm the public-question boundary';return;}
    if(!configured){button.disabled=true;button.textContent='Assistant is not configured';return;}
    button.disabled=false;button.textContent='Explain the theory';
  };
  consent.addEventListener('change',setReadyState);
  setReadyState();

  const run=async()=>{
    const question=input.value.trim();
    if(!consent.checked){output.hidden=false;output.textContent='Confirm that your question contains no confidential or project-specific information.';return;}
    if(question.length<12){output.hidden=false;output.textContent='Please provide a focused public theory question of at least 12 characters.';return;}
    if(!configured){output.hidden=false;output.textContent='The theory assistant is not configured on this preview.';return;}

    button.disabled=true;output.hidden=false;
    output.textContent='Checking the question boundary and looking for privacy-compatible free capacity…';

    try{
      const response=await fetch(AP_CONFIG.SUPABASE_URL+'/functions/v1/theory-assistant',{
        method:'POST',
        headers:{'Content-Type':'application/json','Authorization':'Bearer '+AP_CONFIG.SUPABASE_ANON_KEY,'apikey':AP_CONFIG.SUPABASE_ANON_KEY},
        body:JSON.stringify({question})
      });
      let body={};
      try{body=await response.json();}catch{throw new Error('The service returned an unreadable response.');}
      if(!response.ok)throw new Error(body.error||'No privacy-compatible free model is available right now.');
      output.textContent=body.answer;
    }catch(error){
      output.textContent='Beta unavailable: '+error.message+' The calculators, explainers and source desk remain available without AI.';
    }finally{setReadyState();}
  };

  form.addEventListener('submit',event=>{event.preventDefault();run();});
})();

