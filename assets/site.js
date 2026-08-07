(() => {
  const pathParts = location.pathname.split('/').filter(Boolean);
  const basePath = pathParts[0] === 'masoon-nexus-site' ? '/masoon-nexus-site/' : '/';

  const isKnowledge = location.pathname.includes('/fachwissen/');
  if (!isKnowledge && !document.querySelector('link[href$="masoon-custom.css"]')) {
    const custom = document.createElement('link');
    custom.rel = 'stylesheet';
    custom.href = `${basePath}assets/masoon-custom.css`;
    document.head.appendChild(custom);
  }

  const navLineStyle = document.createElement('style');
  navLineStyle.textContent = `.site-nav a:after{height:1px!important;background:#b8b8b8!important;background-image:none!important;transition:none!important;box-shadow:none!important;filter:none!important;}`;
  document.head.appendChild(navLineStyle);

  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('site-nav--open');
      toggle.setAttribute('aria-expanded', String(open));
    });

    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('site-nav--open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const reveals = document.querySelectorAll('.scroll-reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    reveals.forEach(el => observer.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('is-visible'));
  }

  document.querySelectorAll('.mandate-faq details').forEach(details => {
    details.addEventListener('toggle', () => {
      if (!details.open) return;
      document.querySelectorAll('.mandate-faq details[open]').forEach(other => {
        if (other !== details) other.open = false;
      });
    });
  });

  const updateScrollEffects = () => {
    document.querySelectorAll('[data-parallax]').forEach(el => {
      const factor = Number(el.dataset.parallax || 20);
      const rect = el.getBoundingClientRect();
      const progress = (window.innerHeight / 2 - (rect.top + rect.height / 2)) / window.innerHeight;
      const y = Math.max(-factor, Math.min(factor, progress * factor));
      el.style.setProperty('--parallax-y', `${y}px`);
    });

    document.querySelectorAll('[data-parallax-background]').forEach(el => {
      const rect = el.getBoundingClientRect();
      const y = Math.max(-80, Math.min(80, (window.innerHeight / 2 - rect.top) * 0.05));
      el.style.setProperty('--parallax-background-y', `${y}px`);
    });
  };

  updateScrollEffects();
  window.addEventListener('scroll', updateScrollEffects, { passive: true });
  window.addEventListener('resize', updateScrollEffects);

  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', event => {
      event.preventDefault();
      const data = new FormData(form);
      const subject = encodeURIComponent('Kontaktanfrage über die Website');
      const body = encodeURIComponent(
        `Nachname: ${data.get('nachname') || ''}\n` +
        `Vorname: ${data.get('vorname') || ''}\n` +
        `E-Mail: ${data.get('email') || ''}\n` +
        `Telefon: ${data.get('telefon') || ''}\n\n` +
        `${data.get('nachricht') || ''}`
      );
      window.location.href = `mailto:info@masoontreuhand.ch?subject=${subject}&body=${body}`;
    });
  }
})();
