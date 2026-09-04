(()=>{'use strict';
  const params=new URLSearchParams(location.search);
  const lang=params.get('lang');
  if(!lang||lang==='en')return;
  const apply=()=>{
    const pack=window.AP_I18N_CONTENT?.[lang];
    if(!pack)return;
    const translateTextNode=node=>{
      const raw=node.textContent;
      const key=raw.replace(/\s+/g,' ').trim();
      if(!key||!pack[key])return;
      const lead=raw.match(/^\s*/)?.[0]||'';
      const trail=raw.match(/\s*$/)?.[0]||'';
      node.textContent=lead+pack[key]+trail;
    };
    const translateRoot=root=>{
      if(root.nodeType===Node.TEXT_NODE){translateTextNode(root);return}
      if(root.nodeType!==Node.ELEMENT_NODE&&root.nodeType!==Node.DOCUMENT_NODE)return;
      if(root.nodeType===Node.ELEMENT_NODE){
        ['aria-label','placeholder','title'].forEach(attr=>{
          const value=root.getAttribute(attr);
          if(value&&pack[value])root.setAttribute(attr,pack[value]);
        });
      }
      const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode(node){
        return node.parentElement?.closest('script,style,svg')?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT;
      }});
      let node;
      while((node=walker.nextNode()))translateTextNode(node);
    };
    translateRoot(document);
    const observer=new MutationObserver(records=>records.forEach(record=>{
      if(record.type==='characterData')translateTextNode(record.target);
      record.addedNodes.forEach(translateRoot);
    }));
    observer.observe(document.body,{subtree:true,childList:true,characterData:true});
    document.documentElement.dataset.translationComplete=lang;
  };
  if(window.AP_I18N_CONTENT){apply();return}
  const content=document.createElement('script');
  content.src='i18n-content.js?v=20260829-2';
  content.onload=apply;
  document.head.append(content);
})();
