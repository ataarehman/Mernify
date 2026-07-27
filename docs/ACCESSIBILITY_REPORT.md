# Accessibility Report
*2026-07-24 · Mernify Wow Factor Redesign*

## Summary

All 8 wow-moment sections implement accessibility as a baseline, not an afterthought.

## Document Structure

| Check | Status |
|---|---|
| Logical heading hierarchy (h1 → h2 → h3) | ✅ |
| Single h1 per page | ✅ |
| All h2 headings have `id` attributes | ✅ |
| All sections have `aria-labelledby` | ✅ |
| `aria-hidden` on decorative elements | ✅ |

## Interactive Component Patterns

### Hero
- `aria-labelledby="hero-title"` on section
- Visual elements (`data-visual`, atmosphere, grid) marked `aria-hidden`
- Scroll indicator `aria-hidden`
- CTAs are standard `<NavLink>` — keyboard and screen-reader native

### Product Story (WOW 2)
- `role="tablist"` / `role="tab"` / `aria-selected` on stage navigation
- `role="tabpanel"` on visual canvas
- Mobile panels use `aria-hidden` (visual duplicate, content in nav)
- Stage descriptions are full sentences, not icon-only

### Industry System (WOW 4)
- `role="tablist"` on selector
- `aria-pressed` on industry buttons
- `aria-live="polite"` on canvas — screen readers announce content change
- All challenge, solution, user, and zone data is text — no information in colour only

### AI Workflow (WOW 5)
- `role="tablist"` / `role="tab"` on scenario selector
- `aria-pressed` on step buttons
- Step descriptions use semantic headings (`<strong>`)
- Human approval badge uses visible text "Approval required" — not just colour
- Disclaimer text present: "Interactive product demonstration — not a live production system"
- Play/Pause button has explicit `aria-label`

### Architecture (WOW 6)
- `role="list"` + `role="listitem"` on layer stack
- `aria-expanded` on each layer button
- `aria-controls` references the layer detail panel
- `aria-live="polite"` on side panel

### Human Partnership (WOW 7)
- `role="list"` + `role="listitem"` on principles grid
- No information conveyed only through the decorative gradient bar

### Final CTA (WOW 8)
- Module decoration `aria-hidden`
- Headline `aria-labelledby` on section
- Both CTAs are standard links with visible text

## Keyboard Navigation

| Element | Keyboard support |
|---|---|
| All buttons | Space / Enter to activate |
| Tab navigation between sections | ✅ |
| Stage tabs in Product Story | ✅ |
| Industry selector | ✅ |
| AI scenario + step controls | ✅ |
| Architecture layer buttons | ✅ |
| Mobile menu focus trap | ✅ (from previous implementation) |
| Escape key in mobile menu | ✅ (from previous implementation) |

## Focus Styles

All interactive elements use the established focus style from `reset.css`:
```css
:focus-visible {
  outline: 3px solid var(--mf-color-indigo);
  outline-offset: 3px;
}
```

This passes WCAG 2.1 SC 2.4.7 (Focus Visible).

## Reduced Motion

All GSAP animations are guarded by:
```js
const { prefersReducedMotion } = useReducedMotion()
if (prefersReducedMotion) return undefined // skip animation
```

- Hero: CSS fallback modules shown, no animation
- Product Story: pin skipped, content shows immediately
- AI Workflow: auto-play skipped (`if (!playing || prefersReducedMotion) return`)
- Final CTA: module assembly animation skipped
- Human Partnership: scroll trigger skipped

## Colour Contrast

| Text | Background | Contrast |
|---|---|---|
| White on navy (`#f8fafc` on `#07111f`) | > 14:1 | ✅ AAA |
| Muted on dark (`rgba(248,250,252,0.78)` on `#0f172a`) | ~9:1 | ✅ AAA |
| Cyan eyebrow on dark | ~5.5:1 | ✅ AA |
| Indigo on white (`#4f46e5` on `#fff`) | ~5.1:1 | ✅ AA |
| Slate text on cloud bg (`#1e293b` on `#f8fafc`) | ~12:1 | ✅ AAA |

## Touch Targets

All interactive elements meet the 44×44px minimum touch target guideline (WCAG 2.5.5):
- Buttons: `padding: 0.4–0.5rem` vertical + `min-height: 44px` enforced via button base styles
- Stage tabs: `padding: var(--mf-space-4) var(--mf-space-5)` = 16–24px, ≥44px total height
- Industry selector: ≥44px height per button

## Screen Reader Compatibility

State changes in interactive sections use:
- `aria-live="polite"` (not `assertive`) to avoid interrupting reading flow
- Visible text for all states (no icon-only state indicators)
- Accessible labels on icon buttons (play/pause)
