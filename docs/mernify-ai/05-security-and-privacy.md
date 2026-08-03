# Security & Privacy — Mernify AI Concierge

## Threat Model

| Threat | Mitigation |
|--------|-----------|
| Prompt injection via user input | 10-pattern regex guard in Worker before AI call; matched messages get safe deflection |
| System prompt extraction | System prompt never returned to client; AI instructed to refuse |
| API key leakage | All keys in Worker secrets; never in `VITE_*` or browser bundle |
| Excessive requests / DoS | Rate limit: 20 req/min/IP; max message length 2000 chars; max turns 30 |
| XSS via AI-generated content | AI response rendered as text only — never `dangerouslySetInnerHTML`; safe markdown parser strips HTML tags |
| HTML injection in messages | `sanitizeText()` strips `<tag>` patterns and control chars client + server |
| CORS abuse | `ALLOWED_ORIGIN` allowlist in Worker; options preflight checks origin |
| Lead form spam | Honeypot field (hidden `website` field in contact form reused pattern); email regex validation; consent required |
| Duplicate lead submission | Frontend disables submit button after success; idempotency is best-effort (Resend deduplication) |
| Sensitive data in logs | Worker does not log message content; only IP for rate limiting |
| Transcript exposure | Conversation state lives only in browser memory (React state); cleared on page refresh or new conversation |
| Insecure direct object references | No database IDs exposed; no conversation retrieval endpoint |

## Prompt Injection Guard

The Worker checks the last user message against 10 regex patterns before calling the AI:

```js
/ignore\s+(all\s+)?previous\s+instructions?/i
/reveal\s+(your\s+)?(system\s+prompt|api\s+key|instructions?|secrets?)/i
/show\s+(me\s+)?(your\s+)?(system\s+prompt|hidden|private|internal)/i
/print\s+(your\s+)?(hidden|system|internal|secret)/i
/act\s+as\s+(the\s+)?(system|admin|root|unrestricted)/i
/pretend\s+(you\s+are\s+)?unrestricted/i
/output\s+all\s+(env(ironment)?\s+var|secret|credential)/i
/disregard\s+(your|all)\s+(previous|prior|above)/i
/jailbreak/i
/DAN\s+mode/i
```

On match: Worker returns a safe deflection response without calling the AI API. Pattern can be extended with additional Worker redeploy.

## Content Security

- AI responses rendered via a **safe markdown renderer** (`ChatMessage.jsx`) that:
  - Parses only bold (`**text**`) and bullet lists (`- item`)
  - Does not execute JavaScript
  - Does not render HTML tags
  - Strips anything that looks like a tag via `replace(/<[^>]*>/g, '')`
- No `dangerouslySetInnerHTML` is used anywhere in the chat system

## Privacy & Consent

### What is collected

| Data | When | Stored Where | Retention |
|------|------|-------------|-----------|
| Conversation messages | Always | Browser memory only | Cleared on refresh / new conversation |
| Name, email, company | Only when lead form submitted | Sent to Mernify via Resend email | Per Mernify email retention policy |
| Page URL, page type | Per message (context) | Sent to Worker with each request; not persisted | Not stored |
| IP address | Per request | Worker in-memory rate map only | Resets on Worker restart |
| GA4 analytics events | After cookie consent | Google Analytics | Per GA4 data retention settings |

### Consent flow

1. AI disclosure shown on first open: *"You're chatting with an AI assistant. Not a human."*
2. Lead form shows: *"By submitting, you agree to the Privacy Policy. Your conversation summary will be included."*
3. User must explicitly click **Send to Mernify** — no auto-submission

### Privacy policy

The existing `/privacy` page at mernify.co covers data collection. Before going live, the Mernify legal/content team should add a section covering:

- That the AI chat feature uses Anthropic's API (data sent to Anthropic's servers)
- Conversation messages are processed by the AI provider but not stored by Mernify
- Lead form submissions are stored in email (Resend) and may be added to CRM
- Link to Anthropic's privacy policy: https://www.anthropic.com/privacy

**This is a documentation recommendation — the actual privacy policy changes require legal review before publishing.**

## Security Headers

The Cloudflare Worker sets:
- `Cache-Control: no-store` on all responses
- `Vary: Origin` to prevent cross-origin cache poisoning
- No source maps in production build (`sourcemap: false` in `vite.config.js` — pre-existing)

## API Key Management

```
✅ AI_API_KEY        → Cloudflare Worker Secret (never in code or env files)
✅ RESEND_API_KEY    → Cloudflare Worker Secret
✅ VITE_*            → Public env vars only (no secrets)
✅ .env*             → Gitignored (only .env.example tracked)
```

## Rate Limiting Details

Current implementation uses a Worker in-memory `Map`:
- 20 requests per IP per 60-second window
- Returns HTTP 429 on breach
- Resets on Worker restart / new isolate

**Upgrade path for high traffic:** Replace in-memory map with `env.RATE_LIMIT_KV` (Cloudflare KV) for persistence across Worker instances. API surface unchanged.
