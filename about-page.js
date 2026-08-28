const aboutUtilityLinks=[...document.querySelectorAll('.utility-bar [data-utility]')];
const setAboutUtilityActive=key=>aboutUtilityLinks.forEach(link=>{const active=link.dataset.utility===key;link.classList.toggle('active',active);if(active)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current')});
setAboutUtilityActive('contact');
aboutUtilityLinks.forEach(link=>['pointerdown','focus','click'].forEach(type=>link.addEventListener(type,()=>setAboutUtilityActive(link.dataset.utility))));
