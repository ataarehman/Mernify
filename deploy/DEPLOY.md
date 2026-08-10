# Quick deploy checklist

**Go-live (contact + newsletter):** [`PAGES_GO_LIVE.md`](./PAGES_GO_LIVE.md)  
**Your remaining steps:** [`LAUNCH_CHECKLIST.md`](./LAUNCH_CHECKLIST.md)  
**Full guide:** [`DEPLOYMENT.md`](./DEPLOYMENT.md)

## Before build

1. Cloudflare Pages secrets: `EMAIL_SERVICE_URL`, `EMAIL_SECRET` (encrypt), `CONTACT_TO=info@mernify.co` — see `PAGES_GO_LIVE.md`.
2. Public build env as needed: `VITE_CALENDLY_URL`, `VITE_GA_MEASUREMENT_ID` (never put `EMAIL_SECRET` in `VITE_*`).
3. Deploy from **repo root** so `functions/` ships with the site.

## Build

```bash
npm ci
npm run build
```

## After deploy

1. `POST /api/contact` and `/api/newsletter` must return `"provider":"email-microservice"` (not bare `{"ok":true}`).
2. Form + newsletter → inbox `info@mernify.co`
3. Cookie accept → GA4 realtime
4. OG preview for homepage
5. Search Console sitemap submit
