(() => {
  if (location.pathname.includes('/unternehmen/')) {
    const fontFix = document.createElement('style');
    fontFix.textContent = `
      @font-face{font-family:'Inter';font-style:normal;font-weight:100 900;font-display:swap;src:url('../assets/_vinext_fonts/inter-9df0d028785c/inter-1ab1ad55.woff2') format('woff2');}
      @font-face{font-family:'Cormorant Garamond';font-style:normal;font-weight:500 600;font-display:swap;src:url('../assets/_vinext_fonts/cormorant-garamond-ff0b6567a197/cormorant-garamond-e99b45a2.woff2') format('woff2');}
      @font-face{font-family:'Bitter';font-style:normal;font-weight:400 700;font-display:swap;src:url('../assets/_vinext_fonts/bitter-cce6d5fc59e8/bitter-822c205b.woff2') format('woff2');}
      body{--font-inter:'Inter',Arial,sans-serif;--font-cormorant:'Cormorant Garamond',Georgia,serif;--font-bitter:'Bitter',Georgia,serif;}
      .expectation-compass__heading h2,.expectation-editorial__item h3{font-family:'Cormorant Garamond',Georgia,serif!important;}
    `;
    document.head.appendChild(fontFix);
  }

  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('site-nav--open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
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
      el.style.setProperty('--parallax-y', `${Math.max(-factor, Math.min(factor, progress * factor))}px`);
    });
    document.querySelectorAll('[data-parallax-background]').forEach(el => {
      const rect = el.getBoundingClientRect();
      const y = Math.max(-80, Math.min(80, (window.innerHeight / 2 - rect.top) * 0.05));
      el.style.setProperty('--parallax-background-y', `${y}px`);
    });

    const section = document.querySelector('.home-expectations');
    if (section) {
      const sticky = section.querySelector('.home-expectations__sticky');
      const frames = [...section.querySelectorAll('.home-expectations__bloom span')];
      if (sticky && frames.length) {
        const rect = section.getBoundingClientRect();
        const travel = Math.max(1, section.offsetHeight - window.innerHeight);
        const progress = Math.max(0, Math.min(1, -rect.top / travel));
        const index = Math.min(frames.length - 1, Math.floor(progress * frames.length));
        frames.forEach((frame, i) => frame.style.opacity = i === index ? '1' : '0');
      }
    }
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
