import { SITE } from '@/constants/site'

export const navigation = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services', mega: 'services' },
  { label: 'Case Studies', to: '/case-studies' },
  { label: 'Industries', to: '/industries' },
  { label: 'Process', to: '/process' },
  { label: 'Contact', to: '/contact' },
]

export const primaryCta = {
  label: 'Discuss Your Project',
  to: '/contact',
}

/** Tall footer nav cards — the five primary destinations. */
export const footerNav = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Case Studies', to: '/case-studies' },
  { label: 'Process', to: '/process' },
  { label: 'Contact', to: '/contact' },
]

/** Individual service links for SEO / footer depth */
export const footerServices = [
  { label: 'Product Engineering', to: '/services/product-engineering' },
  { label: 'SaaS Development', to: '/services/saas-development' },
  { label: 'Web Development', to: '/services/web-development' },
  { label: 'Mobile Apps', to: '/services/mobile-app-development' },
  { label: 'AI Integration', to: '/services/ai-integration' },
  { label: 'UI/UX Design', to: '/services/ui-ux-design' },
]

/** Remaining pages, so every route is reachable from the footer. */
export const footerCompany = [
  { label: 'About', to: '/about' },
  { label: 'Industries', to: '/industries' },
  { label: 'All services', to: '/services' },
]

export const footerSocial = [
  { id: 'facebook', label: 'Facebook', href: SITE.social.facebook },
  { id: 'instagram', label: 'Instagram', href: SITE.social.instagram },
  { id: 'linkedin', label: 'LinkedIn', href: SITE.social.linkedin },
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
