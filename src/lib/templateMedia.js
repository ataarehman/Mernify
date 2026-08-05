/** Premium service visuals (Dribbble-style product / UI mockup compositions) */
export const SERVICE_IMAGES = {
  'product-engineering': '/assets/images/services/pe-hero.webp',
  'saas-development': '/assets/images/services/saas-hero.webp',
  'web-development': '/assets/images/services/web-hero.webp',
  'ai-integration': '/assets/images/services/ai-hero.webp',
  'ui-ux-design': '/assets/images/services/uiux-hero.webp',
  'mobile-app-development': '/assets/images/services/mobile-hero.webp',
  'workflow-automation': '/assets/images/services/workflow-automation.webp',
  'cloud-devops': '/assets/images/services/cloud-devops.webp',
  'api-development': '/assets/images/services/api-development.webp',
  'dedicated-product-teams': '/assets/images/services/dedicated-product-teams.webp',
}

export function getServiceImage(slug) {
  return SERVICE_IMAGES[slug] || '/assets/images/services/pe-hero.webp'
}

export const PROCESS_ICONS = [
  '/assets/images/icons/feature-two-icon1.svg',
  '/assets/images/icons/feature-two-icon2.svg',
  '/assets/images/icons/feature-two-icon3.svg',
  '/assets/images/icons/feature-two-icon4.svg',
]
