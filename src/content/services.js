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
