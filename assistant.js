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
  const notes=[
    {match:/voltage|cable|current/i,title:'Reviewed note · Voltage drop',body:'Voltage drop rises with current and conductor resistance. In a simple conductor, ΔV = I × R; resistance rises with length and falls as conductor area increases. Real AC systems also depend on reactance, power factor, temperature and installation conditions.',verify:'Verify next: system arrangement, conductor material, actual route length, operating current, temperature and the applicable wiring standard.'},
    {match:/weld|heat input|wps/i,title:'Reviewed note · Welding heat input',body:'Heat input estimates the energy delivered per unit weld length: H = V × I × 60 × efficiency ÷ (1000 × travel speed). It helps discuss thermal exposure, but it does not define metallurgy, consumable control, joint preparation, preheat, interpass temperature or acceptance.',verify:'Verify next: the approved WPS, procedure qualification, material group, process variables and the responsible welding engineer.'},
    {match:/npv|payback|discount|cash flow/i,title:'Reviewed note · Payback and NPV',body:'Simple payback asks how long cumulative savings take to recover the initial investment. NPV discounts future cash flows to today: NPV = −C₀ + Σ CFₜ ÷ (1+r)ᵗ. Payback is intuitive; NPV recognizes timing and the cost of capital.',verify:'Verify next: cash-flow timing, discount rate, tax, escalation, residual value and downside scenarios.'},
    {match:/npsh|pump|cavitation/i,title:'Reviewed note · NPSH margin',body:'NPSH available describes how much suction-side pressure head remains above the liquid vapour-pressure head. The margin over NPSH required helps protect against cavitation, but catalogue values alone do not capture every installation and operating condition.',verify:'Verify next: liquid temperature, vapour pressure, suction losses, minimum level, altitude, transients and the pump manufacturer’s test basis.'}
  ];
  const showFallback=(question)=>{
    const note=notes.find(item=>item.match.test(question));
    output.classList.add('assistant-fallback');
    output.innerHTML=note
      ? `<strong>${note.title}</strong><p>${note.body}</p><p>${note.verify}</p><small>Curated fallback—not a live AI response.</small>`
      : '<strong>Live theory is busy.</strong><p>Your question does not yet match a reviewed fallback note. Try Voltage drop, Welding heat, Payback versus NPV, or NPSH—or continue with the calculators, explainers and source desk.</p><small>No paid model was used and your question was not stored by this page.</small>';
  };
  const setReadyState=()=>{
    if(!consent.checked){button.disabled=true;button.textContent='Confirm and ask';return;}
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
    output.classList.remove('assistant-fallback');
    output.textContent='Looking for available free theory capacity…';

    try{
      const response=await fetch(AP_CONFIG.SUPABASE_URL+'/functions/v1/theory-assistant',{
        method:'POST',
        headers:{'Content-Type':'application/json','Authorization':'Bearer '+AP_CONFIG.SUPABASE_ANON_KEY,'apikey':AP_CONFIG.SUPABASE_ANON_KEY},
        body:JSON.stringify({question})
      });
      let body={};
      try{body=await response.json();}catch{throw new Error('The service returned an unreadable response.');}
      if(!response.ok)throw new Error(body.error||'No privacy-compatible free model is available right now.');
      output.classList.remove('assistant-fallback');output.textContent=body.answer;
    }catch(error){
      showFallback(question);
    }finally{setReadyState();}
  };

  form.addEventListener('submit',event=>{event.preventDefault();run();});
})();

