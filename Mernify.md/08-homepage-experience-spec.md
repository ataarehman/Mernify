# 08 — Homepage Experience Spec

**Document type:** Master UX / experience specification for Home  
**Status:** Awaiting approval · **No code · No scaffold · No implementation**  
**Depends on:** Brand Guidelines · Brand Board · Competitor Analysis · `06-brand-source-of-truth.md` · `07-creative-direction-and-experience-blueprint.md`  

**Audience for this doc:** Frontend engineers, motion engineers, content authors  
**Success criterion:** A skilled engineer can build Home without inventing layout, interaction, motion, or transition decisions.

---

## 0. Page Contract

### Route
`/` — Home

### Page job
Convert a first-time visitor (startup founder, SMB operator, product owner) into either:
1. a contact conversation, or  
2. a deeper work/services exploration that still ends in contact.

### Primary conversion
**Discuss Your Project** → `/contact`

### Secondary conversion
**View Our Work** → `/work`

### Experience name
Modular Clarity (per Creative Direction)

### Tone band map (top → bottom)

| # | Section ID | Tone | Pin? |
|---|------------|------|------|
| H | `SiteHeader` | Adaptive | sticky |
| 01 | `HomeHero` | Dark atmosphere | no |
| 02 | `HomeTrust` | Light | no |
| 03 | `HomeReasons` | Light | no |
| 04 | `HomeServices` | Light | no |
| 05 | `HomeWork` | Dark / mixed | no |
| 06 | `HomeIndustries` | Light | no |
| 07 | `HomeProcess` | Dark | **optional single pin** |
| 08 | `HomeOffers` | Light | no |
| 09 | `HomeTechnology` | Light | no |
| 10 | `HomeTestimonials` | Light | no |
| 11 | `HomeStandards` | Light | no |
| 12 | `HomeFinalCta` | Dark | no |
| F | `SiteFooter` | Midnight Navy | — |

### Global layout constants
- Content max width: **1240px** (within brand 1200–1320)  
- Page gutters: `clamp(20px, 4vw, 80px)`  
- Section vertical padding:  
  - Mobile: `72px`  
  - Tablet: `96px`  
  - Desktop: `120px`–`160px` (hero excluded)  
- Hairline: `1px solid rgba(15,23,42,0.10)` light / `rgba(248,250,252,0.12)` dark  
- Focus ring: `0 0 0 3px rgba(79,70,229,0.35)`  
- Reduced motion: all timelines jump to end state; no pin; no Three idle; no marquee drift  

### Locked copy sources
Use Brand Guidelines + Brand Lock. Do not invent hype metrics. If real metrics are unavailable, **omit numeric claims** rather than fabricating.

---

## Global Systems (before sections)

### Header behavior

**Purpose:** Persistent orientation + conversion without competing with hero brand.

**Structure (desktop):**
- Left: Logo combination mark (symbol + wordmark). Tagline **not** in header.
- Center/Left-cluster: `Services` · `Work` · `About` · `Contact`
- Right: Primary button `Discuss Your Project`

**Visual states:**
1. **Hero overlay (y < 24px past hero top):** transparent background; Cloud White text/icons; logo reversed/white-safe; CTA = primary indigo (still visible on dark) or white-outline secondary style **only if contrast fails** — prefer solid indigo CTA always.
2. **Scrolled light sections:** Cloud White / Pure White bar; `backdrop-filter: blur(12px)` at 85–92% opacity; Slate Black links; indigo CTA; hairline bottom border.
3. **Scrolled dark sections (Work / Process / Final CTA):** Midnight Navy translucent bar; light text; same indigo CTA.

**Detection:** header observes section `data-header-theme="light|dark"` via IntersectionObserver (rootMargin biased to header height).

**Height:** 72px desktop / 64px mobile. Logo symbol min 28px; full logo min width respected (≥120px when space allows; symbol-only below 380px width).

### Sticky navigation rules
- `position: sticky; top: 0; z-index: 100`
- Hide-on-scroll-down: **disabled for v1** (predictability > novelty)
- Always visible; never covers focused form controls on Contact (N/A on Home except if chat later)
- Anchor offset for in-page links: header height + 12px
- Active link: indigo underline 2px, 60% width of label, centered under text; not a pill

### Mobile menu behavior
- Trigger: icon button top-right; `aria-expanded`; label “Open menu” / “Close menu”
- Panel: full-viewport sheet, Midnight Navy, z-index 200
- Open: panel `y: -12 → 0` + `autoAlpha 0→1` in 280ms (`mf-ease-out`); focus moves to Close
- Links: stacked, Space Grotesk Medium ~28–32px, generous tap rows (min 52px)
- Bottom pinned area: full-width primary CTA `Discuss Your Project`
- Secondary text link: `View Our Work`
- Body scroll lock via Lenis stop + `overflow: hidden` on `html`
- Escape closes; focus returns to trigger
- No submenu accordion for v1 (Services goes to `/services`)

### Loading experience

**Goal:** Brand certainty in <1s perceived; never a gimmick loader longer than content readiness.

