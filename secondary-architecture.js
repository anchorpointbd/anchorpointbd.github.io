(()=>{
  const storyLabels={home:'Why It Matters',about:'Who They Are',services:'What They Do',method:'How They Work'};
  const page=document.body.dataset.page;
  if(storyLabels[page])document.body.dataset.storyLabel=storyLabels[page];

  const nextChapter=document.querySelector('[data-story-next]');
  if(nextChapter){
    const preload=document.createElement('link');
    preload.rel='prefetch';
    preload.href=nextChapter.dataset.storyNext;
    document.head.append(preload);
  }

  if(/\/evidence(?:\.html)?$/.test(location.pathname)&&location.hash==='#method'){
    location.replace('method.html');
    return;
  }

  const header=document.querySelector('.topbar');
  const sections=[...document.querySelectorAll('main>section')];
  const progress=[...document.querySelectorAll('.page-progress a')];
  const updateTone=()=>{
    const point=scrollY+90;
    const current=sections.find(section=>section.offsetTop<=point&&section.offsetTop+section.offsetHeight>point);
    const light=current&&(current.classList.contains('light-section')||current.classList.contains('mid-section'));
    header?.style.setProperty('--header-light',light?'100%':'0%');
  };
  addEventListener('scroll',updateTone,{passive:true});
  addEventListener('resize',updateTone,{passive:true});
  updateTone();

  if(progress.length){
    const observer=new IntersectionObserver(entries=>{
      const current=entries.filter(entry=>entry.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
      if(current)progress.forEach(link=>link.classList.toggle('active',link.hash==='#'+current.target.id));
    },{rootMargin:'-32% 0px -56%',threshold:[0,.15,.35]});
    sections.forEach(section=>observer.observe(section));
  }

  document.querySelectorAll('.contact-form-card').forEach(form=>{
    form.enctype='multipart/form-data';
    const email=form.querySelector('[name="email"]');
    const phone=form.querySelector('[name="phone"]');
    const checkContact=()=>{
      const valid=Boolean(email?.value.trim()||phone?.value.trim());
      phone?.setCustomValidity(valid?'':'Please provide an email address or telephone number.');
      return valid;
    };
    email?.addEventListener('input',checkContact);
    phone?.addEventListener('input',checkContact);
    form.addEventListener('submit',event=>{if(!checkContact()){event.preventDefault();phone?.reportValidity()}});
  });

  document.querySelectorAll('a.email-option').forEach(link=>link.href='mailto:info@anchorpoint.com.bd');
  document.querySelectorAll('.utility-bar [data-utility]').forEach(link=>{
    ['pointerdown','focus','click'].forEach(type=>link.addEventListener(type,()=>{
      document.querySelectorAll('.utility-bar [data-utility]').forEach(item=>item.classList.toggle('active',item===link));
    }));
  });
})();
