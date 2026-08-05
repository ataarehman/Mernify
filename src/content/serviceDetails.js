/**
 * Rich per-service detail content for ServiceDetailPage.
 * Falls back to base catalogue fields when a slug has no override.
 * No fabricated metrics, awards, or client claims.
 */

import {
  webDevelopmentDetail,
  mobileAppDevelopmentDetail,
  aiIntegrationDetail,
  uiUxDesignDetail,
} from '@/content/serviceDetailsExtended'

const DEFAULT_ENGAGEMENT = [
  {
    id: 'project',
    title: 'Outcome project',
    text: 'A defined milestone—MVP, redesign, or platform slice—with clear acceptance criteria and demo checkpoints.',
    points: ['Scoped discovery + build', 'Visible timeline', 'Handover-ready release'],
  },
  {
    id: 'pod',
    title: 'Product engineering pod',
    text: 'A cross-functional squad that owns a roadmap lane with weekly cadence and transparent reporting.',
    points: ['Product + design + eng', 'Shared rituals', 'Flexible capacity'],
    featured: true,
  },
  {
    id: 'partner',
    title: 'Continuous partner',
    text: 'Longer-horizon ownership for iteration, reliability, and feature velocity after launch.',
    points: ['Priority lanes', 'Release hygiene', 'Roadmap co-planning'],
  },
]

const DEFAULT_WHY = [
  {
    icon: 'target',
    title: 'Clarity before code',
    text: 'We lock goals, constraints, and success metrics before architecture and sprint spend escalate.',
  },
  {
    icon: 'users',
    title: 'One accountable pod',
    text: 'Strategy, UX, and engineering stay connected—so you are not juggling disconnected vendors.',
  },
  {
    icon: 'shield',
    title: 'Production-minded defaults',
    text: 'Reviews, testing, observability, and handover are part of delivery—not optional extras.',
  },
  {
    icon: 'layers',
    title: 'Built to evolve',
    text: 'Systems and documentation designed so your team can extend, operate, and own what ships.',
  },
]

const DEFAULT_LIFECYCLE = [
  {
    title: 'Validate',
    text: 'Problem framing, stakeholder alignment, and a buildable scope that protects budget.',
  },
  {
    title: 'Architect',
    text: 'Technical direction, UX foundations, and integration plans that survive first contact with reality.',
  },
  {
    title: 'Ship',
    text: 'Incremental delivery with quality gates, demos, and a release path operators can trust.',
  },
  {
    title: 'Operate & grow',
    text: 'Monitoring, ownership transfer, and a roadmap for the next wave of product value.',
  },
]

const DEFAULT_FAQ = [
  {
    q: 'How do engagements typically start?',
    a: 'With a focused discovery conversation: goals, constraints, current systems, and what “done” means. From there we propose a scoped path—project, pod, or partnership.',
  },
  {
    q: 'Do you work with existing codebases?',
    a: 'Yes. Many engagements begin with an audit of the current product, stack, and delivery process before we plan architecture or rebuild decisions.',
  },
  {
    q: 'How do you keep stakeholders aligned?',
    a: 'Visible milestones, regular demos, and shared decision logs. Surprises get expensive—so communication is part of the delivery system.',
  },
  {
    q: 'What happens after launch?',
    a: 'We plan handover, documentation, and optional ongoing ownership so the product does not stall the week after release.',
  },
]

const DEFAULT_METHODOLOGY = [
  {
    title: 'Discover & define',
    body: 'Clarify goals, constraints, and success metrics before architecture decisions lock in.',
  },
  {
    title: 'Design the system',
    body: 'Shape journeys, interfaces, and technical direction so engineering starts with clarity.',
  },
  {
    title: 'Build & integrate',
    body: 'Deliver production-minded increments with reviews, testing, and integration as defaults.',
  },
  {
    title: 'Launch & improve',
    body: 'Ship with monitoring, ownership, and a path to iterate based on real usage.',
  },
]

const DEFAULT_BENEFITS = [
  {
    title: 'Clear scope',
    text: 'Decisions and deliverables stay visible from discovery through launch.',
  },
  {
    title: 'Reliable release',
    text: 'Production-minded engineering, reviews, and handover—not a demo dump.',
  },
  {
    title: 'Room to grow',
    text: 'Architecture and process prepared for users, features, and integrations ahead.',
  },
]

