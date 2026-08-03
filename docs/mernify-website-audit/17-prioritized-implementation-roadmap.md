# Phase 17: Prioritized Implementation Roadmap

**Audit Date:** 2026-07-30  
**Based on:** All 16 audit phases

---

## 17.1 P0 — Critical (Fix Before Any Public Marketing)

| # | Initiative | Reason | Owner | Effort | Dependency | Expected Outcome |
|---|-----------|--------|-------|--------|-----------|-----------------|
| 1 | Fix sitemap domain (mernify.com → mernify.co) | All sitemap URLs point to wrong domain; breaks Google indexing | Engineering | XS | None | Sitemap correctly indexed |
| 2 | Disable source maps in production | Full source code exposed to public | Engineering | XS | None | IP and code structure protected |
| 3 | Confirm contact form delivery | Leads may go nowhere (mailto fallback) | Engineering + Operations | S | Contact endpoint or verified mailto | All inquiries reliably received |
| 4 | Install Google Analytics 4 + GTM | Zero conversion data; cannot measure ROI | Engineering | XS | Consent banner | Can measure website performance |

---

## 17.2 P1 — High (Complete Within 2 Weeks)

| # | Initiative | Reason | Owner | Effort | Dependency | Expected Outcome |
|---|-----------|--------|-------|--------|-----------|-----------------|
| 5 | Add Calendly (or equivalent) to contact page | Many B2B buyers want to self-schedule; reduces friction | Engineering | XS | Calendly account | +15-25% contact conversion |
| 6 | Add founder/team name + photo to About page | Anonymous company loses B2B trust — biggest single credibility gap | Design + Content | S | Founder approval | CTO trust improves significantly |
| 7 | Add OG meta tags + OG share image to all pages | LinkedIn/email sharing shows blank — kills cold outreach | Engineering | S | OG image design | Links shared in outreach look professional |
| 8 | Add LinkedIn Insight Tag (after consent banner) | Cannot run LinkedIn ads or retargeting without it | Engineering | XS | Consent banner | LinkedIn advertising enabled |
| 9 | Install consent management banner | GDPR required before installing tracking pixels | Engineering | S | Decision on CMP tool | Legal compliance + analytics enabled |
| 10 | Add closing CTA section to homepage | Homepage has no conversion close — buyers reach footer with no action | Design + Engineering | S | CTA copy decision | Homepage conversion improves |
| 11 | Verify and update case study authorship | Publishing case studies without verified authorship is a false claim risk | Business + Legal | S | Client confirmation | Honest, credible portfolio |
| 12 | Add "What happens next" to contact page | Buyers don't know response time or next steps | Content | XS | Process decision | Reduces post-form anxiety |
| 13 | Add X-Frame-Options and basic security headers | No clickjacking protection currently | Engineering/DevOps | XS | Server access | Basic security posture met |
| 14 | Add Process and Industries to header navigation | Buyers can't find key pages | Engineering | XS | None | Navigation completeness |
| 15 | Install schema.org structured data (Organization, Service) | No rich results possible without it | Engineering | S | None | SEO rich results eligibility |

---

## 17.3 P2 — Medium (Complete Within 30 Days)

