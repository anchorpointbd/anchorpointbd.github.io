(() => {
  'use strict';
  const SITE_UPDATED = '05 Sep 2026';
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
})();
