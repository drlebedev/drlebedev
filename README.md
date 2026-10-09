# Kirill Lebedev, PhD

> **Director of Engineering | AI & Ads Measurement Leader**  
> Scaled Distributed Systems • Causal AI • Privacy-Preserving Measurement • Multi-Touch Attribution

[![CI/CD Deployment](https://github.com/drlebedev/drlebedev/actions/workflows/deploy.yml/badge.svg)](https://github.com/drlebedev/drlebedev/actions/workflows/deploy.yml)
[![Live Site](https://img.shields.io/badge/Live-drlebedev.com-00B37E.svg)](https://drlebedev.com)
[![GitHub Pages](https://img.shields.io/badge/Preview-GitHub%20Pages-10B981.svg)](https://drlebedev.github.io/drlebedev/)

---

## Executive Overview

Official personal brand and dual-mode web platform for **Kirill Lebedev, PhD**.

- **LinkedIn Engineering Leadership**: Directed engineering and cross-functional technical strategy for LinkedIn's overall Ads Measurement pillar. Bootstrapped the $1B+ Ads Measurement line of business and scaled foundational data systems.
- **Enterprise AI & Growth**: Scaled AI/ML and causal modeling infrastructure supporting $100M+ ARR expansion and 70+ engineering organization scale.
- **US Patents**: 3 issued United States patents in secure multi-party computation, privacy-preserving conversion attribution, and scalable identity resolution (US 11,968,185; US 11,232,254; US 11,102,534).
- **Academic Rigor**: PhD in Computer Science from Irkutsk National Research Technical University (INRTU).

---

## Architecture & Dual-Mode Interface

The application is built as a unified, dual-mode web experience powered by a single typed content store (`src/data/content.json`):

1. **Executive Graphical Dossier (`editorial` mode)**
   - High-density prestige layout styled in dark emerald and burnished gold (`forest-noir` palette).
   - Core chapters: Executive Biography, Engineering Principles & Systems Architecture diagram, Career Timeline, Issued US Patents, Education & Academic Background, Competencies, and Advisory Inquiries.
   - Dynamic theme support (`dark`, `light`, `system`).

2. **Web Console Terminal (`terminal` mode)**
   - Interactive retro-modern CLI workstation with CRT phosphor scanline styling.
   - Command dispatch engine supporting: `help`, `bio`, `exp`, `patents`, `edu`, `skills`, `contact`, `gui`, and `clear`.
   - Command history navigation (`ArrowUp` / `ArrowDown`), keyboard shortcut toggle (`` ` `` or `~` / `Escape`), and touch-friendly mobile command chips.

3. **Multi-Target Discovery & AI Crawler Support**
   - Injected Schema.org `Person` JSON-LD structured data.
   - Full Open Graph and Twitter Card social preview cards.
   - Static `/llms.txt` dossier for AI agents and LLM scrapers.
   - Search engine `sitemap.xml` and `robots.txt`.

---

## Tech Stack

- **Framework & Runtime**: React 18, TypeScript 5, Vite 5
- **Styling**: Tailwind CSS, custom design system tokens, textured triangle hatch utilities
- **Icons**: Lucide React
- **Testing**: Vitest (Unit & Schema tests), Playwright (E2E & Post-Deployment verification)
- **Deployment**: Dual deployment pipeline targeting **Google App Engine** and **GitHub Pages**

---

## Getting Started

### Prerequisites

- **Node.js**: v20 or higher
- **npm**: v9 or higher

### Local Development

```bash
# Clone repository
git clone https://github.com/drlebedev/drlebedev.git
cd drlebedev

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

### Running Tests

```bash
# Run unit tests with Vitest (98 tests)
npm test

# Run end-to-end integration tests with Playwright (17 tests)
npx playwright test

# Run deployment verification against live URL
BASE_URL=https://drlebedev.github.io/drlebedev/ npx playwright test tests/e2e/deploymentVerification.spec.ts
```

### Production Build

```bash
# Build production bundle and copy static assets to dist/
npm run build

# Preview production build locally
npm run preview
```

---

## Continuous Integration & Deployment (CI/CD)

The GitHub Actions workflow (`.github/workflows/deploy.yml`) implements strict environment validation:

- **Pull Requests**: Runs TypeScript compilation, Vitest unit tests, production build, and Playwright verification in isolated check mode. Pull requests **never** trigger deployment pipelines.
- **Main Branch Merges**: Upon merging into `main`, the workflow executes:
  1. `test-and-verify`: Full verification gate (Vitest + Playwright).
  2. `deploy-pages`: Production deployment to GitHub Pages.
  3. `deploy-gae`: Production deployment to Google App Engine standard environment (`app.yaml`).

---

## License & Copyright

© Kirill Lebedev, PhD. All rights reserved.
