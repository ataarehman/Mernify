# Wow Factor Implementation Plan
*Concept B: Digital Product Assembly Line · 2026-07-24*

---

## Architecture Overview

All 8 wow moments map to either new components or replacements of existing sections:

| # | Wow Moment | File(s) | Approach |
|---|---|---|---|
| 1 | Cinematic Hero | `HomeHero.jsx` + `HeroScene.jsx` | Three.js + GSAP assembly |
| 2 | Scroll Product Story | `HomeProductStory.jsx` (new) | GSAP ScrollTrigger pin |
| 3 | Cinematic Case Studies | `HomeWork.jsx` | Cinematic card stack |
| 4 | Industry System | `HomeIndustries.jsx` | Selectable environment |
| 5 | AI Workflow | `HomeAi.jsx` | Step-by-step animated demo |
| 6 | Architecture Layers | `HomeTechnology.jsx` | Interactive layer diagram |
| 7 | Human Partnership | `HomeHuman.jsx` (new) | Editorial typography |
| 8 | Transformation CTA | `HomeFinalCta.jsx` | Module assembly CTA |

**HomePage.jsx** is updated to include new sections in correct order.

---

## Token Extensions Needed

```css
/* Motion */
--mf-ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
--mf-dur-xl: 1200ms;
--mf-dur-cinematic: 1600ms;

/* Surfaces */
--mf-surface-1: rgba(15, 23, 42, 0.55);
--mf-surface-2: rgba(30, 41, 59, 0.65);
--mf-surface-glass: rgba(248, 250, 252, 0.04);
--mf-border-subtle: rgba(248, 250, 252, 0.06);

/* Grid overlay */
--mf-grid-line: rgba(248, 250, 252, 0.04);
--mf-gradient-radial-indigo: radial-gradient(ellipse 60% 50% at 70% 40%, rgba(79,70,229,0.25), transparent 65%);
--mf-gradient-radial-cyan: radial-gradient(ellipse 45% 40% at 20% 75%, rgba(6,182,212,0.15), transparent 60%);

/* Section transition */
--mf-section-overlap: -4rem;
```

---

## WOW 1 — Cinematic Hero

### Components
- `src/sections/home/HomeHero.jsx` — updated shell
- `src/components/media/HeroScene.jsx` — Three.js scene (lazy-loaded)
- `src/components/media/HeroSceneFallback.jsx` — CSS fallback

### Animation sequence
1. `t=0`: Three modules enter from off-screen (opacity 0 → 1, y: 40→0)
2. `t=0.4s`: Modules orbit toward center
3. `t=0.8s`: Modules snap into Mernify M-form geometry
4. `t=1.2s`: Copy reveals (headline mask, support fade-up)
5. `t=1.6s`: Four interface panels emerge from the assembled mark
6. `ongoing`: Subtle cursor-driven perspective (CSS `perspective` on wrapper, `rotateX/Y` ±8deg)
7. `scroll`: Panels dissolve into next section via ScrollTrigger

### Fallback
CSS static composition: three rectangles with gradient fills arranged in M-form. Full text visible. No animation.

### Performance
- Three.js scene: ~50KB, lazy-loaded via `React.lazy`
- WebGL capability check: falls back to CSS if `!renderer.capabilities.isWebGL2`
- Pause animation when tab hidden (`visibilitychange`)
- Reduced-motion: skip assembly, show final assembled state immediately

---

## WOW 2 — Scroll-Driven Product Story

### Component
- `src/sections/home/HomeProductStory.jsx` — new section
- `src/sections/home/HomeProductStory.module.css`

### Implementation
GSAP ScrollTrigger with `pin: true` on the visual canvas. Four stages advance as visitor scrolls. The scrub value ties visual progress to scroll position.

```
Stages:
  01 Define    → wireframe geometry + requirement labels
  02 Design    → interface components appear
  03 Engineer  → connections form between layers
  04 Scale     → multi-device composition + infrastructure
```

### Mobile
Pin removed. Stages become full-height sections. Each scrolls into view with a reveal animation. Progress indicator on the side.

### Performance
All visuals are CSS + SVG. No images. No WebGL.

---

## WOW 3 — Cinematic Case Studies

