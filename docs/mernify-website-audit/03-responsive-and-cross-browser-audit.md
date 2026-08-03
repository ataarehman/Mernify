# Phase 3: Responsive and Cross-Browser Audit

**Audit Date:** 2026-07-30  
**Method:** Source code analysis + existing screenshot evidence in `Mernify.mds/screenshots/` and `Mernify.mds/previews/`  
**Screenshots Available:** See `evidence/` directory and `Mernify.mds/screenshots/{desktop,tablet,mobile}/`

---

## 3.1 Viewport Testing Matrix

### Desktop

| Viewport | Overflow | Navigation | Hero | Services | Trust Strip | Status |
|----------|----------|-----------|------|----------|------------|--------|
| 1920 × 1080 | Not tested live | Desktop 5 links | Expected OK | Expected OK | Expected OK | ⚠️ Pending live test |
| 1440 × 900 | ✅ Pass | Desktop 5 links | ✅ Pass | ✅ Pass | ✅ Pass | ✅ |
| 1280 × 800 | ✅ Pass | Desktop 5 links | ✅ Pass | ✅ Pass | ✅ Pass | ✅ |
| 1366 × 768 | ✅ Expected | Desktop 5 links | Expected OK | ⚠️ Watch sticky stage | Expected OK | ⚠️ |

**Evidence:** `Mernify.mds/screenshots/desktop/`, `Mernify.mds/previews/audit-2026-07-24/`

### Tablet

| Viewport | Overflow | Navigation | Hero | Services | Status |
|----------|----------|-----------|------|----------|--------|
| 1024 × 768 | ✅ Pass | Desktop 5 links (≥1024) | ✅ Pass | ⚠️ Sticky stage height on short screens | ✅ |
| 768 × 1024 | ✅ Pass | Mobile hamburger + Escape | ✅ Pass | Collapses | ✅ |

**Evidence:** `Mernify.mds/screenshots/tablet/`

### Mobile

| Viewport | Overflow | Navigation | Hero | CTA Tap Targets | Status |
|----------|----------|-----------|------|----------------|--------|
| 430 × 932 | Not tested | Expected mobile | Expected OK | Expected OK | ⚠️ Pending |
| 390 × 844 | ✅ Pass | Mobile menu | ✅ Pass | ✅ Pass | ✅ |
| 375 × 812 | Not tested | Expected mobile | Expected OK | Expected OK | ⚠️ Pending |
| 360 × 800 | ✅ Pass | Mobile menu + Escape | ✅ Pass | ✅ Pass | ✅ |
| 320 × 568 | Not tested | Expected mobile | ⚠️ Risk | ⚠️ Risk | ⚠️ Pending |

**Evidence:** `Mernify.mds/screenshots/mobile/`

---

## 3.2 Key Responsive Issues

### Issue RS-001 (P2): Services Stage Height on Short Laptop Screens

**Viewport:** 1024×768, 1366×768  
**Component:** `HomeServices`  
**Description:** The services section uses a sticky-split layout with a media panel. On 768px-tall viewports, the panel height may be constrained, potentially clipping content. The `services` section likely uses `height: 100vh` or similar sticky positioning.  
**Impact:** Desktop users on 13" laptops may see truncated service descriptions.  
**Recommendation:** Test with explicit viewport height limit; add `min-height` guard or reduce sticky behavior on short screens.

### Issue RS-002 (P2): Hero H1 Word Break at Narrow Widths

**Viewport:** 375 × 812, 360 × 800  
**Component:** `HomeHero`  
**Description:** The H1 "We Design, Engineer & Scale Digital Products" uses CSS line break wrappers. At very narrow widths, word breaks may split awkwardly (e.g., "Digital" and "Products" on separate lines in unexpected places). Prior audit noted `textContent` of H1 appeared as "DigitalProducts" without space in the accessibility tree — this is a CSS visual line-break artifact that should be verified.  
**Impact:** Accessibility — screen reader may read words concatenated. SEO — H1 structure matters for crawlers.  
**Recommendation:** Use `<br aria-hidden="true">` or `&shy;` instead of raw CSS clipping for controlled breaks; ensure screen reader sees full spaced text.

### Issue RS-003 (P1): Custom Cursor on Touch Devices

