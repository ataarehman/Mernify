# Phase 1: Project and Route Inventory

**Audit Date:** 2026-07-30  
**Auditor Team:** Cross-functional senior audit team  
**Live URL:** https://mernify.co/  
**Primary Codebase:** `C:\Users\MT\Projects\mernify` (deployed)  
**Supporting Codebase:** `C:\Users\MT\mernify-site` (earlier/parallel development branch)

---

## 1.1 Technical Profile

| Area | Details |
|------|---------|
| Framework | React 19.1.0 + Vite 7.0.4 |
| Language | JavaScript (JSX) — no TypeScript |
| Routing | react-router-dom v7.6.3 — BrowserRouter + nested Routes |
| Styling | CSS Modules + global token sheet (`src/styles/tokens/tokens.css`) |
| Animation | GSAP 3.13.0 + ScrollTrigger, Lenis 1.3.8 (smooth scroll) |
| 3D | Three.js 0.178.0 (hero atmosphere scene) |
| Icons | lucide-react 1.26.0, simple-icons 16.27.0 |
| Fonts | @fontsource/instrument-sans, @fontsource/phudu |
| SEO | `PageMeta` component per route, global fallback in `index.html` |
| Build target | ES2020 |
| CSS splitting | Enabled (`cssCodeSplit: true`) |
| Source maps | **Enabled in production** (`sourcemap: true`) — security risk |
| Analytics | **None detected** |
| CMS | None — content in JS files (`src/content/`) |
| Form backend | mailto fallback or `VITE_CONTACT_ENDPOINT` environment variable |

---

## 1.2 Dependency Inventory

### Production Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| react | 19.1.0 | UI framework |
| react-dom | 19.1.0 | DOM rendering |
| react-router-dom | 7.6.3 | Client-side routing |
| gsap | 3.13.0 | Animations + ScrollTrigger |
| lenis | 1.3.8 | Smooth scroll |
| three | 0.178.0 | WebGL hero scene |
| lucide-react | 1.26.0 | Icon set |
| simple-icons | 16.27.0 | Tech brand SVG paths |
| @fontsource/instrument-sans | 5.3.0 | Primary font |
| @fontsource/phudu | 5.3.0 | Display/heading font |

### Notable Observations
- **Three.js** is a 300KB+ dependency used only for the hero atmosphere background. This significantly inflates the main bundle.
- **No analytics library** (Google Analytics, Segment, PostHog, etc.).
- **No form processing library** — custom implementation with mailto fallback.
- **No testing framework** — Playwright is installed as a dev dependency but no test suite is wired.
- **No sitemap generation** — sitemap.xml is manually maintained.

---

## 1.3 Project Structure

```
Projects/mernify/
├── src/
│   ├── app/
│   │   ├── App.jsx                  # Root component with BrowserRouter
│   │   ├── router.jsx               # Route definitions
│   │   └── providers/               # Motion, ReducedMotion providers
│   ├── components/
│   │   ├── case-study/              # CaseStudyCard, CaseStudyDetail
│   │   ├── forms/                   # ContactForm, Field components
│   │   ├── layout/                  # PageHero, PageCta, RootLayout, etc.
│   │   ├── media/                   # TechMark, MediaStrip
│   │   ├── navigation/              # SiteHeader, SiteFooter
│   │   ├── seo/                     # PageMeta
│   │   └── ui/                      # Button, Container, Heading, Text, etc.
│   ├── content/
│   │   ├── caseStudies.js           # Published + pending case study data
│   │   ├── navigation.js            # Nav links, CTA labels
│   │   ├── pages.js                 # About, Contact, Privacy, Terms content
│   │   └── services.js              # Service data
│   ├── pages/                       # Route-level page components
│   └── styles/
│       ├── tokens/tokens.css        # Design tokens (--mf-*)
│       └── global.css               # Global resets + base styles
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   ├── sitemap.xml
│   └── portfolio/                   # Case study images
├── index.html                       # SPA shell with global SEO fallback
├── package.json
└── vite.config.js
```

---

## 1.4 Route Inventory

> **IMPORTANT UPDATE — July 30, 2026:** Live browser testing revealed the production nginx server does not have the correct SPA fallback. React Router routes only work within a client-side session (after initial page load). Direct URL access and external links to inner pages return wrong content or error codes. See `02-functional-qa-audit.md` for full findings.

