# devtemDesign

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![CDN](https://img.shields.io/badge/CDN-jsDelivr-orange)](https://cdn.jsdelivr.net/npm/devtemdesign/)
[![Version](https://img.shields.io/badge/npm-v0.1.0-green)](https://www.npmjs.com/package/devtemdesign)
[![Templates](https://img.shields.io/badge/templates-7-green)](https://design.devtem.org)

[![DevtemDesign Og image](/devtemdesign.jpg)](https://design.devtem.org)

**One configuration schema. Infinite animated synthesis.**

`devtemDesign` is a lightweight, zero-dependency page engine. Pass one config object and it paints a full landing page: glass cards, ambient motion, reveal animations, a mobile drawer, pricing, FAQ and footer. Plain HTML, CSS and JS. No framework, no build step.

**npm:** `npm i devtemdesign`
**CDN:** [design.devtem.org](https://design.devtem.org)
**GitHub:** [github.com/devtem-dev/devtemDesign](https://github.com/devtem-dev/devtemDesign)

---

## Features

- **7 templates:** `figsh`, `cyber`, `aurora`, `monochrome`, `sunset`, `ocean`, and `paper` (light).
- **Live theme switching** with an optional theme button that remembers the visitor's choice.
- **Sections from config:** hero, brand marquee, stats, features, steps, panels, pricing, FAQ, closing CTA, footer.
- **Interactive:** animated count-up stats, Monthly/Yearly pricing toggle, FAQ accordion, card spotlight, scroll progress bar, active nav link, back-to-top button.
- **Ambient motion:** floating orbs, magnetic cursor, click ripples. All respect `prefers-reduced-motion`.
- **Responsive:** fluid grids, slide-in mobile drawer (closes on link tap, Escape, or resize), hover effects only on devices that have hover.
- **Accessible:** skip link, visible focus rings, ARIA on the menu, `aria-current` on the active link, native `<details>` for FAQ.
- **Clean lifecycle:** `devtemDesign()` returns `{ setTemplate, destroy }`, and calling it again on the same container cleans up first.

---

## Quick Start

### 1. Add the CDN links

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/devtemdesign@0.1.0/style.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
<script src="https://cdn.jsdelivr.net/npm/devtemdesign@0.1.0/script.min.js"></script>
```

Font Awesome is optional. It is only needed for feature icons and footer social icons.

### 2. Call the engine

```html
<div id="app-root"></div>
<script>
  devtemDesign("app-root", {
    template: "cyber",
    logoName: "DEVTEM",
    heroTitleLine1: "Declarative UI,",
    heroTitleLine2: "Zero-Config Motion",
    heroSubtitle: "One config object. Complete animated landing.",
    primaryBtnText: "Build your page",
    primaryBtnHref: "/docs"
  });
</script>
```

Everything except the hero is optional. A section only renders when its config key is present.

---

## Configuration Reference

`devtemDesign(containerId, config)`

> Text fields are inserted as HTML so you can use icons and inline markup. Only pass trusted content.

### Core

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `template` | `string` | `"figsh"` | One of the 7 templates |
| `theme` | `object` | `{}` | Token overrides, e.g. `{ accent: "#ff4d6d" }` |
| `themeSwitcher` | `boolean \| string[]` | `false` | Adds a theme button. Pass an array of template names to limit the cycle. Choice is saved in `localStorage` |
| `cursor` | `boolean` | `true` | Set `false` to disable the custom cursor |
| `logo` | `string` | fscss logo | Logo image URL for navbar and footer |
| `logoName` | `string` | `"CORE"` | Brand name |
| `logoHref` | `string` | `"/"` | Where the navbar brand links to |

### Navigation

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `navLinks` | `string[] \| object[]` | Features, How it works, Pricing | Plain strings (href `#`) or `{ label, href }` |
| `ctaText` | `string` | `"Get started"` | Navbar button text |
| `ctaHref` | `string` | `"#"` | Navbar button link |

### Hero

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `heroBadge` | `string` | none | Small pill above the title |
| `heroTitleLine1` | `string` | `"Declarative UI,"` | First line of the H1 |
| `heroTitleLine2` | `string` | `"Zero-Config Motion"` | Second line, rendered as animated gradient text |
| `heroSubtitle` | `string` | default copy | Paragraph below the H1 |
| `primaryBtnText` / `primaryBtnHref` | `string` | `"Get started"` / `"#"` | Main button |
| `secondaryBtnText` / `secondaryBtnHref` | `string` | none | Ghost button, only rendered if text is set |
| `brands` | `string[]` | `[]` | Feeds the hero chips and the scrolling marquee |
| `brandsSubtitle` | `string` | `"Built for modern product teams"` | Caption under the chips |

### Stats

| Property | Type | Description |
|----------|------|-------------|
| `stats` | `object[]` | `{ value, label }`. Values count up when scrolled into view. Prefix, suffix, commas and decimals are kept: `"$1,200"`, `"99.9%"`, `"12k+"` |
| `statsId` | `string` | Anchor id for the section (default `"stats"`) |

### Features, Steps, Panels

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `featuresLabel` / `featuresTitle` / `featuresSub` | `string` | defaults | Section heading. Anchor id is `#features` |
| `features` | `object[]` | `[]` | `{ title, desc, icon }`. `icon` accepts HTML or emoji |
| `stepsLabel` / `stepsTitle` / `stepsSub` | `string` | defaults | Section heading. Anchor id is `#how` |
| `steps` | `object[]` | `[]` | `{ title, desc }`, numbered automatically |
| `panelsLabel` / `panelsTitle` / `panelsSub` | `string` | none | Optional heading above panels |
| `panels` | `object[]` | `[]` | `{ tag, title, desc }` |

### Pricing

| Property | Type | Description |
|----------|------|-------------|
| `pricingLabel` / `pricingTitle` / `pricingSub` | `string` | Section heading. Anchor id is `#pricing` |
| `yearlyBadge` | `string` | Small label on the Yearly toggle, e.g. `"Save 20%"` |
| `pricing` | `object[]` | See below |

Each plan:

```js
{
  tier: "Pro",
  amount: "$12",
  period: "/mo",
  desc: "For product landings that need more.",
  features: ["Everything in Free", "Priority support"],
  cta: "Go Pro",
  href: "/signup",
  featured: true,          // highlights the card
  badge: "Most popular",   // text on the featured ribbon
  yearly: { amount: "$120", period: "/yr" }   // optional
}
```

The Monthly/Yearly toggle appears automatically when at least one plan has `yearly`. Plans without it keep their price in both views.

### FAQ

| Property | Type | Description |
|----------|------|-------------|
| `faqLabel` / `faqTitle` / `faqSub` | `string` | Section heading. Anchor id is `#faq` |
| `faq` | `object[]` | `{ q, a }`. One item open at a time |

### Closing CTA

```js
cta: { title: "Ready to build?", sub: "Free forever for open source.", text: "Start now", href: "/docs" }
```

### Footer

```js
footer: {
  tagline: "Declarative UI engine for the modern web.",
  copy: "© 2026 devtem-dev · MIT",
  columns: [
    { heading: "Product", links: [{ label: "Docs", href: "/docs" }] }
  ],
  social: [
    { icon: "fab fa-github", href: "https://github.com/devtem-dev", label: "GitHub" }
  ],
  legal: [{ label: "Privacy", href: "/privacy" }]
}
```

All fields are optional. `config.footerCopy` still works as a plain copyright fallback.

---

## Full Example

```js

const page = devtemDesign("app-root", {
  template: "ocean",
  themeSwitcher: true,
  logoName: "DEVTEM",
  navLinks: [
    { label: "Features", href: "#features" },
    { label: "How it works", href: "#how" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" }
  ],
  ctaText: "Try free",
  ctaHref: "/get-started",

  heroBadge: "Pure CSS + JS engine",
  heroTitleLine1: "Declarative UI,",
  heroTitleLine2: "Zero-Config Motion",
  heroSubtitle: "One config object. Complete animated landing.",
  primaryBtnText: "Build your page",
  primaryBtnHref: "/docs",
  secondaryBtnText: "View examples",
  secondaryBtnHref: "/gallery",
  brands: ["NPM", "FSCSS", "DEVTEMPLE", "ESBUILD", "CSS3"],
  brandsSubtitle: "Powered by open source",

  stats: [
    { value: "7", label: "Templates" },
    { value: "0", label: "Dependencies" },
    { value: "12kb", label: "Gzipped" }
  ],

  featuresTitle: "Stop writing the same landing boilerplate",
  features: [
    { title: "Single schema", desc: "Pass JSON, get a full animated page.", icon: '<i class="fas fa-cube"></i>' },
    { title: "Mobile drawer", desc: "Slide-in nav that closes on link tap.", icon: '<i class="fas fa-mobile-screen"></i>' },
    { title: "Ambient motion", desc: "Orbs, cursor, reveal. All optional.", icon: '<i class="fas fa-wand-magic-sparkles"></i>' }
  ],

  steps: [
    { title: "Describe content", desc: "Fill the config with your copy and links." },
    { title: "Pick a template", desc: "Seven built in, or override any token." },
    { title: "Ship", desc: "One function call paints the page." }
  ],

  yearlyBadge: "Save 20%",
  pricing: [
    { tier: "Free", amount: "$0", desc: "For experiments and open source.", features: ["All templates", "CDN ready"], cta: "Start free", href: "#" },
    { tier: "Pro", amount: "$12", period: "/mo", yearly: { amount: "$115", period: "/yr" },
      featured: true, badge: "Most popular", desc: "For product landings.", features: ["Everything in Free", "Priority support"], cta: "Go Pro", href: "#" }
  ],

  faq: [
    { q: "Do I need a build step?", a: "No. Add two tags and call one function." },
    { q: "Can I change the colors?", a: "Yes. Pass a theme object to override any token." }
  ],

  cta: { title: "Ship your landing page today", text: "Read the docs", href: "/docs" },

  footer: {
    tagline: "Declarative UI engine for the modern web.",
    columns: [
      { heading: "Product", links: [{ label: "Docs", href: "/docs" }, { label: "Gallery", href: "/gallery" }] },
      { heading: "Resources", links: [{ label: "npm", href: "https://npmjs.com/package/devtemdesign" }] }
    ],
    social: [{ icon: "fab fa-github", href: "https://github.com/devtem-dev", label: "GitHub" }, { icon: "fab fa-dev", href: "https://dev.to/fscss", label: "DEV" } ],
    legal: [{ label: "Privacy", href: "/privacy" }, { label: "Terms", href: "/terms" }],
    copy: "© 2026 devtem-dev · MIT"
  }
});
```

---

## JavaScript API

```js
const page = devtemDesign("app-root", config);

page.setTemplate("sunset");   // switch theme at runtime
page.destroy();               // remove listeners, observers and markup

devtemDesign.version;         // "0.1.0"
devtemDesign.templates;       // ["figsh", "cyber", "aurora", ...]
```

---

## Templates

| Template | Vibe | Accents |
|----------|------|---------|
| `figsh` | Futuristic glass | Cyan, purple, pink |
| `cyber` | Neon cyberpunk | Cyan, magenta, red |
| `aurora` | Organic nature | Emerald, violet, blue |
| `monochrome` | Minimal grayscale | White, silver |
| `sunset` | Warm dusk | Orange, rose, gold |
| `ocean` | Cool depth | Sky, teal, indigo |
| `paper` | Light mode | Indigo, pink, cyan |

### Custom tokens

Override any token with `theme`. Keys work with or without the `--` prefix.

```js
theme: { accent: "#ff4d6d", accent2: "#ffb703", "bg-deep": "#0b0710" }
```

| Token | Purpose |
|-------|---------|
| `--accent`, `--accent2`, `--accent3` | Brand colors and gradients |
| `--text`, `--muted` | Primary and secondary text |
| `--bg-deep` | Page background (also used for text on filled buttons) |
| `--glass-bg`, `--glass-border`, `--glass-blur` | Card surfaces |
| `--surface`, `--line` | Subtle fills and dividers |
| `--orb` | Ambient orb opacity |

---

## Browser Support

Modern evergreen browsers. Theming uses `color-mix()`, so you need Chrome 111+, Safari 16.2+ or Firefox 113+. Older browsers still render the page but lose some tinted surfaces.

---

## Upgrading from 0.0.2

Most configs work unchanged. A few key names were corrected to match the code:

| Old (0.0.2 docs) | Use now |
|------------------|---------|
| `heroTag` | `heroBadge` |
| `featuresSectionLabel` | `featuresLabel` |
| `featuresSectionTitle` | `featuresTitle` |

New in 0.1.0: three templates, `theme`, `themeSwitcher`, `stats`, `faq`, `cta`, `yearly` pricing, `ctaHref`, `logoHref`, `cursor`, and the returned `{ setTemplate, destroy }` handle.

---

## File Structure

```
devtemDesign/
├── style.css    # tokens, glass, grids, marquee, nav, drawer, footer, motion
├── script.js    # engine: devtemDesign() and all interaction handlers
└── README.md
```

## Contributing

1. Fork the repo: `github.com/devtem-dev/devtemDesign`
2. Create a branch: `git checkout -b feature/your-idea`
3. Commit and push, then open a Pull Request

Ideas welcome: more templates, `marqueeSpeed`, testimonials section, RTL support, more footer layouts.

### Local development

```bash
git clone https://github.com/devtem-dev/devtemDesign.git
cd devtemDesign
# open index.html in a browser. No build step.
```

---

## License

MIT © [devtem-dev](https://github.com/devtem-dev)
