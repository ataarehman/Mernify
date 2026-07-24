# 03 — Motion & 3D Architecture

**Status:** Aligned to Creative Direction + Homepage Spec  

---

## Motion philosophy

Editorial choreography. Soft eases, short travel (12–36px), interruptible.  
2–3 signature motions per page; CSS owns micro-interactions.

### Easing / duration tokens

```text
--mf-ease-out: cubic-bezier(0.16, 1, 0.3, 1)
--mf-dur-xs: 120ms
--mf-dur-sm: 200ms
--mf-dur-md: 450ms
--mf-dur-lg: 800ms
```

### Infrastructure (`src/motion`)

| Module | Role |
|--------|------|
| `core/MotionProvider.jsx` | Lenis instance + gsap.ticker bridge |
| `core/ReducedMotionProvider.jsx` | `prefers-reduced-motion` |
| `presets/fadeUp.js` | Standard enter |
| `scroll/useSectionTimeline.js` | gsap.context + ScrollTrigger helper |
| `transitions/routeTransition.js` | Reserved for later |

### GSAP rules (mandatory)

1. Always `gsap.context` + revert on unmount  
2. Label timelines `mf:scope:action`  
3. `gsap.matchMedia` for breakpoints  
4. Honor reduced motion (zero-duration sets)  
5. Max one pin on Home (Process Mode B — not v1; Mode A default)  
6. `ScrollTrigger.refresh` on route/fonts/images  
7. No elastic/bounce on marketing UI  

---

## Lenis

- Single root instance  
- Disabled when reduced motion  
- `scrollTo` for anchors with header offset (72/64 + 12)  
- Destroy on unmount  

---

## Three.js

### Foundation only (Phase 1)

- `SceneCanvas` lifecycle wrapper  
- `useWebGLSupport`  
- `disposeObject`  
- **No Hero scene mesh work until Hero phase is approved**

### When Hero ships

- `HeroAtmosphereScene` only on Home hero  
- Poster-first; deferred import(`three`)  
- DPR cap `Math.min(devicePixelRatio, 1.75)`  
- Pause offscreen / tab hidden  
- Canvas `aria-hidden`  

---

## Homepage GSAP schedule

See `08` master schedule (`mf:home:hero` … `mf:home:final-cta`).  
Do not implement section timelines until that section’s build gate opens.