1. **HTML shell:** Midnight Navy flash-prevention background on `html/body`
2. **Critical:** preload Space Grotesk Bold (or SemiBold) + Inter Regular; preload hero poster image
3. **First paint:** header structure + hero poster + headline text in DOM (SEO + a11y)
4. **App hydrate:** no blocking spinner covering whole page
5. **Optional brand veil (max 600ms):** only if assets not ready; centered symbol at 40px opacity pulse **once**; skip if `prefers-reduced-motion` or if already cached
6. **Three.js:** load after idle / `requestIdleCallback` / after first contentful paint; canvas fades in 400ms over poster
7. **Never:** percentage load theater, forced 2s branded intro, sound

### Scroll pacing across the page

| Zone | Approx. scroll distance (desktop) | Pace feel |
|------|-----------------------------------|-----------|
| Hero | 100vh | Settle, don’t rush leave |
| Trust → Reasons | short | Quick credibility |
| Services | medium | Readable rows |
| Work | medium-long | Linger on proof |
| Industries | short | Scan |
| Process | medium (or pinned chapter ~120–160vh if pin on) | Methodical |
| Offers | medium | Decision aids |
| Technology | short | Competence glance |
| Testimonials | medium | Human pace |
| Standards | short | Assurance |
| Final CTA | ~80–100vh feel | Pause / convert |

Lenis: duration ~1.1–1.2, easing smooth; not syrupy.  
ScrollTrigger default reveal: `start: "top 78%"`, once, staggered children 0.06–0.1s.

### Hero animation timeline (0–10 seconds)

Absolute timeline from first meaningful paint (or reduced-motion skip-to-end at t=0):

| Time | Event |
|------|--------|
| 0.00s | Poster visible; navy ground; header in hero state; DOM text present but may be visually pre-hidden for motion (`visibility` preserved for a11y — use `aria` friendly technique: animate opacity only after paint, ensure text remains in accessibility tree) |
| 0.00–0.20s | Atmosphere canvas mounts if ready; else poster holds |
| 0.15–0.55s | Brand mark + wordmark: `autoAlpha 0→1`, `y: 16→0` |
| 0.35–0.95s | Headline lines (2 lines max preferred): mask reveal or per-line fade-up `y: 28→0` |
| 0.70–1.15s | Supporting sentence fade-up `y: 16→0` |
| 0.95–1.35s | CTA group fade-up; primary then secondary (+0.08s) |
| 1.35–10s | Idle: Three drift / CSS gradient breath only; no further entrance motion |
| On scroll > 8% hero | Entrance timeline kill; leave elements at final state |

If user scrolls before 1.35s: `timeline.progress(1)` immediately.

### Image strategy
- Formats: AVIF/WebP with dimensions reserved
- Hero poster: ~1920×1080 logical, ≤250KB target, `fetchpriority="high"`
- Work images: per-case 1600w srcset; lazy below fold
- Trust logos: SVG preferred; grayscale → full on hover optional; never stretch
- No decorative stock in hero
- Always width/height or aspect-ratio boxes

### Video strategy
- **Home v1: no autoplay marketing video**
- If later used in Work: muted, no audio, user-initiated, poster required, pause offscreen
- Do not use video as hero LCP replacement for v1

### Icon strategy
- Rounded line icons, one family
- Stroke ~1.5–2px at 24px optical
- Color: Slate Gray rest; Indigo/Cyan on active/hover
- Services: one icon per service row
- Process: numbered index primary; icon secondary
- Standards: security/QA/delivery icons

### Illustration strategy
- Geometric modular language only
- Use when screenshots unavailable (Offers, Process accents)
- Max 1 illustration motif per section
- No isometric city clichés

### Empty states (Home-specific)
| Data missing | Behavior |
|--------------|----------|
| Client logos | Show **technology partner marks** instead; if none, hide entire Trust section |
| Metrics in Reasons | Use qualitative reason titles + proof sentences; **no fake numbers** |
| Case studies | Hide Work section or show 1 honest “Selected work coming soon” **only if** Contact CTA present — prefer shipping with at least 2 real cases before launch |
| Testimonials | Hide section if <2 real quotes |
| Industries | Show only authenticated industries; hide if <3 |

---

# Section Specifications

Each section follows the mandatory 18-point contract.

---

## Section 01 — `HomeHero`

### 1. Purpose
Establish brand identity, value proposition, and primary paths in one composition.

### 2. User psychology
Visitor asks: “Am I in the right place?” Needs instant category clarity without vendor anxiety.

### 3. Business objective
Maximize qualified clicks to Contact or Work; imprint “focused product partner.”

### 4. Layout
- Full viewport `min-height: 100svh`
- Content block left-anchored within container (desktop), vertically centered optical center (~48% from top, accounting for header)
- CTAs in horizontal group with 12–16px gap
- Atmosphere full-bleed behind content
- No trust logos inside hero

### 5. Grid
- 12-col; content spans cols 1–7 (desktop)
- Cols 8–12 reserved for atmosphere dominance / optional faint product glass silhouette (not a card)
- Mobile: content full width; atmosphere reduced opacity behind type

