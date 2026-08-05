# DeepSeek Local Setup + Learn-from-Chats

Run the Mernify AI concierge with **live DeepSeek replies** (not keyword rules) and a **conversation learning loop** (log → distill FAQ → inject approved knowledge).

This does **not** fine-tune DeepSeek model weights. Improvement comes from curated FAQ knowledge stored in D1.

## Prerequisites

1. Node 20+
2. A [DeepSeek API key](https://platform.deepseek.com/)

## 1 — Worker secrets

```bash
cp cf-worker/.dev.vars.example cf-worker/.dev.vars
```

Edit `cf-worker/.dev.vars`:

```
AI_API_KEY=sk-your-deepseek-key
ADMIN_SECRET=a-long-random-string
```

Never put `AI_API_KEY` in `VITE_*` vars.

## 2 — Site env

```bash
cp .env.example .env
```

Ensure:

```
VITE_AI_CHAT_ENDPOINT=http://127.0.0.1:8787
VITE_MERNIFY_AI_ENABLED=true
```

## 3 — Install & init local D1

```bash
npm install
npm run chat:db:local
```

## 4 — Run both processes

Terminal A (Worker + DeepSeek):

```bash
npm run chat:worker
# → http://127.0.0.1:8787
```

Terminal B (Vite):

```bash
npm run dev
# → http://localhost:5173
```

Open the site → **Mernify AI** launcher → ask something open-ended (not just “saas”). You should get a natural DeepSeek reply.

Without `AI_API_KEY`, the Worker returns `503` / `AI service not configured`. Without `VITE_AI_CHAT_ENDPOINT`, the browser falls back to keyword stubs.

## How learning works

```
Chat turns → D1 messages + memory_json
  → finalize / lead / ≥4 user turns
  → DeepSeek distill prompt → knowledge_candidates
  → low-risk pairs auto-approved → knowledge_approved
  → next chats: RAG retrieves approved FAQs with website corpus
```

Risky content (metrics, prices, timelines, invented clients) stays `pending` until human review.

## Sales Assistant + RAG

Each chat turn:

1. Loads conversation **memory** from D1
2. **Retrieves** top chunks from `knowledge-corpus.js` + approved FAQs (`rag.js`)
3. Calls DeepSeek as a sales consultant with structured JSON output
4. Updates memory, returns `buyingIntent` / `showCta` so the UI can show **Book a Call** and **Submit Inquiry**

The site has no separate blog yet — RAG uses services, FAQs, process, industries, portfolio, and approved knowledge.

## Review pending knowledge (admin)

List pending candidates:

```bash
curl -s -X POST http://127.0.0.1:8787 \
  -H "Content-Type: application/json" \
  -H "Origin: http://localhost:5173" \
  -H "X-Admin-Secret: YOUR_ADMIN_SECRET" \
  -d '{"action":"review_knowledge","op":"list","status":"pending"}'
```

Approve:

```bash
curl -s -X POST http://127.0.0.1:8787 \
  -H "Content-Type: application/json" \
  -H "Origin: http://localhost:5173" \
  -H "X-Admin-Secret: YOUR_ADMIN_SECRET" \
  -d '{"action":"review_knowledge","op":"approve","id":1}'
```

Reject: same with `"op":"reject"`.

## Production notes

1. `npx wrangler d1 create mernify-ai` → paste real `database_id` into [`cf-worker/wrangler.toml`](../../cf-worker/wrangler.toml)
2. `npx wrangler d1 execute mernify-ai --remote --file=cf-worker/schema.sql`
3. Set secrets: `AI_API_KEY`, `ADMIN_SECRET` (`wrangler secret put …`)
4. Deploy Worker: `npx wrangler deploy --config cf-worker/wrangler.toml`
5. Set host build env `VITE_AI_CHAT_ENDPOINT` to the Worker URL and rebuild the site

See also [06-deployment-guide.md](./06-deployment-guide.md).
