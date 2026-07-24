# 11 — Asset & Content Policy

**Status:** Mandatory from this point forward  
**Applies to:** All homepage sections, inner pages, marketing surfaces  

---

## Core rule

**Placeholder content is NOT allowed** unless the user explicitly approves a temporary stand-in for a named asset or copy block.

Every visible text string, image, video, icon, illustration, and 3D treatment must be intentional, brand-aligned, and production-quality.

---

## Authorized asset sources

You may use:

| Type | Guidance |
|------|----------|
| Royalty-free premium photography | Business/product authenticity; modern work environments; real product UI in use |
| Device mockups | High-quality, contemporary frames; no outdated bezels as hero focus |
| Background video | Sparse use; muted; poster-first; pause offscreen |
| Open-source SVG illustrations | Geometric / modular / product-system language only |
| Icon libraries | Lucide, Phosphor, Tabler, or custom SVG — **one family sitewide** |
| Original Three.js | Preferred for signature atmosphere |
| Original UI compositions | Glass/panels only when they clarify product craft |

### Preferred free/legal libraries (examples)

- Unsplash / Pexels / similar clear-license photo sources (verify license per asset)  
- Lucide / Phosphor / Tabler for icons  
- Self-created SVGs under project ownership  

Record attribution in `docs/assets-attribution.md` when a license requires it.

---

## Visual quality bar

Every asset must feel:

- Modern  
- Premium  
- Authentic  
- Relevant to **software product development**  
- Aligned to Mernify Brand Guidelines (indigo/cyan/navy, Modular Clarity)

### Avoid

- Generic “programmer with laptop” clichés  
- AI-looking illustrations  
- Low-quality stock  
- Cheap / cliché gradients as the main idea  
- Template-looking collage kits  
- Cartoon illustration styles  
- Fake logos, fake metrics, lorem ipsum  
- Neon cyber / hologram handshake tropes (Brand Guidelines)

---

## Competitor study rule

You may study for **quality inspiration only**:

- Cuberto  
- Narsun Studios  
- Elytra Studios  
- tkxel  
- SSI Decisions  
- Digital Minds  

**Forbidden:**

- Downloading or reusing their copyrighted images, video, icons, illustrations, or design files  
- One-to-one layout recreation  
- Copying distinctive motion recipes or brand marks  

---

## Homepage / section implications

| Section | Content expectation |
|---------|---------------------|
| Hero | Real brand copy (already locked); original Three.js / own UI motif — no fake case media |
| Trust | Real client marks **or** real technology partner marks — otherwise omit section |
| Work | Real case media + outcome titles — otherwise omit |
| Testimonials | Real quotes only — otherwise omit |
| Offers / Services | Real service copy from brand IA — no “lorem” bullets |

If authentic proof assets are missing, **hide the section** rather than inventing placeholders (per Homepage Spec empty-state rules).

---

## Implementation checklist (per asset)

- [ ] License allows commercial site use  
- [ ] Resolution/format optimized (AVIF/WebP/SVG)  
- [ ] Dimensions reserved (no CLS)  
- [ ] Alt text written (or empty if decorative)  
- [ ] Matches Modular Clarity (not generic agency stock)  
- [ ] Does not resemble a competitor’s proprietary visual  
- [ ] Logged in attribution file if required  

---

## Relationship to other docs

This policy extends:

- Brand Guidelines / Brand Board  
- `06-brand-source-of-truth.md`  
- `07-creative-direction-and-experience-blueprint.md`  
- `08-homepage-experience-spec.md`  
- `09-section-self-review-gate.md`  

**Conflict rule:** Brand truth + this policy win over convenience.
