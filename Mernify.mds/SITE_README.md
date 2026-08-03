# Mernify

Premium product-engineering website for startups, growing businesses, and enterprises.

**Positioning:** Focused product partner — more structured than freelancers, more flexible than large agencies.

**Tagline:** Build Modern. Scale Confidently.

## Stack

- React 19
- Vite 7
- JavaScript (JSX)
- React Router 7
- CSS Modules + design tokens (`--mf-*`)
- GSAP + Lenis (motion; respects `prefers-reduced-motion`)
- Lucide React + Simple Icons
- Fontsource Inter + Space Grotesk

## Setup

```bash
npm install
npm run dev
```

Open the URL Vite prints (default `http://localhost:5173`).

```bash
npm run build
npm run preview
npm run lint
```

### Contact form

Set an optional endpoint in `.env`:

```bash
VITE_CONTACT_ENDPOINT=https://your-form-backend.example/api/contact
```

Without an endpoint, submit opens a **mailto** draft to `info@mernify.co` (documented fallback — nothing pretends to be a live API).

See `.env.example`.

## Architecture

```text
src/
  app/           # providers, router
  components/    # ui, navigation, forms, seo, media, layout
  content/       # copy & structured data (source of truth for text)
  sections/home/ # homepage sections
  pages/         # route compositions
  styles/        # tokens, reset, fonts
  lib/           # helpers (contact submit, icons)
```

### Routes

| Path | Page |
|------|------|
| `/` | Home |
| `/services` | Services index |
| `/services/:slug` | Service detail |
| `/industries` | Industries |
| `/case-studies` | Case studies index |
| `/case-studies/:slug` | Case study detail |
| `/process` | Process |
| `/about` | About |
| `/contact` | Contact |
| `/privacy` | Privacy Policy |
| `/terms` | Terms of Service |

Legacy `/work` maps to case studies.

## Brand

- Primary Indigo `#4F46E5`
- Electric Cyan `#06B6D4`
- Midnight Navy `#0F172A`
- Type: Space Grotesk (headings) + Inter (body)

## Documentation

All project markdown lives in [`Mernify.md/`](./Mernify.md/).

- `Mernify.md/CURRENT_WEBSITE_AUDIT.md`
- `Mernify.md/REDESIGN_IMPLEMENTATION_PLAN.md`
- `Mernify.md/CONTENT_ARCHITECTURE.md`
- `Mernify.md/DESIGN_SYSTEM.md`
- `Mernify.md/IMPLEMENTATION_REPORT.md`
- `Mernify.md/FINAL_QA_REPORT.md`
- `Mernify.md/ROUTE_TEST_MATRIX.md`
- `Mernify.md/REMAINING_CONTENT_REQUIREMENTS.md`

A synced copy also exists at `Mernify.mds/` in the companion workspace when present.

## Content policy

Do not invent clients, testimonials, metrics, or certifications. Case-study entries marked **placeholder** are structural shells awaiting real approved content.
