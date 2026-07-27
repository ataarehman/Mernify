# 04 — Engineering Standards

**Status:** Active for Phase 1 foundation and all later sections  

---

## SEO

- Unique title/description per route  
- Semantic landmarks  
- One H1 per page  
- JSON-LD later (Organization)  
- Prerender optional post-MVP  

## Accessibility (WCAG 2.2 AA target)

- Skip link  
- Keyboard + focus-visible  
- Reduced motion  
- Accordion ARIA when Services ships  
- Contrast on light and dark bands  

## Performance

| Metric | Budget |
|--------|--------|
| LCP | ≤ 2.5s |
| CLS | ≤ 0.1 |
| INP | ≤ 200ms |

- Route lazy loading  
- Defer Three  
- Self-host fonts; preload critical  
- Image dimensions reserved  

## Lazy loading

- Routes via `React.lazy`  
- Three dynamic import when Hero mounts  
- Images: eager LCP only; else lazy  

## Assets

```text
public/fonts/*.woff2
public/favicon.svg
src/assets/images/{brand,heroes,work,...}
```

## Image optimization

AVIF/WebP · srcset · no 4K CSS downscales · SVG logos  

## Scalability

Content modules → future CMS. Token prefix `--mf-`. Motion/Three isolated.

## Coding standards

- JS + ES modules  
- CSS Modules for components; tokens global  
- Alias `@/` → `src/`  
- Functional components  
- Cleanup effects / GSAP / Three  

## Self-review

Every section: `09-section-self-review-gate.md` → card in `docs/reviews/`.