### 6. Content hierarchy
1. Brand lockup (symbol + wordmark) — hero-level  
2. H1: `Build Modern Digital Products That Scale`  
3. Support: Guidelines supporting copy  
4. Primary CTA: `Discuss Your Project`  
5. Secondary CTA: `View Our Work`  
Optional micro-line below CTAs (not required): primary tagline `Build Modern. Scale Confidently.` at label size — **only if it doesn’t crowd**; default **omit** to protect hero budget

### 7. Typography
- Brand wordmark: per logo file (don’t recreate in random font)
- H1: Space Grotesk Bold, `clamp(40px, 7vw, 72px)`, line-height 0.98–1.05, tracking -0.02em, Cloud White
- Support: Inter Regular, `clamp(16px, 1.4vw, 18px)`, line-height 1.6, max-width 34em, `rgba(248,250,252,0.78)`
- CTA labels: Inter Medium 15–16px

### 8. Visual composition
- Background: Midnight Navy → Slate Black vertical/atmospheric gradient
- Controlled indigo/cyan light (Three or CSS)
- Typography left; visual mass right/center-back
- No floating badges, chips, stats, or stickers

### 9. Animation sequence
Brand → H1 lines → support → CTAs → idle atmosphere (see 0–10s timeline)

### 10. GSAP timeline
Timeline id: `mf:home:hero`  
```
0.0  brand  {autoAlpha:0,y:16} → {autoAlpha:1,y:0, duration:0.5, ease:mf-out}
0.2  h1 lines stagger 0.12 {y:28, autoAlpha:0} → {y:0,autoAlpha:1, duration:0.65}
0.55 support {y:16,autoAlpha:0} → {y:0,autoAlpha:1, duration:0.45}
0.75 ctas stagger 0.08 same pattern duration 0.4
```
ScrollTrigger: none for entrance; scrub optional later for atmosphere only.

### 11. Three.js interaction
- Scene: `HeroAtmosphereScene`
- Idle drift of modular planes; scroll progress 0–1 maps camera Z or light intensity subtly (max 8% movement)
- Pointer parallax: optional desktop only, max 4px equivalent on uniforms; disabled mobile
- `aria-hidden="true"` on canvas
- Fail → poster only

### 12. Scroll trigger behavior
- When hero exits (~`bottom top`): header switches toward next section theme
- Atmosphere pause when <10% visible

### 13. Mobile behavior
- Stack CTAs full width (primary on top) or 50/50 if space ≥360px and tap targets ok
- Reduce Three: prefer CSS atmosphere if FPS <45 or save-data
- H1 max 2–3 lines; avoid truncation

### 14. Accessibility
- One H1
- Text not only in canvas
- Contrast AA for support text on navy
- CTAs focusable; visible focus rings (light ring on dark)
- Reduced motion: final state instantly

### 15. Performance
- Poster LCP
- Defer Three
- Cap DPR ≤1.75
- Preload fonts

### 16. CTA behavior
- Primary → `/contact`
- Secondary → `/work`
- Hover: primary darken; secondary border brighten to cyan-tint white
- No magnetic pull in v1

### 17. Expected user emotion
Calm confidence; “serious modern partner.”

### 18. Exit transition into next section
Hero bottom fades into Cloud White Trust via 48–64px overlapping soft edge (CSS gradient mask or simply hard section change with Trust top padding). Content of Trust fades up as hero atmosphere pauses. No wipe.

---

## Section 02 — `HomeTrust`

### 1. Purpose
Provide quiet social/technical credibility immediately after identity.

### 2. User psychology
Relieve risk: “Have credible parties associated with them?”

### 3. Business objective
Reduce bounce; prime openness to Reasons/Services.

### 4. Layout
- Single horizontal band
- Eyebrow label left or centered small: `Trusted by teams building products` **or** `Technology partners` (choose based on asset type)
- Logo row / marquee below

### 5. Grid
- Full container width; logos in equal flex/grid with max logo height 28–32px
- Mobile: 2–3 per row wrap **or** slow marquee

### 6. Content hierarchy
1. Eyebrow (Inter Medium label, Slate Gray, 12–14px, tracking 0.06em)
2. Logos

### 7. Typography
Eyebrow only; no H2 required. If H2 used for a11y: visually hidden `Partners` / `Trust`.

### 8. Visual composition
- Cloud White background
- Logos grayscale at 70% opacity; hover to full color (desktop)
- Ample padding; no card chrome

### 9. Animation sequence
Eyebrow fade; logos stagger fade (or marquee start)

### 10. GSAP timeline
`mf:home:trust` — ScrollTrigger once `top 85%`; children stagger 0.05; duration 0.4

### 11. Three.js
None

### 12. Scroll trigger
Once play; marquee paused when section offscreen

### 13. Mobile
Prefer static wrap if ≤6 logos; marquee if more. Pause marquee on reduced motion (show static row).

### 14. Accessibility
- Marquee: `aria-label`; pause button if continuous motion OR use static grid (preferred for a11y)
- **v1 recommendation: static responsive logo grid** (no marquee) unless logo count >8

### 15. Performance
SVG sprites; no giant PNGs

### 16. CTA behavior
None (avoid competing)

### 17. Expected user emotion
Quiet reassurance

### 18. Exit transition
Hairline + spacing into Reasons; Reasons title fades up.

---

## Section 03 — `HomeReasons`

