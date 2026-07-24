# Foundation Preview Report

**Date:** 2026-07-24  
**URL:** http://localhost:5173/  
**Mode:** Development (`npm run dev`)  
**Scope:** Phase 1 foundation only — **Hero not built**  
**Evidence:** `docs/previews/foundation/` + `preview-data.json`

---

## Executive verdict

Foundation is **runnable and mostly correct**. Tokens, fonts, Lenis, routing, footer, and mobile menu behavior are confirmed.

One **visual defect** must be fixed before/with Hero work: on the dark Home foundation surface, the sticky header is transparent over the **Cloud White body**, so it reads as a light bar and can hide light-colored nav/menu controls (white-on-white). Contact (light page) shows the intended header correctly.

**Hero remains blocked pending your approval.**

---

## Screenshots

| File | Viewport | What it shows |
|------|----------|----------------|
| [01-desktop-home.png](./previews/foundation/01-desktop-home.png) | 1440×900 | Home foundation + footer |
| [02-desktop-contact.png](./previews/foundation/02-desktop-contact.png) | 1440×900 | Light placeholder route (header OK) |
| [03-tablet-home.png](./previews/foundation/03-tablet-home.png) | 768×1024 | Tablet home foundation |
| [04-mobile-menu-open.png](./previews/foundation/04-mobile-menu-open.png) | 390×844 | Mobile nav sheet open |
| [05-mobile-home.png](./previews/foundation/05-mobile-home.png) | 390×844 | Mobile home closed |
| [06-desktop-header-crop.png](./previews/foundation/06-desktop-header-crop.png) | crop | Header contrast issue evidence |
| [07-tablet-header-crop.png](./previews/foundation/07-tablet-header-crop.png) | crop | Tablet header crop |

---

## Checklist results

| Check | Result | Notes |
|-------|--------|-------|
| Dev server starts | PASS | Vite ready at `http://localhost:5173/` |
| Runtime / page errors | PASS | No `pageerror` events |
| Console errors | PASS | Empty |
| Console warnings | PASS | Empty |
| Header renders | PASS* | Structure OK; *Home dark contrast issue below |
| Desktop navigation | PASS* | Links present (`Services/Work/About/Contact`); can be hard to see on Home due to contrast |
| Routing | PASS | `/` → `/services` → `/work` → `/` verified |
| Mobile menu open/close | PASS | `mf-nav-open`, panel class, Escape/toggle OK |
| Space Grotesk on H1 | PASS | `"Space Grotesk", Arial, Helvetica, sans-serif` |
| Inter on body | PASS | `Inter, Arial, Helvetica, sans-serif` |
| Brand tokens | PASS | Indigo `#4f46e5`, Cyan `#06b6d4`, Navy `#0f172a`, Cloud `#f8fafc` |
| Lenis init | PASS | `html.lenis` present when reduced-motion off |
| GSAP provider | PASS | MotionProvider mounts; ScrollTrigger registered (no section timelines yet) |
| Three.js idle | PASS | **0 `<canvas>`** on Home — infrastructure only, no Hero scene |
| Footer | PASS | Promise, company/services columns, © 2026 |
| Responsive desktop | PASS | 1440 layout holds |
| Responsive tablet | PASS | 768 stacks; menu toggle exists (44×44) |
| Responsive mobile | PASS | 390 layout + menu sheet |

---

## What is currently visible

1. **Sticky site header** with LogoMark stand-in, primary CTA, desktop nav (≥1024px), mobile/tablet menu toggle (<1024px)  
2. **Home foundation placeholder** (dark band): Phase 1 label, heading, explanation, CTAs  
3. **Route placeholders** (light): Services, Work, About, Process, Contact, 404  
4. **Footer** on Midnight Navy with brand promise + link columns  
5. **Skip link** in DOM  
6. **Design tokens** driving colors/spacing/radius/type  
7. **Smooth scroll** via Lenis (class on `html`)

---

## What is intentionally a placeholder

| Item | Status |
|------|--------|
| Real HomeHero composition | Not built — awaiting approval |
| Three.js HeroAtmosphereScene | Not mounted |
| Homepage sections (Trust → Final CTA) | Not built |
| Final brand logo SVG exports | Inline LogoMark stand-in |
| Real case studies / logos / metrics | Not present (correct) |
| Contact form / full inner pages | Placeholder copy only |
| Privacy / Terms destinations | Text stubs in footer |

---

## Warnings / issues

### 1. Header contrast on dark Home foundation — **FIX BEFORE HERO**

**Problem:** `body` uses Cloud White. Dark Home section starts *below* the sticky header. Header in `dark` theme is transparent, so the browser shows white body through the header. Nav/menu icons use on-dark (light) color → poor/white-on-white contrast.

**Evidence:** `06-desktop-header-crop.png`, Contact page contrast is fine (`02-desktop-contact.png`).

**Recommended fix (when you approve foundation polish):**
- Extend inverse/navy under the header on dark pages (e.g. negative margin / full-bleed dark shell), **or**
- Give dark-theme header a navy translucent background even at scroll 0, **or**
- Set `html/body` background to navy when the active route/section is inverse.

### 2. LogoMark is a stand-in

Not the final Brand Board lockups. Acceptable for foundation; replace with approved SVG assets before launch polish.

### 3. Playwright dependency audit

Installing Playwright for this preview introduced an npm audit “high” advisory on a **devDependency**. Does not affect production bundle. Can revisit with `npm audit` later.

### 4. No other functional blockers found

Mobile menu, routing, tokens, fonts, Lenis, and zero Hero canvas all check out.

---

## Performance observations (headless Chromium)

From navigation timing on Home after warm load:

| Metric | Value | Comment |
|--------|-------|---------|
| DOMContentLoaded | ~91ms | Foundation shell is light |
| Load event | ~92ms | |
| First Contentful Paint | ~144ms | Healthy for local foundation |

**Caveats:** Headless local timings ≠ real-user Lighthouse on production network. Main JS still includes Lenis + GSAP providers (~380KB gzipped ~130KB in prod build previously). Three.js stays out of Home until Hero mounts (confirmed: 0 canvases).

**Motion:** No jank observed during automated nav/menu interactions. No section ScrollTrigger timelines yet (by design).

---

## Automated raw data

See [`previews/foundation/preview-data.json`](./previews/foundation/preview-data.json).

Reproduce:

```bash
npm run dev
node scripts/foundation-preview.mjs
```

---

## Recommendation

1. Review the screenshots above.  
2. Approve a small **foundation polish** to fix dark-header contrast (optional but recommended before Hero).  
3. Then approve **HomeHero** implementation.  

**I am stopped here. No Hero work has started.**
