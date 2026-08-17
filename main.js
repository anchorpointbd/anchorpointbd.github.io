/* ═══════════════════════════════════════════════════════════════
   ANCHOR POINT — CHAPTER 3 MOTION ENGINE
   ═══════════════════════════════════════════════════════════════ */

/* ─── NAVBAR SHADOW ─────────────────────────────────────────── */

const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });


  // Mobile menu
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');

      hamburger.classList.toggle('active', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
      hamburger.setAttribute(
        'aria-label',
        isOpen ? 'Close menu' : 'Open menu'
      );
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'Open menu');
      });
    });
  }


  // Premium scroll reveal
  const reveals = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const element = entry.target;
      const parent = element.parentElement;

      const siblings = parent
        ? [...parent.querySelectorAll('.reveal')]
        : [];

      const index = siblings.indexOf(element);
      const delay = Math.min(Math.max(index, 0) * 70, 280);

      element.style.transitionDelay = `${delay}ms`;
      element.classList.add('visible');

      revealObserver.unobserve(element);
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -70px 0px'
  });

  reveals.forEach(element => revealObserver.observe(element));

}


/* ─── PROCESS CIRCLE INTERACTION ────────────────────────────── */

const processSteps =
  document.querySelectorAll('.process-step');

if (processSteps.length) {

  const processObserver =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          } else {
            entry.target.classList.remove('active');
          }

        });

      },
      {
        threshold: 0.55
      }
    );

  processSteps.forEach(step => {
    processObserver.observe(step);
  });

}


/* ─── CONTACT FORM ──────────────────────────────────────────── */

const form = document.getElementById('contact-form');
const successMsg = document.getElementById('form-success');

function showFieldError(inputId, message) {
  const input = document.getElementById(inputId);
  let err = document.getElementById(inputId + '-err');
  if (!err) {
    err = document.createElement('span');
    err.id = inputId + '-err';
    err.style.cssText = 'display:block;color:#c0392b;font-size:.78rem;margin-top:4px;font-family:Inter,sans-serif';
    input.parentNode.appendChild(err);
  }
  err.textContent = message;
  input.style.borderColor = '#c0392b';
}

function clearFieldError(inputId) {
  const err = document.getElementById(inputId + '-err');
  if (err) err.textContent = '';
  const input = document.getElementById(inputId);
  if (input) input.style.borderColor = '';
}

if (form) {
  ['contact-name','contact-email','contact-message'].forEach(id => {
    document.getElementById(id).addEventListener('input', () => clearFieldError(id));
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let valid = true;

    const name = document.getElementById('contact-name');
    const email = document.getElementById('contact-email');
    const message = document.getElementById('contact-message');

    if (!name.value.trim()) {
      showFieldError('contact-name', 'Please enter your full name.');
      valid = false;
    }
    if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      showFieldError('contact-email', 'Please enter a valid email address.');
      valid = false;
    }
    if (!message.value.trim() || message.value.trim().length < 10) {
      showFieldError('contact-message', 'Please describe your project (at least 10 characters).');
      valid = false;
    }
    if (!valid) return;

    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = 'Sending…';
    btn.disabled = true;
    form.setAttribute('aria-busy', 'true');

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });

      form.setAttribute('aria-busy', 'false');

      if (response.ok) {
        form.style.display = 'none';
        if (successMsg) successMsg.style.display = 'block';
      } else {
        btn.textContent = 'Unable to send — please try again';
        btn.disabled = false;
      }
    } catch (error) {
      form.setAttribute('aria-busy', 'false');
      btn.textContent = 'Unable to send — please try again';
      btn.disabled = false;
    }
  });
}

/* ─── ESCAPE KEY — CLOSE MOBILE MENU ───────────────────────── */

document.addEventListener('keydown', event => {

  if (event.key === 'Escape') {

    if (
      mobileMenu &&
      mobileMenu.classList.contains('open')
    ) {

      mobileMenu.classList.remove('open');

      if (hamburger) {

        hamburger.setAttribute(
          'aria-expanded',
          'false'
        );

        hamburger.setAttribute(
          'aria-label',
          'Open menu'
        );

        hamburger.focus();

      }

    }

  }

});
  /* ─── ACTIVE NAVIGATION SECTION ─────────────────────────────── */

const sections =
  document.querySelectorAll(
    '#about, #services, #sectors, #network, #contact'
  );

const desktopNavLinks =
  document.querySelectorAll('.nav-links a');

const mobileNavLinks =
  document.querySelectorAll('.nav-mobile a');

const updateActiveNav = (id) => {

  [...desktopNavLinks, ...mobileNavLinks]
    .forEach(link => {

      const isActive =
        link.getAttribute('href') === `#${id}`;

      link.classList.toggle(
        'active',
        isActive
      );

      if (isActive) {
        link.setAttribute(
          'aria-current',
          'location'
        );
      } else {
        link.removeAttribute(
          'aria-current'
        );
      }

    });

};

if (sections.length) {

  const sectionObserver =
    new IntersectionObserver(
      entries => {

        const visible =
          entries
            .filter(entry => entry.isIntersecting)
            .sort(
              (a,b) =>
                b.intersectionRatio -
                a.intersectionRatio
            );

        if (visible.length) {
          updateActiveNav(
            visible[0].target.id
          );
        }

      },
      {
        rootMargin: '-30% 0px -55% 0px',
        threshold: [0.05, 0.2, 0.4]
      }
    );

  sections.forEach(section => {
    sectionObserver.observe(section);
  });

}
  /* ═══════════════════════════════════════════════════════════════
   CHAPTER 6 — BACK TO TOP
   ═══════════════════════════════════════════════════════════════ */

const backToTop = document.getElementById('back-to-top');

if (backToTop) {

  const updateBackToTop = () => {

    if (window.scrollY > 600) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }

  };

  window.addEventListener(
    'scroll',
    updateBackToTop,
    { passive: true }
  );

  backToTop.addEventListener('click', () => {

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

  });

  updateBackToTop();

}
  document.getElementById('yr').textContent = new Date().getFullYear();
