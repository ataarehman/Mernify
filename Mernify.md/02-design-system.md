# 02 — Design System

**Status:** Locked to Brand Guidelines + Brand Board + Creative Direction  
**Language:** Modular Clarity  
**Token prefix:** `--mf-*`

---

## Color tokens (official)

| Token | Hex | Role |
|-------|-----|------|
| `--mf-color-indigo` | `#4F46E5` | Primary actions, links, accents (Digital Indigo) |
| `--mf-color-indigo-hover` | `#4338CA` | Primary hover |
| `--mf-color-cyan` | `#06B6D4` | Highlights, signals (Electric Cyan) |
| `--mf-color-navy` | `#0F172A` | Dark grounds (Midnight Navy) |
| `--mf-color-slate-black` | `#1E293B` | Elevated dark / primary text on light |
| `--mf-color-slate-gray` | `#64748B` | Secondary text |
| `--mf-color-cloud` | `#F8FAFC` | Light page ground (Cloud White) |
| `--mf-color-white` | `#FFFFFF` | Cards, contrast, nav |
| `--mf-color-success` | `#10B981` | Success |
| `--mf-color-warning` | `#F59E0B` | Warning |
| `--mf-color-error` | `#EF4444` | Error |

### Semantic

```text
--mf-bg-page: var(--mf-color-cloud)
--mf-bg-inverse: var(--mf-color-navy)
--mf-bg-elevated: var(--mf-color-white)
--mf-bg-inverse-elevated: var(--mf-color-slate-black)
--mf-text-primary: var(--mf-color-slate-black)
--mf-text-secondary: var(--mf-color-slate-gray)
--mf-text-on-dark: var(--mf-color-cloud)
--mf-text-on-dark-muted: rgba(248, 250, 252, 0.78)
--mf-action-primary: var(--mf-color-indigo)
--mf-border-default: rgba(15, 23, 42, 0.10)
--mf-border-on-dark: rgba(248, 250, 252, 0.12)
--mf-focus-ring: rgba(79, 70, 229, 0.35)
```

### Gradients (sparingly)

```text
--mf-gradient-brand: linear-gradient(135deg, #4F46E5, #06B6D4)
--mf-gradient-dark: linear-gradient(180deg, #0F172A, #1E293B)
```

---

## Typography

| Role | Family | Notes |
|------|--------|-------|
| Display / headings | **Space Grotesk** | Bold / SemiBold / Medium |
| Body / UI | **Inter** | Regular / Medium / SemiBold |
| Fallback | Arial, Helvetica, sans-serif | |

### Scale (CSS)

| Token | Value | Use |
|-------|-------|-----|
| `--mf-font-display` | `clamp(2.5rem, 7vw, 4.5rem)` | Hero H1 |
| `--mf-font-h2` | `clamp(1.75rem, 3.2vw, 2.5rem)` | Section titles |
| `--mf-font-h3` | `clamp(1.25rem, 2vw, 1.75rem)` | Subheads |
| `--mf-font-title` | `1.125rem–1.375rem` | Cards/rows |
| `--mf-font-body` | `1rem–1.125rem` | Body |
| `--mf-font-body-sm` | `0.875rem–1rem` | Secondary |
| `--mf-font-label` | `0.75rem–0.875rem` | Eyebrows |

---

## Grid

- Columns: 12  
- Max width: **1240px** (brand 1200–1320)  
- Gutter: `clamp(1rem, 2vw, 1.5rem)`  
- Margin: `clamp(1.25rem, 4vw, 5rem)`  

Breakpoints: `480 / 768 / 1024 / 1280 / 1536`

---

## Spacing (4px base)

`--mf-space-1` … `--mf-space-12` → 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160, 200  

Section padding: mobile 72 · tablet 96 · desktop 120–160  

---

## Radius

| Token | Value | Use |
|-------|-------|-----|
| `--mf-radius-sm` | 8px | Buttons (8–12 range) |
| `--mf-radius-md` | 12px | Controls / small panels |
| `--mf-radius-lg` | 16px | Offer modules / media |
| `--mf-radius-xl` | 20px | Large frames (≤28 max) |

Avoid pill CTAs by default.

---

## Shadow

Soft only: `--mf-shadow-xs`, `--mf-shadow-sm`, `--mf-shadow-md`  
No multi-layer glow kits. Glow only as controlled atmosphere.

---

## UI primitives (foundation set)

`Button` · `TextLink` · `Container` · `Section` · `Stack` · `Heading` · `Text` · `Eyebrow` · `Divider` · `Surface` · `SkipLink` · `LogoMark` (asset-ready)

---

## Homepage reusable sections (build gated)

See `08-homepage-experience-spec.md` for full contracts:

`HomeHero` · `HomeTrust` · `HomeReasons` · `HomeServices` · `HomeWork` · `HomeIndustries` · `HomeProcess` · `HomeOffers` · `HomeTechnology` · `HomeTestimonials` · `HomeStandards` · `HomeFinalCta`