| # | Initiative | Reason | Owner | Effort | Dependency | Expected Outcome |
|---|-----------|--------|-------|--------|-----------|-----------------|
| 16 | Create MVP development landing page | Missing high-value keyword; no startup funnel page | Engineering + Content | M | Content decision | New startup acquisition channel |
| 17 | Add engagement models section to homepage or services | Buyers can't understand commercial model | Design + Engineering | S | Models defined | Buyer confidence increases |
| 18 | Add IP ownership and communication process to FAQ | 9/13 objections unanswered — kills enterprise sales | Content | S | Legal review | Sales objection handling improved |
| 19 | Replace Unsplash stock photos with product UI screenshots | Brand guidelines say avoid generic stock; reduces credibility | Design + Content | M | Real screenshots from projects | Brand credibility improves |
| 20 | Remove Three.js from production bundle | 350KB bundle inflation; hero marked "NOT APPROVED" anyway | Engineering | S | Hero design decision | Performance improves significantly |
| 21 | Add spam protection to contact form | No CAPTCHA or honeypot risks spam | Engineering | XS | reCAPTCHA/Turnstile account | Inbox spam reduced |
| 22 | Fix Google Maps consent gate on contact page | GDPR: Maps loads without consent | Engineering | S | Consent banner installed | GDPR compliance met |
| 23 | Differentiate footer service links (point to slug pages) | All 5 service links go to /services — missed internal link opportunity | Engineering | XS | None | Internal SEO improved |
| 24 | Add Twitter/X card metadata | Missing social share support | Engineering | XS | OG image already created | Social sharing complete |
| 25 | Run npm audit and fix high/critical vulnerabilities | Unknown security gaps in dependencies | Engineering | S | None | Security hygiene baseline |
| 26 | Fix character encoding artifacts throughout site | `let's`, `Sending…` etc. showing garbled in source; may render garbled on site | Engineering | XS | Source file encoding fix | Professional presentation |
| 27 | Add mobile focus trap to mobile navigation panel | WCAG 2.1 SC 2.1.2 compliance gap | Engineering | XS | None | Accessibility improved |

---

## 17.4 P3 — Low (Complete Within 60 Days)

| # | Initiative | Reason | Owner | Effort | Dependency | Expected Outcome |
|---|-----------|--------|-------|--------|-----------|-----------------|
| 28 | Create agency partnership landing page | Missed B2B channel; agencies need a white-label partner | Content + Engineering | M | Partnership model defined | Agency channel opened |
| 29 | Create Product Rescue landing page | High-intent buyers with failing projects; no current entry | Content + Engineering | M | Rescue process defined | Rescue segment captured |
| 30 | Add at least 1 authentic testimonial | 0/10 testimonials — biggest trust gap after team | Content/Business | S | Client relationship | B2B trust signal added |
| 31 | Disable SoftCursor on touch devices | Unnecessary on mobile; wastes resources | Engineering | XS | None | Mobile performance |
| 32 | Implement `font-display: swap` for fonts | Prevents FOIT during font loading | Engineering | XS | None | Perceived performance |
| 33 | Create and verify LinkedIn company page | Social validation; retargeting requirement | Marketing | S | None | Brand discoverability |
| 34 | Add `rel="noopener noreferrer"` to external links | Security tabnapping protection | Engineering | XS | None | Security baseline |
| 35 | Configure Brotli compression on server | Performance improvement | DevOps | XS | Server access | LCP improvement |
| 36 | Add `Cache-Control` headers for static assets | Performance improvement | DevOps | XS | Server access | Repeat visit performance |
| 37 | Run full axe/WAVE accessibility audit on live site | Identify remaining WCAG gaps | QA/Engineering | S | None | Accessibility baseline documented |
| 38 | Update robots.txt with full sitemap URL | Minor SEO hygiene | Engineering | XS | None | Crawl accuracy |

---

## 17.5 Content-Owned Items (Not Engineering)

These require business/content team action, not engineering:

| # | Item | Owner | Deadline Recommendation |
|---|------|-------|------------------------|
| C1 | Get client permission for Tailorize case study | Business development | ASAP |
| C2 | Add founder photo + 150-word bio to About page | Founder | Week 1 |
| C3 | Define and confirm contact form endpoint/email | Operations | Week 1 |
| C4 | Collect 1–2 client testimonials in writing | Business development | Month 1 |
| C5 | Define engagement models (Discovery Sprint price/scope) | Management | Month 1 |
| C6 | Confirm `hello@mernify.com` is monitored with SLA | Operations | Week 1 |
| C7 | Legal review of Privacy Policy and Terms | Legal | Month 1 |
| C8 | Decide and document productized offers | Management | Month 1 |
| C9 | Create LinkedIn company page and post 4 articles | Marketing | Month 1 |

