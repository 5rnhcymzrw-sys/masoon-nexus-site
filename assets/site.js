(() => {
  const pathParts = location.pathname.split('/').filter(Boolean);
  const basePath = pathParts[0] === 'masoon-nexus-site' ? '/masoon-nexus-site/' : '/';

  /* Eine einzige zentrale Gestaltungsdatei */
  if (!document.querySelector('link[href*="assets/global.css"]')) {
    const globalStyle = document.createElement('link');
    globalStyle.rel = 'stylesheet';
    globalStyle.href = `${basePath}assets/global.css?v=20260901-5`;
    document.head.appendChild(globalStyle);
  }

  /* Nur die ausdrücklich gewünschten globalen Anpassungen */
  const requestedStyle = document.createElement('style');
  requestedStyle.textContent = `
    .section-label::before{display:none!important;content:none!important}
    .card-number,.service-number,.article-meta,.details-action,.article-action,.text-link{font-family:var(--font-inter,Arial,sans-serif)!important;font-size:var(--label-size,11px)!important;font-weight:500!important;line-height:1.4!important;letter-spacing:.14em!important;text-transform:uppercase!important}
    .details-action,.article-action{display:inline-block!important}
    .details-action::before,.article-action::before,.details-action::after,.article-action::after{display:none!important;content:none!important}
    .details-action::after{display:inline!important;content:' +'!important}
    .article-action::after{display:inline-block!important;content:'›'!important;margin-left:10px!important;font-size:20px!important;font-weight:300!important;line-height:.7!important;vertical-align:-2px!important}
    .text-link,.details-action,.article-action{text-decoration:none!important;border-bottom:0!important;box-shadow:none!important;transition:color .18s ease!important}
    .text-link:hover,.details-action:hover,.article-action:hover{color:#868279!important}
    .text-link::before,.text-link::after{display:none!important;content:none!important;border:0!important}
    .text-link>span[aria-hidden="true"]{position:static!important;display:inline!important;width:auto!important;height:auto!important;margin-left:4px!important;font-size:12px!important;line-height:inherit!important;vertical-align:baseline!important;border:0!important;text-decoration:none!important}
    .text-link>span[aria-hidden="true"]::before,.text-link>span[aria-hidden="true"]::after{display:none!important;content:none!important}
    .home-paths__grid a{justify-content:center!important;align-items:flex-start!important;text-align:left!important}
    .knowledge-section .article-action{margin-top:18px!important;font-family:var(--font-inter,Arial,sans-serif)!important;font-size:var(--label-size,11px)!important;font-weight:500!important;line-height:1.4!important;letter-spacing:.14em!important;text-transform:uppercase!important;color:#868279!important}
    .site-footer{background-position:center,50% 80%!important}
  `;
  document.head.appendChild(requestedStyle);

  /* Eine einzige zentrale Fusszeile für alle Seiten */
  const footer = document.querySelector('.site-footer');
  if (footer) {
    footer.innerHTML = `
      <div class="footer-simple">
        <a href="${basePath}">Startseite</a>
        <a href="${basePath}unternehmen/index.html">Unternehmen</a>
        <a href="${basePath}dienstleistungen/index.html">Dienstleistungen</a>
        <a href="${basePath}fachwissen/index.html">Fachwissen</a>
        <a href="${basePath}kontakt/index.html">Kontakt</a>
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
    logo.src = `${basePath}company-logo-transparent-3.png?v=20260902-1`;
  }

  const portrait = document.querySelector('.home-company__image-primary');
  if (portrait) {
    portrait.removeAttribute('srcset');
    portrait.removeAttribute('sizes');
    portrait.src = `${basePath}portrait-unternehmen.png`;
  }

  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');

  const alignFooterWithNavigation = () => {
    if (!nav || window.innerWidth <= 1050) {
      document.documentElement.style.removeProperty('--footer-nav-width');
      return;
    }
    document.documentElement.style.setProperty('--footer-nav-width', `${nav.getBoundingClientRect().width}px`);
  };
  alignFooterWithNavigation();
  window.addEventListener('resize', alignFooterWithNavigation);

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