### 1. Purpose
Differentiate Mernify with three clear, measurable *or* qualitative reasons.

### 2. User psychology
“Why them vs freelancers or big agencies?” Needs contrast without arrogance.

### 3. Business objective
Install positioning wedge: focused, responsive, product-minded.

### 4. Layout
- Section H2 + short support
- Three columns desktop; stacked mobile
- Each reason: index `01–03`, title, body (2–3 lines)
- Not cards with heavy shadows — use top hairline or simple column separation

### 5. Grid
- 12-col; H2 spans 1–8
- Reasons: 4/4/4 with gutter
- Mobile: 12/12/12 stack gap 32px

### 6. Content hierarchy
1. Eyebrow: `Why Mernify`
2. H2: e.g. `The focused product partner between freelancers and large agencies`
3. Support sentence
4. Three reasons (titles outcome-led)

**Reason content direction (finalize with real proof):**
1. Founder-level attention / faster access to seniors  
2. Clear product process from discovery to launch  
3. Flexible engagement without enterprise bloat  

If metrics exist later, attach as mono numerals above titles.

### 7. Typography
- H2: Space Grotesk SemiBold `clamp(28px, 3.2vw, 40px)`, Slate Black
- Reason title: Inter SemiBold 18–22px
- Body: Inter Regular 15–16px, Slate Gray
- Index: JetBrains Mono or Inter Medium 13px Cyan/Indigo

### 8. Visual composition
Light ground; generous gaps; optional tiny cyan underline under index

### 9. Animation sequence
Header block fade-up; reasons stagger left-to-right

### 10. GSAP
`mf:home:reasons` — trigger `top 78%`; stagger 0.1; y:24

### 11. Three.js
None

### 12. Scroll trigger
Once; no scrub

### 13. Mobile
Stack; indices remain; no horizontal scroll

### 14. Accessibility
H2 visible; reasons as list (`ul`/`li`) or articles with headings `h3`

### 15. Performance
No images required

### 16. CTA behavior
Optional text link under grid: `See how we engage →` to Offers anchor `#offers` — low emphasis

### 17. Expected user emotion
“They get my situation.”

### 18. Exit transition
Soft into Services; Services eyebrow fades as Reasons finish.

---

## Section 04 — `HomeServices`

### 1. Purpose
Present five purchasable capabilities without tech-stack dumping.

### 2. User psychology
Map needs to offerings; seek recognition (“SaaS”, “Mobile”, “MVP”).

### 3. Business objective
Route users into correct service narratives; increase Contact intent.

### 4. Layout
**Primary pattern: Expandable editorial rows** (not 3-column cards).

For each service:
- Left: index + title + one-line summary
- Right: text button `Explore` / chevron
- Expanded: 3–5 capability bullets + link `View service` → `/services/:slug`
- Only one expanded at a time (accordion)

Above list: H2 + support + text link `View all services`

### 5. Grid
- Header 1–8
- Rows full 12 cols
- Expanded content inset to cols 2–10 desktop

### 6. Content hierarchy
1. Eyebrow `Capabilities`
2. H2 `What we build`
3. Support: business-first sentence
4. Five rows:
   1. Web & SaaS Product Development  
   2. Mobile Application Development  
   3. AI & Business Automation  
   4. Product Design & Strategy  
   5. Modernization & Support  

### 7. Typography
- H2 Space Grotesk as section standard
- Row title Inter SemiBold 18–20px (md+) / 17px mobile
- Summary Slate Gray 14–16px
- Bullets Inter 15px

### 8. Visual composition
- Cloud White
- Row separators hairline
- Expanded panel Pure White or subtle `rgba(79,70,229,0.04)` wash
- Icon 24px left of title optional
- No gradient borders

### 9. Animation sequence
Section header reveal; rows stagger in collapsed state; expand animates height + fade

### 10. GSAP
- Enter: `mf:home:services`
- Expand: tween height from current to auto (or CSS grid `0fr/1fr` preferred for a11y); 0.35s ease
- Icon chevron rotate 180°

### 11. Three.js
None

### 12. Scroll trigger
Once on enter; accordion independent

### 13. Mobile
Full-width rows; larger tap hit area on entire row header (`button` semantics)

### 14. Accessibility
- Accordion buttons `aria-expanded`, `aria-controls`
- Focus managed; Escape collapses optional
- Keyboard operable

### 15. Performance
No images; CSS height anim preferred over GSAP measuring thrash

### 16. CTA behavior
- Row CTA → service detail
- Section text link → `/services`
- Do not place primary indigo button here (avoid CTA fatigue)

### 17. Expected user emotion
Clarity: “They build what I need.”

### 18. Exit transition
Last row hairline dissolves into dark Work band with 1 section-gap; Work title fades on dark.

---

## Section 05 — `HomeWork` (Featured Work)

### 1. Purpose
Prove craft and commercial outcomes.

### 2. User psychology
Skepticism peaks; needs evidence before process/sales.

### 3. Business objective
Drive `/work` exploration; build authority; support close rates.

### 4. Layout
- Dark band
- Header: H2 + support + secondary ghost CTA `View all work`
- **2 featured cases** desktop as editorial stacked modules (not card grid):
  - Module: media left (or full-bleed top on mobile) + content right
  - Content: industry eyebrow, **outcome title**, 2-line problem/result, meta stack (services tags as quiet text, not pills overload — max 3 tags), link `Read case study`
