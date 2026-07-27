export const industries = [
  {
    slug: 'healthcare',
    title: 'Healthcare',
    summary: 'Care coordination, portals, and operational tools that respect clinical workflows.',
    focus: ['Patient and provider portals', 'Scheduling & operations', 'Secure data handling patterns'],
  },
  {
    slug: 'financial-services',
    title: 'Financial Services',
    summary: 'Product experiences for onboarding, operations, and customer self-service.',
    focus: ['Client portals', 'Workflow automation', 'Audit-friendly logging patterns'],
  },
  {
    slug: 'logistics',
    title: 'Logistics',
    summary: 'Visibility and control across shipments, partners, and exceptions.',
    focus: ['Tracking dashboards', 'Partner integrations', 'Exception workflows'],
  },
  {
    slug: 'construction',
    title: 'Construction',
    summary: 'Field-to-office software that keeps projects, crews, and documents aligned.',
    focus: ['Project portals', 'Document workflows', 'Mobile field capture'],
  },
  {
    slug: 'real-estate',
    title: 'Real Estate',
    summary: 'Listing, leasing, and operations products for teams managing complex portfolios.',
    focus: ['Property operations', 'CRM-adjacent workflows', 'Client-facing experiences'],
  },
  {
    slug: 'education',
    title: 'Education',
    summary: 'Learning and administration platforms built for clarity and accessibility.',
    focus: ['Learner portals', 'Admin tooling', 'Content workflows'],
  },
  {
    slug: 'retail',
    title: 'Retail',
    summary: 'Commerce-adjacent products, ops tools, and customer experiences that scale.',
    focus: ['Catalog & inventory views', 'Store operations', 'Customer accounts'],
  },
  {
    slug: 'manufacturing',
    title: 'Manufacturing',
    summary: 'Operational software connecting plants, partners, and quality signals.',
    focus: ['Production visibility', 'Quality workflows', 'Supplier portals'],
  },
  {
    slug: 'field-service',
    title: 'Field Service',
    summary: 'Dispatch, technician mobile apps, and customer updates in one product loop.',
    focus: ['Scheduling & dispatch', 'Technician mobile apps', 'Customer status updates'],
  },
  {
    slug: 'travel',
    title: 'Travel',
    summary: 'Booking, itinerary, and operations experiences for travelers and operators.',
    focus: ['Booking flows', 'Itinerary products', 'Partner inventory integrations'],
  },
]

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

export function getIndustryBySlug(slug) {
  return industries.find((item) => item.slug === slug)
}
