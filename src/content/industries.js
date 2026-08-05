/**
 * Panel art for the stacking scroll section. Each entry ships two WebP widths
 * (see scripts/fetch-industry-images.mjs) and a layout variant so no two
 * adjacent panels use the same composition.
 */
const industryMedia = {
  healthcare: {
    layout: 'corner',
    alt: 'Clinicians reviewing diagnostic imaging on a workstation',
  },
  'financial-services': {
    layout: 'aside',
    alt: 'Trading terminal showing live market data',
  },
  logistics: {
    layout: 'band',
    alt: 'Distribution warehouse with racked inventory bins',
  },
  construction: {
    layout: 'editorial',
    alt: 'Site crew walking a reinforced concrete slab pour',
  },
  'real-estate': {
    layout: 'center',
    alt: 'Contemporary property with pool and glazed facade',
  },
  education: {
    layout: 'corner',
    alt: 'Students collaborating around laptops in a library',
  },
  retail: {
    layout: 'aside',
    alt: 'Curated retail floor with merchandised shelving',
  },
  manufacturing: {
    layout: 'band',
    alt: 'Engineer measuring a component against technical drawings',
  },
  'field-service': {
    layout: 'editorial',
    alt: 'Technician servicing electrical equipment on site',
  },
  travel: {
    layout: 'center',
    alt: 'Aircraft wing above clouds at golden hour',
  },
}

/** Attach media metadata so content stays declarative and the section stays dumb. */
function withMedia(items) {
  return items.map((item) => {
    const media = industryMedia[item.slug]
    return {
      ...item,
      layout: media?.layout || 'corner',
      image: {
        src: `/assets/images/industries/${item.slug}-1280.webp`,
        srcSet: `/assets/images/industries/${item.slug}-1280.webp 1280w, /assets/images/industries/${item.slug}-2400.webp 2400w`,
        alt: media?.alt || `${item.title} industry photography`,
      },
    }
  })
}

