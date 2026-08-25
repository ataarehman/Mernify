# Blog Admin — session auth + Cloudflare Access + D1 + R2 runbook

Minimal Mernify blog ops: publish without Git redeploys. Content DB is **separate** from AI (`mernify-ai`).

## Architecture

| Piece | Binding / path |
|-------|----------------|
| D1 content DB | `CONTENT_DB` → database `mernify-content` |
| R2 media | `BLOG_MEDIA` → bucket `mernify-blog-media` |
| Public API | `/api/blog/*` |
| Admin auth | `/api/admin/auth/*` (session login) |
| Admin API | `/api/admin/blog/*` (session cookie, Access JWT, or optional bypass) |
| Sitemap | `/sitemap.xml` (Pages Function) |
| Local Vite | `.data/blog-store.json` + `public/uploads/blog/` |

Schema: `functions/_lib/blog-schema.sql`  
Shared router: `functions/_lib/blogHttp.js`  
Auth: `functions/_lib/accessAuth.js`

## Admin authentication

Admin is authorized if **any** of:

1. **Session cookie** `mernify_admin_session` — HttpOnly, SameSite=Lax, Path=/, Secure on HTTPS. Signed HMAC-SHA256 payload `{ sub, iat, exp }`. TTL **7 days**.
2. **Cloudflare Access JWT** (`Cf-Access-Jwt-Assertion`) when `CF_ACCESS_AUD` is set.
3. **Optional script bypass**: `BLOG_ADMIN_BYPASS=1` + header `x-blog-admin-secret: <BLOG_ADMIN_SECRET>` (curl/automation only — **never** put the secret in `VITE_*` or the SPA).

If none of username/password, Access AUD, or bypass is configured → `401` `"Admin auth is not configured"`.

### Server env (never `VITE_*`)

| Name | Purpose |
|------|---------|
| `BLOG_ADMIN_USERNAME` | Admin username |
| `BLOG_ADMIN_PASSWORD` | Admin password (plain env; compared via SHA-256 timing-safe equality) |
| `BLOG_ADMIN_SESSION_SECRET` | HMAC signing key for session cookies (**required** in production) |
| `CF_ACCESS_TEAM_DOMAIN` | Access team domain (optional outer layer) |
| `CF_ACCESS_AUD` | Access application AUD (optional) |
| `BLOG_ADMIN_BYPASS` | `1` only for local/script bypass — **never** in Production |
| `BLOG_ADMIN_SECRET` | Shared secret for `x-blog-admin-secret` when bypass enabled |

`VITE_BLOG_ADMIN_SECRET` is **obsolete** — do not set it; the SPA must use session cookies with `credentials: 'include'`.

### Auth API

- `POST /api/admin/auth/login` — body `{ "username", "password" }` → `200` + `Set-Cookie`; wrong creds → generic `401` `{ "error": "Invalid credentials" }`
- `POST /api/admin/auth/logout` — clears cookie (no prior auth required)
- `GET /api/admin/auth/me` — `200` `{ authenticated, username, email }` or `401`

SPA fetch must use `credentials: 'include'` on all admin + auth calls.

## Provision (once)

### 1. D1

```bash
npx wrangler d1 create mernify-content
```

Paste `database_id` into root `wrangler.toml` under `[[d1_databases]]` (`binding = "CONTENT_DB"`).

Apply schema + seed:

```bash
npx wrangler d1 execute mernify-content --remote --file=functions/_lib/blog-schema.sql
node scripts/migrate-blog-to-d1.mjs
npx wrangler d1 execute mernify-content --remote --file=scripts/blog-seed.sql
```

Also bind **CONTENT_DB** on the Pages project (Production + Preview): Dashboard → Workers & Pages → mernify-site → Settings → Functions → D1 bindings.

### 2. R2

```bash
npx wrangler r2 bucket create mernify-blog-media
```

Bind as `BLOG_MEDIA` on Pages. Optionally attach a custom domain and set:

| Env | Example |
|-----|---------|
| `MEDIA_PUBLIC_BASE` | `https://media.mernify.co` |

Migrated posts keep `/assets/images/blog/...` until re-uploaded.

### 3. Session credentials (Pages env — encrypt secrets)

Set on Production + Preview:

