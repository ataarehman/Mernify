/**
 * Rich detail content for Web, Mobile, AI, and UI/UX service pages.
 * Signature keys: webLayers, mobileJourney, aiPipeline, designFlow
 */

export const webDevelopmentDetail = {
  heroLine: 'platforms that perform',
  bannerSupport:
    'Business-critical web apps and portals engineered for speed, accessibility, and long-term maintainability—not fragile demos.',
  overviewBadge: 'Web platforms',
  overviewMedia: {
    src: '/assets/images/services/web-overview.webp',
    alt: 'Modern web application dashboard on a high-resolution display',
  },
  strip: '/assets/images/services/web-strip.webp',
  ctaMedia: {
    src: '/assets/images/services/web-cta.webp',
    alt: 'Engineering team building a performance-focused web product',
  },
  ctaTitle:
    'Ready for a web platform your operators and customers can trust at speed? Let’s build it together.',
  capabilityDetails: [
    {
      title: 'Customer & internal portals',
      text: 'Role-aware web experiences for customers and operators—clear journeys, secure access, durable UI systems.',
      icon: 'globe',
    },
    {
      title: 'Performance-focused frontends',
      text: 'Core Web Vitals, code splitting, and caching strategies that keep product surfaces feeling instant.',
      icon: 'zap',
    },
    {
      title: 'Secure API integration',
      text: 'Typed contracts, auth boundaries, and resilient integrations with the systems your business already runs.',
      icon: 'cable',
    },
    {
      title: 'Accessibility-minded UI',
      text: 'Keyboard, contrast, and semantics treated as product requirements—not polish after launch.',
      icon: 'checkCircle',
    },
  ],
  webLayers: {
    eyebrow: 'Web delivery stack',
    title: 'From browser to data—how resilient web products are layered',
    support:
      'Explore each layer of a production web platform. This is how we keep performance, security, and maintainability connected.',
    layers: [
      {
        id: 'browser',
        label: 'Browser',
        title: 'Client experience',
        text: 'The surface users feel first—rendering, interaction, and accessibility that determine whether the product feels trustworthy.',
        points: ['Responsive layouts', 'Accessible interactions', 'Optimistic UX patterns'],
        accent: '#22d3ee',
      },
      {
        id: 'edge',
        label: 'Edge / CDN',
        title: 'Edge delivery',
        text: 'Assets and pages closer to users so first paint stays fast across regions without overloading origin servers.',
        points: ['Global caching', 'Asset optimization', 'Lower TTFB under load'],
        accent: '#38bdf8',
      },
      {
        id: 'app',
        label: 'Application',
        title: 'Web application layer',
        text: 'Modern frontend architecture—routing, state, design systems—built to evolve without a rewrite every release.',
        points: ['Component systems', 'Route-level performance', 'Maintainable frontend architecture'],
        accent: '#818cf8',
      },
      {
        id: 'api',
        label: 'API',
        title: 'Integration & services',
        text: 'Secure APIs and BFF patterns that connect UI to business logic without leaking complexity into the client.',
        points: ['Auth-aware endpoints', 'Clear contracts', 'Resilient error handling'],
        accent: '#a78bfa',
      },
      {
        id: 'data',
        label: 'Data',
        title: 'Data & persistence',
        text: 'Schemas, caching, and query patterns that stay correct as features and traffic grow.',
        points: ['Reliable persistence', 'Cache strategy', 'Migration discipline'],
        accent: '#f472b6',
      },
    ],
  },
  solutions: {
    eyebrow: 'What we build on the web',
    title: 'Web products that carry real operations',
    support: 'Portals, platforms, and product experiences designed for daily use—not campaign microsites alone.',
    items: [
      {
        icon: 'globe',
        title: 'Customer portals',
        text: 'Self-serve accounts, status, and workflows that reduce support load.',
        accent: '#4f46e5',
      },
      {
        icon: 'layoutDashboard',
        title: 'Internal tools',
        text: 'Operator dashboards and admin surfaces that speed decisions.',
        accent: '#15c6e2',
      },
      {
        icon: 'boxes',
        title: 'Product web apps',
        text: 'Full product experiences with durable frontend architecture.',
        accent: '#818cf8',
      },
      {
        icon: 'sliders',
        title: 'Marketing + product hybrids',
        text: 'High-conversion sites connected to real product journeys.',
        accent: '#34d399',
      },
    ],
  },
  stack: {
    eyebrow: 'Web technology',
    title: 'Modern web foundations',
    support: 'Stack choices follow product stage and constraints—typical building blocks include:',
    groups: [
      { title: 'Frontend', items: ['React', 'TypeScript', 'Next.js / Vite', 'Design systems', 'Accessibility'] },
      { title: 'Delivery', items: ['CDN', 'SSR / SSG where useful', 'Image pipelines', 'Caching'] },
      { title: 'Backend', items: ['Node APIs', 'Auth', 'Integrations', 'Background jobs'] },
      { title: 'Quality', items: ['Core Web Vitals', 'Automated checks', 'Observability', 'CI/CD'] },
    ],
  },
  methodology: {
    eyebrow: 'Web development process',
    title: 'From experience definition to production performance',
    support: 'A clear path from journeys and architecture to launch and continuous improvement.',
    steps: [
      { title: 'Discover', body: 'Map users, constraints, and the decisions the web product must enable.' },
      { title: 'Architect', body: 'Choose rendering, API, and caching patterns that fit growth—not fashion.' },
      { title: 'Build', body: 'Ship accessible UI with secure integrations and measurable performance budgets.' },
      { title: 'Launch & tune', body: 'Release with monitoring, then iterate on real Core Web Vitals and usage.' },
    ],
    media: {
      src: '/assets/images/services/web-method.webp',
      alt: 'Engineering team pairing on a web application build',
    },
  },
  why: {
    eyebrow: 'Why Mernify for web',
    title: 'Web partners who treat performance as a product feature',
    support: 'Speed, accessibility, and maintainability stay in the same delivery loop.',
    items: [
      { icon: 'target', title: 'Outcome-first scoping', text: 'We start from operator and customer jobs—not a technology wishlist.' },
      { icon: 'shield', title: 'Secure by default', text: 'Auth, validation, and integration boundaries are part of the build—not an audit surprise.' },
      { icon: 'layers', title: 'Built to extend', text: 'Component systems and clear architecture so your team can keep shipping.' },
      { icon: 'sparkles', title: 'Craft you can feel', text: 'Interfaces that feel intentional on the devices your users actually use.' },
    ],
    media: {
      src: '/assets/images/services/web-why.webp',
      alt: 'Product analytics dashboard showing web performance gains',
    },
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Questions web teams ask',
    items: [
      {
        q: 'Do you rebuild from scratch or improve existing web apps?',
        a: 'Both. Many engagements start with an audit of performance, accessibility, and architecture before deciding what to keep, refactor, or replace.',
      },
      {
        q: 'Can you work with our design system?',
        a: 'Yes. We extend existing systems or establish a practical one that engineering can maintain.',
      },
      {
        q: 'How do you approach SEO for product sites?',
        a: 'We align rendering strategy, metadata, and content structure with product goals—without turning the engagement into a pure marketing build.',
      },
    ],
  },
}

