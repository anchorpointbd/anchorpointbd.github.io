(() => {
  'use strict';
  const SITE_UPDATED = '05 Sep 2026';
  const pageFile = (location.pathname.split('/').pop() || 'index.html').replace(/\.html$/, '') || 'index';
  const pageKey = pageFile === 'hub' ? 'ecosystem' : pageFile;
  document.body.dataset.page = document.body.dataset.page || pageKey;
  const footer = document.querySelector('footer') || (() => {
    const el = document.createElement('footer');
    el.className = 'brief-footer';
    el.innerHTML = '<a class="brand" href="index.html"><img src="assets/logo-emblem.svg" alt="" width="46"><span><b>ANCHOR POINT</b><small>Anchored in Excellence</small></span></a><p>Engineering at Ease.</p><nav><a href="index.html">Home</a><a href="services.html">Services</a><a href="privacy.html">Privacy</a><a href="terms.html">Terms</a></nav>';
    document.body.append(el);
    return el;
  })();
  if (!footer.querySelector('.site-maintenance')) {
    const meta = document.createElement('p');
    meta.className = 'site-maintenance';
    meta.innerHTML = `<span>Website last updated · ${SITE_UPDATED}</span><span>Engineering at Ease</span>`;
    footer.append(meta);
  }
  const footerNav = footer.querySelector('nav');
  if (footerNav) footerNav.innerHTML = '<a href="about.html">About</a><a href="services.html">Services</a><a href="method.html">Method</a><a href="ecosystem.html">Ecosystem</a><a href="privacy.html">Privacy</a><a href="terms.html">Terms</a>';
  const headerNav = document.querySelector('header #nav');
  if (headerNav) {
    headerNav.innerHTML = '<a href="index.html">Home</a><a href="about.html">About</a><a href="services.html">Services</a><a href="method.html">Method</a><a href="ecosystem.html">Ecosystem</a><a href="brief.html">30-Second Brief</a><a class="pill button gold" href="index.html#contact">Bring us a question</a>';
    headerNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
      headerNav.classList.remove('open'); document.querySelector('header .menu')?.setAttribute('aria-expanded', 'false');
    }));
  }
  const file = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('header nav a').forEach((link) => {
    const href = (link.getAttribute('href') || '').split('#')[0];
    if ((file === 'index.html' && (href === '' || href === 'index.html')) || href === file) link.setAttribute('aria-current', 'page');
  });
  const situationData = {
    unclear: ['What decision must this work enable?', 'Clarify the Decision', 'Current proposals, intended outcome, constraints and decision owner.', 'Question brief + evidence map', 'Orient around the unresolved decision.'],
    performance: ['What changed between intended and actual performance?', 'Independent Engineering Review', 'Requirement, operating data, calculations, drawings and recent changes.', 'Technical review note', 'Verify the highest-value uncertainty first.'],
    budget: ['Which costs are committed, required, reviewable, schedule-critical or approval-dependent?', 'Project & Procurement Review', 'Budget, committed orders, remaining scope, quotations, schedule and approvals.', 'Exposure map + prioritized review list', 'Separate protected commitments from reviewable exposure.'],
    supplier: ['What changes if this offer or deviation is accepted?', 'Technical-Commercial Review', 'Requirement, offer, exclusions, deviations, interfaces and lifecycle assumptions.', 'Like-for-like comparison + decision note', 'Normalize both offers onto one decision surface.'],
    coordination: ['Which interface or ownership gap controls the outcome?', 'Systems & Coordination Planning', 'Responsibilities, dependencies, information flow, review points and handover needs.', 'Interface matrix + coordination plan', 'Name the decision boundary where ownership becomes unclear.']
  };
  const situationButtons = [...document.querySelectorAll('[data-primary-situation]')];
  const updateSituation = (key) => {
    const row = situationData[key]; if (!row) return;
    ['situation-question','situation-service','situation-evidence','situation-output','situation-next'].forEach((id, index) => { const node = document.getElementById(id); if (node) node.textContent = row[index]; });
    situationButtons.forEach((button) => { const selected = button.dataset.primarySituation === key; button.setAttribute('aria-selected', String(selected)); button.classList.toggle('active', selected); });
  };
  situationButtons.forEach((button) => button.addEventListener('click', () => updateSituation(button.dataset.primarySituation)));

  document.querySelectorAll('.utility-bar,.mobile-dock').forEach((node) => node.setAttribute('aria-hidden', 'true'));
  document.querySelectorAll('a[href^="hub.html"]').forEach((link) => { link.href = link.getAttribute('href').replace('hub.html', 'ecosystem.html'); });

  const story = {
    index: ['01 / WHO WE ARE', 'Meet the institution behind the method.', 'The principles come first. Then the experience, boundaries and proof behind them.', 'Continue to About', 'about.html', 'Home → About → Services → Method → Ecosystem → Brief'],
    about: ['02 / WAYS WE CAN HELP', 'Move from identity to a real situation.', 'See how an unresolved decision becomes a bounded review, comparison or planning assignment.', 'Continue to Services', 'services.html', 'Home → About → Services → Method → Ecosystem → Brief'],
    services: ['03 / HOW THE REASONING WORKS', 'See what protects the decision.', 'Follow the five-stage method, evidence checks and responsibility boundaries behind the work.', 'Continue to Method', 'method.html', 'Home → About → Services → Method → Ecosystem → Brief'],
    method: ['04 / USE THE THINKING', 'Move from method to a working desk.', 'Calculate, convert, learn, inspect sources and explore how assumptions change an answer.', 'Continue to Ecosystem', 'ecosystem.html', 'Home → About → Services → Method → Ecosystem → Brief'],
    ecosystem: ['05 / EXPERIENCE IT QUICKLY', 'Take the 30-Second Brief.', 'A faster route through the same institution: one situation, five services and one visible method.', 'Continue to the Brief', 'brief.html', 'Home → About → Services → Method → Ecosystem → Brief'],
    brief: ['06 / BRING THE DIFFICULT PART', 'Continue with your own question.', 'Start with whatever you have. A Free First Review can first establish whether further work is justified.', 'Start a Free First Review', 'index.html#contact', 'Home → About → Services → Method → Ecosystem → Brief'],
    scientific: ['BACK TO THE ENGINEERING DESK', 'Keep the result connected to its source and assumptions.', 'Return to learning, engineering calculators, conversions and decision-learning tools.', 'Return to Ecosystem', 'ecosystem.html', 'Ecosystem → Scientific desk → Source / verification'],
    convert: ['BACK TO THE ENGINEERING DESK', 'A converted value is only one part of the decision.', 'Return to learning, engineering calculators, scientific work and authoritative sources.', 'Return to Ecosystem', 'ecosystem.html', 'Ecosystem → Conversion desk → Source / verification']
  };
  const next = story[pageKey];
  const main = document.querySelector('main');
  const copyPolish = {
    services: [
      ['#hero .eyebrow','Ways we can help'],
      ['#hero h1','Start with the problem. We can define the work later.'],
      ['#hero .lede','Start with the situation. Then we can decide whether the useful next step is a review, comparison, study, planning exercise—or simply a better-framed question.'],
      ['#families .chapter-head h2','Here are the main ways we can help.'],
      ['#families .chapter-head p','Choose the closest situation first. The service and scope can be refined together once the real decision is clearer.'],
      ['#timing .chapter-head h2','You do not need to wait for a crisis.'],
      ['#engagement .chapter-head .eyebrow','04 · From Question to Decision'],
      ['#contact button[type="submit"]','Ask for a Free First Review →']
    ],
    method: [
      ['#hero .eyebrow','01 · How we think'],
      ['#hero h1','You should be able to see how the answer was reached.'],
      ['#hero .lede','The reasoning should remain visible: evidence, assumptions, options, consequences and authority stay connected as the work moves toward a decision.'],
      ['#promise .chapter-head h2','Clear reasoning, even when the answer is not simple.'],
      ['#core .chapter-head h2','Five steps from uncertainty to action.'],
      ['#checks .chapter-head h2','Five checks before narrowing the answer.'],
      ['#outputs .chapter-head .eyebrow','06 · Working formats'],
      ['#governance .chapter-head .eyebrow','07 · Who decides what'],
      ['#contact .eyebrow','08 · What happens next'],
      ['#contact h2','See what the thinking becomes.']
    ]
  };
  (copyPolish[pageKey] || []).forEach(([selector,value]) => { const node=document.querySelector(selector); if(node) node.textContent=value; });
  if (pageKey === 'services') {
    const heroTitle = document.querySelector('#hero h1');
    if (heroTitle) heroTitle.innerHTML = 'Start with the problem.<br><em>We can define the work later.</em>';
  }
  if (pageKey === 'method') {
    const heroTitle = document.querySelector('#hero h1');
    if (heroTitle) heroTitle.innerHTML = 'You should be able to see<br><em>how the answer was reached.</em>';
  }
  if (pageKey === 'services' && !document.querySelector('.experience-signals')) {
    document.querySelector('#families .service-family')?.insertAdjacentHTML('afterend', `<aside class="experience-signals"><p>EXPERIENCE SIGNALS</p><a href="about.html#experience">Requirement versus specification <b>Independent Engineering Review</b></a><a href="about.html#experience">A technical decision travels through a commercial system <b>Project & Procurement Review</b></a><a href="about.html#experience">Interfaces belong to the problem <b>Systems & Coordination Planning</b></a></aside>`);
  }
  if (pageKey === 'method' && !document.querySelector('.method-experience-links')) {
    document.querySelector('#examples .scenario-lab')?.insertAdjacentHTML('afterend', `<aside class="method-experience-links"><a href="about.html#experience"><span>WHY ASK “WHAT IS ACTUALLY REQUIRED?”</span><b>A preferred specification and a governing requirement are not always the same thing.</b></a><a href="about.html#experience"><span>WHY ASK “WHAT ELSE CHANGES?”</span><b>Solving one constraint can move the problem elsewhere in the system.</b></a></aside>`);
  }
  if (next && main && !document.querySelector('.story-continuation')) {
    const section = document.createElement('section');
    section.className = 'story-continuation';
    section.setAttribute('aria-labelledby', 'story-continuation-title');
    section.innerHTML = `<div><p>${next[0]}</p><h2 id="story-continuation-title">${next[1]}</h2><span>${next[2]}</span><a href="${next[4]}">${next[3]} <b aria-hidden="true">→</b></a></div><small>${next[5]}</small>`;
    main.append(section);
  }

  if (pageKey === 'brief' && !document.querySelector('.brief-home-link')) {
    const home = document.createElement('a');
    home.className = 'brief-home-link';
    home.href = 'index.html';
    home.textContent = 'Home';
    document.querySelector('.brief-top')?.append(home);
  }

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduced && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('ap-visible');
      observer.unobserve(entry.target);
    }), { threshold: 0.08, rootMargin: '0px 0px -36px' });
    document.querySelectorAll('main > section:not(:first-child):not(.hero):not(.pagehero), main .chapter-head').forEach((node) => {
      node.classList.add('ap-reveal'); observer.observe(node);
    });
  }
})();
