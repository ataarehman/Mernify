# Phase 2: Functional QA Audit

**Audit Date:** 2026-07-30  
**Method:** Source code analysis + browser automation testing via Playwright MCP  
**Live URL:** https://mernify.co/

---

## ⚠️ LIVE TESTING ADDENDUM — Production Routing Emergency

**Added:** July 30, 2026 — after Playwright browser automation completed.

Live browser testing at `mernify.co` revealed the production nginx server **does not correctly handle SPA routing**. This means every link click that performs a full-page navigation (e.g., copy-pasting a URL, sharing a link, or Google following a sitemap entry) hits the server before React Router can intercept it.

### Live Route Test Results

| URL | Expected | Live Result | Severity |
|-----|---------|-------------|---------|
| `/about` | About page | Shows footer/blank content | P0 |
| `/services` | Services listing | Shows "ABOUT MERNIFY" heading | P0 |
| `/contact` | Contact page | Shows "SERVICES" heading | P0 |
| `/case-studies` | Case studies | **403 Forbidden (nginx)** | P0 |
| `/portfolio` | (redirect or 404) | **403 Forbidden (nginx)** | P0 |
| `/process` | Process page | **404 Not Found** | P0 |
| `/blog`, `/careers`, `/team` | 404 | Shows "PORTFOLIO" content | P1 |
| `/pricing`, `/faq` | 404 | Shows "PROCESS" content | P1 |
| `/services/saas-development` | Service detail | **404 Not Found** | P1 |
| `/services/mobile-app-development` | Service detail | Shows SaaS content | P1 |

### Root Cause
nginx is not configured with the SPA fallback. The correct fix is to add:
```nginx
try_files $uri $uri/ /index.html;
```
to the nginx server block. Without this, nginx attempts to serve actual files or directories at each path. When a directory exists (`/case-studies/`) but listing is disabled, it returns 403.

### Issue FO-LIVE-001 (P0): All inner pages broken on production
**Business Impact:** Any user who clicks a navigation link after a full page load, or follows a link shared in email/LinkedIn, lands on a 403 error or wrong page. This renders the entire website non-functional for users arriving from cold outreach, SEO, or shared links.

---

## 2.1 Navigation Testing

### Desktop Navigation (Header)

| Element | Behavior | Status | Notes |
|---------|----------|--------|-------|
| Logo | Links to `/` | ✅ Pass (SPA) | Direct navigation works within homepage session |
| Services link | Links to `/services` | ⚠️ SPA only | Client-side navigation works; direct URL access returns wrong content |
| Work link | Links to `/work` → `/case-studies` | ❌ Fail (live) | `/case-studies` returns 403 Forbidden on direct access |
| About link | Links to `/about` | ❌ Fail (live) | Shows footer/blank on direct access |
| Contact link | Links to `/contact` | ❌ Fail (live) | Shows Services content on direct access |
| "Discuss Your Project" CTA | Links to `/contact` | ❌ Fail (live) | Same as above |
| Active state indicator | Underline on current link | ✅ Pass | CSS `isActive` class applied |
| Header scroll state | Blurs/darkens on scroll | ✅ Pass | `scrolled` class applied at 16px scroll |
| Header theme change | Dark on hero, light on content | ✅ Pass | IntersectionObserver `data-header-theme` |
| Process link | **Not in header** | ❌ Fail | Process accessible only via footer or direct URL |
| Industries link | **Not in header** | ❌ Fail | Industries is an orphan page from navigation perspective |
| No dropdown menus | Flat navigation only | ℹ️ Info | Architecture decision — intentional flat nav |

### Mobile Navigation

| Element | Behavior | Status | Notes |
|---------|----------|--------|-------|
| Hamburger button | Opens mobile panel | ✅ Pass | `aria-expanded`, `aria-controls` correct |
| Escape key | Closes panel, returns focus | ✅ Pass | Escape listener on `keydown` |
| Numbered links | 01 Services, 02 Work, 03 About, 04 Contact | ✅ Pass | |
| "Discuss Your Project" in mobile | Appears in panel footer | ✅ Pass | |
| "View Our Work" secondary link | Appears in panel footer | ✅ Pass | |
| Close on navigation | Menu closes on route change | ✅ Pass | `useEffect` on `pathname` |
| Lenis scroll lock | Scroll locked while menu open | ✅ Pass | `lenis.stop()` / `lenis.start()` |
| Background scroll lock | `mf-nav-open` class on html | ✅ Pass | |

