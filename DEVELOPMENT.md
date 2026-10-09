# Platform Architecture & Engineering Guide

This document contains technical architecture details, developer quickstart instructions, and deployment workflows for the **drlebedev.com** dual-mode personal brand platform.

---

## Architecture & Dual-Mode Interface

The application is built as a unified, dual-mode web experience powered by a single typed content store (`src/data/content.json`):

1. **Executive Graphical Profile (`editorial` mode)**
   - High-density prestige layout styled in dark emerald and burnished gold (`forest-noir` palette).
   - Core chapters: Executive Biography, Engineering Principles & Systems Architecture diagram, Career Timeline, Issued US Patents, Education & Academic Background, Competencies, and Advisory Inquiries.
   - Dynamic theme support (`dark`, `light`, `system`).

2. **Web Console Terminal (`terminal` mode)**
   - Interactive retro-modern CLI workstation with CRT phosphor scanline styling.
   - Command dispatch engine supporting: `help`, `bio`, `exp`, `patents`, `edu`, `skills`, `contact`, `gui`, and `clear`.
   - Command history navigation (`ArrowUp` / `ArrowDown`), keyboard shortcut toggle (`` ` `` or `~` / `Escape`), and touch-friendly mobile command chips.

3. **Multi-Target Discovery & AI Crawler Support**
   - Injected Schema.org `Person` JSON-LD structured data.
   - Static Open Graph (`og:*`) and Twitter Card (`twitter:*`) social preview tags for instant link previews on LinkedIn, Twitter, and messaging platforms.
   - Static `/llms.txt` executive summary for AI agents and LLM scrapers.
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

# Run end-to-end integration tests with Playwright (10 tests)
npm run verify:deployment

# Run deployment verification against live URL
BASE_URL=https://drlebedev.com npm run verify:deployment
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
  1. `test`: Full verification gate (Vitest + Playwright).
  2. `deploy-pages`: Production deployment to GitHub Pages with live Playwright verification.
  3. `deploy-gae`: Production deployment to Google App Engine standard environment (`app.yaml`) with automated version pruning (keeping ≤ 10 versions for free tier compliance) and live Playwright verification.

---

## License & Copyright

© Kirill Lebedev, PhD. All rights reserved.
