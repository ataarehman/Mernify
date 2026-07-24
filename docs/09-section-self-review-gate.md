# 09 — Section Self-Review Gate

**Status:** Mandatory process · Applies to every homepage (and later page) section  
**Priority:** Craftsmanship over speed — a section may not proceed until it passes  
**No exceptions** for “temporary,” “polish later,” or “good enough for now”

---

## When this gate runs

After a section is considered **functionally complete** (layout + content + motion + states wired), and **before**:

1. Starting the next section  
2. Marking the section done in the build order  
3. Opening a PR that includes that section as complete  

If any criterion fails → **redesign / refine / retest** → re-run the full gate.

---

## Source-of-truth stack (review order)

| Priority | Document | What it judges |
|----------|----------|----------------|
| 0 | `12-final-project-manifesto.md` | Five-year craftsmanship test; calm/premium/original |
| 1 | Brand Guidelines + Brand Board | Identity, color, type, voice, logo, UI basics |
| 2 | Competitor Analysis + `06` + `11` | Position, IA, proof standards, asset legality |
| 3 | `07-creative-direction-and-experience-blueprint.md` | Emotion, motion, atmosphere, luxury restraints |
| 4 | `08-homepage-experience-spec.md` | Exact layout, timeline, CTA, a11y, transitions |
| 5 | Engineering standards (`01`–`04`) | Structure, tokens, GSAP/Three rules, perf |

**Conflict rule:** Manifesto + brand + locked specs win. Convenience loses.

---

## Pass / Fail rubric

Each dimension is **PASS** or **FAIL**.  
Section ships only if **all are PASS**.  
Mark evidence in the checklist (file path, screenshot note, or short note).

---

### 1. Brand Guidelines

| Check | Pass condition |
|-------|----------------|
| Color | Only approved palette; indigo/cyan used as accents, not noise |
| Type | Space Grotesk for display/headings; Inter for body/UI |
| Voice | Clear, professional, business-focused; no banned hype words |
| Logo | Correct variation for light/dark; clear space; no glow as master |
| Promise | Reinforces partner positioning, not “developers for hire” commodity |
| Stack language | MERN/MEAN not presented as the brand promise |

**Fail examples:** Random fonts · off-brand gradients · “best in the world” copy · logo stretched · tech-stack hero identity

---

### 2. Competitor Analysis

| Check | Pass condition |
|-------|----------------|
| Position | Feels focused product partner (startup/mid-market accessible) |
| Differentiation | Clearer/practical vs Narsun specialization theater; simpler vs tkxel sprawl |
| Proof | Outcomes over logos-only; no empty portfolio flex |
| Originality | No layout/asset/copy resemblance to Narsun, Elytra, tkxel, SSI |
| Offers / services | Purchase categories, not language laundry lists |

**Fail examples:** Immersive-studio cosplay · enterprise mega-nav density · generic outsourcing clichés · copied section patterns

---

### 3. Creative Direction (`07`)

| Check | Pass condition |
|-------|----------------|
| Philosophy | Modular Clarity — calm, precise, quietly powerful |
| Hero budget | One composition; brand-level signal; no badges/stats/chips |
| Cards | Only where interactive/selectable (per spec) |
| Light/dark | Intentional tone band, not checkerboard decoration |
| Luxury details | Alignment, restraint, hairlines, short soft motion |
| Never-do list | None of the Creative Direction bans present |

**Fail examples:** Card farm · pill chrome · scroll-jacking · neon cyber clutter · motion-as-entertainment

---

### 4. Homepage Experience Spec (`08`)

| Check | Pass condition |
|-------|----------------|
| Purpose match | Section still serves its defined job |
| Layout / grid | Matches spec (columns, hierarchy, spacing tokens) |
| Content hierarchy | Exact order; no extra competing modules |
| Motion | Matches named timeline / ScrollTrigger rules |
| Three.js | Only where allowed (Hero); paused/disposed correctly |
| CTA | Correct targets, hierarchy, and frequency |
| Exit transition | Matches handoff into next section |
| Empty states | Missing proof → hide/omit — never fake |

**Fail examples:** Invented subsections · wrong CTA · marquee when spec says static · Process pin when Mode A locked · fake metrics

---

### 5. Performance

| Check | Pass condition |
|-------|----------------|
| LCP impact | Section does not steal LCP from hero poster/fonts inappropriately |
| Lazy loading | Below-fold media deferred; dimensions reserved (CLS) |
| JS weight | No unnecessary libs; Three not mounted outside hero |
| Runtime | Scroll remains smooth; no long tasks on enter |
| GPU | Offscreen animations paused; canvas paused when not visible |
| Assets | Compressed; modern formats; no 4K CSS-scaled images |

**Targets (Home):** LCP ≤2.5s · CLS ≤0.1 · INP ≤200ms · no janky scroll on mid laptop

**Fail examples:** Unsized images · multiple canvases · autoplay video · animating layout thrash every scroll

---

### 6. Accessibility

| Check | Pass condition |
|-------|----------------|
| Semantics | Correct headings, lists, landmarks |
| Keyboard | Full operation (accordion, menu, links, buttons) |
| Focus | Visible `:focus-visible` on all interactives |
| Contrast | AA on light and dark bands |
| Names | Buttons/links have accessible names |
| Motion | `prefers-reduced-motion` honored (final states, no pin/parallax/Three idle) |
| ARIA | Accordion/`aria-expanded` correct where used |

**Fail examples:** Hover-only content · invisible focus · text in canvas only · motion without reduced-motion path