export const mobileAppDevelopmentDetail = {
  heroLine: 'apps people keep',
  bannerSupport:
    'Store-ready iOS and Android experiences with thoughtful UX, solid APIs, and release pipelines built for real device diversity.',
  overviewBadge: 'Mobile products',
  overviewMedia: {
    src: '/assets/images/services/mobile-overview.webp',
    alt: 'Polished mobile application screens on modern devices',
  },
  strip: '/assets/images/services/mobile-strip.webp',
  ctaMedia: {
    src: '/assets/images/services/mobile-cta.webp',
    alt: 'Mobile product team reviewing native app experiences',
  },
  ctaTitle:
    'Ready to ship a mobile product people open again tomorrow? Let’s design and engineer it for retention.',
  capabilityDetails: [
    {
      title: 'iOS & Android delivery',
      text: 'Native-quality experiences across platforms with shared product intent and platform-aware craft.',
      icon: 'smartphone',
    },
    {
      title: 'React Native & Flutter',
      text: 'Cross-platform velocity when it fits—without sacrificing store readiness or performance.',
      icon: 'layers',
    },
    {
      title: 'Mobile API design',
      text: 'APIs shaped for offline tolerance, battery, and the realities of mobile networks.',
      icon: 'cable',
    },
    {
      title: 'Store submission support',
      text: 'Release checklists, compliance hygiene, and handoff that get you through App Store and Play review.',
      icon: 'checkCircle',
    },
  ],
  mobileJourney: {
    eyebrow: 'Mobile product journey',
    title: 'From discovery to retention—the moments that decide if an app lasts',
    support:
      'Mobile success is a journey, not a build ticket. Explore each stage we design for.',
    steps: [
      {
        id: 'discover',
        label: 'Discover',
        title: 'Store discovery',
        text: 'Positioning, screenshots, and first impressions that make the right users tap Install.',
        points: ['Store listing clarity', 'Value proposition in seconds', 'Trust signals'],
        accent: '#22d3ee',
      },
      {
        id: 'install',
        label: 'Install',
        title: 'First launch',
        text: 'Fast cold starts and permission flows that respect context—so users do not bounce before value.',
        points: ['Performance budgets', 'Permission timing', 'Platform conventions'],
        accent: '#38bdf8',
      },
      {
        id: 'onboard',
        label: 'Onboard',
        title: 'Activation',
        text: 'Guided paths to the “aha” moment without tutorial fatigue or dead-end empty states.',
        points: ['Progressive onboarding', 'Empty-state design', 'Account & auth friction control'],
        accent: '#818cf8',
      },
      {
        id: 'engage',
        label: 'Engage',
        title: 'Core loops',
        text: 'Daily and weekly habits designed into navigation, feedback, and offline-friendly flows.',
        points: ['Core task speed', 'Push & in-app messaging', 'Reliable sync'],
        accent: '#a78bfa',
      },
      {
        id: 'retain',
        label: 'Retain',
        title: 'Retention & release',
        text: 'Instrumentation, crash hygiene, and release cadence that keep the app improving after launch.',
        points: ['Crash & ANR discipline', 'Store updates', 'Retention analytics'],
        accent: '#f472b6',
      },
    ],
  },
  solutions: {
    eyebrow: 'Mobile products we ship',
    title: 'Apps built for real hands and real networks',
    support: 'Consumer and business mobile products with APIs and ops that survive production.',
    items: [
      { icon: 'smartphone', title: 'Consumer apps', text: 'Polished experiences designed for retention and store growth.', accent: '#4f46e5' },
      { icon: 'users', title: 'Field & workforce apps', text: 'Offline-tolerant tools for teams that work away from desks.', accent: '#15c6e2' },
      { icon: 'layoutDashboard', title: 'Companion apps', text: 'Mobile surfaces that extend a web or SaaS product.', accent: '#818cf8' },
      { icon: 'sparkles', title: 'MVP mobile launches', text: 'Focused first releases that prove value before scale.', accent: '#34d399' },
    ],
  },
  stack: {
    eyebrow: 'Mobile technology',
    title: 'Platforms and pipelines that get apps to stores',
    support: 'We choose native or cross-platform based on product constraints.',
    groups: [
      { title: 'Clients', items: ['React Native', 'Flutter', 'Native modules', 'Design systems'] },
      { title: 'Backend', items: ['Mobile-friendly APIs', 'Push', 'Auth', 'Media pipelines'] },
      { title: 'Release', items: ['TestFlight / Play tracks', 'CI', 'Crash reporting', 'Feature flags'] },
      { title: 'Quality', items: ['Device lab testing', 'Performance profiling', 'Accessibility'] },
    ],
  },
  methodology: {
    eyebrow: 'Mobile development process',
    title: 'From product framing to store-ready release',
    support: 'A delivery path that respects platform guidelines and retention realities.',
    steps: [
      { title: 'Frame', body: 'Clarify jobs-to-be-done, offline needs, and platform constraints early.' },
      { title: 'Design', body: 'Flows and UI systems that feel native on iOS and Android.' },
      { title: 'Build', body: 'Ship slices with API contracts, analytics, and crash hygiene included.' },
      { title: 'Release', body: 'Store submission, staged rollouts, and a plan for the next iteration.' },
    ],
    media: {
      src: '/assets/images/services/mobile-method.webp',
      alt: 'Mobile application source code running on a handset',
    },
  },
  why: {
    eyebrow: 'Why Mernify for mobile',
    title: 'Mobile partners who optimize for retention—not just shipping binaries',
    support: 'UX, APIs, and store readiness stay connected from the first sprint.',
    items: [
      { icon: 'smartphone', title: 'Platform craft', text: 'We respect iOS and Android conventions so apps feel native.' },
      { icon: 'workflow', title: 'End-to-end ownership', text: 'Client, API, and release pipeline under one accountable pod.' },
      { icon: 'shield', title: 'Production discipline', text: 'Crash, performance, and privacy basics are defaults.' },
      { icon: 'target', title: 'Outcome-led MVP', text: 'We ship the thinnest lovable path to retention learning.' },
    ],
    media: {
      src: '/assets/images/services/mobile-why.webp',
      alt: 'Set of smartphones displaying a released mobile product',
    },
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Questions mobile teams ask',
    items: [
      {
        q: 'Native or cross-platform?',
        a: 'We recommend based on UX depth, team skills, timeline, and long-term ownership—not a one-size default.',
      },
      {
        q: 'Can you take an existing app through store updates?',
        a: 'Yes. We often inherit codebases, stabilize quality, and establish a healthier release cadence.',
      },
      {
        q: 'Do you handle backend as well?',
        a: 'Typically yes—mobile products rarely succeed with a client-only engagement.',
      },
    ],
  },
}