/** @type {Record<string, object>} */
export const serviceDetails = {
  'product-engineering': {
    heroLine: 'engineer for scale',
    bannerSupport:
      'From validated scope to maintainable release—one team connecting strategy, UX, and full-stack delivery.',
    overviewBadge: 'Product systems',
    overviewMedia: {
      src: '/assets/images/services/pe-overview.webp',
      alt: 'Product architecture, cloud systems, and interface design reviewed in a modern engineering workspace',
    },
    strip: '/assets/images/services/pe-strip.webp',
    ctaMedia: {
      src: '/assets/images/services/pe-cta.webp',
      alt: 'Engineering partners collaborating on architecture diagrams and product dashboards',
    },
    ctaTitle:
      'Ready to engineer a product that can ship, scale, and stay maintainable? Let’s build it together.',
    capabilityDetails: [
      {
        title: 'Discovery through architecture',
        text: 'Workshops, technical spikes, and system design that turn ambiguous ideas into a buildable plan.',
        icon: 'target',
      },
      {
        title: 'Cross-functional delivery pods',
        text: 'Product, design, and engineering operating as one unit—with shared ownership of outcomes.',
        icon: 'users',
      },
      {
        title: 'MVP to scale roadmap',
        text: 'A path from first release to durable growth: priorities, sequencing, and technical debt control.',
        icon: 'layers',
      },
      {
        title: 'Technical ownership after launch',
        text: 'Handover, documentation, and optional ongoing stewardship so the product keeps improving.',
        icon: 'shield',
      },
    ],
    engineeringHub: {
      eyebrow: 'Engineering Intelligence Hub',
      title: 'How Mernify builds scalable digital products—as one connected system',
      support:
        'Explore the disciplines that stay in sync from strategy to continuous optimization. This is product engineering—not isolated handoffs.',
      hub: {
        label: 'Product Core',
        hint: 'One outcome. Shared ownership.',
        icon: 'hub',
      },
      nodes: [
        {
          id: 'strategy',
          label: 'Strategy',
          icon: 'strategy',
          tag: 'Product Strategy',
          chip: 'Direction',
          title: 'Decide what deserves to be built',
          text: 'Clarify users, constraints, and success criteria so engineering effort maps to commercial intent—not feature sprawl.',
          points: ['Outcome framing', 'Scope sequencing', 'Risk-aware roadmap'],
          benefit: 'Teams share one view of what ships next and why.',
          accent: '#22d3ee',
        },
        {
          id: 'ux',
          label: 'Experience',
          icon: 'ux',
          tag: 'User Experience',
          chip: 'Clarity',
          title: 'Journeys engineers can actually implement',
          text: 'Flows, states, and interface systems designed with delivery constraints in mind—so UX intent survives contact with code.',
          points: ['Critical path flows', 'State & edge cases', 'Handoff-ready specs'],
          benefit: 'Less rebuild. Fewer “that wasn’t in the design” surprises.',
          accent: '#38bdf8',
        },
        {
          id: 'architecture',
          label: 'Architecture',
          icon: 'architecture',
          tag: 'Software Architecture',
          chip: 'Foundations',
          title: 'Systems that grow without a rewrite',
          text: 'Boundaries, data models, and integration patterns chosen for today’s MVP and tomorrow’s scale—without overbuilding day one.',
          points: ['Service boundaries', 'Data ownership', 'Integration strategy'],
          benefit: 'Scale paths stay open while first releases stay lean.',
          accent: '#818cf8',
        },
        {
          id: 'frontend',
          label: 'Frontend',
          icon: 'frontend',
          tag: 'Frontend Engineering',
          chip: 'Interface',
          title: 'Product surfaces that feel fast and durable',
          text: 'Component systems, performance habits, and accessible UI that keep the product feeling premium as features accumulate.',
          points: ['Design-system aligned UI', 'Performance budgets', 'Accessible interactions'],
          benefit: 'Interfaces stay maintainable as the product expands.',
          accent: '#a78bfa',
        },
        {
          id: 'backend',
          label: 'Backend',
          icon: 'backend',
          tag: 'Backend Systems',
          chip: 'Logic',
          title: 'Reliable services behind every workflow',
          text: 'APIs, domain logic, and data paths engineered for clarity, auth boundaries, and operational visibility.',
          points: ['Typed contracts', 'Auth & tenancy awareness', 'Observability hooks'],
          benefit: 'Business rules stay understandable when the product evolves.',
          accent: '#c4b5fd',
        },
        {
          id: 'cloud',
          label: 'Cloud',
          icon: 'cloud',
          tag: 'Cloud Infrastructure',
          chip: 'Runtime',
          title: 'Cloud-native delivery you can operate',
          text: 'Environments, pipelines, and runtime choices that make releases repeatable—and incidents diagnosable.',
          points: ['CI/CD discipline', 'Environment parity', 'Cost-aware scaling'],
          benefit: 'Shipping becomes routine instead of a heroic event.',
          accent: '#67e8f9',
        },
        {
          id: 'quality',
          label: 'Quality',
          icon: 'quality',
          tag: 'Quality Engineering',
          chip: 'Assurance',
          title: 'Quality baked into the critical path',
          text: 'Automated checks, review habits, and security basics treated as product requirements—not a late-stage audit.',
          points: ['Test strategy', 'Release readiness', 'Secure defaults'],
          benefit: 'Confidence to ship without gambling on production.',
          accent: '#34d399',
        },
        {
          id: 'optimize',
          label: 'Optimize',
          icon: 'optimize',
          tag: 'Continuous Optimization',
          chip: 'Momentum',
          title: 'Improve what you already shipped',
          text: 'Telemetry, feedback loops, and technical debt control so the product gets sharper after launch—not slower.',
          points: ['Post-release learning', 'Debt budgeting', 'Iteration cadence'],
          benefit: 'Launch is a milestone, not the end of engineering attention.',
          accent: '#5eead4',
        },
      ],
      metrics: [
        {
          label: 'Faster MVP path',
          kind: 'text',
          display: 'Lean',
          progress: 88,
          accent: '#22d3ee',
          text: 'Thin vertical slices that prove value before heavy platform spend.',
        },
        {
          label: 'Scalable architecture',
          kind: 'text',
          display: 'Scale',
          progress: 92,
          accent: '#818cf8',
          text: 'Growth-ready foundations without overbuilding the first release.',
        },
        {
          label: 'High-performance apps',
          kind: 'text',
          display: 'Fast',
          progress: 90,
          accent: '#38bdf8',
          text: 'Performance treated as a product feature across web and API surfaces.',
        },
        {
          label: 'Secure practices',
          kind: 'text',
          display: 'Safe',
          progress: 94,
          accent: '#34d399',
          text: 'Auth, boundaries, and review habits built into delivery—not bolted on.',
        },
        {
          label: 'Continuous improvement',
          end: 8,
          suffix: '',
          progress: 86,
          accent: '#a78bfa',
          text: 'Eight disciplines stay connected after launch through an optimization loop.',
        },
      ],
    },
    solutions: {
      eyebrow: 'What we engineer',
      title: 'Digital products that connect strategy to production',
      support: 'Engagements shaped around the milestone you need—validate, ship, stabilize, or scale.',
      items: [
        {
          title: 'Greenfield product builds',
          text: 'From framing to first production release with a coherent architecture and UX system.',
        },
        {
          title: 'Platform modernization',
          text: 'Stabilize delivery, reduce fragility, and modernize foundations without a reckless rewrite.',
        },
        {
          title: 'Cross-functional product pods',
          text: 'Embedded teams that own outcomes across discovery, design, and full-stack engineering.',
        },
        {
          title: 'Post-launch ownership',
          text: 'Optional stewardship so monitoring, iteration, and technical debt stay intentional.',
        },
      ],
    },
    stack: {
      eyebrow: 'Engineering stack',
      title: 'Modern foundations for products that last',
      support: 'Pragmatic choices matched to your constraints—not a fixed template for every engagement.',
      groups: [
        {
          title: 'Product surfaces',
          items: ['React / Next.js', 'TypeScript', 'Design systems', 'Accessible UI'],
        },
        {
          title: 'Systems & APIs',
          items: ['Node.js', 'REST / GraphQL', 'Postgres', 'Event-driven patterns'],
        },
        {
          title: 'Cloud & quality',
          items: ['AWS / Azure / GCP', 'CI/CD', 'Observability', 'Automated testing'],
        },
      ],
    },
    methodology: {
      eyebrow: 'Development methodology',
      title: 'A delivery system built for clarity and momentum',
      support:
        'Four connected stages—from framing the problem to operating what you ship—without throwing work over a wall.',
      steps: [
        {
          title: 'Discover & define',
          body: 'Map users, constraints, risks, and success metrics. Agree what must be true before heavy build starts.',
        },
        {
          title: 'Design the system',
          body: 'UX flows, interface direction, and technical architecture land together so engineering is never guessing intent.',
        },
        {
          title: 'Build & integrate',
          body: 'Incremental delivery with reviews, automated checks, and integration as a habit—not a final scramble.',
        },
        {
          title: 'Launch & improve',
          body: 'Release with monitoring and ownership. Capture learning and feed it into the next roadmap slice.',
        },
      ],
      media: {
        src: '/assets/images/services/pe-delivery.webp',
        alt: 'Product engineering workspace with interface systems and delivery notes',
      },
    },
    why: {
      eyebrow: 'Why Mernify',
      title: 'Product engineering without the vendor maze',
      support:
        'You get a coherent path from idea to production—led by people who care about both craft and commercial outcomes.',
      items: [
        {
          icon: 'target',
          title: 'Outcome-led scoping',
          text: 'We start from the decision you need to make—ship, stabilize, or scale—then assemble the right capability mix.',
        },
        {
          icon: 'workflow',
          title: 'Connected delivery',
          text: 'Discovery, UX, and engineering stay in one loop so architecture does not drift from the product story.',
        },
        {
          icon: 'shield',
          title: 'Production discipline',
          text: 'Quality, security basics, and release readiness are defaults—because demos are not the finish line.',
        },
        {
          icon: 'sparkles',
          title: 'Senior-minded craft',
          text: 'Thoughtful interfaces, maintainable code, and documentation your team can actually use.',
        },
      ],
      media: {
        src: '/assets/images/services/why-product-engineering.webp',
        alt: 'Product engineer and designer collaborating on scalable architecture and refined product interfaces',
      },
    },
    lifecycle: {
      eyebrow: 'Product lifecycle',
      title: 'Support across the full product arc',
      support:
        'Whether you are validating an MVP or modernizing a live platform, we meet you at the stage that matters now.',
      stages: [
        {
          title: 'Validate',
          text: 'Pressure-test the problem, audience, and constraints before you fund the wrong build.',
        },
        {
          title: 'Architect',
          text: 'Choose foundations that match growth ambitions without overbuilding day one.',
        },
        {
          title: 'Ship',
          text: 'Deliver increments that are reviewable, testable, and ready for real users.',
        },
        {
          title: 'Operate & grow',
          text: 'Stabilize, measure, and plan the next releases with clear technical ownership.',
        },
      ],
    },
    industries: {
      eyebrow: 'Industries we serve',
      title: 'Domain-aware product thinking',
      support:
        'We adapt delivery to sector realities—without implying regulated credentials unless a published case study says so.',
      slugs: ['healthcare', 'financial-services', 'logistics', 'retail', 'education', 'field-service'],
    },
    engagement: {
      eyebrow: 'Engagement models',
      title: 'Choose how you want to work together',
      support: 'Same engineering standard—different commercial shapes for pace, risk, and budget.',
      models: DEFAULT_ENGAGEMENT,
    },
    benefits: {
      eyebrow: 'What you can expect',
      title: 'Outcomes that feel tangible',
      items: [
        {
          title: 'Aligned decisions',
          text: 'Stakeholders share one view of scope, trade-offs, and what ships next.',
        },
        {
          title: 'Ship-ready increments',
          text: 'Work lands in production-minded slices—not a pile of unfinished prototypes.',
        },
        {
          title: 'A path after launch',
          text: 'Ownership, docs, and roadmap options so momentum does not die at release.',
        },
      ],
    },
    faq: {
      eyebrow: 'FAQ',
      title: 'Questions teams ask before starting',
      items: [
        {
          q: 'What does a Product Engineering engagement cover?',
          a: 'Typically discovery, UX and technical direction, full-stack implementation, quality practices, and a release plan—scoped to your milestone.',
        },
        {
          q: 'Can you join mid-product or only greenfield?',
          a: 'Both. We regularly inherit existing products, stabilize delivery, and modernize architecture without unnecessary rewrites.',
        },
        {
          q: 'How do you balance speed with quality?',
          a: 'By sequencing risk: validate early, ship thin vertical slices, and keep reviews and automated checks in the critical path.',
        },
        {
          q: 'Will our internal team stay involved?',
          a: 'Whenever possible. We prefer collaborative pods and clear handover so knowledge compounds inside your organization.',
        },
        {
          q: 'How do we get started?',
          a: 'Share the idea, operational challenge, or existing product. We will recommend a scoped next step—workshop, audit, or build proposal.',
        },
      ],
    },
  },

  'saas-development': {
    heroLine: 'built for tenants',
    bannerSupport:
      'Multi-tenant SaaS products with secure tenancy, subscription-ready foundations, and admin systems your team can operate and grow.',
    overviewBadge: 'SaaS platforms',
    overviewMedia: {
      src: '/assets/images/services/saas-overview.webp',
      alt: 'SaaS analytics dashboard and product workspace used to guide platform decisions',
    },
    strip: '/assets/images/services/saas-strip.webp',
    ctaMedia: {
      src: '/assets/images/services/saas-cta.webp',
      alt: 'Product team reviewing a multi-tenant SaaS platform before release',
    },
    capabilityDetails: [
      {
        title: 'Multi-tenant architecture',
        text: 'Isolation models, shared infrastructure patterns, and data boundaries designed for secure customer growth.',
        icon: 'layers',
      },
      {
        title: 'Admin & customer portals',
        text: 'Role-aware experiences for operators and end users—onboarding, settings, billing views, and support workflows.',
        icon: 'layoutDashboard',
      },
      {
        title: 'Subscription-ready foundations',
        text: 'Plans, entitlements, usage signals, and billing integrations structured so commercial models can evolve.',
        icon: 'sliders',
      },
      {
        title: 'Observability & release process',
        text: 'Monitoring, staged rollouts, and operational hygiene so SaaS releases stay predictable under load.',
        icon: 'cloud',
      },
    ],
    solutions: {
      eyebrow: 'SaaS solutions we build',
      title: 'Platforms shaped for recurring value',
      support:
        'From first MVP to enterprise-ready multi-tenant systems—patterns matched to how your customers buy and use software.',
      items: [
        {
          icon: 'layoutDashboard',
          title: 'B2B SaaS platforms',
          text: 'Team workspaces, roles, and collaboration features built for recurring business customers.',
          accent: '#4f46e5',
        },
        {
          icon: 'boxes',
          title: 'Enterprise SaaS',
          text: 'Governance, SSO-ready access patterns, audit-friendly logs, and admin depth for larger orgs.',
          accent: '#818cf8',
        },
        {
          icon: 'sparkles',
          title: 'AI SaaS applications',
          text: 'Model-powered features embedded in product workflows with clear evaluation and cost controls.',
          accent: '#15c6e2',
        },
        {
          icon: 'globe',
          title: 'Marketplace SaaS',
          text: 'Multi-sided platforms with listings, transactions, and operator tooling for network effects.',
          accent: '#22d3ee',
        },
        {
          icon: 'users',
          title: 'CRM platforms',
          text: 'Pipeline, account, and customer success systems tailored to your GTM motion.',
          accent: '#a78bfa',
        },
        {
          icon: 'workflow',
          title: 'Automation tools',
          text: 'Workflow products that connect systems, approvals, and exceptions without brittle scripts.',
          accent: '#34d399',
        },
        {
          icon: 'sliders',
          title: 'Internal business software',
          text: 'Operational SaaS for internal teams—same tenancy discipline, faster decision loops.',
          accent: '#f472b6',
        },
      ],
    },
    stack: {
      eyebrow: 'Technology stack',
      title: 'Modern foundations for durable SaaS',
      support:
        'We choose stack based on product stage and constraints—not fashion. Typical building blocks include:',
      groups: [
        {
          title: 'Frontend',
          items: ['React', 'Next.js', 'TypeScript', 'Design systems', 'Accessible UI'],
        },
        {
          title: 'Backend',
          items: ['Node.js', 'APIs & GraphQL', 'Auth & RBAC', 'Background jobs', 'Event-driven flows'],
        },
        {
          title: 'Cloud',
          items: ['AWS / GCP / Azure', 'Containers', 'Serverless where it fits', 'CDN & edge'],
        },
        {
          title: 'Databases',
          items: ['PostgreSQL', 'Redis', 'Object storage', 'Search indexes', 'Migration discipline'],
        },
        {
          title: 'DevOps',
          items: ['CI/CD', 'Staging environments', 'Observability', 'Feature flags', 'Release hygiene'],
        },
        {
          title: 'Product systems',
          items: ['Billing integrations', 'Entitlements', 'Audit trails', 'Admin tooling', 'API keys'],
        },
      ],
    },
    methodology: {
      eyebrow: 'SaaS development process',
      title: 'From discovery to continuous improvement',
      support:
        'A complete SaaS journey—strategy through cloud architecture, launch, and iteration—without disconnected vendors.',
      steps: [
        {
          title: 'Discovery',
          body: 'Clarify ICP, jobs-to-be-done, constraints, and success metrics before architecture spend accelerates.',
        },
        {
          title: 'Product strategy',
          body: 'Define MVP scope, packaging hypotheses, and the roadmap slices that protect learning velocity.',
        },
        {
          title: 'UI/UX design',
          body: 'Map onboarding, core loops, and admin journeys so engineering builds the right product surface.',
        },
        {
          title: 'MVP development',
          body: 'Ship a thin, valuable multi-tenant slice with real auth, tenancy, and measurable outcomes.',
        },
        {
          title: 'Cloud architecture',
          body: 'Scale foundations: environments, data isolation, APIs, and infrastructure ready for growth.',
        },
        {
          title: 'Testing',
          body: 'Automated checks, tenancy safety reviews, and release confidence before customers depend on you.',
        },
        {
          title: 'Deployment',
          body: 'Staged rollouts, monitoring, and operational runbooks so go-live is controlled—not heroic.',
        },
        {
          title: 'Continuous improvement',
          body: 'Instrumentation, backlog discipline, and iteration loops that keep the SaaS compounding value.',
        },
      ],
      media: {
        src: '/assets/images/services/saas-delivery.webp',
        alt: 'SaaS product workspace with admin portal designs and delivery planning',
      },
    },
    ecosystem: {
      eyebrow: 'SaaS product ecosystem',
      title: 'How a scalable SaaS platform actually works',
      support:
        'Users, subscriptions, cloud, data, and security are not separate projects—they form one connected product system. Explore each layer to see how Mernify designs SaaS for growth.',
      hub: {
        label: 'SaaS application',
        hint: 'Multi-tenant product core',
        icon: 'subscription',
        metric: 'One platform · many tenants',
      },
      stats: [
        {
          value: 99.9,
          suffix: '%',
          decimals: 1,
          label: 'Availability target',
          hint: 'Architecture designed for high uptime patterns',
        },
        {
          value: 1,
          suffix: '→N',
          decimals: 0,
          staticDisplay: '1→N',
          label: 'Tenant scale path',
          hint: 'Shared core, isolated customer data',
        },
        {
          value: 4,
          suffix: '×',
          decimals: 0,
          label: 'Faster iteration loops',
          hint: 'When product, billing, and ops stay connected',
        },
        {
          value: 24,
          suffix: '/7',
          decimals: 0,
          staticDisplay: '24/7',
          label: 'Always-on product posture',
          hint: 'Observability and release hygiene baked in',
        },
      ],
      nodes: [
        {
          id: 'users',
          label: 'Users',
          icon: 'users',
          accent: '#22d3ee',
          tag: 'Customer layer',
          title: 'Users & workspaces',
          text: 'Multiple customer organizations share one SaaS product while keeping people, permissions, and data correctly separated. Workspaces mirror how teams buy, invite, and collaborate.',
          benefit:
            'Onboarding feels native to each tenant—without cloning infrastructure for every customer.',
          points: [
            'Isolated workspaces with shared product surface',
            'Role-aware UX for admins, members, and guests',
            'Activation loops that survive first-week drop-off',
          ],
          metrics: [
            { label: 'Tenant isolation', value: 100, display: '%' },
            { label: 'Role model depth', value: 85, unit: '%' },
          ],
          chip: 'Secure multi-user environments',
        },
        {
          id: 'subscription',
          label: 'Subscriptions',
          icon: 'subscription',
          accent: '#818cf8',
          tag: 'Commercial layer',
          title: 'Subscription management',
          text: 'Plans, entitlements, trials, upgrades, and cancellations sit beside product access—not as an afterthought spreadsheet. Billing providers plug in; product logic stays yours.',
          benefit:
            'Commercial packaging can evolve without rewriting core application code.',
          points: [
            'Plan and entitlement mapping',
            'Lifecycle events: trial → paid → expand',
            'Usage signals for fair packaging decisions',
          ],
          metrics: [
            { label: 'Entitlement coverage', value: 92, unit: '%' },
            { label: 'Billing hook readiness', value: 88, unit: '%' },
          ],
          chip: 'Revenue-ready foundations',
        },
        {
          id: 'cloud',
          label: 'Cloud',
          icon: 'cloud',
          accent: '#38bdf8',
          tag: 'Infrastructure',
          title: 'Cloud scalability',
          text: 'Environments, auto-scaling patterns, and staged releases absorb traffic growth so the product does not need a rewrite when the first enterprise tenant arrives.',
          benefit:
            'Capacity and release control grow with users—without heroic late-night deploys.',
          points: [
            'Elastic cloud foundations',
            'Staging → canary → production paths',
            'Operational hygiene for always-on SaaS',
          ],
          metrics: [
            { label: 'Availability target', value: 99.9, unit: '%' },
            { label: 'Release safety', value: 90, unit: '%' },
          ],
          chip: 'Scalable cloud infrastructure',
        },
        {
          id: 'auth',
          label: 'Auth',
          icon: 'auth',
          accent: '#a78bfa',
          tag: 'Access control',
          title: 'Authentication & access',
          text: 'Identity, sessions, and permission boundaries protect every tenant edge. Least-privilege defaults keep power users productive without exposing neighbor data.',
          benefit:
            'Trust conversations get easier when access control is product-native.',
          points: [
            'Secure sign-in and session discipline',
            'RBAC aligned to real workspace roles',
            'Admin controls that operators can actually use',
          ],
          metrics: [
            { label: 'Boundary coverage', value: 95, unit: '%' },
            { label: 'Least-privilege score', value: 90, unit: '%' },
          ],
          chip: 'Enterprise-ready access',
        },
        {
          id: 'integrations',
          label: 'APIs',
          icon: 'integrations',
          accent: '#34d399',
          tag: 'Extensibility',
          title: 'API & integrations',
          text: 'Clean APIs and webhooks connect your SaaS to CRMs, billing tools, and customer workflows—so automation compounds without brittle one-offs.',
          benefit:
            'Customers stay longer when your product fits their existing stack.',
          points: [
            'Public and private API contracts',
            'Event-driven webhooks',
            'Partner-ready integration surfaces',
          ],
          metrics: [
            { label: 'Contract clarity', value: 90, unit: '%' },
            { label: 'Automation leverage', value: 80, unit: '%' },
          ],
          chip: 'Workflow-connected SaaS',
        },
        {
          id: 'database',
          label: 'Data',
          icon: 'database',
          accent: '#f472b6',
          tag: 'Data layer',
          title: 'Multi-tenant data architecture',
          text: 'Schemas and isolation strategies keep each customer’s data correct, queryable, and safe—while still sharing efficient infrastructure across the platform.',
          benefit:
            'Shared cost efficiency without sacrificing tenant trust boundaries.',
          points: [
            'Tenant-aware data models',
            'Migration discipline under live traffic',
            'Performance-minded query patterns',
          ],
          metrics: [
            { label: 'Isolation integrity', value: 100, unit: '%' },
            { label: 'Ops efficiency', value: 75, unit: '%' },
          ],
          chip: 'Shared core · isolated data',
        },
        {
          id: 'analytics',
          label: 'Analytics',
          icon: 'analytics',
          accent: '#2dd4bf',
          tag: 'Insight layer',
          title: 'Product analytics',
          text: 'Instrumentation surfaces activation, retention, and operational health—so roadmap decisions follow real usage instead of vanity dashboards.',
          benefit:
            'Product and engineering share one truth about what is working.',
          points: [
            'Activation and retention signals',
            'Ops dashboards for reliability',
            'Decision-ready product metrics',
          ],
          metrics: [
            { label: 'Signal coverage', value: 85, unit: '%' },
            { label: 'Decision clarity', value: 80, unit: '%' },
          ],
          chip: 'Insight-led iteration',
        },
        {
          id: 'security',
          label: 'Security',
          icon: 'security',
          accent: '#fb7185',
          tag: 'Trust layer',
          title: 'Security & compliance posture',
          text: 'Audit-friendly logging, least privilege, and secure defaults support enterprise trust conversations without freezing delivery velocity.',
          benefit:
            'Security becomes a shipping default—not a late-stage scramble.',
          points: [
            'Audit trails operators can explain',
            'Least-privilege access patterns',
            'Secure-by-default product choices',
          ],
          metrics: [
            { label: 'Audit readiness', value: 90, unit: '%' },
            { label: 'Default hardening', value: 88, unit: '%' },
          ],
          chip: 'Trust-ready delivery',
        },
      ],
    },
    why: {
      eyebrow: 'Why Mernify for SaaS',
      title: 'SaaS partners who think in platforms—not pages',
      support:
        'Scalability, security, and product craft stay connected so your SaaS can onboard customers and iterate safely.',
      items: [
        {
          icon: 'layers',
          title: 'Scalability by design',
          text: 'Tenancy, data models, and APIs shaped for growth—not bolted on after the first enterprise deal.',
        },
        {
          icon: 'shield',
          title: 'Security-minded defaults',
          text: 'Access control, audit trails, and isolation patterns treated as product requirements from day one.',
        },
        {
          icon: 'cloud',
          title: 'Cloud expertise',
          text: 'Environments, observability, and release paths that keep SaaS reliable under real usage.',
        },
        {
          icon: 'target',
          title: 'Product-focused approach',
          text: 'Commercial packaging, onboarding, and admin UX stay in the same loop as engineering delivery.',
        },
      ],
      media: {
        src: '/assets/images/services/saas-why.webp',
        alt: 'SaaS engineering team collaborating on cloud platform delivery',
      },
    },
    lifecycle: {
      eyebrow: 'SaaS product lifecycle',
      title: 'Support across every SaaS stage',
      support: 'Whether you are validating an MVP or hardening multi-tenant operations, we meet the stage you are in.',
      stages: [
        {
          title: 'Validate',
          text: 'Pressure-test the problem, packaging, and first tenancy model before you fund the wrong build.',
        },
        {
          title: 'Launch MVP',
          text: 'Ship a subscription-ready slice customers can buy, use, and give feedback on.',
        },
        {
          title: 'Scale tenants',
          text: 'Harden isolation, performance, billing, and admin workflows as customer count grows.',
        },
        {
          title: 'Operate & expand',
          text: 'Release cadence, reliability, and roadmap ownership so the platform keeps compounding.',
        },
      ],
    },
    industries: {
      eyebrow: 'Industries we serve',
      title: 'SaaS patterns across domains',
      support: 'We adapt multi-tenant delivery to sector realities—without implying regulated credentials unless a case study says so.',
      slugs: ['financial-services', 'healthcare', 'retail', 'logistics', 'education', 'field-service'],
    },
    engagement: {
      eyebrow: 'Engagement models',
      title: 'How SaaS teams work with us',
      support: 'Same engineering standard—different commercial shapes for pace, risk, and runway.',
      models: [
        {
          id: 'mvp',
          title: 'SaaS MVP build',
          text: 'A defined multi-tenant milestone with tenancy, core workflows, and a release you can put in front of buyers.',
          points: ['Scoped discovery + build', 'Demo-ready MVP', 'Handover-ready release'],
        },
        {
          id: 'pod',
          title: 'SaaS product pod',
          text: 'A cross-functional squad that owns a roadmap lane across product, UX, and platform engineering.',
          points: ['Product + design + eng', 'Weekly cadence', 'Flexible capacity'],
          featured: true,
        },
        {
          id: 'partner',
          title: 'Platform partner',
          text: 'Ongoing ownership for reliability, feature velocity, and multi-tenant evolution after launch.',
          points: ['Priority lanes', 'Release hygiene', 'Roadmap co-planning'],
        },
      ],
    },
    benefits: {
      eyebrow: 'What you can expect',
      title: 'Outcomes that feel tangible for SaaS',
      items: [
        {
          title: 'Tenant-ready foundations',
          text: 'Isolation, roles, and admin paths designed so customer growth does not force a rewrite.',
        },
        {
          title: 'Ship-ready increments',
          text: 'Work lands in production-minded slices—billing, onboarding, and core loops included when they matter.',
        },
        {
          title: 'A path after launch',
          text: 'Observability, docs, and roadmap options so momentum does not die at release.',
        },
      ],
    },
    faq: {
      eyebrow: 'FAQ',
      title: 'Questions SaaS teams ask before starting',
      items: [
        {
          q: 'Do you build multi-tenant SaaS from scratch or extend existing products?',
          a: 'Both. We greenfield MVPs and also harden or modernize existing SaaS codebases with clearer tenancy, billing, and release practices.',
        },
        {
          q: 'Can you integrate Stripe or other billing providers?',
          a: 'Yes. We implement subscription and entitlement patterns with providers that fit your commercial model—without locking product logic into one vendor forever.',
        },
        {
          q: 'How do you approach security and data isolation?',
          a: 'Tenancy boundaries, role-based access, audit-friendly logging, and environment hygiene are designed early—then verified in reviews and testing.',
        },
        {
          q: 'Will our internal team stay involved?',
          a: 'Whenever possible. We prefer collaborative pods and clear handover so platform knowledge compounds inside your organization.',
        },
        {
          q: 'How do we get started?',
          a: 'Share the product idea, existing SaaS, or growth bottleneck. We recommend a scoped next step—workshop, architecture review, or MVP build proposal.',
        },
      ],
    },
    ctaTitle:
      'Ready to build a SaaS product customers can subscribe to and trust? Let’s engineer a scalable platform together.',
  },

  'web-development': webDevelopmentDetail,
  'mobile-app-development': mobileAppDevelopmentDetail,
  'ai-integration': aiIntegrationDetail,
  'ui-ux-design': uiUxDesignDetail,
}