---

### 7. Responsiveness

| Check | Pass condition |
|-------|----------------|
| 360 / 390 / 768 / 1024 / 1280 / 1440 | Composition holds; no overflow |
| Hero | Still one composition; CTAs tappable |
| Type | `clamp` scales; no clipped headlines |
| Touch | Targets ≥44px; no hover-only critical actions |
| Nav | Mobile sheet works; scroll lock correct |
| Spec mobile notes | Section-specific mobile behavior implemented |

**Fail examples:** Horizontal scroll · 10px tap links · desktop-only hover reveals · broken sticky rail trapping content

---

### 8. Motion Quality

| Check | Pass condition |
|-------|----------------|
| Character | Soft ease, short distance (≈12–36px), interruptible |
| Budget | Section stays within page motion priorities |
| Timing | Feels deliberate; not bounce/elastic |
| GSAP hygiene | `gsap.context` + cleanup; labeled timeline ids |
| ScrollTrigger | Once-play reveals unless spec says scrub; refresh-safe |
| Continuity | Entrance matches exit into next section |

**Fail examples:** Elastic CTAs · scrubbing everything · timeline leaks · competing animations in one viewport

---

### 9. Visual Consistency

| Check | Pass condition |
|-------|----------------|
| Spacing | Section padding/gaps from tokens |
| Radius / shadow | Brand ranges only; soft shadows |
| Hairlines | Consistent treatment light vs dark |
| Icons | Single rounded-line family |
| Alignment | Columns/baselines optically aligned with neighbors |
| Module language | Feels same system as previous passed sections |

**Fail examples:** Random radii · mixed icon styles · uneven gutters · off-grid “special” one-offs without spec approval

---

### 10. Code Quality

| Check | Pass condition |
|-------|----------------|
| Structure | Page → Section → Block → UI layering respected |
| Tokens | No magic color/spacing literals outside tokens |
| Content | Copy from content modules, not hardcoded sprawl (where applicable) |
| State | Local/accordion state clean; no global junk |
| Cleanup | Effects/GSAP/Three disposed |
| Naming | `mf` conventions; file names match exports |
| Reuse | Primitives reused; no copy-paste button styles |
| Lint | Clean for touched files |

**Fail examples:** Section owns router hacks · inline hex soup · memory leaks · 400-line unsplit component with mixed concerns

---

## Section review card (copy per section)

```md
### Section review: [SECTION_ID] — [Name]

Date:
Reviewer:

| Dimension | Result | Evidence / notes |
|-----------|--------|------------------|
| Brand Guidelines | PASS / FAIL | |
| Competitor Analysis | PASS / FAIL | |
| Creative Direction | PASS / FAIL | |
| Homepage Experience Spec | PASS / FAIL | |
| Performance | PASS / FAIL | |
| Accessibility | PASS / FAIL | |
| Responsiveness | PASS / FAIL | |
| Motion Quality | PASS / FAIL | |
| Visual Consistency | PASS / FAIL | |
| Code Quality | PASS / FAIL | |

Overall: PASS / FAIL

Failures to resolve before next section:
1.
2.

Signed off: [ ] Yes — proceed to next section
```

Store completed cards in `docs/reviews/` as:

`docs/reviews/home-01-hero.md`, `home-02-trust.md`, …

---

## Homepage build order + gate sequence

Build and review **strictly in order**:

| Step | Section ID | May start only after |
|------|------------|----------------------|
| 0 | Shell (`SiteHeader` / `SiteFooter` tokens) | Scaffold + tokens exist |
| 1 | `HomeHero` | Shell review PASS |
| 2 | `HomeTrust` | Hero PASS |
| 3 | `HomeReasons` | Trust PASS |
| 4 | `HomeServices` | Reasons PASS |
| 5 | `HomeWork` | Services PASS |
| 6 | `HomeIndustries` | Work PASS |
| 7 | `HomeProcess` | Industries PASS |
| 8 | `HomeOffers` | Process PASS |
| 9 | `HomeTechnology` | Offers PASS |
| 10 | `HomeTestimonials` | Technology PASS |
| 11 | `HomeStandards` | Testimonials PASS |
| 12 | `HomeFinalCta` | Standards PASS |
| 13 | Integration pass (full page) | Final CTA PASS |

**Parallel work allowed:** content writing / asset prep for later sections.  
**Parallel UI implementation of later sections:** not allowed until prior gate PASS.

---

## Integration pass (after all sections)

Re-check as one composition:

- [ ] Scroll story emotional arc intact (Creative Direction §30)  
- [ ] Header theme switching across bands  
- [ ] Only one Three canvas lifecycle  
- [ ] CTA frequency not fatiguing  
- [ ] Empty-state rules still hold with real data  
- [ ] Reduced motion full-page walkthrough  
- [ ] Lighthouse / Web Vitals spot check  
- [ ] Competitor non-resemblance final review  

---

## Craftsmanship oath

> We do not trade precision for velocity.  
> A faster wrong section creates expensive rework and a cheaper brand.  
> If it is not premium under this gate, it is not done.

---

## Current project phase

| Item | State |
|------|-------|
| Planning docs `00`–`08` | Complete |
| This gate `09` | Active rule |
| Architecture doc alignment update | Pending explicit go-ahead |
| React / Vite scaffold | **Not started — do not begin until ordered** |
| Section implementation | **Not started** |

When implementation begins, **Hero is first** and must pass this gate before Trust.

---

*End of Section Self-Review Gate.*
