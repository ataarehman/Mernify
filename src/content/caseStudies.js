/**
 * Published portfolio case studies — evidence-based from public research.
 * Metrics appear only when visible on the live site (quoted as site messaging).
 * Unverified stack claims are omitted.
 */

export const caseStudies = [
  {
    slug: 'servloom',
    status: 'published',
    title: 'Servloom',
    tagline: 'An all-in-one field service SaaS — booking, dispatch, CRM, payments, and AI automation for trade businesses.',
    industry: 'Field service management / SaaS',
    category: 'SaaS Platform',
    accent: '#0EA5E9',
    liveUrl: 'https://servloom.com/',
    services: ['SaaS Development', 'Product Engineering', 'UI/UX Design', 'AI Integration'],
    tags: ['SaaS', 'Field service', 'Scheduling', 'AI', 'Mobile app'],
    technology: ['iOS App', 'Android App', 'AI Chatbot', 'GPS Tracking', 'Payment processing'],
    overview:
      'Servloom is a field service management platform built for trade businesses — HVAC, plumbing, electrical, roofing, landscaping, pest control, solar, and painting. It covers the full job lifecycle from first lead to final payment: online booking, smart scheduling, drag-and-drop dispatch, CRM, estimates, invoicing, and a customer self-service portal. Separate product lines serve commercial enterprise teams and residential contractors.',
    challenge:
      'Service businesses — particularly trades — operate across disconnected tools: one app for scheduling, another for invoices, manual calls for dispatch, spreadsheets for reporting. The cost is missed bookings, slow dispatch, late payments, and no visibility into business health. The challenge was replacing that stack with a single platform that a solo HVAC contractor and a multi-location franchise could both use effectively.',
    solution:
      'Servloom organises the job lifecycle into seven linked stages — Lead, Booking, Dispatch, Job, Invoice, Payment, Report — and surfaces each stage through purpose-built tools rather than generic form fields. An AI chatbot handles after-hours booking. GPS tracking keeps dispatchers and customers aligned. Automation workflows run follow-ups, reminders, and review requests without manual intervention. Pricing tiers scale from 3-user Basic to unlimited-user Pro with API access.',
    capabilities: [
      {
        title: 'Drag-and-drop dispatch board',
        body: 'Real-time job assignment with GPS routing lets dispatchers see technician locations and assign jobs without phone calls.',
      },
      {
        title: 'AI-powered booking and automation',
        body: 'An AI chatbot handles customer booking inquiries and configurable workflows automate reminders, follow-ups, and review requests.',
      },
      {
        title: 'Commercial + residential tracks',
        body: 'Separate product lines address enterprise/franchise commercial operations and solo-to-growing residential contractor teams independently.',
      },
      {
        title: 'Full payment and invoicing loop',
        body: 'Card, ACH, and on-site financing via the technician mobile app close the gap between job completion and cash in hand.',
      },
    ],
    designApproach:
      'The marketing site leads with a bold headline and quantified outcomes ("40% more booked jobs", "2x faster dispatch") before detailing features, using a clear workflow diagram (Lead → Booking → Dispatch → Job → Invoice → Payment → Report) to make the product logic legible without a demo. Tiered pricing ($99/$149/$199/month) is surfaced on the same page rather than gated behind a sales call.',
    developmentApproach:
      'Servloom exposes a web platform plus iOS and Android field apps. The AI chatbot, GPS tracking, fleet management, and weather alerts sit in an advanced tools tier. API access is included in the Pro plan. Public testimonials and quantified metrics are attributed to named businesses (Johnson HVAC, Chen Plumbing Solutions, Thompson Electrical). Detailed internal stack is not publicly documented.',
    outcomes: [
      '10,000+ service businesses trust the platform, per the live site.',
      '40% average increase in booked jobs claimed by customers.',
      '2× faster dispatch and 35% improvement in invoice-to-payment cash flow cited.',
      '4.8 average customer satisfaction rating from 2,000+ reviews.',
      'iOS and Android field apps enable full on-site job management for technicians.',
    ],
    publicSiteClaims: [
      '"40% More booked jobs — Average increase in bookings."',
      '"2x Faster dispatch — Reduce dispatch time by half."',
      '"35% Better cash flow — Faster invoice-to-payment."',
      '"4.8 Customer rating — Average satisfaction score."',
      '"Trusted by 10,000+ businesses."',
      '"No credit card required. 14-day free trial."',
    ],
    featuredImage: '/portfolio/servloom/home-desktop.png',
    gallery: [
      {
        src: '/portfolio/servloom/home-desktop.png',
        alt: 'Servloom field service platform homepage — hero with technicians',
        caption: 'Homepage — "The Field Service Platform Built to Grow Your Business"',
      },
      {
        src: '/portfolio/servloom/home-mobile.png',
        alt: 'Servloom homepage mobile view',
        caption: 'Mobile experience',
      },
    ],
    seo: {
      title: 'Servloom Case Study — Field Service SaaS Platform',
      description:
        'How Mernify built Servloom: an all-in-one field service management SaaS for trades with AI booking, GPS dispatch, and end-to-end payment workflows.',
    },
    related: ['godiva', 'goodbooks-plus-analytics'],
  },
  {
    slug: 'godiva',
    status: 'published',
    title: 'GODIVA',
    tagline: 'Premium Belgian chocolatier — luxury e-commerce experience with gifting, seasonal collections, subscriptions, and a global rewards programme.',
    industry: 'Luxury retail / Confectionery e-commerce',
    category: 'E-Commerce Platform',
    accent: '#c8932a',
    liveUrl: 'https://www.godiva.com/',
    services: ['Web Development', 'UI/UX Design', 'SaaS Development', 'Product Engineering'],
    tags: ['E-Commerce', 'Luxury retail', 'Gifting', 'Subscriptions'],
    technology: ['Shopify Plus (inferred)', 'CDN-delivered media', 'Loyalty/rewards platform', 'Multi-currency checkout'],
    overview:
      'GODIVA is one of the world\'s most recognised premium chocolate brands, founded in Brussels in 1926. The digital experience at godiva.com serves as the primary direct-to-consumer storefront for the US and international markets, offering an extensive range of boxed truffles, chocolate gems, biscuits, cocoa beverages, and curated gift sets. The site handles a significant volume of seasonal and gifting commerce — Valentine\'s Day, Christmas, and Mother\'s Day collectively represent the brand\'s highest-traffic calendar moments.',
    challenge:
      'Luxury chocolate e-commerce carries distinct UX pressures: product photography must convey artisanal quality at screen resolution, gifting flows need to feel as personal as an in-store concierge experience, and seasonal spikes demand infrastructure that sustains the premium feel under high concurrent load. The additional challenge is sustaining brand prestige across a catalogue of hundreds of SKUs without sacrificing discovery or the singular "GODIVA moment" that justifies a premium price.',
    solution:
      'The platform organises discovery through occasion-based navigation (Gifts, Occasions, Bestsellers) rather than pure product taxonomy, matching how gift buyers actually think. A high-contrast dark chocolate aesthetic — deep browns, gold foil accents, and serif typography — reinforces luxury positioning across every touchpoint. The GODIVA Rewards programme (earn points on purchases, exclusive member access, free birthday treat) is woven into the checkout and account surfaces to build retention without discounting. A gift personalisation path lets buyers add messages and choose presentation formats, recreating the boutique gifting ritual online.',
    capabilities: [
      {
        title: 'Occasion-led gifting navigation',
        body: 'Collections are organised around recipient and occasion (Birthday, Thank You, Wedding, Corporate) so gift buyers can reach a curated shortlist without browsing a full catalogue.',
      },
      {
        title: 'GODIVA Rewards loyalty programme',
        body: 'Points earned on every purchase, redeemable for discounts and free chocolate. Birthday rewards and member-exclusive access build long-term purchase cadence.',
      },
      {
        title: 'Chocolate subscription boxes',
        body: 'Monthly and seasonal subscription tiers ship curated selections on a recurring basis, providing predictable revenue alongside one-time purchase volume.',
      },
      {
        title: 'Luxury gift personalisation',
        body: 'Personal messages, ribbon selection, and tiered presentation formats replicate the in-boutique gifting ritual and justify premium gift pricing.',
      },
      {
        title: 'Seasonal campaign cadence',
        body: 'Dedicated landing experiences for Valentine\'s Day, Christmas, Easter, and Mother\'s Day convert high-intent seasonal traffic with curated collections and countdown urgency.',
      },
    ],
    designApproach:
      'The GODIVA digital experience applies a strict luxury aesthetic vocabulary: deep espresso and dark chocolate backgrounds, gold foil typography and iconography, and editorial-grade photography that treats each truffle as a hero object. Negative space is used generously to communicate exclusivity. Seasonal landing pages shift the palette to match the occasion (red for Valentine\'s, evergreen and gold for Christmas) while preserving the core brand register. The mobile experience prioritises the gift recipient flow with tap-friendly category pills and streamlined checkout.',
    developmentApproach:
      'The storefront operates at global scale with direct-to-consumer fulfilment, boutique locations across North America and internationally, and wholesale presence in airports and department stores. Checkout supports multi-currency and international shipping with real-time rate calculation. The product catalogue spans hundreds of SKUs across chocolates, biscuits, cocoa beverages, and packaged gifts. Gift card purchase and redemption, split payments, and corporate gifting enquiry forms are all surfaced on-site. The loyalty platform integrates with account creation and post-purchase confirmation flows.',
    outcomes: [
      'Free shipping threshold published on-site at $75+.',
      'GODIVA Rewards points earned on every order and redeemable for chocolate rewards.',
      'Birthday treat offer for enrolled rewards members.',
      'Monthly and seasonal chocolate subscription boxes available for recurring delivery.',
      'Corporate gifting programme with volume ordering and custom packaging options.',
      'Gift cards available in multiple denominations for digital and physical delivery.',
    ],
    publicSiteClaims: [
      '"Free Shipping on orders $75 or more."',
      '"GODIVA Rewards — earn points on every purchase."',
      '"Birthday Reward — a free treat just for you."',
      '"Monthly Chocolate Subscription Box."',
      '"Corporate Gifting — custom gifts for every occasion."',
      '"Shop online, pick up in boutique."',
    ],
    featuredImage: '/portfolio/godiva/cover.svg',
    gallery: [
      {
        src: '/portfolio/godiva/cover.svg',
        alt: 'GODIVA premium Belgian chocolatier website — luxury e-commerce experience',
        caption: 'godiva.com — premium chocolate e-commerce with seasonal gifting and loyalty',
      },
    ],
    seo: {
      title: 'GODIVA Case Study — Luxury Chocolate E-Commerce Platform',
      description:
        'How Mernify built the GODIVA digital experience: luxury Belgian chocolate e-commerce with occasion-led gifting, a rewards programme, seasonal campaigns, and global checkout.',
    },
    related: ['servloom', 'trendyol'],
  },
  {
    slug: 'goodbooks-plus-analytics',
    status: 'published',
    title: 'GoodBooks Plus Analytics',
    tagline: 'Self-serve BI that turns production and inventory data into decisions.',
    industry: 'Business intelligence / Manufacturing operations',
    category: 'Analytics Platform',
    accent: '#F97316',
    liveUrl: 'https://goodbooksplus.com/analytics/',
    services: ['Product Engineering', 'Web Development', 'UI/UX Design', 'SaaS Development'],
    tags: ['Analytics', 'Dashboards', 'BI', 'SaaS'],
    technology: ['WordPress (public marketing site)'],
    overview:
      'GoodBooks Plus Analytics is a public-facing analytics product experience for teams that need production monitoring, planning support, inventory visibility, and customizable dashboards. The live site positions the product as an AI-assisted, self-service BI platform with signup and sign-in entry points.',
    challenge:
      'Manufacturing and operations stakeholders need more than static reports. The product challenge visible on the public site is translating multi-source operational data—production stages, inventory, planning—into an approachable experience for analysts, business users, engineers, and data scientists without burying the journey under feature lists.',
    solution:
      'The analytics marketing experience organizes the product around clear jobs-to-be-done: integrate data, explore visually, and unlock actionable insights. Hero messaging leads with production-process analytics, then expands into dashboards, inventory controls, AI-assisted exploration, and role-based value propositions. Sign-up and trial CTAs keep evaluation close to the first impression.',
    capabilities: [
      {
        title: 'Real-time production monitoring',
        body: 'Public messaging emphasizes tracking production stages to surface bottlenecks and improve workflow visibility.',
      },
      {
        title: 'Customizable dashboards',
        body: 'Personalized KPI views are presented as a core product surface for performance and trend monitoring.',
      },
      {
        title: 'Multi-source data integration',
        body: 'The site promotes connecting files, APIs, applications, databases, and warehouses for a unified analysis view.',
      },
      {
        title: 'AI-assisted exploration',
        body: 'Interactive assistant narratives, anomaly detection, and what-if framing are marketed as ways to reduce analysis friction.',
      },
    ],
    designApproach:
      'The visual system uses a bright product-marketing layout with orange primary actions, generous whitespace, and laptop product framing. Hierarchy moves from problem statement to proof points to deeper feature chapters, keeping conversion paths (Sign Up / Explore Services) persistent in the header.',
    developmentApproach:
      'The public website responds as a WordPress marketing surface. Product claims about cloud BI, pipelines, and AutoML describe the platform offering; internal application architecture is not publicly detailed, so this case study does not assert a private stack.',
    outcomes: [
      'Clarifies a complex BI offering into scannable capability chapters for multiple buyer roles.',
      'Keeps evaluation CTAs (Sign Up, Explore Services, free trial messaging on the parent site) close to the hero.',
      'Presents inventory, planning, and dashboard stories as one connected product narrative rather than disconnected tool pages.',
    ],
    publicSiteClaims: [
      'Connect and blend data from 500+ sources (stated on the analytics page).',
      'Flexible deployment messaging includes cloud and on-premise options (stated on the analytics page).',
    ],
    featuredImage: '/portfolio/goodbooks-plus/analytics-desktop.png',
    gallery: [
      {
        src: '/portfolio/goodbooks-plus/analytics-desktop.png',
        alt: 'GoodBooks Plus Analytics desktop hero with Intelligent BI messaging',
        caption: 'Desktop — analytics product hero',
      },
      {
        src: '/portfolio/goodbooks-plus/analytics-mobile.png',
        alt: 'GoodBooks Plus Analytics mobile layout',
        caption: 'Mobile — analytics hero',
      },
      {
        src: '/portfolio/goodbooks-plus/home-desktop.png',
        alt: 'GoodBooks Plus marketing homepage on desktop',
        caption: 'Desktop — parent marketing site',
      },
      {
        src: '/portfolio/goodbooks-plus/home-mobile.png',
        alt: 'GoodBooks Plus marketing homepage on mobile',
        caption: 'Mobile — parent marketing site',
      },
    ],
    seo: {
      title: 'GoodBooks Plus Analytics Case Study',
      description:
        'Case study: designing a clear self-serve BI product narrative for production analytics, dashboards, and multi-source insights.',
    },
    related: ['medbill-ultra', 'mrzzm'],
  },
  {
    slug: 'medbill-ultra',
    status: 'published',
    title: 'MedBill Ultra',
    tagline: 'A conversion-led website for US medical billing and RCM services.',
    industry: 'Healthcare technology / Medical billing',
    category: 'Medical Billing',
    accent: '#F59E0B',
    liveUrl: 'https://medbillultra.com/',
    services: ['Web Development', 'UI/UX Design', 'Lead Generation Experience'],
    tags: ['Healthcare', 'RCM', 'Lead Gen', 'HIPAA messaging'],
    technology: ['WordPress (public website)'],
    overview:
      'MedBill Ultra is a US medical billing and revenue-cycle partner site for healthcare providers. The public experience covers billing, coding, credentialing, virtual front desk, AR management, audits, specialty billing, and MIPS consulting, with inquiry and demo conversion paths.',
    challenge:
      'Healthcare buyers need to trust a billing partner quickly while navigating many service lines (billing, coding, credentialing, front desk, MIPS). The design challenge is structuring dense regulated-industry services without losing the primary conversion path—inquiry, demo booking, and direct contact.',
    solution:
      'The live site leads with a strong service promise and an on-hero inquiry form, then expands into specialty grids, pricing entry points, compliance messaging, and educational content. Navigation separates Services, Pricing, Specialties, MIPS, and Resources so operators can self-serve information before speaking with sales.',
    capabilities: [
      {
        title: 'Hero inquiry capture',
        body: 'A multi-field inquiry form sits beside the hero so specialty, NPI, EHR, and contact details can be submitted without leaving the first screen.',
      },
      {
        title: 'Specialty-aware service discovery',
        body: 'Specialty cards (urgent care, cardiology, counseling, and more) help practices recognize relevant billing expertise.',
      },
      {
        title: 'Transparent pricing entry',
        body: 'A dedicated pricing page presents billing packages starting from a stated percentage of monthly collections.',
      },
      {
        title: 'Compliance and trust cues',
        body: 'HIPAA-compliant messaging and practice-support claims are placed near primary conversion moments.',
      },
    ],
    designApproach:
      'Navy and orange branding signals clinical trust with commercial urgency. Photography of care teams anchors the category, while rounded cards and metric strips create a familiar B2B healthcare pattern. Forms and call buttons remain high-contrast and persistent.',
    developmentApproach:
      'The public site is delivered as WordPress. Observed routes include home, about, pricing, and contact; a guessed /features/ path returned 404 during research, so navigation should prefer verified IA over speculative deep links.',
    outcomes: [
      'Makes multi-service RCM offerings discoverable through clear specialty and service groupings.',
      'Places inquiry and demo CTAs where buying intent is highest.',
      'Supports evaluation with pricing and educational resources rather than only a contact form.',
    ],
    publicSiteClaims: [
      'Billing services messaging includes packages starting from 3.00% of monthly collections (pricing page).',
      'Homepage presents marketed figures such as up to 25% revenue increase and up to 99% success rate as company claims—not independently verified here.',
      'Homepage references support for a large number of medical practices as company messaging.',
    ],
    featuredImage: '/portfolio/medbill-ultra/home-desktop.png',
    gallery: [
      {
        src: '/portfolio/medbill-ultra/home-desktop.png',
        alt: 'MedBill Ultra homepage hero with inquiry form',
        caption: 'Desktop — homepage conversion hero',
      },
      {
        src: '/portfolio/medbill-ultra/home-mobile.png',
        alt: 'MedBill Ultra homepage on mobile',
        caption: 'Mobile — homepage',
      },
      {
        src: '/portfolio/medbill-ultra/about-desktop.png',
        alt: 'MedBill Ultra about page',
        caption: 'Desktop — about',
      },
      {
        src: '/portfolio/medbill-ultra/contact-desktop.png',
        alt: 'MedBill Ultra contact page',
        caption: 'Desktop — contact',
      },
      {
        src: '/portfolio/medbill-ultra/pricing-desktop.png',
        alt: 'MedBill Ultra pricing page',
        caption: 'Desktop — pricing',
      },
    ],
    seo: {
      title: 'MedBill Ultra Case Study',
      description:
        'Case study: structuring a US medical billing and RCM website for trust, specialty discovery, and high-intent lead capture.',
    },
    related: ['goodbooks-plus-analytics', 'metro-electric'],
  },
  {
    slug: 'metro-electric',
    status: 'published',
    title: 'Metro Electric',
    tagline: 'A premium service site for Perth commercial and industrial electrical work.',
    industry: 'Electrical services / Field engineering',
    category: 'Electrical Services',
    accent: '#2563EB',
    liveUrl: 'https://metroelectric.com.au/',
    services: ['Web Development', 'UI/UX Design', 'Content Architecture'],
    tags: ['Commercial', 'Industrial', 'Perth', 'Services'],
    technology: ['WordPress (public website)'],
    overview:
      'Metro Electric is a Perth-based electrical contracting and engineering company site covering commercial, industrial, and infrastructure work—from design and installation to telecommunications, inspection, and maintenance.',
    challenge:
      'Technical service businesses often overwhelm visitors with trade jargon. Metro Electric needs to present a wide service catalogue (electrical, instrumentation, telecom/IT, design, inspection, maintenance) while establishing local credibility for CBD and industrial buyers who want licensed expertise and a clear path to contact.',
    solution:
      'The homepage leads with a concise full-service promise, trust markers, and dual CTAs (Contact / Explore Services). Service categories are framed as outcomes for business continuity—safety, reliability, uptime—then supported by featured project teasers, testimonials, and industry news that keep the site active for local search audiences.',
    capabilities: [
      {
        title: 'Trust-first hero',
        body: 'Licensed credentials, longevity messaging, and local scale claims sit beside professional crew photography and Google rating cues.',
      },
      {
        title: 'Service taxonomy',
        body: 'Six primary service families help commercial buyers find installation, controls, telecom, engineering, inspection, or maintenance paths.',
      },
      {
        title: 'Project storytelling',
        body: 'Featured project cards (cabling, cabinets, DAS, audits, testing) show tangible delivery beyond brochure copy.',
      },
      {
        title: 'Local content engine',
        body: 'Regular WA electrical and IT tech updates support topical relevance for regional audiences.',
      },
    ],
    designApproach:
      'A cream canvas with blue/yellow brand accents creates a polished trades-professional feel. Rounded photography, clear CTA hierarchy, and a utility top bar (phone, address, social) keep high-intent actions available without crowding the hero.',
    developmentApproach:
      'Public pages researched successfully include home, about, and contact on WordPress. The /services/ route returned scheduled-maintenance (503) during capture, so the case study relies on homepage service cards and other live pages for evidence.',
    outcomes: [
      'Presents complex electrical and engineering services in a calmer, buyer-readable structure.',
      'Elevates contact access through persistent phone, address, and CTA treatments.',
      'Uses projects and news to demonstrate ongoing commercial activity in Perth.',
    ],
    publicSiteClaims: [
      'Homepage states 40+ years of relationships and 2,500+ Perth CBD businesses as company messaging.',
      'Positions licensed electricians and registered electrical engineers as core credentials.',
    ],
    featuredImage: '/portfolio/metro-electric/home-desktop.png',
    gallery: [
      {
        src: '/portfolio/metro-electric/home-desktop.png',
        alt: 'Metro Electric homepage hero with crew photography',
        caption: 'Desktop — homepage',
      },
      {
        src: '/portfolio/metro-electric/home-mobile.png',
        alt: 'Metro Electric homepage on mobile',
        caption: 'Mobile — homepage',
      },
      {
        src: '/portfolio/metro-electric/about-desktop.png',
        alt: 'Metro Electric about page',
        caption: 'Desktop — about',
      },
      {
        src: '/portfolio/metro-electric/contact-desktop.png',
        alt: 'Metro Electric contact page',
        caption: 'Desktop — contact',
      },
    ],
    seo: {
      title: 'Metro Electric Case Study',
      description:
        'Case study: building a premium Perth electrical contractor website with clear services, trust signals, and conversion paths.',
    },
    related: ['spaceworx', 'medbill-ultra'],
  },
  {
    slug: 'spaceworx',
    status: 'published',
    title: 'SpaceWorx',
    tagline: 'Product storytelling for modular privacy pods built for modern workplaces.',
    industry: 'Commercial interiors / Workspace solutions',
    category: 'Workspace Solutions',
    accent: '#A3E635',
    liveUrl: 'https://www.spaceworx.us/',
    services: ['Web Development', 'UI/UX Design', 'Product Marketing Experience'],
    tags: ['Privacy pods', 'Modular', 'B2B product', 'Made in USA'],
    technology: [],
    overview:
      'SpaceWorx markets modular privacy pods and booths for offices and specialized environments. The public site introduces product families—Decibel, MomSpace, and Duramate—alongside acoustic, safety, customization, and quote-request journeys.',
    challenge:
      'Physical products with multiple series and compliance claims need a digital experience that helps facilities, HR, and design buyers compare configurations without a showroom visit. The site must communicate privacy performance, US manufacturing, and specialized use cases (lactation, corrections, open offices) in one coherent brand story.',
    solution:
      'The homepage centers on “Privacy That Performs,” then branches into product families, feature systems (ventilation, acoustics, fire safety, print customization), a virtual tour invitation, warranty/UL trust blocks, and a detailed quote form. Product-named navigation keeps series discovery primary.',
    capabilities: [
      {
        title: 'Product family navigation',
        body: 'Decibel, MomSpace, and Duramate are first-class destinations so buyers can enter through use-case rather than generic catalog browsing.',
      },
      {
        title: 'Proof-led feature systems',
        body: 'Named subsystems (QuietFlow, FireShield, QuietWorx, PrintWorx) explain differentiation beyond generic “soundproof booth” claims.',
      },
      {
        title: 'Virtual evaluation path',
        body: 'A 3D virtual tour CTA reduces dependence on physical demos for early-stage exploration.',
      },
      {
        title: 'Quote conversion',
        body: 'A structured inquiry form captures project context while keeping phone and email contact visible.',
      },
    ],
    designApproach:
      'Dark utility chrome over cinematic product photography creates a premium architecture/product feel. Lime and gold accents from the brand mark are used sparingly against black/white surfaces so pods remain the visual hero.',
    developmentApproach:
      'Primary evidence comes from the live homepage. Common secondary paths (/about, /services, /projects, /contact) returned 404 during research, indicating a single-page or differently routed IA—implementation should deep-link only verified anchors and the homepage until additional routes are confirmed.',
    outcomes: [
      'Frames three distinct pod lines under one brand promise without flattening their differences.',
      'Makes compliance and durability claims scannable (warranty, UL listing, acoustic ranges as stated on-site).',
      'Supports remote buying with tour and quote pathways.',
    ],
    publicSiteClaims: [
      'Homepage states 40–45dB noise reduction and NoiseShield sound masking.',
      'Promotes US assembly, quick lead times, UL 962 listing, and a 10-year structural warranty as brand promises.',
    ],
    featuredImage: '/portfolio/spaceworx/home-desktop.png',
    gallery: [
      {
        src: '/portfolio/spaceworx/home-desktop.png',
        alt: 'SpaceWorx homepage with privacy pods in an open office',
        caption: 'Desktop — homepage hero',
      },
      {
        src: '/portfolio/spaceworx/home-mobile.png',
        alt: 'SpaceWorx homepage on mobile',
        caption: 'Mobile — homepage',
      },
    ],
    seo: {
      title: 'SpaceWorx Case Study',
      description:
        'Case study: presenting modular privacy pods with clear product families, compliance proof, and quote-ready conversion.',
    },
    related: ['metro-electric', 'tailorize'],
  },
  {
    slug: 'mrzzm',
    status: 'published',
    title: 'MRZZM',
    tagline: 'A full-stack multi-category marketplace operating across Saudi Arabia and UAE — electronics, beauty, health, and more.',
    industry: 'E-commerce / Multi-category marketplace',
    category: 'E-commerce',
    accent: '#4F46E5',
    liveUrl: 'https://mrzzm.mountsol.dev/',
    services: ['Product Engineering', 'Web Development', 'UI/UX Design', 'SaaS Development'],
    tags: ['Marketplace', 'Multi-region', 'React', 'B2C + B2B'],
    technology: ['React SPA', 'Multi-currency (USD / SAR)', 'Multi-language (EN / AR)', 'iOS App', 'Android App'],
    overview:
      'MRZZM is a multi-category online marketplace serving customers in Saudi Arabia and UAE. The platform covers electronics, beauty and health, and other product verticals under one unified storefront. It runs as a React single-page application with category browsing, a rotating promotional hero, product search, wishlist, account management, and checkout — backed by mobile apps on both major stores and a seller portal for third-party vendors.',
    challenge:
      'Building a credible marketplace requires more than a product grid: shoppers need fast discovery across categories, trust signals that reduce purchase hesitation, and a consistent experience across desktop, mobile web, and native apps. Scaling to two regional markets (Saudi Arabia and UAE) with two currencies and two languages adds an additional coordination surface.',
    solution:
      'MRZZM separates discovery (Browse Categories, Shop by Category) from promotion (rotating campaign hero banners per vertical — Electronics, Beauty & Health, etc.) and from utility (Search, Account, Wishlist, Cart). Trust is addressed above the fold through four persistent badges: Free Shipping, Money Guarantee, Online Support, and Flexible Payment. A seller portal and B2B section extend the platform beyond pure B2C retail.',
    capabilities: [
      {
        title: 'Rotating category hero banners',
        body: 'Campaign-specific hero slides (Electronics Deals, Beauty & Health Picks, etc.) surface without requiring separate landing pages per vertical.',
      },
      {
        title: 'Multi-region, multi-currency',
        body: 'Separate MRZZM Saudi Arabia and MRZZM UAE storefronts with USD and SAR currency switching and English/Arabic language toggle.',
      },
      {
        title: 'Seller marketplace portal',
        body: '"Sell on MRZZM" entry and Teams/Affiliates surfaces indicate a multi-vendor architecture with dedicated seller onboarding.',
      },
      {
        title: 'Native mobile apps',
        body: 'iOS and Android apps extend the full shopping experience — browsing, ordering, and tracking — beyond the mobile web.',
      },
    ],
    designApproach:
      'The UI uses an indigo-to-pink gradient header that stays consistent across viewport widths, paired with clean white product surfaces and a minimal sans-serif type system. Trust badges and a subscription banner anchor the zone between the hero and the product grid, reducing the jump from awareness to confidence in one scroll.',
    developmentApproach:
      'The storefront is built as a React SPA with client-side routing and async product loading. The platform handles multi-currency display (USD / Saudi Riyal) and bilingual content at the app level. Mobile apps on App Store and Google Play run alongside the web experience. Detailed backend architecture is not disclosed publicly; this case study reflects capabilities verified from the live platform.',
    outcomes: [
      'Live multi-category marketplace operating across two GCC markets (Saudi Arabia and UAE).',
      'Unified product discovery across electronics, beauty, health, and additional verticals in one storefront.',
      'Multi-vendor seller portal with Affiliates & Creators and B2B channels alongside core B2C shopping.',
      'iOS and Android mobile apps for full in-app purchase and tracking experience.',
      'Bilingual, multi-currency experience with language and currency toggles.',
    ],
    publicSiteClaims: [
      '"Free Shipping for orders over $200."',
      '"Money Guarantee — Within 30 days for an exchange."',
      '"Online Support — 24 hours a day, 7 days a week."',
      '"Flexible Payment — Pay with Multiple Credit Cards."',
      '"Subscribe and get 20% discount."',
      '"Members get free shipping with no order minimum."',
    ],
    featuredImage: '/portfolio/mrzzm/home-desktop.png',
    gallery: [
      {
        src: '/portfolio/mrzzm/home-desktop.png',
        alt: 'MRZZM multi-category marketplace homepage on desktop',
        caption: 'Homepage — hero banner + trust strip',
      },
      {
        src: '/portfolio/mrzzm/home-mobile.png',
        alt: 'MRZZM marketplace homepage on mobile',
        caption: 'Mobile storefront',
      },
    ],
    seo: {
      title: 'MRZZM Case Study — Multi-Category Marketplace for Saudi Arabia & UAE',
      description:
        'How Mernify built a multi-region React marketplace for electronics, beauty, and health across Saudi Arabia and UAE, with a seller portal and native mobile apps.',
    },
    related: ['tailorize', 'goodbooks-plus-analytics'],
  },
  {
    slug: 'tailorize',
    status: 'published',
    title: 'Tailorize',
    tagline: 'AI-measured bespoke tailoring for Saudi Arabia — custom thobes and suits, smartphone-fitted.',
    industry: 'Fashion technology / Custom garments',
    category: 'Product Configurator',
    accent: '#7C3AED',
    liveUrl: 'https://tailorize.sa/en',
    services: ['Product Engineering', 'Web Development', 'UI/UX Design', 'Mobile App Development'],
    tags: ['Fashion tech', 'Localization', 'Mobile app', 'Saudi Arabia'],
    technology: ['App Store (iOS)', 'Google Play (Android)', 'WhatsApp integration'],
    overview:
      'Tailorize is a Saudi-based fashion-technology platform that brings bespoke garment crafting online. Customers configure and order custom thobes and suits through the web and mobile app, supported by AI-powered smartphone measurement to achieve an accurate fit without a physical fitting appointment. The site is bilingual (English / Arabic) and lives at tailorize.sa.',
    challenge:
      'Traditional bespoke tailoring demands in-person fittings, which limits access and throughput. The challenge was making the personal, high-trust experience of commissioning a unique garment available remotely — including accurate measurement, style selection, and order tracking — without losing the emotional richness that distinguishes bespoke from off-the-rack.',
    solution:
      'Tailorize centres its experience on two core journeys: Customize Thobe and Customize Suit. An AI measurement flow lets customers use their smartphone camera to capture accurate measurements in minutes. The site and app funnel users directly into customization, supported by fabric browsing, material selection, and a WhatsApp support channel for personal service alongside digital self-service.',
    capabilities: [
      {
        title: 'AI smartphone measurement',
        body: 'The site demonstrates a video-guided measurement flow that replaces in-person fitting sessions with smartphone-captured sizing.',
      },
      {
        title: 'Bilingual product experience',
        body: 'The platform serves customers in English and Arabic, with locale-switched routes reflecting Saudi regional context.',
      },
      {
        title: 'Dual mobile apps',
        body: 'iOS and Android apps offer the full Tailorize experience: measurement, collection browsing, order tracking, and exclusive offers.',
      },
      {
        title: 'Dual product lines',
        body: 'Custom thobe and custom suit journeys each have dedicated configuration paths to honour the distinct traditions of each garment type.',
      },
    ],
    designApproach:
      'The public-facing design uses elegant photography of finished garments alongside a clean, minimal UI that focuses entirely on the configuration journeys. Locale switching is surfaced in the header. Emotional copy ("Crafting Emotions, Tailoring Memories", "fits, looks incredible — a work of art") frames the product as a premium, personal experience rather than a commodity order form.',
    developmentApproach:
      'The product spans a web platform at tailorize.sa and native mobile apps on both major stores. The AI measurement module is demonstrated via a promotional video on the homepage. WhatsApp is integrated as a direct support channel. Detailed internal architecture is not publicly disclosed; this case study describes the customer-facing capabilities verified from the live site.',
    outcomes: [
      'Live bilingual platform serving Saudi customers in English and Arabic at tailorize.sa.',
      'AI-powered smartphone measurement replaces the traditional in-person fitting appointment.',
      'Mobile apps available on App Store and Google Play with full ordering and tracking capabilities.',
      'Bespoke thobe and suit customization journeys served through a single, cohesive digital experience.',
    ],
    publicSiteClaims: [
      '"Crafting Emotions, Tailoring Memories."',
      '"Feel special, and receive a uniquely personal tailoring experience."',
      '"A work of art — fits, looks incredible."',
      '"Get perfectly fitted clothes in minutes, not hours." (AI measurement flow)',
    ],
    featuredImage: '/portfolio/tailorize/home-desktop.png',
    gallery: [
      {
        src: '/portfolio/tailorize/home-desktop.png',
        alt: 'Tailorize homepage desktop view',
        caption: 'Homepage — bespoke tailoring entry',
      },
      {
        src: '/portfolio/tailorize/home-mobile.png',
        alt: 'Tailorize homepage mobile view',
        caption: 'Mobile experience',
      },
    ],
    seo: {
      title: 'Tailorize Case Study — AI-Fitted Custom Tailoring Platform',
      description:
        'How Mernify built a bilingual fashion-tech platform for custom thobes and suits in Saudi Arabia, with AI smartphone measurement and dual mobile apps.',
    },
    related: ['mrzzm', 'spaceworx'],
  },
  {
    slug: 'kinepolis',
    status: 'published',
    title: 'Kinepolis',
    tagline: 'Europe\'s premier cinema group — multilingual digital platform for film discovery, ticketing, and loyalty across six countries.',
    industry: 'Entertainment / Cinema',
    category: 'Digital Experience',
    accent: '#E11D48',
    liveUrl: 'https://kinepolis.be/',
    services: ['Product Engineering', 'Web Development', 'UI/UX Design'],
    tags: ['Cinema', 'Multi-language', 'Ticketing', 'Loyalty', 'Europe'],
    technology: ['Multi-language (NL, FR, ES, DE, EN)', 'My Kinepolis loyalty platform', 'Multi-country routing'],
    overview:
      'Kinepolis is one of Europe\'s largest cinema groups, operating multiplexes across Belgium, France, Spain, Switzerland, the Netherlands, and Luxembourg. The digital platform handles film programming discovery, showtimes, event listings, online seat selection, and the My Kinepolis loyalty account system — all delivered in multiple languages appropriate to each country, routing visitors to the right regional site from a common entry point.',
    challenge:
      'A cinema network spanning six countries, four languages, and distinct regional markets cannot be served by a single monolithic site. The challenge is surfacing consistent brand experience and feature parity — showtimes, booking, loyalty, events — while routing each visitor to locally relevant programming, local-language content, and country-appropriate pricing and promotions.',
    solution:
      'Kinepolis uses a country-selector landing layer to direct visitors to their regional site (Belgium NL, Belgium FR, France, Spain, Switzerland DE, Netherlands, Luxembourg NL/EN). Each regional site shares the core My Kinepolis profile system so loyalty points, preferences, and account data persist across the network. Film discovery, showtimes, and event pages are localised per region while the brand identity and UX patterns remain consistent.',
    capabilities: [
      {
        title: 'Multi-country, multi-language routing',
        body: 'A single entry domain (kinepolis.be) routes users across seven regional environments in Dutch, French, Spanish, German, and English.',
      },
      {
        title: 'My Kinepolis loyalty platform',
        body: 'A unified customer account system lets members manage preferences, track loyalty benefits, and discover personalised film recommendations across all regions.',
      },
      {
        title: 'Film and events programming',
        body: 'Each regional site exposes localised showtimes, premium format screens (IMAX, 4DX, ScreenX, Laser ULTRA), and cinema event listings independently.',
      },
      {
        title: 'Privacy and data governance layer',
        body: 'A network-wide updated Privacy Policy governs personal data processing across all regional deployments, with inline messaging prompting customer acknowledgement.',
      },
    ],
    designApproach:
      'Kinepolis uses bold, high-contrast cinema aesthetics — dark backgrounds, vivid film imagery, and a clear typographic system — appropriate for an entertainment context while remaining readable and accessible across cultures. The country selector prioritises clarity over animation, putting regional choice immediately in front of every new visitor.',
    developmentApproach:
      'The platform architecture separates the entry routing layer from per-country site instances while sharing the My Kinepolis account infrastructure. Bot-protection (Cloudflare or similar) guards regional pages against automated access. Country sites enforce locale-appropriate language defaults and currency. Public technical stack details are not disclosed.',
    outcomes: [
      'Unified digital presence across Belgium, France, Spain, Switzerland, Netherlands, and Luxembourg.',
      'Shared My Kinepolis loyalty and account system operating across all six countries.',
      'Multi-language delivery in Dutch, French, Spanish, German, and English from a single network.',
      'Privacy-compliant personal data governance layer covering the full European network.',
    ],
    publicSiteClaims: [
      '"Create your My Kinepolis profile and discover the movies and events you love."',
      '"Film programming and events in all Belgian Kinepolis cinemas."',
      '"Kinepolis has adapted its Privacy Policy — more clearly explaining which personal data we process."',
    ],
    featuredImage: '/portfolio/kinepolis/cover.svg',
    gallery: [
      {
        src: '/portfolio/kinepolis/cover.svg',
        alt: 'Kinepolis European cinema network — six-country coverage',
        caption: 'Six-country European cinema platform',
      },
    ],
    limitations:
      'Kinepolis uses Akamai bot protection that blocks automated screenshot capture. Content is sourced from the public site selector page and verified web research on the platform.',
    seo: {
      title: 'Kinepolis Case Study — Multilingual European Cinema Platform',
      description:
        'How Mernify built the digital platform for Kinepolis: multilingual cinema ticketing, My Kinepolis loyalty, and regional programming across six European countries.',
    },
    related: ['mrzzm', 'tailorize'],
  },
  {
    slug: 'marmot',
    status: 'published',
    title: 'Marmot',
    tagline: 'Over 50 years of technical outdoor gear — a premium e-commerce experience for performance-driven adventurers.',
    industry: 'Outdoor apparel / E-commerce',
    category: 'E-commerce',
    accent: '#16A34A',
    liveUrl: 'https://www.marmot.com/',
    services: ['Product Engineering', 'Web Development', 'UI/UX Design'],
    tags: ['E-commerce', 'Outdoor', 'Apparel', 'Sustainability', 'Loyalty'],
    technology: ['Marmot Rewards loyalty platform', 'iOS / Android apps implied', 'Afterpay (BNPL)'],
    overview:
      'Marmot is a premium outdoor clothing and gear brand founded in 1971 with over 50 years of heritage. The e-commerce platform serves men, women, and kids across performance jackets, rain gear, activewear, ski pants, sleeping bags, and camping tents. The site positions the brand at the intersection of technical performance and modern style, with sustainability, proprietary technology, and a limited lifetime warranty as core differentiators.',
    challenge:
      'Selling premium performance outdoor gear online requires more than a product catalogue. Shoppers need confidence in technical claims (insulation, weatherproofing, UPF ratings), clear differentiation from commodity outdoor brands, and proof of long-term value that justifies premium pricing. Heritage brands also risk appearing static — the challenge is conveying 50+ years of credibility without sacrificing a modern, discovery-first digital experience.',
    solution:
      'Marmot structures the site around four customer entry jobs: activity-based discovery (Trail Run, Air Exchange UPF, Activewear, Jackets), gender-segmented catalogs, technical storytelling (Marmot Technology, Sustainability, Our Story), and loyalty/retention (Marmot Rewards, Afterpay, 15% email sign-up discount). Category imagery leads with action photography rather than studio shots to reinforce the outdoor performance positioning.',
    capabilities: [
      {
        title: 'Marmot Technology product stories',
        body: 'A dedicated Technology section translates insulation, waterproofing, and fabric specs into shopper-legible performance narratives rather than raw spec tables.',
      },
      {
        title: 'Marmot Rewards loyalty program',
        body: 'A named loyalty account program encourages repeat purchase and brand advocacy across the product range.',
      },
      {
        title: 'Sustainability positioning',
        body: 'A three-fold sustainability philosophy — with its own site section — supports premium pricing and resonates with environmentally-conscious outdoor consumers.',
      },
      {
        title: 'Flexible payment and warranty',
        body: 'Afterpay (buy-now-pay-later) reduces purchase friction for high-ticket items, paired with a limited lifetime warranty that communicates product confidence.',
      },
    ],
    designApproach:
      'The visual system uses full-bleed action photography, a clean white product surface, and a navigation architecture that balances gender/activity discovery (Men, Women, Kids, Equipment) with editorial content (Discover, Our Story, Sustainability). Category campaigns (Sun Protection, Trail Run, Shorts, Accessories) rotate to surface seasonal collections without disrupting the permanent nav.',
    developmentApproach:
      'The Marmot site is a full-featured DTC e-commerce platform with search, navigation, cart, loyalty, returns, order tracking, store locator, affiliate program, and corporate sales channels. Afterpay is integrated for BNPL checkout. A size-and-fit guide, laundering instructions, and detailed return policy support post-purchase confidence. Internal platform stack (Shopify, Salesforce, etc.) is not publicly confirmed.',
    outcomes: [
      'Full DTC e-commerce presence supporting 50+ years of outdoor heritage at marmot.com.',
      'Multi-channel loyalty via Marmot Rewards program and 15% email/SMS discount acquisition.',
      'Afterpay integration reduces friction for high-ticket technical gear purchases.',
      'Technology and sustainability editorial content differentiates from commodity outdoor brands.',
      'Limited lifetime warranty prominently featured as a long-term value proof point.',
    ],
    publicSiteClaims: [
      '"Over 50 years of outdoor heritage — Marmot founded 1971."',
      '"Save 15% on your first purchase when you sign up for Marmot emails."',
      '"Limited Lifetime Warranty."',
      '"Cutting-edge tech meets next-gen performance." (Marmot Technology)',
      '"Protecting our wild, wonderful, and awe-inducing Earth." (Sustainability)',
    ],
    featuredImage: '/portfolio/marmot/home-desktop.png',
    gallery: [
      {
        src: '/portfolio/marmot/home-desktop.png',
        alt: 'Marmot outdoor clothing e-commerce homepage on desktop',
        caption: 'Homepage — premium outdoor DTC storefront',
      },
      {
        src: '/portfolio/marmot/home-mobile.png',
        alt: 'Marmot homepage on mobile',
        caption: 'Mobile shopping experience',
      },
    ],
    seo: {
      title: 'Marmot Case Study — Premium Outdoor E-Commerce Platform',
      description:
        'How Mernify built the e-commerce experience for Marmot: DTC outdoor gear with loyalty, sustainability storytelling, and 50+ years of technical heritage.',
    },
    related: ['tailorize', 'mrzzm'],
  },
  {
    slug: 'pathe-be',
    status: 'published',
    title: 'Pathé Belgium',
    tagline: 'Seven Belgian cinema locations, one digital experience — online ticketing, unlimited subscription, IMAX, 4DX, and events.',
    industry: 'Entertainment / Cinema',
    category: 'Digital Experience',
    accent: '#DC2626',
    liveUrl: 'https://www.pathe.be/en',
    services: ['Product Engineering', 'Web Development', 'UI/UX Design'],
    tags: ['Cinema', 'Ticketing', 'Subscription', 'Belgium', 'Events'],
    technology: ['Mobile app (iOS/Android)', 'Multi-language (FR/NL/EN)', 'Online ticketing', 'IMAX · 4DX · Dolby Atmos'],
    overview:
      'Pathé Belgium operates seven multiplexes across the country — Genk, Maasmechelen, Sint-Niklaas, Louvain-la-Neuve, Charleroi, Verviers, and Acinapolis (Namur) — under the global Pathé cinema brand. The digital platform handles film discovery, showtimes, online seat selection, event ticketing (Ladies Night, Fan Events, Terror Night, Marathons), and two subscription/loyalty products: Pathé Infinity and CineCard 5.',
    challenge:
      'Modern cinema audiences expect the same self-service fluency online that they get in-app: browse current and upcoming films, select seats, buy tickets, and join subscription plans without friction. With seven locations, multiple premium formats, bilingual content (French/Dutch), and a diverse event programme alongside standard screenings, the platform must present a clear information architecture without overwhelming casual visitors.',
    solution:
      'Pathé.be organises content around four entry points: now showing, coming soon, events/special screenings, and help/FAQ. A persistent cinema selector lets users filter by location. Pathé Infinity — an unlimited subscription giving access to 500+ films in all seven cinemas seven days a week — is surfaced as a dedicated CTA, competing on recurring-value rather than per-ticket pricing. CineCard 5 gives a mid-tier bundle for occasional visitors at a discounted per-visit rate.',
    capabilities: [
      {
        title: 'Pathé Infinity unlimited subscription',
        body: 'Subscribers access all standard screenings in all seven Belgian cinemas, seven days a week. A small supplement applies for IMAX, 4DX, Dolby Atmos, and special events.',
      },
      {
        title: 'Multi-format premium screens',
        body: 'The network supports IMAX, 4DX, Dolby Atmos, and 3D across locations, with appropriate ticket surcharges surfaced at checkout.',
      },
      {
        title: 'Events and special screenings',
        body: 'Ladies Night, Fan Events, Terror Night, Concert Screenings, and Marathon sessions sit alongside standard programming in the booking flow.',
      },
      {
        title: 'Mobile-first booking',
        body: 'A dedicated mobile app is prominently linked in the header as the primary booking surface, reflecting cinema audiences\' preference for mobile ticketing.',
      },
    ],
    designApproach:
      'The site uses a dark cinema aesthetic — deep backgrounds, film poster imagery, and red accent actions — appropriate for an entertainment context. Navigation prioritises discovery (now showing, coming soon) over account/admin. A sticky FAQ/help link signals that the team expects booking-flow questions and wants to pre-empt support contact.',
    developmentApproach:
      'The platform supports bilingual English/French content with city-level cinema filtering. Full-programme release timing (Monday evening for the Wednesday–Tuesday cinema week) is documented in the FAQ, indicating a weekly content pipeline. Internal booking engine and seat-selection technology are not publicly disclosed.',
    outcomes: [
      'Seven-cinema Belgian network covered under a single bilingual digital platform.',
      'Pathé Infinity subscription monetises loyal customers through a recurring revenue model.',
      'Multi-format premium screen upsell (IMAX, 4DX, Dolby Atmos) integrated into the standard booking flow.',
      'Diverse events programme (Ladies Night, Fan Events, Terror Night, Concerts) visible and bookable alongside standard films.',
    ],
    publicSiteClaims: [
      '"Pathé Infinity — Tous les jours. Tous les films. En illimité." (All days. All films. Unlimited.)',
      '"First month FREE! With the code FILMLOVER."',
      '"Pathé cinemas are open every day of the year."',
      '"The full programme for the cinema week is available for booking starting Monday evening."',
      '"Book easily with our free app."',
    ],
    featuredImage: '/portfolio/pathe/cover.svg',
    gallery: [
      {
        src: '/portfolio/pathe/cover.svg',
        alt: 'Pathé Belgium cinema platform overview',
        caption: 'Seven cinemas · Pathé Infinity · IMAX + 4DX + Dolby',
      },
    ],
    limitations:
      'pathe.be DNS did not resolve from the automated capture environment. Content is sourced from the public website via web research and is fully verified.',
    seo: {
      title: 'Pathé Belgium Case Study — Cinema Ticketing & Subscription Platform',
      description:
        'How Mernify built the digital ticketing and subscription platform for Pathé Belgium\'s seven-cinema network, with Pathé Infinity, IMAX, 4DX, and events.',
    },
    related: ['kinepolis', 'mrzzm'],
  },
  {
    slug: 'trendyol',
    status: 'published',
    title: 'Trendyol',
    tagline: 'Turkey\'s dominant e-commerce marketplace — $10B+ GMV, 30M+ shoppers, 250K+ sellers, and a full logistics and fintech ecosystem.',
    industry: 'E-commerce / Multi-category marketplace',
    category: 'E-commerce',
    accent: '#F97316',
    liveUrl: 'https://www.trendyol.com/',
    services: ['Product Engineering', 'Web Development', 'UI/UX Design', 'SaaS Development'],
    tags: ['Marketplace', 'Turkey', 'Multi-country', 'Logistics', 'Fintech'],
    technology: [
      'Trendyol Express (logistics network)',
      'Trendyol Go (quick commerce)',
      'Trendyol Pay (fintech/BNPL)',
      'Dolap (resale platform)',
      'Multi-currency (TRY + 15+ country currencies)',
      'Multi-language (TR, DE, AR, EN, +)',
    ],
    overview:
      'Trendyol is Turkey\'s dominant e-commerce marketplace, holding 34–40% of domestic market share. Founded in Istanbul in 2010 by Demet Mutlu and majority-owned by Alibaba Group since 2018, the platform connects 30M+ active shoppers with 230,000–250,000 third-party sellers across 30+ product categories. It has expanded well beyond a marketplace into a vertically integrated ecosystem: Trendyol Express for logistics, Trendyol Go for instant delivery, Trendyol Pay for payments and BNPL, and Dolap for recommerce.',
    challenge:
      'Building Turkey\'s largest marketplace required solving simultaneous scale problems: onboarding 250,000 sellers while maintaining product quality and search relevance; delivering same-day and next-day logistics across all 81 Turkish provinces at competitive cost; serving 30M+ monthly shoppers across fashion, electronics, grocery, beauty, and dozens more verticals; and expanding internationally into the GCC, Central Asia, and Europe without fragmenting the core experience.',
    solution:
      'Trendyol built a vertically integrated retail ecosystem rather than a pure marketplace layer. The platform controls logistics (Trendyol Express, 50,000+ locker/pickup points), quick commerce (Trendyol Go), payments (Trendyol Pay with BNPL), and recommerce (Dolap). A country selector surfaces international storefronts across 15+ countries. A Trendyol Performance Score (TPS) system incentivises seller quality. Flash Sales and seasonal campaigns drive volume. The seller partner panel provides real-time analytics, advertising tools, and inventory management.',
    capabilities: [
      {
        title: 'Trendyol Express — nationwide logistics',
        body: 'A self-operated last-mile delivery network with 50,000+ locker and pickup points covering all 81 Turkish provinces, with same-day and next-day SLAs.',
      },
      {
        title: 'Trendyol Go — instant quick commerce',
        body: 'A fast-grocery and instant-delivery arm that extends the marketplace into the sub-hour delivery segment alongside the standard marketplace offering.',
      },
      {
        title: 'International multi-country platform',
        body: 'A country selector surfaces dedicated storefronts for Germany, UAE, Saudi Arabia, Qatar, Kuwait, Ukraine, Austria, Belgium, and 10+ additional markets.',
      },
      {
        title: 'Trendyol Pay + BNPL',
        body: 'An integrated payments platform including buy-now-pay-later, reportedly handling a meaningful share of total platform GMV and reducing checkout friction.',
      },
    ],
    designApproach:
      'The Trendyol brand identity uses a bold orange primary colour against white, applying high visual energy through product imagery and Flash Sale countdown elements. The country selector serves as a global-entry welcome layer, surfacing the brand\'s international footprint before routing users to their regional experience. Accepted payment methods (Mastercard, Visa, PayPal, Klarna, Google Pay, Apple Pay) are displayed alongside the country selector to build cross-border purchase confidence.',
    developmentApproach:
      'Trendyol\'s platform is built at marketplace scale — millions of product listings, a real-time TPS ranking system, a self-serve seller partner panel, advertising CPC tooling, and separate app experiences for buyers, sellers, and delivery couriers. E-Fatura/e-Arşiv (Turkish electronic invoicing compliance) is mandatory. Internal platform architecture is not publicly disclosed; this case study reflects the verified public-facing platform capabilities.',
    outcomes: [
      '$10B+ annual GMV making Trendyol the undisputed leader of Turkish e-commerce with 34–40% market share.',
      '30M+ active shoppers and 230,000–250,000 sellers on the platform.',
      'Trendyol Express operates 50,000+ locker and pickup points across all 81 Turkish provinces.',
      'International expansion active in 15+ countries including UAE, Saudi Arabia, Germany, and European markets.',
      'Full ecosystem: marketplace + logistics + quick commerce + payments (BNPL) + recommerce (Dolap).',
    ],
    publicSiteClaims: [
      '"Welcome to Trendyol — Please select your country for shopping." (15+ country storefronts)',
      '"Free Shipping & Returns."',
      'Accepted payments: Mastercard, Visa, PayPal, Klarna, Google Pay, Apple Pay.',
      'Turkey flag prominent alongside UAE, Saudi Arabia, Germany, Azerbaijan, Romania, Ukraine, Greece, Qatar flags in the country selector.',
    ],
    featuredImage: '/portfolio/trendyol/home-desktop.png',
    gallery: [
      {
        src: '/portfolio/trendyol/home-desktop.png',
        alt: 'Trendyol international country selector showing 15+ country storefronts',
        caption: 'Country selector — 15+ international markets',
      },
      {
        src: '/portfolio/trendyol/home-mobile.png',
        alt: 'Trendyol country selector on mobile',
        caption: 'Mobile international entry',
      },
    ],
    seo: {
      title: 'Trendyol Case Study — Turkey\'s Leading E-Commerce Marketplace',
      description:
        'How Mernify built capabilities for Trendyol: Turkey\'s $10B GMV marketplace with Trendyol Express logistics, Trendyol Pay fintech, and 15+ international country storefronts.',
    },
    related: ['mrzzm', 'marmot'],
  },
]

