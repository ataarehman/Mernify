# Mernify — Developer Handoff

**Branch:** `main` · **Repo:** https://github.com/AgsQaintern/mernify  
**Last push:** 27 Jul 2026 · commit `5e118af`  
**Dev server:** `pnpm dev` → http://localhost:5174

---

## What Was Done

A complete homepage redesign replacing the original generic SaaS template with a distinctive, interactive experience. All changes are committed and pushed to `main`.

### Stack (unchanged, already installed)
| Tool | Version |
|---|---|
| React | 19 |
| Vite | 7 |
| React Router | 7 |
| GSAP | 3.13 |
| Lenis | 1.3.8 |
| Three.js | 0.178 |

---

### New Pages & Routes

| Route | Component | Status |
|---|---|---|
| `/` | `HomePage` | ✅ Done |
| `/services` | `ServicesPage` | ✅ Done |
| `/services/:slug` | `ServiceDetailPage` | ✅ Done |
| `/industries` | `IndustriesPage` | ✅ Done |
| `/case-studies` | `CaseStudiesPage` | ✅ Done |
| `/case-studies/:slug` | `CaseStudyPage` | ✅ Done |
| `/process` | `ProcessPage` | ✅ Done |
| `/about` | `AboutPage` | ✅ Done |
| `/contact` | `ContactPage` | ✅ Done |
| `/privacy` | `PrivacyPage` | ✅ Done |
| `/terms` | `TermsPage` | ✅ Done |
| `/*` | `NotFoundPage` (404) | ✅ Done |

All routes are lazy-loaded via `React.lazy` + `Suspense`.

---

### Homepage Sections (in render order)

| # | Section | File | What it does |
|---|---|---|---|
| 1 | **Hero** | `HomeHero.jsx` | Three.js cinematic scene (Mernify M-mark assembles from geometric modules). CSS/SVG fallback when WebGL unavailable. GSAP entrance animation. Cursor parallax. |
| 2 | **Trust** | `HomeTrust.jsx` | Editorial trust signals — no fake logos or client names. |
| 3 | **Product Story** | `HomeProductStory.jsx` | Scroll-pinned 4-stage canvas (Define → Design → Engineer → Scale) using GSAP ScrollTrigger on desktop; IntersectionObserver on mobile. |
| 4 | **Services** | `HomeServices.jsx` | Service card grid linking to `/services/:slug`. |
| 5 | **Work** | `HomeWork.jsx` | Shows published case studies. Currently renders "preparing for publication" state — no fake metrics. |
| 6 | **Industries** | `HomeIndustries.jsx` | Selectable industry nav that updates a central product environment canvas with challenge / solution / users / zones. |
| 7 | **AI Workflow** | `HomeAi.jsx` | Auto-advancing step-by-step AI demo with play/pause. Scenario switcher. No page-level scroll side effects. |
| 8 | **Technology** | `HomeTechnology.jsx` | Architecture layer stack — hover/select highlights role, technologies, and connections. Side panel on desktop, accordion on mobile. |
| 9 | **Process** | `HomeProcess.jsx` | Engagement process timeline. |
| 10 | **Human** | `HomeHuman.jsx` | Editorial "human partnership" section. Typography-led, no stock photos. |
| 11 | **FAQ** | `HomeFaq.jsx` | Accordion FAQ. |
| 12 | **Final CTA** | `HomeFinalCta.jsx` | GSAP ScrollTrigger assembles M-mark modules on scroll-into-view. Two CTA buttons. |

---

### Key Files to Know