- Optional third case on xl only; else stay at 2 on Home

### 5. Grid
- Header 1–8; CTA 9–12 right aligned
- Case module: media 7 / content 5 (alternate zig-zag optional: second case mirrored)

### 6. Content hierarchy
Per case:
1. Industry  
2. Outcome title (mandatory style: result-led)  
3. One sentence context  
4. Result callout (metric if real)  
5. Link  

### 7. Typography
- H2 Cloud White Space Grotesk
- Case title Space Grotesk Medium/SemiBold 24–32px
- Body Inter 15–16px at 0.78 white
- Result callout Mono/Inter SemiBold Cyan

### 8. Visual composition
- Midnight Navy background
- Media in MediaFrame radius 16–20; subtle border white/10
- Hover: image scale 1.03 inside frame; title underline indigo/cyan

### 9. Animation sequence
Header in; cases stagger; media clip-reveal optional (`clip-path inset`)

### 10. GSAP
`mf:home:work` — once; scrub **not** required; image reveal duration 0.7

### 11. Three.js
None on v1 (optional future micro scene rejected for perf)

### 12. Scroll trigger
Pause any video when leaving; once entrance

### 13. Mobile
Stack media above content; maintain outcome title prominence; CTA full-width text link

### 14. Accessibility
- Links descriptive (`Read case study: {title}`)
- Alt text describes UI meaningfully
- Contrast on dark AA

### 15. Performance
Lazy images; explicit aspect 16/10; no carousel autoplay

### 16. CTA behavior
- Ghost button `View all work` → `/work`
- Case link → `/work/:slug`
- Hover states per Creative Direction

### 17. Expected user emotion
“They can prove it.”

### 18. Exit transition
Dark → light Industries via hard band change; Industries fades up on Cloud White.

---

## Section 06 — `HomeIndustries`

### 1. Purpose
Signal relevant domain understanding without fake breadth.

### 2. User psychology
“Do they understand businesses like mine?”

### 3. Business objective
Qualify relevance; support SEO topical coverage lightly.

### 4. Layout
- H2 + support
- **Horizontal rail of 3–4 industry items** as simple cells: icon + name + one-line use case
- Not a 9-industry logo wall

### 5. Grid
- 12-col; items 3/3/3/3 or 4/4/4 if three
- Mobile: 2×2 grid

### 6. Content hierarchy
Eyebrow `Industries` → H2 → items (name, line)

Only include authentic industries. Placeholder direction examples (replace with real): SaaS / Ecommerce / Operations & Field Services / Professional Services.

### 7. Typography
Name Inter SemiBold 16–18; line Slate Gray 14–15

### 8. Visual composition
Light; icon above text; hairline cell separators optional; no big cards

### 9. Animation
Stagger cells

### 10. GSAP
`mf:home:industries` once

### 11. Three.js
None

### 12. Scroll trigger
Once

### 13. Mobile
2-col grid; icons 20–24px

### 14. Accessibility
List semantics; text not icon-only

### 15. Performance
SVG icons only

### 16. CTA
None required; optional `Discuss your industry →` text link to Contact

### 17. Emotion
Relevance without hype

### 18. Exit transition
Into Process dark band; slight increase in vertical padding to signal “method chapter.”

---

## Section 07 — `HomeProcess`

### 1. Purpose
Reduce delivery fear by showing structured method.

### 2. User psychology
Anxiety about chaos, ghosting, unclear milestones.

### 3. Business objective
Increase trust; support premium pricing narrative; feed Contact confidence.

### 4. Layout
**Two modes (choose one at implementation kickoff; default = A):**

**Mode A — Vertical modular steps (recommended default)**  
- Dark band  
- H2 + support  
- 7 steps in vertical list: number, title, description  
- Desktop: sticky left title rail (`Our process`) while steps scroll  

**Mode B — Pinned horizontal chapter (optional)**  
- Pin section; scrub steps 1→7  
- Only if performance & a11y pass; disable on mobile / reduced motion → fall back to Mode A  

**v1 lock: Mode A** unless motion engineer explicitly enables Mode B later.

### 5. Grid
- Left rail cols 1–4 sticky title  
- Steps cols 5–12  
- Mobile: no sticky; stacked

### 6. Content hierarchy
Steps (Guidelines naming):
1. Discover  
2. Plan  
3. Design  
4. Develop  
5. Test  
6. Launch  
7. Improve  

Each: title + 1 sentence from Brand Guidelines process messaging.

### 7. Typography
- Numbers: Mono 13px Cyan  
- Titles: Space Grotesk SemiBold 22–28px Cloud White  
- Body: Inter 15–16px white/75%

### 8. Visual composition
- Midnight Navy
- Step separators hairline white/10
- Active step (while in view): indigo left bar 2px
- Minimal icons optional

### 9. Animation
Steps fade-up on enter; active bar via ScrollTrigger toggle class per step

### 10. GSAP
`mf:home:process` — per-step triggers `start:top 60%` toggleClass `is-active`  
No pin in Mode A

### 11. Three.js
None