| Name | Example |
|------|---------|
| `BLOG_ADMIN_USERNAME` | `admin` |
| `BLOG_ADMIN_PASSWORD` | long random password |
| `BLOG_ADMIN_SESSION_SECRET` | long random HMAC key |

### 4. Cloudflare Access (optional outer layer)

1. Zero Trust → Access → Applications → Self-hosted.
2. Protect paths: `/admin*`, `/api/admin/*` on `mernify.co` / `www.mernify.co`.
3. Allowlist admin emails.
4. Set Pages env:

| Name | Notes |
|------|--------|
| `CF_ACCESS_TEAM_DOMAIN` | e.g. `yourteam.cloudflareaccess.com` |
| `CF_ACCESS_AUD` | Application Audience (AUD) tag |

Functions validate `Cf-Access-Jwt-Assertion` as an alternate admin proof (in addition to app session). Do **not** put Access secrets in `VITE_*`.

### 5. Optional script bypass (never production)

| Name | Value |
|------|--------|
| `BLOG_ADMIN_BYPASS` | `1` |
| `BLOG_ADMIN_SECRET` | long random secret |

Send header: `x-blog-admin-secret: <BLOG_ADMIN_SECRET>`. Prefer session login for the admin UI.

Optional: `SITE_ORIGIN=https://mernify.co` for sitemap absolute URLs.

## Deploy

Deploy from **repo root** so `functions/` ships with the site (see `deploy/PAGES_GO_LIVE.md`).

Ensure `public/sitemap.xml` is **not** present (static assets win over Functions). Dynamic sitemap is `functions/sitemap.xml.js`.

## Local development

```bash
# optional: force re-seed
node scripts/migrate-blog-to-d1.mjs --local-store
```

`.env` (or Vite defaults when unset):

```
BLOG_ADMIN_USERNAME=admin
BLOG_ADMIN_PASSWORD=change-me-local-only
BLOG_ADMIN_SESSION_SECRET=long-random-local-secret
```

**Vite middleware defaults** when those vars are unset:

| Var | Default |
|-----|---------|
| `BLOG_ADMIN_USERNAME` | `admin` |
| `BLOG_ADMIN_PASSWORD` | `local-dev-blog-admin` |
| `BLOG_ADMIN_SESSION_SECRET` | `local-dev-mernify-admin-session-secret` |

These exist only in the Vite server process — never in client JS.

`npm run dev` serves `/api/blog/*`, `/api/admin/auth/*`, `/api/admin/blog/*`, and `/sitemap.xml` via Vite middleware + `.data/blog-store.json`. Uploads land in `public/uploads/blog/` (gitignored).

## API quick reference

**Public**

- `GET /api/blog/posts?category=&q=&limit=&cursor=`
- `GET /api/blog/posts/:slug` — published; `?token=` for draft preview
- `GET /api/blog/categories`

**Auth**

- `POST /api/admin/auth/login`
- `POST /api/admin/auth/logout`
- `GET /api/admin/auth/me`

**Admin** (session cookie, Access JWT, or bypass)

- `GET/POST /api/admin/blog/posts`
- `GET/PATCH/DELETE /api/admin/blog/posts/:id`
- `POST .../publish` | `unpublish` | `archive` | `preview-token`
- `POST /api/admin/blog/upload` — multipart field `file` (webp/jpeg/png, ≤5MB)
- `GET/POST /api/admin/blog/categories`
- `PATCH/DELETE /api/admin/blog/categories/:id`

Post JSON uses BlogPost camelCase (`sections`, `author`, `seoTitle`, …). Status: `draft | published | archived`.

## Backup / rollback

**Backup**

```bash
npx wrangler d1 export mernify-content --remote --output=backup-content-$(date +%Y%m%d).sql
```

Enable R2 versioning on `mernify-blog-media`. Retain exports N days.

**Rollback**

1. FE flag back to static `blogPostsData` (if still available).
2. D1 import last export.
3. R2 prior object versions for media.

Never bind blog tables to `mernify-ai`.

## Verify

1. `GET /api/blog/posts` → published list (seed count ≈ 12).
2. `GET /api/admin/blog/posts` without cookie → 401.
3. `POST /api/admin/auth/login` with correct creds → 200 + `Set-Cookie`; then admin list → 200.
4. Publish a draft → appears in public list + `/sitemap.xml` without redeploy.
5. Contact `/api/contact` still returns `provider: email-microservice`.
