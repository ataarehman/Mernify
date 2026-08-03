# Conversation Flows — Mernify AI Concierge

## Visitor Journey Map

Every journey starts from the welcome message:

> "Hi, I'm Mernify AI. I can help you choose the right development solution, explore our work, or prepare your project requirements. What are you looking to build or improve?"

Quick actions offered at open:
- Build a SaaS product → `saas-development`
- Develop a website → `web-development`
- Create a mobile app → `mobile-app-development`
- Add AI to my business → `ai-integration`
- Improve an existing product → `product-engineering`
- Hire developers → `dedicated-product-teams`
- Explore Mernify's work → `portfolio`

---

## Journey 1 — Build a SaaS Product

| Step | AI Objective | Question / Response | Stored Field | Next |
|------|-------------|---------------------|--------------|------|
| 1 | Understand the product domain | "What kind of SaaS product are you building? What problem does it solve for your customers?" | `projectType`, `businessProblem` | Step 2 |
| 2 | Identify the users | "Who are the primary users — consumers, businesses, or internal teams?" | `targetUsers` | Step 3 |
| 3 | Scope the MVP | "Which core features are essential for your first version?" | `coreFeatures` | Step 4 |
| 4 | Understand existing state | "Do you have any existing product, design, or technical documentation to build from?" | `existingProductStatus`, `designStatus` | Step 5 |
| 5 | Multi-tenancy needs | "Will multiple organisations share the platform, or is this single-tenant?" | `architecture` | Step 6 |
| 6 | Timeline + budget | "What's your target launch window? Do you have an initial budget range?" | `timeline`, `budgetRange` | Step 7 |
| 7 | Recommend + summarise | Recommend SaaS Development service, show Servloom case study, offer brief | `recommendedService` = `saas-development` | CTA |
| CTA | Convert | "I can prepare a project summary for the Mernify team. Would you like that, or prefer to book a call?" | — | Lead / Booking |

**Relevant case studies:** Servloom, GoodBooks Plus Analytics  
**Human handoff triggers:** Pricing negotiation, compliance requirements, enterprise scope

---

## Journey 2 — Website Development

| Step | AI Objective | Question / Response | Stored Field | Next |
|------|-------------|---------------------|--------------|------|
| 1 | Understand site purpose | "Is this a marketing site, a web application, a customer portal, or something else?" | `projectType` | Step 2 |
| 2 | Understand the audience | "Who will be using the site — prospects, customers, internal teams?" | `targetUsers` | Step 3 |
| 3 | Current state | "Do you have an existing site that needs replacing, or is this new?" | `existingProductStatus` | Step 4 |
| 4 | Design & content | "Do you have branding and content ready, or is that part of the scope?" | `designStatus`, `contentReadiness` | Step 5 |
| 5 | Tech integrations | "Are there CRM, analytics, e-commerce, or other systems to integrate?" | `integrationRequirements` | Step 6 |
| 6 | Timeline | "When do you need this live?" | `timeline` | Step 7 |
| 7 | Recommend + CTA | Recommend Web Development service, offer summary | `recommendedService` = `web-development` | Lead / Booking |

**Relevant case studies:** GODIVA, MedBill Ultra

---

## Journey 3 — Mobile App Development

| Step | AI Objective | Question / Response | Stored Field | Next |
|------|-------------|---------------------|--------------|------|
| 1 | Platform preference | "Do you need iOS only, Android only, or both? And should it be native or cross-platform (React Native / Flutter)?" | `preferredPlatforms` | Step 2 |
| 2 | App concept | "What does the app do? Who uses it?" | `businessProblem`, `targetUsers` | Step 3 |
| 3 | Key features | "What are the must-have features at launch?" | `coreFeatures` | Step 4 |
| 4 | Backend | "Does the app need a backend API, database, or integration with existing systems?" | `integrationRequirements` | Step 5 |
| 5 | Store submission | "Do you need App Store / Play Store submission support?" | — | Step 6 |
| 6 | Timeline + budget | "What's your timeline and budget range?" | `timeline`, `budgetRange` | Step 7 |
| 7 | Recommend + CTA | Recommend Mobile App Development, show Tailorize, offer summary | `recommendedService` = `mobile-app-development` | Lead / Booking |

**Relevant case studies:** Tailorize, Servloom (field tech apps)

---

## Journey 4 — Add AI to Existing Business

