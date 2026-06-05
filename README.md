# devtemDesign

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![CDN](https://img.shields.io/badge/CDN-jsDelivr-orange)](https://cdn.jsdelivr.net/npm/devtemDesign@0.0.1/)
[![Version](https://img.shields.io/badge/version-0.0.1-alpha-red)](https://github.com/devtem-dev/devtemDesign)

**One configuration schema. Infinite animated synthesis.**

`devtemDesign` is a lightweight, zero-configuration animated page engine. Stop building standard UI boilerplate — let the engine paint the viewport with dynamic templates, glass-morphism, ambient motion, and a reactive component schema.

**npm:** `npm i devtemDesign@0.0.1`  
**CDN:** [design.devtem.org](https://design.devtem.org)  
**GitHub:** [github.com/devtem-dev/devtemDesign](https://github.com/devtem-dev/devtemDesign)

---

## Features

- **4 Dynamic Templates** — `cyber`, `figsh`, `aurora`, `monochrome` — switch themes instantly.
- **Ambient Micro-Interactions** — custom magnetic cursor, ripple effects, and floating orb backgrounds.
- **Component Schema** — inject `features`, `panels`, brand tickers, and navigation from a single config object.
- **Zero Runtime Bundles** — pure CSS/JS. Intersection Observer + CSS variables drive everything.
- **Declarative API** — one function call builds the complete animated layout.

---

## Quick Start

### 1. Add the CDN links to your HTML
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/devtemDesign@0.0.1/style.css">
<script src="https://cdn.jsdelivr.net/npm/devtemDesign@0.0.1/script.js"></script>
```

2. Call the engine with your content

```html
<div id="app-root"></div>
<script>
  devtemDesign("app-root", {
    template: "cyber",
    logoName: "DEVTEM",
    navLinks: ["Docs", "Sandbox", "API"],
    ctaText: "npm i devtemDesign",
    // ... see full config below
  });
</script>
```

---

Configuration Object (devtemDesign(containerId, config))

Property Type Default Description
template string "figsh" Visual theme: "figsh", "cyber", "aurora", "monochrome"
logoName string "CORE" Brand name in navbar & footer
navLinks array ["Discover","Studio","Archive","Journal"] Navigation items
ctaText string "Launch →" Call-to-action button text (navbar)
heroTag string "design engine active" Eyebrow tag above main title
heroTitleLine1 string "Generative" First part of H1
heroTitleLine2 string "Page Weaver" Second part (gradient text)
heroSubtitle string default description Supporting paragraph below H1
primaryBtnText string "Explore Templates" Main hero button
secondaryBtnText string "Docs →" Secondary hero button
brandsSubtitle string "global innovators, design pioneers" Text below brand chips
footerCopy string "Design engine" Footer copyright line
brands array [] List of strings for brand ticker + chips
featuresSectionLabel string (HTML) "core modules" Label above features grid
featuresSectionTitle string default title Main title for features section
features array of objects [] { title, desc, icon: "HTML or emoji" }
panels array of objects [] { tag, title, desc } for additional content blocks

Example with all fields:

```javascript
devtemDesign("app-root", {
  template: "cyber",
  logoName: "⍲ DEVTEM",
  navLinks: ["Docs", "Sandbox", "API", "npm"],
  ctaText: "<i class='fab fa-npm'></i> npm i devtemDesign",
  heroTag: "Core Framework Alpha // v0.0.1",
  heroTitleLine1: "Declarative UI,",
  heroTitleLine2: "Zero-Config Motion",
  heroSubtitle: "One configuration schema. Infinite animated synthesis.",
  primaryBtnText: "<i class='fas fa-book'></i> Get Started",
  secondaryBtnText: "<i class='fas fa-copy'></i> Copy CDN",
  brandsSubtitle: "Powered by open source",
  footerCopy: "Figsh Labs — MIT",
  brands: ["NPM", "VITE", "ESBUILD", "CSS3", "WEBGL"],
  featuresSectionLabel: "<i class='fas fa-code-branch'></i> CORE MECHANICS",
  featuresSectionTitle: "Pass raw data. The engine paints itself.",
  features: [
    { title: "Deterministic Schema", desc: "Map JSON to hardware-accelerated layouts.", icon: "<i class='fas fa-cube'></i>" },
    { title: "Micro-Interactions", desc: "Magnetic cursor + ripple effects + parallax.", icon: "<i class='fas fa-magic'></i>" }
  ],
  panels: [
    { tag: "FRAMEWORK API", title: "devtemDesign({...})", desc: "Single handler, complete layout." },
    { tag: "PERFORMANCE", title: "Passive Inertia", desc: "Intersection Observer + CSS variables." }
  ]
});
```

---

Built‑in Templates

Template Vibe Accent Colors
figsh Futuristic glass Cyan / Purple / Pink
cyber Neon cyberpunk Cyan / Magenta / Red
aurora Organic nature Emerald / Violet / Blue
monochrome Minimalist grayscale White / Silver

---

For Developers

File Structure

```
devtemDesign/
├── style.css      # all animations, glass effects, grid, marquee, cursor
├── script.js      # engine core + devtemDesign() + interaction handlers
└── README.md      # you're reading it
```

How to Contribute

1. Fork the repo: github.com/devtem-dev/devtemDesign
2. Create a branch: git checkout -b feature/amazing-addon
3. Commit your changes: git commit -m 'Add some amazing thing'
4. Push & open a Pull Request

Ideas for contribution:

· New templates (pastel, vintage, dark-mono)
· Extra config options (e.g., enableParallax, marqueeSpeed)
· Improved mobile touch fallbacks
· Accessibility enhancements

Local Development

```bash
git clone https://github.com/devtem-dev/devtemDesign.git
cd devtemDesign
# Open index.html (or your test page) in browser
```

---

CDN Usage (jsDelivr)

We publish automatically to jsDelivr. Use any version:

```html
<!-- Latest v0.0.x -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/devtemDesign@0.0.1/style.css">
<script src="https://cdn.jsdelivr.net/npm/devtemDesign@0.0.1/script.js"></script>
```

Replace 0.0.1 with any future release tag.

---

Official Site & Demo

See live examples and interactive playground at:
design.devtem.org

---

📄 License

MIT © devtem-dev

---

🙌 Acknowledgments

Built with vanilla CSS/JS — no frameworks, no bloat. Inspired by glassmorphism, orbital animations, and the need for a declarative page builder.
