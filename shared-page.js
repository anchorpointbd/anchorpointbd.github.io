if(!document.body.classList.contains('v30-review')&&!document.body.dataset.sharedPageReady){
  document.body.dataset.sharedPageReady='true';
  document.body.classList.add('shared-page');
  const style=document.createElement('link');style.rel='stylesheet';style.href='shared-page.css?v=20260828-2';document.head.appendChild(style);
  const allSections=[...document.querySelectorAll('main>section')];
  const primarySections=allSections.slice(0,8);
  const hasPageHero=allSections[0]?.classList.contains('pagehero');
  if(hasPageHero){
    allSections[0].classList.add('shared-opening');
    const lightStart=Math.min(1,allSections.length-1);
    allSections[lightStart]?.classList.add('shared-light-entry');
    const closingStart=Math.max(lightStart+1,allSections.length-2);
    allSections.slice(lightStart,closingStart).forEach(section=>section.classList.add('shared-light-field'));
    allSections.slice(closingStart).forEach(section=>section.classList.add('shared-deep-return'));
    allSections[closingStart]?.classList.add('shared-deep-entry');
    document.querySelector('main')?.style.setProperty('--shared-section-count',allSections.length);
  }else{
    document.body.classList.add('shared-compact-page');
    allSections.forEach(section=>section.classList.add('shared-functional-field'));
  }
  primarySections.forEach((section,index)=>{if(!section.id)section.id=`page-section-${index+1}`});
  if(primarySections.length>1&&!document.querySelector('.global-progress')){
    const progress=document.createElement('nav');progress.className='global-progress';progress.setAttribute('aria-label','Page progress');progress.innerHTML=primarySections.map((section,index)=>`<a href="#${section.id}" aria-label="Section ${index+1}"></a>`).join('');document.body.appendChild(progress);
    const links=[...progress.querySelectorAll('a')];links[0]?.classList.add('active');
    const observer=new IntersectionObserver(entries=>{const current=entries.filter(entry=>entry.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];if(current)links.forEach(link=>link.classList.toggle('active',link.hash===`#${current.target.id}`))},{rootMargin:'-30% 0px -55%',threshold:[0,.15,.4]});primarySections.forEach(section=>observer.observe(section));
  }
  if(!document.querySelector('.utility-bar'))document.body.insertAdjacentHTML('beforeend','<nav class="utility-bar" aria-label="Quick actions"><a href="hub.html" data-utility="ecosystem">Ecosystem</a><a href="index.html#contact" data-utility="contact">Ask Anchor Point</a><a href="evidence.html#demonstrations" data-utility="examples">Examples</a></nav>');
  const page=location.pathname.split('/').pop()||'index.html';const activeKey=page==='hub.html'||['convert.html','scientific.html'].includes(page)?'ecosystem':page==='evidence.html'?'examples':'contact';document.querySelectorAll('.utility-bar [data-utility]').forEach(link=>{const active=link.dataset.utility===activeKey;link.classList.toggle('active',active);if(active)link.setAttribute('aria-current','page');['pointerdown','focus','click'].forEach(type=>link.addEventListener(type,()=>document.querySelectorAll('.utility-bar [data-utility]').forEach(item=>item.classList.toggle('active',item===link))))});
  const zones=[...document.querySelectorAll('main>section')];const tone=()=>{const y=scrollY+84;const zone=zones.find(section=>section.offsetTop<=y&&section.offsetTop+section.offsetHeight>y);const light=zone&&(zone.classList.contains('shared-light-entry')||zone.classList.contains('shared-light-field'));document.querySelector('.topbar')?.setAttribute('data-zone',light?'light':'deep')};addEventListener('scroll',tone,{passive:true});addEventListener('resize',tone,{passive:true});tone();
}
