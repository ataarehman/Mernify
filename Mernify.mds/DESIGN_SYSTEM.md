# DESIGN SYSTEM

**Token prefix:** `--mf-*`  
**Implementation:** `src/styles/tokens/tokens.css` + CSS Modules  
**Visual language:** Modular Clarity — premium, spacious, product-focused, enterprise-ready without cold consultancy tone  

This document reconciles Brand Guidelines PDF, brand board, and current code tokens. When code drifts, update code to match this doc unless a documented exception exists.

---

## 1. Brand colors

| Name | Hex | Token | Use |
|------|-----|-------|-----|
| Digital Indigo | `#4F46E5` | `--mf-color-indigo` | Primary buttons, links, key accents |
| Indigo Hover | `#4338CA` | `--mf-color-indigo-hover` | Primary hover |
| Electric Cyan | `#06B6D4` | `--mf-color-cyan` | Eyebrows, icons, small signals |
| Midnight Navy | `#0F172A` | `--mf-color-navy` | Dark sections, footer, premium grounds |
| Slate Black | `#1E293B` | `--mf-color-slate-black` | Primary text on light; elevated dark surfaces |
| Slate Gray | `#64748B` | `--mf-color-slate-gray` | Secondary text |
| Cloud White | `#F8FAFC` | `--mf-color-cloud` | Light page background |
| Pure White | `#FFFFFF` | `--mf-color-white` | Cards, nav contrast |
| Success | `#10B981` | `--mf-color-success` | Positive states |
| Warning | `#F59E0B` | `--mf-color-warning` | Caution |
| Error | `#EF4444` | `--mf-color-error` | Errors |

### Semantic mapping

```text
--mf-bg-page: cloud
--mf-bg-inverse: navy
--mf-bg-elevated: white
--mf-bg-inverse-elevated: slate-black
--mf-text-primary: slate-black
--mf-text-secondary: slate-gray
--mf-text-on-dark: cloud
--mf-text-on-dark-muted: rgba(248,250,252,0.78)
--mf-action-primary: indigo
--mf-border-default: rgba(15,23,42,0.10)
--mf-border-on-dark: rgba(248,250,252,0.12)
--mf-focus-ring: rgba(79,70,229,0.35)
```

### Gradients (sparingly)

- Brand: `linear-gradient(135deg, #4F46E5, #06B6D4)`
- Dark: `linear-gradient(180deg, #0F172A, #1E293B)`

Do not wash every section in gradients. Prefer flat navy/cloud grounds with selective accent light.

### Project-agent note

`#07111F` appears in some briefs as an alternate dark. **Canonical site dark remains Midnight Navy `#0F172A`** per Brand Guidelines. Near-black rgba overlays in the header should be nudged toward navy for consistency.

---

## 2. Typography

| Role | Family | Weight | Notes |
|------|--------|--------|-------|
| Display / H1–H3 | Space Grotesk | 500–700 | Hero and section titles |
| Body / UI | Inter | 400–600 | Paragraphs, nav, forms |
| Fallback | Arial, Helvetica, sans-serif | — | Always declare |

Loaded via Fontsource (licensed distribution) — do not bundle unlicensed Satoshi files even if named in some briefs.

### Scale (implemented)

| Token | Value | Use |
|-------|-------|-----|
| `--mf-font-size-display` | `clamp(2.5rem, 7vw, 4.5rem)` | Hero |
| `--mf-font-size-h2` | `clamp(1.75rem, 3.2vw, 2.5rem)` | Section titles |
| `--mf-font-size-h3` | `clamp(1.25rem, 2vw, 1.75rem)` | Subheads |
| `--mf-font-size-title` | `1.25rem` | Cards / rows |
| `--mf-font-size-body` | `1.0625rem` | Body |
| `--mf-font-size-body-sm` | `0.9375rem` | Secondary |
| `--mf-font-size-label` | `0.75rem` | Eyebrows / meta |

Line length for reading text: target ~60–72 characters in narrow containers (`--mf-container-narrow: 720px`).

---

## 3. Layout

| Token | Value |
|-------|-------|
| Max width | `--mf-container-max: 1240px` |
| Narrow | `--mf-container-narrow: 720px` |
| Gutter | `--mf-gutter: clamp(1rem, 2vw, 1.5rem)` |
| Page margin | `--mf-page-margin: clamp(1.25rem, 4vw, 5rem)` |
| Header height | 72px desktop / 64px mobile |
| Section Y pad | `--mf-section-pad-y: clamp(4.5rem, 10vw, 10rem)` |

### Breakpoints

`480 / 768 / 1024 / 1280 / 1536` (`src/constants/site.js`)

Desktop nav appears at **min-width 1024px**.

### Grid