export const industries = withMedia([
  {
    slug: 'healthcare',
    title: 'Healthcare',
    label: 'Care systems',
    summary: 'Care coordination, portals, and operational tools that respect clinical workflows.',
    focus: ['Patient and provider portals', 'Scheduling & operations', 'Secure data handling patterns'],
    challenge:
      'Clinical, billing, and administrative data live in separate systems, so staff re-key the same information and patients wait for answers.',
    solutions: [
      'Patient and provider portals with role-aware access',
      'Scheduling, intake, and back-office workflows',
      'Auditable data handling patterns built in from day one',
    ],
    outcome: 'Fewer manual handoffs between clinical and back-office teams.',
    proof: 'medbill-ultra',
  },
  {
    slug: 'financial-services',
    title: 'Financial Services',
    label: 'Money flows',
    summary: 'Product experiences for onboarding, operations, and customer self-service.',
    focus: ['Client portals', 'Workflow automation', 'Audit-friendly logging patterns'],
    challenge:
      'Onboarding and servicing still run on email threads, spreadsheets, and manual review queues that nobody can trace afterwards.',
    solutions: [
      'Client onboarding and self-service portals',
      'Review, approval, and exception workflows',
      'Audit-friendly logging and permission models',
    ],
    outcome: 'Self-service journeys that cut back-and-forth with operations teams.',
    proof: null,
  },
  {
    slug: 'logistics',
    title: 'Logistics',
    label: 'Movement',
    summary: 'Visibility and control across shipments, partners, and exceptions.',
    focus: ['Tracking dashboards', 'Partner integrations', 'Exception workflows'],
    challenge:
      'Shipment status is scattered across carriers, partners, and inboxes, so exceptions surface long after they became expensive.',
    solutions: [
      'Live tracking and operations dashboards',
      'Carrier, partner, and ERP integrations',
      'Exception detection and escalation workflows',
    ],
    outcome: 'One operational view instead of chasing updates across systems.',
    proof: null,
  },
  {
    slug: 'construction',
    title: 'Construction',
    label: 'Build',
    summary: 'Field-to-office software that keeps projects, crews, and documents aligned.',
    focus: ['Project portals', 'Document workflows', 'Mobile field capture'],
    challenge:
      'Site crews and the office work from different versions of drawings, dockets, and schedules, so rework is discovered too late.',
    solutions: [
      'Project and client portals with live status',
      'Document, variation, and approval workflows',
      'Mobile field capture that works on patchy connections',
    ],
    outcome: 'Site reality and office records stay in sync.',
    proof: 'metro-electric',
  },
  {
    slug: 'real-estate',
    title: 'Real Estate',
    label: 'Property',
    summary: 'Listing, leasing, and operations products for teams managing complex portfolios.',
    focus: ['Property operations', 'CRM-adjacent workflows', 'Client-facing experiences'],
    challenge:
      'Listings, leasing, and property operations sit in tools that were never designed to talk to each other.',
    solutions: [
      'Portfolio and property operations tooling',
      'CRM-adjacent pipelines and handover workflows',
      'Client-facing listing and reporting experiences',
    ],
    outcome: 'Portfolio teams work from one source of truth.',
    proof: 'spaceworx',
  },
  {
    slug: 'education',
    title: 'Education',
    label: 'Learning',
    summary: 'Learning and administration platforms built for clarity and accessibility.',
    focus: ['Learner portals', 'Admin tooling', 'Content workflows'],
    challenge:
      'Learners, instructors, and administrators need very different views of the same content, and generic platforms force compromises on all three.',
    solutions: [
      'Learner and instructor portals',
      'Administration and reporting tooling',
      'Content, assessment, and publishing workflows',
    ],
    outcome: 'Accessible experiences that hold up as cohorts grow.',
    proof: null,
  },
  {
    slug: 'retail',
    title: 'Retail',
    label: 'Commerce',
    summary: 'Commerce-adjacent products, ops tools, and customer experiences that scale.',
    focus: ['Catalog & inventory views', 'Store operations', 'Customer accounts'],
    challenge:
      'Catalog, inventory, and customer data drift apart as channels multiply, and every campaign exposes the gaps.',
    solutions: [
      'Catalog, pricing, and inventory views',
      'Store and fulfilment operations tooling',
      'Customer account and loyalty experiences',
    ],
    outcome: 'Consistent product and stock truth across every channel.',
    proof: 'godiva',
  },
  {
    slug: 'manufacturing',
    title: 'Manufacturing',
    label: 'Production',
    summary: 'Operational software connecting plants, partners, and quality signals.',
    focus: ['Production visibility', 'Quality workflows', 'Supplier portals'],
    challenge:
      'Production, quality, and supplier signals stay locked inside plant systems and spreadsheets, so decisions run a week behind the floor.',
    solutions: [
      'Production and throughput visibility dashboards',
      'Quality and non-conformance workflows',
      'Supplier and partner portals',
    ],
    outcome: 'Decisions based on current floor data, not last week’s report.',
    proof: 'goodbooks-plus-analytics',
  },
  {
    slug: 'field-service',
    title: 'Field Service',
    label: 'Field ops',
    summary: 'Dispatch, technician mobile apps, and customer updates in one product loop.',
    focus: ['Scheduling & dispatch', 'Technician mobile apps', 'Customer status updates'],
    challenge:
      'Dispatchers, technicians, and customers each chase job status through phone calls and messages that never reach the same system.',
    solutions: [
      'Scheduling and dispatch boards',
      'Technician mobile apps with offline capture',
      'Automated customer status and completion updates',
    ],
    outcome: 'One loop from job created to job closed and invoiced.',
    proof: 'servloom',
  },
  {
    slug: 'travel',
    title: 'Travel',
    label: 'Journeys',
    summary: 'Booking, itinerary, and operations experiences for travelers and operators.',
    focus: ['Booking flows', 'Itinerary products', 'Partner inventory integrations'],
    challenge:
      'Booking, itinerary changes, and partner inventory rarely stay aligned in real time, so support absorbs the difference.',
    solutions: [
      'Booking and checkout flows built for conversion',
      'Itinerary and self-service change products',
      'Partner and inventory integrations',
    ],
    outcome: 'Travelers self-serve changes instead of contacting support.',
    proof: null,
  },
])