### Primary Routes (from `src/app/router.jsx` + Live Browser Testing)

| Route | Component | Code Status | **Live Status** | Notes |
|-------|-----------|-------------|-----------------|-------|
| `/` | `HomePage` | ✅ Active | ✅ Works | Full homepage with client logos, 6 case studies, team photos |
| `/services` | `ServicesPage` | ✅ Active | ❌ Shows "About" content | nginx routing failure |
| `/services/:slug` | `ServiceDetailPage` | ✅ Active | ❌ Mixed (some 404, some wrong) | `/saas-development` → 404; `/mobile-app-development` → wrong content |
| `/industries` | `IndustriesPage` | ✅ Active | Not tested | |
| `/case-studies` | `CaseStudiesPage` | ✅ Active | ❌ **403 Forbidden** | nginx 403 on direct access |
| `/case-studies/:slug` | `CaseStudyPage` | ✅ Active | Not tested | Assumed broken due to parent route issue |
| `/process` | `ProcessPage` | ✅ Active | ❌ **404 Not Found** | |
| `/about` | `AboutPage` | ✅ Active | ❌ Shows footer/blank | nginx routing failure |
| `/contact` | `ContactPage` | ✅ Active | ❌ Shows "Services" content | nginx routing failure |
| `/privacy` | `PrivacyPage` | ✅ Active | Not tested | |
| `/terms` | `TermsPage` | ✅ Active | Not tested | |
| `/work` | `CaseStudiesPage` | ✅ Redirect | ❌ Assumed 403 (same as /case-studies) | |
| `*` | `NotFoundPage` | ✅ Active | ✅ Custom 404 works | Tested — correct 404 page shown |

### Service Detail Routes (from `src/content/services.js`)

| Route | Service | Status |
|-------|---------|--------|
| `/services/product-engineering` | Product Engineering | ✅ Active |
| `/services/saas-development` | SaaS Development | ✅ Active |
| `/services/web-development` | Web Development | ✅ Active |
| `/services/mobile-app-development` | Mobile App Development | ✅ Active |
| `/services/ai-integration` | AI Integration | ✅ Active |
| `/services/workflow-automation` | Workflow Automation | ✅ Active |
| `/services/ui-ux-design` | UI/UX Design | ✅ Active |
| `/services/cloud-devops` | Cloud & DevOps | ✅ Active |
| `/services/api-development` | API Development | ✅ Active |
| `/services/dedicated-product-teams` | Dedicated Teams | ✅ Active |

### Case Study Routes

| Route | Status | Published | Notes |
|-------|--------|-----------|-------|
| `/case-studies/tailorize` | ✅ Active | Yes | AI tailoring platform, Saudi Arabia |
| `/case-studies/mrzzm` | ✅ Active | Yes | (TBC from content) |
| `/case-studies/spaceworx` | ✅ Active | Yes | (TBC from content) |
| `/case-studies/saas-operations-platform` | Pending | No | `noIndex` — not published |
| `/case-studies/field-service-mobile` | Pending | No | `noIndex` — not published |
| `/case-studies/ai-document-workflow` | Pending | No | `noIndex` — not published |

---

## 1.5 Navigation Sources

### Header Navigation (SiteHeader)
- Services → `/services`
- Work → `/case-studies` (or `/work` which redirects)
- About → `/about`
- Contact → `/contact`
- CTA: "Discuss Your Project" → `/contact`

**Missing from header navigation:**
- Process (only in footer)
- Industries (only in footer? — needs verification)
- Individual service links

### Footer Navigation (SiteFooter)
- **Company column:** Services, Work, About, Contact, Process
- **Services column:** Web & SaaS, Mobile Apps, AI & Automation, Product Design, Support (all pointing to `/services`)
- **Legal:** Privacy, Terms

**Issues identified in footer:**
- All service links in footer column point to `/services` (not individual service detail pages)
- No social media links
- No phone number or physical address
- `hello@mernify.com` email — ownership and monitoring not verified in code

### Sitemap (`public/sitemap.xml`)
- References `https://mernify.com/` (without `.co`) — **CRITICAL DOMAIN MISMATCH**
- Contains: home, 10 service pages, industries, case-studies, process, about, contact, privacy, terms
- Missing: `/work` alias (acceptable since it redirects)
- Missing: individual case study URLs (likely intentional — unpublished)

