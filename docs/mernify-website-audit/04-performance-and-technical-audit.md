# Phase 4: Performance and Technical Quality Audit

**Audit Date:** 2026-07-30  
**Method:** Source code analysis, bundle analysis, codebase inspection  
**Note:** Live Lighthouse scores require browser-based testing. Estimated ranges based on known factors.

---

## 4.1 Performance Risk Assessment

### Known Performance Costs (Source Code Analysis)

| Factor | Estimated Impact | Severity |
|--------|-----------------|---------|
| Three.js (0.178.0) | ~300–400KB raw JS | P1 |
| GSAP + ScrollTrigger | ~150KB raw JS | P2 |
| Lenis smooth scroll | ~30KB raw JS | P3 |
| lucide-react | ~100KB+ if tree-shaken poorly | P2 |
| simple-icons (full library) | ~2.5MB raw — tree-shaken to 8 icons | P3 |
| @fontsource/instrument-sans | Font files per weight | P2 |
| @fontsource/phudu | Font files per weight | P2 |
| Service images (Unsplash JPEGs) | 200–450KB each × 5 services | P1 |
| Portfolio/case study images | Multiple per case study | P2 |
| Source maps exposed | Security risk, not performance | P0/P1 |

### Bundle Size Estimate

Based on previous QA report data and dependencies:
- **Main JS chunk:** ~454KB raw / ~157KB gzip (reported in FINAL_QA_REPORT.md)
- This is driven primarily by Three.js + GSAP + react dependencies
- This significantly exceeds ideal bundle sizes for marketing sites (<200KB raw)

---

## 4.2 Core Web Vitals Estimates

*These are estimates based on known performance factors. Live Lighthouse testing required for actual scores.*

### Homepage

| Metric | Estimated Range | Target | Risk Factor |
|--------|----------------|--------|-------------|
| LCP (Largest Contentful Paint) | 2.5–5.0s | <2.5s | Hero image/Three.js initialization |
| INP (Interaction to Next Paint) | 100–300ms | <200ms | GSAP animations, event listeners |
| CLS (Cumulative Layout Shift) | 0.05–0.15 | <0.1 | Font loading without `font-display: swap` concern |
| FCP (First Contentful Paint) | 1.5–3.0s | <1.8s | JS-heavy SPA with deferred content |
| TTI (Time to Interactive) | 3.0–7.0s | <5.0s | Large bundle, Three.js init |
| TBT (Total Blocking Time) | 300–600ms | <200ms | Three.js, GSAP initialization |

**Risk:** Three.js WebGL initialization occurs on the main thread even though it's deferred. On mobile devices and older hardware, this creates significant CPU blocking after page load, degrading perceived interactivity.

---

## 4.3 Specific Performance Issues

### Issue PF-001 (P1): Three.js Bundle Inflation
**Evidence:** `package.json` dependency `"three": "^0.178.0"`  
**Description:** Three.js adds ~300–400KB to the JavaScript bundle. It is used solely for the hero "atmosphere" background animation — a decorative WebGL effect that the development team has marked as "NOT APPROVED" in the source code.  
**Business Impact:** Slow page load directly causes higher bounce rates and lower Google Search rankings (Core Web Vitals). Mobile users on slower connections may see the hero load blank for 2–5 seconds.  
**Recommendation:** Remove Three.js from the production bundle by replacing the hero atmosphere with a CSS-only gradient/animation or a pre-rendered video fallback. Estimated bundle reduction: ~350KB raw / ~120KB gzip.  
**Effort:** S (half day)  
**Acceptance Criteria:** Hero loads within 1.5s on 3G simulation; Lighthouse TBT drops below 200ms.

