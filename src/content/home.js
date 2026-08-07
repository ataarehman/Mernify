import { SITE } from '@/constants/site'

export const homeHero = {
  title: 'WE DESIGN, ENGINEER & SCALE DIGITAL PRODUCTS FOR STARTUPS AND GROWING BUSINESSES.',
}

export const homeAbout = {
  lead:
    'Mernify is a focused product-engineering partner — helping businesses transform ideas, workflows, and operational challenges into reliable digital products.',
  body:
    'We combine modern engineering, product thinking, and structured delivery so teams can launch faster, operate efficiently, and grow confidently.',
  cta: { label: 'Discuss Your Project', to: '/contact' },
}

export const homeJourney = {
  eyebrow: '( Our Journey )',
  title: 'Growth shaped by product partnerships',
  support:
    'From first conversations to lasting ownership — the milestones that define how MerNify shows up for ambitious teams.',
  chapters: [
    {
      id: 'origin',
      index: '01',
      label: 'Origin',
      title: 'Built around outcomes, not buzzwords',
      body: 'MerNify began as a product-engineering studio for teams who needed senior thinking early — discovery, architecture, and delivery under one roof.',
      metric: 'Partner-first',
      detail: 'Direct communication from day one',
    },
    {
      id: 'craft',
      index: '02',
      label: 'Craft',
      title: 'Modern stacks. Clear delivery.',
      body: 'We refined a way of working that couples UI systems, APIs, and cloud practices with transparent scope, so stakeholders always know what ships next.',
      metric: 'Structured',
      detail: 'Artifacts at every stage',
    },
    {
      id: 'scale',
      index: '03',
      label: 'Scale',
      title: 'Products across industries',
      body: 'Analytics, healthcare RCM, field services, workspace tools, and commerce — real products in production, with the polish of focused engineering pods.',
      metric: 'Multi-domain',
      detail: 'Case-proven experience',
    },
    {
      id: 'partner',
      index: '04',
      label: 'Partnership',
      title: 'Long-term technical ownership',
      body: 'We stay after launch — monitoring, iteration, and roadmap support — so software keeps creating value instead of becoming another handoff problem.',
      metric: 'Ongoing',
      detail: 'Improve after release',
    },
  ],
  processEyebrow: '( How we work )',
  processTitle: 'A clear path from discovery to launch',
  processSupport:
    'Six stages with tangible outputs — so progress is always visible to product and business stakeholders.',
}

export const homeInquiry = {
  eyebrow: '( Project inquiry )',
  title: 'Let’s shape your next product',
  support:
    'Three short steps. Share what you’re building, and we’ll reply with clarifying questions and a clear next move.',
  email: 'info@mernify.co',
  response: 'Typical reply within 1–2 business days',
  points: [
    'No invented timelines or guarantees',
    'Direct conversation with the delivery team',
    'Discovery call only when it’s useful',
  ],
  steps: [
    { id: 'you', label: 'About you', hint: 'Who should we reply to?' },
    { id: 'focus', label: 'Project focus', hint: 'What are you looking for?' },
    { id: 'details', label: 'Details', hint: 'Context that helps us prepare' },
  ],
}

