
  // ---------- CORE ENGINE: devtemDesign ----------
  // developer only needs to pass a config object
  window.devtemDesign = function(appid="app-root", config) {
    // ---- Design System Template Palette (color & style DNA)
    const templates = {
      figsh: {
        '--glass-bg': 'rgba(20, 28, 40, 0.35)',
        '--glass-border': 'rgba(122, 244, 255, 0.2)',
        '--glass-blur': 'blur(20px)',
        '--accent': '#7af4ff',
        '--accent2': '#b77cff',
        '--accent3': '#ff7096',
        '--text': '#f4f9ff',
        '--muted': 'rgba(210, 225, 255, 0.5)',
        '--bg-deep': '#050b14'
      },
      cyber: {
        '--glass-bg': 'rgba(0, 15, 30, 0.5)',
        '--glass-border': 'rgba(0, 255, 255, 0.3)',
        '--glass-blur': 'blur(16px)',
        '--accent': '#0ff',
        '--accent2': '#f0f',
        '--accent3': '#ff3366',
        '--text': '#eef5ff',
        '--muted': 'rgba(0, 210, 255, 0.55)',
        '--bg-deep': '#01000c'
      },
      aurora: {
        '--glass-bg': 'rgba(10, 35, 25, 0.4)',
        '--glass-border': 'rgba(72, 187, 120, 0.25)',
        '--glass-blur': 'blur(32px)',
        '--accent': '#48bb78',
        '--accent2': '#8b5cf6',
        '--accent3': '#3b82f6',
        '--text': '#ecfdf5',
        '--muted': 'rgba(167, 243, 208, 0.5)',
        '--bg-deep': '#021a1a'
      },
      monochrome: {
        '--glass-bg': 'rgba(20, 20, 25, 0.6)',
        '--glass-border': 'rgba(255, 255, 255, 0.2)',
        '--glass-blur': 'blur(18px)',
        '--accent': '#ffffff',
        '--accent2': '#b0b0b0',
        '--accent3': '#7a7a7a',
        '--text': '#fefefe',
        '--muted': 'rgba(200,200,210,0.5)',
        '--bg-deep': '#070708'
      }
    };

    const selected = templates[config.template] || templates['figsh'];
    const rootElem = document.documentElement;
    Object.keys(selected).forEach(key => {
      rootElem.style.setProperty(key, selected[key]);
    });

    const container = document.getElementById(appid);
    if (!container) return;
    container.innerHTML = '';

    // ---- CURSOR & RING ----
    const cursorDiv = document.createElement('div'); cursorDiv.id = 'cursor';
    const ringDiv = document.createElement('div'); ringDiv.id = 'cursor-ring';
    const rippleZone = document.createElement('div'); rippleZone.className = 'ripple-container';
    container.append(cursorDiv, ringDiv, rippleZone);

    // ---- AMBIENT ORBS BACKGROUND ----
    const bgLayer = document.createElement('div');
    bgLayer.className = 'bg-layer';
    bgLayer.innerHTML = `<div class="orb orb1"></div><div class="orb orb2"></div><div class="orb orb3"></div><div class="orb orb4"></div>`;
    container.appendChild(bgLayer);

    // ---- NAVIGATION ----
    const navLinksItems = (config.navLinks || ['Discover', 'Studio', 'Archive', 'Journal']).map(link => `<li><a href="#">${link}</a></li>`).join('');
    const navBar = document.createElement('nav');
    navBar.innerHTML = `
      <div class="nav-logo">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12,2 22,8.5 22,19.5 12,23 2,19.5 2,8.5"/></svg>
        ${config.logoName || 'CORE'}
      </div>
      <ul class="nav-links">${navLinksItems}</ul>
      <button class="nav-cta">${config.ctaText || 'Launch →'}</button>
    `;
    container.appendChild(navBar);

    // ---- HERO SECTION ----
    const heroSection = document.createElement('section');
    heroSection.className = 'hero';
    const brandChips = (config.brands || []).map((b, idx) => `<span style="font-family: monospace; font-weight: 500; color: ${idx % 2 === 0 ? 'var(--accent)' : 'var(--accent2)'};">${b.toUpperCase()}</span>`).join('<span style="color:var(--muted); margin:0 8px;">✦</span>');
    heroSection.innerHTML = `
      <div class="hero-tag">✦ ${config.heroTag || 'design engine active'}</div>
      <h1 class="hero-title">
        <span class="word">${config.heroTitleLine1 || 'Generative'}</span>&nbsp;
        <span class="word"><span class="gradient-word">${config.heroTitleLine2 || 'Page Weaver'}</span></span>
      </h1>
      <p class="hero-sub">${config.heroSubtitle || 'Pick a template, inject content, and experience real-time animated page synthesis.'}</p>
      <div class="hero-buttons">
        <button class="btn-primary">${config.primaryBtnText || 'Explore Templates'}</button>
        <button class="btn-ghost">${config.secondaryBtnText || 'Docs →'}</button>
      </div>
      ${config.brands && config.brands.length ? `<div class="hero-inline-brands"><div style="display:flex; flex-wrap:wrap; justify-content:center; gap:24px; align-items:center;">${brandChips}</div><div style="height:1px; background:linear-gradient(90deg,transparent,var(--accent),transparent); margin:22px 0 12px;"></div><div style="color:var(--muted); font-size:0.75rem; text-align:center;">${config.brandsSubtitle || 'global innovators, design pioneers'}</div></div>` : ''}
    `;
    container.appendChild(heroSection);

    // ---- MARQUEE (brand loop) ----
    if (config.brands && config.brands.length) {
      const marqueeWrap = document.createElement('div');
      marqueeWrap.className = 'marquee-section';
      const repeated = [...config.brands, ...config.brands, ...config.brands];
      const marqueeInner = repeated.map(b => `<span class="marquee-item"><span class="marquee-dot"></span>${b.toUpperCase()}</span>`).join('');
      marqueeWrap.innerHTML = `<div class="marquee-track">${marqueeInner}</div>`;
      container.appendChild(marqueeWrap);
    }

    // ---- FEATURES GRID ----
    if (config.features && config.features.length) {
      const featSec = document.createElement('section');
      featSec.className = 'features';
      const cardsHtml = config.features.map(f => `
        <div class="feature-card reveal">
          <div class="feature-icon">${f.icon || `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/><circle cx="12" cy="12" r="3"/></svg>`}</div>
          <div class="feature-title">${f.title}</div>
          <div class="feature-desc">${f.desc}</div>
        </div>
      `).join('');
      featSec.innerHTML = `
        <div class="section-label reveal">${config.featuresSectionLabel || 'core modules'}</div>
        <h2 class="section-title reveal">${config.featuresSectionTitle || 'Smart content injection & ambient animations'}</h2>
        <div class="features-grid">${cardsHtml}</div>
      `;
      container.appendChild(featSec);
    }

    // ---- EXTRA PANELS (dynamic cards) ----
    if (config.panels && config.panels.length) {
      const panelsSection = document.createElement('section');
      panelsSection.className = 'panels-section';
      const panelsHtml = config.panels.map((p, idx) => `
        <div class="panel reveal">
          <div class="panel-num">0${idx+1} · ${p.tag || 'core'}</div>
          <div class="panel-title">${p.title}</div>
          <div style="color:var(--muted); line-height:1.5;">${p.desc}</div>
        </div>
      `).join('');
      panelsSection.innerHTML = `<div class="panels-row">${panelsHtml}</div>`;
      container.appendChild(panelsSection);
    }

    // ---- FOOTER with BRANDS ----
    const footer = document.createElement('footer');
    const footerBrandsList = (config.brands ? config.brands.slice(0,5) : []).map(b => `<span>${b}</span>`).join('<span style="opacity:0.4;">·</span>');
    footer.innerHTML = `
      <div class="footer-left">
        <span class="footer-logo"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"><polygon points="12,2 22,8.5 22,19.5 12,23 2,19.5 2,8.5"/></svg>${(config.logoName || 'CORE').toUpperCase()}</span>
        <span class="footer-copy">© ${new Date().getFullYear()} ${config.footerCopy || 'Design engine'}</span>
      </div>
      <div class="footer-brand">${footerBrandsList || 'studio'}</div>
    `;
    container.appendChild(footer);

    // ---- INTERACTION + REVEAL ANIMATIONS (cursor, ripples, observer)
    function initInteractions() {
      let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;
      if (window.matchMedia('(pointer: fine)').matches) {
        document.addEventListener('mousemove', (e) => {
          mouseX = e.clientX;
          mouseY = e.clientY;
          if (cursorDiv) {
            cursorDiv.style.left = mouseX + 'px';
            cursorDiv.style.top = mouseY + 'px';
          }
        });
        const animateRing = () => {
          ringX += (mouseX - ringX) * 0.12;
          ringY += (mouseY - ringY) * 0.12;
          if (ringDiv) {
            ringDiv.style.left = ringX + 'px';
            ringDiv.style.top = ringY + 'px';
          }
          requestAnimationFrame(animateRing);
        };
        animateRing();
        const interactiveEls = document.querySelectorAll('a, button, .feature-card, .panel, .btn-primary, .btn-ghost');
        interactiveEls.forEach(el => {
          el.addEventListener('mouseenter', () => {
            if (cursorDiv) { cursorDiv.style.transform = 'translate(-50%,-50%) scale(2.2)'; cursorDiv.style.background = 'var(--accent2)'; }
            if (ringDiv) { ringDiv.style.width = '58px'; ringDiv.style.height = '58px'; ringDiv.style.borderColor = 'var(--accent2)'; }
          });
          el.addEventListener('mouseleave', () => {
            if (cursorDiv) { cursorDiv.style.transform = 'translate(-50%,-50%) scale(1)'; cursorDiv.style.background = 'var(--accent)'; }
            if (ringDiv) { ringDiv.style.width = '40px'; ringDiv.style.height = '40px'; ringDiv.style.borderColor = 'var(--accent)'; }
          });
        });
        document.addEventListener('click', (e) => {
          const rippleEl = document.createElement('div');
          rippleEl.style.position = 'absolute';
          rippleEl.style.width = '12px';
          rippleEl.style.height = '12px';
          rippleEl.style.borderRadius = '50%';
          rippleEl.style.border = '1px solid var(--accent)';
          rippleEl.style.left = e.clientX + 'px';
          rippleEl.style.top = e.clientY + 'px';
          rippleEl.style.transform = 'translate(-50%,-50%) scale(0)';
          rippleEl.style.animation = 'rippleAnim 0.7s ease-out forwards';
          rippleZone.appendChild(rippleEl);
          setTimeout(() => rippleEl.remove(), 700);
        });
      }
      const revealObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObs.unobserve(entry.target); } });
      }, { threshold: 0.12 });
      document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));
      if (!document.getElementById('engineKeyframes')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'engineKeyframes';
        styleSheet.textContent = `@keyframes rippleAnim { to { transform: translate(-50%, -50%) scale(6); opacity: 0; width: 180px; height: 180px; } from { width: 8px; height: 8px; opacity: 0.8; } }`;
        document.head.appendChild(styleSheet);
      }
    }
    setTimeout(() => initInteractions(), 20);
  };
