# REMAINING CONTENT REQUIREMENTS

Business-owned inputs required before a confident public launch. Engineering can ship without inventing these.

---

## 1. Case studies (highest conversion gap)

Provide **at least two** client-approved stories with:

| Field | Required |
|-------|----------|
| Public title (outcome-led preferred) | Yes |
| Industry | Yes |
| Challenge | Yes |
| Solution | Yes |
| Product screens / media (licensed) | Yes |
| Services involved | Yes |
| Technology (high level) | Yes |
| Verified business outcome | Yes (only if real) |
| Testimonial | Optional (only if real) |
| Permission to publish | Yes |

**Internal draft shells** already exist in `src/content/caseStudies.js` (`status: 'pending'`, `draftNotes`). Flip to `status: 'published'` and fill `challenge` / `solution` / `outcome` when approved. Then re-add URLs to `public/sitemap.xml`.

Until then, the site correctly shows an empty / pending state — do **not** invent customers or metrics.

---

## 2. Contact operations

| Item | Status | Action |
|------|--------|--------|
| Public email `info@mernify.co` | Assumed in copy | Confirm mailbox exists, monitored SLA |
| Form backend | Mailto fallback only | Set `VITE_CONTACT_ENDPOINT` or document mailto as intentional |
| Discovery-call scheduling | CTA copy implies scheduling | Provide Calendly/equivalent URL if desired |
| Response-time promise | Not claimed | Only add if operationally true |

---

## 3. Legal

| Document | Status | Action |
|----------|--------|--------|
| Privacy Policy | Draft in `src/content/pages.js` | Counsel/owner review + last-updated date |
| Terms of Service | Draft | Counsel/owner review |
| Cookie/analytics notice | Not present | Add if analytics enabled |

---

## 4. Brand / proof assets (optional but valuable)

- Licensed customer logos (only with permission)
- Real photography or product UI captures (replace decorative mock over time)
- Social profile URLs (footer currently omits social — correct until real)
- Founder/team About details if desired (keep honest; no fake headcount)

---

## 5. Industries

Industry pages describe **solution patterns**, not credentials. If Mernify has regulated-domain experience (healthcare, finance), supply:

- What can be claimed publicly  
- What must remain generic  

Do not imply certifications or completed projects without evidence.

---

## 6. Copy decisions to confirm

| Decision | Current | Needs confirmation |
|----------|---------|-------------------|
| Hero H1 | “We Design, Engineer & Scale Digital Products” | Locked per brief |
| Primary CTA | “Let's Build Your Product” / “Contact Us” | OK |
| Final CTA | “Schedule a Discovery Call” | Align with real booking flow |
| Tagline | “Build Modern. Scale Confidently.” | OK |

---

## 7. Do not supply / do not invent

- Fake logos, ratings, ISO/CMMI claims, headcount, revenue, “top 1% talent”
- Testimonials without attribution permission  
- Case-study outcomes without measurement source  
- Competitor-cloned wording or visuals  

---

## Acceptance for launch

Minimum bar recommended by this QA review:

1. Legal-approved Privacy + Terms  
2. Monitored contact channel (endpoint or verified mailto process)  
3. Either **two published case studies** **or** explicit go-ahead to launch with empty proof + strong discovery CTA  
4. Re-run `node scripts/final-qa.mjs` + `npm run build` after content merges
