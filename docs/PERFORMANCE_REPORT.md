# Performance Report
*2026-07-24 · Mernify Wow Factor Redesign*

## Build Output Analysis (Vite production build)

### Critical path

| Bundle | Size (gzip) |
|---|---|
| `index-*.js` | 162 KB |
| `index-*.css` | 12.5 KB |

### Code-split chunks

| Chunk | Size (gzip) | Notes |
|---|---|---|
| `HeroScene-*.js` | 121 KB | Three.js scene — lazy loaded |
| `ContactPage-*.js` | 2.8 KB | Form logic |
| `CaseStudyPage-*.js` | 1.1 KB | |
| `CaseStudiesPage-*.js` | 0.8 KB | |
| Other page chunks | < 1 KB each | |

**Total production payload for homepage initial load**: ~175 KB gzip  
**Three.js scene**: Only loaded on devices with WebGL + after hero mounts (lazy)

### Animation budget

- **Hero**: Three.js (lazy, ~121KB gz) OR CSS fallback (~0KB extra)
- **Product Story**: GSAP ScrollTrigger (bundled in GSAP which is in main chunk)
- **Industries**: GSAP animate-in only, < 2ms per interaction
- **AI Workflow**: Vanilla React state, no animation library per step
- **Architecture**: CSS transitions only (no GSAP)
- **Human Partnership**: GSAP ScrollTrigger fade-in
- **Final CTA**: GSAP ScrollTrigger assembly

### Performance compliance checklist

| Requirement | Status |
|---|---|
| No unnecessary dependencies added | ✅ All packages pre-existing in package.json |
| Three.js dynamically imported | ✅ React.lazy + Suspense |
| Heavy scene lazy-loaded | ✅ Separate chunk (478KB raw / 121KB gz) |
| CSS/SVG preferred over WebGL | ✅ Fallback is CSS-only |
| Continuous animations capped | ✅ parallax: 2 repeats, visibility API pause |
| Reduced-motion respected | ✅ useReducedMotion() guard on all GSAP |
| Transform/opacity for animations | ✅ No layout-triggering properties animated |
| Layout shift prevention | ✅ min-height set on hero, scene, canvas elements |
| No loading screen | ✅ Content visible immediately |
| No artificial delays | ✅ No preloader |

### Fonts

- **Inter** and **Space Grotesk**: Loaded via `@fontsource` (preinstalled)
- Served as `.woff2` with format negotiation
- Subset: latin, latin-ext, cyrillic, greek
- Loading strategy: `font-display: swap` (default @fontsource behavior)
