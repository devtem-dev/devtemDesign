# devtemDesign

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![CDN](https://img.shields.io/badge/CDN-jsDelivr-orange)](https://cdn.jsdelivr.net/npm/devtemdesign/)
[![Version](https://img.shields.io/badge/npm-v0.0.2-green)](https://www.npmjs.com/package/devtemdesign)

**One configuration schema. Infinite animated synthesis.**

`devtemDesign` is a lightweight, zero-configuration animated page engine. Stop building standard UI boilerplate — let the engine paint the viewport with dynamic templates, glassmorphism, ambient motion, and a reactive component schema.

**npm:** `npm i devtemdesign`  
**CDN:** [design.devtem.org](https://design.devtem.org)  
**GitHub:** [github.com/devtem-dev/devtemDesign](https://github.com/devtem-dev/devtemDesign)

---

## Features

- **4 Dynamic Templates** — `cyber`, `figsh`, `aurora`, `monochrome` — switch themes instantly.
- **Ambient Micro-Interactions** — custom magnetic cursor, ripple effects, and floating orb backgrounds.
- **Component Schema** — inject `features`, `panels`, brand tickers, and navigation from a single config object.
- **Mobile Navigation** — hamburger menu with animated open/close, auto-closes on link tap.
- **Declarable Footer** — full column layout, social icons, legal links, and tagline — all from config.
- **Zero Runtime Bundles** — pure CSS/JS. Intersection Observer + CSS variables drive everything.
- **Declarative API** — one function call builds the complete animated layout.

---

## Quick Start

### 1. Add CDN links to your HTML

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/devtemdesign@0.0.2/style.css">
<script src="https://cdn.jsdelivr.net/npm/devtemdesign@0.0.2/script.js"></script>
```

### 2. Call the engine with your content

```html
<div id="app-root"></div>
<script>
  devtemDesign("app-root", {
    template: "cyber",
    logoName: "DEVTEM",
    navLinks: [
      { label: "Docs",    href: "/docs"    },
      { label: "Sandbox", href: "/sandbox" },
      { label: "API",     href: "/api"     }
    ],
    ctaText: "CDN →",
    // ... see full config below
  });
</script>
```

---

## Configuration Reference

`devtemDesign(containerId, config)`

### Core

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `template` | `string` | `"figsh"` | Visual theme: `"figsh"`, `"cyber"`, `"aurora"`, `"monochrome"` |
| `logo` | `string` | fscss logo | URL for navbar/footer logo image |
| `logoName` | `string` | `"CORE"` | Brand name displayed in navbar & footer |

### Navigation

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `navLinks` | `string[] \| object[]` | `["Discover","Studio","Archive","Journal"]` | Nav items. Pass plain strings or `{ label, href }` objects |
| `ctaText` | `string` | `"Launch →"` | Navbar call-to-action button text (supports HTML) |

**`navLinks` accepts both formats:**

```js
// Plain strings (href defaults to "#")
navLinks: ["Docs", "Sandbox", "API"]

// Objects with href
navLinks: [
  { label: "Docs",    href: "/docs"    },
  { label: "npm",     href: "https://npmjs.com/package/devtemdesign" }
]
```

### Hero

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `heroTag` | `string` | `"design engine active"` | Eyebrow tag above the main title |
| `heroTitleLine1` | `string` | `"Generative"` | First part of the H1 |
| `heroTitleLine2` | `string` | `"Page Weaver"` | Second part — rendered as gradient text |
| `heroSubtitle` | `string` | default description | Supporting paragraph below H1 |
| `primaryBtnText` | `string` | `"Explore Templates"` | Main hero button (supports HTML) |
| `secondaryBtnText` | `string` | `"Docs →"` | Secondary hero button (supports HTML) |
| `brands` | `string[]` | `[]` | Brand names for ticker marquee + hero chips |
| `brandsSubtitle` | `string` | `"global innovators, design pioneers"` | Caption below brand chips |

### Features Grid

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `featuresSectionLabel` | `string` (HTML) | `"core modules"` | Label above the grid (supports HTML / icons) |
| `featuresSectionTitle` | `string` | default title | Heading for the features section |
| `features` | `object[]` | `[]` | `{ title, desc, icon }` — `icon` accepts HTML or emoji |

### Panels

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `panels` | `object[]` | `[]` | `{ tag, title, desc }` for additional content blocks |

### Footer

The footer is fully declarable via a `footer` config object. All fields are optional — omit any you don't need.

```js
footer: {
  tagline:  "Short brand tagline displayed below the logo.",
  copy:     "© 2025 Figsh Digital. All rights reserved.",

  columns: [
    {
      heading: "Product",
      links: [
        { label: "Documentation", href: "/docs"      },
        { label: "Sandbox",       href: "/sandbox"   },
        { label: "Changelog",     href: "/changelog" }
      ]
    },
    {
      heading: "Company",
      links: [
        { label: "About",   href: "/about"   },
        { label: "Blog",    href: "/blog"    },
        { label: "Contact", href: "/contact" }
      ]
    }
  ],

  social: [
    { icon: "fab fa-github",  href: "https://github.com/devtem-dev", label: "GitHub"  },
    { icon: "fab fa-twitter", href: "https://twitter.com/devtemple", label: "Twitter" },
    { icon: "fab fa-npm",     href: "https://npmjs.com/package/devtemdesign", label: "npm" }
  ],

  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Use",   href: "/terms"   },
    { label: "License (MIT)",  href: "/license" }
  ]
}
```

> **Legacy support:** `config.footerCopy` (plain string) is still accepted as a fallback copyright line — no breaking change.

---

## Full Example

```js
devtemDesign("app-root", {
  template: "cyber",
  logoName: "⍲ DEVTEM",

  navLinks: [
    { label: "Docs",    href: "/docs"    },
    { label: "Sandbox", href: "/sandbox" },
    { label: "API",     href: "/api"     },
    { label: "npm",     href: "https://npmjs.com/package/devtemdesign" }
  ],
  ctaText: "<i class='fab fa-npm'></i> npm i devtemdesign",

  heroTag:         "Core Framework Alpha // v0.0.2",
  heroTitleLine1:  "Declarative UI,",
  heroTitleLine2:  "Zero-Config Motion",
  heroSubtitle:    "One configuration schema. Infinite animated synthesis.",
  primaryBtnText:  "<i class='fas fa-book'></i> Get Started",
  secondaryBtnText:"<i class='fas fa-copy'></i> Copy CDN",
  brandsSubtitle:  "Powered by open source",
  brands:          ["NPM", "FSCSS", "DEVTEMPLE", "ESBUILD", "CSS3", "WEBGL"],

  featuresSectionLabel: "<i class='fas fa-code-branch'></i> CORE MECHANICS",
  featuresSectionTitle: "Pass raw data. The engine paints itself.",
  features: [
    { title: "Deterministic Schema",  desc: "Map JSON to hardware-accelerated layouts.",   icon: "<i class='fas fa-cube'></i>"   },
    { title: "Micro-Interactions",    desc: "Magnetic cursor + ripple effects + parallax.", icon: "<i class='fas fa-magic'></i>"  },
    { title: "Adaptive Themes",       desc: "Switch tokens at runtime across all layers.",  icon: "<i class='fas fa-palette'></i>"}
  ],
  panels: [
    { tag: "FRAMEWORK API", title: "devtemDesign({...})", desc: "Single handler, complete layout." },
    { tag: "PERFORMANCE",   title: "Passive Inertia",     desc: "Intersection Observer + CSS variables." }
  ],

  footer: {
    tagline: "Declarative UI engine for the modern web.",
    columns: [
      { heading: "Product", links: [
        { label: "Docs",      href: "/docs"      },
        { label: "Sandbox",   href: "/sandbox"   },
        { label: "Changelog", href: "/changelog" }
      ]},
      { heading: "Resources", links: [
        { label: "npm",       href: "https://npmjs.com/package/devtemdesign" },
        { label: "GitHub",    href: "https://github.com/devtem-dev/devtemDesign" },
        { label: "DevTemple", href: "https://devtem.org" }
      ]}
    ],
    social: [
      { icon: "fab fa-github",  href: "https://github.com/devtem-dev", label: "GitHub"  },
      { icon: "fab fa-twitter", href: "https://twitter.com/devtemple", label: "Twitter" }
    ],
    legal: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms",   href: "/terms"   }
    ],
    copy: "© 2025 Figsh Digital · MIT License"
  }
});
```

---

## Built-in Templates

| Template | Vibe | Accent Colors |
|----------|------|---------------|
| `figsh` | Futuristic glass | Cyan / Purple / Pink |
| `cyber` | Neon cyberpunk | Cyan / Magenta / Red |
| `aurora` | Organic nature | Emerald / Violet / Blue |
| `monochrome` | Minimalist grayscale | White / Silver |

---

## For Developers

### File Structure

```
devtemDesign/
├── style.css    # animations, glass effects, grid, marquee, cursor, footer, mobile nav
├── script.js    # engine core — devtemDesign() + interaction handlers + hamburger
└── README.md    # you're reading it
```

### How to Contribute

1. Fork the repo: `github.com/devtem-dev/devtemDesign`
2. Create a branch: `git checkout -b feature/amazing-addon`
3. Commit: `git commit -m 'Add some amazing thing'`
4. Push & open a Pull Request

Ideas for contribution:

- New templates (pastel, vintage, dark-mono)
- Extra config options (`enableParallax`, `marqueeSpeed`, `stickyNav`)
- Additional footer layout variants
- Accessibility enhancements (ARIA, focus management)

### Local Development

```bash
git clone https://github.com/devtem-dev/devtemDesign.git
cd devtemDesign
# Open index.html in browser — no build step needed
```

---

## CDN Usage (jsDelivr)

```html
<!-- Pinned version (recommended) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/devtemdesign@0.0.2/style.css">
<script src="https://cdn.jsdelivr.net/npm/devtemdesign@0.0.2/script.js"></script>

<!-- Latest (auto-updates) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/devtemdesign/style.css">
<script src="https://cdn.jsdelivr.net/npm/devtemdesign/script.js"></script>
```

Font Awesome is required for icon support in features, nav CTA, and footer socials:

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
```

---

## Official Site & Demo

Live examples and interactive playground: **[design.devtem.org](https://design.devtem.org)**

---

## License

MIT © [devtem-dev](https://github.com/devtem-dev)

---

## Acknowledgments

Built with vanilla CSS/JS — no frameworks, no bloat. Inspired by glassmorphism, orbital animations, and the need for a declarative page builder that actually ships fast.