### Component
- `src/sections/home/HomeWork.jsx` — major refactor
- `src/sections/home/HomeWork.module.css`

### Implementation
Each case study occupies most of the viewport. Horizontal scroll on desktop (GSAP horizontal scroll panel). On hover: product screens separate into depth layers. Background accent shifts per project.

### Content policy
All case studies use `status: 'pending'` content. Honest placeholders visible until real case studies are ready. Section still visually complete without content.

---

## WOW 4 — Interactive Industry System

### Component
- `src/sections/home/HomeIndustries.jsx` — full rebuild

### Implementation
Two-column layout: left = industry selector (vertical list with index numbers), right = single product canvas that transforms per industry. Canvas shows operational environment with labeled zones.

Transitions: `opacity` + subtle `translateY` on canvas change. GSAP timeline.

### Content
Each industry has:
- Challenge description
- Solution description
- User types (array of 2-3 labels)
- Interface zones (array of labeled visual blocks)

---

## WOW 5 — Live AI Workflow

### Component
- `src/sections/home/HomeAi.jsx` — full rebuild

### Implementation
Workflow selector (6 scenario types). Selected scenario shows 7-step animated pipeline. Each step has:
- Step number + label
- Brief description
- Connection to next step (animated line)
- Human-approval indicator on step 5

Auto-plays through steps every 1.8s. Visitor can click any step to pause and focus.

---

## WOW 6 — Architecture Layers

### Component
- `src/sections/home/HomeTechnology.jsx` — full rebuild

### Implementation
Seven labeled architecture layers rendered as stacked horizontal bands. Hover (or tap on mobile) activates a layer:
- Layer expands
- Technology marks appear within the layer
- Business value description reveals on the right/below
- Connection lines to adjacent layers appear

---

## WOW 7 — Human Partnership

### Component
- `src/sections/home/HomeHuman.jsx` — new section (replaces HomeEngagement conceptually)

### Implementation
Light-background editorial section. Large typographic quote/statement. Six partnership principles in a clean two-column text layout. No cards.

---

## WOW 8 — Transformation CTA

### Component
- `src/sections/home/HomeFinalCta.jsx` — rebuilt

### Implementation
Modules from the hero visual (mirrored CSS composition) animate into assembled mark on scroll-into-view. Headline reveal. Two CTAs. Natural transition into footer.

---

## Dependencies (current stack is sufficient)

All required packages are already installed:
- Three.js `0.178` — hero scene
- GSAP `3.13` — all animation including ScrollTrigger (bundled in gsap)
- Lenis `1.3.8` — smooth scroll (already running)
- React `19` — lazy loading, concurrent rendering
- Vite `7` — code splitting

**No new npm packages required.**

---

## Static Fallbacks

| Section | Fallback |
|---|---|
| Hero | CSS M-form composition, full copy, CTAs |
| Product Story | Vertical four-panel layout, no pin |
| Industry | Full static content for default industry (Healthcare) |
| AI Workflow | All 7 steps visible simultaneously, no auto-play |
| Architecture | All layers visible and expanded, no hover interaction |
| Final CTA | Static module composition |

---

## Responsive Strategy

| Breakpoint | Hero | Product Story | Industry | AI | Architecture |
|---|---|---|---|---|---|
| 1440+ | Three.js + cursor depth | Pinned canvas | Two-column | Step pipeline | Stacked layers |
| 1024-1440 | Three.js (no cursor) | Pinned canvas | Two-column | Step pipeline | Stacked layers |
| 768-1024 | CSS assembly | Vertical narrative | Tab-style | Step pipeline | Accordion layers |
| <768 | CSS static | Vertical steps | Selector+content | Vertical steps | Tap accordion |

---

## Test Strategy

Post-implementation tests:
1. Lint + build pass
2. Viewport check at all 6 sizes
3. Reduced-motion: all animations skipped, content readable
4. Keyboard: all interactive elements reachable and operable
5. WebGL disabled: hero falls back to CSS
6. Console: zero errors, zero warnings
7. Horizontal overflow: none at any breakpoint
8. ScrollTrigger pin: no content jump on pin/unpin
9. CTA links: all functional
10. No fake metrics: verified programmatically
