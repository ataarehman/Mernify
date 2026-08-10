# Cloudflare Pages — contact + newsletter (mail microservice)

Architecture:
  Browser → POST /api/contact or /api/newsletter (Pages Functions)
         → https://mernify.co/api/email (EMAIL_SERVICE_URL)
         → info@mernify.co

Set these on Cloudflare Pages → Settings → Environment variables
(Production + Preview). Encrypt EMAIL_SECRET.

  EMAIL_SERVICE_URL = https://mernify.co/api/email
  EMAIL_SECRET      = <same secret the mail microservice expects>
  CONTACT_TO        = info@mernify.co

Do NOT put EMAIL_SECRET in any VITE_* variable.

Deploy from repo root so these ship:
  - functions/api/contact.js
  - functions/api/newsletter.js
  - functions/_lib/contactMail.js

After deploy, success responses include `"provider":"email-microservice"`
(not a bare `{ "ok": true }` with no provider).
