# Deployment Guide — Mernify AI Concierge

## Step 1 — Deploy the Cloudflare Worker

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create**
2. Choose **Create Worker**, name it `mernify-ai` (or similar)
3. Paste the contents of `cf-worker/ai-chat.js` into the editor
4. Click **Deploy**

### Set Worker Secrets

In the Worker's **Settings → Variables and Secrets**:

| Name | Type | Value |
|------|------|-------|
| `AI_PROVIDER` | Variable | `anthropic` |
| `AI_API_KEY` | **Secret** | Your Anthropic API key (`sk-ant-...`) |
| `AI_PRIMARY_MODEL` | Variable | `claude-haiku-4-5-20251001` |
| `AI_FALLBACK_MODEL` | Variable | `claude-haiku-4-5-20251001` |
| `RESEND_API_KEY` | **Secret** | Your Resend key (`re_...`) |
| `CONTACT_TO` | Variable | `info@mernify.co` |
| `CONTACT_FROM` | Variable | `Mernify <info@mernify.co>` |
| `ALLOWED_ORIGIN` | Variable | `https://mernify.co,https://www.mernify.co` |

> For staging, also add your preview domain to `ALLOWED_ORIGIN`.

5. Copy the Worker URL (e.g. `https://mernify-ai.YOUR_SUBDOMAIN.workers.dev`)

---

## Step 2 — Configure the Static Site Build

Add to your hosting platform's environment variables (Vercel / Netlify / Cloudflare Pages):

```
VITE_AI_CHAT_ENDPOINT=https://mernify-ai.YOUR_SUBDOMAIN.workers.dev
VITE_MERNIFY_AI_ENABLED=true
```

Keep all other existing env vars unchanged.

---

## Step 3 — Build and Deploy the Static Site

```bash
npm run build
# dist/ is the output — deploy as before
```

No new npm packages were added. Build output and process are identical to before.

---

## Step 4 — Verify

1. Open the deployed site
2. The Mernify AI launcher (bottom-right) should appear
3. Click it — send "Build a SaaS product"
4. Verify the AI responds with relevant Mernify guidance
5. Test the lead form — confirm email arrives at `info@mernify.co`
6. Test booking CTA — confirm Calendly opens (if `VITE_CALENDLY_URL` is set)

---

## Rollback

### Frontend rollback (instant)
Set `VITE_MERNIFY_AI_ENABLED=false` in hosting env → redeploy static site.  
The chat component is not rendered. No other code is affected.

### Worker rollback
In Cloudflare Dashboard → Workers → `mernify-ai` → **Deployments** → select previous version → **Rollback**.

### Full rollback (git)
```bash
git revert HEAD  # or specify the commit
git push origin main
```
The `MernifyChat` component is isolated — reverting the feature branch PR removes all chat code.

---

## Health Checks

Test the Worker directly:

```bash
curl -X POST https://mernify-ai.YOUR_SUBDOMAIN.workers.dev \
  -H "Content-Type: application/json" \
  -H "Origin: https://mernify.co" \
  -d '{"action":"chat","messages":[{"role":"user","content":"What services does Mernify offer?"}]}'
```

Expected: `{"reply":"..."}` with a 200 status.

---

## Cost Monitoring

- Cloudflare Workers: 100K requests/day free. AI generation adds Anthropic API costs.
- Claude Haiku 4.5: ~$0.0008 per 1K input tokens, ~$0.004 per 1K output tokens (verify current pricing at console.anthropic.com).
- Set up a Cloudflare Workers usage alert for >50K daily requests.
- Set up an Anthropic spend limit under API settings.

---

## Staging Environment

Add `?mernify_ai=1` to any page URL to force-enable the chat in any environment where `VITE_MERNIFY_AI_ENABLED` is not explicitly set. Useful for Vercel preview deployments.

For `ALLOWED_ORIGIN` in the staging Worker, include `*.vercel.app` or your specific preview domain.
