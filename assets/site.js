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

  /* Nur Fachbeitragskarten behalten den bestehenden Reveal-Effekt. */
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





  // Align the footer to whole CSS pixels so end-of-page scroll rounding
  // cannot place otherwise identical footers on different pixel fractions.
  const pixelAlignedFooter = document.querySelector('.site-footer');
  if (pixelAlignedFooter && document.querySelector('main.home, .company-legal-section')) {
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
})();
