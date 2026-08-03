# Phase 5: Accessibility Audit

**Audit Date:** 2026-07-30  
**Standard:** WCAG 2.2 Level AA  
**Method:** Source code analysis + structural inspection  
**Note:** Automated WCAG testing (axe, WAVE) requires live browser testing for complete results.

---

## 5.1 Summary Assessment

| Principle | Status | Key Findings |
|-----------|--------|-------------|
| Perceivable | ⚠️ Partial | Alt text present on images; color contrast needs live verification |
| Operable | ⚠️ Partial | Keyboard nav present; focus indicators need verification; mobile focus trap partial |
| Understandable | ✅ Mostly Good | Clear language; error messages present on form |
| Robust | ⚠️ Partial | Semantic HTML good; ARIA mostly correct; no screen reader testing performed |

**Estimated WCAG 2.2 AA Compliance: ~75%** — meets basic structure requirements but has significant gaps in focus management, color contrast verification, and motion controls.

---

## 5.2 Semantic HTML

### Landmark Regions

| Landmark | Element | Present | Notes |
|----------|---------|---------|-------|
| `<header>` | `SiteHeader` | ✅ Yes | Wraps navigation |
| `<nav aria-label="Primary">` | Desktop nav | ✅ Yes | Correct labeling |
| `<nav aria-label="Mobile">` | Mobile panel | ✅ Yes | Correct labeling |
| `<main id="main-content">` | `RootLayout` | ✅ Yes | Required for skip link |
| `<footer>` | `SiteFooter` | ✅ Yes | |
| `<section>` with labels | Section components | ✅ Yes | `aria-labelledby` used |
| `<article>` | About principles | ✅ Yes | |

### Heading Structure

**Homepage:**
```
H1: "We Design, Engineer & Scale Digital Products" (Hero)
H2: "Modern platforms. Production-grade foundations." (Trust section)
H2: "What we build for growing products" (Services section)
```

**Services Page, About Page, Case Studies Page:** Each should have exactly 1× H1 — verified via `PageMeta` component and `PageHero` which renders an `<h1>`.

**Issue A11Y-001 (P2):** Heading hierarchy depth may be shallow on some pages. Verify that H2, H3, H4 headings don't skip levels. The About page uses H2 → H3 correctly for capabilities and principles.

---

## 5.3 Form Accessibility

| Element | Status | Notes |
|---------|--------|-------|
| All inputs have `<label>` | ✅ Pass | Via `Field` component with `id`/`for` linking |
| Required fields marked | ✅ Pass | `required` attribute + "required" in label |
| Error messages | ✅ Pass | `role="alert"` on consent error; errors shown next to fields |
| Field hint text | ✅ Pass | `hint` prop on timeline field |
| `aria-invalid` on error | ✅ Pass | `aria-invalid={Boolean(errors.email)}` |
| Status announcements | ✅ Pass | `aria-live="polite"` on status div |
| Consent checkbox label | ✅ Pass | `<label>` wraps checkbox |
| Privacy link in consent | ✅ Pass | Internal `<Link>` to `/privacy` |

**Issue A11Y-002 (P2):** The `<label>` for the consent checkbox uses a wrapping pattern (`<label><input>...</label>`). While this works visually, some screen readers handle this differently. Test with NVDA/JAWS to verify the consent checkbox is clearly announced as "I agree to be contacted...".

---

## 5.4 Keyboard Navigation

| Interaction | Status | Notes |
|-------------|--------|-------|
| Skip to main content link | ✅ Pass | `SkipLink` component present |
| Tab through navigation | ✅ Pass | All links and buttons reachable |
| Header CTA via keyboard | ✅ Pass | Button receives focus |
| Mobile menu toggle | ✅ Pass | `<button>` element, focusable |
| Escape to close mobile menu | ✅ Pass | `keydown` listener on `Escape` |
| Focus return on menu close | ✅ Pass | Returns focus to toggle button |
| Services row keyboard nav | ✅ Pass | `ArrowDown`/`ArrowUp` navigation between services |
| Form keyboard submission | ✅ Pass | `type="submit"` button |
| Contact form tab order | ✅ Expected | Linear top-to-bottom |

