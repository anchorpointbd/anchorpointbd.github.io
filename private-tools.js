const ideaText=document.querySelector('#ideaText');
const ideaOutput=document.querySelector('#ideaOutput');
const ideaBuried=document.querySelector('#ideaBuried');
document.querySelector('#structureIdea')?.addEventListener('click',()=>{
  const idea=ideaText.value.trim();
  if(!idea){ideaText.focus();return;}
  ideaBuried?.classList.remove('active');
  ideaOutput.textContent='THE ROUGH IDEA\n'+idea+'\n\nTHE QUESTION INSIDE IT\nWhat problem, possibility or human need is this really pointing toward?\n\nWHO FEELS IT\nWho experiences the present situation, and what do they do today instead?\n\nWHAT MUST BE TRUE\nWhich assumptions would need evidence before this deserves investment?\n\nTHE SMALLEST HONEST TEST\nWhat could be observed, sketched or tested without pretending the full idea already works?\n\nREASONS TO STOP\nWhat harm, cost, dependency or contradiction would make this a bad direction?\n\nTHE NEXT CONVERSATION\nWho understands the problem well enough to challenge the idea without owning it?';
  ideaOutput.classList.add('active');
});
document.querySelector('#buryIdea')?.addEventListener('click',()=>{
  if(ideaText)ideaText.value='';if(ideaOutput){ideaOutput.textContent='';ideaOutput.classList.remove('active');}ideaBuried?.classList.add('active');ideaText?.focus();
});

const releaseText=document.querySelector('#releaseText');
const releaseOutput=document.querySelector('#releaseOutput');
const releasedState=document.querySelector('#releasedState');
document.querySelector('#releaseTextButton')?.addEventListener('click',()=>{
  if(releaseText)releaseText.value='';if(releaseOutput){releaseOutput.textContent='';releaseOutput.classList.remove('active');}releasedState?.classList.add('active');releaseText?.focus();
});
document.querySelector('#reframeText')?.addEventListener('click',()=>{
  if(!releaseText?.value.trim()){releaseText?.focus();return;}
  releasedState?.classList.remove('active');
  releaseOutput.textContent='You do not need to solve everything at once.\n\nWhat part of this situation is actually within my control?\nWhat fact am I missing?\nWhat boundary or request would make the next day more workable?\nWho is safe and appropriate to speak with?\nWhat is one action small enough to take without making the situation worse?';
  releaseOutput.classList.add('active');
});

