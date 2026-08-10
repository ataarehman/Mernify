# Mernify — Production Deployment Guide

**Site:** https://mernify.co  
**Stack:** React 19 · Vite 7 · SPA (client-side routing)

This document is the single source of truth for going live. For a shorter checklist see [`DEPLOY.md`](./DEPLOY.md).

---

## 1. Environment configuration

### 1.1 Public vs private variables

| Variable | Where it lives | Public? | Purpose |
|----------|----------------|---------|---------|
| `VITE_CONTACT_ENDPOINT` | Build-time `.env.production` | Yes (URL only) | Contact Worker / API URL |
| `VITE_WEB3FORMS_ACCESS_KEY` | Build-time | Yes (by design) | Alternate form delivery |
| `VITE_CALENDLY_URL` | Build-time | Yes | Discovery-call booking |
| `VITE_GA_MEASUREMENT_ID` | Build-time | Yes | GA4 (`G-…`) |
| `VITE_PROXY_URL` | Build-time | Yes | Optional override for case-study iframe proxy (defaults to same-origin `/site-preview`) |
| `RESEND_API_KEY` | Cloudflare Worker **secret** | **No** | Email delivery |
| `CONTACT_TO` / `CONTACT_FROM` | Worker vars | No | Inbox + from address |
| `ALLOWED_ORIGIN` | Worker vars | No | CORS allowlist |

**Rule:** Never put `RESEND_API_KEY` (or any private credential) in a `VITE_*` variable.

### 1.2 Setup steps

```bash
cp .env.example .env.production
# Edit .env.production with real values, then:
npm ci
npm run build
```

On hosts that inject env vars (Cloudflare Pages, Netlify, Vercel), set the same `VITE_*` keys in the dashboard instead of committing files.

### 1.3 Fallbacks (safe degradation)

| Missing config | Runtime behavior |
|----------------|------------------|
| No contact endpoint / Web3Forms | Form opens a mailto draft (dev warning only) |
| No Calendly URL | Book CTA → `/contact?intent=discovery` |
| No GA ID | Analytics component no-ops |
| Invalid GA ID format | Ignored (must match `G-…`) |
| Invalid Calendly URL | Ignored; contact fallback used |
| Preview proxy | Same-origin `/site-preview` (Pages Function or Vite middleware). Optional `VITE_PROXY_URL` Worker override |

### 1.4 Case-study live preview (`/site-preview`)

Device-frame previews cannot load third-party sites directly (they send `X-Frame-Options` / CSP `frame-ancestors`). Locally Vite serves `/site-preview`; in production **Cloudflare Pages** serves the same path via [`functions/site-preview.js`](../functions/site-preview.js).

- **Cloudflare Pages:** commit includes `functions/` — no `VITE_PROXY_URL` needed.
- **Other static hosts:** deploy [`cf-worker/site-preview.js`](../cf-worker/site-preview.js) and set `VITE_PROXY_URL` to the Worker URL, then rebuild.
- Only allowlisted case-study hostnames are proxied (open-proxy protection).

---

## 2. Contact form production setup

### Recommended path (same-origin `/api/contact` → mail microservice)

1. Deploy site with `functions/api/contact.js` (honest handler — no fake success).
2. Cloudflare Pages secrets/vars:
   - `EMAIL_SERVICE_URL=https://mernify.co/api/email`
   - `EMAIL_SECRET=<microservice secret>` (encrypted)
   - `CONTACT_TO=info@mernify.co`
3. Submit a test inquiry; success JSON includes `"provider":"email-microservice"`.

Full steps: [`CONTACT_CLOUDFLARE.md`](./CONTACT_CLOUDFLARE.md).

Never put `EMAIL_SECRET` in a `VITE_*` variable.


### Fast path (Web3Forms)

1. Create a key at https://web3forms.com pointing to `info@mernify.co`.
2. Set `VITE_WEB3FORMS_ACCESS_KEY`.
3. Rebuild and deploy.

### Built-in protections