### Issue PF-002 (P1): Source Maps Exposed in Production
**Evidence:** `vite.config.js` line: `sourcemap: true`  
**Description:** Production builds include source maps that expose the complete source code structure to anyone who opens browser DevTools. This is both a security and intellectual property risk.  
**Business Impact:** Any competitor, malicious actor, or skilled developer can read the full React component source code, content structure, and any environment values that were embedded at build time.  
**Recommendation:** Set `sourcemap: false` (or `'hidden'` if internal debugging is needed).  
**Effort:** XS (30 minutes)  
**Acceptance Criteria:** No `.map` files in production build output.

### Issue PF-003 (P1): Unoptimized Service Images
**Evidence:** `src/assets/images/services/` — Unsplash JPEGs  
**Description:** Service section images (web-saas.jpg, mobile.jpg, ai.jpg, design.jpg, support.jpg) are Unsplash stock photos referenced as static imports. At 200–450KB each (5 images), this represents ~1–2MB of unoptimized image payload loaded on the homepage.  
**Business Impact:** Slow homepage load increases bounce rate, reduces conversions, and hurts Core Web Vitals scores.  
**Recommendation:**  
1. Convert to WebP or AVIF format (60–70% size reduction)  
2. Add `srcset` for responsive sizes  
3. Ensure `loading="lazy"` on below-fold images (already present in `HomeServices`)  
4. Add explicit `width` and `height` to prevent CLS  
**Effort:** S (half day)

### Issue PF-004 (P2): Font Loading Strategy
**Evidence:** `@fontsource/instrument-sans` and `@fontsource/phudu` as npm dependencies  
**Description:** Fonts loaded via @fontsource are bundled into CSS imports. Without explicit `font-display: swap`, the browser may show invisible text (FOIT) during font load. The fonts are self-hosted (good), but preload hints are not configured.  
**Recommendation:** Add `<link rel="preload">` in `index.html` for critical font weights; ensure `font-display: swap` is set in font CSS.  
**Effort:** XS

### Issue PF-005 (P2): Lenis + GSAP + Three.js Triple Animation Stack
**Description:** Every page loads Lenis smooth scroll, GSAP with ScrollTrigger, and (on homepage) Three.js. The combination adds ~500KB of animation JavaScript and multiple RAF (requestAnimationFrame) loops that run continuously while the page is visible.  
**Impact:** Continuous CPU/GPU usage even when the user isn't animating. Drains laptop battery and mobile battery faster than necessary.  
**Recommendation:** Gate Lenis to desktop only (disable on `pointer: coarse` devices), gate GSAP ScrollTrigger per-page via dynamic import, and remove Three.js.

### Issue PF-006 (P2): No Route-Level Code Splitting Beyond Pages
**Description:** Route-level lazy loading is correctly implemented (`lazy(() => import('@/pages/...'))`). However, heavy dependencies (GSAP, Three.js) are loaded globally rather than being dynamically imported only when the homepage section is in view.  
**Recommendation:** Dynamically import GSAP ScrollTrigger and Three.js only when the component using them mounts. This reduces initial bundle size.

### Issue PF-007 (P3): `lucide-react` Tree Shaking
**Evidence:** `HomeServices.jsx` imports 5 named icons from `lucide-react`  
**Description:** lucide-react v1.26.0 includes named exports. If tree-shaking works correctly (which it should with Vite), only used icons are included. Verify the build output doesn't include the full icon library.  
**Recommendation:** Run `npm run build -- --report` and inspect chunk sizes.

### Issue PF-008 (P3): No Image CDN or Optimization Pipeline
**Description:** Images are served directly from the static hosting without a CDN-level image optimization layer (like Cloudinary, imgix, or Vercel Image Optimization).  
**Recommendation:** For an international audience (Saudi Arabia market indicated by Tailorize case study), CDN delivery is essential for acceptable load times.

---

## 4.4 JavaScript Analysis

### Bundle Composition (Estimated)