export function getServiceDetail(slug) {
  const detail = serviceDetails[slug] || {}
  return {
    methodology: {
      eyebrow: 'Process',
      title: null,
      support: null,
      steps: DEFAULT_METHODOLOGY,
      media: null,
      ...detail.methodology,
    },
    why: {
      eyebrow: 'Why Mernify',
      title: 'A partner built for reliable product delivery',
      support: 'Clarity, ownership, and production discipline—without the vendor maze.',
      items: DEFAULT_WHY,
      media: null,
      ...detail.why,
    },
    lifecycle: {
      eyebrow: 'Lifecycle',
      title: 'Support across the product journey',
      support: 'From validation to ongoing ownership—meet the stage you are in.',
      stages: DEFAULT_LIFECYCLE,
      ...detail.lifecycle,
    },
    industries: {
      eyebrow: 'Industries',
      title: 'Domain-aware delivery',
      support: 'Solution patterns adapted to sector realities.',
      slugs: ['healthcare', 'financial-services', 'logistics', 'retail'],
      ...detail.industries,
    },
    engagement: {
      eyebrow: 'Engagement',
      title: 'How we work with teams',
      support: 'Pick the commercial shape that matches your risk and pace.',
      models: DEFAULT_ENGAGEMENT,
      ...detail.engagement,
    },
    benefits: {
      eyebrow: 'Outcomes',
      title: 'What you can expect',
      items: DEFAULT_BENEFITS,
      ...detail.benefits,
    },
    faq: {
      eyebrow: 'FAQ',
      title: 'Common questions',
      items: DEFAULT_FAQ,
      ...detail.faq,
    },
    capabilityDetails: detail.capabilityDetails || null,
    solutions: detail.solutions || null,
    stack: detail.stack || null,
    ecosystem: detail.ecosystem || null,
    engineeringHub: detail.engineeringHub || null,
    webLayers: detail.webLayers || null,
    mobileJourney: detail.mobileJourney || null,
    aiPipeline: detail.aiPipeline || null,
    designFlow: detail.designFlow || null,
    overviewBadge: detail.overviewBadge || 'Product systems',
    overviewMedia: detail.overviewMedia || {
      src: '/assets/images/services/pe-overview.webp',
      alt: 'Product engineering collaboration and system design',
    },
    strip: detail.strip || '/assets/images/services/pe-strip.webp',
    ctaMedia: detail.ctaMedia || {
      src: '/assets/images/services/pe-cta.webp',
      alt: 'Product engineering partners reviewing delivery systems',
    },
    ctaTitle: detail.ctaTitle || null,
    bannerSupport: detail.bannerSupport || null,
    heroLine: detail.heroLine || null,
  }
}