- Client + server honeypot fields
- Required consent checkbox
- Field length limits + email regex
- Client payload whitelist (no arbitrary field forwarding)
- Worker: CORS allowlist, rate limit (~8/min/IP), HTML strip, no upstream error leakage

---

## 3. Booking system

`BookCallCta` appears on:

- Homepage inquiry section
- Contact page (“What happens next”)
- Contact form success state

With `VITE_CALENDLY_URL` set → opens Calendly in a new tab (`noopener noreferrer`).  
Without it → navigates to `/contact?intent=discovery`.

---

## 4. SEO & analytics checklist

| Item | Status / location |
|------|-------------------|
| Per-route titles & descriptions | `PageMeta` on each page |
| Canonical URLs | `PageMeta` → `https://mernify.co…` |
| Open Graph + Twitter cards | `index.html` defaults + `PageMeta` |
| OG image | `public/og-image.jpg` (1200×630) |
| Sitemap | `public/sitemap.xml` (`.co` domain) |
| Robots | `public/robots.txt` absolute sitemap URL |
| JSON-LD | Homepage Organization/WebSite; service + case study schemas |
| GA4 | `Analytics` after cookie consent only |
| `/work` | Client redirect → `/case-studies` (+ nginx 301 example) |

---

## 5. Build & host

### Build

```bash
npm ci
npm run lint
npm run check:ready   # production build + readiness assertions
npm run preview       # local smoke on dist/
```

### Hosting (static SPA)

1. Upload / publish the `dist/` folder.
2. Apply SPA fallback so deep links work:

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

Full example: [`nginx.conf.example`](./nginx.conf.example).

3. Ensure security headers (also in `public/_headers` for Cloudflare Pages/Netlify):
   - `X-Frame-Options: SAMEORIGIN`
   - `X-Content-Type-Options: nosniff`
   - `Referrer-Policy: strict-origin-when-cross-origin`
   - Long-cache hashed `/assets/*`

### Cloudflare Pages note

Set build command `npm run build`, output directory `dist`, and all `VITE_*` env vars in project settings. Headers from `public/_headers` are copied into `dist/`.

---

## 6. Rollback

1. Keep the previous `dist/` artifact or git tag of the last good release.
2. Redeploy the previous artifact to the host (do not partially mix assets).
3. If a Worker change caused form failures, redeploy the previous Worker script from Cloudflare version history.
4. Confirm `/`, `/contact`, and one case study route after rollback.

---

## 7. Post-deploy verification

1. Hard-refresh homepage; check title + OG via https://www.opengraph.xyz/url?url=https://mernify.co/
2. Open `/case-studies` and `/services/saas-development` via **direct URL** (SPA fallback must work).
3. Submit contact form → confirm email arrives.
4. Accept cookies → confirm GA4 realtime hit.
5. Click “Book a Demo Call” → Calendly or contact intent.
6. Submit sitemap in Google Search Console.

---

## 8. Content gates (do not skip)

| Content | Publish rule |
|---------|--------------|
| Team bios | `src/content/team.js` → `published: true` only with real names + photo rights |
| Testimonials | `src/content/testimonials.js` → client-approved quotes only |
| Case studies | `authorship.mode: 'delivered'` only after client confirmation |

Unpublished team/testimonials do **not** render on the site.

---

## 9. Security notes

- No `dangerouslySetInnerHTML` in app source.
- Production source maps disabled (`vite.config.js`).
- `react-router-dom@7.18.2` installed (RSC CSRF advisory patch). This SPA does not use unstable RSC APIs.
- Dev-only ESLint advisories are not shipped in `dist/`.
- Maps iframe is consent-gated on the contact page.
- Private secrets (e.g. Resend) belong only on the Cloudflare Worker — never in `VITE_*`.

---

## 10. What we need from you

See **[`LAUNCH_CHECKLIST.md`](./LAUNCH_CHECKLIST.md)** for the exact credentials and values required before go-live (contact delivery, Calendly, GA4, domain/server).