**Viewport:** All mobile  
**Component:** `SoftCursor`  
**Description:** The `SoftCursor` component is mounted on all pages including touch devices. On mobile, this is completely invisible (touch devices don't have a cursor) but the component still adds global pointer event listeners and renders a DOM element.  
**Impact:** Unnecessary DOM overhead and event listeners on every mobile page load. Minor battery and performance drain.  
**Recommendation:** Disable `SoftCursor` on touch devices: `if (window.matchMedia('(pointer: coarse)').matches) return null`.

### Issue RS-004 (P2): Breakpoint Gap at 900–1023px

**Viewport:** 900px–1023px wide  
**Component:** `SiteHeader`  
**Description:** The header switches from desktop nav to mobile hamburger at 1024px. Devices in the 900–1023px range (some tablets, landscape iPad) show the hamburger menu. This is not inherently wrong, but the mobile panel layout needs verification at these intermediate sizes to ensure the panel doesn't overflow.  
**Impact:** Users on landscape 10" tablets see mobile nav — may feel unpolished.

### Issue RS-005 (P3): 320px Width Support

**Viewport:** 320 × 568 (older small phones)  
**Description:** No testing has been performed at 320px width. Hero text, CTAs, and navigation may not fit cleanly. While 320px devices are rare (<2% of mobile traffic), Google's mobile-friendly test still references them.  
**Recommendation:** Test and add a media query override if needed.

---

## 3.3 Cross-Browser Testing

| Browser | Version | Tested | Key Risks |
|---------|---------|--------|-----------|
| Google Chrome | Latest | Via screenshots (Chromium) | ✅ Primary development browser |
| Microsoft Edge | Latest (Chromium-based) | Not tested separately | Expected same as Chrome |
| Firefox | Latest | Not tested | GSAP + Lenis + Three.js — potential rendering differences |
| Safari (macOS) | Latest | Not tested | WebGL context, custom scrollbar, font rendering |
| Safari (iOS) | Latest | Not tested | iOS-specific `requestIdleCallback` polyfill needed |
| Samsung Internet | Latest | Not tested | Android-specific testing gap |

**Issue RS-006 (P1): `requestIdleCallback` on iOS Safari**  
iOS Safari does not support `requestIdleCallback`. The hero scene uses:
```js
if (typeof window.requestIdleCallback === 'function') {
  idleId = window.requestIdleCallback(enable, { timeout: 1200 })
} else {
  timeoutId = window.setTimeout(enable, 600)
}
```
The fallback `setTimeout` handles this correctly. However, the 600ms timeout means the Three.js hero scene loads 600ms after page load on iOS — verify this doesn't cause a visible "pop" in the hero.

**Issue RS-007 (P2): Firefox Scrollbar Styling**  
CSS Module scrollbar styles (`scrollbar-width`, `scrollbar-color`) may differ between Chrome and Firefox. Verify no visual inconsistency.

**Issue RS-008 (P2): Safari CSS `backdrop-filter`**  
The header uses `backdrop-filter: blur()` for its scrolled state. This is supported in Safari but requires the `-webkit-` prefix in some older versions. Verify the header blur effect works in Safari.

---

## 3.4 Zoom Testing

| Zoom Level | Status | Notes |
|-----------|--------|-------|
| 110% | Expected OK | Minor layout shift possible |
| 125% | ⚠️ Unknown | Not tested — GSAP animations may shift |
| 150% | ⚠️ Unknown | Not tested — hero text may overflow |
| 200% | ⚠️ Unknown | Not tested — likely layout issues |
| Browser text-only zoom | ⚠️ Unknown | Rem-based units should handle this |

**Issue RS-009 (P2):** Zoom testing at 125%, 150%, 200% has not been performed. Users with low vision commonly use browser zoom. This is an accessibility gap that could affect WCAG 2.2 AA compliance (SC 1.4.4).

---

## 3.5 Animation Performance

| Device Tier | Expected Performance | Notes |
|-------------|---------------------|-------|
| High-end desktop | Smooth (60fps) | Three.js + GSAP designed for this |
| Mid-range laptop | Likely acceptable | WebGL overhead noticeable |
| Budget Android | ⚠️ Risk | Three.js + GSAP may cause jank |
| Old iOS (A10 or older) | ⚠️ Risk | WebGL + ScrollTrigger can stutter |

The combination of Three.js (hero), GSAP + ScrollTrigger (hero + all sections), and Lenis (smooth scroll) creates a high animation overhead. The hero scene is deferred via `requestIdleCallback`, which is correct, but reduced-motion fallbacks should be tested extensively.

**Issue RS-010 (P1): Three.js "Hero Atmosphere" Not Approved**  
The code comment in `HomeHero.jsx` explicitly states:
```
* Status: NOT APPROVED. Kept only as a temporary homepage placeholder
* while subsequent sections are developed.
```
The Three.js scene is live in production on a hero that its own development team considers unapproved. This represents a design and business risk — the first impression of the website is based on an explicitly temporary placeholder implementation.

---

## 3.6 Responsive Evidence Available

The following screenshots from prior audit sessions exist and can be referenced as evidence:

```
Mernify.mds/screenshots/
  desktop/
    home-1440x1000.png         ← Desktop full viewport
    home-1440x1000-full.png    ← Desktop full page scroll
    home-1280x800.png
    route_home.png
    route_services.png
    route_about.png
    route_contact.png
    route_work.png
    route_process.png
    route_privacy.png
    route_terms.png
    route_services_*.png       (multiple service detail routes)
  tablet/
    home-1024x768.png
    home-768x1024.png
    home-768x1024-menu.png     ← Mobile menu open
    contact-1024x768.png
    contact-768x1024.png
  mobile/
    home-390x844.png
    home-390x844-menu.png      ← Mobile menu open
    home-390x844-full.png
    home-360x800.png
    contact-390x844.png
    contact-360x800.png
```

---

## 3.7 Recommended Additional Testing

| Test | Priority | Why |
|------|----------|-----|
| Live site at 1920×1080 | P1 | Verify no max-width issues on ultra-wide |
| Firefox browser test | P1 | GSAP + Lenis rendering differences |
| Safari iOS test (iPhone SE) | P1 | requestIdleCallback, WebGL, font rendering |
| Zoom at 150%, 200% | P2 | WCAG 1.4.4 compliance |
| Samsung Internet on Android | P2 | Regional market considerations |
| Slow 3G simulation | P1 | Image loading, bundle loading UX |
| Print stylesheet | P3 | Legal pages should be printable |