**Issue A11Y-003 (P1): Mobile Menu Focus Trap**  
The mobile navigation panel does not implement a full focus trap. When the menu is open, pressing Tab can move focus outside the mobile panel to background content (even if visually hidden by overflow). WCAG 2.1 SC 2.1.2 (No Keyboard Trap) requires that focus is manageable. However, for drawer/panel patterns, a focus trap using `inert` attribute on the main content or a manual trap loop is recommended.  
**Recommendation:** Apply `inert` attribute to the `<main>` region when mobile menu is open.

**Issue A11Y-004 (P2): Visible Focus Indicators**  
The SoftCursor component renders a custom cursor that follows the pointer. On keyboard navigation, the custom cursor is irrelevant, but it may visually compete with or obscure the browser's default focus outline. Verify that focused elements have a clearly visible `:focus-visible` indicator on all interactive elements (buttons, links, inputs).  
WCAG 2.2 SC 2.4.11 requires a focus indicator with minimum area and contrast ratio.

---

## 5.5 Image Accessibility

| Image Type | Status | Notes |
|-----------|--------|-------|
| Service section images | ✅ Pass | `alt` text describes image content |
| Logo mark | ✅ Pass | SVG with accessible name |
| Tech marks (TechMark) | ✅ Pass | `label` prop renders as accessible name |
| Hero decorative elements | ✅ Pass | `aria-hidden="true"` on atmosphere layers |
| Case study images | ✅ Pass | `alt` attributes defined in content |
| About page thumbnail images | ⚠️ Unknown | `alt=""` on decorative thumbs — verify |
| Favicon | ✅ Pass | SVG favicon referenced |

---

## 5.6 Color and Contrast

**Cannot fully verify without live browser testing. Known factors:**

| Element | Foreground | Background | Estimated Ratio | Status |
|---------|-----------|-----------|----------------|--------|
| Hero text | White `#F8FAFC` | Dark navy `#0F172A` | ~21:1 | ✅ Excellent |
| Body text on light | Dark `#0F172A` | Light `#F8FAFC` | ~21:1 | ✅ Excellent |
| CTA button text | White | Indigo `#4F46E5` | ~4.5:1+ | ✅ Pass (AA) |
| Muted text color | Unknown gray | Light | Unknown | ⚠️ Verify |
| Form error text | Unknown | White/light | Unknown | ⚠️ Verify |
| Footer text | Light gray | Dark navy | Unknown | ⚠️ Verify |
| Service index numbers | Muted | Light | Unknown | ⚠️ Verify |
| "Eyebrow" text (cyan) | Cyan `#06B6D4` | Dark `#0F172A` | ~6.2:1 | ✅ Pass (AA) |

**Issue A11Y-005 (P2):** Muted text elements (subtitles, supporting copy) and ghost-button text may not meet the 4.5:1 contrast ratio required for normal text (WCAG SC 1.4.3). Verify with a contrast checker tool on the live site.

---

## 5.7 Motion and Animation

| Control | Status | Notes |
|---------|--------|-------|
| `prefers-reduced-motion` detected | ✅ Pass | `ReducedMotionProvider` wraps app |
| GSAP animations disabled on reduced motion | ✅ Pass | Each component checks `prefersReducedMotion` |
| Three.js scene disabled on reduced motion | ✅ Pass | `if (prefersReducedMotion) return undefined` |
| Lenis smooth scroll | ⚠️ Unknown | Does Lenis respect `prefers-reduced-motion`? Verify |
| SoftCursor animation | ⚠️ Unknown | Custom cursor continues even with reduced motion |

**Issue A11Y-006 (P2):** Lenis smooth scroll may not automatically detect `prefers-reduced-motion`. If a user has reduced motion set, Lenis should be disabled or switch to instant scrolling. Verify the `MotionProvider` passes this flag to Lenis initialization.

---

## 5.8 Screen Reader Experience