---

## 1.6 Known Missing Pages

| Missing Page | Business Impact | Priority |
|-------------|-----------------|---------|
| Blog / Resources | No content marketing, no SEO long-tail capture | P2 |
| Pricing page | Buyers cannot qualify cost; high friction | P2 |
| FAQ standalone page | SEO opportunity; trust reduction | P2 |
| Team/Leadership page | No named team members builds distrust | P1 |
| Industry vertical pages (depth) | Missing specificity for enterprise buyers | P2 |
| Partner/Agency page | Missed B2B partner channel | P3 |
| Success/Thank-you page | No post-conversion confirmation or analytics event | P1 |

---

## 1.7 Orphan and Broken Route Analysis

| Issue | Route | Severity | Notes |
|-------|-------|---------|-------|
| Sitemap domain mismatch | All sitemap URLs | P0 | URLs say `mernify.com` but site is at `mernify.co` |
| Source maps exposed | All routes | P1 | `sourcemap: true` in production vite config |
| Footer service links undifferentiated | All footer services | P2 | All 5 service links → `/services` (not slugged) |
| No `/work` 301 redirect header | `/work` | P2 | SPA redirect is client-side only; not an HTTP redirect |
| Privacy/Terms footer might be `<span>` | Footer | P2 | Earlier version used spans; verify deployed state |
| Hero marked "NOT APPROVED / parked" | `/` | P1 | Hero code comment says "parked for future redesign" but is live |

---

## 1.8 Navigation Source Completeness

| Page/Route | Header | Footer | Sitemap | CTA Button | Internal Link | Status |
|-----------|--------|--------|---------|-----------|--------------|--------|
| `/` | Logo | Logo | ✅ | — | — | ✅ |
| `/services` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/services/:slug` | ❌ | Partial | ✅ | — | ✅ | Partial |
| `/industries` | ❌ | ❌ | ✅ | — | ? | Orphan risk |
| `/case-studies` | Via "Work" | Via "Work" | ✅ | ✅ | ✅ | ✅ |
| `/case-studies/:slug` | ❌ | ❌ | ❌ | — | From index | Partial |
| `/process` | ❌ | ✅ | ✅ | — | ? | Partial |
| `/about` | ✅ | ✅ | ✅ | — | — | ✅ |
| `/contact` | ✅ (CTA) | ✅ | ✅ | ✅ | Multiple | ✅ |
| `/privacy` | ❌ | ✅ | ✅ | — | From contact form | Partial |
| `/terms` | ❌ | ✅ | ✅ | — | — | Partial |
| `/404` | ❌ | ❌ | ❌ | — | — | System |

**Key Finding:** `/industries` is not linked from the header navigation. Users can only reach it via the sitemap, footer (if linked), or direct URL. This is an **orphan page risk**.

---

## 1.9 Build and Configuration Issues

| Issue | File | Severity | Description |
|-------|------|---------|-------------|
| Source maps in production | `vite.config.js` | P1 | `sourcemap: true` exposes full source code to anyone who opens DevTools |
| Sitemap domain wrong | `public/sitemap.xml` | P0 | All URLs say `mernify.com` not `mernify.co` |
| No environment config template | Root | P2 | `VITE_CONTACT_ENDPOINT` not documented in `.env.example` |
| SitePreviewProxy in vite.config | `vite.config.js` | P3 | Dev-only proxy left in config; harmless in production but adds noise |
| No `prerender` or SSR | `vite.config.js` | P2 | SPA-only delivery; impacts social sharing previews and SEO |

---

## 1.10 Testing Infrastructure

| Area | Status | Notes |
|------|--------|-------|
| Unit tests | ❌ None | No test files found |
| Integration tests | ❌ None | Playwright installed but no test suite wired |
| E2E tests | ❌ None | `scripts/` folder has manual preview scripts only |
| Linting | ✅ Configured | `eslint` with react-hooks + react-refresh plugins |
| Type checking | ❌ None | JS only, no TypeScript or JSDoc-based type checking |
| Build verification | ✅ Passes | `npm run build` reported passing |
| CI/CD | Unknown | Not visible in repository |