export const homePortfolio = {
  eyebrow: 'SELECTED',
  title: 'CASE STUDIES',
  support:
    'Evidence-based stories from analytics, healthcare, field services, workspace products, and commerce — without invented metrics.',
  status: 'Published work',
  cta: { label: 'View Case Studies', to: '/case-studies' },
  projects: [
    {
      id: '01',
      title: 'GoodBooks Plus Analytics',
      category: 'Analytics Platform',
      excerpt: 'Self-serve BI that turns production and inventory data into decisions.',
      tags: ['Analytics', 'SaaS'],
      year: '2024',
      accent: '#F97316',
      image: '/portfolio/goodbooks-plus/analytics-desktop.webp',
      to: '/case-studies/goodbooks-plus-analytics',
      size: 'large',
    },
    {
      id: '02',
      title: 'MedBill Ultra',
      category: 'Medical Billing',
      excerpt: 'A conversion-led website for US medical billing and RCM services.',
      tags: ['Healthcare', 'RCM'],
      year: '2024',
      accent: '#F59E0B',
      image: '/portfolio/medbill-ultra/home-desktop.webp',
      to: '/case-studies/medbill-ultra',
      size: 'small',
    },
    {
      id: '03',
      title: 'Metro Electric',
      category: 'Electrical Services',
      excerpt: 'A premium service site for Perth commercial and industrial electrical work.',
      tags: ['Services', 'Perth'],
      year: '2025',
      accent: '#2563EB',
      image: '/portfolio/metro-electric/home-desktop.webp',
      to: '/case-studies/metro-electric',
      size: 'small',
    },
    {
      id: '04',
      title: 'SpaceWorx',
      category: 'Workspace Solutions',
      excerpt: 'Product storytelling for modular privacy pods built for modern workplaces.',
      tags: ['Product', 'Workspace'],
      year: '2025',
      accent: '#65A30D',
      image: '/portfolio/spaceworx/home-desktop.webp',
      to: '/case-studies/spaceworx',
      size: 'small',
    },
    {
      id: '05',
      title: 'MRZZM',
      category: 'E-commerce',
      excerpt: 'A multi-category marketplace experience spanning Saudi Arabia and UAE.',
      tags: ['Commerce', 'Marketplace'],
      year: '2025',
      accent: '#4F46E5',
      image: '/portfolio/mrzzm/home-desktop.webp',
      to: '/case-studies/mrzzm',
      size: 'small',
    },
    {
      id: '06',
      title: 'Tailorize',
      category: 'Product Configurator',
      excerpt: 'AI-measured bespoke tailoring for Saudi Arabia — custom thobes and suits.',
      tags: ['Fashion', 'Localized'],
      year: '2025',
      accent: '#7C3AED',
      image: '/portfolio/tailorize/home-desktop.webp',
      to: '/case-studies/tailorize',
      size: 'large',
    },
  ],
}

export const homeServicesCarousel = {
  eyebrow: '( Services )',
  viewAll: { label: 'View All Services', to: '/services' },
  slides: [
    {
      slug: 'product-engineering',
      title: 'Product Engineering',
      image: '/assets/images/thumbs/home-svc-pe.webp',
      imageSrcSet:
        '/assets/images/thumbs/home-svc-pe-md.webp 800w, /assets/images/thumbs/home-svc-pe.webp 1600w',
      tags: ['Discovery & Architecture', 'Full-Stack Delivery', 'Product Strategy', 'UI/UX Systems'],
      blurb:
        'End-to-end product engineering that connects strategy, UX, and full-stack delivery into one coherent path.',
    },
    {
      slug: 'saas-development',
      title: 'SaaS Development',
      image: '/assets/images/thumbs/home-svc-saas.webp',
      imageSrcSet:
        '/assets/images/thumbs/home-svc-saas-md.webp 800w, /assets/images/thumbs/home-svc-saas.webp 1600w',
      tags: ['Multi-Tenant Architecture', 'Admin Portals', 'Subscription Foundations', 'Release Process'],
      blurb:
        'SaaS platforms with secure tenancy, role-based access, and admin systems prepared for customer growth.',
    },
    {
      slug: 'mobile-app-development',
      title: 'Mobile App Development',
      image: '/assets/images/thumbs/home-svc-mobile.webp',
      imageSrcSet:
        '/assets/images/thumbs/home-svc-mobile-md.webp 800w, /assets/images/thumbs/home-svc-mobile.webp 1600w',
      tags: ['iOS & Android', 'API Integration', 'Offline-Ready UX', 'Store Release'],
      blurb:
        'Native-feel mobile products that stay reliable in the field — synced to the same backend your web team trusts.',
    },
    {
      slug: 'ai-integration',
      title: 'AI Integration',
      image: '/assets/images/thumbs/home-svc-ai.webp',
      imageSrcSet:
        '/assets/images/thumbs/home-svc-ai-md.webp 800w, /assets/images/thumbs/home-svc-ai.webp 1600w',
      tags: ['Workflow Copilots', 'RAG Systems', 'Automation', 'Guardrails'],
      blurb:
        'Practical AI layered into real products — assistive workflows with controls, evaluation, and measurable value.',
    },
    {
      slug: 'web-development',
      title: 'Web Development',
      image: '/assets/images/thumbs/home-svc-web.webp',
      imageSrcSet:
        '/assets/images/thumbs/home-svc-web-md.webp 800w, /assets/images/thumbs/home-svc-web.webp 1600w',
      tags: ['Performance', 'Accessibility', 'Modern Frontends', 'Secure APIs'],
      blurb:
        'Fast, accessible web applications operators and customers actually use — built to extend without fragility.',
    },
    {
      slug: 'ui-ux-design',
      title: 'UI/UX Design',
      image: '/assets/images/thumbs/home-svc-uiux.webp',
      imageSrcSet:
        '/assets/images/thumbs/home-svc-uiux-md.webp 800w, /assets/images/thumbs/home-svc-uiux.webp 1600w',
      tags: ['User Research', 'Design Systems', 'Prototypes', 'Handoff Specs'],
      blurb:
        'Journeys and interfaces shaped before expensive build cycles — so engineering ships the right product.',
    },
  ],
}

