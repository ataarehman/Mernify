# Phase 6: SEO Audit

**Audit Date:** 2026-07-30  
**Method:** Source code analysis, sitemap inspection, robots.txt review  
**Live URL:** https://mernify.co/

---

## 6.1 Technical SEO Checklist

| Check | Status | Notes |
|-------|--------|-------|
| HTTPS | ✅ Pass | Live site at https:// |
| Unique page titles | ✅ Pass | `PageMeta` per route |
| Meta descriptions | ✅ Pass | Per route via `PageMeta` |
| H1 per page (exactly 1) | ✅ Pass | `PageHero` renders H1; verified in prior QA |
| Canonical tags | ✅ Pass | `canonicalPath` prop in `PageMeta` |
| robots.txt | ✅ Present | `public/robots.txt` — Allow all |
| sitemap.xml | ⚠️ Wrong domain | References `mernify.com` not `mernify.co` |
| Favicon | ✅ Pass | `favicon.svg` |
| Open Graph tags | ❌ Missing | No OG meta tags found in `index.html` or PageMeta |
| Twitter/X card tags | ❌ Missing | No Twitter card meta tags |
| Mobile usability | ✅ Pass | Responsive design |
| Structured data (JSON-LD) | ❌ Missing | No Schema.org markup |
| Image alt text | ✅ Pass | Alt text on all meaningful images |
| Internal linking | ⚠️ Partial | Footer service links undifferentiated |
| URL quality | ✅ Good | Clean slugs, lowercase, hyphenated |
| Robots meta (noindex) | ✅ Pass | `noIndex` on pending case studies |
| 404 handling | ✅ Pass | `NotFoundPage` renders |
| Redirect behavior | ⚠️ Client-side only | `/work` → `/case-studies` is JS redirect |
| Duplicate content | ✅ No duplicates | Canonical tags prevent issues |
| Crawlable content | ⚠️ SPA risk | JavaScript-rendered content may not be indexed |
| Page speed | ⚠️ Risk | Large JS bundle (see Performance Audit) |

---

## 6.2 Critical SEO Issues

### Issue SEO-001 (P0): Sitemap Domain Mismatch

**Evidence:** `public/sitemap.xml`  
**Observed:** All URLs reference `https://mernify.com/` (note: `.com`)  
**Expected:** `https://mernify.co/` (the actual live domain)  
**Business Impact:**  
- Google Search Console cannot verify sitemap URLs against the registered property
- Googlebot following sitemap URLs will reach the wrong domain (or get 404/redirects)
- All indexed pages lose their sitemap priority signal
- Backlinks to `mernify.com` (if any) may go to the wrong destination  
**Severity:** P0  
**Fix:** Replace all occurrences of `mernify.com` with `mernify.co` in `sitemap.xml`  
**Effort:** XS (10 minutes)

### Issue SEO-002 (P1): Missing Open Graph Metadata

**Evidence:** `index.html` has no `<meta property="og:*">` tags; `PageMeta` component needs inspection  
**Observed:** No Open Graph title, description, image, or type tags  
**Business Impact:**  
- Sharing Mernify links on LinkedIn, Slack, WhatsApp, Twitter/X shows no preview card
- This directly harms cold outreach effectiveness — a salesperson sharing a link to a prospect gets a blank/generic preview
- LinkedIn is the primary B2B social channel; no OG means no visual impression  
**Recommended OG tags per page:**
```html
<meta property="og:type" content="website" />
<meta property="og:url" content="https://mernify.co/" />
<meta property="og:title" content="Mernify — We Design, Engineer & Scale Digital Products" />
<meta property="og:description" content="..." />
<meta property="og:image" content="https://mernify.co/og-image.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:site_name" content="Mernify" />
```
**Effort:** S (half day — implement in PageMeta + create OG image)

### Issue SEO-003 (P1): Missing Twitter/X Card Metadata

**Evidence:** No `<meta name="twitter:*">` tags in `index.html`  
**Business Impact:** Twitter/X previews show no card when links shared  
**Recommended:**
```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@mernify" />
<meta name="twitter:title" content="..." />
<meta name="twitter:description" content="..." />
<meta name="twitter:image" content="..." />
```
**Effort:** XS

### Issue SEO-004 (P1): No Structured Data (Schema.org)

**Evidence:** No JSON-LD scripts in `index.html` or page components  
**Business Impact:**  
- No rich results in Google Search (sitelinks, FAQ, breadcrumbs)
- Google cannot understand Mernify as a business entity
- Missing opportunity for "Organization" knowledge panel  
**Recommended schemas:**
```
Organization → homepage
ProfessionalService → services pages
WebSite → homepage (enables sitelinks searchbox)
Service → individual service pages
BreadcrumbList → service detail, case study pages
FAQPage → FAQ content (where it exists)
```
**Effort:** S

### Issue SEO-005 (P2): SPA Content Indexability

**Description:** Mernify is a React SPA (Single Page Application). All content is rendered by JavaScript. Googlebot can render JavaScript, but:
- Rendering is delayed relative to HTML content
- Dynamic content may be indexed with a delay of hours to days
- Some sections may not index fully if they depend on user interaction to reveal content  
**Business Impact:** SEO effectiveness is reduced for all content-heavy pages  
**Recommendation:** Consider adding a prerender/SSG layer for marketing pages using a tool like Cloudflare Workers, Netlify prerendering, or migrating to Next.js for marketing pages.

### Issue SEO-006 (P1): Missing `/work` Canonical Redirect

