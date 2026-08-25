---
name: mernify-pages-deploy
description: >-
  Deploy and verify the Mernify site on Cloudflare Pages including Pages
  Functions and email env. Use when deploying, going live, checking production
  /api/contact or /api/newsletter, Pages project settings, or PAGES_GO_LIVE.
---

# Mernify Pages deploy

## When to use

Go-live, post-deploy API checks, missing `functions/` on Pages, Production vs Preview env.

## Steps

1. Confirm working tree is ready; build locally: `npm run build`.
2. Deploy from **repository root** (so `functions/` is uploaded). Prefer connected Git deploy of `main`.
3. Cloudflare Pages → Settings → Environment variables (Production **and** Preview):
   - `EMAIL_SERVICE_URL` = `https://mernify.co/api/email` (or current mail service URL)
   - `EMAIL_SECRET` = encrypted secret (never log it)
   - `CONTACT_TO` = `info@mernify.co`
4. Trigger a fresh deployment after env changes.
5. Verify live:

```bash
# Expect provider email-microservice — NOT bare {"ok":true}
curl -sS -X POST https://www.mernify.co/api/contact \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Deploy Check\",\"email\":\"you@example.com\",\"message\":\"go-live verify\",\"company\":\"\",\"mfTrap\":\"\"}"
```

Repeat for `/api/newsletter` with `{ "email": "you@example.com", "mfTrap": "" }` (match actual field names in handlers).

6. Confirm inbox at `info@mernify.co`.

## Docs

- `deploy/PAGES_GO_LIVE.md`
- `deploy/DEPLOY.md`
- Agent prompt: `.cursor/agents/pages-deploy.md`

## If Wrangler auth is missing

Give Dashboard steps; do not claim deploy succeeded.
