/** Thumb images mapped from mernify-web service / portfolio assets */
export const SERVICE_IMAGES = {
  'product-engineering': '/assets/images/thumbs/service-three-thumb1.png',
  'saas-development': '/assets/images/thumbs/service-three-thumb2.png',
  'web-development': '/assets/images/thumbs/service-three-thumb3.png',
  'ai-integration': '/assets/images/thumbs/service-three-thumb4.png',
  'ui-ux-design': '/assets/images/thumbs/about-thumb-two.jpg',
  'mobile-app-development': '/assets/images/thumbs/portfolio-two-thumb3.jpg',
  'workflow-automation': '/assets/images/thumbs/portfolio-thumb5.jpg',
  'cloud-devops': '/assets/images/thumbs/portfolio-thumb6.jpg',
  'api-development': '/assets/images/thumbs/portfolio-thumb7.jpg',
  'dedicated-product-teams': '/assets/images/thumbs/team-thumb1.jpg',
}

export function getServiceImage(slug) {
  return SERVICE_IMAGES[slug] || '/assets/images/thumbs/service-thumb1.jpg'
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