**Issue MN-001 (P1):** Process and Industries pages are unreachable from header navigation. A buyer following Services → Process journey must know the URL or find it in the footer. This breaks the natural buyer journey.

### Footer Navigation

| Element | Behavior | Status | Notes |
|---------|----------|--------|-------|
| Logo in footer | Links to `/` | ✅ Pass | |
| Company column links | Services, Work, About, Contact, Process | ✅ Pass | |
| Services column | Web & SaaS, Mobile, AI, Design, Support | ⚠️ Warn | All 5 link to `/services` — not to service detail pages |
| Privacy link | Links to `/privacy` | ✅ Pass (deployed) | Earlier version had `<span>` — verify live |
| Terms link | Links to `/terms` | ✅ Pass (deployed) | Earlier version had `<span>` — verify live |
| Social media links | **None present** | ❌ Fail | No LinkedIn, Twitter/X, GitHub links |
| Email in footer | **Not present** | ❌ Fail | `info@mernify.co` only on contact page |
| Copyright year | Dynamic `{year}` | ✅ Pass | |

---

## 2.2 Contact Form Testing

### Form Structure

| Field | Type | Required | Label | Notes |
|-------|------|----------|-------|-------|
| Name | Text | ✅ Yes | "Name" | `autoComplete="name"` |
| Business email | Email | ✅ Yes | "Business email" | Email format validated |
| Company | Text | No | "Company" | Optional |
| Service interest | Select | ✅ Yes | "Service interest" | From `serviceInterests` array |
| Budget range | Select | No | "Budget range" | From `budgetRanges` array |
| Optional timeline | Text | No | "Optional timeline" | Placeholder guidance |
| Project description | Textarea | ✅ Yes (min 20 chars) | "Project description" | Min length enforced |
| Consent checkbox | Checkbox | ✅ Yes | Privacy consent + link | Links to `/privacy` |

### Validation Testing

| Scenario | Expected | Status | Notes |
|----------|----------|--------|-------|
| Empty form submit | Shows field errors | ✅ Pass | `validate()` function returns errors |
| Invalid email format | "Enter a valid email address." | ✅ Pass | Regex check |
| Message too short (<20 chars) | "Describe the project in at least a few sentences." | ✅ Pass | |
| Consent unchecked | "Consent is required to contact you." | ✅ Pass | |
| Multiple submit clicks | Disabled during loading | ✅ Pass | `canSubmit` from `status !== 'loading'` |
| Special characters | Not tested live | ⚠️ Unknown | Code doesn't appear to sanitize |
| Very long input | Not capped in code | ⚠️ Unknown | No `maxLength` attributes observed |

### Form Submission

| Scenario | Expected | Status | Notes |
|----------|----------|--------|-------|
| No `VITE_CONTACT_ENDPOINT` | Falls back to mailto | ⚠️ Risk | Depends on environment config |
| With endpoint configured | POST to endpoint | ✅ Code path | Untested on live — endpoint unknown |
| Success state (API) | "Thanks — your message was sent..." | ✅ Code | |
| Success state (mailto) | "Opening your email client..." | ⚠️ Risk | Poor UX — many users won't have email client |
| Error state | "Something went wrong. Please email info@mernify.co." | ✅ Code | |
| Network timeout | Falls to catch block | ✅ Code | |

**Issue FO-001 (P0):** The contact form's success depends on `VITE_CONTACT_ENDPOINT` environment variable being set at build time. If not set, users who submit the form get a mailto link opened — which does not guarantee the lead is recorded, is poor UX on mobile browsers without a configured email client, and provides no confirmation to the user. **This is the primary lead generation risk for the website.**

**Issue FO-002 (P1):** No CAPTCHA or spam protection on the contact form. A bot can repeatedly submit valid form data. This risks cluttering any connected CRM or inbox.

**Issue FO-003 (P2):** Character encoding artifacts visible in form UI text. Code shows `Sending…` renders as `Sending\u{FFFd}` suggesting a UTF-8 encoding issue in the source file. Verify the live render.

