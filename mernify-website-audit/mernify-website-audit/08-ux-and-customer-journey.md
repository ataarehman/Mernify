# Phase 8: UX and Customer Journey Analysis

**Audit Date:** 2026-07-30  
**Method:** Source code analysis, route inspection, content review

---

## 8.1 Five-Second Test

After five seconds on the Mernify homepage, a new visitor can understand:

| Question | Answer Visible? | Evidence |
|----------|----------------|---------|
| 1. What does Mernify do? | ✅ Yes | H1 + support copy above fold |
| 2. Who does it serve? | ⚠️ Partial | "startups, growing businesses, enterprises" — too broad |
| 3. What makes it different? | ❌ No | No differentiation statement visible |
| 4. Why can it be trusted? | ❌ No | Tech logos only — no client proof above fold |
| 5. What action to take? | ✅ Yes | "Discuss Your Project" button prominent |

**Five-second test score: 3/5** — The basic service is communicated. Differentiation and trust are the two missing pieces above the fold.

---

## 8.2 Journey A: Startup Founder

**Persona:** First-time founder with a software product idea, moderate technical literacy, limited budget, evaluating several agencies.

**Expected path:** Homepage → Services → Process → Contact

| Step | Page | Visitor Question | Information Available | Friction | Drop-off Risk |
|------|------|-----------------|----------------------|---------|--------------|
| 1 | Homepage hero | "Can these people build my idea?" | Services communicated; no pricing | Moderate | 30% |
| 2 | Services page | "What's included? How long does it take?" | Service descriptions; no pricing | High — no discovery sprint offer | 40% |
| 3 | Case studies | "Have they done something like my idea?" | Limited case studies visible | High — few published case studies | 50% |
| 4 | Process page | "How does working with them actually work?" | Detailed steps available | Low | 20% |
| 5 | Contact | "How do I start?" | Form available | Moderate — form with budget question | Low |

**Friction Points:**
- No MVP-focused service page or offer
- No budget indicator or pricing range
- Case studies don't match typical startup verticals
- No "what happens after I submit" message
- Discovery call not mentioned until contact form

