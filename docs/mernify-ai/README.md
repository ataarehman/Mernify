# Mernify AI Sales Concierge

A production-ready AI chat assistant embedded in the Mernify website. It helps visitors understand services, explore case studies, prepare project requirements, and start a consultation.

## Quick Start (local — DeepSeek LLM)

```bash
# 1. Env
cp .env.example .env
cp cf-worker/.dev.vars.example cf-worker/.dev.vars
# Put DeepSeek AI_API_KEY in cf-worker/.dev.vars

# 2. Install + local D1 schema
npm install
npm run chat:db:local

# 3. Terminal A — Worker
npm run chat:worker

# 4. Terminal B — site
npm run dev
# Chat launcher bottom-right → live DeepSeek replies + learn-from-chats
```

Full guide: [10-deepseek-local-setup.md](./10-deepseek-local-setup.md)

Without `VITE_AI_CHAT_ENDPOINT`, the UI uses keyword **dev-fallback** replies only.

## Production Setup

1. Deploy `cf-worker/ai-chat.js` to Cloudflare Workers (see [06-deployment-guide.md](./06-deployment-guide.md))
2. Set Worker secrets in Cloudflare Dashboard (AI_API_KEY, RESEND_API_KEY, etc.)
3. Set `VITE_AI_CHAT_ENDPOINT` in your build environment / hosting platform
4. Rebuild and redeploy the static site

## Architecture Overview

```
Browser (React SPA)
  └── ChatProvider — conversation state + memory mirrors + CTA flags
       ├── ChatLauncher — floating button
       └── ChatPanel — messages, quick actions, Book a Call / Submit Inquiry CTAs
            └── chatApi.js — fetch() → Cloudflare Worker

Cloudflare Worker (cf-worker/ai-chat.js)
  ├── CORS + rate limiting + input sanitisation
  ├── RAG retrieval (knowledge-corpus.js + approved D1 FAQs via rag.js)
  ├── Conversation memory (D1 memory_json)
  ├── DeepSeek sales assistant (structured JSON: reply, buyingIntent, showCta, memory)
  ├── Prompt-injection guard
  └── Lead delivery + learn-from-chats distill loop
```

## Sales Assistant behaviour

- Retrieves relevant website/services/FAQ/portfolio/approved knowledge **before** answering
- Answers only from retrieved knowledge + conversation memory; asks clarifying questions when info is missing
- Remembers project requirements across turns (D1 `memory_json`)
- Detects high buying intent → UI shows **Book a Call** and **Submit Inquiry**
- Continues learning via approved FAQ candidates (unchanged review flow)

Local DeepSeek + learning setup: [10-deepseek-local-setup.md](./10-deepseek-local-setup.md)

## Files

| Path | Purpose |
|------|---------|
| `cf-worker/ai-chat.js` | Cloudflare Worker — sales assistant + learning actions |
| `cf-worker/rag.js` | Lightweight RAG retrieval over corpus + approved FAQs |
| `cf-worker/knowledge-corpus.js` | Static chunks: services, FAQs, process, industries, portfolio |
| `cf-worker/db.js` | D1 logging, memory, knowledge candidates / approved FAQ |
| `cf-worker/schema.sql` | D1 schema |
| `cf-worker/wrangler.toml` | Worker config (DeepSeek default, D1 binding) |
| `cf-worker/.dev.vars.example` | Local secrets template |
| `src/components/chat/` | All chat UI components |
| `src/components/chat/ChatProvider.jsx` | React Context + session finalize + CTA state |
| `src/components/chat/ChatPanel.jsx` | Main panel UI + Book a Call / Submit Inquiry |
| `src/components/chat/ChatLauncher.jsx` | Floating launcher button |
| `src/lib/chat/chatApi.js` | Worker API client |
| `src/lib/chat/chatAnalytics.js` | GA4 event tracking |
| `src/lib/chat/featureFlag.js` | Feature flag logic |

## Documents

- [01 — Repository & Production Audit](./01-repository-and-production-audit.md)
- [02 — Proposed Architecture](./02-proposed-architecture.md)
- [03 — Conversation Flows](./03-conversation-flows.md)
- [06 — Deployment Guide](./06-deployment-guide.md)
- [09 — Production Readiness Checklist](./09-production-readiness-checklist.md)
- [10 — DeepSeek Local Setup + Learn-from-Chats](./10-deepseek-local-setup.md)