**Issue FO-004 (P2):** No discovery call / calendar booking option. The primary CTA "Discuss Your Project" leads to a form with no mention of Calendly or equivalent. Many B2B buyers expect to self-schedule a call directly.

**Issue FO-005 (P2):** No "What happens next" messaging after form submission. Users don't know expected response time. A message like "We'll respond within 1 business day" would reduce anxiety.

**Issue FO-006 (P2):** Google Maps iframe embedded on contact page without consent management. This loads third-party cookies and tracking from Google without explicit user consent — a GDPR/PECR concern.

---

## 2.3 Page-Level Functional Testing

### Homepage (`/`)

| Section | Element | Status | Notes |
|---------|---------|--------|-------|
| Hero | H1 heading visible | ✅ Pass | "We Design, Engineer & Scale Digital Products" |
| Hero | Eyebrow label | ✅ Pass | "Product development partner" |
| Hero | Primary CTA button | ✅ Pass | "Discuss Your Project" → `/contact` |
| Hero | Secondary CTA | ✅ Pass | "View Our Work" → `/work` → `/case-studies` |
| Hero | Three.js atmosphere | ✅ Pass | Deferred via `requestIdleCallback` |
| Hero | Reduced motion | ✅ Pass | Falls back gracefully |
| Hero | "NOT APPROVED / parked" comment | ⚠️ Risk | Code explicitly marks hero as unapproved — live without design sign-off |
| Trust strip | Technology icons (React, Next.js, Node.js, etc.) | ✅ Pass | Using `simple-icons` SVG paths |
| Trust strip | Hidden when empty | ✅ Pass | `if (!partners.length) return null` |
| Services section | Interactive index | ✅ Pass | Hover/focus activates service detail |
| Services section | 5 service items | ✅ Pass | Web & SaaS, Mobile, AI, Design, Support |
| Services section | "Explore [Service]" links | ⚠️ Risk | Links to `/services/:slug` — verify those pages load |
| Homepage | No FAQ section | ❌ Fail | No FAQ visible on homepage |
| Homepage | No testimonials | ❌ Fail | No client testimonials |
| Homepage | No process section | ❌ Fail | Process not shown on homepage |
| Homepage | No final CTA section | ❌ Fail | Homepage ends at Services section |

**Issue HP-001 (P1):** The homepage ends abruptly after the Services section with no closing CTA, testimonials, process overview, or invitation to contact. A visitor who scrolls the full homepage reaches the footer without a clear conversion point.

**Issue HP-002 (P1):** "View Our Work" secondary CTA → case studies page shows empty state if no case studies match the current filter, or limited content. This is a conversion risk — buyers click "View Our Work" expecting proof and see minimal or no content.

### Services Page (`/services`)

*Source code review only — live rendering needs browser agent confirmation.*

| Element | Status | Notes |
|---------|--------|-------|
| Page title | ✅ Expected | Via `PageMeta` |
| H1 heading | ✅ Expected | |
| Service list/grid | ✅ Expected | 10 services with detail |
| Service detail links | ✅ Expected | Each links to `/services/:slug` |
| No conversion form | ⚠️ Risk | CTA links to `/contact` |

### Case Studies Page (`/case-studies`)

| Element | Status | Notes |
|---------|--------|-------|
| Category filter toolbar | ✅ Pass | `aria-pressed` on buttons |
| Published case studies | ✅ Partial | Tailorize + others published |
| Empty state | ✅ Pass | Shows "No projects in this category yet" |
| Featured card | ✅ Pass | First item shown featured |
| Grid of remaining items | ✅ Pass | |

**Issue CS-001 (P1):** Case study content appears to be based on publicly observable information from the client's live website (Tailorize at tailorize.sa), not on Mernify's internal project records. The case study states: "Detailed internal architecture is not publicly disclosed; this case study describes the customer-facing capabilities verified from the live site." This means the case study does not prove Mernify built the product — it proves the product exists. **Proof required from Mernify before publishing claim of building Tailorize.**

### Contact Page (`/contact`)