### 12. Scroll trigger
Toggle active states; once for initial entrance

### 13. Mobile
Stacked timeline with numbers in a vertical line guide (2px cyan/indigo gradient spine)

### 14. Accessibility
Ordered list; sticky rail not keyboard trapping; Mode B never without reduced-motion fallback

### 15. Performance
No heavy scrub; Mode A cheaper

### 16. CTA
Text link: `See engagement models ↓` to `#offers` OR secondary ghost `Discuss Your Project`

### 17. Emotion
“There’s a method. I’ll be safe.”

### 18. Exit transition
Dark Process → light Offers; Offers should feel like “doors” after “path.”

---

## Section 08 — `HomeOffers` (Productized Engagement Models)

### 1. Purpose
Give concrete entry points matching buyer readiness.

### 2. User psychology
“How do I start without a huge commitment?” Needs shaped packages.

### 3. Business objective
Increase inbound quality; shorten sales explanation; segment leads.

### 4. Layout
- Anchor id=`offers`
- H2 + support
- **4 interactive modules** in 2×2 desktop grid (these **may** be cards because they are selectable/interactive)
- Each module: name, for-whom line, includes (3 bullets), CTA `Start with this`

Offers:
1. Product Discovery Sprint  
2. MVP Launch Program  
3. Dedicated Product Pod  
4. Product Rescue & Modernization  

### 5. Grid
- 6/6 / 6/6  
- Mobile: stack

### 6. Content hierarchy
Title → audience line → bullets → CTA

### 7. Typography
Title Inter SemiBold 18–20; bullets 14–15 Slate Gray; CTA Inter Medium

### 8. Visual composition
- Cloud White section
- Module: Pure White surface, radius 16, border hairline, shadow-xs only
- Hover: border indigo 40% + lift 2px
- Top accent hairline gradient indigo→cyan (2px) on hover/focus only

### 9. Animation
Header; modules stagger

### 10. GSAP
`mf:home:offers` once; hover CSS-first

### 11. Three.js
None

### 12. Scroll trigger
Once

### 13. Mobile
Stack; CTA full width inside module

### 14. Accessibility
Each module is a link or contains one primary link; don’t nest interactive elements invalidly  
Prefer: whole card `a` **or** div with single button linking to `/contact?offer=slug`

### 15. Performance
No images necessary; optional small illustration mark

### 16. CTA behavior
All primary-style **small** buttons → Contact with offer prefill query  
Section does not need a fifth global CTA

### 17. Emotion
“There’s a doorway that fits me.”

### 18. Exit transition
Into Technology — quieter competence strip; reduce visual weight.

---

## Section 09 — `HomeTechnology`

### 1. Purpose
Show modern engineering competence without making stack the brand.

### 2. User psychology
Technical buyers validate legitimacy; non-technical skim.

### 3. Business objective
Support trust with agencies/enterprises; SEO for stack terms (secondary).

### 4. Layout
- Compact section
- H2 `Technology expertise` + support: stack serves product outcomes
- Grouped chips/lists by category — **not** giant icon seas
- Categories: Web platforms · Mobile · Backend & APIs · Data · Cloud & DevOps · AI tooling
- Include MERN/MEAN **inside** groups, not as section title

### 5. Grid
- Header 1–6
- Groups in responsive grid 2–3 columns

### 6. Content hierarchy
Eyebrow → H2 → groups (label + item list)

### 7. Typography
Group label Inter Medium 12–13 uppercase tracking; items Inter 14–15

### 8. Visual composition
Light; items as quiet text with middot separators or simple wrap list; avoid rainbow tech badges

### 9. Animation
Soft fade only; low priority

### 10. GSAP
`mf:home:tech` short once

### 11. Three.js
None

### 12. Scroll trigger
Once; can be skipped if reduced motion / perf mode

### 13. Mobile
Stack groups

### 14. Accessibility
Lists per group; don’t rely on color

### 15. Performance
If using logos, SVG mono; prefer text for v1

### 16. CTA
None

### 17. Emotion
Competent, discerning

### 18. Exit transition
Into Testimonials — warmer human tone; more whitespace.

---

## Section 10 — `HomeTestimonials`

### 1. Purpose
Add human trust and relational proof.

### 2. User psychology
Seek lived experience; fear of being neglected.

### 3. Business objective
Increase conversion confidence pre-standards/CTA.

### 4. Layout
- H2 + support
- **2–3 quotes** desktop as editorial blocks (not slider required)
- Each: quote text, name, role, company, optional industry
- v1: static; no auto-rotating carousel
- If only 1 quote available: hide section or wait for ≥2

### 5. Grid
- 6/6 or single featured 8-col centered + secondary

### 6. Content hierarchy
Quote → name → role/company

### 7. Typography
Quote: Inter Medium/Regular 18–22px Slate Black, max 40em  
Name: Inter SemiBold 14–15  
Role: Slate Gray 13–14

### 8. Visual composition
Light; large cyan/indigo quotation mark glyph at low opacity optional; hairline top

### 9. Animation
Stagger fade-up

### 10. GSAP
`mf:home:testimonials` once

### 11. Three.js
None

### 12. Scroll trigger
Once