| Step | AI Objective | Question / Response | Stored Field | Next |
|------|-------------|---------------------|--------------|------|
| 1 | Understand the workflow | "What business process or product are you looking to improve with AI?" | `businessProblem` | Step 2 |
| 2 | AI use case type | "Is the goal automation, intelligent search, a customer-facing assistant, data insights, or something else?" | `aiRequirements` | Step 3 |
| 3 | Existing stack | "What systems, APIs, or data sources would the AI need to work with?" | `existingTechStack`, `integrationRequirements` | Step 4 |
| 4 | Success criteria | "How would you measure whether the AI feature is working?" | — | Step 5 |
| 5 | Sensitivity | "Is there sensitive or regulated data involved?" | `securityConsiderations`, `complianceConsiderations` | Step 6 |
| 6 | Recommend + CTA | Recommend AI Integration, show Servloom AI booking, offer summary | `recommendedService` = `ai-integration` | Lead / Booking |

**Relevant case studies:** Servloom (AI booking chatbot), GoodBooks Plus (AI exploration)

---

## Journey 5 — Portfolio / Case Study Exploration

| Step | AI Objective | Question / Response |
|------|-------------|---------------------|
| 1 | Identify industry/type | "What kind of product are you most interested in seeing — SaaS, mobile, e-commerce, AI, or something else?" |
| 2 | Surface relevant work | Describe matching case studies with direct links |
| 3 | Deepen interest | "Would you like to talk through how Mernify might approach something similar for you?" |
| CTA | Transition to project inquiry | Offer summary / booking |

---

## Journey 6 — Request an Estimate

| Step | AI Objective | Question / Response |
|------|-------------|---------------------|
| 1 | Clarify scope | "To give the Mernify team what they need for an estimate, can you describe the product and core features?" |
| 2 | Collect brief | Run through relevant discovery questions for the detected project type |
| 3 | Generate summary | "Here's a project summary I can send to the team…" |
| 4 | CTA | "Would you like me to send this to Mernify, or book a 30-minute discovery call?" |

> Note: The AI never provides pricing. All estimates are prepared by the Mernify team after discovery.

---

## Journey 7 — Book a Consultation

| Step | AI Objective | Question / Response |
|------|-------------|---------------------|
| 1 | Confirm intent | "Happy to help you book a discovery call. What's the project about in a sentence or two?" |
| 2 | Collect contact | Name + business email (company optional) |
| 3 | Consent | Privacy notice shown before submission |
| 4 | Open booking | Calendly link opens in new tab / fallback to `/contact?intent=discovery` |
| 5 | Confirm | "The booking page is open. The Mernify team will see your project context." |

---

## Journey 8 — Human Handoff

Trigger when any of:
- Visitor says: "speak to a human", "real person", "talk to someone", "contact the team"
- Pricing negotiation begins
- Legal or compliance commitments requested
- AI gives 3 unsatisfactory answers in a row (detected by user expressing frustration)
- Existing customer support request

Response template:
> "I'll connect you with the Mernify team directly. [If brief exists: I can share your project summary with them.] You can reach them at info@mernify.co or book a call using the button below. Someone will be in touch within one business day."

Then show: **Book a call** + **Send inquiry** CTAs.

---

## Intent Detection Keywords

| Intent | Trigger Keywords / Phrases |
|--------|---------------------------|
| `saas-development` | saas, platform, multi-tenant, subscription, b2b software, customer portal |
| `web-development` | website, web app, portal, landing page, marketing site |
| `mobile-app-development` | mobile, app, ios, android, react native, flutter, smartphone |
| `ai-integration` | ai, artificial intelligence, chatbot, automation, machine learning, llm, gpt |
| `workflow-automation` | automate, workflow, process, integration, n8n, zapier, make |
| `product-engineering` | product, mvp, startup, end-to-end, full-stack, rebuild |
| `ui-ux-design` | design, ux, ui, wireframe, prototype, figma |
| `cloud-devops` | cloud, devops, ci/cd, infrastructure, kubernetes, deployment |
| `dedicated-product-teams` | team, hire, developers, dedicated, pod, outsource |
| `portfolio` | portfolio, case study, work, examples, previous projects |
| `consultation` | estimate, quote, price, cost, book, call, discovery |
| `human-handoff` | human, person, real, team, contact, speak to someone |

---

## Qualification Signals

| Signal | Weight |
|--------|--------|
| Clear business problem described | High |
| Project type identified | High |
| Target users described | Medium |
| Core features listed | Medium |
| Timeline mentioned | Medium |
| Budget mentioned | Medium (not required) |
| Business email provided | High |
| Multiple high-intent page visits (passed in context) | Medium |
| Requested estimate or booking | Very High |

**Qualification categories:**
- `high-intent` — 4+ high/medium signals, booking or lead requested
- `qualified` — 3+ signals, clear project type
- `early-stage` — 1–2 signals, still exploring
- `research` — browsing, no clear commitment
- `other` — job, partnership, vendor, spam

> Internal qualification is never shown to visitors.
