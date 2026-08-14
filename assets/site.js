(() => {
  const pathParts = location.pathname.split('/').filter(Boolean);
  const basePath = pathParts[0] === 'masoon-nexus-site' ? '/masoon-nexus-site/' : '/';

  /* Eine einzige zentrale Gestaltungsdatei */
  if (!document.querySelector('link[href*="assets/global.css"]')) {
    const globalStyle = document.createElement('link');
    globalStyle.rel = 'stylesheet';
    globalStyle.href = `${basePath}assets/global.css?v=20260814-3`;
    document.head.appendChild(globalStyle);
  }

  /* Nur die ausdrücklich gewünschten globalen Anpassungen */
  const requestedStyle = document.createElement('style');
  requestedStyle.textContent = `
    .section-label::before{display:none!important;content:none!important}
    .card-number,.service-number{font-size:var(--label-size,11px)!important;line-height:1.4!important}
    .details-action,.article-action{display:inline-block!important}
    .details-action::before,.article-action::before,.details-action::after,.article-action::after{display:none!important;content:none!important}
    .details-action::after{display:inline!important;content:' +'!important}
    .article-action::after{display:inline!important;content:' ↗'!important}
    .text-link>span[aria-hidden="true"]{position:static!important;display:inline!important;width:auto!important;height:auto!important;margin-left:4px!important;font-size:inherit!important;line-height:inherit!important;vertical-align:baseline!important}
    .text-link>span[aria-hidden="true"]::before,.text-link>span[aria-hidden="true"]::after{display:none!important;content:none!important}
    .knowledge-section .article-action{margin-top:18px!important;font-family:var(--font-inter,Arial,sans-serif)!important;font-size:11px!important;font-weight:500!important;line-height:1.4!important;letter-spacing:.12em!important;text-transform:uppercase!important;color:#868279!important}
  `;
  document.head.appendChild(requestedStyle);

  /* Eine einzige zentrale Fusszeile für alle Seiten */
  const footer = document.querySelector('.site-footer');
  if (footer) {
    footer.innerHTML = `
      <div class="footer-main">
        <div>
          <h2>Unternehmen</h2>
          <address>MASOON TREUHAND<br />Täschmattstrasse 19<br />6015 Luzern</address>
        </div>
        <div>
          <h2>Kontakt</h2>
          <p><a href="mailto:info@masoontreuhand.ch">info@masoontreuhand.ch</a><br /><a href="tel:+41799663636">+41 79 966 36 36</a></p>
        </div>
        <div>
          <h2>Öffnungszeiten</h2>
          <p>Montag–Freitag<br />08.00–12.00 Uhr<br />13.00–17.00 Uhr</p>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© 2026 MASOON TREUHAND | Alle Rechte vorbehalten.</span>
        <div>
          <a href="${basePath}impressum/index.html">Impressum</a>
          <span aria-hidden="true"> | </span>
          <a href="${basePath}datenschutz/index.html">Datenschutz</a>
        </div>
      </div>`;
  }

  /* Zusammenarbeit: nur Formatierung vereinheitlichen, Inhalte pro Seite beibehalten */
  document.querySelectorAll('.expectation-editorial').forEach(section => {
    section.classList.add('mandate-compass', 'expectation-compass', 'expectation-editorial');
  });

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

  /* Fachwissen: Aktionshinweis für die künftig verlinkten Beiträge */
  document.querySelectorAll('.knowledge-section .article-card').forEach(card => {
    if (!card.querySelector('.article-action')) {
      const action = document.createElement('span');
      action.className = 'article-action';
      action.textContent = 'Beitrag anzeigen';
      card.appendChild(action);
    }
  });

  /* Unveröffentlichte Beiträge dürfen nicht auf dieselbe Übersicht zurückführen. */
  document.querySelectorAll('.knowledge-section .article-card a').forEach(link => {
    const target = new URL(link.href, location.href);
    if (target.pathname === location.pathname) {
      const status = document.createElement('span');
      status.className = 'article-status';
      status.textContent = 'Beitrag in Vorbereitung';
      link.replaceWith(status);
    }
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
})();
