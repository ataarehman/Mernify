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
      tags: ['ANALYTICS', 'SAAS'],
      year: '2024',
      image: '/portfolio/goodbooks-plus/analytics-desktop.png',
      to: '/case-studies/goodbooks-plus-analytics',
      size: 'large',
    },
    {
      id: '02',
      title: 'MedBill Ultra',
      tags: ['HEALTHCARE', 'RCM'],
      year: '2024',
      image: '/portfolio/medbill-ultra/home-desktop.png',
      to: '/case-studies/medbill-ultra',
      size: 'small',
    },
    {
      id: '03',
      title: 'Metro Electric',
      tags: ['SERVICES', 'PERTH'],
      year: '2025',
      image: '/portfolio/metro-electric/home-desktop.png',
      to: '/case-studies/metro-electric',
      size: 'small',
    },
    {
      id: '04',
      title: 'SpaceWorx',
      tags: ['PRODUCT', 'WORKSPACE'],
      year: '2025',
      image: '/portfolio/spaceworx/home-desktop.png',
      to: '/case-studies/spaceworx',
      size: 'small',
    },
    {
      id: '05',
      title: 'MRZZM',
      tags: ['COMMERCE', 'MARKETPLACE'],
      year: '2025',
      image: '/portfolio/mrzzm/home-desktop.png',
      to: '/case-studies/mrzzm',
      size: 'small',
    },
    {
      id: '06',
      title: 'Tailorize',
      tags: ['FASHION', 'LOCALIZED'],
      year: '2025',
      image: '/portfolio/tailorize/home-desktop.png',
      to: '/case-studies/tailorize',
      size: 'large',
    },
  ],
}

export const homeServicesCarousel = {
  viewAll: { label: 'View All Services', to: '/services' },
  tags: [
    'Discovery & Architecture',
    'Full-Stack Delivery',
    'Product Strategy',
    'UI/UX Systems',
  ],
  blurb:
    'Outcome-led product engineering organized by commercial needs—not programming languages.',
  slides: [
    {
      slug: 'product-engineering',
      title: 'Product Engineering',
      image: '/assets/images/thumbs/portfolio-thumb1.jpg',
    },
    {
      slug: 'saas-development',
      title: 'SaaS Development',
      image: '/assets/images/thumbs/portfolio-thumb2.jpg',
    },
    {
      slug: 'mobile-app-development',
      title: 'Mobile App Development',
      image: '/assets/images/thumbs/portfolio-thumb3.jpg',
    },
    {
      slug: 'ai-integration',
      title: 'AI Integration',
      image: '/assets/images/thumbs/portfolio-thumb4.jpg',
    },
    {
      slug: 'web-development',
      title: 'Web Development',
      image: '/assets/images/thumbs/portfolio-thumb5.jpg',
    },
  ],
}

export const homeHuman = {
  badge: 'Senior-led delivery',
  titleBefore: 'Complex technology. Clear partnership — how we work with product teams to deliver ',
  titleAccent: 'reliably.',
  cta: { label: 'About Mernify', to: '/about' },
  avatars: [
    '/assets/images/thumbs/team-img1.png',
    '/assets/images/thumbs/team-img2.png',
    '/assets/images/thumbs/team-img3.png',
    '/assets/images/thumbs/team-img4.png',
  ],
  principles: [
    {
      title: 'Direct Communication',
      subtitle: 'Delivery principle',
      image: '/assets/images/thumbs/team-thumb1.jpg',
      to: '/about',
      social: [
        { label: 'Facebook', href: 'https://facebook.com' },
        { label: 'LinkedIn', href: 'https://linkedin.com' },
        { label: 'Instagram', href: 'https://instagram.com' },
        { label: 'Dribbble', href: 'https://dribbble.com' },
      ],
    },
    {
      title: 'Transparent Delivery',
      subtitle: 'Delivery principle',
      image: '/assets/images/thumbs/team-thumb2.jpg',
      to: '/about',
      social: [
        { label: 'Facebook', href: 'https://facebook.com' },
        { label: 'LinkedIn', href: 'https://linkedin.com' },
        { label: 'Instagram', href: 'https://instagram.com' },
        { label: 'Dribbble', href: 'https://dribbble.com' },
      ],
    },
    {
      title: 'Product Ownership',
      subtitle: 'Delivery principle',
      image: '/assets/images/thumbs/team-thumb3.jpg',
      to: '/about',
      social: [
        { label: 'Facebook', href: 'https://facebook.com' },
        { label: 'LinkedIn', href: 'https://linkedin.com' },
        { label: 'Instagram', href: 'https://instagram.com' },
        { label: 'Dribbble', href: 'https://dribbble.com' },
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
