/** Dedicated mobile-app showcase. Store and site URLs come from the Mernify portfolio PDF. */

export const mobileAppFilters = [
  { id: 'all', label: 'All Apps' },
  { id: 'android', label: 'Android' },
  { id: 'ios', label: 'iOS' },
  { id: 'ai', label: 'AI' },
  { id: 'ecommerce', label: 'E-Commerce' },
  { id: 'health', label: 'HealthTech' },
  { id: 'marketplace', label: 'Marketplace' },
]

export const mobileAppServices = [
  { title: 'Native & Cross-Platform Apps', body: 'Android, iOS, and shared codebases shaped around the product, not a single framework.' },
  { title: 'Android Applications', body: 'Production Android apps covering ordering, retail, tracking, and media workflows.' },
  { title: 'iOS Applications', body: 'iPhone apps for marketplaces, compliance, and customer-facing product experiences.' },
  { title: 'React Native Development', body: 'Shared mobile engineering for products that need both stores without two separate teams.' },
  { title: 'AI-Powered Mobile Apps', body: 'On-device and cloud features such as measurement, photo editing, and coaching.' },
  { title: 'E-Commerce Apps', body: 'Catalogs, checkout-adjacent flows, and delivery experiences for retail and grocery.' },
  { title: 'Marketplace Apps', body: 'Buyer and seller journeys for on-demand and community marketplaces.' },
  { title: 'Business Applications', body: 'POS, compliance, and operational tools used by staff during the working day.' },
  { title: 'Backend & API Integration', body: 'Mobile clients connected to orders, accounts, and real-time operational data.' },
  { title: 'Application Maintenance', body: 'Release support after launch so shipped apps stay current in the stores.' },
  { title: 'App Performance Optimization', body: 'Responsiveness, image handling, and sync behavior that hold up on real devices.' },
]

export const mobileAppProcess = [
  { num: '01', title: 'Discovery', body: 'Clarify the user, the platform, and the job the app has to do.' },
  { num: '02', title: 'UI / UX', body: 'Screens and flows that fit a phone, including the states people actually hit.' },
  { num: '03', title: 'Development', body: 'Build the client, integrations, and the paths required for store release.' },
  { num: '04', title: 'Testing', body: 'Exercise devices, languages, and the journeys that carry an order or a record.' },
  { num: '05', title: 'Launch', body: 'Ship to the stores and the web surfaces the product already uses.' },
  { num: '06', title: 'Scale', body: 'Keep improving performance, features, and operations after the first release.' },
]