export const aiIntegrationDetail = {
  heroLine: 'ai that ships',
  bannerSupport:
    'Practical AI features embedded in products your teams already run—with evaluation, guardrails, and maintainable architecture.',
  overviewBadge: 'AI in product',
  overviewMedia: {
    src: '/assets/images/services/ai-overview.webp',
    alt: 'AI-assisted product interface with insight panels',
  },
  strip: '/assets/images/services/ai-strip.webp',
  ctaMedia: {
    src: '/assets/images/services/ai-cta.webp',
    alt: 'Team reviewing production AI features inside a digital product',
  },
  ctaTitle:
    'Ready to put AI inside a real workflow—not another demo? Let’s ship features with guardrails.',
  capabilityDetails: [
    {
      title: 'Product-embedded assistants',
      text: 'Assistants that live inside existing product flows with clear jobs and measurable outcomes.',
      icon: 'sparkles',
    },
    {
      title: 'Intelligent search & RAG',
      text: 'Retrieval patterns grounded in your content—so answers stay useful and attributable.',
      icon: 'layers',
    },
    {
      title: 'Model provider integrations',
      text: 'Provider-flexible integrations with cost, latency, and fallback strategies designed in.',
      icon: 'cable',
    },
    {
      title: 'Evaluation & guardrails',
      text: 'Testing, monitoring, and policy controls so AI behavior stays trustworthy in production.',
      icon: 'shield',
    },
  ],
  aiPipeline: {
    eyebrow: 'AI delivery pipeline',
    title: 'How production AI features actually get built',
    support:
      'From sources to guardrails to product UI—explore the pipeline that turns experiments into maintainable features.',
    stages: [
      {
        id: 'sources',
        label: 'Sources',
        title: 'Data & knowledge sources',
        text: 'Identify trustworthy content and systems the model is allowed to use—nothing more.',
        points: ['Content inventory', 'Access boundaries', 'Freshness strategy'],
        accent: '#22d3ee',
      },
      {
        id: 'context',
        label: 'Context',
        title: 'Retrieval & context',
        text: 'Chunking, embeddings, and retrieval patterns that ground answers in the right material.',
        points: ['RAG design', 'Ranking quality', 'Citation paths'],
        accent: '#38bdf8',
      },
      {
        id: 'model',
        label: 'Model',
        title: 'Model orchestration',
        text: 'Provider choice, prompting, tools, and fallbacks balanced for cost and latency.',
        points: ['Model routing', 'Tool use', 'Cost controls'],
        accent: '#818cf8',
      },
      {
        id: 'guardrails',
        label: 'Guardrails',
        title: 'Safety & evaluation',
        text: 'Tests, filters, and human-in-the-loop points where risk is real—not theater.',
        points: ['Eval sets', 'Policy checks', 'Monitoring'],
        accent: '#a78bfa',
      },
      {
        id: 'product',
        label: 'Product',
        title: 'Product experience',
        text: 'UI patterns that set expectations, show uncertainty, and fit the workflow users already have.',
        points: ['In-product surfaces', 'Feedback loops', 'Success metrics'],
        accent: '#f472b6',
      },
    ],
  },
  solutions: {
    eyebrow: 'AI solutions we ship',
    title: 'Useful intelligence inside real products',
    support: 'Assistants, search, and automation that create measurable workflow value.',
    items: [
      { icon: 'sparkles', title: 'In-app assistants', text: 'Guided help and actions inside the product surface.', accent: '#4f46e5' },
      { icon: 'layers', title: 'Knowledge search', text: 'RAG-powered answers grounded in your documents.', accent: '#15c6e2' },
      { icon: 'workflow', title: 'Workflow copilots', text: 'AI that drafts, routes, or summarizes operational work.', accent: '#818cf8' },
      { icon: 'shield', title: 'Governed AI features', text: 'Production controls for teams that cannot ship blindly.', accent: '#34d399' },
    ],
  },
  stack: {
    eyebrow: 'AI technology',
    title: 'Practical stack for maintainable AI features',
    support: 'We stay provider-flexible and product-first.',
    groups: [
      { title: 'Models', items: ['Leading LLM APIs', 'Embeddings', 'Rerankers', 'Fallbacks'] },
      { title: 'Data', items: ['Vector stores', 'Document pipelines', 'Access control', 'Caching'] },
      { title: 'App layer', items: ['Orchestration', 'Tool calling', 'Streaming UI', 'Feedback capture'] },
      { title: 'Ops', items: ['Evals', 'Tracing', 'Cost monitoring', 'Policy gates'] },
    ],
  },
  methodology: {
    eyebrow: 'AI integration process',
    title: 'From use-case clarity to governed production features',
    support: 'We reduce AI risk by sequencing discovery, evaluation, and product fit before scale.',
    steps: [
      { title: 'Define the job', body: 'Lock the workflow outcome and success criteria before model shopping.' },
      { title: 'Prototype with evals', body: 'Test quality on real samples with measurable acceptance bars.' },
      { title: 'Integrate', body: 'Ship into the product UI with auth, logging, and cost controls.' },
      { title: 'Operate', body: 'Monitor drift, failures, and usage—then iterate deliberately.' },
    ],
    media: {
      src: '/assets/images/services/ai-method.webp',
      alt: 'Engineers reviewing model output during an AI build',
    },
  },
  why: {
    eyebrow: 'Why Mernify for AI',
    title: 'AI partners who ship into products—not slide decks',
    support: 'Use-case clarity, architecture, and guardrails stay connected.',
    items: [
      { icon: 'target', title: 'Workflow-first AI', text: 'We start from the job to be done, not the model brand.' },
      { icon: 'shield', title: 'Guardrails included', text: 'Evaluation and monitoring are part of delivery.' },
      { icon: 'layers', title: 'Maintainable architecture', text: 'Provider flexibility and clear ownership after launch.' },
      { icon: 'sparkles', title: 'Product craft', text: 'AI UX that sets expectations and earns trust.' },
    ],
    media: {
      src: '/assets/images/services/ai-why.webp',
      alt: 'Analytics chart tracking results from an automated workflow',
    },
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Questions AI teams ask',
    items: [
      {
        q: 'Do you fine-tune models?',
        a: 'When it is justified. Many products get better ROI from retrieval, tooling, and UX before fine-tuning.',
      },
      {
        q: 'Can AI features use our private data safely?',
        a: 'Yes—with access controls, redaction patterns, and architecture that respects tenancy and policy.',
      },
      {
        q: 'How do you measure success?',
        a: 'We define task success, latency, cost, and qualitative quality bars up front—then instrument them.',
      },
    ],
  },
}