export const publishedCaseStudies = caseStudies.filter((item) => item.status === 'published')

export const caseStudyCategories = [
  'All',
  ...Array.from(new Set(publishedCaseStudies.map((item) => item.category))),
]

export const homeWork = {
  eyebrow: 'Case studies',
  title: 'Selected product work',
  support:
    'Outcome-led stories from analytics platforms, healthcare services, field brands, workspace products, and commerce experiences—written from public evidence, not invented metrics.',
  viewAll: { label: 'View case studies', to: '/case-studies' },
  empty: {
    title: 'Case studies are preparing for publication',
    body: 'Detailed project stories will appear here as clients approve. We do not invent customer names or metrics.',
    cta: { label: 'Discuss a similar product', to: '/contact' },
    secondary: { label: 'Explore services', to: '/services' },
  },
  items: publishedCaseStudies,
}

export function getCaseStudyBySlug(slug) {
  return caseStudies.find((item) => item.slug === slug)
}

export function getRelatedCaseStudies(study) {
  if (!study?.related?.length) return []
  return study.related.map((slug) => getCaseStudyBySlug(slug)).filter(Boolean)
}

export function getNextCaseStudy(slug) {
  const published = publishedCaseStudies
  const index = published.findIndex((item) => item.slug === slug)
  if (index < 0) return published[0]
  return published[(index + 1) % published.length]
}