```
src/
  styles/tokens/tokens.css       ← All --mf-* design tokens (extended with motion + surface tokens)
  components/
    media/HeroScene.jsx          ← Three.js scene (lazy-loaded chunk)
    media/HeroModulesFallback.jsx ← SVG/CSS fallback for no-WebGL environments
    navigation/SiteHeader.jsx    ← Header: transparent → blur-on-scroll, mobile full-screen menu
    navigation/SiteFooter.jsx    ← Footer
    ui/Button.jsx                ← Shared button component (primary / ghost / outline variants)
    layout/PageHero.jsx          ← Reusable page hero for inner pages
    forms/ContactForm.jsx        ← Contact form (currently logs to console — needs backend)
  content/
    caseStudies.js               ← Case study data (all status: 'pending' — see below)
    industries.js                ← Industry data for HomeIndustries
    ai.js                        ← Scenarios and steps for HomeAi
    services.js                  ← Services list with slugs
    faq.js                       ← FAQ items
    process.js                   ← Process timeline steps
  lib/
    submitContactForm.js         ← Stub — replace with real API call
```

---

### Design Tokens

All tokens in `src/styles/tokens/tokens.css` use the `--mf-` prefix.  
Key additions made during this redesign:

```css
--mf-ease-spring          /* spring easing for assembly animations */
--mf-dur-xl / --mf-dur-cinematic
--mf-surface-1 / --mf-surface-2 / --mf-surface-glass
--mf-border-subtle
--mf-grid-line            /* grid overlay on hero */
--mf-gradient-radial-indigo / --mf-gradient-radial-cyan
--mf-section-overlap / --mf-section-pad-y-sm
```

---

## What Remains (Handoff Items)

### 1. Case Studies — Content Needed
All three case studies are `status: 'pending'` in `src/content/caseStudies.js`.  
The site correctly shows "preparing for publication" states — **do not invent metrics or client names**.  
When a client approves, update the matching entry:

```js
// src/content/caseStudies.js
{
  slug: 'saas-operations-platform',
  status: 'published',          // ← change this
  title: '...',
  challenge: '...',             // ← fill these in
  solution: '...',
  outcome: '...',               // verified outcomes only
  testimonial: null,            // only if client explicitly approved
}
```

### 2. Contact Form — Backend Integration
`src/lib/submitContactForm.js` is a stub that currently logs to console.  
Replace the body with a real `fetch` call to your API / email service (Resend, Formspree, EmailJS, etc.):

```js
// src/lib/submitContactForm.js
export async function submitContactForm(data) {
  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Submission failed')
  return res.json()
}
```

### 3. SEO / Meta
`src/components/seo/PageMeta.jsx` uses `document.title` + basic meta tags.  
For production, wire it into a proper `<Helmet>` provider or upgrade to a meta-tag solution that supports Open Graph + Twitter Card.

### 4. Sitemap
`public/sitemap.xml` is a static file with hardcoded URLs.  
Update the domain (`https://mernify.com` placeholder) and automate generation if routes change.

### 5. Analytics
No analytics are wired. Add your preferred provider (GA4, PostHog, Plausible) in `src/main.jsx` or `RootLayout.jsx`.

### 6. Deployment
The project builds with `pnpm build` → outputs to `dist/`.  
It's a standard SPA — configure your host (Vercel, Netlify, etc.) to redirect all routes to `index.html`.  
Set `base` in `vite.config.js` if deploying to a sub-path.

### 7. Environment Variables
`.env.example` is committed. Copy to `.env.local` and fill in:
- API endpoints for contact form
- Any analytics keys

---

## Rules — Do Not Break

- **No fake metrics** — never add percentage improvements, download counts, revenue figures, or user counts that are not verified and client-approved.
- **No invented client names** — case studies stay pending until a real client approves.
- **No testimonials** — not present anywhere; do not add without real approval.
- **Reduced motion** — all GSAP and CSS animations check `prefers-reduced-motion`. Keep this.
- **Three.js is lazy-loaded** — `HeroScene.jsx` must stay in its own dynamic `import()`. Do not move it into the main bundle.

---

## Running Locally

```bash
# install
pnpm install

# dev server
pnpm dev
# → http://localhost:5173  (or 5174 if 5173 is taken)

# lint
pnpm lint

# production build
pnpm build
```

QA screenshots are in `docs/screenshots/wow-factor/` if you need visual references across breakpoints.
