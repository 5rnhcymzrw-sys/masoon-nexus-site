(() => {
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

  /* Fachbeitragskarten behalten den bestehenden Reveal-Effekt. */
  const reveals = document.querySelectorAll('.knowledge-section .article-card.scroll-reveal');
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

  /* Fachwissen: Browser-Zurueck stellt die Position des geoeffneten Beitrags wieder her. */
  const fachwissenPath = /\/fachwissen\/(?:index\.html)?$/;
  if (fachwissenPath.test(location.pathname)) {
    const restoreFachwissenPosition = () => {
      const state = history.state || {};
      const savedY = Number(state.fachwissenScrollY);
      const savedArticle = state.fachwissenArticlePath;
      if (!savedArticle && !Number.isFinite(savedY)) return;
      requestAnimationFrame(() => requestAnimationFrame(() => {
        const matchingLink = [...document.querySelectorAll('.knowledge-section .article-card a')].find(link => {
          return new URL(link.href, location.href).pathname === savedArticle;
        });
        const card = matchingLink && matchingLink.closest('.article-card');
        if (card) card.scrollIntoView({ block: 'center', inline: 'nearest' });
        else if (Number.isFinite(savedY)) window.scrollTo(0, savedY);
      }));
    };

    const navigationEntry = performance.getEntriesByType('navigation')[0];
    window.addEventListener('pageshow', event => {
      if (event.persisted || (navigationEntry && navigationEntry.type === 'back_forward')) {
        restoreFachwissenPosition();
      }
    });

    document.querySelectorAll('.knowledge-section .article-card a').forEach(link => {
      link.addEventListener('click', () => {
        history.replaceState({
          ...(history.state || {}),
          fachwissenScrollY: window.scrollY,
          fachwissenArticlePath: new URL(link.href, location.href).pathname
        }, '');
      });
    });
  }

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

  const homeContactTitle = document.querySelector('body.page-home .home-contact-band h2.global-title');
  if (homeContactTitle) {
    homeContactTitle.innerHTML = 'Verlässliche<br>Treuhandlösungen<br>für Ihr Unternehmen.';
  }

  document.querySelectorAll(
    'body.page-home main.home h1.global-title, ' +
    'body.page-home main.home .home-values .section-heading h2.global-title, ' +
    'body.page-home main.home .home-paths__heading h2.global-title, ' +
    'body.page-home main.home .home-contact-band h2.global-title'
  ).forEach(title => {
    title.style.setProperty('font-family', '"PT Serif", Georgia, serif', 'important');
    title.style.setProperty('font-weight', '700', 'important');
    title.style.setProperty('font-size', '46px', 'important');
    title.style.setProperty('line-height', '1.08', 'important');
    title.style.setProperty('letter-spacing', '-.018em', 'important');
    title.style.setProperty('font-style', 'normal', 'important');
    title.style.setProperty('-webkit-text-stroke', '0', 'important');
    title.style.setProperty('font-synthesis', 'none', 'important');
  });

  if (document.body.classList.contains('page-knowledge')) {
    const lineStyle = document.createElement('style');
    lineStyle.textContent = `
      html body.page-knowledge.site-light-page main .knowledge-section#knowledge-articles .articles-grid > .article-card.article-card > h2 {
        align-self: stretch !important;
        width: 100% !important;
        max-width: none !important;
        padding-bottom: 22px !important;
        background-image: linear-gradient(90deg,#f3e8d4 0%,#e8e5df 38%,#c7cbd3 66%,#8d96a8 100%) !important;
        background-repeat: no-repeat !important;
        background-position: left bottom !important;
        background-size: 100% 1px !important;
      }
      html body.page-knowledge.site-light-page main .knowledge-section#knowledge-articles .articles-grid > .article-card.article-card > h2::after {
        content: none !important;
        display: none !important;
      }
    `;
    document.head.appendChild(lineStyle);

    document.querySelectorAll('.knowledge-section .article-card').forEach(card => {
      const link = card.querySelector('a[href]');
      if (!link) return;
      card.style.cursor = 'pointer';
      card.setAttribute('role', 'link');
      card.tabIndex = 0;
      card.addEventListener('click', event => {
        if (event.target.closest('a')) return;
        link.click();
      });
      card.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          link.click();
        }
      });
    });
  }

  // Align the footer to whole CSS pixels so end-of-page scroll rounding
  // cannot place otherwise identical footers on different pixel fractions.
  const pixelAlignedFooter = document.querySelector('.site-footer');
  if (pixelAlignedFooter && document.querySelector('main.home, .company-legal-section, [data-align-footer]')) {
    let footerFrame = 0;
    let footerAdjustment = 0;
    const alignFooter = () => {
      footerFrame = 0;
      const top = pixelAlignedFooter.getBoundingClientRect().top + window.scrollY;
      const baseTop = top - footerAdjustment;
      const adjustment = Math.ceil(baseTop - 0.0001) - baseTop;
      if (Math.abs(adjustment - footerAdjustment) < 0.001) return;
      pixelAlignedFooter.style.setProperty('top', adjustment + 'px', 'important');
      pixelAlignedFooter.style.setProperty('margin-bottom', adjustment + 'px', 'important');
      footerAdjustment = parseFloat(getComputedStyle(pixelAlignedFooter).top) || 0;
    };
    const scheduleFooterAlignment = () => {
      if (!footerFrame) footerFrame = requestAnimationFrame(alignFooter);
    };
    scheduleFooterAlignment();
    window.addEventListener('load', scheduleFooterAlignment, { once: true });
    window.addEventListener('resize', scheduleFooterAlignment, { passive: true });
    if (document.fonts) document.fonts.ready.then(scheduleFooterAlignment);
    if (typeof ResizeObserver !== 'undefined') {
      const footerLayoutObserver = new ResizeObserver(scheduleFooterAlignment);
      footerLayoutObserver.observe(document.body);
    }
  }

  // Die Logoausrichtung erfolgt bereits beim ersten Rendern in global.css.
})();
