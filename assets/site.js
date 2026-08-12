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

  const isCompany = location.pathname.includes('/unternehmen/');
  if (isCompany && !document.querySelector('link[href*="unternehmen-custom.css"]')) {
    const companyCustom = document.createElement('link');
    companyCustom.rel = 'stylesheet';
    companyCustom.href = `${basePath}assets/unternehmen-custom.css?v=20260812-3`;
    document.head.appendChild(companyCustom);
  }

  const navLineStyle = document.createElement('style');
  navLineStyle.textContent = `.site-nav a:after{height:1px!important;background:#b8b8b8!important;background-image:none!important;transition:none!important;box-shadow:none!important;filter:none!important;}`;
  document.head.appendChild(navLineStyle);

  const heroRollbackStyle = document.createElement('style');
  heroRollbackStyle.textContent = `.home-hero{background-image:linear-gradient(90deg,#060605f7 0%,#060605e3 24%,#06060594 49%,#06060514 75%,#06060505 100%),linear-gradient(#05050500,#0505054d),url("${basePath}hero1.png")!important;background-position:50% 50%,50% 50%,50% 12%!important;background-size:cover!important;background-repeat:no-repeat!important}.home-hero__content{display:block!important}`;
  document.head.appendChild(heroRollbackStyle);

  const normalizeLinkArrows = () => {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => {
      if (/[↗↑]/.test(node.nodeValue || '')) {
        node.nodeValue = node.nodeValue.replace(/[↗↑]\uFE0F?/g, '↗︎');
      }
    });

    document.querySelectorAll('.text-link span[aria-hidden="true"], .home-paths__grid i[aria-hidden="true"]').forEach(element => {
      element.style.setProperty('font-family', 'Arial, Helvetica, sans-serif', 'important');
      element.style.setProperty('font-style', 'normal', 'important');
      element.style.setProperty('font-weight', '400', 'important');
    });
  };

  normalizeLinkArrows();
  requestAnimationFrame(normalizeLinkArrows);

  const syncServiceTypographyFromExpectation = () => {
    const referenceTitle = document.querySelector('.expectation-editorial .expectation-editorial__item h3');
    const referenceText = document.querySelector('.expectation-editorial .expectation-editorial__item p');
    if (!referenceTitle || !referenceText) return;

    const titleStyle = getComputedStyle(referenceTitle);
    const textStyle = getComputedStyle(referenceText);

    const titleProperties = [
      'font-family',
      'font-size',
      'font-weight',
      'font-style',
      'font-stretch',
      'line-height',
      'letter-spacing',
      'text-transform'
    ];

    const textProperties = [
      'font-family',
      'font-size',
      'font-weight',
      'font-style',
      'font-stretch',
      'line-height',
      'letter-spacing',
      'text-transform'
    ];

    document.querySelectorAll('.home-values__item h3, .home-values__item h3 strong').forEach(element => {
      titleProperties.forEach(property => {
        element.style.setProperty(property, titleStyle.getPropertyValue(property), 'important');
      });
    });

    document.querySelectorAll('.home-values__item p').forEach(element => {
      textProperties.forEach(property => {
        element.style.setProperty(property, textStyle.getPropertyValue(property), 'important');
      });
    });
  };

  syncServiceTypographyFromExpectation();
  requestAnimationFrame(syncServiceTypographyFromExpectation);
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(syncServiceTypographyFromExpectation).catch(() => {});
  }

  const syncFooterToNavigation = () => {
    const firstNavLink = document.querySelector('.site-nav a:first-child');
    const lastNavLink = document.querySelector('.site-nav a:last-child');
    const footerMain = document.querySelector('.footer-main');
    if (!firstNavLink || !lastNavLink || !footerMain) return;

    const firstRect = firstNavLink.getBoundingClientRect();
    const lastRect = lastNavLink.getBoundingClientRect();

    if (window.innerWidth <= 800 || firstRect.width < 1 || lastRect.width < 1) {
      footerMain.style.removeProperty('width');
      footerMain.style.removeProperty('max-width');
      footerMain.style.removeProperty('margin-left');
      footerMain.style.removeProperty('margin-right');
      return;
    }

    const left = firstRect.left;
    const right = lastRect.right;

    footerMain.style.setProperty('width', `${right - left}px`, 'important');
    footerMain.style.setProperty('max-width', 'none', 'important');
    footerMain.style.setProperty('margin-left', `${left}px`, 'important');
    footerMain.style.setProperty('margin-right', '0', 'important');
  };

  syncFooterToNavigation();
  requestAnimationFrame(syncFooterToNavigation);
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(syncFooterToNavigation).catch(() => {});
  }
  window.addEventListener('resize', syncFooterToNavigation);

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
