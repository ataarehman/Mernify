---
name: mernify-contact-email
description: >-
  Fix or verify Mernify contact/newsletter email delivery via Pages Functions
  and the mail microservice (EMAIL_SERVICE_URL + EMAIL_SECRET). Use when
  working on contact forms, newsletter, /api/contact, /api/newsletter,
  contactMail, fake ok:true responses, honeypots, or inbox delivery to
  info@mernify.co.
---

# Mernify contact email

## When to use

Contact form failures, newsletter 404/fake success, local vs live email mismatch, Cloudflare env for `EMAIL_*`.

## Architecture (canonical)

```
Browser → POST /api/contact or /api/newsletter (same origin)
       → functions/_lib/contactMail.js (or Vite middleware locally)
       → EMAIL_SERVICE_URL + header x-email-secret
       → info@mernify.co
```

Do **not** switch to Resend / Contact Worker unless the user asks and keys exist.

## Checklist

1. Confirm client posts to same-origin `/api/contact` or `/api/newsletter` (no secrets in `VITE_*`).
2. Confirm honeypot is not `name="website"` (use `mfTrap` or similar).
3. Local `.env`: `EMAIL_SERVICE_URL`, `EMAIL_SECRET`, `CONTACT_TO=info@mernify.co`.
4. Run `npm run check:contact` if present; POST a real payload and expect:
   `{"ok":true,"provider":"email-microservice"}`.
5. Live fail signal: bare `{"ok":true}` → old Pages Function or missing redeploy/env.
6. Cloudflare Pages (Production + Preview): set encrypted `EMAIL_SECRET`, `EMAIL_SERVICE_URL`, `CONTACT_TO`; redeploy from **repo root**.

## Key files

- `functions/_lib/contactMail.js`
- `functions/api/contact.js`, `functions/api/newsletter.js`
- `vite.config.js`
- `src/lib/submitContactForm.js`
- `src/components/forms/ContactForm.jsx`, `InquiryStepperForm.jsx`
- `deploy/PAGES_GO_LIVE.md`, `deploy/CONTACT_CLOUDFLARE.md`

## Never

- Commit secrets or print `EMAIL_SECRET`
- Return success without provider acceptance (except honeypot bots)
