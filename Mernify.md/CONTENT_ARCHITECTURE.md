# CONTENT ARCHITECTURE

**Purpose:** Single map of sitemap, messaging, page outlines, and content rules for the Mernify website.  
**Authority order:** Brand Guidelines PDF → Competitor Analysis → Brand board image → this doc → UI implementation.

---

## 1. Brand position (locked)

**One-line position**  
Mernify builds scalable web, mobile, and SaaS products for startups and growing businesses.

**Primary tagline**  
Build Modern. Scale Confidently.

**Primary website headline**  
We Design, Engineer and Scale Digital Products.  
*(Homepage H1 lock currently shipping: “Build Modern Digital Products That Scale” — keep unless brand owner explicitly switches.)*

**Brand promise**  
Modern technology. Reliable execution. Measurable business value.

**Market wedge**  
More structured than freelancers. More focused and flexible than large agencies. Accessible to startups and mid-market without enterprise-consultancy theater.

**Do not lead with**  
MERN, MEAN, React, Angular, MongoDB, Node.js as the brand promise. Stack belongs under Technology.

---

## 2. Audiences (priority)

1. **Primary:** Startups and growing businesses (MVP → production SaaS/mobile)
2. SMBs needing portals, automation, integrations
3. Product owners / founders without full engineering teams
4. Digital agencies needing overflow / white-label delivery
5. Enterprises seeking focused pods (secondary tone — not SSI clone)

---

## 3. Proposed sitemap

```text
/
/services
/services/web-saas
/services/mobile
/services/ai-automation
/services/product-design
/services/support-maintenance
/work
/work/:slug
/industries                 (optional v1 — can be homepage section only)
/about
/process
/contact
/privacy
/terms
```

### Navigation (header)

Services · Work · About · Contact  
Primary CTA: Discuss Your Project → `/contact`  
Secondary (hero/menu): View Our Work → `/work`

### Footer

- Company: About, Process, Work, Contact, Careers (omit until real)
- Services: five purchase categories (deep links)
- Resources: optional later
- Legal: Privacy, Terms
- Brand promise line + logo

---

## 4. Homepage information architecture

| # | Section | Job | Content rule |
|---|---------|-----|--------------|
| 1 | Header | Orient + convert | Persistent CTA |
| 2 | Hero | Promise + CTAs | Locked headline/support |
| 3 | Trust | Credibility without lying | Tech marks and/or real logos only |
| 4 | Reasons | Why Mernify | Three real differentiators or omit |
| 5 | Services | What buyers purchase | Five categories |
| 6 | Work | Proof | Real cases or honest empty |
| 7 | Industries | Relevance | 3–4 authentic only |
| 8 | Process | Reduce risk | Discover→…→Iterate |
| 9 | Offers | Productized entry points | Four offers |
| 10 | Technology | How we build | Stack, not promise |
| 11 | Testimonials | Social proof | Real only — else omit |
| 12 | Standards | Trust/QA/security | No fake certs |
| 13 | FAQ | Objection handling | Real questions only |
| 14 | Final CTA | Convert | Contact |
| 15 | Footer | Navigate + legal | Working links |

### Hero copy (current lock)

- Eyebrow: Product development partner  
- H1: Build Modern Digital Products That Scale  
- Support: Mernify designs and develops scalable web platforms, mobile applications, SaaS products, and custom software for startups, businesses, and agencies.  
- Primary CTA: Discuss Your Project  
- Secondary CTA: View Our Work  
- Meta chips: Web & SaaS · Mobile · AI & Automation  

### Alternate hero (Competitor Analysis — optional A/B later)

- H1: Build Web, Mobile and SaaS Products That Scale  
- Support: Mernify helps startups and growing businesses turn ideas and operational challenges into reliable digital products through product strategy, modern engineering and long-term technical support.

---

## 5. Service architecture (purchase categories)

1. **Web & SaaS Development** — platforms, portals, multi-tenant, admin, marketplaces  
2. **Mobile App Development** — iOS/Android, RN/Flutter, APIs, store release  
3. **AI & Automation** — assistants, workflow automation, document intelligence, integrations  
4. **Product Design & Strategy** — discovery, UX, MVP scope, architecture  
5. **Support & Maintenance** — monitoring, performance, cloud/DevOps, iteration  