**Missing Content:**
- Discovery Sprint offer with price range or time estimate
- "First project" FAQ (What's the minimum engagement? How fast can you start?)
- Social proof from other startup founders

**Recommended Improvement:**
Add a "Start with a Discovery Sprint" CTA alongside the primary "Discuss Your Project". Create a dedicated `/services/mvp-development` page with estimated timeline and investment range (e.g., "Most MVPs: 8–16 weeks").

---

## 8.3 Journey B: CTO or Product Leader

**Persona:** CTO at a 50-person SaaS company, wants to extend engineering team for a new product line, evaluating 3–4 vendors.

**Expected path:** Homepage → About → Services (dedicated teams) → Process → Case Studies → Contact

| Step | Page | Visitor Question | Information Available | Friction | Drop-off Risk |
|------|------|-----------------|----------------------|---------|--------------|
| 1 | Homepage | "Is this a credible engineering company?" | Hero message OK; no team shown | Moderate | 25% |
| 2 | About | "Who am I hiring? What's the leadership?" | Company values; **no named team** | High — anonymity is red flag | 45% |
| 3 | Services/dedicated-teams | "How do dedicated teams work?" | Service detail expected | Moderate | 30% |
| 4 | Process | "What does day-1 look like?" | Process steps | Low | 15% |
| 5 | Case studies | "Have they worked with SaaS companies?" | Limited case studies | High | 35% |
| 6 | Contact | "I want to speak to their CTO/lead engineer" | Generic form | Moderate — no senior contact option | 20% |

**Critical Gap for CTO Journey:** Technical buyers need to speak with someone technically credible. The website has no indication of team seniority, technical leadership, or the ability to schedule a call with a senior engineer.

**Missing Content:**
- Named team members (at minimum: founder/CTO)
- Technical expertise page or blog (demonstrates knowledge)
- Dedicated teams detail page with engagement model
- Engineering standards (code review, testing, CI/CD)

---

## 8.4 Journey C: SME Owner

**Persona:** Owner of a 200-person logistics company needing to replace legacy software, non-technical.

**Expected path:** Homepage → Services → Process → Contact

| Step | Page | Visitor Question | Information Available | Friction | Drop-off Risk |
|------|------|-----------------|----------------------|---------|--------------|
| 1 | Homepage | "Is this for businesses like mine?" | "Growing businesses" — vague | High | 40% |
| 2 | Services | "Can you modernize my old system?" | Modernization listed | Moderate | 35% |
| 3 | Process | "How disrupted will my business be?" | Process steps | Moderate — no risk mitigation language | 30% |
| 4 | Contact | "Can I get a cost estimate?" | Form has budget field | Low | 20% |

**Critical Gap:** No industry-specific pages for SME verticals (logistics, healthcare, retail). An SME owner seeing "Web & SaaS Development" as a service doesn't immediately recognize "yes, this is for me."

**Missing Content:**
- Industries section or page with 3–4 specific verticals
- Modernization-specific case study
- "What to expect" guide for non-technical buyers

---

## 8.5 Journey D: Digital Agency Partner

**Persona:** Head of a design/marketing agency that needs to offer software development to clients, looking for a white-label technical partner.

**Expected path:** Homepage → About → Contact

| Step | Page | Visitor Question | Information Available | Friction | Drop-off Risk |
|------|------|-----------------|----------------------|---------|--------------|
| 1 | Homepage | "Do they do white-label work?" | Not mentioned | Very High | 70% |
| 2 | About | "Are they discreet? Will they undercut me?" | Nothing about partnership | Very High | 80% |
| 3 | Contact | "I want a confidential conversation" | Generic form | High — no "agency partnership" option | 40% |

**Critical Gap:** There is no pathway, no language, and no CTA for agency partnerships. This is an entire business channel that is invisible on the website.

---

## 8.6 Homepage Section Audit (Journey-by-Section)

| Section | Present | Converts Which Journey | Quality | Gap |
|---------|---------|----------------------|---------|-----|
| Hero | ✅ Yes | All — entry point | 7/10 | No differentiation, weak trust above fold |
| Technology trust strip | ✅ Yes | CTOs, technical buyers | 6/10 | Technology logos ≠ client proof |
| Services section | ✅ Yes | All | 8/10 | No pricing signals, "Explore" links to placeholders? |
| Process overview | ❌ Missing | SME, founders | — | Critical gap |
| Testimonials | ❌ Missing | All | — | Critical gap |
| Case studies preview | ❌ Missing | CTOs, funded startups | — | Critical gap |
| Engagement models | ❌ Missing | Founders, CTOs | — | Critical gap |
| FAQ | ❌ Missing | All hesitant buyers | — | Valuable for reducing friction |
| Final CTA | ❌ Missing | All | — | Homepage has no conversion close |
| Industries | ❌ Missing | SME, enterprise | — | Reduces non-technical buyer confidence |

**Homepage conversion arc score: 4/10** — The page has a strong open (hero) but no middle or close. Buyers who scroll the entire homepage reach the footer with no conversion trigger.

---

## 8.7 Navigation UX Analysis

| Issue | Impact | Severity |
|-------|--------|---------|
| No "Process" in header | Buyers can't find it | P1 |
| "Work" in header goes to case-studies | Naming inconsistency (header says Work, URL is /case-studies) | P2 |
| No "Industries" in header | Orphan page | P1 |
| No search functionality | Can't find specific services | P3 |
| Header has only 4 items | Acceptable for clean design | ℹ️ |
| Footer service links undifferentiated | Missed deep-link opportunity | P2 |

---

## 8.8 Contact Journey Analysis

**Primary conversion journey:** Any page → "Discuss Your Project" → `/contact` → Form → Submission → [Unknown]

| Stage | Status | Issue |
|-------|--------|-------|
| CTA visibility | ✅ Prominent in header | |
| CTA landing | ✅ Contact page with form | |
| Form friction | ⚠️ Moderate (7 fields) | Budget and service required fields may deter casual inquirers |
| Form success | ⚠️ Depends on backend | Mailto fallback is poor UX |
| Confirmation message | ✅ Present (code) | Message content quality TBD |
| Email response | Unknown | Depends on Mernify operations |
| Discovery call scheduling | ❌ Missing | No calendar link offered |

**Recommended contact journey improvement:**
1. Reduce form to 3 required fields for first contact (Name, Email, Project description)
2. Add Calendly link for "prefer to call?" option
3. Add "We respond within 1 business day" message
4. Add thank-you page (separate URL) for analytics tracking

---

## 8.9 UX Quality Scores

| Dimension | Score | Rationale |
|-----------|-------|-----------|
| Visual design quality | 7.5/10 | Premium dark hero; good typography |
| Navigation clarity | 6/10 | Missing process/industries; footer service links weak |
| Homepage narrative completeness | 4/10 | No middle or close sections |
| Contact experience | 5/10 | Form present but backend uncertain; no calendar option |
| Trust architecture | 3/10 | No testimonials, no named team, limited case studies |
| Mobile experience | 7/10 | Good mobile menu; services section needs testing |
| Loading / perceived performance | 5/10 | Three.js adds perceived delay |
| Overall buyer journey | 5/10 | Entry is strong; middle and close are weak |
