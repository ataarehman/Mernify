# Mernify AI Sales Concierge

A production-ready AI chat assistant embedded in the Mernify website. It helps visitors understand services, explore case studies, prepare project requirements, and start a consultation.

## Quick Start (local)

```bash
# 1. Copy env template
cp .env.example .env

# 2. Set flag to test without a deployed Worker
echo "VITE_MERNIFY_AI_ENABLED=true" >> .env

# 3. Start dev server
npm run dev
# Chat launcher appears bottom-right; uses dev-fallback responses without AI_CHAT_ENDPOINT
```

## Production Setup

1. Deploy `cf-worker/ai-chat.js` to Cloudflare Workers (see [06-deployment-guide.md](./06-deployment-guide.md))
2. Set Worker secrets in Cloudflare Dashboard (AI_API_KEY, RESEND_API_KEY, etc.)
3. Set `VITE_AI_CHAT_ENDPOINT` in your build environment / hosting platform
4. Rebuild and redeploy the static site

## Architecture Overview

```
Browser (React SPA)
  └── ChatProvider (React Context) — manages conversation state
       ├── ChatLauncher — floating button (bottom-right)
       └── ChatPanel — chat UI (messages, input, lead form, booking CTA)
            └── chatApi.js — fetch() → Cloudflare Worker

Cloudflare Worker (cf-worker/ai-chat.js)
  ├── CORS + rate limiting + input sanitisation
  ├── Prompt-injection guard
  ├── AI provider adapter (Anthropic primary / OpenAI fallback)
  ├── Static knowledge base (Mernify services, case studies, process)
  └── Lead delivery via Resend
```

## Files

| Path | Purpose |
|------|---------|
| `cf-worker/ai-chat.js` | Cloudflare Worker — AI backend |
| `src/components/chat/` | All chat UI components |
| `src/components/chat/ChatProvider.jsx` | React Context + state |
| `src/components/chat/ChatPanel.jsx` | Main panel UI |
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