### Productized offers

| Offer | Promise |
|-------|---------|
| Product Discovery Sprint | 1–2 weeks → requirements, flows, MVP scope, wireframes, architecture, estimate |
| MVP Launch Program | Concept → production-ready MVP |
| Dedicated Product Pod | PM + design + FE + BE (+ mobile) + QA |
| Product Rescue & Modernization | Incomplete, slow, or poorly built products |

### Engagement models (About/Process/Contact)

Fixed-scope · Dedicated team · Time & materials · MVP · Maintenance & support

---

## 6. Page outlines

### `/services`

- Page hero: “Product engineering for web, mobile, and intelligent systems”
- Grid/list of five services with summary + link
- Offers strip
- Final CTA

### `/services/:slug`

- Problem framing (business outcome)
- Who it’s for
- What we deliver
- Capabilities list
- Related process steps
- Related case studies (if any)
- CTA

### `/work`

- Intro without fake counts
- Case cards (industry, problem, outcome if real)
- Empty state: “Case studies are added as clients approve publication. Discuss a similar product →”

### `/work/:slug`

Standard fields:

1. Title (outcome-led when possible)  
2. Industry  
3. Business problem  
4. Users / workflows  
5. Solution  
6. Architecture (high level)  
7. Major features  
8. Integrations  
9. Timeline  
10. Media  
11. Measurable result (**only if verified**)  
12. Testimonial (**only if verified**)  

### `/about`

- Positioning statement  
- Mission / vision (from PDF)  
- Values (Ownership, Transparency, Quality, Business Understanding, Scalability, Continuous Improvement, Partnership)  
- Who we serve  
- How engagement feels (founder-level attention, clarity, long-term support)  
- CTA  

### `/process`

- 7 steps with short plain-language descriptions  
- Deliverables examples (architecture, backlog, QA, release notes) without overclaiming  
- Offers + models  
- CTA  

### `/contact`

- Short reassurance (“Tell us about the product — we’ll reply with next steps”)  
- Form  
- Optional: email, response-time expectation (only if true)  
- No fake addresses/phones  

### `/privacy`, `/terms`

- Real legal copy from counsel/owner  
- Last updated date  

---

## 7. Voice and language

**Tone:** Clear · Professional · Confident · Business-focused · Helpful · Honest  

**Prefer:** scalable, reliable, modern, secure, flexible, transparent, maintainable, structured, collaborative, results-driven  

**Avoid:** cheapest, unbeatable, guaranteed success, perfect software, instant development, unlimited, best in the world, no risk, zero maintenance, revolutionary (unless evidenced), “innovative solutions” fluff  

**Rewrite pattern**

- Bad: We leverage next-generation paradigms…  
- Good: We build scalable software that helps businesses work better and grow faster.

---

## 8. Trust & proof policy

| Allowed now | Forbidden |
|-------------|-----------|
| Technology capability marks | Fake client logos |
| Real case studies | Invented metrics |
| Labeled placeholders (“Pending client approval”) | Fake testimonials |
| Process and standards narrative | Unverified awards/certifications |
| Honest empty Work state | Employee/revenue vanity numbers without source |

---

## 9. SEO content rules

Every public page:

- Unique `<title>` (pattern: `{Page} — Mernify` or outcome-led variant)
- Unique meta description (≤160 chars, benefit-led)
- One H1
- Logical H2/H3
- Descriptive URLs
- Internal links to Contact + related services
- OG title/description/image when assets exist

Organization description should match brand promise, not “cheap outsourcing.”

---

## 10. Content inventory status (2026-07-24)

| Module | Status |
|--------|--------|
| `content/home.js` | Live — hero lock |
| `content/navigation.js` | Live |
| `content/services.js` | Live for homepage services; needs detail pages |
| `content/trust.js` | Live — tech marks |
| Contact / offers / industries / cases / about / process / legal | Missing — create in implementation phases |

---

## 11. Messages that must not ship

- Internal process notes (“after homepage section gates”)
- “Lorem ipsum”
- Guaranteed ROI or timelines
- “AI-native” positioning that clones tkxel
- Broad “digital transformation for every industry” SSI-style sprawl