---

## 17.6 Days 1–14: Critical and High-Priority Sprint

### Week 1 (Days 1–7)

| Day | Task | Owner |
|-----|------|-------|
| Day 1 | Fix sitemap domain; disable source maps | Engineering |
| Day 1 | Confirm contact form endpoint; test live delivery | Engineering + Ops |
| Day 2 | Install GA4 + GTM (dev environment first) | Engineering |
| Day 2 | Install consent banner (CookieYes) | Engineering |
| Day 3 | Add Calendly link to contact page | Engineering |
| Day 3 | Founder writes bio + selects photo | Founder |
| Day 4 | Add OG meta tags to all pages; design OG image | Engineering + Design |
| Day 4 | Add X-Frame-Options + security headers to server | DevOps |
| Day 5 | Deploy consent banner + GA4 to production | Engineering |
| Day 5 | Go live: Calendly + form fixes | Engineering |

### Week 2 (Days 8–14)

| Day | Task | Owner |
|-----|------|-------|
| Day 8 | Add founder/team section to About page | Engineering + Design |
| Day 8 | Install LinkedIn Insight Tag via GTM | Engineering |
| Day 9 | Add closing CTA section to homepage | Engineering |
| Day 9 | Add Process + Industries to header nav | Engineering |
| Day 10 | Add schema.org to homepage, service pages | Engineering |
| Day 11 | Fix footer service links (point to slug pages) | Engineering |
| Day 12 | Add "What happens next" to contact page | Engineering + Content |
| Day 13 | Fix character encoding artifacts | Engineering |
| Day 14 | Verify and confirm case study authorship | Business |

---

## 17.7 Days 15–30: Service and SEO Foundation

| Initiative | Owner | Effort |
|-----------|-------|--------|
| Create MVP development landing page | Engineering + Content | M |
| Add engagement models to services | Engineering + Content | S |
| Add IP ownership to FAQ/Process | Content | S |
| Run npm audit; fix vulnerabilities | Engineering | S |
| Create product OG images for all service pages | Design | M |
| Create industry landing pages (2–3 max) | Content + Engineering | L |
| Begin Google Search Console setup + sitemap submission | Marketing | XS |
| Plan and write 2 SEO articles | Marketing | M |

---

## 17.8 Days 31–60: CRO, Content, Campaign Readiness

| Initiative | Owner | Effort |
|-----------|-------|--------|
| Remove Three.js from production (replace hero) | Engineering + Design | S |
| Replace Unsplash stock photos with real screenshots | Design | M |
| Create agency partnership landing page | Content + Engineering | M |
| Create Product Rescue landing page | Content + Engineering | M |
| Add authentic testimonials (1–2) | Business + Engineering | S |
| A/B test homepage hero CTA | Marketing + Engineering | S |
| Launch Google Search campaign (SaaS/MVP) | Marketing | M |
| Set up LinkedIn retargeting | Marketing | S |
| Publish lead magnet (Software Brief Template) | Marketing + Design | S |
| Start LinkedIn founder content (8 posts/month) | Founder | Ongoing |

---

## 17.9 Days 61–90: Differentiation and Authority

| Initiative | Owner | Effort |
|-----------|-------|--------|
| Publish 2 detailed, verified case studies | Business + Engineering | L |
| Create enterprise-specific inquiry path | Content + Engineering | M |
| Add thought leadership blog (4+ articles) | Marketing | L |
| Quarterly review of GA4 data — optimize conversions | Marketing | S |
| Improve homepage middle sections (process, testimonials) | Engineering + Design | L |
| Review and enhance mobile performance | Engineering | M |
| CRO experiment: form vs. calendar as primary CTA | Marketing + Engineering | S |
| Add quantified proof numbers to homepage (if verified) | Content | S |
