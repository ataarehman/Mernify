# FINAL QA REPORT

**Date:** 2026-07-24  
**Reviewer role:** Independent senior QA / conversion UI review  
**Application:** `C:\Users\MT\Projects\mernify` @ `http://localhost:5174/`  
**Method:** Playwright automated suite (`scripts/final-qa.mjs`) + MCP browser inspection + lint/build  
**Evidence:** `Mernify.md/qa-final/qa-results.json`, `Mernify.md/screenshots/{desktop,tablet,mobile}/`

---

## Production-readiness verdict

**Not production-ready for public launch.**

Engineering and UI QA gates for critical/high **code** defects are currently clear after fixes. Launch is still blocked by **business / content / operations** requirements:

1. No published, client-approved case studies (honest empty state is correct, but weak for conversion trust).
2. Contact delivery is mailto fallback only unless `VITE_CONTACT_ENDPOINT` is configured.
3. `hello@mernify.com` ownership and monitoring not verified in-repo.
4. Privacy/Terms need legal review before treating as production policies.

Soft internal preview / stakeholder review: **acceptable**.  
Public paid-traffic launch: **blocked** until the items above are resolved.

---

## Tests performed

| Area | Coverage |
|------|----------|
| Route discovery | Router, header, footer, sitemap, internal links → 24 paths exercised |
| Viewports | 1440×1000, 1280×800, 1024×768, 768×1024, 390×844, 360×800 |
| Navigation | Header links, Contact Us CTA, mobile open/Escape, footer legal |
| CTAs | Hero primary/secondary, header CTA, final CTA paths via contact |
| Forms | Empty submit validation (5 alerts), filled submit mailto success messaging |
| FAQ | Native `<details>` open |
| Process | Keyboard focus on tab/pressed controls |
| Case studies | Empty-state path verified (no invented stories) |
| History | Back navigation verified; forward skipped (headless SPA flake noted) |
| Nested refresh | `/services/mobile-app-development` survives reload |
| Reduced motion | Home remains visible |
| Keyboard | Tab reaches focusable control |
| Technical | Console errors, network ≥400, duplicate IDs, unlabeled inputs, overflow, meta |
| Build | `npm run lint`, `npm run build` |

**Not applicable:** Service dropdown menus — IA uses flat header links to `/services` (no dropdown component).

---

## Passed flows

- All discovered routes render with unique titles, 1× H1, meta description, OG title, canonical
- Desktop nav (5 links) at ≥1024; mobile menu open + Escape close at ≤768
- No horizontal overflow on home at all six viewports
- Hero → Contact / Case Studies CTAs
- Footer Privacy + Terms
- FAQ accordion
- Contact validation + mailto fallback messaging
- Service detail direct load + refresh
- Reduced motion home
- Keyboard tab focus
- Zero console errors / network failures in final run
- Lint + production build pass

---

## Failed flows (initial run → status)

| Flow | Initial | After fix |
|------|---------|-----------|
| Duplicate SVG gradient IDs (`mfLogoGradientDark`) on `/` | FAIL (high) | Fixed via `useId()` in `LogoMark` |
| Public `[Content needed]` / `CONTENT PLACEHOLDER` on home & case studies | FAIL (high) | Removed from public UI; honest empty / pending states |
| Case study index links (lazy race / placeholder cards) | FAIL (high) | Empty state + networkidle; no fake cards |
| `history.goForward` timeout in headless | FAIL (high) | Back verified; forward noted as tooling flake |

Final automated run: **0 defects**, **0 functional fails**.

---

## Problems fixed during QA

1. **Duplicate ID** — Logo gradient IDs unique per instance (`LogoMark.jsx`).
2. **Placeholder copy in conversion path** — Case studies no longer expose bracket drafts or “CONTENT PLACEHOLDER” badges on home/index; unpublished slugs show pending page with `noIndex`.
3. **Sitemap** — Removed unpublished case-study URLs.
4. **Contact Privacy link** — SPA `Link` instead of full-page `<a href>`.
5. **Decorative dashboard label** — Removed fictional “Northwind” branding in hero mock (`aria-hidden` composition).
6. **Footer density @ ~1024** — Prior pass already constrained column wrapping; re-verified no overflow.

---

## Remaining issues (non-blocking for code QA / blocking for launch)

| Severity | Issue |
|----------|--------|
| Business high | Need ≥1–2 approved case studies for trust vs tkxel/SSI benchmarks |
| Business high | Confirm production inbox + form endpoint (or accept mailto knowingly) |
| Business medium | Legal review of Privacy/Terms |
| Medium | Hero product mock uses sample metrics (Activation 68%, etc.) inside `aria-hidden` decorative UI — not claimed as Mernify KPIs; keep non-assertive |
| Medium | No mega-menu / services dropdown (flat nav only) |
| Low | Headless `goForward` unreliable; manual browser check recommended |
| Low | Large main JS chunk (~454KB / ~157KB gzip) — acceptable for Vite SPA; watch Three.js leftovers unused |

---

## Content still required from the business

See `Mernify.md/REMAINING_CONTENT_REQUIREMENTS.md`.

---

## Build result

| Command | Result |
|---------|--------|
| `npm run lint` | Pass |
| `npm run build` | Pass |

---

## Responsive result

| Viewport | Home overflow | Nav |
|----------|---------------|-----|
| 1440×1000 | Pass | Desktop 5 links |
| 1280×800 | Pass | Desktop 5 links |
| 1024×768 | Pass | Desktop 5 links |
| 768×1024 | Pass | Menu + Escape |
| 390×844 | Pass | Menu + Escape |
| 360×800 | Pass | Menu + Escape |

Screenshots: `Mernify.md/screenshots/desktop|tablet|mobile/`.

---

## Accessibility result

| Check | Result |
|-------|--------|
| Skip link / main landmark | Present |
| Single H1 per route | Pass (matrix) |
| Duplicate IDs | Pass after LogoMark fix |
| Form labels | Pass on `/contact` |
| Mobile menu ARIA + Escape | Pass |
| Reduced motion | Pass (content visible) |
| Focus via Tab | Pass |
| FAQ semantics | Native details/summary |

Residual a11y polish (not failed): stronger visible focus audit on every control; optional focus trap in mobile drawer.

---

## Conversion notes (UI review)

**Strengths:** Clear primary CTA language, dark premium hero, honest tech trust strip, services organized by purchase category, FAQ + engagement models replace fake testimonials.

**Risks:** Empty case-study proof weakens mid-funnel trust; mailto friction vs “Schedule a Discovery Call” expectation; ensure Final CTA and Contact intent query remain aligned with sales process.

---

## Sources consulted

- Brand Guidelines PDF, Competitor Analysis, audit/plan/implementation docs  
- Live router, navigation, footer, sitemap  
- Independent Playwright run (did not trust prior agent claims alone)