export const homeHuman = {
  badge: 'Senior-led delivery',
  titleBefore: 'Complex technology. Clear partnership — how we work with product teams to deliver ',
  titleAccent: 'reliably.',
  cta: { label: 'About Mernify', to: '/about' },
  avatars: [
    '/assets/images/thumbs/team-img1.webp',
    '/assets/images/thumbs/team-img2.webp',
    '/assets/images/thumbs/team-img3.webp',
    '/assets/images/thumbs/team-img4.webp',
  ],
  principles: [
    {
      title: 'Direct Communication',
      subtitle: 'Delivery principle',
      image: '/assets/images/thumbs/team-thumb1.webp',
      imageSrcSet:
        '/assets/images/thumbs/team-thumb1-md.webp 560w, /assets/images/thumbs/team-thumb1.webp 1120w',
      to: '/about',
      social: [
        { label: 'LinkedIn', href: SITE.social.linkedin },
        { label: 'Facebook', href: SITE.social.facebook },
        { label: 'Instagram', href: SITE.social.instagram },
      ],
    },
    {
      title: 'Transparent Delivery',
      subtitle: 'Delivery principle',
      image: '/assets/images/thumbs/team-thumb2.webp',
      imageSrcSet:
        '/assets/images/thumbs/team-thumb2-md.webp 560w, /assets/images/thumbs/team-thumb2.webp 1120w',
      to: '/about',
      social: [
        { label: 'LinkedIn', href: SITE.social.linkedin },
        { label: 'Facebook', href: SITE.social.facebook },
        { label: 'Instagram', href: SITE.social.instagram },
      ],
    },
    {
      title: 'Product Ownership',
      subtitle: 'Delivery principle',
      image: '/assets/images/thumbs/team-thumb3.webp',
      imageSrcSet:
        '/assets/images/thumbs/team-thumb3-md.webp 560w, /assets/images/thumbs/team-thumb3.webp 1120w',
      to: '/about',
      social: [
        { label: 'LinkedIn', href: SITE.social.linkedin },
        { label: 'Facebook', href: SITE.social.facebook },
        { label: 'Instagram', href: SITE.social.instagram },
      ],
    },
  ],
}

export const homeFinalCta = {
  title: 'Ready to Build Your Next Digital Product?',
  support:
    'Turn your idea, workflow, or existing application into a scalable digital product with a focused engineering partner.',
  primaryCta: {
    label: 'Schedule a Discovery Call',
    to: '/contact?intent=discovery',
  },
  secondaryCta: {
    label: 'Discuss Your Project',
    to: '/contact',
  },
}
