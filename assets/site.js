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
        <a href="${basePath}index.html">© 2026 MASOON TREUHAND</a>
        <a href="${basePath}disclaimer/index.html">Disclaimer</a>
        <a href="${basePath}impressum/index.html">Impressum</a>
        <a href="${basePath}datenschutz/index.html">Datenschutz</a>
        <a href="${basePath}kontakt/index.html">Kontakt</a>
      </div>`;
  }

  /* Zusammenarbeit: nur Formatierung vereinheitlichen, Inhalte pro Seite beibehalten */
  document.querySelectorAll('.expectation-editorial').forEach(section => {
    section.classList.add('mandate-compass', 'expectation-compass', 'expectation-editorial');
  });

  const logo = document.querySelector('.brand img, .site-logo img');
  if (logo && !logo.hasAttribute('data-preserve-logo')) {
    logo.removeAttribute('srcset');
    logo.removeAttribute('sizes');
    logo.src = `${basePath}Logo white_textlogo_transparent_background 02.09.2026.png?v=20260902-1`;
  }

  const portrait = document.querySelector('.home-company__image-primary');
  if (portrait) {
    portrait.removeAttribute('srcset');
    portrait.removeAttribute('sizes');
    portrait.src = `${basePath}Foto-unternehmen.png`;
  }

  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  const contactReferenceLeft = () => Math.max(32, (window.innerWidth - 1227) / 2) + 503;

  /* Navigation auf allen Seiten an der rechten Inhaltslinie ausrichten */
  const alignNavigationWithContent = () => {
    if (!nav) return;
    nav.style.removeProperty('position');
    nav.style.removeProperty('left');
    nav.style.removeProperty('margin');
    nav.style.removeProperty('transform');
    if (window.innerWidth <= 800) return;

    const reference = document.querySelector(
      '.disclaimer-card .prose, .home-contact-band>div, .services-closing__inner, .knowledge-note>div'
    );
    const targetLeft = reference
      ? reference.getBoundingClientRect().left
      : contactReferenceLeft();

    nav.style.setProperty('position', 'absolute', 'important');
    nav.style.setProperty('margin', '0', 'important');
    const parentLeft = nav.offsetParent ? nav.offsetParent.getBoundingClientRect().left : 0;
    nav.style.setProperty('left', `${targetLeft - parentLeft}px`, 'important');
  };
  requestAnimationFrame(alignNavigationWithContent);
  window.addEventListener('load', () => {
    requestAnimationFrame(alignNavigationWithContent);
    setTimeout(alignNavigationWithContent, 300);
  });
  window.addEventListener('resize', alignNavigationWithContent);

  const alignFooterWithNavigation = () => {
    const footerSimple = document.querySelector('.site-footer .footer-simple');
    if (!footerSimple) return;

    const footerLeft = footerSimple.getBoundingClientRect().left;
    const targetLeft = window.innerWidth <= 800 ? footerLeft : contactReferenceLeft();
    const offset = Math.max(0, targetLeft - footerLeft);

    footerSimple.style.setProperty('justify-content', 'flex-start', 'important');
    footerSimple.style.setProperty('padding-left', `${offset}px`, 'important');
    footerSimple.style.setProperty('box-sizing', 'border-box', 'important');
  };
  requestAnimationFrame(alignFooterWithNavigation);
  window.addEventListener('load', () => {
    requestAnimationFrame(alignFooterWithNavigation);
    setTimeout(alignFooterWithNavigation, 300);
  });
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

  /* Fachwissen: Beim Zurück-Link zur vorherigen Position zurückkehren. */
  const fachwissenPath = /\/fachwissen\/(?:index\.html)?$/;
  if (fachwissenPath.test(location.pathname)) {
    const pending = sessionStorage.getItem('fachwissenReturnPending');
    const savedY = Number(sessionStorage.getItem('fachwissenScrollY'));
    const savedArticle = sessionStorage.getItem('fachwissenArticlePath');
    if (pending === '1') {
      sessionStorage.removeItem('fachwissenReturnPending');
      requestAnimationFrame(() => requestAnimationFrame(() => {
        const matchingLink = [...document.querySelectorAll('.knowledge-section .article-card a')].find(link => {
          return new URL(link.href, location.href).pathname === savedArticle;
        });
        const card = matchingLink && matchingLink.closest('.article-card');
        if (card) card.scrollIntoView({ block: 'center', inline: 'nearest' });
        else if (Number.isFinite(savedY)) window.scrollTo(0, savedY);
      }));
    }
    document.querySelectorAll('.knowledge-section .article-card a').forEach(link => {
      link.addEventListener('click', () => {
        sessionStorage.setItem('fachwissenScrollY', String(window.scrollY));
        sessionStorage.setItem('fachwissenArticlePath', new URL(link.href, location.href).pathname);
      });
    });
  }

  document.querySelectorAll('.article-back').forEach(link => {
    link.addEventListener('click', event => {
      const savedY = Number(sessionStorage.getItem('fachwissenScrollY'));
      if (!Number.isFinite(savedY)) return;
      event.preventDefault();
      sessionStorage.setItem('fachwissenReturnPending', '1');
      location.href = link.href;
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




})();
