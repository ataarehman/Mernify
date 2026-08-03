# Proposed Architecture — Mernify AI Concierge

## Overview

The AI concierge is a pure client-server feature layered onto the existing static SPA. No new npm packages are required in the browser bundle. All AI API calls are server-side via a Cloudflare Worker.

```
┌─────────────────────────────────────────────────────┐
│                 Browser (React 19 SPA)               │
│                                                      │
│  RootLayout                                          │
│    └── MernifyChat (lazy, feature-flagged)           │
│         ├── ChatProvider (React Context)             │
│         │    ├── conversation state                  │
│         │    ├── page-aware context                  │
│         │    └── lead / booking actions              │
│         ├── ChatLauncher (floating button)           │
│         └── ChatPanel                               │
│              ├── ChatMessage[]                       │
│              ├── QuickActions                        │
│              ├── TypingIndicator                     │
│              ├── Lead form (inline)                  │
│              └── Booking / handoff CTAs              │
│                                                      │
│  chatApi.js ──POST──→ VITE_AI_CHAT_ENDPOINT          │
└────────────────────────────┬────────────────────────┘
                             │ HTTPS JSON
┌────────────────────────────▼────────────────────────┐
│         Cloudflare Worker (cf-worker/ai-chat.js)     │
│                                                      │
│  Security layer:                                     │
│    • CORS allowlist                                  │
│    • Rate limiting (20 req/min/IP)                   │
│    • Input sanitisation                              │
│    • Prompt-injection pattern guard                  │
│    • Max message length (2000 chars)                 │
│    • Max turns (30)                                  │
│                                                      │
│  AI provider adapter:                               │
│    • Primary: Anthropic (configurable model)         │
│    • Fallback: same provider, lighter model          │
│    • 30s request timeout + AbortController           │
│                                                      │
│  System prompt:                                      │
│    • Static Mernify knowledge base (services,        │
│      case studies, process, engagement models)       │
│    • Page-aware context injection                    │
│    • Communication & safety rules                    │
│                                                      │
│  Lead delivery:                                      │
│    • action=lead → Resend → info@mernify.co          │
└─────────────────────────────────────────────────────┘
```

## Component Responsibilities

| Component | Responsibility |
|-----------|---------------|
| `ChatProvider` | Conversation state, send/receive, lead submission, booking, page context |
| `ChatLauncher` | Floating button, open/close, pulse animation, GA event |
| `ChatPanel` | Panel UI, message list, input, lead form, action bar |
| `ChatMessage` | Render single message with safe markdown (bold, lists) |
| `QuickActions` | Initial quick-start chips, one per intent category |
| `TypingIndicator` | Animated dots while AI is generating |
| `chatApi.js` | Fetch wrapper with timeout; dev fallback when no endpoint |
| `chatAnalytics.js` | GA4 event wrappers for all tracked actions |
| `featureFlag.js` | `VITE_MERNIFY_AI_ENABLED` logic + URL override |
| `cf-worker/ai-chat.js` | Full AI backend: security, AI call, lead delivery |

## Data Flow

```
User types message
  → ChatProvider.sendMessage()
  → chatApi.sendChatMessage(messages[], context)
  → POST /ai-chat { action:"chat", messages, context }
  → Worker: validate → check injection → build system prompt → call AI
  → AI API → Worker returns { reply: "..." }
  → ChatProvider adds assistant message
  → ChatPanel scrolls to bottom
```

## Lead Submission Flow

```
User clicks "Submit inquiry" → lead form appears
  → User fills name + email (+ optional company)
  → ChatProvider.submitLead()
  → POST /ai-chat { action:"lead", ...fields, summary, consent:true }
  → Worker: validate → Resend API → info@mernify.co
  → ChatProvider sets leadSubmitted=true
  → Confirmation shown inline
```

## Booking Flow

```
User clicks "Book a call" → ChatProvider.startBooking()
  → VITE_CALENDLY_URL is set → window.open(calendlyUrl, '_blank')
  → else → navigate to /contact?intent=discovery
  → GA event: mernify_chat_booking_started
```

## Security Trust Boundaries

```
Browser  →  Worker  →  AI API
  ↑              ↑
  No API keys    API key in Worker secret (never in VITE_*)
  No raw HTML    Worker returns plain text only
  Input validated  Input re-validated server-side
```

## Knowledge Base Strategy

The current implementation embeds a static knowledge base directly in the Worker's system prompt. This is appropriate for:
- Stable content (services, case studies, process)
- No database required
- Fast response time (no retrieval step)
- Consistent, auditable knowledge

**Future upgrade path:** If the knowledge base grows beyond ~10KB or needs frequent updates, replace the static embed with a Cloudflare Vectorize (vector search) + D1 (metadata) setup — the Worker API surface stays the same.

## Feature Flag

| Env Var | Value | Behaviour |
|---------|-------|-----------|
| `VITE_MERNIFY_AI_ENABLED` | `"true"` | Always show chat |
| `VITE_MERNIFY_AI_ENABLED` | `"false"` | Always hide chat |
| unset + dev server | — | Chat visible (dev fallback) |
| unset + production | — | Chat visible only if `VITE_AI_CHAT_ENDPOINT` is set |
| Any URL | `?mernify_ai=1` | Override: show chat (for internal preview) |

## Performance Impact

- `MernifyChat` is lazy-loaded via `React.lazy` — zero JS added to initial bundle
- No new npm packages — chat uses only React, Lucide React (already installed), and native fetch
- Cloudflare Worker has <5ms cold start, <200ms typical response latency (excl. AI generation)
- AI generation: 1–4s typical for Haiku-class models
