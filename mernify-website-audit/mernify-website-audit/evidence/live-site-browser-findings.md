# Live Site Browser Audit Findings

**Source:** Playwright browser automation — July 30, 2026  
**Tested URL:** https://mernify.co/  
**Viewport:** 1440×900 (desktop) + 390×844 (mobile)

---

## KEY DISCOVERY: Live site is MORE complete than analyzed codebase

The deployed production site at `mernify.co` contains sections not present in `C:\Users\MT\Projects\mernify`:
- Client/partner logo carousel with 7 named brands
- 6 case studies visible on the homepage
- 3 professional team member portraits
- Journey/milestones section
- Social media links in footer (Facebook, Instagram, LinkedIn)
- Contact form embedded on the homepage (not only at /contact)

This means several findings in earlier reports require correction — notably the trust, team, and social proof assessments.

---

## Verified Live Content

### Homepage Hero (Exact Text)
- **H1:** "WE DESIGN, ENGINEER & SCALE DIGITAL PRODUCTS FOR STARTUPS AND GROWING BUSINESSES."
- **H2:** "MERNIFY IS A FOCUSED PRODUCT-ENGINEERING PARTNER — HELPING BUSINESSES TRANSFORM IDEAS, WORKFLOWS, AND OPERATIONAL CHALLENGES INTO RELIABLE DIGITAL PRODUCTS."
- **Support:** "We combine modern engineering, product thinking, and structured delivery so teams can launch faster, operate efficiently, and grow confidently."

### Header Navigation (Live)
- Home, About, Services (dropdown indicator), Case Studies, Process, Contact
- CTA: "Discuss Your Project" (cyan button)

### Homepage Sections (Complete List)
1. Hero with headline + dual CTAs
2. Extended subheading (Mernify positioning)
3. Services carousel (6 services: Product Engineering, SaaS Development, Mobile App Dev, AI Integration, Web Development, UI/UX Design)
4. Client logos carousel — **"Brands and product teams we engineer with"** with: GoodBooks Plus, Metro Electric, MRZZM, Servloom, MedBill Ultra, SpaceWorx, Tailorize, GODIVA
5. Case studies section — 6 cards: GoodBooks Plus Analytics (Analytics, SaaS, 01, 2024), MedBill Ultra (Healthcare, RCM, 02, 2024), Metro Electric (Services, Perth, 03, 2025), SpaceWorx (Product, Workspace, 04, 2025), MRZZM (Commerce, Marketplace, 05, 2025), Tailorize (Fashion, Localized, 06, 2025)
6. Journey section — "Growth shaped by product partnerships" (4 milestones)
7. Process section — "A clear path from discovery to launch" (6 steps: Discover, Plan, Design, Develop, Test, Launch)
8. Senior-led delivery — "Complex technology. Clear partnership" (3 pillars: Direct Communication, Transparent Delivery, Product Ownership)
9. **Team photos section** — 3 professional portraits with "About Mernify" CTA
10. **Contact form** — "Tell us about the product you want to build" (full form embedded)
11. Footer

### Footer (Live)
- Email: `info@mernify.co` (clickable mailto)
- Social: Facebook, Instagram, LinkedIn (all present)
- Navigation: HOME, SERVICE, PROJECT, INSIGHT, CONTACT
- Legal: Privacy Policy, Terms of Service
- Copyright: © 2026 Mernify. All rights reserved.
- Tagline: "Modern technology. Reliable execution. Measurable business value."

### SEO (Live — Verified)
- Page title: `Mernify — We Design, Engineer & Scale Digital Products`
- Meta description: `Mernify helps startups, growing businesses, and enterprises build reliable web, mobile, SaaS, and AI-powered products that drive growth and create measurable business value.`
- H1: Present and correct
- Sitemap.xml: ✅ Valid XML exists
- Robots.txt: ✅ Exists (Allow: /, Sitemap: /sitemap.xml)

