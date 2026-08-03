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
- Lucide React
- Fontsource Phudu + Instrument Sans

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
npm run check:ready   # production build + env readiness warnings
```

### Environment

Copy `.env.example` → `.env` / `.env.production`. All `VITE_*` values are public in the client bundle.

| Variable | Purpose |
|----------|---------|
| `VITE_CONTACT_ENDPOINT` | Contact API (Cloudflare Worker) |
| `VITE_WEB3FORMS_ACCESS_KEY` | Alternate contact delivery |
| `VITE_CALENDLY_URL` | Booking CTA (else `/contact?intent=discovery`) |
| `VITE_GA_MEASUREMENT_ID` | GA4 (loads only after cookie consent) |
| `VITE_PROXY_URL` | Optional case-study iframe preview proxy |

Without a contact endpoint/key, the form falls back to **mailto** `info@mernify.co`.

**Go-live:** [`deploy/LAUNCH_CHECKLIST.md`](./deploy/LAUNCH_CHECKLIST.md) · [`deploy/DEPLOYMENT.md`](./deploy/DEPLOYMENT.md)

## Architecture

```text
src/
  app/           # providers, router
  components/    # ui, navigation, forms, seo, media, layout
  content/       # copy & structured data (source of truth for text)
  sections/      # page sections
  pages/         # route compositions
  styles/        # tokens, reset, fonts
  lib/           # helpers (env, contact submit, consent, schema)
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

Legacy `/work` redirects to `/case-studies`. Production hosts **must** use SPA fallback (`try_files` → `index.html`); see `deploy/nginx.conf.example`.

## Brand

- Primary Indigo `#4F46E5`
- Electric Cyan `#06B6D4`
- Midnight Navy `#0F172A`
- Type: Phudu (display) + Instrument Sans (body)

## Content policy

Do not invent clients, testimonials, metrics, or certifications. Team bios and testimonials stay unpublished until approved (`published: true`). Case-study `authorship.mode` should remain non-delivered until the client confirms.
