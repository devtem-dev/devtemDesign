/*! devtemDesign v0.1.0 | MIT | https://design.devtem.org */
(function (global) {
  "use strict";

  const VERSION = "0.1.0";
  const STORE_KEY = "devtemDesign:template";

  /* ---------- TEMPLATES ---------- */
  const DARK = {
    "--glass-blur": "blur(20px)",
    "--surface": "rgba(255,255,255,0.04)",
    "--line": "rgba(255,255,255,0.08)",
    "--orb": "0.22"
  };
  const mk = (vars, light) => ({ vars: Object.assign({}, DARK, vars), light: !!light });

  const templates = {
    figsh: mk({
      "--glass-bg": "rgba(20,28,40,0.35)", "--glass-border": "rgba(122,244,255,0.18)",
      "--accent": "#7af4ff", "--accent2": "#b77cff", "--accent3": "#ff7096",
      "--text": "#f4f9ff", "--muted": "rgba(210,225,255,0.6)", "--bg-deep": "#050b14"
    }),
    cyber: mk({
      "--glass-bg": "rgba(0,15,30,0.5)", "--glass-border": "rgba(0,255,255,0.28)", "--glass-blur": "blur(16px)",
      "--accent": "#00f0ff", "--accent2": "#ff2bd6", "--accent3": "#ff3366",
      "--text": "#eef5ff", "--muted": "rgba(120,220,255,0.62)", "--bg-deep": "#01000c"
    }),
    aurora: mk({
      "--glass-bg": "rgba(10,35,25,0.4)", "--glass-border": "rgba(72,187,120,0.25)", "--glass-blur": "blur(28px)",
      "--accent": "#48bb78", "--accent2": "#8b5cf6", "--accent3": "#3b82f6",
      "--text": "#ecfdf5", "--muted": "rgba(167,243,208,0.58)", "--bg-deep": "#021a1a"
    }),
    monochrome: mk({
      "--glass-bg": "rgba(20,20,25,0.6)", "--glass-border": "rgba(255,255,255,0.18)", "--glass-blur": "blur(18px)",
      "--accent": "#ffffff", "--accent2": "#b0b0b0", "--accent3": "#7a7a7a",
      "--text": "#fefefe", "--muted": "rgba(200,200,210,0.58)", "--bg-deep": "#070708"
    }),
    sunset: mk({
      "--glass-bg": "rgba(40,14,24,0.42)", "--glass-border": "rgba(255,150,90,0.22)",
      "--accent": "#ff9a5a", "--accent2": "#ff5c8a", "--accent3": "#ffd166",
      "--text": "#fff4ee", "--muted": "rgba(255,214,200,0.6)", "--bg-deep": "#14070d"
    }),
    ocean: mk({
      "--glass-bg": "rgba(8,32,56,0.45)", "--glass-border": "rgba(56,189,248,0.24)",
      "--accent": "#38bdf8", "--accent2": "#2dd4bf", "--accent3": "#818cf8",
      "--text": "#eaf6ff", "--muted": "rgba(186,222,252,0.6)", "--bg-deep": "#03111f"
    }),
    paper: mk({
      "--glass-bg": "rgba(255,255,255,0.72)", "--glass-border": "rgba(20,30,60,0.12)", "--glass-blur": "blur(16px)",
      "--accent": "#4f46e5", "--accent2": "#db2777", "--accent3": "#0891b2",
      "--text": "#0f172a", "--muted": "rgba(30,41,59,0.66)", "--bg-deep": "#f6f7fb",
      "--surface": "rgba(15,23,42,0.04)", "--line": "rgba(15,23,42,0.1)", "--orb": "0.16"
    }, true)
  };

  /* ---------- ENGINE ---------- */
  function devtemDesign(appid, config) {
    appid = appid || "app-root";
    config = config || {};

    const container = document.getElementById(appid);
    if (!container) return null;
    if (container._dt) container._dt.destroy();

    const root = document.documentElement;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = matchMedia("(pointer: fine)").matches;
    const cleanups = [];
    const observers = [];
    let raf = 0;

    const on = (t, ev, fn, o) => { t.addEventListener(ev, fn, o); cleanups.push(() => t.removeEventListener(ev, fn, o)); };
    const h = (tag, cls, html) => {
      const e = document.createElement(tag);
      if (cls) e.className = cls;
      if (html != null) e.innerHTML = html;
      return e;
    };

    /* ----- theme ----- */
    const names = Object.keys(templates);
    const list = Array.isArray(config.themeSwitcher)
      ? config.themeSwitcher.filter(n => templates[n])
      : names;
    let current = templates[config.template] ? config.template : "figsh";
    if (config.themeSwitcher) {
      try { const s = localStorage.getItem(STORE_KEY); if (templates[s]) current = s; } catch (e) {}
    }

    function applyTemplate(name) {
      const t = templates[name];
      if (!t) return;
      current = name;
      Object.keys(t.vars).forEach(k => root.style.setProperty(k, t.vars[k]));
      const custom = config.theme || {};
      Object.keys(custom).forEach(k => root.style.setProperty(k.indexOf("--") === 0 ? k : "--" + k, custom[k]));
      root.setAttribute("data-dt-scheme", t.light ? "light" : "dark");
      root.setAttribute("data-dt-template", name);
      const m = document.querySelector('meta[name="theme-color"]');
      if (m) m.setAttribute("content", getComputedStyle(root).getPropertyValue("--bg-deep").trim());
    }
    applyTemplate(current);

    container.innerHTML = "";
    container.classList.add("dt-root");

    /* ----- chrome: cursor, ripple, orbs, progress ----- */
    const skip = h("a", "skip-link", "Skip to content"); skip.href = "#dt-top";
    const progress = h("div", "dt-progress");
    const cursor = h("div"); cursor.id = "cursor";
    const ring = h("div"); ring.id = "cursor-ring";
    const rippleZone = h("div", "ripple-container");
    const bg = h("div", "bg-layer", '<div class="orb orb1"></div><div class="orb orb2"></div><div class="orb orb3"></div><div class="orb orb4"></div>');
    bg.setAttribute("aria-hidden", "true");
    container.append(skip, progress, cursor, ring, rippleZone, bg);

    /* ----- nav ----- */
    const navItems = config.navLinks || [
      { label: "Features", href: "#features" },
      { label: "How it works", href: "#how" },
      { label: "Pricing", href: "#pricing" }
    ];
    const navLinks = navItems.map(l => {
      const o = typeof l === "object";
      return `<a href="${o ? (l.href || "#") : "#"}">${o ? l.label : l}</a>`;
    }).join("");
    const logo = config.logo || "https://fscss.devtem.org/assets/images/fscss.png";
    const cta = `<a href="${config.ctaHref || "#"}">${config.ctaText || "Get started"}</a>`;

    const nav = h("header", "site-nav", `
      <div class="container">
        <a href="${config.logoHref || "/"}" class="nav-brand">
          <img src="${logo}" alt="" width="26" height="26">${config.logoName || "CORE"}
        </a>
        <nav class="nav-links" aria-label="Main">${navLinks}</nav>
        <div class="nav-actions">
          ${config.themeSwitcher ? '<button class="theme-btn" type="button" aria-label="Switch theme" title="Switch theme">&#9680;</button>' : ""}
          <a href="${config.ctaHref || "#"}" class="nav-cta">${config.ctaText || "Get started"}</a>
          <button class="nav-menu-btn" id="nav-menu-btn" type="button" aria-label="Menu" aria-expanded="false" aria-controls="nav-drawer">
            <span class="bars"><i></i><i></i><i></i></span>
          </button>
        </div>
      </div>`);
    const drawer = h("div", "nav-drawer", navLinks + cta);
    drawer.id = "nav-drawer";
    drawer.setAttribute("aria-hidden", "true");
    container.append(nav, drawer);

    const btn = nav.querySelector("#nav-menu-btn");
    function setDrawer(open) {
      drawer.classList.toggle("open", open);
      btn.setAttribute("aria-expanded", String(open));
      drawer.setAttribute("aria-hidden", String(!open));
      document.body.style.overflow = open ? "hidden" : "";
    }
    on(btn, "click", () => setDrawer(!drawer.classList.contains("open")));
    drawer.querySelectorAll("a").forEach(a => on(a, "click", () => setDrawer(false)));
    on(document, "keydown", e => { if (e.key === "Escape") setDrawer(false); });
    on(window, "resize", () => { if (innerWidth > 860) setDrawer(false); });

    const themeBtn = nav.querySelector(".theme-btn");
    if (themeBtn) {
      on(themeBtn, "click", () => {
        const i = list.indexOf(current);
        const next = list[(i + 1) % list.length];
        applyTemplate(next);
        themeBtn.title = "Theme: " + next;
        try { localStorage.setItem(STORE_KEY, next); } catch (e) {}
      });
    }

    /* ----- hero ----- */
    const brands = config.brands || [];
    const brandChips = brands.map((b, i) =>
      `<span style="font-family:monospace;font-weight:500;color:var(${i % 2 ? "--accent2" : "--accent"})">${String(b).toUpperCase()}</span>`
    ).join('<span class="dot-sep">&#10022;</span>');

    const hero = h("section", "hero", `
      ${config.heroBadge ? `<div class="hero-badge">${config.heroBadge}</div>` : ""}
      <h1 class="hero-title">
        ${config.heroTitleLine1 || "Declarative UI,"}<br>
        <span class="gradient">${config.heroTitleLine2 || "Zero-Config Motion"}</span>
      </h1>
      <p class="hero-sub">${config.heroSubtitle || "One configuration schema. Infinite animated synthesis."}</p>
      <div class="hero-actions">
        <a href="${config.primaryBtnHref || "#"}" class="btn btn-primary">${config.primaryBtnText || "Get started"}</a>
        ${config.secondaryBtnText ? `<a href="${config.secondaryBtnHref || "#"}" class="btn btn-ghost">${config.secondaryBtnText}</a>` : ""}
      </div>
      ${brands.length ? `
        <div class="hero-brands">
          <div class="hero-brands-row">${brandChips}</div>
          <div class="hero-brands-caption">${config.brandsSubtitle || "Built for modern product teams"}</div>
        </div>` : ""}`);
    hero.id = "dt-top";
    hero.tabIndex = -1;
    container.appendChild(hero);

    if (brands.length) {
      let group = brands.slice();
      while (group.length < 8) group = group.concat(brands);
      const item = b => `<span class="marquee-item"><span class="marquee-dot"></span>${String(b).toUpperCase()}</span>`;
      const set = group.map(item).join("");
      const m = h("div", "marquee-section", `<div class="marquee-track" aria-hidden="true">${set}${set}</div>`);
      container.appendChild(m);
    }

    /* ----- sections ----- */
    const head = (label, title, sub) =>
      `<div class="section-label reveal">${label}</div>
       <h2 class="section-title reveal">${title}</h2>
       ${sub ? `<p class="section-sub reveal">${sub}</p>` : ""}`;

    function addSection(id, cls, html) {
      const s = h("section", "section" + (cls ? " " + cls : ""), `<div class="container">${html}</div>`);
      if (id) s.id = id;
      container.appendChild(s);
      return s;
    }

    if (config.stats && config.stats.length) {
      addSection(config.statsId || "stats", "stats-sec", `
        <div class="stats-grid">
          ${config.stats.map(s => `
            <div class="stat-card reveal">
              <div class="stat-num" data-count="${s.value}">${s.value}</div>
              <div class="stat-label">${s.label || ""}</div>
            </div>`).join("")}
        </div>`);
    }

    if (config.features && config.features.length) {
      addSection("features", "", `
        ${head(config.featuresLabel || "Features", config.featuresTitle || "Everything you need, nothing you don't", config.featuresSub)}
        <div class="features-grid">
          ${config.features.map(f => `
            <div class="feature-card spot reveal">
              <div class="feature-icon">${f.icon || '<i class="fas fa-cube"></i>'}</div>
              <div class="feature-title">${f.title}</div>
              <div class="feature-desc">${f.desc}</div>
            </div>`).join("")}
        </div>`);
    }

    if (config.steps && config.steps.length) {
      addSection("how", "", `
        ${head(config.stepsLabel || "How it works", config.stepsTitle || "Three steps to launch", config.stepsSub)}
        <div class="steps-grid">
          ${config.steps.map((s, i) => `
            <div class="step-card reveal">
              <div class="step-num">${i + 1}</div>
              <div class="step-title">${s.title}</div>
              <div class="step-desc">${s.desc}</div>
            </div>`).join("")}
        </div>`);
    }

    if (config.panels && config.panels.length) {
      addSection("", "", `
        ${config.panelsTitle ? head(config.panelsLabel || "Overview", config.panelsTitle, config.panelsSub) : ""}
        <div class="panels-grid">
          ${config.panels.map((p, i) => `
            <div class="panel-card spot reveal">
              <div class="panel-tag">0${i + 1} / ${p.tag || "core"}</div>
              <div class="panel-title">${p.title}</div>
              <div class="panel-desc">${p.desc}</div>
            </div>`).join("")}
        </div>`);
    }

    let pricingSec = null;
    if (config.pricing && config.pricing.length) {
      const hasYearly = config.pricing.some(p => p.yearly);
      const toggle = hasYearly ? `
        <div class="billing reveal" role="group" aria-label="Billing period">
          <button type="button" class="active" data-bill="m" aria-pressed="true">Monthly</button>
          <button type="button" data-bill="y" aria-pressed="false">Yearly${config.yearlyBadge ? `<em>${config.yearlyBadge}</em>` : ""}</button>
        </div>` : "";
      pricingSec = addSection("pricing", "", `
        ${head(config.pricingLabel || "Pricing", config.pricingTitle || "Start free. Scale when ready.", config.pricingSub)}
        ${toggle}
        <div class="pricing-grid">
          ${config.pricing.map(p => {
            const y = p.yearly || {};
            const ya = y.amount != null ? y.amount : p.amount;
            const yp = y.period != null ? y.period : (p.period || "");
            return `
            <div class="price-card spot ${p.featured ? "featured" : ""} reveal" ${p.featured ? `data-badge="${p.badge || "Popular"}"` : ""}>
              <div class="price-tier">${p.tier}</div>
              <div class="price-amount">
                <b data-m="${p.amount}" data-y="${ya}">${p.amount}</b><span data-m="${p.period || ""}" data-y="${yp}">${p.period || ""}</span>
              </div>
              <p class="price-desc">${p.desc || ""}</p>
              <ul class="price-list">
                ${(p.features || []).map(f => `<li><span class="tick" aria-hidden="true"></span>${f}</li>`).join("")}
              </ul>
              <a href="${p.href || "#"}" class="btn ${p.featured ? "btn-primary" : "btn-ghost"} btn-block">${p.cta || "Choose plan"}</a>
            </div>`;
          }).join("")}
        </div>`);
    }

    if (config.faq && config.faq.length) {
      addSection("faq", "", `
        ${head(config.faqLabel || "FAQ", config.faqTitle || "Questions, answered", config.faqSub)}
        <div class="faq-list">
          ${config.faq.map(f => `
            <details class="faq-item reveal">
              <summary>${f.q}<span class="faq-icon" aria-hidden="true"></span></summary>
              <div class="faq-body"><p>${f.a}</p></div>
            </details>`).join("")}
        </div>`);
    }

    if (config.cta) {
      const c = config.cta;
      addSection("", "cta-sec", `
        <div class="cta-band reveal">
          <h2>${c.title || "Ready to build?"}</h2>
          ${c.sub ? `<p>${c.sub}</p>` : ""}
          <a href="${c.href || "#"}" class="btn btn-primary">${c.text || "Get started"}</a>
        </div>`);
    }

    /* ----- footer ----- */
    const f = config.footer || {};
    const columnsHtml = (f.columns || []).map(col => `
      <div class="footer-col">
        <div class="footer-col-heading">${col.heading}</div>
        <ul class="footer-col-links">
          ${(col.links || []).map(l => `<li><a href="${l.href || "#"}" class="footer-link">${l.label}</a></li>`).join("")}
        </ul>
      </div>`).join("");
    const socialHtml = (f.social || []).map(s => `
      <a href="${s.href || "#"}" class="footer-social-link" aria-label="${s.label || ""}" target="_blank" rel="noopener noreferrer">
        <i class="${s.icon}"></i>
      </a>`).join("");
    const legalHtml = (f.legal || []).map(l => `<a href="${l.href || "#"}" class="footer-legal-link">${l.label}</a>`).join("");

    container.appendChild(h("footer", "site-footer", `
      <div class="footer-body">
        <div class="footer-brand-col">
          <span class="footer-logo"><img src="${logo}" width="26" height="26" alt="">${(config.logoName || "CORE").toUpperCase()}</span>
          ${f.tagline ? `<p class="footer-tagline">${f.tagline}</p>` : ""}
          ${socialHtml ? `<div class="footer-socials">${socialHtml}</div>` : ""}
        </div>
        ${columnsHtml ? `<div class="footer-cols">${columnsHtml}</div>` : ""}
      </div>
      <div class="footer-bottom">
        <span class="footer-copy">${f.copy || config.footerCopy || `&copy; ${new Date().getFullYear()} Design engine`}</span>
        ${legalHtml ? `<div class="footer-legal">${legalHtml}</div>` : ""}
      </div>`));

    const toTop = h("button", "to-top", "&#8593;");
    toTop.type = "button"; toTop.setAttribute("aria-label", "Back to top");
    container.appendChild(toTop);
    on(toTop, "click", () => scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" }));

    /* ----- interactions ----- */

    // scroll: progress, nav shadow, back to top
    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      raf = requestAnimationFrame(() => {
        ticking = false;
        const y = scrollY;
        const max = root.scrollHeight - innerHeight;
        progress.style.transform = "scaleX(" + (max > 0 ? y / max : 0) + ")";
        nav.classList.toggle("scrolled", y > 8);
        toTop.classList.toggle("show", y > 600);
      });
    }
    on(window, "scroll", onScroll, { passive: true });
    onScroll();

    // cursor (fine pointer only)
    if (fine && !reduced && config.cursor !== false) {
      let mx = 0, my = 0, rx = 0, ry = 0, loop = 0;
      const frame = () => {
        rx += (mx - rx) * 0.14; ry += (my - ry) * 0.14;
        ring.style.left = rx + "px"; ring.style.top = ry + "px";
        loop = requestAnimationFrame(frame);
      };
      on(document, "mousemove", e => {
        mx = e.clientX; my = e.clientY;
        cursor.style.left = mx + "px"; cursor.style.top = my + "px";
        if (!cursor.classList.contains("on")) {
          rx = mx; ry = my;
          cursor.classList.add("on"); ring.classList.add("on");
          loop = requestAnimationFrame(frame);
        }
      });
      on(document, "mouseleave", () => {
        cursor.classList.remove("on"); ring.classList.remove("on");
        cancelAnimationFrame(loop);
      });
      const HOT = "a,button,summary,.spot,.btn";
      on(container, "mouseover", e => {
        if (e.target.closest(HOT)) { cursor.classList.add("hot"); ring.classList.add("hot"); }
      });
      on(container, "mouseout", e => {
        if (e.target.closest(HOT)) { cursor.classList.remove("hot"); ring.classList.remove("hot"); }
      });
      cleanups.push(() => cancelAnimationFrame(loop));
    } else {
      cursor.remove(); ring.remove();
    }

    // click ripple
    if (!reduced) {
      on(document, "click", e => {
        const r = h("div", "ripple");
        r.style.left = e.clientX + "px"; r.style.top = e.clientY + "px";
        rippleZone.appendChild(r);
        r.addEventListener("animationend", () => r.remove());
      });
    }

    // card spotlight
    if (fine && !reduced) {
      on(container, "pointermove", e => {
        const c = e.target.closest && e.target.closest(".spot");
        if (!c) return;
        const r = c.getBoundingClientRect();
        c.style.setProperty("--mx", (e.clientX - r.left) + "px");
        c.style.setProperty("--my", (e.clientY - r.top) + "px");
      });
    }

    // stagger index
    container.querySelectorAll(".features-grid,.steps-grid,.panels-grid,.pricing-grid,.stats-grid,.faq-list")
      .forEach(g => Array.prototype.forEach.call(g.children, (c, i) => c.style.setProperty("--d", Math.min(i, 6))));

    // count-up
    function prepCount(el) {
      const m = String(el.dataset.count).match(/^(\D*)(\d[\d,.]*)(.*)$/);
      if (!m) return null;
      const raw = m[2].replace(/,/g, "");
      return {
        pre: m[1], suf: m[3], end: parseFloat(raw),
        dec: (raw.split(".")[1] || "").length, comma: m[2].indexOf(",") > -1
      };
    }
    const fmt = (c, v) => c.pre + (c.comma ? v.toLocaleString("en-US", { minimumFractionDigits: c.dec, maximumFractionDigits: c.dec }) : v.toFixed(c.dec)) + c.suf;
    function runCount(el) {
      const c = prepCount(el);
      if (!c || reduced) return;
      const t0 = performance.now(), dur = 1400;
      (function step(t) {
        const p = Math.min((t - t0) / dur, 1);
        el.textContent = fmt(c, c.end * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(step);
      })(t0);
    }

    // reveal
    const revealEls = container.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window && !reduced) {
      const revObs = new IntersectionObserver(entries => {
        entries.forEach(en => {
          if (!en.isIntersecting) return;
          en.target.classList.add("visible");
          en.target.querySelectorAll("[data-count]").forEach(runCount);
          revObs.unobserve(en.target);
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
      revealEls.forEach(el => {
        el.querySelectorAll("[data-count]").forEach(n => { const c = prepCount(n); if (c) n.textContent = fmt(c, 0); });
        revObs.observe(el);
      });
      observers.push(revObs);
    } else {
      revealEls.forEach(el => el.classList.add("visible"));
    }

    // active nav link
    if ("IntersectionObserver" in window) {
      const links = Array.prototype.slice.call(container.querySelectorAll(".nav-links a, .nav-drawer a"));
      const spy = new IntersectionObserver(entries => {
        entries.forEach(en => {
          if (!en.isIntersecting) return;
          links.forEach(a => {
            const hit = a.getAttribute("href") === "#" + en.target.id;
            a.classList.toggle("active", hit);
            if (hit) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
          });
        });
      }, { rootMargin: "-40% 0px -55% 0px" });
      container.querySelectorAll("section[id]").forEach(s => spy.observe(s));
      observers.push(spy);
    }

    // pricing toggle
    if (pricingSec) {
      const bill = pricingSec.querySelector(".billing");
      if (bill) {
        on(bill, "click", e => {
          const b = e.target.closest("[data-bill]");
          if (!b) return;
          const k = b.dataset.bill;
          bill.querySelectorAll("button").forEach(x => {
            const a = x === b;
            x.classList.toggle("active", a);
            x.setAttribute("aria-pressed", String(a));
          });
          pricingSec.querySelectorAll("[data-m]").forEach(n => {
            n.textContent = n.dataset[k];
            const box = n.parentNode;
            box.classList.remove("tick");
            void box.offsetWidth;
            box.classList.add("tick");
          });
        });
      }
    }

    // FAQ: one open at a time
    container.querySelectorAll(".faq-item").forEach(d => {
      on(d, "toggle", () => {
        if (!d.open) return;
        container.querySelectorAll(".faq-item[open]").forEach(o => { if (o !== d) o.open = false; });
      });
    });

    /* ----- public API ----- */
    const api = {
      version: VERSION,
      setTemplate: applyTemplate,
      destroy() {
        cleanups.forEach(fn => fn());
        observers.forEach(o => o.disconnect());
        cancelAnimationFrame(raf);
        document.body.style.overflow = "";
        container.innerHTML = "";
        container.classList.remove("dt-root");
        delete container._dt;
      }
    };
    container._dt = api;
    return api;
  }

  devtemDesign.version = VERSION;
  devtemDesign.templates = Object.keys(templates);

  global.devtemDesign = devtemDesign;
  if (typeof module !== "undefined" && module.exports) module.exports = devtemDesign;
})(typeof window !== "undefined" ? window : this);
