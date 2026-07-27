# CURRENT WEBSITE AUDIT

**Repository:** `C:\Users\MT\Projects\mernify`  
**Audit date:** 2026-07-24  
**Dev server:** `http://localhost:5174/` (`npm run dev`)  
**Evidence:** `docs/previews/audit-2026-07-24/` + `audit-findings.json`  
**Sources reviewed:** Brand Guidelines PDF (22 pages), Competitor Analysis.txt, brand board image, `package.json`, `README.md`, all `src/` + `public/`, existing `docs/06-brand-source-of-truth.md`  
**Note:** No root `AGENTS.md` exists in this website repo. Instructions were taken from `Mernify.mds/project agent.md` (companion brief) plus in-repo brand docs.

---

## 1. Current technical profile

| Area | Finding |
|------|---------|
| Framework | React 19 + Vite 7 (JavaScript / JSX) |
| Routing | `react-router-dom` v7 — `BrowserRouter` via providers, route map in `src/app/router.jsx` |
| Styling | CSS Modules + global token sheet (`src/styles/tokens/tokens.css`) — no Tailwind / CSS-in-JS |
| Component architecture | App shell → layout → UI primitives → content modules → section components |
| Animation | GSAP + ScrollTrigger, Lenis smooth scroll, optional SoftCursor |
| 3D | Three.js hero atmosphere (`SceneCanvas` + `HeroAtmosphereScene`) |
| Icons / marks | `lucide-react`, `simple-icons` |
| Fonts | `@fontsource/space-grotesk`, `@fontsource/inter` |
| SEO assets | Single `index.html` title/description; `public/robots.txt` references missing `sitemap.xml` |
| Tests | Playwright installed as tooling only — no test suite wired |

### Installed dependencies (runtime)

`react`, `react-dom`, `react-router-dom`, `gsap`, `lenis`, `three`, `lucide-react`, `simple-icons`, `@fontsource/inter`, `@fontsource/space-grotesk`

All of the above are already in use. No new libraries are required to complete the marketing site.

### Routes today

| Path | Status | Content |
|------|--------|---------|
| `/` | Partial | Hero + Trust + Services only |
| `/services` | Placeholder | Title + temporary copy |
| `/work` | Placeholder | Title + temporary copy |
| `/about` | Placeholder | Title + temporary copy |
| `/process` | Placeholder | Process line only |
| `/contact` | Placeholder | No form |
| `/privacy`, `/terms` | Missing | SPA 404 (`Page not found`) while footer labels them |
| Service deep links (`/services#…` or `/services/:slug`) | Missing | Footer service links all point to `/services` |

---

## 2. Visual QA (Playwright)

Captured at **1440×1000**, **1024×768**, **768×1024**, **390×844** (viewport + full-page where noted).

### Observations by viewport

**1440×1000**  
Hero matches brand direction: dark navy, indigo CTA, cyan eyebrow, product-architecture card, dual CTAs. Trust + Services render below on scroll. No horizontal overflow.

**1024×768**  
Desktop nav still present (≥1024). Hero composition remains left-copy / right-visual. Acceptable density; watch sticky services stage height on short viewports.

**768×1024**  
Hamburger replaces desktop nav. CTAs stack. No overflow. Hero visual stage collapses appropriately.

**390×844**  
Readable type, stacked CTAs, mobile menu opens with numbered links + primary/secondary actions. No overflow. SoftCursor is irrelevant on touch but still mounted.

### Console / network

- **Errors:** none observed in app JS.
- **Warnings:** headless WebGL / GPU stall noise from Three.js hero (environment-specific; still signals heavy GPU cost).
- **Network 4xx/5xx:** none for app assets during capture.
- **robots.txt** points to `/sitemap.xml` which is **not present**.

### Performance notes

- Initial HTML navigation timing in headless was fast; real cost is **Three.js + GSAP + Lenis + large Unsplash JPGs** (~200–450KB each under `src/assets/images/services/`).
- Hero scene is deferred via `requestIdleCallback`, which is good, but WebGL still runs on desktop once allowed.
- Soft custom cursor adds global pointer listeners on every page.