12-column mental model; implement with CSS grid/flex per section. Avoid card farms in heroes.

---

## 4. Spacing scale

4px base:

`1=4` · `2=8` · `3=12` · `4=16` · `5=24` · `6=32` · `7=48` · `8=64` · `9=96` · `10=128` · `11=160` · `12=200` (px equivalents via rem tokens)

---

## 5. Radius & elevation

| Token | Value | Use |
|-------|-------|-----|
| `--mf-radius-sm` | 8px | Buttons |
| `--mf-radius-md` | 12px | Controls |
| `--mf-radius-lg` | 16px | Media / offers |
| `--mf-radius-xl` | 20px | Large frames |

Shadows: `--mf-shadow-xs|sm|md` only — soft, single-purpose. No neon multi-glow kits. Logo masters stay flat (glow allowed only as temporary marketing atmosphere, not on logo SVG).

---

## 6. Motion

| Token | Value |
|-------|-------|
| Ease out | `cubic-bezier(0.16, 1, 0.3, 1)` |
| Durations | 120 / 200 / 450 / 800 ms |

Rules:

- Prefer `transform` + `opacity`
- Honor `prefers-reduced-motion` (already wired via providers)
- Enter ~200–450ms; exits decisive
- Do not animate from `scale(0)`; minimum ~0.9 if scaling
- Lenis smooth scroll off when reduced motion

Libraries in use: GSAP/ScrollTrigger, Lenis. Do not add Framer Motion unless GSAP is removed in a deliberate migration.

---

## 7. UI primitives (inventory)

### Shipping

`Button` · `TextLink` · `Container` · `Section` · `Stack` · `Heading` · `Text` · `Eyebrow` · `SkipLink` · `LogoMark` · `Magnetic` (use sparingly)

### Specified / to add

`PageMeta` · `Surface` · `Divider` · `Input` · `Textarea` · `Select` · `Field` · `FormMessage` · `Badge` · `EmptyState` · `DeviceMock` · `CaseStudyCard` · `ProcessSteps` · `OfferCard` · `FaqItem` · `FinalCta`

### Patterns

- **Button variants:** primary (indigo), secondary/ghost (on dark and on light), size `sm|md|lg`
- **Section tones:** `light` (cloud) · `dark` (navy) · optional elevated white band
- **Header themes:** sections set `data-header-theme="light|dark"` for adaptive chrome
- Avoid pill CTAs by default (radius stays 8–12)

---

## 8. Iconography & media

- UI icons: Lucide, 1.5–2px stroke, indigo/cyan/slate as needed
- Tech marks: Simple Icons (CC0) — label as capabilities, not clients
- Photography: prefer original product UI; Unsplash only as temporary with attribution log
- No generic “developers pointing at screens” as hero proof
- Decorative WebGL is optional atmosphere — never the only carrier of meaning

---

## 9. Logo system

- Combination mark: gradient M in rounded square + “Mernify” wordmark
- Clear space: height of “M”
- Min digital: full logo 120px wide; symbol 24px
- Provide usages: horizontal, inverted, symbol-only (favicon already SVG)
- Do not stretch, recolor off-palette, or add shadows to the mark

---

## 10. Accessibility requirements (system-level)

- Visible `:focus-visible` using `--mf-focus-ring`
- Contrast: white/cloud on navy; slate-black on cloud; verify indigo buttons with white text
- Do not convey state by color alone
- Forms need labels, errors, and `aria-invalid`
- Mobile menu must be keyboard operable
- Soft custom cursors must not replace focus indicators; prefer off by default

---

## 11. Section visual rhythm

Alternate dark and light bands for long pages:

`dark hero → light trust → light services → dark work → light industries → dark process → light offers → light tech → light standards → dark final CTA → dark footer`

Adjust only when a section’s content needs a quieter surface — do not randomize.

---

## 12. Anti-patterns (explicit)

- Purple-on-white generic AI SaaS clichés beyond brand indigo usage
- Excessive glassmorphism
- Neon cyberpunk
- Template service card grids as the hero
- Fake logos / stats / awards
- Huge empty voids without content hierarchy
- Gradient every section
- Pill soup and chip overload in the first viewport

---

## 13. Component architecture (target)

```text
primitives (ui/)  →  patterns (forms/, media/, seo/)  →  sections/  →  pages/
                         ↑
                   content/*.js  (copy & data)
```

Pages compose sections; sections consume content modules; primitives stay brand-agnostic beyond tokens.

---

## 14. Alignment with current code

**Already strong:** token file, fonts, button/section primitives, adaptive header, services editorial pattern.

**Drift to fix in implementation:** near-black header overlays, SoftCursor default, Three.js as default hero meaning carrier, missing form primitives, incomplete section set vs rhythm above.
