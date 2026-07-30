export const BREAKPOINTS = {
  sm: 360,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1440,
}

export const HEADER_OFFSET_PX = 84

export const ROUTES = {
  home: '/',
  services: '/services',
  industries: '/industries',
  caseStudies: '/case-studies',
  process: '/process',
  about: '/about',
  contact: '/contact',
  privacy: '/privacy',
  terms: '/terms',
}

export const SITE = {
  name: 'Mernify',
  tagline: 'Build Modern. Scale Confidently.',
  promise: 'Modern technology. Reliable execution. Measurable business value.',
  positioning:
    'Focused product-engineering partner for startups, growing businesses, and enterprises.',
  email: 'hello@mernify.com',
  url: 'https://mernify.co',
  defaultTitle: 'Mernify — We Design, Engineer & Scale Digital Products',
  defaultDescription:
    'Mernify helps startups, growing businesses, and enterprises build reliable web, mobile, SaaS, and AI-powered products that drive growth and create measurable business value.',
  /** Default share image (1200×630). */
  ogImage: '/og-image.jpg',
  /** Optional Calendly (or equivalent) booking URL — set via VITE_CALENDLY_URL */
  calendlyUrl: import.meta.env.VITE_CALENDLY_URL || '',
  /** GA4 measurement id — set via VITE_GA_MEASUREMENT_ID */
  gaId: import.meta.env.VITE_GA_MEASUREMENT_ID || '',
  social: {
    linkedin: 'https://www.linkedin.com/company/mernify',
    facebook: 'https://www.facebook.com/mernify',
    instagram: 'https://www.instagram.com/mernify',
  },
  responseSla: 'We typically reply within 1 business day.',
}
