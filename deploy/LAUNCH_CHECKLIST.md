# Final launch checklist — your steps only

All remaining work is configuration, credentials, and hosting. No further app development is required once these are done.

Do **not** commit secrets to git. Put `VITE_*` values in `.env.production` or your host’s environment UI, then rebuild.

---

## 1. Contact delivery (required)

1. Cloudflare Pages env (Production + Preview):
   - `EMAIL_SERVICE_URL=https://mernify.co/api/email`
   - `EMAIL_SECRET=<mail microservice secret>` (encrypt)
   - `CONTACT_TO=info@mernify.co`
2. Deploy from repo root so `functions/api/contact.js` ships (kills fake `{ok:true}`)
3. Test form — success JSON should include `"provider":"email-microservice"`
4. Confirm `info@mernify.co` receives the email

Details: [`CONTACT_CLOUDFLARE.md`](./CONTACT_CLOUDFLARE.md)

---

## 2. Booking

1. Your Calendly (or booking) **https** URL  
2. Build env → `VITE_CALENDLY_URL`

Until set, the Book CTA goes to `/contact?intent=discovery`.

---

## 3. Analytics

1. GA4 Measurement ID (`G-…`)  
2. Build env → `VITE_GA_MEASUREMENT_ID`

Loads only after the user accepts analytics cookies.

---

## 4. Domain & server

1. Confirm production domain (expected: `https://mernify.co`, plus www if used)  
2. Apply SPA fallback so deep links work:

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

(See `deploy/nginx.conf.example` for full HTTPS + headers.)

3. HTTP → HTTPS redirect  
4. DNS A/AAAA or CNAME pointing at the host  

---

## 5. Optional

| Item | Env / action |
|------|----------------|
| Case-study live iframes | Cloudflare Pages auto-deploys `functions/site-preview.js`. Else deploy `cf-worker/site-preview.js` → `VITE_PROXY_URL` |
| Team bios | `src/content/team.js` → `published: true` only with approved names/photos |
| Testimonials | `src/content/testimonials.js` → client-approved quotes only |
| Case-study “Delivered by Mernify” | `authorship.mode: 'delivered'` only after client confirmation |

---

## 6. Build & deploy (after env is set)

```bash
npm ci
npm run check:ready
```

Deploy the `dist/` folder (and the contact Worker if using Option A).

---

## 7. Post-deploy smoke (5 minutes)

1. Open `/case-studies` and `/services/saas-development` via **direct URL** (not only in-app links)  
2. Submit the contact form → confirm email arrives  
3. Accept cookies → confirm GA4 realtime hit  
4. Click **Book a Demo Call** → Calendly opens (or contact intent if skipped)  
5. Check OG preview: https://www.opengraph.xyz/url?url=https://mernify.co/  
6. Submit `https://mernify.co/sitemap.xml` in Google Search Console  

---

## What I need from you to finish configuration

Reply with (or set in your host) exactly these values — no placeholders:

1. Contact method: **A (Worker URL + confirmation Resend is configured)** or **B (Web3Forms access key)**  
2. `VITE_CALENDLY_URL`  
3. `VITE_GA_MEASUREMENT_ID`  
4. Confirmed production domain(s)  
5. Whether you need the optional preview proxy (`VITE_PROXY_URL`)  

Full reference: [`DEPLOYMENT.md`](./DEPLOYMENT.md)
