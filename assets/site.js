(() => {
  const pathParts = location.pathname.split('/').filter(Boolean);
  const basePath = pathParts[0] === 'masoon-nexus-site' ? '/masoon-nexus-site/' : '/';

  /* Eine einzige zentrale Gestaltungsdatei */
  if (!document.querySelector('link[href*="assets/global.css"]')) {
    const globalStyle = document.createElement('link');
    globalStyle.rel = 'stylesheet';
    globalStyle.href = `${basePath}assets/global.css?v=20260812-9`;
    document.head.appendChild(globalStyle);
  }

  /* Zusammenarbeit: nur Formatierung vereinheitlichen, Inhalte pro Seite beibehalten */
  document.querySelectorAll('.expectation-editorial').forEach(section => {
    section.classList.add('mandate-compass', 'expectation-compass', 'expectation-editorial');
  });

  /* EINE zentrale Fusszeile für die gesamte Website */
  const footerHtml = `
    <footer class="site-footer" data-parallax-background="true">
      <div class="footer-main">
        <div><h2>Unternehmen</h2><address>MASOON TREUHAND<br />Täschmattstrasse 19<br />6015 Luzern</address></div>
        <div><h2>Kontakt</h2><p><a href="mailto:info@masoontreuhand.ch">info@masoontreuhand.ch</a><br /><a href="tel:+41799663636">+41 79 966 36 36</a></p></div>
        <div><h2>Öffnungszeiten</h2><p>Montag–Freitag<br />08.00–12.00 Uhr<br />13.00–17.00 Uhr</p></div>
      </div>
      <div class="footer-bottom"><span>© 2026 MASOON TREUHAND | Alle Rechte vorbehalten.</span><div><a href="${basePath}impressum/index.html">Impressum</a><span aria-hidden="true"> | </span><a href="${basePath}datenschutz/index.html">Datenschutz</a></div></div>
    </footer>`;

  const existingFooter = document.querySelector('.site-footer');
  if (existingFooter) existingFooter.outerHTML = footerHtml;
  else document.body.insertAdjacentHTML('beforeend', footerHtml);

  const logo = document.querySelector('.brand img, .site-logo img');
  if (logo) {
    logo.removeAttribute('srcset');
    logo.removeAttribute('sizes');
    logo.src = `${basePath}white_logo_transparent_background.png`;
  }

  const portrait = document.querySelector('.home-company__image-primary');
  if (portrait) {
    portrait.removeAttribute('srcset');
    portrait.removeAttribute('sizes');
    portrait.src = `${basePath}portrait-unternehmen.png`;
  }

  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('site-nav--open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('site-nav--open');
      toggle.setAttribute('aria-expanded', 'false');
    }));
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
  } else reveals.forEach(el => el.classList.add('is-visible'));

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
  if (form) form.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(form);
    const subject = encodeURIComponent('Kontaktanfrage über die Website');
    const body = encodeURIComponent(`Nachname: ${data.get('nachname') || ''}\nVorname: ${data.get('vorname') || ''}\nE-Mail: ${data.get('email') || ''}\nTelefon: ${data.get('telefon') || ''}\n\n${data.get('nachricht') || ''}`);
    window.location.href = `mailto:info@masoontreuhand.ch?subject=${subject}&body=${body}`;
  });
})();