---

## 3. Current strengths

1. **Brand tokens are largely correct** — indigo `#4F46E5`, cyan `#06B6D4`, navy `#0F172A`, cloud `#F8FAFC`, Space Grotesk + Inter match Brand Guidelines.
2. **Hero messaging is locked correctly** — “Build Modern Digital Products That Scale”, primary CTA “Discuss Your Project”, secondary “View Our Work”.
3. **Service IA is purchase-oriented** (Web & SaaS, Mobile, AI, Design, Support) — not a MERN/MEAN headline trap.
4. **Honest trust strip** — technology marks via Simple Icons, explicitly not fake client logos.
5. **Solid engineering foundations** — CSS tokens, UI primitives (`Button`, `Section`, `Heading`…), reduced-motion providers, skip link, semantic `main`, lazy routes, CSS Modules.
6. **Services section craft** — editorial index + media stage is original (not a generic card farm); keyboard + `aria-pressed` patterns present.
7. **Mobile nav quality** — numbered list, Escape to close, Lenis stop while open, focus return to toggle.
8. **Documentation depth** — prior specs (`06`–`12`, homepage experience) reduce redesign ambiguity.

---

## 4. Current weaknesses

1. **Homepage is incomplete** vs required narrative (missing Reasons, Work, Industries, Process, Offers, Technology, Testimonials gate, Standards, Final CTA).
2. **Conversion dead-ends** — CTAs land on placeholder Contact/Work pages with meta copy about shipping later.
3. **Inner pages are stubs** — Services / Work / About / Process / Contact do not sell or convert.
4. **Legal dead labels** — footer “Privacy” / “Terms” are `<span>`s, not links; routes 404.
5. **SEO is SPA-default** — one global title/description; no per-route meta, OG, canonical, or sitemap file.
6. **Hero marked “NOT APPROVED / parked”** in code comments while still live — product-architecture card + Three.js atmosphere diverge from brand board’s simpler product-dashboard storytelling.
7. **Stock Unsplash imagery** in Services conflicts with “product interface compositions / avoid generic stock” guidance when overused as primary proof.
8. **No case studies, industries, engagement models, or real proof** — largest competitive gap per Competitor Analysis.
9. **Header enter animation can leave chrome incomplete** on light/inner routes (nav/CTA use GSAP `autoAlpha` from 0 on pathname change) — contact capture showed logo-dominant header with weak chrome presence.
10. **Dark token drift** — some hero CSS uses near-blacks (`rgba(6,10,18…)`) vs locked Midnight Navy `#0F172A` / project `#07111F` discussion; feels slightly off-brand board.

---

## 5. Brand inconsistencies

| Topic | Brand / brief | Current site |
|-------|---------------|--------------|
| Primary promise | Product engineering partner; business outcomes | Mostly aligned in hero copy |
| Lead with stack names | Do not lead with MERN/MEAN | Compliant on homepage; PDF still lists MERN/MEAN as core services historically — site correctly de-emphasizes |
| Dark ground | Midnight Navy `#0F172A` (PDF); project agent also cites `#07111F` | Mix of navy + near-black rgba |
| Gradients | Selective indigo→cyan | CTA glow + logo gradient OK; Three.js atmosphere risks “decorative tech” overuse |
| Logo | Flat masters; glow mockup-only | SVG mark is clean; button glow is intentional but heavy |
| Hero visual | Product dashboards / device mockups (board + brief) | Abstract WebGL + glass “Product Architecture” bars |
| Trust | Clients and/or tech; never fake logos | Tech-only (correct for now) but thin vs competitors’ proof |
| Footer | Brand board shows richer multi-column story blocks | Minimal 2-column company/services |
| Tone | Clear, honest, no empty claims | Placeholders literally say content ships later — honest but unshippable |
| Typography roles | PDF: Inter primary UI/body; Space Grotesk for major headings | Implemented correctly |

