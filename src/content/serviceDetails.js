/**
 * Rich per-service detail content for ServiceDetailPage.
 * Falls back to base catalogue fields when a slug has no override.
 * No fabricated metrics, awards, or client claims.
 */

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
      src: '/assets/images/services/overview-mockup.jpg',
      alt: 'Product analytics dashboard used to guide engineering decisions',
    },
    strip: '/assets/images/services/strip-wide.jpg',
    ctaMedia: {
      src: '/assets/images/services/cta-media.jpg',
      alt: 'Product team reviewing a polished interface before release',
    },
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
        src: '/assets/images/services/delivery-mockup.jpg',
        alt: 'Engineering and design workspace with product interface boards',
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
        src: '/assets/images/services/product-engineering.jpg',
        alt: 'Modern product interface representing end-to-end engineering craft',
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
    overviewBadge: detail.overviewBadge || 'Product systems',
    overviewMedia: detail.overviewMedia || {
      src: '/assets/images/services/overview-mockup.jpg',
      alt: 'Product interface mockup',
    },
    strip: detail.strip || '/assets/images/services/strip-wide.jpg',
    ctaMedia: detail.ctaMedia || {
      src: '/assets/images/services/cta-media.jpg',
      alt: 'Team collaborating on a digital product',
    },
    bannerSupport: detail.bannerSupport || null,
    heroLine: detail.heroLine || null,
  }
}
