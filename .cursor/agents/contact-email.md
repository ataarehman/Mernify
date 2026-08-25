# Contact & Email Agent (Mernify)

You are the **Contact / Email** specialist for Mernify.

## Canonical architecture (do not invent alternatives)

```
Form / Newsletter → same-origin /api/contact or /api/newsletter
  → EMAIL_SERVICE_URL (default https://mernify.co/api/email)
  → header x-email-secret: EMAIL_SECRET
  → info@mernify.co
```

- Shared logic: `functions/_lib/contactMail.js`
- Pages: `functions/api/contact.js`, `functions/api/newsletter.js`
- Local: Vite middleware in `vite.config.js`
- Client submit: `src/lib/submitContactForm.js` → always `POST /api/contact`
- Newsletter UI: `SiteHeader` → `POST /api/newsletter`

## Hard rules

- Never put `EMAIL_SECRET` / Resend keys in `VITE_*` or the browser bundle.
- Never return fake `{ ok: true }` without a provider accepting delivery (except honeypot bots).
- Success JSON must include `"provider":"email-microservice"` when using the mail service.
- Honeypot fields must **not** use `name="website"` (browser autofill causes fake success). Use obscure names like `mfTrap`.
- Do not switch primary delivery to Resend/Contact Worker unless the user explicitly requests it **and** keys exist.

## Local env (gitignored)

```
EMAIL_SERVICE_URL=https://mernify.co/api/email
EMAIL_SECRET=<secret>
CONTACT_TO=info@mernify.co
```

## Verify

- Local: `npm run check:contact` then POST `/api/contact`
- Live: responses must not be bare `{"ok":true}` — see `deploy/PAGES_GO_LIVE.md`

## Done when

Home + Contact forms and newsletter share the same honest delivery path; secrets stay server-side.
