# Phase 11: Case Study and Portfolio Audit

**Audit Date:** 2026-07-30  
**Method:** Source code inspection of `src/content/caseStudies.js`  
**Evidence:** Content file + `public/portfolio/` directory references

---

## 11.1 Portfolio Overview

### Published Case Studies (from caseStudies.js)

| Study | Status | Category | Industry | Verified Authorship |
|-------|--------|----------|---------|---------------------|
| Tailorize | Published | Product Configurator | Fashion technology | ⚠️ Based on public site observation |
| Mrzzm | Published (TBC) | TBC | TBC | Unknown |
| Spaceworx | Published (TBC) | TBC | TBC | Unknown |

### Pending Case Studies (noIndex)

| Study | Status | Notes |
|-------|--------|-------|
| SaaS Operations Platform | Pending | Internal shell — not published |
| Field Service Mobile | Pending | Internal shell — not published |
| AI Document Workflow | Pending | Internal shell — not published |

---

## 11.2 Critical Finding: Case Study Authorship

### Issue CS-001 (P1): Case Study Evidence Based on Public Site Observation

**Evidence from caseStudies.js (Tailorize entry):**
```
developmentApproach: 'The product spans a web platform at tailorize.sa and native mobile apps on both major stores. 
The AI measurement module is demonstrated via a promotional video on the homepage. WhatsApp is integrated as a direct 
support channel. Detailed internal architecture is not publicly disclosed; this case study describes the 
customer-facing capabilities verified from the live site.'
```

**Description:** The Tailorize case study explicitly states it describes "customer-facing capabilities verified from the live site" rather than internal project records. The metrics shown (e.g., "48h custom order turnaround") appear to be sourced from the Tailorize website's public claims, not from Mernify's project records.

**Business Impact:**  
- The case study does not prove Mernify built Tailorize — it proves Tailorize exists
- A skeptical buyer (especially a technical CTO) may notice this gap
- If Mernify did not build Tailorize, publishing this case study is a false claim
- If Mernify did build Tailorize, the case study needs to be updated with Mernify's internal role, decisions, and metrics — with client permission

**Recommendation:** Before publishing, Mernify must confirm:
1. ✅ Mernify actually built or significantly contributed to Tailorize
2. ✅ The client (Tailorize) has given permission to be named and described
3. ✅ The metrics and claims are accurate as Mernify can vouch for them

**Label required until confirmed:** *Proof required from Mernify before publishing this claim.*

---

## 11.3 Tailorize Case Study Analysis

### What's Good

| Element | Assessment |
|---------|-----------|
| Industry context | ✅ Clear — Saudi Arabia fashion tech |
| Business problem | ✅ Well described — in-person fitting limitation |
| Solution description | ✅ Clear — AI measurement + dual apps |
| Technology listed | ✅ iOS, Android, WhatsApp integration |
| Bilingual context | ✅ Arabic + English noted |
| Outcome statements | ⚠️ Outcome-framed but unverified |
| SEO title/description | ✅ Specific and search-intent aware |

### What's Missing (Per Strong Case Study Standard)

| Required Element | Present | Notes |
|----------------|---------|-------|
| Mernify's specific role | ❌ Missing | "We built X" needs a clear statement |
| Internal technical decisions | ❌ Missing | Architecture choices Mernify made |
| Team composition | ❌ Missing | How many people, what roles |
| Delivery timeline | ❌ Missing | How long did the project take |
| Challenges overcome | ⚠️ Implied | Not explicitly from Mernify's perspective |
| Named client testimonial | ❌ Missing | No quote from Tailorize |
| Quantified business results | ⚠️ Claims | "48h turnaround" sourced from client site |
| Client permission to publish | Unknown | Not documented in codebase |

---

## 11.4 Portfolio Visual Presentation

### Image Assets

Images referenced in portfolio data point to `/portfolio/tailorize/home-desktop.png` and `/portfolio/tailorize/home-mobile.png` in the public directory. These are screenshots of the live Tailorize website.

**Issue CS-002 (P2): Portfolio screenshots show client's website, not Mernify's design work**  
Showing screenshots of the client's website does not demonstrate Mernify's design or engineering contribution. A strong portfolio shows:
- Before/after comparisons
- Design process documents
- Code snippets or architecture diagrams
- Real team working photos (optional)

---

## 11.5 Case Study Standards Evaluation

### Using the Required Case Study Framework

A strong case study should answer 15 questions (per audit brief). For Tailorize:

| Required Element | Status |
|----------------|--------|
| 1. Client/industry context | ✅ Present |
| 2. Business problem | ✅ Present |
| 3. User problem | ✅ Present |
| 4. Existing limitations | ✅ Present |
| 5. Mernify's role | ❌ Missing |
| 6. Discovery process | ❌ Missing |
| 7. Proposed solution | ✅ Present |
| 8. Product/technical decisions | ❌ Missing (architectural detail absent) |
| 9. Technologies used | ⚠️ Partial (public-facing only) |
| 10. Key features | ✅ Present |
| 11. Delivery challenges | ❌ Missing |
| 12. Final outcome | ⚠️ Partial (from public site) |
| 13. Measurable results | ⚠️ Unverified |
| 14. Testimonial | ❌ Missing |
| 15. Relevant CTA | ✅ Present (via PageCta) |

**Case study completeness: 6/15 (40%) — Not sufficient for strong B2B trust.**

---

## 11.6 How Each Project Can Become a Sales Asset

### Tailorize (Saudi Arabia — Fashion Tech + AI)

**Current state:** Website screenshots + feature descriptions  
**Required to become a sales asset:**
1. Client confirmation of Mernify's role
2. At least one internal decision ("we chose React Native because...")
3. Challenge faced + how overcome
4. One metric Mernify can confidently attribute (e.g., "Shipped iOS + Android in 16 weeks")
5. Client quote (if permissible)

**Target buyer segment it would reach:** Fashion/retail companies, Middle East market, AI-adjacent products

### Pending Case Studies (if activated)

| Study | If Activated, Would Target |
|-------|--------------------------|
| SaaS Operations Platform | SaaS founders, B2B software companies |
| Field Service Mobile | Operations-heavy SMEs, logistics, field service |
| AI Document Workflow | Legal, finance, professional services |

---

## 11.7 Portfolio Recommendations

### Immediate (Content — not code)
1. Confirm and document Mernify's actual role in each published case study
2. Obtain written client permission before publishing any client name
3. Update each case study with at least: team size, project duration, one technical decision
4. Add a "View live site" CTA with tracking on each case study

### Short-term (Design)
1. Replace website screenshots with designed case study hero images
2. Create "before/after" or "problem → solution" visual narrative
3. Add code snippet or architecture diagram to demonstrate technical depth

### Long-term (Content Marketing)
1. Collect at least 1 written testimonial per published case study
2. Create a "How Mernify works" page referencing actual process from a case
3. Build 3 detailed case studies in verticals: SaaS, Fashion Tech, Automation

---

## 11.8 Case Study Quality Score

| Dimension | Score | Notes |
|-----------|-------|-------|
| Number of published case studies | 3/10 | Minimum viable; 5+ recommended |
| Depth of evidence | 3/10 | Public observation, not internal data |
| Authorship clarity | 2/10 | Mernify's role not explicitly stated |
| Testimonials | 0/10 | None present |
| Visual presentation | 6/10 | Good layout; screenshots from client site |
| Business impact focus | 5/10 | Outcomes described but unverified |
| SEO optimization | 7/10 | Good title/description structure |
| **Overall portfolio quality** | **4/10** | Needs significant content investment |
