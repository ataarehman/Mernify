# Quick deploy checklist

Full guide: [`DEPLOYMENT.md`](./DEPLOYMENT.md)

## Before build

1. Set production env (`VITE_CONTACT_ENDPOINT` **or** `VITE_WEB3FORMS_ACCESS_KEY`, plus `VITE_CALENDLY_URL`, `VITE_GA_MEASUREMENT_ID`).
2. Deploy `cf-worker/contact.js` with Resend secrets (if using Worker).
3. Apply SPA `try_files` from `nginx.conf.example` (or equivalent host rewrite).

## Build

```bash
npm ci
npm run check:ready
```

## After deploy

1. Direct-URL test: `/contact`, `/case-studies`, `/process`
2. Form test → inbox
3. Cookie accept → GA4 realtime
4. OG preview for homepage
5. Search Console sitemap submit
