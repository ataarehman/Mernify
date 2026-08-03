/**
 * Service catalogue — purchase-oriented, not stack-first.
 * Icons map to lucide-react names resolved in UI.
 */
export const services = [
  {
    id: 'product-engineering',
    slug: 'product-engineering',
    title: 'Product Engineering',
    shortTitle: 'Product Engineering',
    icon: 'boxes',
    problem: 'Ideas stall between discovery, architecture, and production delivery.',
    outcome: 'A coherent product path from validated scope to maintainable release.',
    description:
      'End-to-end product engineering that connects strategy, UX, and full-stack delivery so teams ship reliable software without juggling disconnected vendors.',
    capabilities: [
      'Discovery through architecture',
      'Cross-functional delivery pods',
      'MVP to scale roadmap',
      'Technical ownership after launch',
    ],
    featured: true,
  },
  {
    id: 'saas-development',
    slug: 'saas-development',
    title: 'SaaS Development',
    shortTitle: 'SaaS',
    icon: 'layoutDashboard',
    problem: 'Multi-tenant products need secure tenancy, billing-ready foundations, and admin workflows.',
    outcome: 'SaaS platforms teams can onboard customers on and iterate safely.',
    description:
      'We design and build SaaS products with clean tenancy models, role-based access, admin systems, and APIs prepared for growth.',
    capabilities: [
      'Multi-tenant architecture',
      'Admin & customer portals',
      'Subscription-ready foundations',
      'Observability & release process',
    ],
    featured: true,
  },
  {
    id: 'web-development',
    slug: 'web-development',
    title: 'Web Development',
    shortTitle: 'Web',
    icon: 'globe',
    problem: 'Business-critical web apps become slow, fragile, or hard to extend.',
    outcome: 'Fast, accessible web applications that operators and customers actually use.',
    description:
      'Modern web platforms, portals, and marketing-adjacent product experiences engineered for performance, security, and long-term maintainability.',
    capabilities: [
      'Customer & internal portals',
      'Performance-focused frontends',
      'Secure API integration',
      'Accessibility-minded UI',
    ],
  },
  {
    id: 'mobile-app-development',
    slug: 'mobile-app-development',
    title: 'Mobile App Development',
    shortTitle: 'Mobile',
    icon: 'smartphone',
    problem: 'Mobile products need native-quality UX without sacrificing delivery speed.',
    outcome: 'Store-ready iOS and Android experiences with reliable backends.',
    description:
      'Cross-platform and native-quality mobile applications with thoughtful UX, solid APIs, and release pipelines ready for App Store and Play.',
    capabilities: [
      'iOS & Android delivery',
      'React Native & Flutter',
      'Mobile API design',
      'Store submission support',
    ],
    featured: true,
  },
  {
    id: 'ai-integration',
    slug: 'ai-integration',
    title: 'AI Integration',
    shortTitle: 'AI Integration',
    icon: 'sparkles',
    problem: 'AI experiments never reach production workflows or create measurable value.',
    outcome: 'Practical AI features embedded in products your teams already run.',
    description:
      'We integrate assistants, search, and model-powered features into real products with clear success criteria, governance, and maintainable architecture.',
    capabilities: [
      'Product-embedded assistants',
      'Intelligent search & RAG',
      'Model provider integrations',
      'Evaluation & guardrails',
    ],
  },
  {
    id: 'workflow-automation',
    slug: 'workflow-automation',
    title: 'Workflow Automation',
    shortTitle: 'Automation',
    icon: 'workflow',
    problem: 'Manual handoffs slow operations and introduce costly errors.',
    outcome: 'Automated workflows that reduce cycle time and free specialist attention.',
    description:
      'Business process automation that connects systems, documents, and approvals so work moves without constant human chasing.',
    capabilities: [
      'Process mapping & design',
      'System-to-system automation',
      'Approval & notification flows',
      'Monitoring & exception handling',
    ],
  },
  {
    id: 'ui-ux-design',
    slug: 'ui-ux-design',
    title: 'UI/UX Design',
    shortTitle: 'UI/UX',
    icon: 'penTool',
    problem: 'Engineering starts before the product is clear to users or stakeholders.',
    outcome: 'Validated flows and interfaces that de-risk build investment.',
    description:
      'Product design and UX that clarifies journeys, prototypes decisions early, and hands engineering a buildable system.',
    capabilities: [
      'Discovery workshops',
      'User flows & wireframes',
      'High-fidelity UI systems',
      'Interactive prototypes',
    ],
  },
  {
    id: 'cloud-devops',
    slug: 'cloud-devops',
    title: 'Cloud and DevOps',
    shortTitle: 'Cloud & DevOps',
    icon: 'cloud',
    problem: 'Releases are risky, environments drift, and scaling becomes reactive.',
    outcome: 'Predictable delivery pipelines and cloud foundations that support growth.',
    description:
      'Cloud architecture, CI/CD, and operational practices that keep products secure, observable, and releasable.',
    capabilities: [
      'Cloud architecture',
      'CI/CD pipelines',
      'Infrastructure as code',
      'Monitoring & incident readiness',
    ],
  },
  {
    id: 'api-development',
    slug: 'api-development',
    title: 'API Development',
    shortTitle: 'APIs',
    icon: 'cable',
    problem: 'Products and partners cannot integrate cleanly or securely.',
    outcome: 'Well-documented APIs that unlock ecosystems and internal reuse.',
    description:
      'API design and implementation for product platforms, partner integrations, and service boundaries that stay stable as you grow.',
    capabilities: [
      'API design & versioning',
      'Auth & rate limiting',
      'Integration adapters',
      'Developer-friendly docs',
    ],
  },
  {
    id: 'dedicated-product-teams',
    slug: 'dedicated-product-teams',
    title: 'Dedicated Product Teams',
    shortTitle: 'Product Teams',
    icon: 'users',
    problem: 'Hiring a full product team is slow; freelancers lack continuity.',
    outcome: 'A focused pod that owns delivery with clear communication and accountability.',
    description:
      'Embedded product pods combining product thinking, design, engineering, and QA—structured enough for serious delivery, flexible enough for startups.',
    capabilities: [
      'Cross-functional pods',
      'Transparent reporting',
      'Flexible engagement models',
      'Long-term partnership option',
    ],
    featured: true,
  },
]

