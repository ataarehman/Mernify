# REDESIGN IMPLEMENTATION PLAN

**Status:** Plan only — no website code changes in this phase  
**Companion docs:** `CURRENT_WEBSITE_AUDIT.md`, `CONTENT_ARCHITECTURE.md`, `DESIGN_SYSTEM.md`  
**Stack decision:** Preserve React 19 + Vite 7 + React Router + CSS Modules + existing `--mf-*` tokens

---

## Principles

1. Ship conversion and trust before decorative motion.
2. Never invent clients, metrics, testimonials, or certifications.
3. Prefer content modules in `src/content/` over hard-coded copy in JSX.
4. Reuse primitives; add components only when a second use appears or the brief requires a template.
5. Empty state > fake proof.
6. Hero redesign is a dedicated phase — do not block Contact/Services/Work on it.

---

## Phase 0 — Hardening (1–2 days)

**Goal:** Make the shell trustworthy on every route.

| Task | Files |
|------|-------|
| Fix header enter animation so light/inner pages never leave nav/CTA at `autoAlpha: 0` | `src/components/navigation/SiteHeader.jsx` |
| Ensure desktop nav contrast on light theme | `SiteHeader.module.css` |
| Wire Privacy/Terms as real routes or hide labels | `SiteFooter.jsx`, `router.jsx`, new pages |
| Disable SoftCursor by default (feature flag or remove mount) | `RootLayout.jsx`, `SoftCursor.jsx` |
| Align near-black hero header gradients to navy tokens | `SiteHeader.module.css`, `HomeHero.module.css` |
| Add `PageMeta` utility and apply on Home | `src/components/seo/PageMeta.jsx`, `HomePage.jsx`, `index.html` |

**Exit criteria:** All current routes show usable header/footer; no internal “gates” language in chrome; lint clean.

---

## Phase 1 — Conversion unblock (2–3 days)

**Goal:** Primary CTA works.

| Task | Files |
|------|-------|
| Build Contact page (hero, short value, form, alternate contact methods placeholders) | `src/pages/ContactPage.jsx`, `src/sections/contact/*`, `src/content/contact.js` |
| Form fields: name, email, company, project type, budget band (optional), message | `src/components/forms/ContactForm.jsx` (+ CSS module) |
| Validation + accessible errors | same |
| Submission strategy (decide once): `mailto:` MVP **or** form endpoint env | `.env.example`, thin API helper if needed |
| Success / failure states | `ContactForm.jsx` |
| CTA audit: header, hero, placeholders → real Contact | `navigation.js`, pages |

**Exit criteria:** Playwright can fill and submit (or open mailto); focus order valid; mobile usable.

---

## Phase 2 — Homepage completion (4–6 days)

Build remaining sections in order. Each section: content module → component → CSS module → reduced-motion path → screenshots.

| Order | Section | Create / update |
|-------|---------|-----------------|
| 1 | `HomeReasons` | `src/sections/home/HomeReasons.jsx`, `content/reasons.js` — only with real differentiators; else skip |
| 2 | `HomeWork` | `HomeWork.jsx`, `content/work.js` — empty-state compliant if no cases |
| 3 | `HomeIndustries` | `HomeIndustries.jsx`, `content/industries.js` — max 3–4 authentic |
| 4 | `HomeProcess` | `HomeProcess.jsx` — 7 steps from brand board |
| 5 | `HomeOffers` | `HomeOffers.jsx`, `content/offers.js` — Discovery / MVP / Pod / Rescue |
| 6 | `HomeTechnology` | May extend Trust or separate denser tech section |
| 7 | `HomeStandards` | QA, security posture, delivery — no fake certs |
| 8 | `HomeFinalCta` | Dark band → Contact |
| 9 | Optional `HomeFaq` | Only with real FAQs |

Wire into `HomePage.jsx` in spec order (`docs/05-page-and-section-map.md`).

**Testimonials:** do not build until real quotes exist.

**Exit criteria:** Homepage scrolls as a full conversion narrative without fake proof; Final CTA present.

---

## Phase 3 — Services system (3–4 days)

| Task | Files |
|------|-------|
| Services index page replacing placeholder | `ServicesPage.jsx`, `sections/services/ServicesIndex.jsx`, `content/services.js` (extend) |
| Shared service detail template | `pages/ServiceDetailPage.jsx`, `sections/services/ServiceDetail.jsx` |
| Routes for five purchase categories | `router.jsx` — e.g. `/services/web-saas`, `/services/mobile`, `/services/ai-automation`, `/services/product-design`, `/services/support-maintenance` |
| Optional Cloud/DevOps & Product Engineering pages if content ready | same template |
| Footer links to real slugs | `SiteFooter.jsx` |
| Cross-links to offers + contact | detail template |

**Exit criteria:** Each service has problem → approach → capabilities → CTA; no MERN-first titles.

---

## Phase 4 — Work / case studies (3–5 days, content-gated)

