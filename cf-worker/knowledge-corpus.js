/**
 * Static knowledge corpus for Mernify AI RAG.
 * Sourced from website services, FAQs, process, industries, and portfolio.
 * Keep factual — no invented metrics beyond published case-study language.
 */

/** @typedef {{ id: string, source: string, title: string, url?: string, text: string, tags?: string[] }} KnowledgeChunk */

/** @type {KnowledgeChunk[]} */
export const KNOWLEDGE_CHUNKS = [
  // ── Company ───────────────────────────────────────────────────────────────
  {
    id: 'company-overview',
    source: 'website',
    title: 'Mernify company overview',
    url: '/',
    tags: ['company', 'about', 'mernify'],
    text: `Mernify is a focused product-engineering partner that designs, develops, modernizes, and scales digital products for startups and growing businesses. Tagline: Build Modern. Scale Confidently. Contact: info@mernify.co. Website: https://mernify.co. Positioning: more structured than freelancers, more flexible than large agencies.`,
  },
  {
    id: 'company-not-do',
    source: 'website',
    title: 'What Mernify does not offer',
    url: '/about',
    tags: ['scope', 'out-of-scope'],
    text: `Mernify does not provide IT helpdesk/managed services, pure content marketing or SEO agencies, hardware manufacturing or IoT firmware. Mernify is not a staffing agency — dedicated pods are managed by Mernify.`,
  },
  {
    id: 'pricing-policy',
    source: 'website',
    title: 'Pricing policy',
    url: '/contact',
    tags: ['pricing', 'estimate', 'cost', 'budget'],
    text: `Mernify does not publish standard pricing. Project cost depends on scope, team size, engagement model, and timeline. Custom estimates follow a short discovery conversation. Visitors can book a discovery call or submit an inquiry via /contact.`,
  },

  // ── Services ──────────────────────────────────────────────────────────────
  {
    id: 'svc-product-engineering',
    source: 'services',
    title: 'Product Engineering',
    url: '/services/product-engineering',
    tags: ['product', 'engineering', 'mvp', 'roadmap'],
    text: `Service: Product Engineering. Problem: Ideas stall between discovery, architecture, and production. Outcome: Coherent path from validated scope to maintainable release. Capabilities: Discovery through architecture; cross-functional delivery pods; MVP to scale roadmap; technical ownership after launch.`,
  },
  {
    id: 'svc-saas',
    source: 'services',
    title: 'SaaS Development',
    url: '/services/saas-development',
    tags: ['saas', 'multi-tenant', 'platform', 'subscription'],
    text: `Service: SaaS Development. Problem: Multi-tenant products need secure tenancy, billing-ready foundations, and admin workflows. Outcome: SaaS platforms teams can onboard customers on and iterate safely. Capabilities: Multi-tenant architecture; admin & customer portals; subscription-ready foundations; observability & release process.`,
  },
  {
    id: 'svc-web',
    source: 'services',
    title: 'Web Development',
    url: '/services/web-development',
    tags: ['website', 'web', 'portal', 'frontend'],
    text: `Service: Web Development. Problem: Business-critical web apps become slow, fragile, or hard to extend. Outcome: Fast, accessible web applications operators and customers use. Capabilities: Customer & internal portals; performance-focused frontends; secure API integration; accessibility-minded UI.`,
  },
  {
    id: 'svc-mobile',
    source: 'services',
    title: 'Mobile App Development',
    url: '/services/mobile-app-development',
    tags: ['mobile', 'ios', 'android', 'react native', 'flutter'],
    text: `Service: Mobile App Development. Problem: Native-quality UX without sacrificing delivery speed. Outcome: Store-ready iOS and Android experiences with reliable backends. Capabilities: iOS & Android delivery; React Native & Flutter; mobile API design; store submission support.`,
  },
  {
    id: 'svc-ai',
    source: 'services',
    title: 'AI Integration',
    url: '/services/ai-integration',
    tags: ['ai', 'rag', 'assistant', 'llm', 'automation'],
    text: `Service: AI Integration. Problem: AI experiments never reach production workflows. Outcome: Practical AI features embedded in products teams already run. Capabilities: Product-embedded assistants; intelligent search & RAG; model provider integrations; evaluation & guardrails.`,
  },
  {
    id: 'svc-automation',
    source: 'services',
    title: 'Workflow Automation',
    url: '/services/workflow-automation',
    tags: ['automation', 'workflow', 'process', 'ops'],
    text: `Service: Workflow Automation. Problem: Manual handoffs slow operations. Outcome: Automated workflows that reduce cycle time. Capabilities: Process mapping & design; system-to-system automation; approval & notification flows; monitoring & exception handling.`,
  },
  {
    id: 'svc-design',
    source: 'services',
    title: 'UI/UX Design',
    url: '/services/ui-ux-design',
    tags: ['design', 'ux', 'ui', 'prototype'],
    text: `Service: UI/UX Design. Problem: Engineering starts before the product is clear. Outcome: Validated flows and interfaces that de-risk build investment. Capabilities: Discovery workshops; user flows & wireframes; high-fidelity UI systems; interactive prototypes.`,
  },
  {
    id: 'svc-cloud',
    source: 'services',
    title: 'Cloud and DevOps',
    url: '/services/cloud-devops',
    tags: ['cloud', 'devops', 'ci', 'cd', 'infra'],
    text: `Service: Cloud and DevOps. Problem: Risky releases and environment drift. Outcome: Predictable delivery pipelines and cloud foundations. Capabilities: Cloud architecture; CI/CD pipelines; infrastructure as code; monitoring & incident readiness.`,
  },
  {
    id: 'svc-api',
    source: 'services',
    title: 'API Development',
    url: '/services/api-development',
    tags: ['api', 'integration', 'backend'],
    text: `Service: API Development. Design and implementation for product platforms and partner integrations. Capabilities: API design & versioning; auth & rate limiting; integration adapters; developer-friendly docs.`,
  },
  {
    id: 'svc-teams',
    source: 'services',
    title: 'Dedicated Product Teams',
    url: '/services/dedicated-product-teams',
    tags: ['hire', 'team', 'pod', 'developers', 'dedicated'],
    text: `Service: Dedicated Product Teams. Embedded product pods combining product thinking, design, engineering, and QA. Capabilities: Cross-functional pods; transparent reporting; flexible engagement models; long-term partnership option.`,
  },

  // ── Engagement models ─────────────────────────────────────────────────────
  {
    id: 'engage-models',
    source: 'services',
    title: 'Engagement models',
    url: '/process',
    tags: ['engagement', 'project', 'pod', 'partner'],
    text: `Engagement models: (1) Outcome Project — defined milestone (MVP, migration, redesign) with clear acceptance criteria. (2) Dedicated Product Pod — embedded squad owning a roadmap lane with weekly cadence. (3) Continuous Partner — longer-horizon partnership for iteration and reliability after launch.`,
  },

  // ── Process ───────────────────────────────────────────────────────────────
  {
    id: 'process-steps',
    source: 'process',
    title: 'Delivery process',
    url: '/process',
    tags: ['process', 'how we work', 'delivery', 'methodology'],
    text: `Process: Discover → Plan → Design → Develop → Test → Launch → Improve. Discover: goals, users, constraints, success metrics. Plan: scope, architecture, timeline, delivery model. Design: journeys, UI, prototypes. Develop: clean architecture and reviewable increments. Test: QA, performance, accessibility. Launch: deploy with monitoring and handover. Improve: measure and iterate.`,
  },
  {
    id: 'process-delivery-standard',
    source: 'process',
    title: 'Delivery standard',
    url: '/process',
    tags: ['delivery', 'demos', 'quality'],
    text: `Delivery standard: weekly demos and written updates; release-ready quality gates; clean handoff with docs and runbooks; adaptive scope when discovery reveals better paths.`,
  },

  // ── FAQs ──────────────────────────────────────────────────────────────────
  {
    id: 'faq-start',
    source: 'faq',
    title: 'How do engagements typically start?',
    url: '/contact',
    tags: ['faq', 'start', 'discovery'],
    text: `FAQ: How do engagements typically start? With a focused discovery conversation: goals, constraints, current systems, and what “done” means. From there Mernify proposes a scoped path — project, pod, or partnership.`,
  },
  {
    id: 'faq-existing',
    source: 'faq',
    title: 'Do you work with existing codebases?',
    url: '/services/product-engineering',
    tags: ['faq', 'legacy', 'audit', 'existing'],
    text: `FAQ: Do you work with existing codebases? Yes. Many engagements begin with an audit of the current product, stack, and delivery process before architecture or rebuild decisions.`,
  },
  {
    id: 'faq-aligned',
    source: 'faq',
    title: 'How do you keep stakeholders aligned?',
    url: '/process',
    tags: ['faq', 'communication', 'stakeholders'],
    text: `FAQ: How do you keep stakeholders aligned? Visible milestones, regular demos, and shared decision logs. Communication is part of the delivery system.`,
  },
  {
    id: 'faq-after-launch',
    source: 'faq',
    title: 'What happens after launch?',
    url: '/process',
    tags: ['faq', 'launch', 'handover', 'support'],
    text: `FAQ: What happens after launch? Mernify plans handover, documentation, and optional ongoing ownership so the product does not stall the week after release.`,
  },
  {
    id: 'faq-contact',
    source: 'faq',
    title: 'How do I contact Mernify?',
    url: '/contact',
    tags: ['faq', 'contact', 'book', 'call'],
    text: `FAQ: Contact Mernify at info@mernify.co, use the contact form at /contact, or book a discovery call when Calendly is configured. Share enough context for a useful first conversation; the team replies with clarifying questions and a suggested next step.`,
  },

  // ── Industries ────────────────────────────────────────────────────────────
  {
    id: 'ind-overview',
    source: 'industries',
    title: 'Industries served',
    url: '/industries',
    tags: ['industries', 'healthcare', 'fintech', 'retail'],
    text: `Industries (solution patterns, not claimed certifications): Healthcare, Financial Services, Logistics, Construction, Real Estate, Education, Retail, Manufacturing, Field Service, Travel. Industry pages describe typical product patterns — not unpublished client claims.`,
  },
  {
    id: 'ind-field-service',
    source: 'industries',
    title: 'Field Service industry',
    url: '/industries',
    tags: ['field service', 'dispatch', 'technician'],
    text: `Field Service: dispatch, technician mobile apps, and customer updates. Focus: scheduling & dispatch; technician mobile apps; customer status updates.`,
  },
  {
    id: 'ind-healthcare',
    source: 'industries',
    title: 'Healthcare industry',
    url: '/industries',
    tags: ['healthcare', 'medical', 'portal'],
    text: `Healthcare: care coordination, portals, and operational tools. Focus: patient and provider portals; scheduling & operations; secure data handling patterns.`,
  },

  // ── Portfolio / case studies (published, observed) ────────────────────────
  {
    id: 'cs-tailorize',
    source: 'portfolio',
    title: 'Case study: Tailorize',
    url: '/case-studies/tailorize',
    tags: ['case study', 'fashion', 'ai', 'mobile', 'saudi'],
    text: `Portfolio: Tailorize — AI-measured bespoke tailoring for Saudi Arabia (custom thobes and suits). Bilingual Arabic/English; AI smartphone measurement; iOS and Android apps. Services linked: Product Engineering, Web, UI/UX, Mobile. URL: /case-studies/tailorize. Authorship note: confirm delivery authorship with client before claiming Mernify built it.`,
  },
  {
    id: 'cs-servloom',
    source: 'portfolio',
    title: 'Case study: Servloom',
    url: '/case-studies/servloom',
    tags: ['case study', 'saas', 'field service', 'dispatch'],
    text: `Portfolio: Servloom — field service management SaaS with booking, dispatch, CRM, payments, and AI automation. URL: /case-studies/servloom.`,
  },
  {
    id: 'cs-godiva',
    source: 'portfolio',
    title: 'Case study: GODIVA',
    url: '/case-studies/godiva',
    tags: ['case study', 'ecommerce', 'luxury', 'retail'],
    text: `Portfolio: GODIVA — luxury chocolate e-commerce: occasion-led gifting, loyalty, subscriptions, seasonal campaigns. URL: /case-studies/godiva.`,
  },
  {
    id: 'cs-goodbooks',
    source: 'portfolio',
    title: 'Case study: GoodBooks Plus Analytics',
    url: '/case-studies/goodbooks-plus-analytics',
    tags: ['case study', 'analytics', 'saas', 'bi'],
    text: `Portfolio: GoodBooks Plus Analytics — self-serve BI for production monitoring, inventory, and dashboards. URL: /case-studies/goodbooks-plus-analytics.`,
  },
  {
    id: 'cs-medbill',
    source: 'portfolio',
    title: 'Case study: MedBill Ultra',
    url: '/case-studies/medbill-ultra',
    tags: ['case study', 'healthcare', 'billing', 'website'],
    text: `Portfolio: MedBill Ultra — conversion-led website for US medical billing and RCM services. URL: /case-studies/medbill-ultra.`,
  },
  {
    id: 'cs-metro',
    source: 'portfolio',
    title: 'Case study: Metro Electric',
    url: '/case-studies/metro-electric',
    tags: ['case study', 'services', 'website', 'perth'],
    text: `Portfolio: Metro Electric — premium service site for Perth commercial and industrial electrical work. URL: /case-studies/metro-electric.`,
  },
  {
    id: 'cs-spaceworx',
    source: 'portfolio',
    title: 'Case study: SpaceWorx',
    url: '/case-studies/spaceworx',
    tags: ['case study', 'product', 'workspace'],
    text: `Portfolio: SpaceWorx — product storytelling for modular privacy pods for modern workplaces. URL: /case-studies/spaceworx.`,
  },
  {
    id: 'cs-mrzzm',
    source: 'portfolio',
    title: 'Case study: MRZZM',
    url: '/case-studies/mrzzm',
    tags: ['case study', 'ecommerce', 'marketplace', 'saudi', 'uae'],
    text: `Portfolio: MRZZM — multi-category marketplace experience spanning Saudi Arabia and UAE. URL: /case-studies/mrzzm.`,
  },

  // ── Insights (no separate blog yet — process/about insights) ──────────────
  {
    id: 'insight-partner',
    source: 'insights',
    title: 'Partnership approach',
    url: '/about',
    tags: ['about', 'partnership', 'communication'],
    text: `Insight: Mernify emphasises direct communication, transparent delivery, and product ownership. Built around outcomes, not buzzwords — senior thinking early across discovery, architecture, and delivery under one roof.`,
  },
]