export const mobileApps = [
  {
    slug: 'the-trolley',
    name: 'The Trolley',
    company: 'Technolyte',
    region: '',
    shortDescription:
      'Delivery platform for groceries, food, medicines, and household essentials with order handling and tracking.',
    description:
      'Delivery platform for groceries, food, medicines and household essentials featuring order handling, real-time tracking and a buyer/seller ecosystem.',
    platforms: ['Android'],
    categories: ['E-Commerce', 'Delivery', 'Real-Time Tracking'],
    technologies: ['Android'],
    features: ['Order handling', 'Real-time tracking', 'Buyer and seller ecosystem'],
    featured: false,
    accent: '#4F46E5',
    logo: '',
    coverImage: '',
    screenshots: ['/images/apps/the-trolley/01.webp', '/images/apps/the-trolley/02.webp'],
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.technolyte.trolley',
    appStoreUrl: '',
    websiteUrl: '',
  },
  {
    slug: 'grocyon',
    name: 'Grocyon',
    company: '',
    region: '',
    shortDescription:
      'Food delivery and grocery shopping so customers can order from nearby restaurants and stores.',
    description:
      'Food delivery and grocery shopping application enabling customers to order from nearby restaurants and grocery stores.',
    platforms: ['Android'],
    categories: ['Food Delivery', 'Marketplace', 'E-Commerce'],
    technologies: ['Android'],
    features: ['Restaurant ordering', 'Grocery shopping', 'Nearby stores'],
    featured: false,
    accent: '#0F766E',
    logo: '',
    coverImage: '',
    screenshots: ['/images/apps/grocyon/01.webp', '/images/apps/grocyon/02.webp'],
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.grocyon.user.app',
    appStoreUrl: '',
    websiteUrl: '',
  },
  {
    slug: 'license-companion',
    name: 'License Companion',
    company: 'Licensecompanion Inc.',
    region: '',
    shortDescription:
      'License, certification, and compliance tracking for doctors and healthcare professionals.',
    description:
      'Application designed for doctors and healthcare professionals to manage licenses, certifications and compliance documents, including renewal reminders and expiry tracking.',
    platforms: ['Android', 'iOS'],
    categories: ['HealthTech', 'Compliance'],
    technologies: ['Android', 'iOS'],
    features: ['License records', 'Renewal reminders', 'Expiry tracking'],
    featured: true,
    badge: 'Featured mobile application',
    accent: '#0369A1',
    logo: '',
    coverImage: '',
    screenshots: ['/images/apps/license-companion/01.webp', '/images/apps/license-companion/02.webp'],
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.license.companion',
    appStoreUrl: 'https://apps.apple.com/us/app/license-companion-inc/id6751810560',
    websiteUrl: '',
  },
  {
    slug: 'authentic-detective',
    name: 'Authentic Detective',
    company: 'Authentic Detective LLC',
    region: '',
    shortDescription:
      'Luxury product authentication with marketplace browsing and a fashion community.',
    description:
      'Luxury product authentication application featuring authentication, marketplace browsing and fashion-community functionality.',
    platforms: ['Android', 'iOS'],
    categories: ['Authentication', 'Marketplace'],
    technologies: ['Android', 'iOS'],
    features: ['Authentication', 'Marketplace browsing', 'Fashion community'],
    featured: false,
    accent: '#111827',
    logo: '',
    coverImage: '',
    screenshots: ['/images/apps/authentic-detective/02.webp', '/images/apps/authentic-detective/01.webp'],
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.techificent.authenticdetetctive',
    appStoreUrl: 'https://apps.apple.com/us/app/authentic-detective/id1659681647',
    websiteUrl: '',
  },
  {
    slug: 'panda-pos',
    name: 'Panda POS',
    company: 'Panda EPOS Limited',
    region: '',
    shortDescription:
      'Point of sale for restaurants, cafés, and retail with order sync across terminals.',
    description:
      'Point-of-sale application for restaurants, cafés and retail businesses with real-time synchronization of order information across terminals.',
    platforms: ['Android'],
    categories: ['POS', 'Retail', 'Real-Time Sync'],
    technologies: ['Android'],
    features: ['Restaurant and retail POS', 'Real-time terminal sync'],
    featured: false,
    accent: '#B45309',
    logo: '',
    coverImage: '',
    screenshots: ['/images/apps/panda-pos/01.webp', '/images/apps/panda-pos/02.webp'],
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.pandaepos.pos',
    appStoreUrl: '',
    websiteUrl: '',
  },
  {
    slug: 'panda-pizzeria',
    name: 'Panda Pizzeria',
    company: 'Panda EPOS Limited',
    region: '',
    shortDescription:
      'Customer food ordering with menus, deals, favourites, and live order tracking.',
    description:
      'Customer-facing food ordering application supporting menu browsing, deals, favourites and real-time order tracking.',
    platforms: ['Android'],
    categories: ['Food Ordering', 'Customer Application', 'E-Commerce'],
    technologies: ['Android'],
    features: ['Menu browsing', 'Deals and favourites', 'Order tracking'],
    featured: false,
    accent: '#DC2626',
    logo: '',
    coverImage: '',
    screenshots: ['/images/apps/panda-pizzeria/01.webp', '/images/apps/panda-pizzeria/02.webp'],
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.pandaepos.pizzeria',
    appStoreUrl: '',
    websiteUrl: '',
  },
  {
    slug: 'arccos-golf',
    name: 'Arccos Golf',
    company: 'Arccos Golf LLC',
    region: '',
    shortDescription:
      'Automatic shot tracking, analytics, and an AI-powered caddie for golfers.',
    description:
      'Golf application providing automatic shot tracking, advanced analytics and AI-powered caddie functionality.',
    platforms: ['Android'],
    categories: ['Sports', 'IoT', 'AI'],
    technologies: ['Android', 'AI Analytics'],
    features: ['Automatic shot tracking', 'Advanced analytics', 'AI caddie'],
    featured: false,
    accent: '#15803D',
    logo: '',
    coverImage: '',
    screenshots: ['/images/apps/arccos-golf/01.webp', '/images/apps/arccos-golf/02.webp'],
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.arccosgolf.androidFlagship',
    appStoreUrl: '',
    websiteUrl: '',
  },
  {
    slug: 'photo-background-changer',
    name: 'Photo Background Changer',
    company: 'Vyro AI / Quantum Edge Ltd.',
    region: '',
    shortDescription:
      'Background removal and replacement, transparent cutouts, and batch image editing.',
    description:
      'Mobile application for background removal and replacement, transparent cutouts, custom background styles and batch image editing.',
    platforms: ['Android'],
    categories: ['AI', 'Photography', 'Background Removal'],
    technologies: ['Android', 'AI'],
    features: ['Background removal', 'Custom backgrounds', 'Batch editing'],
    featured: false,
    accent: '#0891B2',
    logo: '',
    coverImage: '',
    screenshots: ['/images/apps/photo-background-changer/01.webp', '/images/apps/photo-background-changer/02.webp'],
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.vyroai.AutoCutCut',
    appStoreUrl: '',
    websiteUrl: '',
  },
  {
    slug: 'ucardia',
    name: 'Ucardia',
    company: 'Ucardia Inc.',
    region: '',
    shortDescription:
      'Heart-health coaching with vital-sign tracking and customized care programs.',
    description:
      'Heart-health management application providing personalized cardiac coaching, vital-sign tracking and customized care programs.',
    platforms: ['Android'],
    categories: ['HealthTech', 'AI'],
    technologies: ['Android', 'AI Coaching'],
    features: ['Cardiac coaching', 'Vital-sign tracking', 'Care programs'],
    featured: false,
    accent: '#E11D48',
    logo: '',
    coverImage: '',
    screenshots: ['/images/apps/ucardia/01.webp', '/images/apps/ucardia/02.webp'],
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.ucardia',
    appStoreUrl: '',
    websiteUrl: '',
  },
]