| Task | Files |
|------|-------|
| Case study content schema | `content/caseStudies.js` |
| Work index | `WorkPage.jsx`, `CaseStudyCard.jsx` |
| Case detail route | `/work/:slug`, `CaseStudyPage.jsx` |
| Fields per Competitor Analysis standard | industry, problem, users, solution, architecture, features, integrations, timeline, media, **results only if real**, quote only if real |

If fewer than two real cases: ship index with honest empty/capability framing; do not fabricate.

---

## Phase 5 — About + Process pages (2 days)

| Task | Files |
|------|-------|
| About narrative from Brand Guidelines (purpose, values, audiences, partnership) | `AboutPage.jsx`, `content/about.js` |
| Process page expanding 7-step model + engagement models | `ProcessPage.jsx`, `content/process.js` |
| Reuse `ProcessSteps`, `OfferGrid` from homepage | `sections/shared/*` |

---

## Phase 6 — Industries + legal + SEO closeout (2–3 days)

| Task | Files |
|------|-------|
| Industries page or section-only (prefer section-first) | `IndustriesPage.jsx` optional |
| Privacy Policy | `PrivacyPage.jsx`, `content/legal/privacy.js` |
| Terms of Service | `TermsPage.jsx`, `content/legal/terms.js` |
| `public/sitemap.xml` + accurate `robots.txt` | `public/` |
| Per-route `PageMeta` + OG tags | all pages |
| JSON-LD Organization + optional ProfessionalService | `components/seo/JsonLd.jsx` |

---

## Phase 7 — Hero redesign (dedicated, after conversion)

| Task | Files |
|------|-------|
| Replace parked Hero V1 per approved direction | `HomeHero.jsx`, `HomeHero.module.css` |
| Prefer CSS/SVG product composition over Three.js unless approved | possibly retire `three/scenes/HeroAtmosphereScene.js` from default path |
| Match brand board: dark hero, dashboard/product visual, restrained glow | assets under `src/assets/images/heroes/` |
| Keep locked copy unless brand owner changes it | `content/home.js` |

**Exit criteria:** Human approval screenshots at four viewports; reduced-motion still elegant.

---

## Phase 8 — Performance & QA (2 days)

| Task | Files / commands |
|------|------------------|
| Compress/convert service images (WebP/AVIF), width hints | `src/assets/images/services/*`, build pipeline or manual |
| Lazy below-fold images (already partial) | Services + Work |
| Bundle check; confirm Three.js not on inner routes | router/lazy boundaries |
| `npm run lint` | — |
| `npm run build` + `npm run preview` | — |
| Playwright route crawl + form + menus | extend `scripts/audit-capture.mjs` or add `scripts/qa-smoke.mjs` |
| Final QA report | `docs/QA_REPORT.md` (later) |

---

## File change forecast (by area)

### Will be modified

- `src/app/router.jsx`
- `src/pages/*` (all)
- `src/pages/HomePage.jsx`
- `src/components/navigation/SiteHeader.jsx` (+ CSS)
- `src/components/navigation/SiteFooter.jsx` (+ CSS)
- `src/components/layout/RootLayout.jsx`
- `src/content/*`
- `src/styles/tokens/tokens.css` (additive only if needed)
- `index.html`
- `public/robots.txt`
- `README.md` (scripts / env notes)

### Will be created (expected)

- `src/components/seo/PageMeta.jsx`
- `src/components/forms/ContactForm.jsx`
- `src/sections/home/HomeReasons.jsx` … `HomeFinalCta.jsx`
- `src/sections/shared/*`
- `src/sections/services/*`
- `src/sections/contact/*`
- `src/content/contact.js`, `offers.js`, `industries.js`, `caseStudies.js`, `about.js`, `process.js`, `legal/*`
- `public/sitemap.xml`
- Service/Work detail pages

### Likely reduced or removed later

- Default mount of `SoftCursor`
- Default Three.js hero path
- Placeholder-only page pattern

---

## Dependencies

### Already sufficient

React, Vite, React Router, GSAP, Lenis, Lucide, Simple Icons, Fontsource Inter/Space Grotesk, Playwright (dev)

### Genuinely required new deps — none for core redesign

Only add if a concrete decision needs them:

| Optional | When justified |
|----------|----------------|
| Form backend SDK | If not using mailto / native form service |
| `react-helmet-async` or similar | Only if `PageMeta` via plain `useEffect` proves insufficient |
| Image tool (`sharp` in scripts) | If automated WebP generation is desired |

Do **not** add Tailwind, Framer Motion, UI kits, or CMS unless explicitly requested.

---

## Parallel workstreams

- **Content:** case studies, industries, legal text, contact inbox address
- **Design:** hero composition asset, service UI mockups
- **Engineering:** phases 0–3 can proceed without final cases (with empty states)

---

## Definition of done (redesign program)

1. All required routes render real buyer-facing content (or honest empty states).
2. Contact form works end-to-end.
3. Homepage includes full narrative through Final CTA.
4. No fake logos/stats/testimonials.
5. Lint + production build pass.
6. Playwright smoke across routes and four viewports.
7. SEO basics present (title, description, OG, sitemap, robots).
8. Accessibility basics: keyboard nav, focus, labels, reduced motion, alt text.
