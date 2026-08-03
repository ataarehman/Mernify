# Repository & Production Audit

**Date:** 2026-08-03  
**Branch:** `feature/mernify-ai-concierge`  
**Audited repo:** https://github.com/AgsQaintern/mernify  
**Production site:** https://mernify.co/

---

## Confirmed Stack

| Component | Version / Detail |
|-----------|-----------------|
| Frontend framework | React 19 |
| Build tool | Vite 7 |
| Language | JavaScript (JSX) — no TypeScript |
| Routing | React Router 7 (SPA, lazy-loaded routes) |
| Styling | CSS Modules + `--mf-*` design tokens |
| Animation | GSAP 3.13 + Lenis 1.3.8 |
| Icons | Lucide React |
| Fonts | Phudu (display) + Instrument Sans (body) via Fontsource |
| Testing | Playwright 1.54 (installed, no test files yet) |
| Package manager | npm (package-lock.json present) |
| Backend | None — pure static SPA |
| AI packages | None pre-existing |
| Database | None |
| Contact delivery | Cloudflare Worker (`cf-worker/contact.js`) → Resend |
| Booking | Calendly via `VITE_CALENDLY_URL` |
| Analytics | GA4 via `VITE_GA_MEASUREMENT_ID` (loads after cookie consent) |
| Deployment | Static hosting with SPA fallback (Vercel/Netlify/nginx) |
| Existing AI features | None |

---

## Route Map

| Route | Component | Status |
|-------|-----------|--------|
| `/` | HomePage | ✅ Confirmed |
| `/services` | ServicesPage | ✅ Confirmed |
| `/services/:slug` | ServiceDetailPage | ✅ Confirmed |
| `/industries` | IndustriesPage | ✅ Confirmed |
| `/case-studies` | CaseStudiesPage | ✅ Confirmed |
| `/case-studies/:slug` | CaseStudyPage | ✅ Confirmed |
| `/process` | ProcessPage | ✅ Confirmed |
| `/about` | AboutPage | ✅ Confirmed |
| `/contact` | ContactPage | ✅ Confirmed |
| `/privacy` | PrivacyPage | ✅ Confirmed |
| `/terms` | TermsPage | ✅ Confirmed |
| `/work` | Redirect → `/case-studies` | ✅ Confirmed |
| `/*` | NotFoundPage | ✅ Confirmed |

---

## Published Case Studies (from `src/content/caseStudies.js`)

| Slug | Status | Notes |
|------|--------|-------|
| tailorize | published | Authorship mode: `observed` — delivery authorship unconfirmed with client |
| servloom | published | ✅ |
| godiva | published | ✅ |
| goodbooks-plus-analytics | published | ✅ |
| medbill-ultra | published | ✅ |
| metro-electric | published | ✅ |
| mrzzm | published | ✅ |
| spaceworx | published | ✅ |
| trendyol | published | ✅ |

---

## Existing Branches

| Branch | Purpose |
|--------|---------|
| `main` | Production branch — merged PR #1 from audit-changes |
| `origin/audit-changes` | Previous audit improvements (merged) |
| `origin/Saim_Dev` | Previous developer feature work |
| `feature/mernify-ai-concierge` | This feature (current) |

---

## Key Findings & Risk Assessment

| Area | Repository | Notes | Risk |
|------|------------|-------|------|
| AI features | None | No existing AI code — clean slate | Low |
| Backend | None | All server logic must be in CF Workers | Medium — careful not to leak API keys |
| Case studies | Some unverified authorship | Tailorize marked `mode: observed` | Medium — AI must not over-claim |
| Contact form | CF Worker + Resend implemented | Production secrets not configured locally | Low |
| Booking | Calendly via env var | URL not committed | Low |
| Testimonials | None published | AI must not invent testimonials | Low |
| Untracked files | `docs/mernify-website-audit/` + `.zip` | Pre-existing, not added to git | Low |
| Source maps | Disabled in production build | ✅ Security good practice | None |
| z-index budget | Header=100, Nav=200, Skip=300 | Chat panel uses 999/1000 — above all | Note: no conflict |

---

## Recommendations

1. Deploy `cf-worker/ai-chat.js` to Cloudflare and add `VITE_AI_CHAT_ENDPOINT` to hosting env.
2. Confirm Tailorize authorship with client before AI references it as Mernify-built.
3. Add `VITE_MERNIFY_AI_ENABLED=true` to staging env for preview testing.
4. Set `ALLOWED_ORIGIN` in Worker to match production domains exactly.
5. Do not commit `.env` — only `.env.example` is tracked.