---

## 6. UX problems

- Primary journey **Discuss Your Project → /contact** has no form, email, calendar, or success state.
- **View Our Work → /work** has no portfolio — undermines secondary CTA.
- Homepage stops after Services — no process, offers, or closing CTA → weak conversion arc vs tkxel/SSI benchmarks.
- Footer service links are undifferentiated (all `/services`).
- SoftCursor can confuse precision users and fight native OS cursors; not needed for conversion.
- Placeholder pages expose internal process language (“section gates”) to buyers — kills premium feel.
- No sticky path for “what happens after I click” (engagement models / Discovery Sprint).

---

## 7. Responsive problems

- **No horizontal overflow** at the four audited sizes (good).
- Desktop nav only from **1024px** — 1024 is fine; 900–1023 depends on hamburger (acceptable if intentional).
- Services sticky split stage needs continued QA on short laptop heights (768px tall).
- Hero H1 line breaks differ by width; ensure no mid-word clipping (a11y tree showed concatenated “DigitalProducts” without visible space in textContent join — verify CSS line boxes).
- Mobile menu is strong; ensure focus trap / background inert beyond `overflow: hidden` when expanding a11y later.

---

## 8. Accessibility

**Present**

- Skip link → `#main-content`
- Landmark `main`, header/footer structure
- Mobile menu `aria-expanded` / `aria-controls` / Escape
- Reduced-motion providers disable Lenis / tone down GSAP
- Service images have alt text
- Logo has accessible name

**Gaps**

- SoftCursor is decorative but may obscure perceived focus; ensure `:focus-visible` remains strong on all interactive elements
- Contact has no form labels yet (page incomplete)
- Heading outline on home is short (H1 + section H2s only) — fine now, must scale carefully as sections add
- Privacy/Terms not reachable
- Color is not the only cue in services (icons + text) — good; keep that pattern
- Custom cursor + magnetic buttons can reduce target predictability for motor impairment

---

## 9. SEO / content quality

- Unique titles/descriptions: **missing** (all routes share root title).
- Open Graph / Twitter cards: **missing**.
- Canonical: **missing**.
- Structured data: **missing**.
- Sitemap: referenced, **file missing**.
- Internal linking: shallow; placeholders dominate.
- Content quality on live home sections: **good directional copy**; incomplete vs full brand narrative.
- Fake claims: **none invented** (strength). Placeholders must not become fake metrics later.

---

## 10. Missing pages (vs project requirements)

Required and missing or stubbed:

- Full **Services** index + detail pages (Product Engineering, SaaS, Web, Mobile, AI, Cloud/DevOps)
- **Industries**
- **Case Studies** (Work)
- **About** (real narrative)
- **Contact** (working)
- **Privacy Policy**, **Terms of Service**
- Optional but briefed: productized offers as pages or homepage modules (Discovery Sprint, MVP Launch, Dedicated Pod, Rescue)

---

## 11. Missing trust signals

- Real case studies with problem → solution → outcome
- Authentic industries (3–4 max at first)
- Delivery standards / QA / security posture (without fake certifications)
- Engagement models & how to start
- Team / founder credibility (About)
- Contact channels
- Optional later: real testimonials only

---

## 12. Content to remove or rewrite

| Content | Action |
|---------|--------|
| Placeholder page body copy mentioning “gates” / “ships after…” | Remove before any public launch; replace with real page content or temporary “Coming soon” + contact only |
| Footer Privacy/Terms spans | Convert to real routes or hide until written |
| Over-reliance on Unsplash stock in Services | Replace with original product UI compositions where possible |
| Hero “NOT APPROVED” parked state | Redesign or explicitly approve; do not leave meta-status in UX |
| Any future temptation to add fake logos/stats/awards | Forbidden — omit section instead |
| Brand Guidelines short description leading with MERN/MEAN | Do not put on website hero; keep stack in Technology section only |

---

## 13. Competitive gaps (without copying)

