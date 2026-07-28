export const navigation = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services', mega: 'services' },
  { label: 'Case Studies', to: '/case-studies' },
  { label: 'Process', to: '/process' },
  { label: 'Contact', to: '/contact' },
]

export const primaryCta = {
  label: 'Discuss Your Project',
  to: '/contact',
}

export const secondaryCta = {
  label: 'View Our Work',
  to: '/case-studies',
}

export const footerCompany = [
  { label: 'About', to: '/about' },
  { label: 'Process', to: '/process' },
  { label: 'Case Studies', to: '/case-studies' },
  { label: 'Contact', to: '/contact' },
]

/** Tall footer nav cards — mirrors mernify-web footer structure */
export const footerNav = [
  { label: 'Home', to: '/' },
  { label: 'Service', to: '/services' },
  { label: 'Project', to: '/case-studies' },
  { label: 'Insight', to: '/process' },
  { label: 'Contact', to: '/contact' },
]

export const footerSocial = [
  { id: 'facebook', label: 'Facebook', href: 'https://facebook.com' },
  { id: 'instagram', label: 'Instagram', href: 'https://instagram.com' },
  { id: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com' },
]

export const footerLegal = [
  { label: 'Privacy Policy', to: '/privacy' },
  { label: 'Terms of Service', to: '/terms' },
]

/** Services shown in the header mega menu (matches mernify-web) */
export const megaServiceSlugs = [
  'product-engineering',
  'saas-development',
  'web-development',
  'mobile-app-development',
  'ai-integration',
  'ui-ux-design',
]