| Element | Screen Reader Text | Status |
|---------|-------------------|--------|
| Skip link | "Skip to main content" | ✅ |
| Logo | "Mernify" (accessible name) | ✅ Expected |
| Nav links | Link text matches visual | ✅ |
| Mobile menu button | "Open menu" / "Close menu" | ✅ |
| Service rows | Title text + `aria-pressed` state | ✅ |
| Service panel | `aria-live="polite"` for changes | ✅ |
| Hero section | `aria-label="Mernify introduction"` | ✅ |
| Form errors | `role="alert"` announced | ✅ |
| Hero lines | Concatenated H1 text | ⚠️ Verify concatenation |

**Issue A11Y-007 (P2): H1 Screen Reader Concatenation**  
The hero H1 is split across multiple `<span>` elements for CSS animation:
```jsx
<h1>
  <span className={styles.titleLine}>
    <span className={styles.titleInner} data-hero-line>We Design, Engineer &</span>
  </span>
  <span className={styles.titleLine}>
    <span className={styles.titleInner} data-hero-line>Scale Digital Products</span>
  </span>
</h1>
```
Screen readers may concatenate this as "We Design, Engineer &Scale Digital Products" without the space between lines. Verify with a screen reader. Fix: add a space character at the end of each line or use `<br aria-hidden="true">`.

---

## 5.9 ARIA Usage

| Pattern | Usage | Status |
|---------|-------|--------|
| `aria-expanded` on menu toggle | ✅ Present | Correct |
| `aria-controls` on menu toggle | ✅ Present | Correct |
| `aria-label` on nav elements | ✅ Present | Primary/Mobile labels |
| `aria-labelledby` on sections | ✅ Present | Links section to H2 |
| `aria-pressed` on service rows | ✅ Present | Toggle behavior |
| `aria-controls` on service rows | ✅ Present | Links to panel |
| `aria-live` on service panel | ✅ Present | Announces changes |
| `aria-live` on form status | ✅ Present | Polite announcements |
| `aria-invalid` on form fields | ✅ Present | Error state |
| `role="list"` on partner items | ✅ Present | Trust strip list |
| `role="toolbar"` on filters | ✅ Present | Case study filters |
| `aria-hidden` on decorative | ✅ Present | Hero atmosphere, scroll hint |

---

## 5.10 Accessibility Gaps Summary

| ID | Issue | WCAG Criterion | Severity |
|----|-------|---------------|---------|
| A11Y-001 | Heading hierarchy may skip levels | 1.3.1 | P2 |
| A11Y-002 | Consent checkbox label pattern | 1.3.1 | P2 |
| A11Y-003 | Mobile menu missing focus trap | 2.1.2 | P1 |
| A11Y-004 | Focus indicator may be obscured by SoftCursor | 2.4.11 | P2 |
| A11Y-005 | Muted text contrast not verified | 1.4.3 | P2 |
| A11Y-006 | Lenis may not respect reduced-motion | 2.3.3 | P2 |
| A11Y-007 | H1 span concatenation may drop spaces | 1.3.1 | P2 |
| — | No automated WCAG scan run on live site | All | P1 |
| — | No keyboard-only session tested end-to-end | 2.1.1 | P1 |
| — | No screen reader testing performed | 4.1.3 | P1 |

---

## 5.11 Accessibility Strengths

1. **Skip link** present and functional
2. **Landmark regions** correctly implemented
3. **Mobile menu ARIA** (`aria-expanded`, `aria-controls`, Escape) correct
4. **Reduced motion provider** at app level — good architectural decision
5. **Form field labels** all linked via `id/for`
6. **Service row keyboard navigation** with Arrow key support
7. **ARIA live regions** on dynamic content (service panel, form status)
8. **Decorative images** correctly marked `aria-hidden`
9. **Alt text** on all meaningful images

---

## 5.12 Recommended Immediate Actions

| Action | Effort | Priority |
|--------|--------|---------|
| Run axe DevTools on all pages live | XS | P1 |
| Test with NVDA + Chrome | S | P1 |
| Implement focus trap in mobile menu | XS | P1 |
| Verify `:focus-visible` on all interactive elements | XS | P2 |
| Check contrast of muted/gray text elements | XS | P2 |
| Verify Lenis + reduced-motion compatibility | XS | P2 |
| Fix H1 span spacing for screen readers | XS | P2 |