const FILTER_MATCH = {
  all: () => true,
  android: (app) => app.platforms.includes('Android'),
  ios: (app) => app.platforms.includes('iOS'),
  ai: (app) => app.categories.some((c) => /ai/i.test(c)),
  ecommerce: (app) => app.categories.some((c) => /e-commerce|commerce|food|retail|delivery/i.test(c)),
  health: (app) => app.categories.some((c) => /health/i.test(c)),
  marketplace: (app) => app.categories.some((c) => /marketplace/i.test(c)),
}

export function getMobileApp(slug) {
  return mobileApps.find((app) => app.slug === slug) || null
}

export function getFeaturedMobileApp() {
  return mobileApps.find((app) => app.featured) || mobileApps[0]
}

export function filterMobileApps(filterId) {
  const match = FILTER_MATCH[filterId] || FILTER_MATCH.all
  return mobileApps.filter((app) => !app.featured && match(app))
}

export function getHomeMobileApps() {
  const slugs = ['license-companion', 'authentic-detective', 'arccos-golf', 'the-trolley']
  return slugs.map((slug) => getMobileApp(slug)).filter(Boolean)
}

export function appInitials(name) {
  return String(name)
    .replace(/—.*/, '')
    .split(/\s+/)
    .filter((part) => /[A-Za-z]/.test(part))
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}
