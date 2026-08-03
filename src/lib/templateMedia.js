/** Premium service visuals (Dribbble-style product / UI mockup compositions) */
export const SERVICE_IMAGES = {
  'product-engineering': '/assets/images/services/pe-hero.png',
  'saas-development': '/assets/images/services/saas-hero.png',
  'web-development': '/assets/images/services/web-hero.png',
  'ai-integration': '/assets/images/services/ai-hero.png',
  'ui-ux-design': '/assets/images/services/uiux-hero.png',
  'mobile-app-development': '/assets/images/services/mobile-hero.png',
  'workflow-automation': '/assets/images/services/workflow-automation.jpg',
  'cloud-devops': '/assets/images/services/cloud-devops.jpg',
  'api-development': '/assets/images/services/api-development.jpg',
  'dedicated-product-teams': '/assets/images/services/dedicated-product-teams.jpg',
}

export function getServiceImage(slug) {
  return SERVICE_IMAGES[slug] || '/assets/images/services/pe-hero.png'
}

export const INDUSTRY_IMAGES = [
  '/assets/images/thumbs/portfolio-thumb1.jpg',
  '/assets/images/thumbs/portfolio-thumb2.jpg',
  '/assets/images/thumbs/portfolio-thumb3.jpg',
  '/assets/images/thumbs/portfolio-thumb4.jpg',
  '/assets/images/thumbs/portfolio-thumb5.jpg',
  '/assets/images/thumbs/portfolio-thumb6.jpg',
  '/assets/images/thumbs/portfolio-thumb7.jpg',
  '/assets/images/thumbs/portfolio-thumb8.jpg',
  '/assets/images/thumbs/portfolio-thumb9.jpg',
  '/assets/images/thumbs/portfolio-two-thumb1.jpg',
]

export const PROCESS_ICONS = [
  '/assets/images/icons/feature-two-icon1.svg',
  '/assets/images/icons/feature-two-icon2.svg',
  '/assets/images/icons/feature-two-icon3.svg',
  '/assets/images/icons/feature-two-icon4.svg',
]