export function getServiceBySlug(slug) {
  return services.find((item) => item.slug === slug)
}

/** Homepage featured subset with hierarchy */
export const homeServices = {
  eyebrow: 'Capabilities',
  title: 'Product engineering that buyers actually purchase',
  support:
    'Organized by commercial outcomes—not programming languages—so founders and operators can find the right engagement quickly.',
  viewAll: { label: 'View all services', to: '/services' },
  items: services,
}

/** Extra Services page sections (complements the catalogue list) */
export const servicesPage = {
  intro: {
    eyebrow: '( Who we are )',
    title:
      'A multidisciplinary agency delivering impactful digital products that inspire progress, creativity and new potential.',
    support:
      'Every engagement starts with the decision you need to make—ship, scale, stabilize, or explore—then maps the right capability mix.',
    media: {
      back: {
        src: '/assets/images/thumbs/about-thumb-two.jpg',
        alt: 'Abstract texture study in soft cream and beige tones',
      },
      front: {
        src: '/assets/images/thumbs/about-thumb-one.jpg',
        alt: 'Product designer reviewing a mobile experience',
      },
    },
    tags: [
      { label: 'Product Engineering', to: '/services/product-engineering' },
      { label: 'Web Design & Development', to: '/services/web-development' },
      { label: 'UI/UX Design', to: '/services/ui-ux-design' },
      { label: 'SaaS Development', to: '/services/saas-development' },
      { label: 'AI Integration', to: '/services/ai-integration' },
      { label: 'Mobile Apps', to: '/services/mobile-app-development' },
      { label: 'Cloud & DevOps', to: '/services/cloud-devops' },
      { label: 'Dedicated Teams', to: '/services/dedicated-product-teams' },
    ],
  },
  engagement: {
    eyebrow: 'Engagement models',
    title: 'Choose how you want to work with us',
    support:
      'Same engineering standard—different commercial shapes—so startups and operators can match pace, risk, and budget.',
    models: [
      {
        id: 'outcome',
        index: '01',
        icon: 'checkCircle',
        title: 'Outcome project',
        text: 'A defined milestone—MVP, migration, redesign, or platform slice—with clear acceptance criteria.',
        points: ['Fixed discovery + build phases', 'Scoped backlog & timeline', 'Demo-driven checkpoints'],
        cta: { label: 'Discuss a project', to: '/contact?intent=project' },
      },
      {
        id: 'pod',
        index: '02',
        icon: 'users',
        title: 'Dedicated product pod',
        text: 'An embedded squad that owns a roadmap lane with weekly cadence and transparent reporting.',
        points: ['Product + design + engineering', 'Shared tooling & rituals', 'Flexible capacity'],
        cta: { label: 'Build a pod', to: '/contact?intent=pod' },
        featured: true,
      },
      {
        id: 'partner',
        index: '03',
        icon: 'lifeBuoy',
        title: 'Continuous partner',
        text: 'Longer-horizon partnership for iteration, reliability, and feature velocity after launch.',
        points: ['Priority support lanes', 'Release & ops hygiene', 'Roadmap co-planning'],
        cta: { label: 'Explore partnership', to: '/contact?intent=partnership' },
      },
    ],
  },
  delivery: {
    eyebrow: 'Delivery standard',
    title: 'What working with Mernify feels like in practice',
    support:
      'Predictable communication, senior-led decisions, and production discipline—so progress stays visible and shippable.',
    media: {
      src: '/assets/images/services/delivery-mockup.jpg',
      alt: 'Design and product workspace with interface mockups',
    },
    principles: [
      {
        id: 'cadence',
        title: 'Visible cadence',
        text: 'Weekly demos, written updates, and decision logs—not black-box progress.',
      },
      {
        id: 'quality',
        title: 'Release-ready quality',
        text: 'Review gates, environments, and observability baked into the delivery path.',
      },
      {
        id: 'handoff',
        title: 'Clean handoff',
        text: 'Docs, runbooks, and knowledge transfer so your team can operate with confidence.',
      },
      {
        id: 'adapt',
        title: 'Adaptive scope',
        text: 'We protect outcomes while adjusting scope when discovery reveals better paths.',
      },
    ],
    actions: {
      primary: { label: 'See our process', to: '/process' },
      secondary: { label: 'Talk to us', to: '/contact' },
    },
  },
}