export const homeIndustries = {
  eyebrow: 'Industries',
  title: 'Domain-aware product thinking',
  support:
    'We adapt delivery to the realities of each sector. Industry pages describe typical product patterns—not claimed certifications or unpublished client work.',
  disclaimer:
    'Industry pages describe solution patterns. They do not imply regulated-domain credentials or completed engagements unless a published case study says so.',
  viewAll: { label: 'Explore industries', to: '/industries' },
  items: industries,
}

/** Copy for the /industries page. Keeps claims to capability, never client outcomes. */
export const industriesPage = {
  hero: {
    title: 'Industries',
    support: 'Software shaped around how your sector actually works',
  },
  intro: {
    eyebrow: 'How we help',
    title: 'We learn the workflow before we design the system',
    support:
      'Every sector has its own constraints, vocabulary, and edge cases. We start there — then build the smallest product that proves value and expand it with evidence.',
    pillars: [
      {
        id: 'workflow',
        icon: 'workflow',
        title: 'Start with the workflow',
        text: 'We map how your teams work today, including the spreadsheets and workarounds, before proposing anything new.',
      },
      {
        id: 'slice',
        icon: 'slice',
        title: 'Ship a useful slice early',
        text: 'A real, working part of the product goes live early so decisions are made against usage instead of assumptions.',
      },
      {
        id: 'longrun',
        icon: 'longrun',
        title: 'Engineer for the long run',
        text: 'Clean architecture, secure defaults, and documentation you own — so the product keeps moving after launch.',
      },
    ],
  },
  grid: {
    eyebrow: 'Sectors we serve',
    title: 'Ten industries, one engineering standard',
    support:
      'Keep scrolling to move through every sector. Pick one to jump straight to the challenges we solve and the work we have published there.',
  },
  solutions: {
    eyebrow: 'Challenges & solutions',
    title: 'The problem behind the brief',
    support:
      'Most engagements start with the same shape of problem: important work happening outside the system. Here is what that looks like per sector, and what we build to close it.',
  },
  benefits: {
    eyebrow: 'Why teams choose Mernify',
    title: 'A delivery partner, not a resource pool',
    support:
      'The way we work is the same in every sector — senior people, visible progress, and a product you fully own at the end.',
    items: [
      {
        id: 'senior',
        icon: 'senior',
        title: 'Senior-led pods',
        text: 'The people who scope your product are the people who build it. No hand-down to an unfamiliar team after kickoff.',
      },
      {
        id: 'discovery',
        icon: 'discovery',
        title: 'Domain-aware discovery',
        text: 'We surface constraints, integrations, and edge cases up front, so scope surprises do not arrive mid-build.',
      },
      {
        id: 'cadence',
        icon: 'cadence',
        title: 'Visible delivery cadence',
        text: 'You review working increments on a predictable rhythm instead of waiting on status decks.',
      },
      {
        id: 'scale',
        icon: 'scale',
        title: 'Built to scale',
        text: 'Clean architecture and secure defaults so the product holds up as users, data, and integrations grow.',
      },
      {
        id: 'ownership',
        icon: 'ownership',
        title: 'Clear ownership',
        text: 'Code, environments, runbooks, and documentation are handed over in full. Nothing is locked to us.',
      },
      {
        id: 'aftercare',
        icon: 'aftercare',
        title: 'Support after launch',
        text: 'Monitoring, iteration, and a maintained roadmap so the product keeps creating value post-release.',
      },
    ],
  },
  process: {
    eyebrow: 'How delivery runs',
    title: 'From first conversation to continuous improvement',
    support:
      'The same seven stages run on every engagement, regardless of sector. Each one produces artifacts you can review.',
  },
  proof: {
    eyebrow: 'Published work',
    title: 'Sector experience you can verify',
    support:
      'Each of these is a live product with a published case study. We link the sector to the work rather than to a claim.',
  },
  cta: {
    title:
      'Tell us how your sector actually works, and we’ll show you what a reliable product looks like for it.',
    accentWords: ['sector', 'reliable'],
    support: 'A 30-minute call is enough to pressure-test scope, sequencing, and where to start.',
  },
}

export function getIndustryBySlug(slug) {
  return industries.find((item) => item.slug === slug)
}