Borrow **patterns**, not assets:

| Competitor lesson | Mernify gap |
|-------------------|-------------|
| tkxel — business-first services + quantified cases | No cases; homepage incomplete |
| SSI — industry depth + lifecycle trust | No industries / standards section |
| Narsun — memorable specialization | Position exists in docs; site still feels unfinished |
| Elytra — simple process clarity | Process page stub; no homepage process module |
| Stripe/Vercel/Linear quality bar | Motion/foundation promising; content depth not there |

**Wedge to protect:** founder-level attention, speed, focused pods, transparent models for startups/mid-market — not enterprise sprawl.

---

## 14. Recommended architecture

Keep **React + Vite + React Router + CSS Modules + token CSS**. Do not migrate frameworks.

```text
src/
  app/                 # router, providers
  components/
    ui/                # primitives
    navigation/        # header, footer, mobile nav
    forms/             # contact form controls
    media/             # TechMark, DeviceFrame, CaseMedia
    seo/               # PageMeta helper
  content/             # typed JS content modules (copy source of truth)
  sections/home/       # homepage sections only
  sections/shared/     # FinalCta, ProcessSteps, OfferCards…
  pages/               # route-level composition
  styles/tokens/       # --mf-* tokens
  three/               # optional; gate behind approval / reduced-motion
```

Content stays in `src/content/*` so pages stay thin.

---

## 15. Recommended component inventory

**Keep / harden:** `Button`, `TextLink`, `Container`, `Section`, `Stack`, `Heading`, `Text`, `Eyebrow`, `SkipLink`, `LogoMark`, `SiteHeader`, `SiteFooter`, `TechMark`, `HomeTrust`, `HomeServices`

**Add:** `PageMeta`, `PageHero`, `FinalCta`, `ProcessSteps`, `OfferGrid`, `IndustryGrid`, `CaseStudyCard`, `CaseStudyList`, `ContactForm`, `FaqList`, `StandardsStrip`, `DeviceMock`, `EmptyState` (honest, non-internal), `LegalDocument`

**Revisit / likely remove or disable by default:** `SoftCursor`, magnetic-everywhere defaults, Three.js hero until redesigned hero is approved

---

## 16. Recommended implementation order

1. Token + header/footer hardening (legal links, header animation reliability, nav visibility on light pages)
2. SEO shell (`PageMeta`, sitemap, robots accuracy)
3. Contact page + form (conversion unblocker)
4. Complete homepage remaining sections (gated empty states for missing proof)
5. Services index + detail templates
6. Work / case-study template (placeholders labeled until real cases exist)
7. About + Process
8. Industries (3–4 authentic only)
9. Privacy + Terms
10. Hero redesign pass (replace parked V1)
11. Performance pass (image pipeline, optional drop Three.js)
12. QA report + lint + production build

---

## 17. Risks and dependencies

| Risk | Impact | Mitigation |
|------|--------|------------|
| No real case-study data | Cannot claim outcomes | Hide Work highlights or use labeled “Selected capabilities” without fake metrics |
| Hero redesign disagreement | Blocks polish | Keep V1 parked; ship conversion pages first |
| Three.js cost on low-end GPUs | Jank / battery | CSS/atmosphere fallback; respect reduced motion |
| Stock photo dependency | Brand “generic agency” look | Commission or craft UI mock compositions |
| SPA SEO | Weak share/search previews | `PageMeta` + prerender or adapter later if needed |
| Contact backend | Form with nowhere to go | Start with `mailto:` / Formspree / serverless endpoint decision |
| Scope creep to full agency mega-nav | Dilutes wedge | Cap industries; keep service taxonomy to five purchase categories |

---

## 18. Audit verdict

The project has a **credible foundation and correct brand direction**, but it is **not launch-ready**. It is a partial homepage plus placeholders. The largest gaps are **conversion (Contact)**, **proof (Work)**, **complete homepage narrative**, and **SEO/legal completeness** — not the choice of React/Vite stack.
