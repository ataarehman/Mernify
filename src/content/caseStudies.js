/**
 * Case studies content.
 * status: 'published' | 'pending'
 * Pending entries are NOT shown as fake stories — public UI uses empty/pending states.
 * Keep draft fields for internal completion only (not rendered while pending).
 */
export const caseStudies = [
  {
    slug: 'saas-operations-platform',
    status: 'pending',
    title: 'Multi-tenant operations platform',
    industry: 'SaaS / Operations',
    services: ['SaaS Development', 'Product Engineering', 'UI/UX Design'],
    technology: ['React', 'Node.js', 'PostgreSQL', 'Docker'],
    challenge: null,
    solution: null,
    outcome: null,
    testimonial: null,
    related: [],
    draftNotes: {
      challenge: 'Operational bottleneck, users, and why existing stack could not scale.',
      solution: 'Product approach, architecture decisions, rollout plan.',
      outcome: 'Verified business outcomes only when approved.',
    },
  },
  {
    slug: 'field-service-mobile',
    status: 'pending',
    title: 'Field service mobile product',
    industry: 'Field Service',
    services: ['Mobile App Development', 'API Development', 'Cloud and DevOps'],
    technology: ['React Native', 'Node.js', 'PostgreSQL'],
    challenge: null,
    solution: null,
    outcome: null,
    testimonial: null,
    related: [],
    draftNotes: {
      challenge: 'Dispatch friction, offline needs, customer communication gaps.',
      solution: 'Mobile workflows, API boundaries, release process.',
      outcome: 'Verified results only when approved.',
    },
  },
  {
    slug: 'ai-document-workflow',
    status: 'pending',
    title: 'Document intelligence workflow',
    industry: 'Operations / Knowledge work',
    services: ['AI Integration', 'Workflow Automation', 'API Development'],
    technology: ['TypeScript', 'Python', 'Vector search', 'Cloud'],
    challenge: null,
    solution: null,
    outcome: null,
    testimonial: null,
    related: [],
    draftNotes: {
      challenge: 'Manual document handling cost and accuracy risk.',
      solution: 'Ingestion, extraction, human review, system integration.',
      outcome: 'Verified results only when approved.',
    },
  },
]

export const publishedCaseStudies = caseStudies.filter((item) => item.status === 'published')

export const homeWork = {
  eyebrow: 'Case studies',
  title: 'Selected product work',
  support:
    'We publish outcome-led case studies when clients approve public detail. Until then, explore services or start a discovery conversation.',
  viewAll: { label: 'View case studies', to: '/case-studies' },
  empty: {
    title: 'Case studies are preparing for publication',
    body: 'Detailed project stories—challenge, solution, product screens, and verified outcomes—will appear here as clients approve. We do not invent customer names or metrics.',
    cta: { label: 'Discuss a similar product', to: '/contact' },
    secondary: { label: 'Explore services', to: '/services' },
  },
  items: publishedCaseStudies,
}

export function getCaseStudyBySlug(slug) {
  return caseStudies.find((item) => item.slug === slug)
}