### 13. Mobile
Stack; keep quote readable (don’t shrink below 16px)

### 14. Accessibility
`blockquote` + `cite`; no marquee quotes

### 15. Performance
Avatar optional 48px; lazy

### 16. CTA
None in-card

### 17. Emotion
“People like me were treated well.”

### 18. Exit transition
Into Standards — more formal, checklist energy.

---

## Section 11 — `HomeStandards`

### 1. Purpose
Communicate security, QA, and delivery discipline.

### 2. User psychology
Enterprise/SMB risk officers need assurance; founders want professionalism signals.

### 3. Business objective
Support premium positioning; reduce late-stage objections.

### 4. Layout
- H2 `Delivery standards`
- Three columns: Security · Quality Assurance · Delivery & Communication
- Each: icon, title, 3 bullets (concrete practices — no ISO claims unless true)

### 5. Grid
4/4/4; mobile stack

### 6. Content hierarchy
Header → three pillars → optional text link to About/Process

### 7. Typography
Titles Inter SemiBold 16–18; bullets 14–15 Slate Gray

### 8. Visual composition
Light; optional Pure White inset panels with hairline; no certificates montage unless real

### 9. Animation
Stagger

### 10. GSAP
`mf:home:standards` once

### 11. Three.js
None

### 12. Scroll trigger
Once

### 13. Mobile
Stack with icons inline

### 14. Accessibility
Lists; truthful claims only

### 15. Performance
SVG icons

### 16. CTA
Text link `Discuss Your Project` low emphasis

### 17. Emotion
“They won’t be sloppy.”

### 18. Exit transition
Into Final CTA dark conversion field — intentional tone drop into commitment.

---

## Section 12 — `HomeFinalCta`

### 1. Purpose
Convert accumulated trust into a conversation.

### 2. User psychology
Decision moment; wants low-friction next step and reassurance of response.

### 3. Business objective
Maximize Contact starts; reinforce partnership framing.

### 4. Layout
- Near full-viewport feel (`min-height: 70–80svh`)
- Centered or left-centered content
- H2 invitation
- Support: response expectation (only if operationally true, e.g. “We’ll respond within 1 business day”)
- Primary CTA button large
- Secondary text link `View our work`
- Optional: three micro reassurances in a row (transparent pricing conversation, senior review, clear next steps) — text only, not badge stickers

### 5. Grid
Content cols 2–10 centered; or 1–7 left

### 6. Content hierarchy
1. Eyebrow `Next step`  
2. H2 e.g. `Let’s build what’s next` / `Ready to discuss your product?`  
3. Support  
4. Primary CTA  
5. Secondary link  

### 7. Typography
H2 Space Grotesk Bold `clamp(32px, 5vw, 56px)` Cloud White  
Support Inter 16–18 white/75%

### 8. Visual composition
- Midnight Navy + dark gradient
- Soft indigo/cyan atmospheric glow behind CTA (CSS) — controlled
- No form embedded on Home final CTA for v1 (form lives on Contact) — keeps decision clean
- Optional tiny Three idle **off** by default to save GPU (CSS only)

### 9. Animation
Content fade-up; glow breath optional 6s loop opacity 0.6–1 on background light only

### 10. GSAP
`mf:home:final-cta` once on enter; no scrub

### 11. Three.js
None for v1 (CSS atmosphere). Hero canvas must be disposed/paused long before this.

### 12. Scroll trigger
Once; pause loops offscreen

### 13. Mobile
Full-width primary CTA; generous padding; avoid tiny secondary links

### 14. Accessibility
Contrast; focus; don’t auto-redirect; H2 present

### 15. Performance
No canvas; light CSS only

### 16. CTA behavior
Primary → `/contact`  
If offer previously selected in session, preserve query params  
Hover: indigo brighten; micro press on active

### 17. Emotion
Inevitable, calm commitment — partnership not gig

### 18. Exit transition
Into Footer: Final CTA bottom merges into footer navy (same family); footer feels like continuation, not a new brand.

---

## Footer — `SiteFooter`

### Purpose
Utility, credibility, secondary navigation, legal.

### Composition
- Background: Midnight Navy (continuous from Final CTA or separated by hairline white/10)
- Top: wordmark + short brand promise line (`Modern technology. Reliable execution. Measurable business value.`)
- Columns:  
  - Company: About, Process, Careers (if live), Contact  
  - Services: five service links  
  - Social: icons if real profiles exist  
- Bottom bar: © year Mernify · Privacy · Terms  
- No newsletter unless operational  

### Behavior
- No heavy animation
- Links with clear hover
- Mobile: stacked columns

### Accessibility
Nav landmarks; contrast AA

---

# Detailed Subsection Playbooks

## Trust section design (summary lock)
Static logo grid · light · quiet eyebrow · no marquee v1 · hide if empty · grayscale default.

## Services section design (summary lock)
Accordion rows · one open · business titles · link out to detail · no card farm.

## Featured work section (summary lock)
Dark · 2 outcome-led cases · editorial split · ghost all-work CTA · lazy media.

## Process visualization (summary lock)
Mode A vertical steps on dark · sticky rail desktop · active indigo bar · 7 Guidelines steps.

