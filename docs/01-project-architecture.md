# 01 — Project Architecture

**Status:** Aligned to Brand Lock · Creative Direction · Homepage Spec · Self-Review Gate  
**Stack:** React · Vite · JavaScript · GSAP · Three.js · Lenis · React Router · CSS Modules + design tokens  

---

## Governing documents

| Doc | Role |
|-----|------|
| `06-brand-source-of-truth.md` | Brand, tokens, messaging, service IA |
| `07-creative-direction-and-experience-blueprint.md` | Emotion, motion, visual philosophy |
| `08-homepage-experience-spec.md` | Home section-by-section build contract |
| `09-section-self-review-gate.md` | Mandatory PASS before next section |

**Implementation rule:** Do not build the next homepage section until the current section’s review card is PASS.

---

## 1. Folder Structure

```text
mernify/
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   ├── og/
│   └── fonts/                 # self-hosted woff2 (Space Grotesk, Inter)
├── src/
│   ├── app/
│   │   ├── App.jsx
│   │   ├── router.jsx
│   │   └── providers/
│   │       ├── AppProviders.jsx
│   │       ├── MotionProvider.jsx
│   │       └── ReducedMotionProvider.jsx
│   ├── assets/
│   │   ├── images/{brand,heroes,work,team,textures}/
│   │   ├── icons/
│   │   ├── models/
│   │   └── video/
│   ├── components/
│   │   ├── ui/
│   │   ├── layout/
│   │   ├── navigation/
│   │   ├── forms/
│   │   ├── media/
│   │   └── feedback/
│   ├── sections/              # built only after foundation approval
│   │   ├── home/
│   │   └── shared/
│   ├── pages/
│   ├── three/
│   │   ├── canvas/
│   │   ├── scenes/
│   │   ├── materials/
│   │   ├── hooks/
│   │   └── utils/
│   ├── motion/
│   │   ├── core/
│   │   ├── presets/
│   │   ├── scroll/
│   │   └── transitions/
│   ├── hooks/
│   ├── lib/
│   ├── content/
│   ├── styles/
│   │   ├── tokens/
│   │   ├── base/
│   │   └── global.css
│   ├── constants/
│   └── main.jsx
├── docs/
├── index.html
├── vite.config.js
└── package.json
```

---

## 2. Component Structure

```text
Page → Section → Block → UI Primitive
```

| Layer | Owns | Example |
|-------|------|---------|
| Page | Route composition, SEO shell | `HomePage` |
| Section | Spec’d homepage blocks | `HomeHero` (Phase 2+) |
| Block | Reusable intra-section patterns | `AccordionRow` |
| UI | Brand-agnostic primitives | `Button`, `Container` |

**Reusability mandate:** Prefer primitives + content props. No one-off styled copies of buttons/links.

---

## 3. Route Structure

| Path | Page | Phase |
|------|------|-------|
| `/` | Home | Foundation shell now; sections gated |
| `/services` | Services index | Later |
| `/services/:slug` | Service detail | Later |
| `/work` | Work index | Later |
| `/work/:slug` | Case study | Later |
| `/about` | About | Later |
| `/process` | Process | Later |
| `/contact` | Contact | Later |
| `*` | 404 | Foundation placeholder |

Lazy-load all routes except the app shell.

---

## 4. Animation Architecture

```text
ReducedMotionProvider
  └── MotionProvider (Lenis + GSAP ticker bridge)
        └── Section hooks (gsap.context + cleanup)
```

- Lenis: single instance  
- GSAP + ScrollTrigger: section timelines (`mf:home:*`)  
- CSS: hover/focus micro-interactions  
- See `07` + `08` for budgets and timelines  

---

## 5. Three.js Architecture

```text
three/canvas/SceneCanvas.jsx
three/scenes/HeroAtmosphereScene.js   # Home only — build with Hero phase
three/hooks/useWebGLSupport.js
three/utils/disposeObject.js
```

- One full-screen canvas max (Hero)  
- Poster-first LCP; deferred load  
- Pause offscreen; dispose on route leave  
- `aria-hidden` on canvas  

---

## State management

| State | Tool |
|-------|------|
| Local UI | useState / useReducer |
| Reduced motion | ReducedMotionProvider |
| Lenis / scrollTo | MotionProvider |
| Content | `src/content/*` modules |
| Offer deep-links | URL search params |

No Redux/Zustand for v1.

---

## Naming

| Kind | Pattern |
|------|---------|
| Components | PascalCase |
| Hooks | `useX` |
| Tokens | `--mf-{category}-{name}` |
| Timelines | `mf:scope:action` |
| Assets | kebab-case |

---

## Homepage build order (post-foundation)

Per `08` + `09`: Shell → Hero → Trust → … → Final CTA → Integration.  
**Each step requires self-review PASS.**