### Contact Form (Live — Validated)
Fields: Name (required), Business email (required), Company (optional), Service interest (required, 11 options), Budget range (optional, 6 ranges), Optional timeline, Project description (required, min 20 chars), Consent checkbox (required)

**Validation errors observed on empty submit:**
- "Enter your name."
- "Enter your business email."
- "Select a service interest."
- "Describe the project in at least a few sentences."
- "Consent is required to contact you."

**Email validation:** "Enter a valid email address." — ✅ Working

---

## CRITICAL NEW FINDINGS: Routing Failures on Live Site

### P0 — ROUTING SYSTEM IS BROKEN IN PRODUCTION

The most critical finding from live testing: the production server is not correctly serving all routes. Multiple pages show wrong content or error pages.

| URL | Expected | Actual | Severity |
|-----|---------|--------|---------|
| `/about` | About page | Shows footer/blank content | P0 |
| `/services` | Services page | Shows "About" content | P0 |
| `/contact` | Contact page | Shows "Services" heading | P0 |
| `/case-studies` | Case studies | **403 Forbidden** (nginx) | P0 |
| `/portfolio` | Portfolio | **403 Forbidden** (nginx) | P0 |
| `/process` | Process page | **404 Not Found** | P0 |
| `/blog`, `/careers`, `/team` | 404 (expected) | Shows "Portfolio" content | P1 |
| `/pricing`, `/faq` | 404 (expected) | Shows "Process" content | P1 |
| `/services/saas-development` | Service detail | **404 Not Found** | P1 |
| `/services/mobile-app-development` | Service detail | Shows SaaS content | P1 |
| `/services/mern-stack` | 404 (expected) | Shows sitemap.xml | P2 |
| `/404-test-nonexistent-page` | 404 page | ✅ Correct 404 | Pass |

### Root Cause Assessment

This routing failure pattern is consistent with **incorrect SPA fallback configuration on the production nginx server**. When the server does not have `try_files $uri $uri/ /index.html;` configured correctly, React Router cannot handle routes:

1. **Direct URL access** to routes like `/case-studies` reaches nginx before React Router
2. nginx tries to find a directory or file at that path
3. If a directory exists but directory listing is blocked → **403 Forbidden**
4. If no file/directory → may fall through to another route or **404**
5. The "wrong content" pattern (services shows About, contact shows Services) suggests the URL segments are matching **nginx location blocks out of order**

### Business Impact

- Users following navigation links hit broken or wrong pages
- Google Search Console will report 403/404 errors for indexed pages
- Cold outreach targets clicking links to `/case-studies` or `/services` get 403 errors
- **This single issue could nullify all other marketing work**

---

## Corrections to Earlier Audit Reports

The following findings from code-only analysis must be corrected:

| Report | Previous Finding | Corrected Finding |
|--------|----------------|-------------------|
| 02-functional-qa | "No social media links in footer" | ❌ Wrong — Facebook, Instagram, LinkedIn present |
| 02-functional-qa | "Privacy/Terms may be spans" | ✅ Confirmed — Privacy Policy and Terms of Service as links |
| 08-ux-journey | "Homepage has no closing CTA" | ❌ Wrong — Contact form section + "Ready to discuss" section present |
| 09-cro | "No trust above fold" | Partially wrong — client logo carousel present on homepage |
| 10-brand | "No social media presence in footer" | ❌ Wrong — All 3 major social platforms linked |
| 00-executive | "No named team members" | Partially wrong — 3 team portraits visible (names may not be labelled) |
| 00-executive | "Zero analytics" | May be wrong — cannot verify from code; requires live network inspection |

---

## Visual Quality (Live)

- Overall rating: **8/10** — modern, professional, consistent
- Color scheme: Dark navy backgrounds, cyan (#00D9FF-ish) primary CTA, purple (#6366F1-ish) secondary CTAs, gradient accents in hero
- Typography: Large, spaced-out headings; readable body text; all-caps section titles
- Animation: Smooth service carousel visible; transitions present
- Photography: Professional team portraits; project screenshots in case studies
