# Cloudflare Pages — go-live (contact + newsletter)

Local build is ready (`dist/` + `functions/`). Live APIs still return bare `{"ok":true}` until you deploy these functions and set secrets.

## 1) Deploy latest build from repo root

Cloudflare Pages must build/deploy from the **repository root** (so `functions/` is included). Do **not** upload only the `dist/` folder.

### Option A — Dashboard (Git-connected project `mernify-site`)

1. Push this branch to GitHub (if Pages deploys from Git).
2. Cloudflare Dashboard → **Workers & Pages** → **mernify-site** (or your Pages project).
3. **Settings → Builds & deployments** confirm:
   - Root directory: `/` (empty / repo root)
   - Build command: `npm ci && npm run build`
   - Build output directory: `dist`
   - Framework preset: Vite (or None)
4. **Deployments → Retry deployment** / **Create deployment** on the latest commit  
   (or push a commit to trigger CI).

### Option B — Direct upload with Wrangler (from repo root)

```bash
npx wrangler login
npm ci
npm run build
npx wrangler pages deploy dist --project-name=mernify-site
```

`functions/` next to the project is picked up for Pages Functions when deploying this way **if** your project is configured for Functions. Prefer Git deploy from repo root when possible.

## 2) Set Production + Preview environment variables

Cloudflare Dashboard → **Workers & Pages** → **mernify-site** → **Settings → Environment variables**

Add for **both Production and Preview**:

| Name | Value | Type |
|------|--------|------|
| `EMAIL_SERVICE_URL` | `https://mernify.co/api/email` | Plain text |
| `EMAIL_SECRET` | *(same secret as the mail microservice)* | **Encrypt** / Secret |
| `CONTACT_TO` | `info@mernify.co` | Plain text |

Optional (not required for delivery):

| Name | Value |
|------|--------|
| `CONTACT_FROM` | `Mernify <hello@mernify.co>` |

**Never** add `EMAIL_SECRET` as a `VITE_*` variable.

Save.

## 3) Redeploy after variables are saved

Env vars apply on the **next** deployment.

1. **Deployments → … → Retry deployment** (Production)
2. Also redeploy Preview if you use preview URLs
3. Wait until status is **Success**

## 4) Test live Contact form

In a terminal (or browser DevTools Network on https://www.mernify.co/contact):

```bash
curl -s -X POST https://www.mernify.co/api/contact ^
  -H "Content-Type: application/json" ^
  -H "Origin: https://www.mernify.co" ^
  -d "{\"name\":\"Live Contact Test\",\"email\":\"your@email.com\",\"message\":\"Live production contact test after Pages deploy — please confirm delivery to info@mernify.co.\",\"consent\":true}"
```

**Pass criteria:** JSON includes `"ok":true` **and** `"provider":"email-microservice"`  
**Fail:** bare `{"ok":true}` with no `provider` (old fake handler still live)

Then submit the real Contact page form once and check **info@mernify.co**.

## 5) Test live Newsletter form

```bash
curl -s -X POST https://www.mernify.co/api/newsletter ^
  -H "Content-Type: application/json" ^
  -H "Origin: https://www.mernify.co" ^
  -d "{\"email\":\"your@email.com\",\"page\":\"/\"}"
```

**Pass criteria:** `"ok":true` + `"provider":"email-microservice"`  
Also use the header newsletter field on the live site once.

## 6) Confirm inbox delivery

For both tests, confirm **info@mernify.co** received:

- Contact: subject like `New Form Submission — …`
- Newsletter: subject like `New Form Submission — Newsletter subscriber`

---

## Quick verify (after deploy)

| Endpoint | Old (bad) | New (good) |
|----------|-----------|------------|
| `POST /api/contact` | `{"ok":true}` | `{"ok":true,"provider":"email-microservice"}` |
| `POST /api/newsletter` | `{"ok":true}` | `{"ok":true,"provider":"email-microservice"}` |

If you still see the old response: the deployment did not include `functions/`, or `EMAIL_SECRET` is missing on that environment (then you should get **503**, not fake ok).
