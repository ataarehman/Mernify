# CODE_CHANGES — UI Agent production polish

Date: 2026-07-24  
Authority: `ui-agent.md` gates + `Mernify.mds/` (project agent, design system, content policy).  
Scope: production UI polish only. No invented social proof, testimonials, or launch metrics.

## Authority conflicts resolved

| ui-agent request | Mernify.mds decision |
| --- | --- |
| Hero trust badges / review stars / client counts | **Skipped** — forbidden until real content exists (`REMAINING_CONTENT_REQUIREMENTS.md`) |
| `--cwrc-*` tokens / Odoo patterns | **Ignored** — keep `--mf-*` and React CSS Modules |
| Fake dashboard KPIs as social proof | Softened decorative chrome to qualitative labels only |

## Files changed

### Tokens / base
- `src/styles/tokens/tokens.css` — added `--mf-color-navy-deep`, `--mf-color-surface-dark` (brand PDF / project agent).
- `src/styles/base/reset.css` — stronger `:focus-visible` on interactive controls.

### Navigation
- `src/components/navigation/SiteHeader.module.css` — near-black overlays → navy; solid backgrounds before `backdrop-filter`; mobile panel uses `--mf-color-navy-deep`; nav focus styles.
- `src/components/navigation/SiteHeader.jsx` — mobile menu focus trap + Escape return focus.

### Buttons
- `src/components/ui/Button.module.css` — ghost solid fallback + `@supports` glass; explicit focus rings.

### Hero / product visual
- `src/sections/home/HomeHero.module.css` — atmosphere uses surface tokens; 375px spacing/type polish.
- `src/components/media/ProductDashboard.jsx` — capped parallax (~12s / finite repeats); removed inline widths; qualitative mock labels (not claimed metrics).
- `src/components/media/ProductDashboard.module.css` — width utility classes; readable metric type sizes.

## Quality gate (self-check)

### Responsiveness
- [x] 375 / 768 / 1280 / 1920 layout intent preserved (hero stack + full CTAs on small screens)
- [x] No intentional horizontal scroll introduced
- [x] Dashboard sidebar hides below 768; mobile companion scales down

### Visual
- [x] Header/glass still readable without `backdrop-filter`
- [x] Focus rings visible on buttons and nav
- [x] Continuous hero motion stops after N seconds / reduced-motion still skips it

### Code / production
- [x] Tokens used where new colors were needed
- [x] No new inline `style=` in ProductDashboard
- [x] No `console.log` in `src/`
- [x] No external CDN images in current UI surface
- [x] Did **not** invent certifications, ratings, or client counts

## Not done (business blockers — intentional)

- Real case studies / published work
- Verified contact endpoint / inbox
- Legal review of Privacy/Terms
- Deleting unused `src/three/*` and `SoftCursor` (dead code; safe follow-up, not required for this polish)

## Verify locally

```bash
npm run lint
npm run build
node scripts/ui-agent-viewport-check.mjs
```

Verified 2026-07-24:
- `npm run lint` / `npm run build` — pass
- Viewport overflow check — no horizontal overflow at 375 / 768 / 1280 / 1920
- Screenshots — `Mernify.md/screenshots/ui-agent/home-{375,768,1280,1920}.png`
