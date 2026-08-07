/**
 * Blog content — high-quality dummy posts for the marketing site.
 * Images reuse existing optimized public assets.
 */

export const blogCategories = [
  'All',
  'AI',
  'Web Development',
  'Cloud',
  'DevOps',
  'UI/UX',
  'Business',
  'Product Engineering',
  'SaaS',
  'MERN',
]

/** @typedef {{ slug: string, title: string, excerpt: string, category: string, author: { name: string, role: string }, publishedAt: string, readingMinutes: number, featured: boolean, image: string, imageAlt: string, tags: string[], body: string[] }} BlogPost */

/** @type {BlogPost[]} */
export const blogPosts = [
  {
    slug: 'practical-ai-integration-for-saas-products',
    title: 'Practical AI Integration for SaaS Products Without the Hype',
    excerpt:
      'How product teams embed assistants, retrieval, and automation into real workflows — with evaluation, guardrails, and measurable outcomes.',
    category: 'AI',
    author: { name: 'Ayesha Khan', role: 'AI Product Lead' },
    publishedAt: '2026-07-18',
    readingMinutes: 8,
    featured: true,
    image: '/assets/images/services/ai-overview.webp',
    imageAlt: 'AI product workspace with dashboards and copilots',
    tags: ['AI', 'SaaS', 'Product'],
    body: [
      'Most SaaS teams do not need a moonshot model. They need reliable features that reduce operator time, improve search, or surface the next best action.',
      'Start with a single high-frequency workflow. Instrument it. Define what “good” looks like before you wire a model into production.',
      'Retrieval-augmented systems work best when your knowledge base is curated, permissioned, and versioned like any other product surface.',
      'Ship behind feature flags, log prompts and outcomes (with privacy controls), and keep a human escalation path for high-stakes decisions.',
    ],
  },
  {
    slug: 'mern-stack-architecture-for-growing-teams',
    title: 'MERN Stack Architecture Patterns That Scale With Your Team',
    excerpt:
      'MongoDB, Express, React, and Node remain a strong foundation — when boundaries, contracts, and deployment discipline stay clear.',
    category: 'MERN',
    author: { name: 'Daniel Okonkwo', role: 'Principal Engineer' },
    publishedAt: '2026-07-09',
    readingMinutes: 10,
    featured: true,
    image: '/assets/images/services/web-overview.webp',
    imageAlt: 'Modern web application architecture on a laptop',
    tags: ['MERN', 'Node.js', 'React'],
    body: [
      'The MERN stack is not a shortcut around design. It is a flexible toolkit that rewards intentional module boundaries.',
      'Treat your API as a product: versioned routes, explicit auth, validation at the edge, and predictable error shapes.',
      'On the React side, prefer feature folders over dump directories. Keep data fetching near the route that owns it.',
      'As the team grows, shared packages for UI primitives and domain types prevent drift without forcing a monorepo overnight.',
    ],
  },
  {
    slug: 'react-performance-checklist-for-enterprise-apps',
    title: 'A React Performance Checklist for Enterprise Applications',
    excerpt:
      'From route-level code splitting to list virtualization — the habits that keep large React apps feeling responsive.',
    category: 'Web Development',
    author: { name: 'Sofia Alvarez', role: 'Frontend Architect' },
    publishedAt: '2026-06-28',
    readingMinutes: 7,
    featured: true,
    image: '/assets/images/thumbs/home-svc-web.webp',
    imageAlt: 'Developer reviewing a React interface',
    tags: ['React', 'Performance', 'Frontend'],
    body: [
      'Performance work starts with measurement. Profile real user journeys before optimizing theoretical hotspots.',
      'Lazy-load routes and heavy editors. Keep the critical path lean so first interaction stays fast.',
      'Lists with thousands of rows need virtualization; forms need controlled inputs that do not re-render the world.',
      'Cache thoughtfully. Stale-while-revalidate patterns often beat aggressive memoization that fights the React compiler.',
    ],
  },
  {
    slug: 'nodejs-apis-that-operators-can-trust',
    title: 'Designing Node.js APIs Operators Can Trust',
    excerpt:
      'Idempotency, observability, and clear failure modes turn backend services into reliable product infrastructure.',
    category: 'Web Development',
    author: { name: 'Marcus Chen', role: 'Backend Lead' },
    publishedAt: '2026-06-14',
    readingMinutes: 9,
    featured: false,
    image: '/assets/images/services/api-development.webp',
    imageAlt: 'API and infrastructure diagrams',
    tags: ['Node.js', 'API', 'Reliability'],
    body: [
      'Operators forgive slow features; they do not forgive silent data loss. Design for retries and duplicate requests from day one.',
      'Structured logging and trace IDs are not optional in multi-service systems — they are how you sleep at night.',
      'Document your auth model in plain language. Who can call what, and what data never leaves the boundary.',
      'Prefer boring, well-tested patterns over novel frameworks when customer money or regulated data is involved.',
    ],
  },
  {
    slug: 'cloud-foundations-for-saas-multi-tenancy',
    title: 'Cloud Foundations for Secure SaaS Multi-Tenancy',
    excerpt:
      'Tenancy isolation, environment strategy, and cost-aware architecture for SaaS platforms that need to grow safely.',
    category: 'Cloud',
    author: { name: 'Priya Nair', role: 'Cloud Architect' },
    publishedAt: '2026-06-02',
    readingMinutes: 11,
    featured: false,
    image: '/assets/images/services/cloud-devops.webp',
    imageAlt: 'Cloud infrastructure and operations console',
    tags: ['Cloud', 'SaaS', 'Security'],
    body: [
      'Multi-tenancy is a product decision disguised as infrastructure. Isolation models should match your risk profile.',
      'Separate control plane from data plane. Make tenant context explicit in every request path.',
      'Environment parity matters: staging that does not resemble production is where surprises hide.',
      'Watch unit economics early. Cloud sprawl is usually a design smell, not a billing accident.',
    ],
  },
  {
    slug: 'devops-pipelines-that-ship-with-confidence',
    title: 'DevOps Pipelines That Ship With Confidence',
    excerpt:
      'Continuous delivery is not about speed alone — it is about reversible releases, clear ownership, and fast feedback.',
    category: 'DevOps',
    author: { name: 'James Whitaker', role: 'Platform Engineer' },
    publishedAt: '2026-05-22',
    readingMinutes: 8,
    featured: false,
    image: '/assets/images/services/saas-delivery.webp',
    imageAlt: 'CI/CD and delivery workflow visualization',
    tags: ['DevOps', 'CI/CD', 'Release'],
    body: [
      'A good pipeline answers three questions: what changed, what was tested, and how do we roll back.',
      'Trunk-based flow with short-lived branches reduces merge pain more than elaborate branching schemes.',
      'Promote artifacts, not rebuilds. The binary that passed staging should be the binary in production.',
      'Alert on symptoms users feel — error budgets beat vanity metrics every time.',
    ],
  },
  {
    slug: 'design-systems-that-engineers-actually-use',
    title: 'Design Systems That Engineers Actually Use',
    excerpt:
      'Tokens, components, and documentation that survive contact with real sprint pressure — not shelfware Figma files.',
    category: 'UI/UX',
    author: { name: 'Elena Vogt', role: 'Design Systems Lead' },
    publishedAt: '2026-05-10',
    readingMinutes: 6,
    featured: false,
    image: '/assets/images/thumbs/home-svc-uiux.webp',
    imageAlt: 'UI design system boards and color tools',
    tags: ['UI/UX', 'Design Systems'],
    body: [
      'Start with the decisions teams remake every week: color, type, spacing, and form controls.',
      'Ship the system as code, not only as mockups. Adoption follows the path of least resistance.',
      'Accessibility is a design constraint, not a QA afterthought — bake contrast and focus into primitives.',
      'Version the system. Breaking changes need migration notes the way APIs do.',
    ],
  },
  {
    slug: 'enterprise-software-buying-what-teams-miss',
    title: 'What Enterprise Buyers Notice That Product Teams Often Miss',
    excerpt:
      'Procurement, security questionnaires, and operational readiness shape deals as much as feature demos.',
    category: 'Business',
    author: { name: 'Nadia Rahman', role: 'Client Partner' },
    publishedAt: '2026-04-28',
    readingMinutes: 7,
    featured: false,
    image: '/assets/images/thumbs/home-svc-saas.webp',
    imageAlt: 'Enterprise software dashboard on a laptop',
    tags: ['Business', 'Enterprise', 'SaaS'],
    body: [
      'Buyers ask how you handle SSO, audit logs, data residency, and support SLAs — early and often.',
      'A polished demo cannot compensate for unclear ownership after go-live.',
      'Map your onboarding journey from first login to first value. Friction here kills expansion.',
      'Write the security narrative before the RFP arrives. Scrambling mid-cycle erodes trust.',
    ],
  },
  {
    slug: 'product-engineering-from-discovery-to-delivery',
    title: 'Product Engineering: From Discovery Workshops to Reliable Delivery',
    excerpt:
      'How senior-led teams turn ambiguous goals into scoped increments without losing product intent.',
    category: 'Product Engineering',
    author: { name: 'Omar Farooq', role: 'Delivery Director' },
    publishedAt: '2026-04-12',
    readingMinutes: 9,
    featured: false,
    image: '/assets/images/thumbs/home-svc-pe.webp',
    imageAlt: 'Product engineering sprint board on a laptop',
    tags: ['Product Engineering', 'Delivery'],
    body: [
      'Discovery is not a phase you finish — it is a habit of validating assumptions before they become code.',
      'Write outcomes in operator language. “Reduce ticket handle time” beats “build a dashboard.”',
      'Architecture choices should leave room for the next two quarters, not the next decade.',
      'Demo working software weekly. Stakeholders calibrate faster when they can touch progress.',
    ],
  },
  {
    slug: 'saas-subscription-foundations-done-right',
    title: 'SaaS Subscription Foundations Done Right',
    excerpt:
      'Plans, entitlements, admin portals, and billing readiness — the unglamorous work that unlocks growth.',
    category: 'SaaS',
    author: { name: 'Hannah Brooks', role: 'SaaS Engineer' },
    publishedAt: '2026-03-30',
    readingMinutes: 8,
    featured: false,
    image: '/assets/images/services/saas-overview.webp',
    imageAlt: 'SaaS admin and subscription management UI',
    tags: ['SaaS', 'Billing', 'Architecture'],
    body: [
      'Model entitlements as data, not hard-coded if statements scattered across the codebase.',
      'Admin portals are products too. Support teams are power users with zero patience for ambiguity.',
      'Separate catalog configuration from runtime enforcement so marketing can iterate safely.',
      'Plan for plan changes: upgrades, downgrades, and proration are where naive models break.',
    ],
  },
  {
    slug: 'ux-research-that-survives-sprint-pressure',
    title: 'UX Research That Survives Sprint Pressure',
    excerpt:
      'Lightweight research rituals that inform backlog decisions without slowing delivery to a crawl.',
    category: 'UI/UX',
    author: { name: 'Lina Park', role: 'Product Designer' },
    publishedAt: '2026-03-14',
    readingMinutes: 5,
    featured: false,
    image: '/assets/images/services/uiux-overview.webp',
    imageAlt: 'UX research and interface exploration',
    tags: ['UI/UX', 'Research'],
    body: [
      'Five focused interviews often beat a survey nobody reads. Talk to the people who live in the product.',
      'Capture jobs-to-be-done as short clips or quotes the whole team can reuse.',
      'Prototype the risky interaction, not the entire flow. Learn before you polish.',
      'Close the loop: show teams what changed because of research, or research becomes theater.',
    ],
  },
  {
    slug: 'ai-evaluation-before-you-ship-the-copilot',
    title: 'AI Evaluation Before You Ship the Copilot',
    excerpt:
      'Offline evals, golden sets, and human review loops that keep copilots useful — and safe — in production.',
    category: 'AI',
    author: { name: 'Ayesha Khan', role: 'AI Product Lead' },
    publishedAt: '2026-02-26',
    readingMinutes: 10,
    featured: false,
    image: '/assets/images/services/ai-method.webp',
    imageAlt: 'AI evaluation and model workflow',
    tags: ['AI', 'Evaluation', 'Quality'],
    body: [
      'If you cannot score quality offline, you cannot improve quality online. Build a golden set early.',
      'Separate helpfulness from harmlessness. A witty wrong answer is still a failure.',
      'Human review is a product surface — design the queue, not just the model call.',
      'Ship narrow, measure relentlessly, expand only when the metrics hold under load.',
    ],
  },
]

export function getBlogPosts() {
  return [...blogPosts].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
}

export function getFeaturedPosts(limit = 3) {
  const featured = getBlogPosts().filter((post) => post.featured)
  if (featured.length >= limit) return featured.slice(0, limit)
  return getBlogPosts().slice(0, limit)
}

export function getLatestPosts(limit = 3) {
  return getBlogPosts().slice(0, limit)
}

export function getBlogPostBySlug(slug) {
  return blogPosts.find((post) => post.slug === slug) || null
}

export function filterBlogPosts({ category = 'All', query = '' } = {}) {
  const q = query.trim().toLowerCase()
  return getBlogPosts().filter((post) => {
    if (category !== 'All' && post.category !== category) return false
    if (!q) return true
    const haystack = [post.title, post.excerpt, post.category, ...post.tags, post.author.name]
      .join(' ')
      .toLowerCase()
    return haystack.includes(q)
  })
}

export function formatBlogDate(iso) {
  try {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(new Date(`${iso}T12:00:00`))
  } catch {
    return iso
  }
}
