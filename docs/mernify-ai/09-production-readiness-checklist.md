# Production Readiness Checklist

## External Configuration Required Before Go-Live

- [ ] Cloudflare Worker deployed (`cf-worker/ai-chat.js`)
- [ ] `AI_API_KEY` set as Worker secret (Anthropic)
- [ ] `RESEND_API_KEY` set as Worker secret
- [ ] `CONTACT_TO` set to `info@mernify.co`
- [ ] `CONTACT_FROM` set to verified Resend sender
- [ ] `ALLOWED_ORIGIN` matches production domain(s)
- [ ] `VITE_AI_CHAT_ENDPOINT` set in hosting environment
- [ ] `VITE_MERNIFY_AI_ENABLED=true` set in hosting environment
- [ ] `VITE_CALENDLY_URL` set (for booking CTA)

## Code Checklist

- [x] Chat component lazy-loaded (zero impact on initial bundle)
- [x] No new npm dependencies introduced
- [x] No API keys in frontend code
- [x] Input sanitised client-side and server-side
- [x] Prompt-injection guard in Worker
- [x] Rate limiting: 20 req/min/IP
- [x] Max message length: 2000 chars
- [x] Max conversation turns: 30
- [x] CORS allowlist enforced
- [x] Lead form consent checkbox required
- [x] Privacy Policy link in consent note
- [x] AI disclosure label ("You're chatting with an AI")
- [x] Keyboard navigation (Tab, Escape, Enter to send)
- [x] Focus trap inside panel when open
- [x] `aria-live` on message log
- [x] `role="dialog"` + `aria-modal="true"` on panel
- [x] `prefers-reduced-motion` respected (all animations)
- [x] Mobile full-screen layout at ≤480px
- [x] Error banner with dismiss action
- [x] Timeout handling (35s client / 30s Worker)
- [x] Dev fallback when no endpoint configured
- [x] Feature flag with URL override (`?mernify_ai=1`)
- [x] GA4 analytics events throughout journey
- [x] New conversation / reset action
- [x] Lead email delivery via Resend
- [x] Booking via Calendly or `/contact` fallback

## Known Limitations (Disclose Before Launch)

| Item | Detail | Mitigation |
|------|--------|-----------|
| Knowledge base is static | Embedded in Worker — not dynamically updated | Re-deploy Worker when services/content change |
| No vector search / RAG | Keyword-based knowledge injection | Sufficient for current content volume; upgrade path documented |
| No conversation persistence | Sessions lost on page refresh | Acceptable for initial release; add storage later if needed |
| No human handoff routing | AI detects intent but cannot open a live chat | Directs to `/contact` or Calendly — team follows up by email |
| Worker rate limit is in-memory | Resets on Worker restart / new instance | Acceptable for initial load; upgrade to Cloudflare KV rate limit for high traffic |
| Tailorize authorship unconfirmed | `mode: observed` — client approval pending | AI has been instructed to say "This should be confirmed with the Mernify team" |
| No Playwright tests | Test stubs not yet written | Add before scaling traffic |

## Recommended Next Actions

1. **Deploy Worker** — follow `06-deployment-guide.md`
2. **Set env vars** — in Cloudflare Dashboard and hosting platform
3. **Test lead form** — confirm email arrives at `info@mernify.co`
4. **Enable on staging** — `?mernify_ai=1` preview
5. **Get legal/content sign-off** on AI disclosure text and privacy note
6. **Enable on production** — set `VITE_MERNIFY_AI_ENABLED=true`
7. **Monitor** — Cloudflare Worker analytics + Anthropic cost dashboard