**Description:** `/work` maps to `CaseStudiesPage` in the router (client-side alias). However, this is not an HTTP 301 redirect — it's a JavaScript router match. Search engines that follow links to `/work` may see it as a separate URL, potentially creating duplicate content between `/work` and `/case-studies`.  
**Recommendation:** Configure the server to issue an HTTP 301 redirect from `/work` to `/case-studies`.

---

## 6.3 Per-Route SEO Analysis

| Route | Title | Description | H1 | Canonical | OG | Schema |
|-------|-------|------------|-----|-----------|-----|--------|
| `/` | ✅ Unique | ✅ Present | ✅ | ✅ | ❌ Missing | ❌ Missing |
| `/services` | ✅ Via PageMeta | ✅ | ✅ | ✅ | ❌ | ❌ |
| `/services/:slug` (×10) | ✅ Per service | ✅ | ✅ | ✅ | ❌ | ❌ |
| `/industries` | ✅ Via PageMeta | ✅ | ✅ | ✅ | ❌ | ❌ |
| `/case-studies` | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ |
| `/case-studies/:slug` | ✅ Per case | ✅ | ✅ | ✅ | ❌ | ❌ |
| `/process` | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ |
| `/about` | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ |
| `/contact` | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ |
| `/privacy` | ✅ | ✅ | ✅ | ✅ | N/A | ❌ |
| `/terms` | ✅ | ✅ | ✅ | ✅ | N/A | ❌ |

---

## 6.4 robots.txt Analysis

```
User-agent: *
Allow: /

Sitemap: /sitemap.xml
```

**Status:** Acceptable but minimal.  
**Issues:**
- `/sitemap.xml` should be a full absolute URL: `Sitemap: https://mernify.co/sitemap.xml`
- Consider blocking crawl of any staging/dev paths if they exist
- No `Disallow` directives — acceptable for a public marketing site

---

## 6.5 Content SEO Evaluation

### Keyword Alignment

| Target Service | Page Exists | Keyword in H1/Title | Search Intent Addressed |
|----------------|------------|--------------------|-----------------------|
| MERN Stack Development | Via `/services/saas-development` | ⚠️ Not primary keyword | Mixed — MERN not featured prominently |
| SaaS Development | `/services/saas-development` | ✅ Expected | ✅ |
| MVP Development | — | ❌ No dedicated page | ❌ |
| React Development | ⚠️ Partial | ❌ Not a dedicated page | Missed |
| Node.js Development | ⚠️ Partial | ❌ Not a dedicated page | Missed |
| AI Software Development | `/services/ai-integration` | ✅ Expected | ✅ |
| Mobile App Development | `/services/mobile-app-development` | ✅ Expected | ✅ |
| Web App Development | `/services/web-development` | ✅ Expected | ✅ |
| Product Engineering | `/services/product-engineering` | ✅ Expected | ✅ |
| Dedicated Development Teams | `/services/dedicated-product-teams` | ✅ Expected | ✅ |

### Missing High-Value Landing Pages

| Missing Page | Search Intent | Target Audience | Estimated Monthly Searches |
|-------------|--------------|-----------------|--------------------------|
| `/services/mvp-development` | Commercial — "build my MVP" | Startup founders | High |
| `/services/mern-stack-development` | Informational/Commercial | CTOs, Tech managers | High |
| `/services/react-development` | Commercial | Product managers | High |
| `/industries/saas` | Commercial | SaaS founders | Medium |
| `/industries/healthcare` | Commercial | Healthcare CTOs | Medium |
| `/industries/fintech` | Commercial | Fintech founders | Medium |
| `/blog` | Informational — content marketing | Organic traffic | High long-term |

---

## 6.6 Internal Linking Analysis

| Quality | Status | Notes |
|---------|--------|-------|
| Service detail pages linked from service index | ✅ Yes | |
| Service detail pages linked from footer | ❌ All → `/services` | Missed opportunity |
| Case studies linked from homepage | ⚠️ Via CTA | No inline links to specific case studies |
| Process page linked from services | Unknown | Need to verify |
| About page linked from service pages | Unknown | |
| Blog posts linking to services | ❌ No blog | |
| Related case studies | ✅ Present | `related` array in case study data |

---

## 6.7 Structured Data Recommendations

### Homepage (Organization)
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Mernify",
  "url": "https://mernify.co",
  "email": "hello@mernify.com",
  "description": "Product engineering company building web, mobile, SaaS, and AI-powered products",
  "serviceArea": "Worldwide",
  "sameAs": [
    "https://linkedin.com/company/mernify",
    "https://twitter.com/mernify"
  ]
}
```

### Service Pages (Service)
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "SaaS Development",
  "provider": { "@type": "Organization", "name": "Mernify" },
  "description": "...",
  "url": "https://mernify.co/services/saas-development"
}
```

### Case Study Pages (Article or CreativeWork)
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Tailorize Case Study — AI-Fitted Custom Tailoring Platform",
  "description": "...",
  "author": { "@type": "Organization", "name": "Mernify" }
}
```

---

## 6.8 SEO Priority Issues Summary

| ID | Issue | Severity | Effort |
|----|-------|---------|--------|
| SEO-001 | Sitemap domain mismatch (mernify.com vs mernify.co) | P0 | XS |
| SEO-002 | Missing Open Graph metadata on all pages | P1 | S |
| SEO-003 | Missing Twitter/X card metadata | P1 | XS |
| SEO-004 | No structured data (Schema.org) | P1 | S |
| SEO-005 | SPA indexability risk | P2 | L |
| SEO-006 | `/work` is client-side alias (not 301 redirect) | P2 | XS |
| — | No blog or content marketing | P2 | XL |
| — | Missing MVP development landing page | P2 | M |
| — | Missing industry-specific landing pages | P2 | L |
| — | Internal linking from footer undifferentiated | P2 | XS |