| Chunk | Estimated Size | Notes |
|-------|---------------|-------|
| React + React-DOM | ~60KB gzip | Core framework |
| GSAP + ScrollTrigger | ~50KB gzip | Animation |
| Three.js | ~120KB gzip | Hero scene only |
| Lenis | ~10KB gzip | Smooth scroll |
| lucide-react (used icons) | ~5KB gzip | 5 icons used |
| simple-icons (8 paths) | ~2KB gzip | Tech marks |
| App code | ~20KB gzip | All components |
| Fonts (CSS) | ~5KB gzip | CSS only |
| **Total estimate** | **~272KB gzip** | Previous report: ~157KB |

*Note: Previous QA report cited ~157KB gzip for main chunk at an earlier build stage. Current estimate may differ based on content additions.*

### Main Thread Blocking

Three.js WebGL context initialization, even when deferred via `requestIdleCallback`, runs on the main thread and blocks JavaScript execution for several hundred milliseconds during setup. This is the primary contributor to high TBT.

---

## 4.5 CSS Analysis

| Factor | Status | Notes |
|--------|--------|-------|
| CSS Modules | ✅ Good | Scoped styles, no global conflicts |
| Design tokens | ✅ Good | `--mf-*` custom properties in `tokens.css` |
| CSS splitting | ✅ Good | `cssCodeSplit: true` in Vite config |
| Unused CSS | Unknown | Not analyzed — CSS Modules reduce risk |
| Critical CSS inlining | ❌ None | No critical CSS extraction |
| `font-display: swap` | Unknown | Depends on @fontsource configuration |

---

## 4.6 Third-Party Script Analysis

| Script | Source | Purpose | Privacy Risk | Performance Risk |
|--------|--------|---------|-------------|-----------------|
| Google Maps embed | `maps.google.com` | Contact page map | High — loads Google tracking | Medium |
| @fontsource fonts | Self-hosted (npm) | Typography | None | Low |
| simple-icons | Bundled | Tech marks | None | None |

**No analytics, tag manager, or advertising pixels detected.** This means:
- No conversion tracking
- No remarketing capability
- No audience building
- No performance monitoring from Google

---

## 4.7 Server Configuration (Inferable)

| Item | Status | Notes |
|------|--------|-------|
| HTTPS | ✅ Required | Live site at https://mernify.co/ |
| HTTP → HTTPS redirect | ✅ Expected | Standard hosting setup |
| Cache-Control headers | Unknown | Cannot verify without HTTP inspection |
| Gzip/Brotli compression | Unknown | Depends on hosting provider |
| CDN | Unknown | No CDN observable from public inspection |
| Security headers | Unknown | Needs live HTTP response inspection |

**Issue PF-009 (P1):** No Content Security Policy (CSP), X-Frame-Options, or other security headers visible from public inspection. These should be set at the hosting/server level.

---

## 4.8 Performance Recommendations by Category

### Code-Level Improvements (Team)
1. Remove Three.js from production — replace with CSS gradient + SVG animation (XS→S effort, P1)
2. Set `sourcemap: false` in `vite.config.js` (XS effort, P1)
3. Lazy-import GSAP ScrollTrigger only in components that use it (S effort, P2)
4. Disable `SoftCursor` on touch/pointer:coarse devices (XS effort, P2)
5. Disable Lenis on touch devices (S effort, P2)

### Asset-Level Improvements (Design + Engineering)
1. Convert service images to WebP with `srcset` (S effort, P1)
2. Configure explicit `width`/`height` on all images to prevent CLS (XS effort, P2)
3. Add `font-display: swap` to font CSS (XS effort, P2)
4. Add `<link rel="preload">` for critical fonts in `index.html` (XS effort, P2)

### Hosting/Infrastructure Improvements (DevOps)
1. Configure Brotli compression on web server (XS effort, P2)
2. Set `Cache-Control: max-age=31536000` for hashed assets (XS effort, P2)
3. Add security headers: CSP, X-Frame-Options, HSTS (S effort, P1)
4. Configure a CDN with edge caching (M effort, P2)

### Content-Related Performance Improvements
1. Replace Unsplash stock photos with optimized product UI screenshots (M effort, P1)
2. Reduce case study image sizes to <100KB per image (S effort, P2)
