(() => {
  const navLineStyle = document.createElement('style');
  navLineStyle.textContent = `.site-nav a:after{background:#b8b8b8!important;background-image:none!important;transition:none!important;box-shadow:none!important;filter:none!important;}`;
  document.head.appendChild(navLineStyle);

  const sectionLabelStyle = document.createElement('style');
  sectionLabelStyle.textContent = `.section-label{font-family:var(--font-inter),Arial,sans-serif!important;font-size:11px!important;font-weight:500!important;line-height:1.65!important;letter-spacing:.16em!important;text-transform:uppercase!important;}`;
  document.head.appendChild(sectionLabelStyle);

  const serviceTextStyle = document.createElement('style');
  serviceTextStyle.textContent = `.home-values__item p{line-height:1.55!important;}`;
  document.head.appendChild(serviceTextStyle);

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

  const editorParams = new URLSearchParams(location.search);
  if (editorParams.get('edit') === '1') {
    document.querySelectorAll('a[href]').forEach(link => {
      try {
        const url = new URL(link.href, location.href);
        if (url.origin === location.origin && url.pathname.includes('/masoon-nexus-site/')) {
          url.searchParams.set('edit', '1');
          link.href = url.href;
        }
      } catch (_) {}
    });

    const storageKey = `masoon-preview:${location.pathname}`;
    const editableSelector = 'main h1, main h2, main h3, main p, main li, main a, footer h2, footer h3, footer p, footer li, footer a';
    const editable = [...document.querySelectorAll(editableSelector)]
      .filter(el => !el.closest('nav') && !el.closest('form') && el.textContent.trim());

    const saved = JSON.parse(localStorage.getItem(storageKey) || '{}');
    editable.forEach((el, index) => {
      el.dataset.masoonEditId = String(index);
      if (Object.prototype.hasOwnProperty.call(saved, index)) el.innerHTML = saved[index];
    });

    const editorStyle = document.createElement('style');
    editorStyle.textContent = `
      body.masoon-editing [data-masoon-edit-id]{outline:1px dashed rgba(183,156,111,.85);outline-offset:4px;cursor:text;}
      body.masoon-editing [data-masoon-edit-id]:focus{outline:2px solid #b79c6f;background:rgba(255,255,255,.08);}
      .masoon-editor{position:fixed;right:18px;bottom:18px;z-index:2147483647;display:flex;gap:8px;padding:10px;background:rgba(20,20,20,.94);border:1px solid rgba(255,255,255,.22);border-radius:10px;box-shadow:0 10px 30px rgba(0,0,0,.28);font-family:Arial,sans-serif}
      .masoon-editor button{appearance:none;border:1px solid rgba(255,255,255,.35);background:#fff;color:#111;padding:9px 12px;border-radius:7px;font-size:13px;cursor:pointer}
      .masoon-editor button[data-action="reset"]{background:transparent;color:#fff}
      .masoon-editor__status{position:fixed;right:18px;bottom:78px;z-index:2147483647;background:#111;color:#fff;padding:8px 10px;border-radius:7px;font:12px Arial,sans-serif;opacity:0;transform:translateY(4px);transition:.2s}
      .masoon-editor__status.is-visible{opacity:1;transform:none}
    `;
    document.head.appendChild(editorStyle);

    const panel = document.createElement('div');
    panel.className = 'masoon-editor';
    panel.innerHTML = '<button type="button" data-action="toggle">Bearbeiten</button><button type="button" data-action="save">Speichern</button><button type="button" data-action="reset">Zurücksetzen</button>';
    document.body.appendChild(panel);

    const status = document.createElement('div');
    status.className = 'masoon-editor__status';
    document.body.appendChild(status);

    const showStatus = message => {
      status.textContent = message;
      status.classList.add('is-visible');
      clearTimeout(showStatus.timer);
      showStatus.timer = setTimeout(() => status.classList.remove('is-visible'), 1800);
    };

    let editing = false;
    const setEditing = enabled => {
      editing = enabled;
      document.body.classList.toggle('masoon-editing', enabled);
      editable.forEach(el => {
        el.contentEditable = enabled ? 'true' : 'false';
        el.spellcheck = enabled;
      });
      panel.querySelector('[data-action="toggle"]').textContent = enabled ? 'Bearbeiten beenden' : 'Bearbeiten';
    };

    panel.addEventListener('click', event => {
      const action = event.target.dataset.action;
      if (!action) return;
      if (action === 'toggle') setEditing(!editing);
      if (action === 'save') {
        const values = {};
        editable.forEach((el, index) => values[index] = el.innerHTML);
        localStorage.setItem(storageKey, JSON.stringify(values));
        showStatus('Vorschau gespeichert');
      }
      if (action === 'reset') {
        localStorage.removeItem(storageKey);
        location.reload();
      }
    });
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