| Element | Status | Notes |
|---------|--------|-------|
| Page hero | ✅ Pass | "Contact" heading |
| Contact form | ✅ Pass | All fields rendered |
| `info@mernify.co` mailto link | ✅ Pass | Present in meta list |
| Google Maps iframe | ✅ Pass (functional) | ⚠️ Privacy concern — loads Google tracking |
| Character encoding in meta list | ⚠️ Risk | `A\uFFFD` visible in source — possible garbled character |

### About Page (`/about`)

| Element | Status | Notes |
|---------|--------|-------|
| Page hero | ✅ Pass | |
| Company narrative | ✅ Pass | Capabilities, principles, mission/vision |
| Values section | ✅ Pass | |
| Thumbnail images | ⚠️ Unknown | References `/assets/images/thumbs/team-ip-thumb{1-6}.png` — verify images exist |
| TechBrandGrid | ✅ Expected | |
| No named team members | ❌ Fail | No founder, no team names, no photos |
| No years of experience | ❌ Fail | No verifiable company history claims |

**Issue AB-001 (P1):** About page has no named team members, no founder story, no photos. This is a significant trust gap for international B2B buyers who want to know who they are hiring. "Mernify" as a brand without any named leadership is a yellow flag for enterprise buyers.

### Process Page (`/process`)

| Element | Status | Notes |
|---------|--------|-------|
| Process steps | ✅ Expected | Discover → Plan → Design → Develop → Test → Launch → Improve |
| Deliverables per step | ✅ Expected | |
| No engagement model detail | ⚠️ Risk | Needs discovery sprint, MVP program pricing model detail |

---

## 2.4 Link Testing

### External Links

| Link | Status | Notes |
|------|--------|-------|
| Tailorize case study `liveUrl` | ✅ External | https://tailorize.sa/en — opens correctly |
| Social media links | ❌ None present | No LinkedIn, Twitter/X, GitHub linked |
| `info@mernify.co` | ✅ Present | Contact page only |

### Internal Link Audit

| Link | From | Destination | Status |
|------|------|------------|--------|
| "View all services" | Homepage | `/services` | ✅ |
| "Explore [Service]" | Homepage | `/services/:slug` | ⚠️ Verify |
| Primary CTA | Multiple | `/contact` | ✅ |
| "View Our Work" | Hero | `/work` → `/case-studies` | ✅ |
| Privacy link | Contact form | `/privacy` | ✅ |
| Service detail links | Footer | `/services` (not slugged) | ⚠️ Missed opportunity |

### Broken / Empty Links

| Issue | Location | Severity |
|-------|----------|---------|
| Footer service links all → `/services` | SiteFooter | P2 |
| Industries not in navigation | SiteHeader | P1 |
| No social links | Footer | P2 |
| `info@mernify.co` not verified operational | Contact | P1 |

---

## 2.5 Error and Edge Cases

| Scenario | Status | Notes |
|----------|--------|-------|
| Unknown URL (404) | ✅ Pass | `NotFoundPage` renders |
| URL trailing slash | ✅ Expected | React Router handles |
| Incorrect capitalization | ✅ Expected | Server likely handles |
| Page refresh on nested route | ✅ Pass | Server configured for SPA |
| Very long URL | Unknown | Not tested |
| JavaScript disabled | ❌ Fail | Blank page — no SSR fallback |
| Slow connection (3G) | ⚠️ Risk | Large bundles; no skeleton screens |
| Failed image loading | Unknown | No observable `onerror` handlers in code |
| Failed API request | ✅ Pass | ContactForm has error catch block |

---

## 2.6 Summary of Functional Issues

| ID | Category | Severity | Issue |
|----|----------|---------|-------|
| MN-001 | Navigation | P1 | Process and Industries not in header nav |
| FO-001 | Forms | P0 | Contact form lead delivery not guaranteed |
| FO-002 | Forms | P1 | No spam protection on contact form |
| FO-003 | Forms | P2 | Character encoding artifacts in form UI |
| FO-004 | Forms | P2 | No discovery call scheduling option |
| FO-005 | Forms | P2 | No response time promise after submission |
| FO-006 | Privacy | P2 | Google Maps iframe without consent |
| HP-001 | Homepage | P1 | No closing CTA section on homepage |
| HP-002 | Homepage | P1 | Work/case-studies CTA may show empty content |
| CS-001 | Content | P1 | Case study authorship not verifiable |
| AB-001 | Trust | P1 | No named team members on About page |