## Technology ecosystem visualization (summary lock)
Grouped text lists · MERN/MEAN nested · compact · no icon carnival.

## Testimonials layout (summary lock)
2–3 static blockquotes · no auto slider · hide if insufficient data.

## Final CTA experience (summary lock)
Dark spacious · one primary action to Contact · CSS glow only · partnership copy.

## Footer composition (summary lock)
Navy utility · promise line · service links · legal · no clutter.

---

# GSAP Master Schedule (Home)

| Order | Timeline ID | Trigger | Notes |
|------:|-------------|---------|-------|
| 1 | `mf:home:hero` | load | Kill on early scroll |
| 2 | `mf:home:trust` | enter | |
| 3 | `mf:home:reasons` | enter | |
| 4 | `mf:home:services` | enter | + accordion tweens |
| 5 | `mf:home:work` | enter | |
| 6 | `mf:home:industries` | enter | |
| 7 | `mf:home:process` | enter + per-step | Mode A |
| 8 | `mf:home:offers` | enter | |
| 9 | `mf:home:tech` | enter | lowest emphasis |
| 10 | `mf:home:testimonials` | enter | |
| 11 | `mf:home:standards` | enter | |
| 12 | `mf:home:final-cta` | enter | |

Defaults: `once: true`, `start: "top 78%"`, ease brand out, y 20–28px, duration 0.45–0.7s  
`gsap.matchMedia` shrinks stagger/distance on mobile; disables pin if any  
`prefers-reduced-motion`: register zero-duration set  

---

# Three.js Home Policy

| Location | Policy |
|----------|--------|
| Hero | Yes — atmosphere |
| All other sections | No |
| Final CTA | No canvas |
| Route leave | Dispose hero scene |

---

# Homepage Production Checklist

## Content readiness
- [ ] Hero copy locked (Guidelines)
- [ ] CTAs locked
- [ ] Trust assets real (clients or tech partners) or section hidden
- [ ] Three reasons finalized without fake metrics
- [ ] Five services summaries + bullets approved
- [ ] ≥2 case studies with outcome titles + media
- [ ] 3–4 authentic industries only
- [ ] Process sentences approved
- [ ] Four offers copy approved
- [ ] Technology groups approved (MERN/MEAN nested)
- [ ] ≥2 testimonials or section hidden
- [ ] Standards bullets truthful
- [ ] Final CTA response-time claim verified or removed
- [ ] Footer links accurate

## Design / brand
- [ ] Tokens match Brand Lock (indigo/cyan/navy/white)
- [ ] Space Grotesk + Inter loaded correctly
- [ ] Logo clear space & reversed versions correct on dark
- [ ] Hero composition budget enforced (no badges/stats)
- [ ] Cards only on Offers (and interactive cases if needed)
- [ ] Gradients sparse and on-brand
- [ ] Light/dark band map followed

## Motion
- [ ] Hero 0–10s timeline implemented & interruptible
- [ ] Single GSAP context cleanup per section
- [ ] Reduced motion path verified
- [ ] No dual pins
- [ ] Lenis + ScrollTrigger synced
- [ ] Marquee avoided (or pause control if added later)

## Three.js
- [ ] Poster LCP present
- [ ] Deferred load
- [ ] Pause offscreen / dispose on leave
- [ ] DPR capped
- [ ] Fallback atmosphere CSS

## Accessibility
- [ ] Landmark structure `header`/`main`/`footer`
- [ ] One H1; logical H2s
- [ ] Focus visible all CTAs/accordion
- [ ] Accordion ARIA correct
- [ ] Contrast AA light & dark
- [ ] Keyboard mobile menu
- [ ] Skip link works with sticky header offset

## Performance
- [ ] LCP ≤2.5s target on broadband reference
- [ ] CLS ≤0.1 (reserved media boxes)
- [ ] Home JS split; Three async
- [ ] Images compressed with dimensions
- [ ] No unexpected third-party scripts

## QA scenarios
- [ ] Desktop 1440 / 1280
- [ ] Tablet 768
- [ ] Mobile 390 / 360
- [ ] Slow 3G smoke (hero usable)
- [ ] Reduced motion OS setting
- [ ] Keyboard-only pass
- [ ] No horizontal scroll
- [ ] Header theme switching across bands
- [ ] All CTAs hit correct routes/query params

## Launch gate
- [ ] Empty-state rules applied (no fake proof)
- [ ] Competitor non-resemblance review passed
- [ ] Creative Direction QA checklist passed
- [ ] Stakeholder copy sign-off
- [ ] Analytics hooks planned (post-scaffold) without blocking UX

---

## Engineer Build Order (when implementation eventually starts)

1. Tokens + shell (header/footer)  
2. Hero + poster + deferred Three  
3. Trust → Reasons → Services  
4. Work → Industries → Process  
5. Offers → Technology → Testimonials → Standards  
6. Final CTA  
7. Motion pass + reduced motion  
8. A11y pass + performance pass  

---

## Approval Gate

Approve this Homepage Experience Spec before:
1. Updating architecture docs (`01–05`) to match creative + home specs  
2. Scaffolding React/Vite  

**No React code. No Vite scaffold. No implementation in this phase.**

---

*End of Homepage Experience Spec.*