export const uiUxDesignDetail = {
  heroLine: 'design before code',
  bannerSupport:
    'Product design and UX that clarifies journeys, prototypes decisions early, and hands engineering a buildable system.',
  overviewBadge: 'Product design',
  overviewMedia: {
    src: '/assets/images/services/uiux-overview.webp',
    alt: 'UI design system components and interface craft on a designer desk',
  },
  strip: '/assets/images/services/uiux-strip.webp',
  ctaMedia: {
    src: '/assets/images/services/uiux-cta.webp',
    alt: 'Designer refining product interfaces and design systems',
  },
  ctaTitle:
    'Ready to de-risk your next build with clear flows and a design system engineering can trust? Let’s start.',
  capabilityDetails: [
    {
      title: 'Experience research',
      text: 'Lightweight research that clarifies users, jobs, and constraints before pixels harden.',
      icon: 'users',
    },
    {
      title: 'Flows & information architecture',
      text: 'Journey maps and structures that keep complex products navigable.',
      icon: 'workflow',
    },
    {
      title: 'UI systems',
      text: 'Components, tokens, and patterns that scale across screens without redesigning every feature.',
      icon: 'layers',
    },
    {
      title: 'Prototype & handoff',
      text: 'Interactive prototypes and engineering-ready specs that reduce build ambiguity.',
      icon: 'penTool',
    },
  ],
  designFlow: {
    eyebrow: 'Design delivery flow',
    title: 'How we move from ambiguity to buildable interface systems',
    support:
      'Explore each phase. Design is a decision system—not a pile of pretty screens.',
    phases: [
      {
        id: 'research',
        label: 'Research',
        title: 'Understand the problem',
        text: 'Stakeholder alignment and user clarity so design solves the right friction.',
        points: ['Jobs-to-be-done', 'Constraint mapping', 'Success criteria'],
        accent: '#4f46e5',
      },
      {
        id: 'flows',
        label: 'Flows',
        title: 'Shape the journeys',
        text: 'Information architecture and critical paths before visual polish.',
        points: ['User flows', 'IA', 'Edge-case planning'],
        accent: '#6366f1',
      },
      {
        id: 'system',
        label: 'System',
        title: 'Build the UI system',
        text: 'Tokens, components, and patterns that keep the product coherent as it grows.',
        points: ['Design tokens', 'Components', 'Content patterns'],
        accent: '#15c6e2',
      },
      {
        id: 'prototype',
        label: 'Prototype',
        title: 'Prove the experience',
        text: 'Interactive prototypes that test clarity with stakeholders and users early.',
        points: ['Clickable prototypes', 'Usability checks', 'Decision capture'],
        accent: '#22d3ee',
      },
      {
        id: 'handoff',
        label: 'Handoff',
        title: 'Enable engineering',
        text: 'Specs, states, and collaboration rituals that make implementation faithful.',
        points: ['State coverage', 'Responsive rules', 'Dev collaboration'],
        accent: '#818cf8',
      },
    ],
  },
  solutions: {
    eyebrow: 'Design engagements',
    title: 'Design work that reduces engineering risk',
    support: 'From new products to redesigns of complex operational software.',
    items: [
      { icon: 'penTool', title: 'Product UX', text: 'End-to-end experience design for web and mobile products.', accent: '#4f46e5' },
      { icon: 'layers', title: 'Design systems', text: 'Scalable UI foundations shared by design and engineering.', accent: '#15c6e2' },
      { icon: 'layoutDashboard', title: 'Dashboard UX', text: 'Clarity for dense operational and analytics interfaces.', accent: '#818cf8' },
      { icon: 'sparkles', title: 'Design sprints', text: 'Focused workshops that unlock stuck product decisions.', accent: '#34d399' },
    ],
  },
  stack: {
    eyebrow: 'Design toolkit',
    title: 'Tools that keep design and engineering aligned',
    support: 'We meet teams where they work and optimize for handoff quality.',
    groups: [
      { title: 'Design', items: ['Figma', 'Prototyping', 'Design tokens', 'Component libraries'] },
      { title: 'Research', items: ['Interviews', 'Usability tests', 'Analytics review', 'Journey mapping'] },
      { title: 'Handoff', items: ['Specs & states', 'Accessibility notes', 'Dev mode workflows'] },
      { title: 'Collaboration', items: ['Workshops', 'Critique rituals', 'Design-eng pairing'] },
    ],
  },
  methodology: {
    eyebrow: 'Design process',
    title: 'Clarity first—then craft',
    support: 'A rhythm that protects engineering from rebuilding the wrong interface.',
    steps: [
      { title: 'Align', body: 'Agree on users, constraints, and the decision the design must unlock.' },
      { title: 'Explore', body: 'Flow and concept options tested quickly before commitment.' },
      { title: 'Systemize', body: 'UI patterns and components that scale beyond one screen.' },
      { title: 'Validate & hand off', body: 'Prototype, refine, and deliver engineering-ready artifacts.' },
    ],
    media: {
      src: '/assets/images/services/uiux-method.webp',
      alt: 'Design and engineering desk set up for interface work',
    },
  },
  why: {
    eyebrow: 'Why Mernify for design',
    title: 'Design partners who speak engineering fluently',
    support: 'Beautiful interfaces mean little if they are not buildable and usable.',
    items: [
      { icon: 'penTool', title: 'Product-minded craft', text: 'We design for jobs and outcomes—not decoration.' },
      { icon: 'users', title: 'Collaborative process', text: 'Stakeholders and engineers stay in the loop early.' },
      { icon: 'layers', title: 'Systems thinking', text: 'Components and tokens that survive the next ten features.' },
      { icon: 'checkCircle', title: 'Handoff quality', text: 'States, edge cases, and accessibility included.' },
    ],
    media: {
      src: '/assets/images/services/uiux-why.webp',
      alt: 'Interface design system open in a design tool',
    },
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Questions design stakeholders ask',
    items: [
      {
        q: 'Can design and engineering run in parallel?',
        a: 'Yes. We often overlap phases so engineering can start on foundations while UX hardens critical flows.',
      },
      {
        q: 'Do you only deliver Figma files?',
        a: 'We deliver decision-quality artifacts: flows, systems, prototypes, and handoff notes—not orphaned mockups.',
      },
      {
        q: 'Can you redesign an existing product?',
        a: 'Absolutely. We frequently improve complex products without discarding what already works.',
      },
    ],
  },
}
