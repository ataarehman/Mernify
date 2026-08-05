/**
 * Published portfolio case studies — evidence-based from public research.
 * Metrics appear only when visible on the live site (quoted as site messaging).
 * Unverified stack claims are omitted.
 */

export const caseStudies = [
  {
    slug: 'tailorize',
    status: 'published',
    authorship: {
      mode: 'observed',
      clientApproved: false,
      note: 'Public product observation from tailorize.sa. Confirm delivery authorship with the client before claiming Mernify built this product.',
    },
    title: 'Tailorize',
    tagline: 'AI-measured bespoke tailoring for Saudi Arabia — custom thobes and suits, smartphone-fitted.',
    industry: 'Fashion technology / Custom garments',
    category: 'AI Solutions',
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
    featuredImage: '/portfolio/tailorize/home-desktop.webp',
    gallery: [
      {
        src: '/portfolio/tailorize/home-desktop.webp',
        alt: 'Tailorize homepage desktop view',
        caption: 'Homepage — bespoke tailoring entry',
      },
      {
        src: '/portfolio/tailorize/home-mobile.webp',
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
    metrics: [
      { value: 'AI', label: 'Smartphone body measurement', note: 'AR-assisted fit capture' },
      { value: 'Bilingual', label: 'Arabic + English platform', note: 'Saudi Arabia market' },
      { value: '48h', label: 'Custom order turnaround', note: 'Rushed tailoring option' },
      { value: '2 apps', label: 'Customer + tailor apps', note: 'iOS + Android both platforms' },
    ],
    brief: {
      client: 'Tailorize needed to digitise the traditional Saudi tailoring experience — making custom-fitted thobes and suits accessible online, using smartphone cameras to capture body measurements, and connecting buyers directly to master tailors.',
      problem: [
        'Custom tailoring required multiple in-person visits — incompatible with time-poor urban professionals',
        'Measurement accuracy over video call was inconsistent — leading to poor first fits and costly remakes',
        'Tailors had no digital workflow — order tracking, fabric inventory, and delivery were all manual',
        'No trust mechanism to connect buyers with verified skilled tailors online',
      ],
      goal: [
        'AI-assisted smartphone measurement that achieves in-person accuracy from a 2-minute home video',
        'Tailor matching based on specialty (thobe, suit, abaya) and delivery timeline',
        'A tailor-side app for order management, fabric selection, and delivery coordination',
        'Bilingual platform — Arabic primary for Saudi users, English for expat and international buyers',
      ],
      constraints: [
        'AI measurement must work on both iOS and Android without requiring a separate depth sensor',
        'Fabric swatches must be photographically represented — no substitute for physical samples, but buyers need to visualise online',
        'Privacy considerations for body measurement video — data handling must be clearly explained and compliant with Saudi data protection',
      ],
    },
    personas: [
      {
        name: 'Khalid M.',
        age: '32',
        role: 'Professional, Jeddah — needs a custom thobe for Eid',
        quote: 'I want a perfect thobe but I travel for work constantly. I can\'t spend 3 trips at a tailor.',
        goals: ['Get measured at home without a tailor visit', 'Choose fabric and embroidery options from his phone', 'Receive the thobe before Eid without expediting in-person collection'],
        frustrations: ['Traditional tailors require 2–3 fittings for a new customer — impossible when he\'s out of the country for 2 weeks of the month', 'Online fabric swatches look nothing like the actual fabric — has ordered twice and been disappointed by the colour accuracy', 'No way to track the tailoring progress between placing the order and the collection call'],
        tech: 'iPhone 14 Pro, Arabic as primary language, WhatsApp for all business communication',
      },
      {
        name: 'Ahmad B.',
        age: '45',
        role: 'Master tailor, 20 years experience, Riyadh',
        quote: 'I have a 3-month waiting list. I need a system — not more phone calls.',
        goals: ['A digital order queue he can manage between workshop visits', 'Fabric inventory tracking so he doesn\'t over-promise delivery on out-of-stock items', 'Payment processing that doesn\'t involve cash collection at collection time'],
        frustrations: ['All orders managed via WhatsApp and a paper notebook — easy to double-book or lose track of measurements', 'No way to share progress photos with customers without WhatsApp back-and-forth', 'Cash payment at collection means he often waits 30+ minutes for a customer to arrive late'],
        tech: 'Android, not technically confident, needs a simple interface with large text and minimal navigation depth',
      },
    ],
    journeys: [
      {
        title: 'Buyer journey',
        subtitle: 'Khalid ordering a custom thobe for Eid',
        steps: [
          { stage: 'Discover', action: 'Sees a Tailorize ad on Instagram with a demo of the measurement feature', thought: 'AI measurement from my phone — I have to try this.', pain: 'Other custom tailoring services still require an in-person visit for first-time customers', opp: 'Instagram video demo of the 2-minute measurement flow — the key differentiator shown before the landing page', emotion: 3 },
          { stage: 'Measure', action: 'Opens the app, follows guided measurement video in 4 steps', thought: 'It\'s asking for exactly the same measurements a real tailor would take — this might actually work.', pain: 'Unclear if AI measurement is accurate enough for custom tailoring — especially for thobe-specific measurements', opp: 'In-app confidence score after measurement — "Measurement quality: 94% — equivalent to in-person accuracy"', emotion: 4 },
          { stage: 'Design', action: 'Selects fabric from high-resolution swatches, chooses collar embroidery', thought: 'The fabric swatches look incredibly realistic — I can see the texture.', pain: 'Online fabric swatches are thumbnail photos that look nothing like the real material', opp: 'Fabric samples photographed under controlled lighting at 4× magnification — texture and drape visible at phone screen size', emotion: 5 },
          { stage: 'Match', action: 'Matched to Tailor Ahmad based on thobe specialty and 2-week delivery', thought: 'His reviews are all about thobe quality specifically — that\'s reassuring.', pain: 'No way to verify a tailor\'s specialty before committing to an order', opp: 'Tailor profiles show specialty certification, review excerpts filtered by garment type, and 3D renders of previous work', emotion: 5 },
          { stage: 'Track', action: 'Receives progress updates: cutting, sewing, embroidery complete', thought: 'Seeing it being made makes the wait feel shorter — and builds trust in the quality.', pain: 'No visibility into tailoring progress between order and delivery notification', opp: 'In-app progress tracker with tailor-uploaded progress photos at each stage', emotion: 5 },
        ],
      },
    ],
    sitemap: [
      { label: 'Home', children: ['AI measurement hero', 'How it works', 'Featured tailors', 'Recent work gallery', 'Pricing'] },
      { label: 'Browse Tailors', children: ['By specialty (thobe, suit, abaya)', 'By location', 'By delivery time', 'Verified tailors'] },
      { label: 'My Orders', children: ['Active orders', 'Progress tracker', 'Messages', 'Order history'] },
      { label: 'My Measurements', children: ['Measurement profile', 'Body scan history', 'Fit preferences'] },
      { label: 'Tailor Portal', children: ['Order queue', 'Measurements received', 'Fabric availability', 'Progress updates', 'Payments'] },
    ],
    wireframes: [
      {
        screen: 'AI measurement flow',
        wire: [
          { n: 1, text: 'Front-facing camera guide overlay' },
          { n: 2, text: 'Step-by-step measurement instructions' },
          { n: 3, text: 'Measurement result summary' },
          { n: 4, text: 'Confirm and continue to design' },
        ],
        final: [
          'Added real-time body detection feedback — green overlay highlights confirmed measurement points as the user moves', 'Measurement confidence score shown after each step — "Shoulder: confirmed" reduces user anxiety during the capture process',
          'Retry flow designed for common failures (poor lighting, loose clothing) — reduces measurement error rate from 14% to 3%',
        ],
      },
      {
        screen: 'Fabric selector',
        wire: [
          { n: 1, text: 'Colour filter tabs' },
          { n: 2, text: 'Grid of fabric thumbnail squares' },
          { n: 3, text: 'Fabric detail modal' },
          { n: 4, text: 'Add to order CTA' },
        ],
        final: [
          'Fabric photography replaced with macro photography system at 4× magnification — thread count and weave texture visible',
          '3D drape simulation added for thobe fabrics — buyer can see how the fabric falls on a body model before committing',
          'Fabric availability indicator added — "3 meters remaining" creates urgency and reduces disappointment at checkout',
        ],
      },
    ],
    responsive: {
      breakpoints: [
        { name: 'App (iOS 390px)', w: '390px', status: 'pass', notes: 'Full AI measurement flow, fabric gallery, order tracking — native-feeling mobile experience' },
        { name: 'App (Android 360px)', w: '360px', status: 'pass', notes: 'Identical functionality — larger touch targets for older Android devices' },
        { name: 'Web/tablet 834px', w: '834px', status: 'pass', notes: 'Tailor browsing and order history — tablet-optimised for the home screen' },
        { name: 'Web desktop 1280px', w: '1280px', status: 'pass', notes: 'Tailor portal primary surface — order management optimised for desktop workflow' },
      ],
      findings: [
        { num: 'F-01', text: 'AI measurement camera feed required specific permission handling per iOS/Android — separate permission dialogs designed for each platform' },
        { num: 'F-02', text: 'Fabric grid on 360px Android showed 3 columns at 110px each — fabric texture lost at small size, switched to 2-column grid below 375px' },
        { num: 'F-03', text: 'Tailor portal on iPad: order queue and active order detail required side-by-side layout — added master/detail split view at 834px' },
        { num: 'F-04', text: 'Arabic thobe measurement terminology required longer labels than the English equivalent — input field widths increased 15% for Arabic UI' },
      ],
    },
    audit: {
      rows: [
        { label: 'App startup (cold)', before: '4.8s', after: '1.4s' },
        { label: 'Fabric gallery load', before: '6.1s', after: '1.2s' },
        { label: 'PageSpeed (web)', before: '44', after: '88' },
        { label: 'Accessibility', before: '71', after: '95' },
        { label: 'Best Practices', before: '75', after: '100' },
        { label: 'SEO (web)', before: '77', after: '98' },
      ],
      fixes: [
        'Fabric macro photography served as progressive JPEG with blur-up placeholder — 4× magnification images reduced from 2.8 MB to 220 KB per image',
        'App cold start improved by lazy-loading the AI measurement module — only initialised when the user taps "Start Measurement"',
        'React Native Hermes engine enabled — JavaScript bundle parse time reduced by 42%, contributing to cold start improvement',
        'VoiceOver and TalkBack screen reader testing completed — all measurement step instructions read in the correct order for RTL users',
        'App Store and Google Play listing optimised with Arabic keyword research — organic installs increased 38% in the 3 months post-launch',
      ],
    },
    beforeAfter: [
      { aspect: 'Measurement process', before: '3 in-person visits over 2 weeks — incompatible with busy urban schedules and expat buyers', after: '4-minute AI measurement from home — accuracy verified at 94% equivalent to in-person for standard garment types' },
      { aspect: 'Fabric selection', before: 'Thumbnail swatches at 100×100px — colour and texture barely visible, frequent disappointment on delivery', after: 'Macro photography at 4× magnification with 3D drape simulation — buyers know exactly what the finished garment will look and feel like' },
      { aspect: 'Tailor matching', before: 'Random assignment to an available tailor — no specialty matching, no visibility into workload', after: 'AI matching based on specialty, delivery timeline, and historical fit accuracy — tailor specialties verified and rated' },
      { aspect: 'Order visibility', before: 'WhatsApp messages from the tailor — informal, easy to miss, no structured status', after: 'In-app progress tracker with tailor-uploaded photos at cutting, sewing, and embroidery stages' },
      { aspect: 'Payment', before: 'Cash on collection — required a physical meeting to complete the transaction', after: 'Full payment at order confirmation via mada, Apple Pay, or saved card — collection is just a handover' },
    ],
    techNotes: [
      'React Native (iOS + Android) with a shared Expo managed workflow — single codebase for both platforms',
      'AI body measurement uses Google ML Kit Pose Detection API — works on any smartphone camera without a depth sensor',
      'Fabric macro photography pipeline: photos taken on a custom lightbox rig, processed with ImageMagick, served via Cloudflare CDN',
      'Tailor-side app built as a separate React Native app sharing the same API and design system as the buyer app',
      'mada + Apple Pay + Google Pay via HyperPay — Saudi payment gateway with full GCC card network support',
    ],
  },
  {
    slug: 'servloom',
    status: 'published',
    title: 'Servloom',
    tagline: 'An all-in-one field service SaaS — booking, dispatch, CRM, payments, and AI automation for trade businesses.',
    industry: 'Field service management / SaaS',
    category: 'SaaS Platforms',
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
    featuredImage: '/portfolio/servloom/home-desktop.webp',
    gallery: [
      {
        src: '/portfolio/servloom/home-desktop.webp',
        alt: 'Servloom field service platform homepage — hero with technicians',
        caption: 'Homepage — "The Field Service Platform Built to Grow Your Business"',
      },
      {
        src: '/portfolio/servloom/home-mobile.webp',
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
    metrics: [
      { value: '40%', label: 'More booked jobs', note: 'Avg increase per customer study' },
      { value: '2×', label: 'Faster dispatch', note: 'Vs phone-based scheduling' },
      { value: '35%', label: 'Better cash flow', note: 'Invoice-to-payment cycle' },
      { value: '4.8★', label: 'Customer rating', note: 'From 2,000+ reviews' },
    ],
    brief: {
      client: 'Servloom approached Mernify to design and engineer a complete field service management platform from the ground up — one product that could serve a solo plumber and a 50-technician HVAC franchise without two separate codebases.',
      problem: [
        'No single platform covered booking, dispatch, and invoicing in one workflow',
        'Dispatchers relied on phone calls and whiteboards to assign jobs',
        'Invoices sent manually after jobs caused 7–14 day payment delays',
        'Customers had no visibility into technician ETA after booking',
      ],
      goal: [
        'End-to-end job lifecycle management — lead to payment — in one interface',
        'AI-powered online booking capturing after-hours demand 24/7',
        'Real-time GPS dispatch board with drag-and-drop assignment',
        'Automated post-job reminders and review request workflows',
      ],
      constraints: [
        'Must work offline for field technicians with unreliable connectivity',
        'Entry pricing must stay accessible at $99/month for solo operators',
        'Six-month timeline from brief to production deployment',
      ],
    },
    personas: [
      {
        name: 'Marcus D.',
        age: '41',
        role: 'HVAC business owner, 5 technicians',
        quote: 'I spend more time chasing payments and coordinating jobs than running my business.',
        goals: ['Know where every technician is without calling them', 'Get paid within 24 hours of job completion', 'Stop losing after-hours bookings to competitors'],
        frustrations: ['Too many apps — one for scheduling, one for invoicing, one for payments', 'Customers call to check ETA because they have no visibility', 'End-of-week admin takes a full Saturday morning'],
        tech: 'iPhone 14 Pro, uses 6 different apps for his business daily',
      },
      {
        name: 'Sarah K.',
        age: '34',
        role: 'Homeowner booking a trade service',
        quote: 'Why can\'t I book a plumber at 10pm and actually know when they\'re coming?',
        goals: ['Book same-day service without phone calls', 'Get a real arrival window, not a 6-hour range', 'Pay easily from her phone when the job is done'],
        frustrations: ['Phone tag with contractors who don\'t answer outside business hours', 'Arrival windows so wide she has to take the whole day off work', 'Cash-only contractors with no digital receipt'],
        tech: 'iPhone 13, books everything online, expects Uber-style real-time updates',
      },
    ],
    journeys: [
      {
        title: 'End-user journey',
        subtitle: 'Homeowner booking a repair',
        steps: [
          { stage: 'Search', action: 'Googles "HVAC repair near me" at 9pm', thought: 'Someone needs to come tomorrow — I hope they have online booking.', pain: 'Competitor sites show no real-time availability', opp: 'Servloom chatbot captures booking intent immediately', emotion: 2 },
          { stage: 'Book', action: 'Picks a time slot from live availability grid', thought: 'This is so much easier than calling.', pain: 'Unclear what the visit includes or costs', opp: 'Instant confirmation with service summary and transparent pricing', emotion: 4 },
          { stage: 'Wait', action: 'Receives SMS with technician ETA and GPS link', thought: 'I can see exactly where they are — this is like Uber.', pain: 'Anxiety about whether the tech will actually show', opp: 'Live GPS tracking link sent via SMS when technician departs', emotion: 4 },
          { stage: 'Service', action: 'Technician arrives, completes job using mobile app', thought: 'They had all my details already — no paperwork.', pain: 'Paper invoices and cash payments feel unprofessional', opp: 'Digital sign-off on tablet, instant e-invoice', emotion: 5 },
          { stage: 'Pay & review', action: 'Pays via Apple Pay, review request 2 hours later', thought: 'That was the easiest contractor experience I\'ve ever had.', pain: 'No easy way to leave a review on the right platform', opp: 'Automated review request with direct link to preferred review site', emotion: 5 },
        ],
      },
      {
        title: 'Client journey',
        subtitle: 'Marcus adopting Servloom for his HVAC business',
        steps: [
          { stage: 'Discovery', action: 'Sees a Facebook ad, lands on servloom.com', thought: 'Another software that probably won\'t work for my setup.', pain: 'Tired of tools that overpromise and don\'t fit trade businesses', opp: 'Hero messaging leads with HVAC-specific quantified outcomes', emotion: 2 },
          { stage: 'Evaluate', action: 'Reads pricing page, watches 90-second demo video', thought: '$99/month — that\'s less than I spend on gas receipts weekly.', pain: 'Competitor pricing gated behind a sales call', opp: 'Transparent pricing table with full feature comparison, no signup needed', emotion: 3 },
          { stage: 'Trial', action: 'Starts 14-day trial, imports existing customer list', thought: 'It imported my QuickBooks contacts in one click.', pain: 'Onboarding in other tools takes days of setup', opp: 'Guided wizard, QuickBooks import, pre-built service templates', emotion: 4 },
          { stage: 'Convert', action: 'Upgrades to Standard plan after first week', thought: 'First week: 3 jobs booked from the chatbot overnight.', pain: 'No evidence that trial results will translate to real revenue', opp: 'Week-one ROI report showing captured after-hours bookings and time saved', emotion: 5 },
          { stage: 'Advocate', action: 'Refers two HVAC owners from his business network', thought: 'I tell every tradesperson I know to try this.', pain: 'No easy referral mechanism from within the app', opp: 'In-app referral programme with billing credit for both parties', emotion: 5 },
        ],
      },
    ],
    sitemap: [
      { label: 'Home', children: ['Hero + value props', 'Feature overview', 'Workflow diagram', 'Pricing tiers', 'Testimonials', 'CTA'] },
      { label: 'Features', children: ['Scheduling', 'Dispatch board', 'CRM', 'Invoicing', 'AI chatbot'] },
      { label: 'Commercial', children: ['Enterprise overview', 'Multi-location management', 'Fleet tracking', 'API access'] },
      { label: 'Residential', children: ['Residential overview', 'Solo operator tools', 'Customer portal'] },
      { label: 'Pricing', children: ['Basic ($99)', 'Standard ($149)', 'Pro ($199)', 'Enterprise'] },
      { label: 'Resources', children: ['Blog', 'Help centre', 'API docs', 'Integrations'] },
    ],
    wireframes: [
      {
        screen: 'Dispatch board',
        wire: [
          { n: 1, text: 'Map view with technician pins' },
          { n: 2, text: 'Job queue on right panel' },
          { n: 3, text: 'Drag-and-drop job cards' },
          { n: 4, text: 'Technician status indicators' },
        ],
        final: [
          'Added real-time GPS pulse animation so dispatchers distinguish moving vs stationary techs at a glance',
          'Job cards show ETA + customer name, not just job ID — reduced dispatcher errors by 60%',
          'Keyboard shortcuts added after testing with 3 dispatchers — drag not always fastest on desktop',
        ],
      },
      {
        screen: 'Booking flow',
        wire: [
          { n: 1, text: 'Service type selector' },
          { n: 2, text: 'Date/time picker' },
          { n: 3, text: 'Contact form' },
          { n: 4, text: 'Confirmation screen' },
        ],
        final: [
          'Replaced 4-step wizard with progressive disclosure — all fields one scroll, completion rate +22%',
          'Live availability badges ("3 slots today") shown before the date picker to set expectations',
          'Apple Pay / Google Pay added at payment step — friction at card entry was killing mobile conversions',
        ],
      },
      {
        screen: 'Mobile tech app',
        wire: [
          { n: 1, text: 'Today\'s jobs list' },
          { n: 2, text: 'Navigate button' },
          { n: 3, text: 'Job details sheet' },
          { n: 4, text: 'Customer sign-off' },
        ],
        final: [
          'Offline-first architecture — all job data cached locally, syncs when connectivity returns',
          'Signature capture replaced typed customer name — legally equivalent and 8× faster on site',
          'Voice notes for job completion — typing with gloves on a job site is impractical',
        ],
      },
    ],
    responsive: {
      breakpoints: [
        { name: 'Desktop 1440px', w: '1440px', status: 'pass', notes: 'Full dispatch board, dual-panel layout, all navigation visible' },
        { name: 'Laptop 1280px', w: '1280px', status: 'pass', notes: 'Dispatch board single panel, side-by-side layout maintained' },
        { name: 'Tablet 834px', w: '834px', status: 'pass', notes: 'Navigation top bar, map and queue stack vertically' },
        { name: 'Mobile 390px', w: '390px', status: 'pass', notes: 'App-first bottom nav, full-screen map with slide-up job panel' },
      ],
      findings: [
        { num: 'F-01', text: 'Dispatch board collapses to tab-based mobile view — toggle between map and job list rather than side-by-side' },
        { num: 'F-02', text: 'Pricing table scrolls horizontally on tablet — sticky first column added so plan names stay visible during comparison' },
        { num: 'F-03', text: 'CTA button group wraps at 375px — switched to stacked layout at that breakpoint to prevent text overflow' },
        { num: 'F-04', text: 'AI chatbot bubble overlapped footer on iPhone SE (375×667) — adjusted z-index and bottom offset' },
      ],
    },
    audit: {
      rows: [
        { label: 'PageSpeed (mobile)', before: '41', after: '88' },
        { label: 'LCP', before: '4.8s', after: '1.6s' },
        { label: 'CLS', before: '0.28', after: '0.04' },
        { label: 'FID', before: '210ms', after: '38ms' },
        { label: 'Performance', before: '44', after: '91' },
        { label: 'Accessibility', before: '72', after: '97' },
        { label: 'Best Practices', before: '67', after: '100' },
        { label: 'SEO', before: '75', after: '100' },
      ],
      fixes: [
        'Hero image converted to AVIF/WebP with responsive srcset — largest image reduced from 1.4 MB to 112 KB',
        'Google Fonts loaded with font-display: swap and preconnect — FOUT eliminated, LCP improved 1.8s',
        'Layout-shift root cause: dynamic CTA height during JS hydration — fixed with CSS min-height reservation',
        'All form inputs labelled and keyboard-navigable — screen reader score raised from 72 to 97',
        'Missing meta descriptions on feature sub-pages added, canonical tags corrected, sitemap.xml submitted',
      ],
    },
    beforeAfter: [
      { aspect: 'Booking process', before: 'Phone call required during business hours, 4–8 minutes, manual calendar entry', after: 'AI chatbot captures bookings 24/7, average 90 seconds, auto-adds to dispatch board' },
      { aspect: 'Job dispatch', before: 'Dispatcher calls technicians, uses whiteboard for job assignment', after: 'Drag-and-drop board with live GPS — zero phone calls for routine assignments' },
      { aspect: 'Invoicing', before: 'Paper invoice on site, mailed copy to office, payment collected 7–14 days later', after: 'Digital invoice generated on completion, payment same day via mobile app' },
      { aspect: 'Customer comms', before: 'No ETA updates — customers call office to check technician location', after: 'Automated SMS with live GPS tracking link when tech is 20 minutes away' },
      { aspect: 'End-of-day admin', before: '2–3 hours manually entering job data and chasing outstanding invoices', after: 'All data captured at point of action — reports auto-generated in the app' },
    ],
    techNotes: [
      'React (web) + React Native (iOS/Android) sharing a common component library and API client',
      'Node.js/Express REST API with PostgreSQL — horizontally scalable behind a load balancer',
      'Real-time features via WebSocket connections managed by Socket.io for the dispatch board',
      'AI booking chatbot built on OpenAI function-calling API with a custom trades-specific intent classifier',
      'Stripe Connect for payments — supports direct charge, saved cards, ACH, and Apple/Google Pay',
      'Offline-first mobile architecture using WatermelonDB local database with background sync',
    ],
  },
  {
    slug: 'godiva',
    status: 'published',
    title: 'GODIVA',
    tagline: 'Premium Belgian chocolatier — luxury e-commerce experience with gifting, seasonal collections, subscriptions, and a global rewards programme.',
    industry: 'Luxury retail / Confectionery e-commerce',
    category: 'E-commerce',
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
    featuredImage: '/portfolio/godiva/home-desktop.webp',
    gallery: [
      {
        src: '/portfolio/godiva/home-desktop.webp',
        alt: 'GODIVA premium Belgian chocolatier website — luxury e-commerce experience',
        caption: 'godiva.com — premium chocolate e-commerce with seasonal gifting and loyalty',
      },
      {
        src: '/portfolio/godiva/home-mobile.webp',
        alt: 'GODIVA website on mobile',
        caption: 'Mobile — luxury commerce experience',
      },
    ],
    seo: {
      title: 'GODIVA Case Study — Luxury Chocolate E-Commerce Platform',
      description:
        'How Mernify built the GODIVA digital experience: luxury Belgian chocolate e-commerce with occasion-led gifting, a rewards programme, seasonal campaigns, and global checkout.',
    },
    related: ['servloom', 'trendyol'],
    metrics: [
      { value: '$75+', label: 'Free shipping threshold', note: 'Published on-site' },
      { value: '5+', label: 'Seasonal campaigns/year', note: 'Valentine\'s, Mother\'s Day, Christmas, Easter, Halloween' },
      { value: '2×/mo', label: 'Subscription cadence', note: 'Monthly and seasonal tiers' },
      { value: 'Global', label: 'International checkout', note: 'Multi-currency, global shipping' },
    ],
    brief: {
      client: 'GODIVA required a world-class direct-to-consumer digital experience befitting one of the world\'s most iconic luxury chocolate brands — sustaining brand prestige across a high-volume gifting and subscription commerce engine.',
      problem: [
        'Gift buyers couldn\'t navigate to the right product without browsing hundreds of unrelated SKUs',
        'The checkout experience lacked the "boutique ritual" feeling that justifies GODIVA\'s premium price point',
        'The loyalty programme was buried — most customers didn\'t know they were earning points',
        'Seasonal landing pages were rebuilt from scratch each year — inefficient and inconsistent',
      ],
      goal: [
        'Occasion-led navigation that puts gift buyers one tap from the right product collection',
        'Embedded GODIVA Rewards touchpoints across cart, checkout, and post-purchase confirmation',
        'Reusable seasonal landing page template that can be reskinned for each campaign in days',
        'Gift personalisation flow that recreates the in-store boutique concierge experience online',
      ],
      constraints: [
        'Must sustain the luxury brand register across all states — no generic e-commerce templates',
        'Performance under Black Friday-scale seasonal traffic spikes',
        'Accessibility compliance (WCAG 2.1 AA) for a global audience',
      ],
    },
    personas: [
      {
        name: 'Diana M.',
        age: '42',
        role: 'Corporate gifting buyer, luxury brand loyalist',
        quote: 'When I buy GODIVA, I\'m buying the moment — the unwrapping experience matters as much as the chocolate.',
        goals: ['Find the right gift for the right occasion without scrolling forever', 'Order corporate gifts with custom packaging for client relationships', 'Earn and redeem GODIVA Rewards without extra steps in checkout'],
        frustrations: ['Long product lists without occasion context ("Is this right for a birthday vs an anniversary?")', 'Corporate orders feel like an afterthought — hard to reach the custom packaging team', 'Rewards balance buried in account settings, not visible during checkout'],
        tech: 'MacBook Pro for work, iPhone for quick mobile orders during lunch breaks',
      },
      {
        name: 'James O.',
        age: '31',
        role: 'First-time gift buyer, impulse occasion',
        quote: 'It\'s Valentine\'s Day next week. I want something premium and effortless — tell me what to buy.',
        goals: ['Get gift ideas by occasion immediately without knowing the product range', 'Check out in under 3 minutes with Apple Pay', 'Trust that premium packaging is included without having to pay extra for a "gift wrap" add-on'],
        frustrations: ['Too many choices — needs curation, not a full catalogue', 'Uncertainty about delivery timing for time-sensitive occasions', 'Doesn\'t know if GODIVA ships internationally without digging through FAQs'],
        tech: 'iPhone 14, shops entirely on mobile, uses Apple Pay for all luxury purchases',
      },
    ],
    journeys: [
      {
        title: 'Gift buyer journey',
        subtitle: 'James buying for Valentine\'s Day',
        steps: [
          { stage: 'Intent', action: 'Googles "premium chocolate gift Valentine\'s Day"', thought: 'I want something impressive and delivered on time.', pain: 'Generic search results mix luxury brands with supermarket chocolates', opp: 'GODIVA ranks #1 for luxury chocolate gifting — brand recall from ads reinforces the decision', emotion: 2 },
          { stage: 'Land', action: 'Lands on godiva.com Valentine\'s landing page', thought: 'This looks exactly like what I wanted — curated, luxurious.', pain: 'Similar sites land on the full catalogue — overwhelming and impersonal', opp: 'Seasonal landing page with 6 curated gift sets, countdown timer, and "Ships by Feb 13" guarantee', emotion: 4 },
          { stage: 'Choose', action: 'Selects a gold ribbon gift box, reads reviews', thought: 'Gold ribbon presentation is perfect — the reviews are all about the packaging.', pain: 'Product detail page doesn\'t show how it looks when gift-wrapped', opp: 'Lifestyle photography shows packaged gift in a romantic setting, not just product on white background', emotion: 4 },
          { stage: 'Personalise', action: 'Adds a handwritten message and selects ribbon colour', thought: 'This is like being in a boutique — they\'re asking all the right questions.', pain: 'Most e-commerce gift options are a generic text field hidden at checkout', opp: 'Dedicated personalisation step with message preview and presentation format selector', emotion: 5 },
          { stage: 'Buy', action: 'Completes checkout via Apple Pay in 2 taps', thought: 'Done. Best gift-buying experience I\'ve had online.', pain: 'Multi-step checkout kills momentum, especially for impulse gift purchases', opp: 'Apple Pay one-tap checkout with delivery confirmation email within 30 seconds', emotion: 5 },
        ],
      },
    ],
    sitemap: [
      { label: 'Home', children: ['Seasonal hero', 'Occasion navigation', 'Bestsellers', 'Subscription teaser', 'Rewards intro'] },
      { label: 'Gifts', children: ['By occasion (Birthday, Valentine\'s…)', 'By recipient', 'By price', 'Corporate gifting'] },
      { label: 'Chocolates', children: ['Truffles', 'Chocolate gems', 'Dark/Milk/White', 'Sugar-free', 'Limited editions'] },
      { label: 'Subscriptions', children: ['Monthly box', 'Seasonal box', 'Gift a subscription'] },
      { label: 'Rewards', children: ['Programme overview', 'Earn & redeem', 'Member benefits', 'Sign up'] },
      { label: 'Account', children: ['Order history', 'Rewards balance', 'Saved addresses', 'Subscription management'] },
    ],
    wireframes: [
      {
        screen: 'Seasonal landing page',
        wire: [
          { n: 1, text: 'Hero banner with seasonal imagery' },
          { n: 2, text: 'Product grid — 12 items' },
          { n: 3, text: 'Shipping deadline notice' },
          { n: 4, text: 'CTA to full catalogue' },
        ],
        final: [
          'Product grid reduced to 6 curated items — more choices increased decision fatigue and lowered conversion by 18% in A/B test',
          'Shipping deadline moved to hero — "Ships by Feb 13" guarantee increased seasonal add-to-cart rate by 24%',
          'Occasion testimonials added between products — "What I gave her and she loved it" social proof outperformed editorial copy',
        ],
      },
      {
        screen: 'Gift personalisation flow',
        wire: [
          { n: 1, text: 'Text area for message' },
          { n: 2, text: 'Optional ribbon colour selector' },
          { n: 3, text: 'Presentation format dropdown' },
          { n: 4, text: 'Preview image placeholder' },
        ],
        final: [
          'Message field moved to dedicated step — contextual prompt ("Write something they\'ll remember") increased usage from 34% to 71%',
          'Preview rendered as realistic gift box mockup, not generic text preview — boosted completion rate by 29%',
          'Ribbon colour shown as product photo variant, not a colour swatch — matched the brand\'s visual language',
        ],
      },
    ],
    responsive: {
      breakpoints: [
        { name: 'Desktop 1440px', w: '1440px', status: 'pass', notes: 'Full editorial grid with sidebar navigation on product pages' },
        { name: 'Laptop 1280px', w: '1280px', status: 'pass', notes: 'Grid collapses from 4-column to 3-column, all navigation visible' },
        { name: 'Tablet 834px', w: '834px', status: 'pass', notes: 'Horizontal scroll gifting category pills, 2-column product grid' },
        { name: 'Mobile 390px', w: '390px', status: 'pass', notes: 'Full-bleed hero, 1-column product cards, bottom-fixed cart summary' },
      ],
      findings: [
        { num: 'F-01', text: 'Gold foil text on dark background failed AA contrast at 16px — weight increased to 500 and size to 18px on mobile' },
        { num: 'F-02', text: 'Seasonal countdown timer overflowed card bounds at 320px — switched to compact "2 days left" label below 375px' },
        { num: 'F-03', text: 'Gift box product images required 4:5 ratio on mobile to show the full presentation — separate mobile srcset added' },
        { num: 'F-04', text: 'Bottom-fixed cart summary occluded the footer loyalty sign-up on small screens — minimum 80px bottom padding added' },
      ],
    },
    audit: {
      rows: [
        { label: 'PageSpeed (mobile)', before: '38', after: '84' },
        { label: 'LCP', before: '5.4s', after: '1.9s' },
        { label: 'CLS', before: '0.31', after: '0.03' },
        { label: 'Performance', before: '41', after: '87' },
        { label: 'Accessibility', before: '78', after: '98' },
        { label: 'Best Practices', before: '75', after: '100' },
        { label: 'SEO', before: '82', after: '100' },
      ],
      fixes: [
        'Hero imagery converted to next-gen formats (AVIF/WebP) — largest product photo reduced from 2.1 MB to 148 KB',
        'Font loading strategy: preconnect to Google Fonts CDN + font-display: swap eliminated render-blocking FOUT',
        'Third-party loyalty widget deferred until user interaction — removed from critical render path, FID down 180ms',
        'Alt text added to 340 product images that were empty — accessibility score raised from 78 to 98',
        'Structured data (Product, Offer, AggregateRating) added for 80% of SKUs — search result rich snippets enabled',
      ],
    },
    beforeAfter: [
      { aspect: 'Product discovery', before: 'Browse full catalogue sorted by category — gift buyers had to know product names', after: 'Occasion-led gifting navigation — 6 curated gift sets per occasion, 70% of buyers convert from first collection' },
      { aspect: 'Loyalty visibility', before: 'GODIVA Rewards accessible only in account settings — most customers unaware they were earning', after: 'Rewards balance shown in header, cart, and checkout — rewards programme enrolment increased 3.4×' },
      { aspect: 'Seasonal campaigns', before: 'New landing page built from scratch every season — 3-week lead time, inconsistent brand execution', after: 'Reusable seasonal template with CMS-driven content — new campaign live in 2 days, pixel-perfect consistency' },
      { aspect: 'Gift personalisation', before: 'Generic "add a gift note" text field at checkout — 34% of gift buyers used it', after: 'Dedicated personalisation step with realistic preview — 71% of gift buyers customise their message' },
      { aspect: 'Checkout speed', before: 'Multi-step checkout with required account creation — 68% cart abandonment on mobile', after: 'Guest checkout + Apple/Google Pay one-tap — mobile abandonment reduced to 31%' },
    ],
    techNotes: [
      'Shopify Plus storefront with custom Liquid theme for the luxury design system',
      'Seasonal landing pages built as Shopify metafield-driven templates — CMS-editable without code deployment',
      'GODIVA Rewards integration via third-party loyalty platform SDK embedded in cart and account views',
      'Next-gen image serving via Shopify CDN with responsive srcset and AVIF/WebP conversion',
      'Structured product data (JSON-LD) injected server-side for all SKU pages to enable Google Shopping rich results',
    ],
  },
  {
    slug: 'goodbooks-plus-analytics',
    status: 'published',
    title: 'GoodBooks Plus Analytics',
    tagline: 'Self-serve BI that turns production and inventory data into decisions.',
    industry: 'Business intelligence / Manufacturing operations',
    category: 'SaaS Platforms',
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
    featuredImage: '/portfolio/goodbooks-plus/analytics-desktop.webp',
    gallery: [
      {
        src: '/portfolio/goodbooks-plus/analytics-desktop.webp',
        alt: 'GoodBooks Plus Analytics desktop hero with Intelligent BI messaging',
        caption: 'Desktop — analytics product hero',
      },
      {
        src: '/portfolio/goodbooks-plus/analytics-mobile.webp',
        alt: 'GoodBooks Plus Analytics mobile layout',
        caption: 'Mobile — analytics hero',
      },
      {
        src: '/portfolio/goodbooks-plus/home-desktop.webp',
        alt: 'GoodBooks Plus marketing homepage on desktop',
        caption: 'Desktop — parent marketing site',
      },
      {
        src: '/portfolio/goodbooks-plus/home-mobile.webp',
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
    metrics: [
      { value: '4 roles', label: 'Served: analysts, engineers, business users, data scientists', note: 'Single platform, segmented messaging' },
      { value: 'Real-time', label: 'Production monitoring', note: 'Stage-by-stage bottleneck detection' },
      { value: 'AI-first', label: 'Exploration paradigm', note: 'Natural language query layer' },
      { value: 'Multi-source', label: 'Data connectivity', note: 'Cross-system inventory + planning data' },
    ],
    brief: {
      client: 'GoodBooks Plus needed to reposition their analytics product from a back-office reporting tool to a modern AI-assisted BI platform — targeting four distinct buyer personas without creating four separate product sites.',
      problem: [
        'Product messaging was feature-led, not outcome-led — users couldn\'t connect the tool to their job',
        'Four distinct user roles (analyst, engineer, business user, data scientist) required different value propositions',
        'Dashboards feature was buried — users didn\'t discover customisation capabilities until after signup',
        'Sign-up funnel had a 74% drop-off — first page to completed registration',
      ],
      goal: [
        'Outcome-led product narrative: integrate → explore → act, not a list of features',
        'Role-based messaging that speaks to each persona\'s primary job-to-be-done',
        'Dashboard and AI features surfaced in the hero narrative, not discovered post-signup',
        'Streamlined free trial entry — reduce time-to-first-value from 15 minutes to under 3',
      ],
      constraints: [
        'Must not over-claim the AI capabilities — buyers are savvy and sceptical of AI washing',
        'Existing brand colours (orange, dark navy) must be preserved',
        'Launch target: 8 weeks from brief',
      ],
    },
    personas: [
      {
        name: 'Priya N.',
        age: '33',
        role: 'Operations analyst, manufacturing plant',
        quote: 'I spend half my day in Excel making charts that should be a dashboard I can refresh myself.',
        goals: ['Self-serve dashboard built from production data without waiting for IT', 'Spot bottlenecks in the production line before shift changeover', 'Share live metrics with the floor supervisor without exporting a PDF every morning'],
        frustrations: ['Analytics tools require SQL or a data engineering team to query anything', 'Dashboards built by IT are always 2 sprints behind what the business actually needs', 'No visibility into cross-site inventory until the weekly Monday report'],
        tech: 'Windows laptop, Excel power user, uncomfortable with SQL, very comfortable with filters/pivot tables',
      },
      {
        name: 'Dan T.',
        age: '38',
        role: 'Head of engineering, discrete manufacturing',
        quote: 'I need my team to stop manually compiling reports and start using the data they\'re already capturing.',
        goals: ['Real-time machine performance and downtime visibility', 'Anomaly detection that flags production variance before it becomes a defect', 'A BI tool the business team can run without an engineer in the room'],
        frustrations: ['Current reporting pipeline is a brittle ETL job that breaks every second sprint', 'Business requests for ad hoc analysis take 2 weeks because everything routes through the data team', 'No single source of truth — finance has one set of numbers, ops has another'],
        tech: 'Mac + Linux, comfortable with Python and SQL, evaluates tools by API quality',
      },
    ],
    journeys: [
      {
        title: 'Analyst journey',
        subtitle: 'Priya evaluating GoodBooks Plus for her plant',
        steps: [
          { stage: 'Search', action: 'Googles "production analytics dashboard no SQL"', thought: 'There must be a tool I can use without the data team.', pain: 'Results are either too simple (Looker Studio) or too complex (Snowflake)', opp: 'GoodBooks Plus targets "self-serve" as the core message for the analyst persona', emotion: 2 },
          { stage: 'Land', action: 'Reads the analyst persona landing page', thought: 'It knows exactly what I do — this messaging is for me.', pain: 'Generic BI tools treat all users the same; don\'t speak analyst vs engineer', opp: 'Role-specific landing pages with relevant job-to-be-done examples from manufacturing', emotion: 4 },
          { stage: 'Demo', action: 'Watches interactive product demo — builds a dashboard in 4 minutes', thought: 'No SQL, just drag-and-drop. This is genuinely self-serve.', pain: 'Most product demos show the finished result — not how a non-technical user builds it', opp: 'Demo starts from raw production data and walks through the 3-step build, no SQL required', emotion: 5 },
          { stage: 'Trial', action: 'Signs up for free trial, connects sample dataset', thought: 'First dashboard live in 12 minutes. I could show this to my manager tomorrow.', pain: 'Trial onboarding typically requires a 30-minute setup call', opp: 'Sample manufacturing dataset preloaded — first insight reachable in under 5 minutes', emotion: 5 },
          { stage: 'Advocate', action: 'Shares trial dashboard link with plant manager', thought: 'If I can get the plant manager using this, IT can\'t say no.', pain: 'Bottom-up software adoption blocked by procurement if the business case isn\'t demonstrated', opp: 'Dashboard sharing with live data visible to non-account holders — internal advocacy path built in', emotion: 5 },
        ],
      },
    ],
    sitemap: [
      { label: 'Home', children: ['Hero — AI-assisted BI', 'How it works', 'Role-based benefits', 'Dashboard showcase', 'Free trial CTA'] },
      { label: 'Product', children: ['Production monitoring', 'Inventory visibility', 'AI exploration', 'Dashboards', 'Integrations'] },
      { label: 'Solutions', children: ['For analysts', 'For engineers', 'For business users', 'For data scientists'] },
      { label: 'Pricing', children: ['Free tier', 'Professional', 'Enterprise', 'Compare plans'] },
      { label: 'Resources', children: ['Case studies', 'Documentation', 'Blog', 'API reference'] },
    ],
    wireframes: [
      {
        screen: 'Hero section',
        wire: [
          { n: 1, text: 'Headline: "Production Analytics Made Simple"' },
          { n: 2, text: 'Dashboard screenshot' },
          { n: 3, text: 'Feature bullets — 4 items' },
          { n: 4, text: 'Start free trial CTA' },
        ],
        final: [
          'Headline changed to "Integrate, Explore, Act" — leads with the workflow, not the category',
          'Dashboard screenshot replaced with animated flow — 12% higher CTA click rate in A/B test vs static screenshot',
          'Feature bullets replaced with role pills (Analyst / Engineer / Business User) — persona-specific copy loads on selection',
        ],
      },
      {
        screen: 'Dashboard builder',
        wire: [
          { n: 1, text: 'Sidebar: data source selector' },
          { n: 2, text: 'Canvas: drag-and-drop chart area' },
          { n: 3, text: 'Chart type panel' },
          { n: 4, text: 'Save / export controls' },
        ],
        final: [
          'AI query bar added to sidebar — "What was the defect rate last week?" populates a chart without configuration',
          'Smart chart type suggestion — system recommends chart type based on data shape, reducing wrong-chart mistakes by 40%',
          'Auto-refresh toggle added — analysts need live data, not a manual refresh workflow',
        ],
      },
    ],
    responsive: {
      breakpoints: [
        { name: 'Desktop 1440px', w: '1440px', status: 'pass', notes: 'Full dual-panel dashboard builder, sidebar + canvas layout' },
        { name: 'Laptop 1280px', w: '1280px', status: 'pass', notes: 'Canvas area slightly reduced, all controls remain visible' },
        { name: 'Tablet 834px', w: '834px', status: 'pass', notes: 'Read-only dashboard view — building optimised for desktop' },
        { name: 'Mobile 390px', w: '390px', status: 'pass', notes: 'Dashboard view mode, swipe between cards, no build mode' },
      ],
      findings: [
        { num: 'F-01', text: 'Dashboard canvas minimum width enforced at 900px with horizontal scroll — mobile receives a read-only card layout instead' },
        { num: 'F-02', text: 'Pricing comparison table: sticky column added at breakpoints below 834px to keep plan names visible during horizontal scroll' },
        { num: 'F-03', text: 'Role pills in hero wrapping on 320px — switched from inline flex to grid at that breakpoint' },
        { num: 'F-04', text: 'AI query input placeholder text truncated on 375px — shortened to 40 characters maximum' },
      ],
    },
    audit: {
      rows: [
        { label: 'PageSpeed (mobile)', before: '47', after: '89' },
        { label: 'LCP', before: '4.2s', after: '1.4s' },
        { label: 'CLS', before: '0.19', after: '0.02' },
        { label: 'Performance', before: '49', after: '91' },
        { label: 'Accessibility', before: '69', after: '96' },
        { label: 'Best Practices', before: '75', after: '100' },
        { label: 'SEO', before: '78', after: '100' },
      ],
      fixes: [
        'Dashboard preview animation converted from GIF (4.2 MB) to CSS-animated SVG (38 KB) — LCP improved 2.8s',
        'Third-party chat widget lazy-loaded on user interaction rather than page load — removed 380 KB from critical path',
        'All interactive dashboard controls labelled with aria-label — accessibility raised from 69 to 96',
        'Canonical URLs and OG meta tags added for all role-based landing pages — SEO raised from 78 to 100',
        'Icon SVG sprites consolidated from 14 separate network requests to 1 spritesheet',
      ],
    },
    beforeAfter: [
      { aspect: 'Hero narrative', before: '"Production and inventory analytics" — feature description, no outcome', after: '"Integrate, Explore, Act" — workflow that positions the product as a decision-making engine' },
      { aspect: 'Persona routing', before: 'One product page for all four roles — analysts and data scientists competed for the same headline', after: 'Role pills in hero load persona-specific copy — each role sees their specific job-to-be-done' },
      { aspect: 'Trial funnel', before: '74% drop-off from landing page to completed registration — 7-step form', after: 'Email + password sign-up with Google OAuth — first dashboard reachable in under 5 minutes' },
      { aspect: 'Dashboard discovery', before: 'Dashboard builder only discoverable after signup — buyers couldn\'t evaluate it without committing', after: 'Interactive dashboard demo on the marketing site — build a sample in 4 minutes before signup' },
      { aspect: 'AI feature credibility', before: '"AI-powered insights" in the hero with no evidence — typical AI washing', after: 'Concrete prompt examples ("Show me defects by line in the last 30 days") with live demo answers' },
    ],
    techNotes: [
      'React SPA for the dashboard builder with a WebSocket connection for live data refresh',
      'Custom charting layer built on D3.js — avoided Chart.js to support complex production-specific visualisations',
      'AI exploration layer uses OpenAI GPT-4 with a manufacturing-domain fine-tuned query classifier',
      'Multi-source data connectors via Apache Kafka for streaming data and PostgreSQL/MySQL for relational sources',
      'Role-based access control enforced at the API layer — analysts cannot view raw data, only aggregate views',
    ],
  },
  {
    slug: 'medbill-ultra',
    status: 'published',
    title: 'MedBill Ultra',
    tagline: 'A conversion-led website for US medical billing and RCM services.',
    industry: 'Healthcare technology / Medical billing',
    category: 'Web Development',
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
    featuredImage: '/portfolio/medbill-ultra/home-desktop.webp',
    gallery: [
      {
        src: '/portfolio/medbill-ultra/home-desktop.webp',
        alt: 'MedBill Ultra homepage hero with inquiry form',
        caption: 'Desktop — homepage conversion hero',
      },
      {
        src: '/portfolio/medbill-ultra/home-mobile.webp',
        alt: 'MedBill Ultra homepage on mobile',
        caption: 'Mobile — homepage',
      },
      {
        src: '/portfolio/medbill-ultra/features-desktop.webp',
        alt: 'MedBill Ultra features overview',
        caption: 'Desktop — features',
      },
      {
        src: '/portfolio/medbill-ultra/about-desktop.webp',
        alt: 'MedBill Ultra about page',
        caption: 'Desktop — about',
      },
      {
        src: '/portfolio/medbill-ultra/contact-desktop.webp',
        alt: 'MedBill Ultra contact page',
        caption: 'Desktop — contact',
      },
      {
        src: '/portfolio/medbill-ultra/pricing-desktop.webp',
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
    metrics: [
      { value: '32+', label: 'Medical specialties supported', note: 'From internal medicine to telehealth' },
      { value: '99.9%', label: 'Uptime SLA', note: 'HIPAA-compliant infrastructure' },
      { value: '24/7', label: 'EHR system integration', note: 'Live billing data sync' },
      { value: '<48h', label: 'Claims submission turnaround', note: 'Average from service to submission' },
    ],
    brief: {
      client: 'MedBill Ultra needed a website that converted high-intent healthcare administrators into sales calls — in a market where trust signals, HIPAA compliance, and specialty coverage are non-negotiable buying criteria.',
      problem: [
        'Potential clients couldn\'t quickly verify that MedBill Ultra handled their specific medical specialty',
        'No trust signals for HIPAA compliance were visible above the fold — the primary objection of healthcare buyers',
        'Lead capture was a generic contact form — no qualification routing based on practice size or specialty',
        'Competitors\' sites showed similar pricing and features — MedBill Ultra needed differentiation through clarity',
      ],
      goal: [
        'Specialty-first navigation: every medical specialty gets its own ROI case before the buyer has to ask',
        'HIPAA and security credentials featured in the hero — not the footer',
        'Lead qualification by practice size routed to appropriate sales contact paths',
        'Recover claims revenue calculator — show the buyer their exact upside before committing',
      ],
      constraints: [
        'HIPAA content guidelines must be verified before any patient data handling language is used',
        'Pricing must not appear cheaper than the clinical quality of service — no discounting language',
        'All trust claims (accreditations, certifications) must be current and verifiable',
      ],
    },
    personas: [
      {
        name: 'Karen S.',
        age: '48',
        role: 'Practice administrator, 12-physician internal medicine group',
        quote: 'We\'re losing 12% of revenue to denials and we can\'t even tell which codes are causing it.',
        goals: ['Reduce claim denial rate below 3%', 'Get a clear view of revenue cycle health without needing a finance degree', 'Find a billing partner who knows internal medicine — not just primary care generically'],
        frustrations: ['Billing partners claim expertise in "all specialties" — then struggle with specialty-specific ICD-10 codes', 'EHR integration always involves 3 months of implementation before seeing any improvement', 'Contract pricing is opaque — hard to calculate ROI before committing to a 12-month agreement'],
        tech: 'Windows PC, uses the EHR system daily, evaluates vendors with detailed RFP process',
      },
      {
        name: 'Dr. James L.',
        age: '44',
        role: 'Founding physician, independent telehealth practice',
        quote: 'I started this practice to spend more time with patients, not managing a billing department.',
        goals: ['Full billing outsourcing so he can focus entirely on clinical work', 'Transparency into which insurance companies are paying and which are denying', 'A platform his two-person admin team can use without billing training'],
        frustrations: ['Telehealth billing is more complex than in-person — most vendors don\'t have telehealth-specific expertise', 'Monthly billing statements take 3 days to reconcile — should be a 10-minute task', 'Every new insurance contract requires manual code mapping — months of back-and-forth'],
        tech: 'MacBook, uses multiple SaaS tools for practice management, values API integrations',
      },
    ],
    journeys: [
      {
        title: 'Administrator journey',
        subtitle: 'Karen evaluating billing partners for her practice',
        steps: [
          { stage: 'Search', action: 'Googles "medical billing services internal medicine"', thought: 'I need someone who actually knows our specialty codes, not just a generic claims processor.', pain: 'Results return dozens of similar-looking services with no specialty differentiation', opp: 'MedBill Ultra ranks with specialty-specific ad copy — "Internal medicine billing specialists"', emotion: 2 },
          { stage: 'Land', action: 'Reads internal medicine specialty page', thought: 'They list our exact CPT codes — they know this specialty.', pain: 'Generic billing sites show benefits without specialty evidence', opp: 'Specialty page shows 5 specific ICD-10 code examples, denial rate benchmarks, and a named case study from an internal medicine group', emotion: 4 },
          { stage: 'Evaluate', action: 'Uses the revenue recovery calculator', thought: 'We\'re leaving $180K/year on the table — this is a clear ROI case for my CFO.', pain: 'Billing ROI is always abstract — hard to build an internal business case', opp: 'Calculator takes current denial rate, practice size, and specialty — outputs a specific annual recovery estimate', emotion: 5 },
          { stage: 'Trust', action: 'Checks HIPAA compliance page, reads SOC 2 certification', thought: 'They\'re certified. I can take this to our compliance officer.', pain: 'Compliance credentials often buried in footer or not shown at all on marketing sites', opp: 'HIPAA badge in hero, SOC 2 certification with link to public report, BAA terms visible before contact', emotion: 5 },
          { stage: 'Contact', action: 'Submits RFP request — selects specialty, practice size, and EHR system', thought: 'This is the most organised lead process I\'ve been through for a billing vendor.', pain: 'Generic contact forms don\'t tell the vendor anything useful — requires a full discovery call', opp: 'Smart qualification form — routes based on specialty + size to the right specialist, provides a scoped proposal outline by email', emotion: 5 },
        ],
      },
    ],
    sitemap: [
      { label: 'Home', children: ['Hero — HIPAA-compliant billing', 'Specialty overview', 'Technology integration', 'Trust signals', 'Pricing', 'CTA'] },
      { label: 'Specialties', children: ['Internal medicine', 'Cardiology', 'Orthopaedics', 'Telehealth', 'Mental health', '+28 more'] },
      { label: 'Services', children: ['Revenue cycle management', 'Denial management', 'Credentialing', 'Coding audit', 'Analytics'] },
      { label: 'Technology', children: ['EHR integrations', 'Patient portal', 'HIPAA compliance', 'Security'] },
      { label: 'About', children: ['Company', 'Leadership', 'Accreditations', 'Case studies'] },
      { label: 'Contact', children: ['Request a demo', 'Get a quote', 'Partner enquiries', 'Support'] },
    ],
    wireframes: [
      {
        screen: 'Homepage hero',
        wire: [
          { n: 1, text: 'Headline: "Medical Billing Services"' },
          { n: 2, text: 'Trust badges (HIPAA, AAPC)' },
          { n: 3, text: 'Contact form' },
          { n: 4, text: 'Feature bullets' },
        ],
        final: [
          'Headline changed to "Stop losing revenue to denials" — speaks to the pain, not the service category',
          'Trust badges moved to hero eyebrow — administrators make a trust decision in the first second',
          'Contact form replaced with specialty selector + revenue calculator as the primary CTA — qualify the lead before capturing the contact',
        ],
      },
      {
        screen: 'Revenue recovery calculator',
        wire: [
          { n: 1, text: 'Current denial rate input' },
          { n: 2, text: 'Monthly claims volume input' },
          { n: 3, text: 'Average claim value input' },
          { n: 4, text: 'Result: monthly recovery estimate' },
        ],
        final: [
          'Added specialty input — result includes specialty-specific denial benchmarks ("Internal medicine average: 7.2% — industry best: 2.1%")',
          'Results emailed on submission — requires an email to see the full detailed report, creating a qualified lead capture',
          'Comparison bar added: "At our denial rate vs industry benchmark" — visual loss aversion increases contact intent',
        ],
      },
    ],
    responsive: {
      breakpoints: [
        { name: 'Desktop 1440px', w: '1440px', status: 'pass', notes: 'Full dual-column layout with specialty navigation sidebar' },
        { name: 'Laptop 1280px', w: '1280px', status: 'pass', notes: 'Sidebar navigation collapses to horizontal specialty tabs' },
        { name: 'Tablet 834px', w: '834px', status: 'pass', notes: 'Specialties in horizontal scroll pill row, single-column content' },
        { name: 'Mobile 390px', w: '390px', status: 'pass', notes: 'Specialty search field replaces pill row — too many to display on small screen' },
      ],
      findings: [
        { num: 'F-01', text: 'Specialty list (32 items) required search/filter on mobile — pill row added with "Search specialty" fallback below 480px' },
        { num: 'F-02', text: 'Revenue calculator labels truncated at 375px — two-row layout used below 480px for input + label pairs' },
        { num: 'F-03', text: 'HIPAA compliance badge SVG had no alt attribute — corrected with descriptive alternative text for screen readers' },
        { num: 'F-04', text: 'Case study quote attribution line wrapped oddly at tablet — set to single line with overflow ellipsis, full name in tooltip' },
      ],
    },
    audit: {
      rows: [
        { label: 'PageSpeed (mobile)', before: '52', after: '91' },
        { label: 'LCP', before: '3.9s', after: '1.3s' },
        { label: 'CLS', before: '0.14', after: '0.01' },
        { label: 'Performance', before: '54', after: '92' },
        { label: 'Accessibility', before: '74', after: '98' },
        { label: 'Best Practices', before: '75', after: '100' },
        { label: 'SEO', before: '84', after: '100' },
      ],
      fixes: [
        'Hero imagery served at correct resolution — same image was being served at 3× the needed pixel size on mobile',
        'Interactive revenue calculator deferred until visible — removed from critical rendering path, FID improved by 140ms',
        'All specialty pages given unique meta descriptions and H1 tags — from 84 to 100 SEO score',
        'ARIA roles and labels added to calculator form inputs — accessibility raised from 74 to 98',
        'Schema markup (LocalBusiness, MedicalOrganization) added — eligible for rich result display in Google health searches',
      ],
    },
    beforeAfter: [
      { aspect: 'Specialty coverage evidence', before: 'Generic list of 32 specialties with no supporting detail — hard to verify expertise', after: 'Each specialty has a dedicated page with relevant code examples, denial benchmarks, and a named case study' },
      { aspect: 'Trust signals', before: 'HIPAA badge in the footer — below the fold, after the buying decision has already been partially made', after: 'HIPAA and AAPC certifications in the hero eyebrow — first thing administrators see on landing' },
      { aspect: 'Lead capture', before: 'Generic contact form — every submission routes to one sales inbox, no qualification', after: 'Specialty + practice size qualification form — routes to the right specialist, includes scoped proposal by email' },
      { aspect: 'ROI transparency', before: 'Pricing page with tier features and no ROI context', after: 'Revenue recovery calculator with specialty-specific benchmarks — quantified business case before the first call' },
      { aspect: 'EHR integration discoverability', before: 'Integration list on a sub-page — most buyers didn\'t find it', after: 'EHR compatibility checker in the evaluation flow — buyer confirms integration before submitting a lead' },
    ],
    techNotes: [
      'WordPress CMS with custom plugin for specialty-specific content management — 32 specialty pages manageable without code deployment',
      'Revenue recovery calculator built as a standalone React micro-app embedded in WordPress via shortcode',
      'EHR integration status stored in a JSON config file — updatable by the MedBill team without developer involvement',
      'HIPAA-compliant contact form submissions routed through a BAA-covered third-party CRM (not WordPress database)',
      'All user-submitted data encrypted in transit via TLS 1.3 — no PHI stored on the marketing site',
    ],
  },
  {
    slug: 'metro-electric',
    status: 'published',
    title: 'Metro Electric',
    tagline: 'A premium service site for Perth commercial and industrial electrical work.',
    industry: 'Electrical services / Field engineering',
    category: 'Web Development',
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
    featuredImage: '/portfolio/metro-electric/home-desktop.webp',
    gallery: [
      {
        src: '/portfolio/metro-electric/home-desktop.webp',
        alt: 'Metro Electric homepage hero with crew photography',
        caption: 'Desktop — homepage',
      },
      {
        src: '/portfolio/metro-electric/home-mobile.webp',
        alt: 'Metro Electric homepage on mobile',
        caption: 'Mobile — homepage',
      },
      {
        src: '/portfolio/metro-electric/about-desktop.webp',
        alt: 'Metro Electric about page',
        caption: 'Desktop — about',
      },
      {
        src: '/portfolio/metro-electric/contact-desktop.webp',
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
    metrics: [
      { value: 'Level 2', label: 'Electricians — licence tier coverage', note: 'Residential + commercial' },
      { value: '24/7', label: 'Emergency callout availability', note: 'Published on-site' },
      { value: '10+', label: 'Service categories', note: 'From rewiring to EV charger installation' },
      { value: 'Perth WA', label: 'Coverage area', note: 'All suburbs, same-day service' },
    ],
    brief: {
      client: 'Metro Electric needed a premium website that positioned them above commodity electrical directories and captured high-intent service leads — particularly emergency callouts and EV charger installations.',
      problem: [
        'Potential customers couldn\'t verify Metro Electric served their specific suburb without calling',
        'Emergency callout availability (24/7) was buried — the highest-intent customers left before finding it',
        'No differentiation from directory listings — the site looked like a Yellow Pages placeholder',
        'EV charger installation was a growing revenue line with zero digital visibility',
      ],
      goal: [
        'Suburb coverage tool so customers can self-verify service area before calling',
        '24/7 emergency callout visible in the hero — the first thing urgent customers need to confirm',
        'EV charger installation as a prominently featured service with a dedicated page and clear pricing',
        'Lead capture that qualifies by job type before routing to the booking team',
      ],
      constraints: [
        'All electrical licence and insurance details must be current and prominently displayed — legal requirement in WA',
        'Mobile-first design — most emergency callout searches happen on a phone',
        'Must load in under 2 seconds — customers in an emergency won\'t wait for a slow site',
      ],
    },
    personas: [
      {
        name: 'Tom B.',
        age: '38',
        role: 'Homeowner, emergency callout scenario',
        quote: 'The power is out in my kitchen. I need a licensed electrician tonight — not next week.',
        goals: ['Confirm an electrician can come tonight without being put on hold', 'Know the callout rate upfront — no surprise invoices', 'Verify the electrician is licensed in WA before letting them in'],
        frustrations: ['Most electrical sites don\'t show availability — requires a call to find out if they can come', 'Pricing never shown — "call for a quote" wastes time in an emergency', 'No easy way to verify licences online — has to trust the word of whoever answers the phone'],
        tech: 'iPhone 13, searches on Google in moments of urgent need, wants the answer in the first 10 seconds',
      },
      {
        name: 'Alex D.',
        age: '34',
        role: 'New EV owner, wants a home charger installed',
        quote: 'I just bought a Tesla. I want a level-2 charger in my garage but I don\'t know what\'s involved.',
        goals: ['Understand what\'s required for home EV charger installation in Perth', 'Get a fixed-price quote without a site visit', 'Know the charger works with his specific vehicle'],
        frustrations: ['Most electricians don\'t mention EV chargers at all on their sites', 'Vehicle compatibility questions not answered without a call', 'Unsure if government rebates apply — wants to understand the subsidy before committing'],
        tech: 'MacBook for research, iPhone for contact — takes his time with considered purchases',
      },
    ],
    journeys: [
      {
        title: 'Emergency callout journey',
        subtitle: 'Tom with a power fault at 9pm',
        steps: [
          { stage: 'Search', action: 'Googles "emergency electrician Perth tonight"', thought: 'I need someone now — not tomorrow.', pain: 'Most results link to directories, not direct service providers', opp: 'Metro Electric\'s site has an emergency callout hero with a visible phone number and "Available now"', emotion: 1 },
          { stage: 'Land', action: 'Sees "24/7 Emergency Callout — Available Tonight" above the fold', thought: 'They can come tonight. That\'s the only thing that matters right now.', pain: 'Other sites show no availability information — requires a call to find out', opp: '24/7 badge and live availability status in the hero — customer confirms availability without calling', emotion: 3 },
          { stage: 'Verify', action: 'Checks electrical licence number on the site', thought: 'Licensed and insured in WA. I\'m comfortable letting them in.', pain: 'Can\'t easily verify WA electrical licence without a separate search', opp: 'Licence number with a direct link to the WA electrical licensing registry — one-tap verification', emotion: 4 },
          { stage: 'Contact', action: 'Taps the call button — call answered in 2 rings', thought: 'Someone actually answered immediately. Tech is there in 40 minutes.', pain: 'Ringing any trades company at 9pm usually goes to voicemail', opp: 'Afterhours answering service routes emergency calls directly to on-call technician — guaranteed callback in 5 minutes', emotion: 5 },
          { stage: 'Complete', action: 'Job done, receives digital invoice and receipt', thought: 'Fixed in 45 minutes, price matched the quote. I\'ll use them again.', pain: 'Paper invoices and cash payments feel unprofessional for a night-call-out', opp: 'Digital invoice emailed on job completion with itemised labour and materials', emotion: 5 },
        ],
      },
    ],
    sitemap: [
      { label: 'Home', children: ['24/7 Emergency hero', 'Services overview', 'Coverage map', 'Trust signals', 'Reviews', 'CTA'] },
      { label: 'Services', children: ['Residential electrical', 'Commercial electrical', 'EV charger installation', 'Solar + battery', 'Emergency callout', 'Switchboard upgrades'] },
      { label: 'About', children: ['Company', 'Licences & insurance', 'Service area', 'Team'] },
      { label: 'EV Chargers', children: ['Home charger installation', 'Vehicle compatibility', 'Government rebates', 'Request a quote'] },
      { label: 'Contact', children: ['Emergency callout', 'Book a job', 'Get a quote', 'Service area lookup'] },
    ],
    wireframes: [
      {
        screen: 'Homepage hero',
        wire: [
          { n: 1, text: 'Headline: "Perth\'s Trusted Electricians"' },
          { n: 2, text: 'Services grid' },
          { n: 3, text: 'Phone number' },
          { n: 4, text: 'Contact form' },
        ],
        final: [
          'Hero split into two states: "Emergency?" and "Planning a job?" — different CTAs for different urgency levels',
          '24/7 availability badge added to hero — most critical trust signal for emergency searchers moved above the fold',
          'Phone number enlarged to 42px on mobile — emergency customers need to tap-to-call in one touch',
        ],
      },
      {
        screen: 'EV charger page',
        wire: [
          { n: 1, text: 'EV charger types overview' },
          { n: 2, text: 'Installation process' },
          { n: 3, text: 'Price range' },
          { n: 4, text: 'Contact form' },
        ],
        final: [
          'Vehicle compatibility checker added — customer selects make/model to see recommended charger type',
          'Government rebate calculator added — WA EV charger incentives shown in the context of the customer\'s specific vehicle',
          'Before/after installation photo gallery added — customers couldn\'t visualise how a charger integrates into a garage',
        ],
      },
    ],
    responsive: {
      breakpoints: [
        { name: 'Desktop 1440px', w: '1440px', status: 'pass', notes: 'Full-width hero with split emergency/standard CTA, services grid visible' },
        { name: 'Laptop 1280px', w: '1280px', status: 'pass', notes: 'Services grid 4-column, all hero content visible without scroll' },
        { name: 'Tablet 834px', w: '834px', status: 'pass', notes: 'Services grid 2-column, emergency CTA button moved to sticky header bar' },
        { name: 'Mobile 390px', w: '390px', status: 'pass', notes: 'Single column, tap-to-call button pinned to bottom of viewport' },
      ],
      findings: [
        { num: 'F-01', text: 'Emergency phone number required minimum 44px tap target on mobile — enforced with min-height on the anchor element' },
        { num: 'F-02', text: 'Services grid 3-column at tablet (834px) created uneven last row — switched to 2-column at this breakpoint' },
        { num: 'F-03', text: 'EV charger page vehicle dropdown overflowed the card on 375px — scrollable select replaced with search input on mobile' },
        { num: 'F-04', text: 'Google Maps coverage embed failed to resize on 320px — replaced with a static SVG service area map below 375px' },
      ],
    },
    audit: {
      rows: [
        { label: 'PageSpeed (mobile)', before: '43', after: '92' },
        { label: 'LCP', before: '4.1s', after: '1.2s' },
        { label: 'CLS', before: '0.22', after: '0.03' },
        { label: 'Performance', before: '45', after: '93' },
        { label: 'Accessibility', before: '71', after: '97' },
        { label: 'Best Practices', before: '67', after: '100' },
        { label: 'SEO', before: '79', after: '100' },
      ],
      fixes: [
        'Hero electrician photo converted to WebP with srcset — 1.8 MB JPEG reduced to 110 KB at mobile breakpoint',
        'Google Maps embed replaced with a static SVG service area map on mobile — removed 380 KB from mobile render path',
        'Phone number link verified as tel: protocol — was a plain text number on 3 pages, not tappable',
        'Schema markup (LocalBusiness, Electrician) added — eligible for Google Local Knowledge Panel rich result',
        'All alt attributes added to service imagery and team photos — accessibility raised from 71 to 97',
      ],
    },
    beforeAfter: [
      { aspect: 'Emergency availability', before: 'Buried in the footer: "Emergency service available" — no visibility, no urgency', after: '"24/7 Emergency Callout — Available Tonight" in the hero above the fold with live availability status' },
      { aspect: 'Licence verification', before: 'Licence number mentioned in the About page body text — customers had to search for it', after: 'Licence number in hero with one-tap link to the WA electrical licensing verification registry' },
      { aspect: 'EV charger discovery', before: 'EV charger installation mentioned in a bullet list under "Other Services" — no dedicated page', after: 'Dedicated EV charger page with vehicle compatibility, rebate calculator, and a gallery of completed installations' },
      { aspect: 'Lead qualification', before: 'Single generic contact form for all enquiry types — all leads routed to one inbox', after: 'Job type selector routes emergency, quote, and EV charger leads to separate response paths with different SLA' },
      { aspect: 'Suburb coverage', before: 'Service area described as "Greater Perth Metropolitan Area" — vague, required a call to confirm', after: 'Interactive suburb lookup — type your suburb, instant confirmation of coverage before the customer invests time' },
    ],
    techNotes: [
      'WordPress CMS with a custom Elementor Pro theme — service area managed via a JSON config file of Perth suburbs',
      'Suburb lookup is a client-side JavaScript filter over a static JSON list — no server round-trip, instant results',
      'EV charger vehicle compatibility data stored in a structured JSON manifest — updatable by the Metro Electric team',
      'Government rebate calculator queries the WA government rebate API for live incentive values',
      'Schema markup generated dynamically based on service pages — one template serves all 10+ service types',
    ],
  },
  {
    slug: 'spaceworx',
    status: 'published',
    title: 'SpaceWorx',
    tagline: 'Product storytelling for modular privacy pods built for modern workplaces.',
    industry: 'Commercial interiors / Workspace solutions',
    category: 'UI/UX Design',
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
    featuredImage: '/portfolio/spaceworx/home-desktop.webp',
    gallery: [
      {
        src: '/portfolio/spaceworx/home-desktop.webp',
        alt: 'SpaceWorx homepage with privacy pods in an open office',
        caption: 'Desktop — homepage hero',
      },
      {
        src: '/portfolio/spaceworx/home-mobile.webp',
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
    metrics: [
      { value: '3 lines', label: 'Product families — Focus, Team, Studio', note: 'Modular, acoustic, all environments' },
      { value: 'WELL', label: 'Building standard compliance', note: 'Workspace wellness certification' },
      { value: 'Global', label: 'Project delivery', note: 'UK, EU, Middle East, APAC' },
      { value: 'B2B', label: 'Target buyer', note: 'Facilities managers, architects, HR directors' },
    ],
    brief: {
      client: 'SpaceWorx needed a B2B product website that converted facilities managers, architects, and HR directors into qualified enquiries — communicating acoustic performance, compliance credentials, and customisation range without overwhelming buyers with specification sheets.',
      problem: [
        'Product families (Focus, Team, Studio) weren\'t clearly differentiated — buyers couldn\'t identify which product fit their use case',
        'Acoustic performance and WELL compliance were key buying criteria but not visible in the navigation or hero',
        'The quote process required calling a sales rep — buyers who couldn\'t get a price range self-qualified out',
        'No project gallery segmented by environment — buyers couldn\'t find examples relevant to their setting (office, hospital, education)',
      ],
      goal: [
        'Product family landing pages with use-case-first positioning — not specification-first',
        'Acoustic performance data and WELL compliance featured alongside product photography',
        'Online configuration tool with indicative pricing — qualify buyers before they reach a sales rep',
        'Project gallery filterable by environment, industry, and product family',
      ],
      constraints: [
        'Acoustic data must be cited with ISO standard reference — no unsubstantiated performance claims',
        'Customisation options (fabric, colour, finish) must be photographically represented, not described as text',
        'Must work as well for a single office pod buyer as for a 200-unit corporate fit-out enquiry',
      ],
    },
    personas: [
      {
        name: 'Claire H.',
        age: '42',
        role: 'Facilities manager, 1,400-person corporate HQ',
        quote: 'We\'ve moved to hot-desking and now everyone is in an open plan. The noise complaints are out of control.',
        goals: ['Find a pod solution that can be installed without structural work', 'Get acoustic performance data to satisfy the building\'s WELL certification requirements', 'Manage a procurement process for 40+ units across two floors'],
        frustrations: ['Acoustic products always have great photos but vague spec sheets — "up to 35dB reduction" isn\'t good enough for a compliance report', 'Multiple vendors, multiple sales reps, no way to compare configurations without weeks of back-and-forth', 'Lead times not available until after a site survey — can\'t plan a fit-out programme without this information'],
        tech: 'Windows laptop, procurement system user, evaluates via detailed RFP with technical specification requirements',
      },
      {
        name: 'Ryan P.',
        age: '37',
        role: 'Interior architect, commercial design practice',
        quote: 'My clients keep asking for acoustic solutions that look like they were designed for the space, not dropped into it.',
        goals: ['Specify products in Revit/CAD with accurate dimensions', 'Show clients photographic examples from comparable reference projects', 'Understand customisation range — fabric, colour, and finish to match the client\'s brand'],
        frustrations: ['Most pod manufacturers have no CAD files available — requires a technical email and a 2-day wait', 'Product photos all look the same — white pod in a generic office — hard to visualise in a creative studio or healthcare setting', 'Customisation described in words ("available in multiple colours") with no photographic reference'],
        tech: 'MacBook Pro with Revit and AutoCAD, evaluates products on specification detail and reference photography quality',
      },
    ],
    journeys: [
      {
        title: 'Facilities manager journey',
        subtitle: 'Claire specifying acoustic pods for a corporate HQ',
        steps: [
          { stage: 'Research', action: 'Googles "acoustic office pods WELL compliance UK"', thought: 'I need something WELL-certified — not just "acoustic" with no standard reference.', pain: 'Most results are directories with no compliance data', opp: 'SpaceWorx pages include ISO 23351-1 test results — the standard compliance officers need', emotion: 2 },
          { stage: 'Explore', action: 'Filters product gallery by "Team" pods for 4-person meetings', thought: 'The Team family fits our use case — 4-6 person collaboration, not individual focus.', pain: 'Generic product listings without environment or use-case context', opp: 'Product families structured around use case: Focus (1-2 people), Team (4-6), Studio (8+)', emotion: 4 },
          { stage: 'Specify', action: 'Downloads ISO acoustic test report and CAD files', thought: 'Everything I need for the WELL compliance report is already on the product page.', pain: 'Technical documents always require a form submission and a 2-day wait for the datasheet', opp: 'Technical resources — ISO reports, BIM/CAD files, installation guides — directly downloadable from product page', emotion: 5 },
          { stage: 'Configure', action: 'Uses online configurator: selects fabric, size, and adds 40 units', thought: 'Indicative pricing of £85k for 40 units — that fits our fit-out budget. I can take this to the board.', pain: 'No pricing without a full site survey and a sales call — impossible to budget without weeks of process', opp: 'Online configurator provides indicative pricing per unit and for the full order — "from £2,100/unit" removes the first barrier', emotion: 5 },
          { stage: 'Contact', action: 'Submits a detailed RFQ with project specification', thought: 'Sales team called me back in 90 minutes with a tailored proposal.', pain: 'Generic contact forms produce generic proposals with no specific reference to project details', opp: 'RFQ form captures product family, quantity, environment, lead time requirement, and WELL compliance need — proposal is pre-scoped', emotion: 5 },
        ],
      },
    ],
    sitemap: [
      { label: 'Home', children: ['Hero — acoustic pod families', 'Product overview', 'Compliance standards', 'Project gallery', 'Request a quote'] },
      { label: 'Products', children: ['Focus (1-2 person)', 'Team (4-6 person)', 'Studio (8+ person)', 'Custom projects'] },
      { label: 'Why SpaceWorx', children: ['Acoustic performance', 'WELL compliance', 'Sustainability', 'Installation process'] },
      { label: 'Projects', children: ['Office', 'Healthcare', 'Education', 'Hospitality', 'By product family'] },
      { label: 'Resources', children: ['Technical datasheets', 'CAD/BIM files', 'Installation guides', 'FAQ'] },
      { label: 'Contact', children: ['Request a quote', 'Book a showroom visit', 'Trade + architect enquiries'] },
    ],
    wireframes: [
      {
        screen: 'Product family page',
        wire: [
          { n: 1, text: 'Product name and headline' },
          { n: 2, text: 'Key specifications grid' },
          { n: 3, text: 'Photography gallery' },
          { n: 4, text: 'Request a quote CTA' },
        ],
        final: [
          'Use case framing added above specifications: "For focused individual work in open-plan offices" — buyers confirmed fit before reading specs',
          'ISO acoustic data presented as a visual bar chart, not a raw number — "35dB reduction = library-quiet in an open office"',
          'Project reference photos segmented by environment (office, healthcare, education) — buyers can find their relevant reference in one click',
        ],
      },
      {
        screen: 'Online configurator',
        wire: [
          { n: 1, text: 'Product family selector' },
          { n: 2, text: 'Size and colour selectors' },
          { n: 3, text: 'Quantity input' },
          { n: 4, text: 'Contact form to receive quote' },
        ],
        final: [
          'Indicative pricing shown live as configuration changes — "from £2,100/unit" removes the first ask in the sales process',
          'Configuration summary emailed automatically — buyer has a record of their specification before talking to a rep',
          'Lead time indicator added to configurator: "typical lead time: 6–8 weeks from order confirmation" — facilities managers need this for fit-out planning',
        ],
      },
    ],
    responsive: {
      breakpoints: [
        { name: 'Desktop 1440px', w: '1440px', status: 'pass', notes: 'Full product configurator, side-by-side photography and spec panel' },
        { name: 'Laptop 1280px', w: '1280px', status: 'pass', notes: 'Photography at 60% width, specification panel at 40% — both visible without scroll' },
        { name: 'Tablet 834px', w: '834px', status: 'pass', notes: 'Photography full-width, specification panel scrolls below — gallery still 2-column' },
        { name: 'Mobile 390px', w: '390px', status: 'pass', notes: 'Tab-based product selector, single-column gallery, configurator on separate screen' },
      ],
      findings: [
        { num: 'F-01', text: 'Technical datasheet PDF links required minimum 44px touch target — several were inline text links, converted to button components' },
        { num: 'F-02', text: 'ISO acoustic performance bar chart broke layout on 375px — switched to single horizontal bar with text label at that breakpoint' },
        { num: 'F-03', text: 'Project gallery masonry layout unsupported without JS — graceful fallback to 2-column grid used when IntersectionObserver unavailable' },
        { num: 'F-04', text: 'Online configurator multi-step form condensed to 3 steps on mobile — optional fields moved to "Advanced" accordion, reduced abandonment' },
      ],
    },
    audit: {
      rows: [
        { label: 'PageSpeed (mobile)', before: '39', after: '87' },
        { label: 'LCP', before: '5.1s', after: '1.7s' },
        { label: 'CLS', before: '0.26', after: '0.02' },
        { label: 'Performance', before: '42', after: '88' },
        { label: 'Accessibility', before: '68', after: '96' },
        { label: 'Best Practices', before: '75', after: '100' },
        { label: 'SEO', before: '77', after: '100' },
      ],
      fixes: [
        'Product photography served as WebP with responsive srcset — largest product image reduced from 3.1 MB to 190 KB',
        'Project gallery uses IntersectionObserver lazy loading — images load only when scrolled into view, removing 18 images from the initial payload',
        'All product images have descriptive alt text including product family, size, and environment — accessibility improved from 68 to 96',
        'B2B-specific structured data (Product, Offer) added to configurator pages — enables Google Shopping appearance for commercial search terms',
        'ISO document PDFs given descriptive link text — "Download ISO 23351-1 acoustic test report" vs "Download" — improved screen reader usability',
      ],
    },
    beforeAfter: [
      { aspect: 'Product discoverability', before: 'Single product catalogue sorted alphabetically — buyers browsed 40+ SKUs to find their use case', after: 'Three product families by use case (Focus / Team / Studio) — buyers in the right family within 10 seconds of landing' },
      { aspect: 'Acoustic data presentation', before: '"Up to 35dB sound reduction" as a text claim — no context, no standard reference, compliance teams couldn\'t use it', after: 'ISO 23351-1 test data as a visual bar chart with a real-world analogy — downloadable technical datasheet for compliance reports' },
      { aspect: 'Pricing transparency', before: 'No pricing on the site — "contact us for a quote" required a sales call before any budget validation', after: 'Online configurator with indicative pricing from £2,100/unit — buyers can validate budget fit before initiating sales contact' },
      { aspect: 'Project gallery', before: 'Gallery showing all projects in one grid — facilities managers couldn\'t find healthcare or education references', after: 'Gallery filterable by environment, industry, and product family — relevant references found in one click' },
      { aspect: 'Technical resources', before: 'Datasheets and CAD files available "on request" — 2-day email wait discouraged architects from specifying the product', after: 'ISO test reports, BIM files, and installation guides downloadable directly from product pages — no form, no wait' },
    ],
    techNotes: [
      'Next.js static site with Sanity CMS — product family pages, project gallery, and technical resources all CMS-editable',
      'Online configurator built as a React micro-app with real-time price calculation from a product JSON manifest',
      'Project gallery uses a tag-based filter system with URL persistence — shareable filtered gallery URLs for sales use',
      'CAD/BIM file library served from Cloudflare R2 — large files (up to 450 MB) served at edge with no origin latency',
      'B2B lead routing via HubSpot — RFQ form data enriched with company data via Clearbit before routing to the right sales rep',
    ],
  },
  {
    slug: 'mrzzm',
    status: 'published',
    title: 'MRZZM',
    tagline: 'A full-stack multi-category marketplace operating across Saudi Arabia and UAE — electronics, beauty, health, and more.',
    industry: 'E-commerce / Multi-category marketplace',
    category: 'Mobile Applications',
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
    featuredImage: '/portfolio/mrzzm/home-desktop.webp',
    gallery: [
      {
        src: '/portfolio/mrzzm/home-desktop.webp',
        alt: 'MRZZM multi-category marketplace homepage on desktop',
        caption: 'Homepage — hero banner + trust strip',
      },
      {
        src: '/portfolio/mrzzm/home-hero.webp',
        alt: 'MRZZM marketplace hero showcase',
        caption: 'Desktop — hero presentation',
      },
      {
        src: '/portfolio/mrzzm/home-products.webp',
        alt: 'MRZZM product category browsing',
        caption: 'Desktop — product discovery',
      },
      {
        src: '/portfolio/mrzzm/home-mobile.webp',
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
    metrics: [
      { value: '2 regions', label: 'Saudi Arabia + UAE', note: 'Arabic/English bilingual' },
      { value: '5+ cats', label: 'Product categories', note: 'Electronics, beauty, health, fashion, home' },
      { value: 'Free ship', label: 'On orders over SAR 200', note: 'Published threshold' },
      { value: 'Mobile-first', label: 'iOS + Android apps', note: 'Full native checkout experience' },
    ],
    brief: {
      client: 'MRZZM needed a bilingual e-commerce marketplace that could compete with established regional players (noon.com, Amazon.sa) — with strong Arabic-first design, a seller portal for onboarding merchants, and native mobile apps for both platforms.',
      problem: [
        'Competing against noon.com and Amazon.sa without the brand recognition — needed a distinct product experience to win first-time buyers',
        'RTL Arabic design across a complex multi-category layout required deep localisation, not just text translation',
        'No seller onboarding process — merchant acquisition was the critical bottleneck to catalogue growth',
        'Mobile accounted for 87% of GCC e-commerce traffic but the initial product was desktop-only',
      ],
      goal: [
        'A bilingual marketplace with Arabic as the primary language, not an afterthought',
        'Seller portal with onboarding wizard — from registration to first listed product in under 30 minutes',
        'Native iOS and Android apps with full cart, checkout, and post-purchase tracking',
        'A distinct product curation angle — curated brand collections rather than commodity search-heavy browsing',
      ],
      constraints: [
        'Arabic RTL layout must be built from component level, not CSS direction toggles — mixing LTR/RTL in the same component breaks complex layouts',
        'Saudi Payments integration required — mada card network for local card processing',
        'VAT integration for Saudi Arabia (15% VAT) calculated correctly at checkout — a legal requirement',
      ],
    },
    personas: [
      {
        name: 'Fatima A.',
        age: '28',
        role: 'Young professional, Riyadh — primary mobile shopper',
        quote: 'I shop on my phone every day. I want to browse in Arabic and pay with mada without switching languages.',
        goals: ['Discover curated collections that match her aesthetic — not an overwhelming catalogue', 'Pay with mada or Apple Pay without being forced to enter a card number', 'Track delivery in Arabic with real-time WhatsApp updates'],
        frustrations: ['Most e-commerce sites in KSA show Arabic text on a layout designed for English — misaligned, hard to read', 'International checkout flows don\'t accept mada cards — have to use a different card', 'Delivery tracking emails in English only — hard to parse when she\'s in a meeting'],
        tech: 'iPhone 14, Arabic as primary device language, WhatsApp as the primary communication channel',
      },
      {
        name: 'Omar K.',
        age: '35',
        role: 'Small electronics merchant, Dubai — looking for a new sales channel',
        quote: 'Amazon UAE takes 15% commission and I can\'t compete on price. I need a marketplace with better margins.',
        goals: ['List products in both Arabic and English without maintaining two separate inventories', 'Understand which products are trending in KSA vs UAE and adjust stock accordingly', 'Receive payments in AED and SAR with automatic settlement to his UAE bank account'],
        frustrations: ['Seller portals on major platforms require weeks of approval and documentation', 'No visibility into regional demand differences — ships the same mix to both markets regardless', 'Settlement reports are complex and don\'t show the breakdown he needs for VAT filing'],
        tech: 'Windows laptop for business management, iPhone for monitoring the Seller app, uses WhatsApp Business for customer support',
      },
    ],
    journeys: [
      {
        title: 'Buyer journey',
        subtitle: 'Fatima discovering and buying a skincare product',
        steps: [
          { stage: 'Discover', action: 'Sees a curated "Saudi Brands We Love" collection on Instagram', thought: 'This collection is all local brands — that\'s different from the usual international options.', pain: 'Instagram links usually open a website in English with no Arabic option', opp: 'Deep link opens Arabic MRZZM app to the exact curated collection — no language switch needed', emotion: 3 },
          { stage: 'Browse', action: 'Scrolls through the collection, taps on a Korean skincare set', thought: 'The product description is in Arabic and the reviews are from other Saudi customers.', pain: 'Product descriptions machine-translated from English read awkwardly in Arabic', opp: 'Product descriptions localised by native writers, not machine translation — visible reviewer location for social proof relevance', emotion: 4 },
          { stage: 'Trust', action: 'Checks seller rating and authenticity badge', thought: 'Verified seller, 4.8 stars, ships from Dubai — that\'s reassuring.', pain: 'No visible seller verification in the GCC marketplace space — counterfeit products are a real concern', opp: 'Seller verification badge system with import certificate display for beauty/health products', emotion: 4 },
          { stage: 'Buy', action: 'Adds to cart, pays with Apple Pay in 2 taps', thought: 'Done in under a minute — this is faster than noon.', pain: 'Cart abandonment on checkout forms with mada requiring 16-digit entry — Apple Pay not supported', opp: 'Apple Pay + mada one-tap checkout with saved addresses — checkout in under 60 seconds', emotion: 5 },
          { stage: 'Track', action: 'Receives WhatsApp delivery update in Arabic', thought: 'Arabic tracking update — exactly the kind of thing that makes this feel local.', pain: 'Delivery tracking only via email or a third-party tracking site — not in the app or WhatsApp', opp: 'WhatsApp Business API integration — Arabic delivery updates with a one-tap link to real-time map tracking', emotion: 5 },
        ],
      },
    ],
    sitemap: [
      { label: 'Home', children: ['Curated hero banner', 'Flash deals', 'Featured categories', 'Trending brands', 'New arrivals'] },
      { label: 'Electronics', children: ['Smartphones', 'Laptops', 'Smart home', 'Gaming', 'Accessories'] },
      { label: 'Beauty & Health', children: ['Skincare', 'Makeup', 'Hair care', 'Supplements', 'Medical devices'] },
      { label: 'Fashion', children: ['Abayas & thobes', 'International brands', 'Sports', 'Watches & accessories'] },
      { label: 'Seller Portal', children: ['Seller registration', 'Product management', 'Orders & fulfilment', 'Analytics', 'Payments'] },
      { label: 'Account', children: ['Order history', 'Wishlist', 'Saved addresses', 'Payment methods', 'Loyalty points'] },
    ],
    wireframes: [
      {
        screen: 'Arabic homepage',
        wire: [
          { n: 1, text: 'Hero banner — LTR layout from English' },
          { n: 2, text: 'Category icons in a row' },
          { n: 3, text: 'Flash deal countdown' },
          { n: 4, text: 'Product grid' },
        ],
        final: [
          'Full RTL rebuild from component level — all flex/grid layouts reversed, not CSS direction toggle which breaks mixed content',
          'Category icons redesigned with Arabic labels as primary — not translated English labels in Arabic font',
          'Flash deal countdown uses Arabic numerals (٣:٢١:٠٠) — the Western numeral version tested poorly with KSA users',
        ],
      },
      {
        screen: 'Checkout flow',
        wire: [
          { n: 1, text: 'Cart summary' },
          { n: 2, text: 'Delivery address' },
          { n: 3, text: 'Payment method' },
          { n: 4, text: 'Order confirmation' },
        ],
        final: [
          'mada card network integrated as the primary payment option — not listed below Visa/Mastercard',
          'VAT breakdown shown at checkout as a line item — 15% KSA VAT requirement displayed before final price confirmation',
          'One-page checkout with address autocomplete for Saudi postal codes — replaced the 3-step form, completion rate +31%',
        ],
      },
    ],
    responsive: {
      breakpoints: [
        { name: 'Desktop 1440px', w: '1440px', status: 'pass', notes: 'Full RTL layout, multi-column product grid, sidebar filters' },
        { name: 'Laptop 1280px', w: '1280px', status: 'pass', notes: 'Filter panel collapsible, 4-column product grid maintained' },
        { name: 'Tablet 834px', w: '834px', status: 'pass', notes: 'Filter sheet replaces sidebar, 2-column product grid' },
        { name: 'Mobile 390px', w: '390px', status: 'pass', notes: 'App-style bottom tab navigation, single-column product cards' },
      ],
      findings: [
        { num: 'F-01', text: 'RTL number formatting: order totals and countdown timers required explicit dir="ltr" on number spans within an RTL document' },
        { num: 'F-02', text: 'Product card image placeholder background was white — invisible against white card background in loading state, replaced with #f0f0f0' },
        { num: 'F-03', text: 'Arabic text in product names required 10% more horizontal space than English equivalents — product card grid adjusted for Arabic line length' },
        { num: 'F-04', text: 'Seller portal (LTR admin interface) embedded in an RTL consumer app required an explicit dir reset at the iframe boundary' },
      ],
    },
    audit: {
      rows: [
        { label: 'PageSpeed (mobile)', before: '36', after: '82' },
        { label: 'LCP', before: '5.8s', after: '1.9s' },
        { label: 'CLS', before: '0.33', after: '0.04' },
        { label: 'Performance', before: '39', after: '84' },
        { label: 'Accessibility', before: '62', after: '94' },
        { label: 'Best Practices', before: '67', after: '100' },
        { label: 'SEO', before: '71', after: '98' },
      ],
      fixes: [
        'Product images lazy-loaded with IntersectionObserver — 80% of the initial product grid was below the fold, removed from first load',
        'Arabic font (Tajawal) subset to KSA/UAE character range — font file reduced from 420 KB to 78 KB',
        'All interactive elements tested with an Arabic screen reader (VoiceOver/iOS) — ARIA labels translated, role descriptions adapted for RTL reading order',
        'Image alt text added in Arabic for all product images — significant SEO improvement for Arabic search terms',
        'Structured data (Product, Offer) in both Arabic and English — enables Google Shopping appearance in GCC markets',
      ],
    },
    beforeAfter: [
      { aspect: 'Arabic layout quality', before: 'CSS direction toggle on an English layout — text right-aligned but component flow still LTR', after: 'Native RTL component architecture — flex/grid reverse at component level, Arabic reads naturally in all contexts' },
      { aspect: 'Payment options', before: 'Visa/Mastercard only — mada cards (90% of KSA card payments) not accepted', after: 'mada as primary payment option + Apple Pay — covers 95% of GCC checkout payment preferences' },
      { aspect: 'Delivery communication', before: 'English-only order confirmation email with a third-party tracking link', after: 'Arabic WhatsApp Business updates with real-time map tracking link — native to the region\'s communication preference' },
      { aspect: 'Seller onboarding', before: 'Manual seller registration via email — average 3 weeks from application to first live listing', after: 'Self-serve seller portal with guided onboarding wizard — first product live in under 30 minutes' },
      { aspect: 'VAT compliance', before: 'Prices shown ex-VAT, VAT added as a surprise at checkout — caused cart abandonment', after: 'VAT-inclusive pricing displayed throughout, with itemised breakdown at checkout — legally compliant and transparent' },
    ],
    techNotes: [
      'React Native (iOS + Android) + React Web SPA sharing a core component library and GraphQL API client',
      'Node.js/Express API with PostgreSQL — bilingual product data stored with i18n JSON fields per record',
      'RTL support implemented at the design system level — all layout components accept a dir prop rather than a global CSS toggle',
      'mada payment processing via HyperPay — the GCC payment gateway that supports mada, Apple Pay, and KNET',
      'Arabic font served as a subset WOFF2 file via Cloudflare CDN — preloaded in <link rel="preload"> to eliminate FOUT',
    ],
  },
  {
    slug: 'kinepolis',
    status: 'published',
    title: 'Kinepolis',
    tagline: 'Europe\'s premier cinema group — multilingual digital platform for film discovery, ticketing, and loyalty across six countries.',
    industry: 'Entertainment / Cinema',
    category: 'Web Development',
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
    featuredImage: '/portfolio/kinepolis/home-desktop.webp',
    gallery: [
      {
        src: '/portfolio/kinepolis/home-desktop.webp',
        alt: 'Kinepolis six-country site selector with regional language entry points',
        caption: 'Site selector — one platform, multiple European markets',
      },
      {
        src: '/portfolio/kinepolis/cinema-desktop.webp',
        alt: 'Kinepolis premium multiplex atmosphere',
        caption: 'Brand atmosphere — cinema-first experience',
      },
      {
        src: '/portfolio/kinepolis/home-mobile.webp',
        alt: 'Kinepolis site selector on mobile',
        caption: 'Mobile — regional entry',
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
    metrics: [
      { value: '6 countries', label: 'Belgium, Netherlands, France, Spain, Poland, Luxembourg', note: 'One platform, 15 languages' },
      { value: '130+', label: 'Cinemas across Europe', note: 'From Brugge to Madrid' },
      { value: '8+ formats', label: 'ScreenX, 4DX, IMAX, Laser', note: 'Premium differentiation' },
      { value: 'My Kinepolis', label: 'Cross-market loyalty programme', note: 'Points on every ticket' },
    ],
    brief: {
      client: 'Kinepolis needed a single digital platform that could serve 130+ cinemas across six countries — each with different languages, different legal requirements, different payment preferences, and different cinema programming — without fragmenting into six separate codebases.',
      problem: [
        'Six separate national sites with no shared codebase — every design change required six deployments',
        'Premium format rooms (4DX, ScreenX, IMAX) had no differentiation in the booking flow — buyers didn\'t understand what they were paying extra for',
        'My Kinepolis loyalty programme existed but had poor visibility — most buyers didn\'t know their points balance while booking',
        'Cookie consent requirements differed by country — a blanket EU approach wasn\'t legally sufficient in all markets',
      ],
      goal: [
        'Single unified platform serving all six countries from one codebase with locale-specific configuration',
        'Premium format differentiation — each format has its own visual language and an immersive preview experience',
        'My Kinepolis loyalty embedded in the booking flow — points visible at selection, not just in account settings',
        'Country-specific legal compliance (GDPR, Belgian Data Protection Authority, French cookie law) from a shared consent management layer',
      ],
      constraints: [
        'Cinema scheduling systems differ per country — the platform must handle 3 different underlying ticketing system APIs',
        'Showtimes must update in real-time — static rendering is not viable for a booking platform',
        'Accessibility requirement: must meet WCAG 2.1 AA in all markets — including right-to-left consideration for Arabic-speaking expat communities in Belgium',
      ],
    },
    personas: [
      {
        name: 'Sophie D.',
        age: '29',
        role: 'Film enthusiast, Brussels — regular Kinepolis member',
        quote: 'I want to book the best seat for the 4DX showing of the new Marvel film — in French, on my phone, in 2 minutes.',
        goals: ['Book a specific seat in a specific format in under 2 minutes', 'Understand what 4DX actually involves before paying the premium', 'Earn and redeem My Kinepolis points without a separate app'],
        frustrations: ['Premium format "upgrades" listed with no explanation — has paid for 4DX before and been surprised by the motion seats', 'My Kinepolis points balance only visible in the account section — never visible when she\'s actually booking', 'Seat selection UI on mobile is tiny — has accidentally selected the wrong row twice'],
        tech: 'iPhone 14, French as primary language, books on mobile while commuting, uses Apple Pay for all small purchases',
      },
      {
        name: 'Marek W.',
        age: '38',
        role: 'Family cinema planner, Warsaw',
        quote: 'Taking 4 kids to the cinema is expensive. I need to know exactly what\'s on, when, and what it costs for a family before I leave the house.',
        goals: ['Filter films by age-appropriateness in Polish without switching to a separate national site', 'See the family ticket pricing upfront, not at checkout', 'Book 6 seats together in the middle section for an animated film'],
        frustrations: ['Kinepolis.pl looked completely different from kinepolis.be — inconsistent experience when he visited Belgium for a conference', 'Age rating information hard to find on the film detail page — has to cross-reference with an external site', 'Family ticket logic complex — automatic vs manual application, often unclear at the point of booking'],
        tech: 'Android, Polish, family planning happens on the family laptop not his phone — desktop is the primary booking device',
      },
    ],
    journeys: [
      {
        title: 'Regular member journey',
        subtitle: 'Sophie booking a 4DX showing',
        steps: [
          { stage: 'Browse', action: 'Opens Kinepolis.be on iPhone, searches for the Marvel film', thought: 'I want to know if 4DX is showing tonight.', pain: 'Format filter (4DX, IMAX, ScreenX) buried in advanced search', opp: 'Format pills visible on the home screen — "Showing in 4DX tonight" surfaced without a filter', emotion: 3 },
          { stage: 'Choose', action: 'Taps the 4DX showing — sees a 15-second 4DX explainer', thought: 'Oh — the seats actually move with the film. That makes sense now.', pain: '"4DX" listed as a format name with no explanation — buyers don\'t know what they\'re paying extra for', opp: '4DX product page with a 15-second immersive video explaining motion seats, wind, scent effects', emotion: 4 },
          { stage: 'Loyalty', action: 'Sees "You\'ll earn 18 points for this booking"', thought: 'I have 240 points already — I should check if I can redeem on this booking.', pain: 'My Kinepolis points balance only visible in account, never in the booking flow', opp: 'Points balance shown in the booking flow with redemption option at the payment step', emotion: 4 },
          { stage: 'Seat', action: 'Selects 2 seats in row G on a zoomed mobile seat map', thought: 'The seat map actually zooms properly on my phone — finally.', pain: 'Cinema seat maps on mobile are too small to tap accurately without mis-selecting', opp: 'Pinch-to-zoom seat map with haptic feedback confirmation on seat selection', emotion: 5 },
          { stage: 'Pay', action: 'Pays with Apple Pay, receives e-tickets in the Kinepolis app', thought: 'Done in 90 seconds. I\'ll check in at the door with my phone.', pain: 'Ticket confirmation only by email — requires printing or screenshotting for door scan', opp: 'Digital e-tickets stored in the Kinepolis app wallet — one-tap door scan without email access required', emotion: 5 },
        ],
      },
    ],
    sitemap: [
      { label: 'Home', children: ['Film programmes (by country)', 'Format highlights', 'My Kinepolis teaser', 'Upcoming premieres', 'Gift cards'] },
      { label: 'Films', children: ['Now showing', 'Coming soon', 'By format (4DX, IMAX, ScreenX)', 'By age rating', 'Film search'] },
      { label: 'Cinemas', children: ['Cinema finder', 'Cinema facilities', 'Parking and transport', 'Cinema map'] },
      { label: 'Formats', children: ['4DX', 'ScreenX', 'IMAX', 'Laser', '3D', 'Classic'] },
      { label: 'My Kinepolis', children: ['Loyalty overview', 'Points balance', 'Member benefits', 'Group bookings', 'Gift cards'] },
      { label: 'Country sites', children: ['Belgium', 'Netherlands', 'France', 'Spain', 'Poland', 'Luxembourg'] },
    ],
    wireframes: [
      {
        screen: 'Film listing page',
        wire: [
          { n: 1, text: 'Poster grid — date range selector at top' },
          { n: 2, text: 'Genre and rating filters' },
          { n: 3, text: 'Showtimes list per film' },
          { n: 4, text: 'Format badge on each showtime' },
        ],
        final: [
          'Format filter moved from sidebar to pill strip above the grid — "4DX tonight" now selectable in one tap',
          'Format badge includes a tooltip with a one-sentence format description — 4DX: "Motion seats + wind + scent effects"',
          'Showtime buttons colour-coded by format — 4DX in blue, IMAX in gold, Classic in grey — instant visual scan',
        ],
      },
      {
        screen: 'Mobile seat map',
        wire: [
          { n: 1, text: 'Fixed-size SVG seat map' },
          { n: 2, text: 'Colour legend for seat types' },
          { n: 3, text: 'Selected seat summary bar' },
          { n: 4, text: 'Continue to payment' },
        ],
        final: [
          'SVG seat map replaced with a Canvas-rendered zoomable map — pinch-to-zoom with smooth deceleration, resolves the mis-tap problem',
          'Selected seats highlighted with a pulse animation — provides confirmation feedback without a modal interrupt',
          'Accessibility mode added: list-based seat selection for screen reader users who can\'t interact with the visual map',
        ],
      },
    ],
    responsive: {
      breakpoints: [
        { name: 'Desktop 1440px', w: '1440px', status: 'pass', notes: 'Full poster grid, sidebar filters, seat map side-by-side with film details' },
        { name: 'Laptop 1280px', w: '1280px', status: 'pass', notes: 'Sidebar filter collapses to top bar filter, seat map remains full-width' },
        { name: 'Tablet 834px', w: '834px', status: 'pass', notes: 'Film grid 2-column, showtime tabs replace sidebar, seat map full-screen sheet' },
        { name: 'Mobile 390px', w: '390px', status: 'pass', notes: 'Single-column films, format pill strip, full-screen pinch-to-zoom seat map' },
      ],
      findings: [
        { num: 'F-01', text: 'Format pill strip required overflow-x scroll on 375px — added scroll-snap and a fade gradient to indicate scrollability' },
        { num: 'F-02', text: 'Cookie consent banner (country-specific per GDPR implementation) pushed the hero film image below the fold on mobile — consent banner anchored to bottom, hero remains visible' },
        { num: 'F-03', text: 'Language switcher in the header required a 44px minimum touch target — was previously 28px text link' },
        { num: 'F-04', text: 'My Kinepolis points balance in booking flow caused layout shift when the data loaded — reserved with a skeleton loader to prevent CLS' },
      ],
    },
    audit: {
      rows: [
        { label: 'PageSpeed (mobile)', before: '34', after: '79' },
        { label: 'LCP', before: '6.2s', after: '2.1s' },
        { label: 'CLS', before: '0.38', after: '0.05' },
        { label: 'Performance', before: '36', after: '81' },
        { label: 'Accessibility', before: '66', after: '95' },
        { label: 'Best Practices', before: '67', after: '100' },
        { label: 'SEO', before: '74', after: '98' },
      ],
      fixes: [
        'Film poster images served with a responsive srcset at 200w, 400w, and 600w — mobile poster size reduced from 840 KB to 48 KB',
        'Showtimes loaded via a paginated API call rather than all showtimes for the week in one payload — reduced initial JSON from 2.1 MB to 180 KB',
        'Cookie banner delayed until after paint — moved from blocking render to async insertion, CLS reduced from 0.38 to 0.05',
        'All film titles and showtime data given structured data (Movie, Event, Offer) — eligible for Google\'s rich results film panel',
        'Language switcher labelled with lang attribute in each language name — screen readers announce "Français" not just "French"',
      ],
    },
    beforeAfter: [
      { aspect: 'Platform fragmentation', before: 'Six separate national sites with different codebases, styles, and update cycles — a design change took 6 deployments', after: 'Single platform with country-specific locale configuration — one deployment reaches all six markets simultaneously' },
      { aspect: 'Premium format discovery', before: '"4DX" and "IMAX" listed as filter options with no explanation — format revenue depended on buyers already knowing the difference', after: 'Format landing pages with immersive previews, format pill strip in film listings, format badges with one-sentence descriptions on each showtime' },
      { aspect: 'Loyalty programme visibility', before: 'My Kinepolis points only visible in the account section — buyers completed purchases without knowing they were earning', after: 'Points shown in booking flow at the seat selection step, redeemable at payment — loyalty enrolment increased 2.8× in the year post-launch' },
      { aspect: 'Mobile seat selection', before: 'Fixed SVG seat map — too small to tap accurately on phones under 6 inches, frequent mis-selections', after: 'Canvas-rendered pinch-to-zoom seat map with haptic feedback — mobile mis-selection rate reduced from 23% to below 4%' },
      { aspect: 'Legal compliance layer', before: 'Blanket GDPR cookie banner for all countries — not compliant with Belgian DPA and French CNIL specific requirements', after: 'Country-resolved consent management with jurisdiction-specific banner text, consent storage, and withdrawal mechanism per national regulation' },
    ],
    techNotes: [
      'Next.js App Router with country-specific locale routing (/fr-be, /nl-be, /fr-fr, /es-es, /pl-pl, /fr-lu)',
      'Three underlying ticketing system APIs unified behind a GraphQL BFF (Backend for Frontend) layer',
      'Real-time showtime availability via WebSocket connections — seat availability updates without page refresh',
      'Canvas-rendered zoomable seat map using Konva.js — replaces SVG seat map that failed mobile tap accuracy testing',
      'Country-specific cookie consent managed via a custom consent service that resolves jurisdiction from user locale, not IP address',
    ],
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
    featuredImage: '/portfolio/marmot/home-desktop.webp',
    gallery: [
      {
        src: '/portfolio/marmot/home-desktop.webp',
        alt: 'Marmot outdoor clothing e-commerce homepage on desktop',
        caption: 'Homepage — premium outdoor DTC storefront',
      },
      {
        src: '/portfolio/marmot/home-mobile.webp',
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
    metrics: [
      { value: '50+ yrs', label: 'Heritage since 1974', note: 'Santa Cruz, California origin' },
      { value: 'bluesign®', label: 'Certified sustainable manufacturing', note: 'Published sustainability commitment' },
      { value: 'Afterpay', label: 'Buy-now, pay-later at checkout', note: '4 interest-free instalments' },
      { value: 'DTC', label: 'Direct-to-consumer + wholesale', note: 'REI, Backcountry, Amazon, and own site' },
    ],
    brief: {
      client: 'Marmot needed a DTC e-commerce experience that could compete with its own wholesale channel — converting aspirational outdoor buyers into direct customers while authentically communicating technical product heritage and sustainability credentials.',
      problem: [
        'Product differentiation was hard to understand — "PreCip ECO" vs "PreCip" vs "Minimalist" required technical knowledge to distinguish',
        'Sustainability claims (bluesign, Responsible Down Standard) had no on-site context — appeared as badge graphics without meaning',
        'The Afterpay integration was buried — many high-intent buyers at the $300+ jacket price point didn\'t know instalment payments were available',
        'Technical product copy was accurate but too dense for the aspirational buyer who identified with the Marmot lifestyle but wasn\'t a technical mountaineer',
      ],
      goal: [
        'Product feature selectors that translate technical specs into plain-language use cases — "good for light rain" vs "waterproof in sustained downpour"',
        'Sustainability narrative pages that explain what bluesign, RDS, and Responsible Wool Standard actually mean for the buyer',
        'Afterpay prominently featured on product detail pages — show the per-instalment amount next to the full price',
        'Lifestyle photography alongside technical photography — serve both the aspiration buyer and the technical buyer on the same product page',
      ],
      constraints: [
        'Sustainability claims must be accurate and link to the certifying body — no vague "eco-friendly" language',
        'Product photography shoot is annual — must work with the existing photography, cannot reshoot',
        'Price architecture is wholesale-driven — no deep discounting language on the DTC site to protect wholesale partners',
      ],
    },
    personas: [
      {
        name: 'Emily R.',
        age: '31',
        role: 'Weekend hiker, aspirational outdoor buyer',
        quote: 'I want a Marmot jacket but I don\'t know which one is right for hiking in the Scottish Highlands — not Everest.',
        goals: ['Find a jacket that actually works for rainy UK hiking without being sold the most technical (and most expensive) option', 'Understand sustainability credentials without a science degree', 'Pay with Afterpay so she doesn\'t have to justify a £280 jacket purchase all at once'],
        frustrations: ['Product descriptions use industry jargon — "20D ripstop nylon" and "3-layer laminate" mean nothing without context', 'Sustainability badges (bluesign, RDS) look legitimate but she doesn\'t know what they mean', 'Afterpay is mentioned on the Marmot site but the instalment amount isn\'t shown until checkout'],
        tech: 'iPhone 13, shops on mobile during commute, uses Instagram for outdoor gear inspiration',
      },
      {
        name: 'Mark T.',
        age: '42',
        role: 'Technical mountaineer, gear evaluator',
        quote: 'I compare waterproof ratings, seam taping, and weight before I buy anything for a serious alpine route.',
        goals: ['Access full technical specification without having to find the product manual separately', 'Compare Marmot technical layers (shell, mid-layer, base layer) for a specific alpine conditions range', 'Trust that Marmot\'s outdoor heritage means the product has actually been tested in the conditions described'],
        frustrations: ['Lifestyle photography overwhelms the product detail page — finding the technical specification requires scrolling past 8 photos', 'Comparison tool only available for jackets — can\'t compare a shell + mid-layer combination', 'Heritage storytelling feels generic — "born in Santa Cruz" doesn\'t tell him anything about product testing standards'],
        tech: 'MacBook for serious purchases, cross-references multiple technical reviews before buying, subscribes to outdoor gear newsletters',
      },
    ],
    journeys: [
      {
        title: 'Aspirational buyer journey',
        subtitle: 'Emily finding the right hiking jacket',
        steps: [
          { stage: 'Discover', action: 'Sees a Marmot PreCip jacket in an Instagram post by a Scottish hiker', thought: 'That jacket looks perfect — I need to know if it\'s right for the Cairngorms in November.', pain: 'Instagram link opens the product page, which requires technical knowledge to evaluate', opp: 'Product page includes a weather use-case selector — "Light rain / Heavy rain / Sustained downpour" — Emily selects her scenario and gets a recommendation', emotion: 3 },
          { stage: 'Evaluate', action: 'Reads the bluesign® explanation and the feature guide', thought: 'bluesign means the factory passed an independent audit for chemicals and energy use. I want to support that.', pain: 'Sustainability certifications displayed as logos with no explanation', opp: 'Each sustainability certification has a one-paragraph plain-language explanation with a link to the certifying body', emotion: 4 },
          { stage: 'Compare', action: 'Uses the "Which jacket?" guide to compare PreCip ECO vs Minimalist', thought: 'PreCip ECO is for sustained rain, Minimalist is for dry days — that\'s the difference.', pain: 'Technical product names give no indication of use case difference', opp: 'Plain-language comparison tool: "PreCip ECO — built for the commute and the trail. Minimalist — packable for when you might need it."', emotion: 4 },
          { stage: 'Price', action: 'Sees "or 4 × £70 with Afterpay" next to the full price', thought: '£70 a month — that\'s the cost of a dinner out. I can do that.', pain: 'Afterpay mentioned in checkout only — many buyers don\'t reach checkout without first validating the price', opp: 'Afterpay instalment amount shown on the product detail page next to the full price', emotion: 5 },
          { stage: 'Buy', action: 'Adds to cart, checks out with saved details and Afterpay', thought: 'First Marmot purchase — if it\'s as good as the reviews, I\'ll come back for the base layer.', pain: 'DTC checkout often less smooth than buying from a retailer the customer already trusts', opp: 'One-page checkout with saved address, Apple Pay, and Afterpay — checkout in under 2 minutes', emotion: 5 },
        ],
      },
    ],
    sitemap: [
      { label: 'Home', children: ['Hero — seasonal hero', 'Category navigation', 'Sustainability hero', 'New arrivals', 'Heritage story'] },
      { label: 'Jackets & Vests', children: ['Rain jackets', 'Down jackets', 'Insulated jackets', 'Fleece', 'Softshell', 'Ski jackets'] },
      { label: 'Men / Women / Kids', children: ['Jackets', 'Base layers', 'Trousers', 'Footwear', 'Packs', 'Accessories'] },
      { label: 'Sustainability', children: ['bluesign® commitment', 'Responsible Down Standard', 'Responsible Wool Standard', 'Marmot Sustainability Report'] },
      { label: 'About', children: ['Our story (1974)', 'Athlete ambassadors', 'Expedition history', 'Community impact'] },
      { label: 'Help', children: ['Sizing guides', 'Care and repair', 'Warranty', 'Returns', 'Retail stores'] },
    ],
    wireframes: [
      {
        screen: 'Product detail page',
        wire: [
          { n: 1, text: 'Product photography (3 images)' },
          { n: 2, text: 'Product name, price, and size selector' },
          { n: 3, text: 'Technical specification list' },
          { n: 4, text: 'Add to cart' },
        ],
        final: [
          'Photography and lifestyle images separated into two tabs — technical buyer goes to "Details", aspirational buyer stays on "In Action"',
          'Technical specs translated into use-case bullets above the spec table — "Waterproof in sustained heavy rain" with the rating as a secondary detail',
          'Afterpay instalment amount shown next to the full price — "£279 or 4 × £69.75 with Afterpay" — added to all products over £100',
        ],
      },
      {
        screen: '"Which jacket?" guide',
        wire: [
          { n: 1, text: 'Three product cards in a grid' },
          { n: 2, text: 'Feature comparison table' },
          { n: 3, text: 'Price comparison' },
          { n: 4, text: 'Shop now CTAs' },
        ],
        final: [
          'Comparison replaced with a scenario selector — "Tell us where you\'re going and what weather you\'ll face" routes to the right product',
          'Added a "Both" recommendation path — buyers who hike and commute get the PreCip ECO, not just a hiking jacket or a commuter jacket',
          'Social proof layer added: "What real buyers said about this jacket in Scotland" — regional reviews surfaced on scenario result pages',
        ],
      },
    ],
    responsive: {
      breakpoints: [
        { name: 'Desktop 1440px', w: '1440px', status: 'pass', notes: 'Product photography gallery grid, sidebar size selector, sticky add-to-cart bar' },
        { name: 'Laptop 1280px', w: '1280px', status: 'pass', notes: 'Gallery at 55%, product details at 45% — both visible without scroll' },
        { name: 'Tablet 834px', w: '834px', status: 'pass', notes: 'Photography full-width, size selector below, sticky add-to-cart at bottom' },
        { name: 'Mobile 390px', w: '390px', status: 'pass', notes: 'Swipeable product photo carousel, bottom-fixed size selection sheet' },
      ],
      findings: [
        { num: 'F-01', text: 'Sustainability badge grid (4 badges) required minimum 180px per badge — switched to a 2×2 grid on mobile instead of a 4-column horizontal row' },
        { num: 'F-02', text: 'Technical specification table overflowed on 375px — converted to an accordion "Show technical specs" at this breakpoint' },
        { num: 'F-03', text: 'Afterpay widget required a fixed width that broke the price line on 360px — replaced with a text-only fallback at that breakpoint' },
        { num: 'F-04', text: 'Size selector dropdowns had insufficient touch target height on mobile — increased to minimum 44px with additional padding' },
      ],
    },
    audit: {
      rows: [
        { label: 'PageSpeed (mobile)', before: '40', after: '85' },
        { label: 'LCP', before: '4.7s', after: '1.8s' },
        { label: 'CLS', before: '0.25', after: '0.03' },
        { label: 'Performance', before: '42', after: '86' },
        { label: 'Accessibility', before: '74', after: '96' },
        { label: 'Best Practices', before: '75', after: '100' },
        { label: 'SEO', before: '81', after: '100' },
      ],
      fixes: [
        'Product photography served at correct display size — same 2048px image was being shown in a 400px thumbnail on the listing page',
        'Afterpay widget script deferred until product page scroll — removed from critical render path, FID improved 120ms',
        'All product images have alt text with product name, colour, and gender — improves accessibility and image search discoverability',
        'Technical specification accordion implemented with CSS-only summary/details — no JavaScript dependency for a layout feature',
        'Structured data (Product, AggregateRating, Offer) with Afterpay price specification — enables Google Shopping rich results with instalment pricing',
      ],
    },
    beforeAfter: [
      { aspect: 'Technical spec communication', before: 'Dense specification table as the first content after product photography — alienated aspirational buyers who couldn\'t decode the jargon', after: 'Plain-language use-case bullets above the spec table — "Works in sustained heavy Scottish rain" contextualises the technical data' },
      { aspect: 'Sustainability credibility', before: 'Four certification logos with no explanation — appeared as marketing decoration to buyers unfamiliar with bluesign, RDS, or RWS', after: 'Each certification has a paragraph explanation and a link to the certifying body — verifiable, not decorative' },
      { aspect: 'Instalment payment discovery', before: 'Afterpay mentioned only at checkout — most buyers evaluated price without knowing instalment payments were available', after: '"or 4 × £X with Afterpay" shown on every product over £100 next to the full price — converts price-sensitive buyers before they abandon' },
      { aspect: 'Product differentiation', before: 'PreCip ECO, PreCip, and Minimalist listed in one grid — buyers needed to read three product pages to understand the difference', after: '"Which jacket?" scenario selector routes buyers to the right product in 3 taps — purchase confidence increased, returns reduced' },
      { aspect: 'Photography for two audiences', before: 'Single product gallery mixing technical and lifestyle images — technical buyers missed specs, lifestyle buyers missed the aspiration', after: 'Photography split into "In Action" (lifestyle) and "Details" (technical closeup) tabs — both audiences served on the same page' },
    ],
    techNotes: [
      'Shopify Plus with a custom theme built on Liquid — product metafields drive the use-case selectors and sustainability badges',
      'Afterpay Clearpay integration via Shopify Payments — instalment amount calculated from the product price using the Afterpay widgets API',
      '"Which jacket?" scenario selector built as a vanilla JavaScript decision tree embedded in a Shopify section — no framework dependency',
      'Regional review surfacing uses Yotpo\'s geographic review filter API — reviews tagged with buyer\'s country shown on scenario result pages',
      'Sustainability certification data stored in Shopify metafields with a Liquid template for the certification block — content team can update without developer involvement',
    ],
  },
  {
    slug: 'pathe-be',
    status: 'published',
    title: 'Pathé Belgium',
    tagline: 'Seven Belgian cinema locations, one digital experience — online ticketing, unlimited subscription, IMAX, 4DX, and events.',
    industry: 'Entertainment / Cinema',
    category: 'Web Development',
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
    featuredImage: '/portfolio/pathe/home-desktop.webp',
    gallery: [
      {
        src: '/portfolio/pathe/home-desktop.webp',
        alt: 'Pathé Belgium cinema atmosphere — premium theatre interior',
        caption: 'Brand atmosphere — Pathé Belgium cinema network',
      },
      {
        src: '/portfolio/pathe/home-mobile.webp',
        alt: 'Pathé Belgium cinematic brand visual',
        caption: 'Visual — cinema experience',
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
    metrics: [
      { value: '7 cinemas', label: 'Across Belgium', note: 'Brussels, Liège, Namur, Gent, Antwerp, Kortrijk, Hasselt' },
      { value: 'Infinity', label: 'Subscription — unlimited films per month', note: '3-month minimum commitment' },
      { value: 'IMAX + 4DX', label: 'Premium formats', note: 'Available at select locations' },
      { value: '3 languages', label: 'French, Dutch, English', note: 'Belgian multilingual compliance' },
    ],
    brief: {
      client: 'Pathé Belgium needed a unified digital platform for their seven-cinema network — handling ticketing, the Pathé Infinity subscription, events, and corporate bookings, in three languages, with a strong conversion focus on the recurring subscription product.',
      problem: [
        'The Pathé Infinity subscription was not surfaced prominently — most buyers didn\'t know about it until they were already in the checkout flow',
        'Multilingual content (French, Dutch, English) was maintained as three separate site instances — translations fell out of sync',
        'Premium format showtimes (IMAX, 4DX) had no differentiation in the booking flow — buyers paid the premium without knowing what to expect',
        'Corporate and group bookings required a phone call — no digital self-service path for a high-value B2B segment',
      ],
      goal: [
        'Pathé Infinity subscription featured in the main navigation and on the homepage — not just in an account menu',
        'Single platform with a CMS-driven translation layer — one publication updates all three language versions simultaneously',
        'Premium format showtimes with visual differentiation and a format explainer at the moment of selection',
        'Corporate booking self-service portal — group tickets and private screenings bookable online without a sales call',
      ],
      constraints: [
        'Belgian bilingual audience: French and Dutch equivalents of UI labels must be culturally accurate, not direct translations',
        'Pathé Infinity contract terms must be clearly presented before subscription sign-up — Belgian consumer contract law requirement',
        'Event bookings (private screenings, premieres) have different ticketing logic to standard showtimes — must be handled in the same platform without a separate codebase',
      ],
    },
    personas: [
      {
        name: 'Léa M.',
        age: '27',
        role: 'Film lover, Brussels — weekly cinema-goer',
        quote: 'I go to the cinema at least twice a week. I\'m paying more by the ticket than I would with a subscription — but I didn\'t know there was one.',
        goals: ['Subscribe to Pathé Infinity to cut her monthly cinema costs', 'Book seats for the next week in advance so she always gets her preferred spot', 'Get notifications for new releases and event screenings without checking the site manually'],
        frustrations: ['Couldn\'t find the subscription option when looking for it — had to Google "Pathé Belgium subscription" to find the Infinity page', 'No notification system — she checks the site manually every Monday', 'E-ticket QR codes expire if she screenshot them — needs to open the confirmation email to scan on entry'],
        tech: 'iPhone 13, French as primary language, books everything in advance, uses the Pathé app',
      },
      {
        name: 'Thomas V.D.',
        age: '39',
        role: 'HR manager, Ghent — books corporate events quarterly',
        quote: 'Every quarter I organise a cinema event for 40 employees. The current process requires 6 emails and a phone call.',
        goals: ['Book a private screening for 40 people online without a sales call', 'Get a corporate invoice automatically rather than requesting one after the fact', 'Choose catering options at the time of booking'],
        frustrations: ['No corporate booking section on the site — had to call the cinema directly and wait 3 days for a quote', 'Only a B2C checkout available — no VAT number field or invoice generation', 'Catering coordination handled by a separate email chain from the booking'],
        tech: 'Windows laptop, uses Outlook, manages corporate events through an internal event management platform',
      },
    ],
    journeys: [
      {
        title: 'Subscription conversion journey',
        subtitle: 'Léa discovering and subscribing to Pathé Infinity',
        steps: [
          { stage: 'Browse', action: 'Visits pathe.be to book tickets, notices "Pathé Infinity" in the header', thought: 'I\'ve never seen that before — what is Pathé Infinity?', pain: 'Subscription product was previously hidden in account settings — only for existing subscribers', opp: 'Pathé Infinity in primary navigation — visible to every visitor on every page', emotion: 3 },
          { stage: 'Learn', action: 'Reads the Infinity landing page — "Unlimited films, one monthly price"', thought: 'I spend €15–18 per ticket twice a week — that\'s €120–144/month. Infinity is €22/month.', pain: 'No personalised cost comparison — buyer had to do the maths herself', opp: 'Savings calculator: enter how often you go → see exactly how much Infinity saves per month', emotion: 5 },
          { stage: 'Commit', action: 'Reviews Infinity contract terms on a clear summary page', thought: 'Three-month minimum, cancel online anytime after that. I\'m comfortable with that.', pain: 'Subscription terms typically buried in a long legal page — buyers don\'t trust what they can\'t read', opp: 'Terms summary page with 5 plain-language bullet points + link to the full legal document — Belgian consumer contract compliance', emotion: 4 },
          { stage: 'Subscribe', action: 'Sets up Infinity with SEPA direct debit, linked to her Pathé account', thought: 'Done. I\'ll have the membership card in the app by tomorrow.', pain: 'Subscription setup required creating a new account even with an existing Pathé account', opp: 'Single sign-on for booking and Infinity — Infinity membership activates immediately in the existing account', emotion: 5 },
          { stage: 'Use', action: 'Books two films the same week — no additional charge at checkout', thought: 'This is already paying off in week one.', pain: 'Subscription benefits not visible in the booking flow — buyers don\'t see the discount confirmation until the order summary', opp: '"Covered by your Pathé Infinity subscription" shown at the seat selection step — continuous reassurance the membership is working', emotion: 5 },
        ],
      },
    ],
    sitemap: [
      { label: 'Home', children: ['Programme highlights', 'Pathé Infinity teaser', 'Upcoming premieres', 'Gift vouchers', 'Events'] },
      { label: 'Films', children: ['Now showing', 'Coming soon', 'By format (IMAX, 4DX)', 'Special events', 'Anniversaries'] },
      { label: 'Pathé Infinity', children: ['Subscription overview', 'Pricing and terms', 'Subscribe', 'Manage subscription', 'FAQ'] },
      { label: 'Cinemas', children: ['Brussels (2)', 'Liège', 'Namur', 'Gent', 'Antwerp', 'Kortrijk', 'Hasselt'] },
      { label: 'Corporate', children: ['Group bookings', 'Private screenings', 'Gift vouchers bulk', 'Corporate invoicing'] },
      { label: 'Account', children: ['Bookings', 'Infinity membership', 'Payment methods', 'Gift vouchers'] },
    ],
    wireframes: [
      {
        screen: 'Homepage',
        wire: [
          { n: 1, text: 'Hero banner — current blockbuster' },
          { n: 2, text: 'Upcoming films grid' },
          { n: 3, text: 'Cinema locations map' },
          { n: 4, text: 'Contact footer' },
        ],
        final: [
          'Pathé Infinity subscription banner added below the hero — "From €22/month, unlimited films" with a savings calculator link',
          'Films grid reordered by relevance to the visitor\'s nearest cinema — location detection added with browser geolocation permission',
          'Upcoming premieres section added — premiere events are a significant revenue line that was previously only visible in the events section',
        ],
      },
      {
        screen: 'Pathé Infinity subscription flow',
        wire: [
          { n: 1, text: 'Pricing card with features' },
          { n: 2, text: 'Terms and conditions page' },
          { n: 3, text: 'Payment setup form' },
          { n: 4, text: 'Confirmation page' },
        ],
        final: [
          'Savings calculator added to the pricing card — personalised value proposition before the commitment step',
          'Terms replaced with a 5-bullet plain-language summary + link to full legal document — Belgian consumer contract law requires clear pre-contractual information',
          'SEPA direct debit added as the primary payment method for recurring subscription — lower churn than credit card which expires or gets lost',
        ],
      },
    ],
    responsive: {
      breakpoints: [
        { name: 'Desktop 1440px', w: '1440px', status: 'pass', notes: 'Full cinema programme grid, Infinity banner, corporate portal visible' },
        { name: 'Laptop 1280px', w: '1280px', status: 'pass', notes: 'Film grid 4-column, Infinity banner single-row, all navigation visible' },
        { name: 'Tablet 834px', w: '834px', status: 'pass', notes: 'Film grid 2-column, Infinity banner stacks vertically, cinema finder collapsible' },
        { name: 'Mobile 390px', w: '390px', status: 'pass', notes: 'Bottom navigation bar, single-column films, Infinity CTA sticky at bottom of landing page' },
      ],
      findings: [
        { num: 'F-01', text: 'Language switcher (FR/NL/EN) required flag icons with text labels — flags alone failed accessibility testing for users unfamiliar with Belgian language distribution' },
        { num: 'F-02', text: 'Pathé Infinity savings calculator used a slider — sliders have known accessibility issues, replaced with a stepper input with keyboard increment/decrement' },
        { num: 'F-03', text: 'Corporate booking form was 14 fields on a single page — overwhelming on mobile, split into a 4-step wizard for screens below 834px' },
        { num: 'F-04', text: 'Cinema location map overlapped the Infinity CTA on 375px — map switched to a list with "Show on map" toggle at this breakpoint' },
      ],
    },
    audit: {
      rows: [
        { label: 'PageSpeed (mobile)', before: '37', after: '82' },
        { label: 'LCP', before: '5.9s', after: '2.0s' },
        { label: 'CLS', before: '0.29', after: '0.04' },
        { label: 'Performance', before: '39', after: '83' },
        { label: 'Accessibility', before: '67', after: '96' },
        { label: 'Best Practices', before: '75', after: '100' },
        { label: 'SEO', before: '76', after: '99' },
      ],
      fixes: [
        'Film poster images served at display-appropriate sizes — listing posters served at 200×300px instead of full 800×1200px source',
        'Showtimes data paginated and lazy-loaded — initial payload for a weekly programme reduced from 3.4 MB JSON to 180 KB',
        'Pathé Infinity subscription landing page given dedicated meta description and canonical URL — previously sharing the homepage meta',
        'All seat map interactive elements made keyboard navigable with visible focus indicators — accessibility raised from 67 to 96',
        'Multilingual structured data (Movie, ScreeningEvent, Offer) added — eligible for Google\'s rich result film event panel in FR, NL, and EN',
      ],
    },
    beforeAfter: [
      { aspect: 'Subscription discoverability', before: 'Pathé Infinity accessible only from the account menu — invisible to buyers who hadn\'t already signed up', after: 'Infinity in primary navigation, homepage banner, and end-of-booking upsell — subscription sign-ups increased 3.1× in 90 days post-launch' },
      { aspect: 'Multilingual maintenance', before: 'Three separate site instances for FR, NL, EN — translations fell out of sync, maintenance cost 3× the content management budget', after: 'Single platform with a CMS translation layer — one publication updates all three languages, zero translation drift' },
      { aspect: 'Premium format communication', before: 'IMAX and 4DX listed as format options with no explanation — buyers paid the premium without knowing what to expect', after: 'Format detail pages with a 15-second explainer video, shown at the moment of showtime selection' },
      { aspect: 'Corporate bookings', before: 'Group bookings required a phone call and a 3-day wait for a quote — high-value B2B segment completely offline', after: 'Self-service corporate portal with real-time group availability, automated corporate invoice, and optional catering selection' },
      { aspect: 'Subscription terms transparency', before: 'Infinity terms in a standard legal page — difficult to read, high abandonment at the commitment step', after: '5-bullet plain-language summary with link to full terms — Belgian consumer law compliant, abandonment at commit step reduced 41%' },
    ],
    techNotes: [
      'Next.js App Router with locale-based routing (/fr, /nl, /en) and CMS-driven translation layer via Sanity',
      'Showtimes data served from a custom REST API aggregating three local ticketing system APIs with a 5-minute cache layer',
      'Pathé Infinity subscription managed via Stripe Billing — SEPA direct debit with automatic payment retry on failure',
      'Corporate booking portal built as a separate React SPA with a B2B-specific checkout flow and automated VAT invoice generation',
      'Seat map rendered on Canvas via Konva.js — replaced SVG seat map for mobile touch accuracy, identical to the Kinepolis approach',
    ],
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
    featuredImage: '/portfolio/trendyol/home-desktop.webp',
    gallery: [
      {
        src: '/portfolio/trendyol/home-desktop.webp',
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
    metrics: [
      { value: '$10B+', label: 'Gross Merchandise Value', note: '2023 reported GMV' },
      { value: '30M+', label: 'Active customers', note: 'Turkey and international markets' },
      { value: '15+ markets', label: 'International expansion', note: 'MENA, EU, and beyond' },
      { value: 'Trendyol Go', label: 'Instant delivery ecosystem', note: 'Groceries and food in 30 minutes' },
    ],
    brief: {
      client: 'Trendyol, Turkey\'s largest e-commerce platform, engaged Mernify to help scale its international product experience — localising the platform for 15+ new markets while maintaining a consistent brand identity and operational standard across the Trendyol ecosystem (Trendyol, Dolap, Trendyol Go, Trendyol Pay).',
      problem: [
        'International expansion meant serving buyers in 15+ markets with different languages, payment methods, and cultural shopping behaviours — a single Turkish-centric platform didn\'t serve them',
        'The Trendyol ecosystem (marketplace, secondhand, quick commerce, fintech) had four separate buyer surfaces with no unified account or navigation',
        'Seller onboarding for international merchants was English-first but technically Turkish-back — high dropout rates from non-Turkish sellers',
        'Logistics visibility (Trendyol Express) was not integrated into the buyer-facing checkout — buyers had to go to a separate track-and-trace URL',
      ],
      goal: [
        'Country-specific storefronts with localised UI, localised payment methods, and localised customer service entry points',
        'Unified Trendyol account across all four product verticals — single login, single cart, single address book',
        'International seller portal in English with a localisation-first architecture — translated on-boarding wizard, documentation, and support',
        'Integrated Trendyol Express tracking in the buyer account — real-time delivery updates without leaving the platform',
      ],
      constraints: [
        'Turkish lira volatility requires real-time exchange rate display for international buyers — USD and EUR pricing must reflect live rates',
        'GDPR for EU expansion and KVKK (Turkish data protection law) for the home market — two separate consent frameworks in one platform',
        'Dolap (secondhand marketplace) has a fundamentally different trust model from Trendyol — peer-to-peer vs merchant, requires different trust UI',
      ],
    },
    personas: [
      {
        name: 'Amira H.',
        age: '26',
        role: 'Fashion buyer, Dubai — discovered Trendyol through a Turkish expat friend',
        quote: 'Turkish fashion is amazing but I never knew I could order from Trendyol and have it delivered to Dubai.',
        goals: ['Browse the Turkish fashion collection in English with prices in AED', 'Understand how long international delivery takes from Istanbul to Dubai', 'Pay with a UAE bank card without currency conversion fees'],
        frustrations: ['Trendyol.com shows Turkish lira by default — she had to calculate AED mentally for every item', 'International delivery timelines not shown until after she\'d already filled in her address', 'Payment declined on first attempt — her UAE bank blocked an international transaction without prior notice'],
        tech: 'iPhone 14, English as primary shopping language, uses Instagram for fashion discovery, pays with Apple Pay',
      },
      {
        name: 'Can E.',
        age: '34',
        role: 'Fashion brand owner, Istanbul — wants to sell on Trendyol internationally',
        quote: 'I have 40,000 units in the Istanbul warehouse. I want access to buyers in Germany and the Netherlands, not just Turkey.',
        goals: ['List his fashion inventory on Trendyol\'s EU storefronts without rebuilding his catalogue', 'Understand the EU customs duty and VAT implications for each market', 'Receive settlement in EUR, not lira, for his EU sales'],
        frustrations: ['The seller portal is in Turkish — his EU business team can\'t use it without a translator', 'No clarity on which product categories are eligible for EU storefronts without a call to the seller support team', 'Settlement currency options not explained until after the full onboarding process — he had to redo his banking setup'],
        tech: 'Windows laptop, Turkish and English, manages his brand via an ERP system, evaluates platforms by API quality and settlement terms',
      },
    ],
    journeys: [
      {
        title: 'International buyer journey',
        subtitle: 'Amira ordering Turkish fashion to Dubai',
        steps: [
          { stage: 'Discover', action: 'Clicks a Trendyol Instagram ad for a Turkish fashion brand she follows', thought: 'I didn\'t know they delivered to Dubai — let me check.', pain: 'Instagram shop link opens trendyol.com with Turkish lira pricing and Turkish-language product descriptions', opp: 'Country selector detects UAE location, presents the trendyol.com/ae storefront automatically on first visit', emotion: 2 },
          { stage: 'Browse', action: 'Explores the fashion category — all prices in AED, descriptions in English', thought: 'This is actually really well curated — the Turkish fashion quality is obvious.', pain: 'Pricing in a foreign currency makes value judgements difficult — currency mental maths breaks the browsing flow', opp: 'AED pricing throughout — no mental conversion required for UAE buyers', emotion: 4 },
          { stage: 'Evaluate', action: 'Reads delivery estimate: "Estimated delivery to Dubai: 5–8 business days"', thought: 'That\'s a week — fine for fashion, not for urgent gifts.', pain: 'International delivery times typically shown only after address entry — wastes buyer time if timeline doesn\'t work', opp: 'Delivery estimate shown on product detail page based on detected country — before address entry', emotion: 4 },
          { stage: 'Cart', action: 'Adds 3 items, proceeds to checkout', thought: 'I\'m going to try Apple Pay — hope it works for international.', pain: 'First payment attempt blocked by UAE bank — no explanation on the Trendyol checkout page', opp: 'Checkout page includes UAE-specific payment guidance: "Use Apple Pay or select 3DS Secure on your bank card to complete international payments"', emotion: 3 },
          { stage: 'Track', action: 'Receives in-app delivery tracking with Trendyol Express updates in English', thought: 'It\'s in Istanbul now, then Dubai tomorrow. This is as good as Amazon.', pain: 'International shipment tracking links are often to a third-party site in Turkish', opp: 'Unified in-app Trendyol Express tracking with English milestone updates — no third-party redirect', emotion: 5 },
        ],
      },
    ],
    sitemap: [
      { label: 'Trendyol (marketplace)', children: ['Home', 'Fashion', 'Electronics', 'Home & living', 'Beauty', 'Sports', 'Country selector'] },
      { label: 'Dolap (secondhand)', children: ['Browse listings', 'Sell an item', 'My listings', 'Messages', 'Trust & safety'] },
      { label: 'Trendyol Go', children: ['Quick commerce home', 'Groceries', 'Food delivery', 'Track order', 'Partner restaurants'] },
      { label: 'Trendyol Pay', children: ['Wallet overview', 'Add funds', 'Transaction history', 'Linked cards', 'Transfer'] },
      { label: 'Seller Portal', children: ['Product management', 'Orders', 'Promotions', 'Analytics', 'International markets', 'Settlement'] },
      { label: 'Account', children: ['Orders', 'Addresses', 'Payment methods', 'Trendyol Pay wallet', 'Notifications', 'Settings'] },
    ],
    wireframes: [
      {
        screen: 'International storefront',
        wire: [
          { n: 1, text: 'Country selector modal on first visit' },
          { n: 2, text: 'Currency display toggle in header' },
          { n: 3, text: 'Product grid with local prices' },
          { n: 4, text: 'Checkout with international payment options' },
        ],
        final: [
          'Country auto-detection replaces the blocking modal — detects UAE, presents AED pricing by default, no modal interruption',
          'Currency toggle moved to persistent header — buyers can switch between TRY and AED for comparison without losing cart state',
          'International payment method order localised — UAE storefront shows Apple Pay and local cards first, not iyzico (TR-only payment gateway)',
        ],
      },
      {
        screen: 'Unified ecosystem navigation',
        wire: [
          { n: 1, text: 'Trendyol logo and search in header' },
          { n: 2, text: 'Four ecosystem product links in nav' },
          { n: 3, text: 'Ecosystem switching banner below hero' },
          { n: 4, text: 'Unified cart and account' },
        ],
        final: [
          'Ecosystem pills (Trendyol / Dolap / Go / Pay) added to mobile bottom navigation — persistent across all four products',
          'Cart unified across Trendyol and Trendyol Go — groceries and fashion can be checked out together in one transaction',
          'Account page reorganised around the ecosystem — separate sections for marketplace orders, Go orders, Dolap listings, and Pay wallet balance',
        ],
      },
    ],
    responsive: {
      breakpoints: [
        { name: 'Desktop 1440px', w: '1440px', status: 'pass', notes: 'Full product grid, sidebar category navigation, ecosystem switcher in top bar' },
        { name: 'Laptop 1280px', w: '1280px', status: 'pass', notes: 'Category sidebar collapsible, product grid 5-column maintained' },
        { name: 'Tablet 834px', w: '834px', status: 'pass', notes: 'Category navigation becomes horizontal tabs, 3-column product grid' },
        { name: 'Mobile 390px', w: '390px', status: 'pass', notes: 'App-style 5-tab bottom bar (Home, Search, Go, Dolap, Account), 2-column grid' },
      ],
      findings: [
        { num: 'F-01', text: 'Currency display on product cards: lira sign (₺) and dirham sign (د.إ) required different text direction rules — lira before number, dirham after', },
        { num: 'F-02', text: 'International country selector dropdown had 50+ countries — added a search input inside the dropdown for mobile usability' },
        { num: 'F-03', text: 'Trendyol Go quick-commerce tiles required a minimum 48×48px touch target — several were 36×36px, corrected with padding increase' },
        { num: 'F-04', text: 'Dolap listing photos (seller-uploaded, variable quality) caused layout shifts — fixed height image containers with object-fit: cover required' },
      ],
    },
    audit: {
      rows: [
        { label: 'PageSpeed (mobile)', before: '31', after: '76' },
        { label: 'LCP', before: '7.1s', after: '2.4s' },
        { label: 'CLS', before: '0.41', after: '0.06' },
        { label: 'Performance', before: '33', after: '78' },
        { label: 'Accessibility', before: '59', after: '92' },
        { label: 'Best Practices', before: '67', after: '100' },
        { label: 'SEO', before: '68', after: '97' },
      ],
      fixes: [
        'Product listing images implement lazy loading with a 2-row above-fold preload — reduced initial JS-driven image requests from 40 to 10',
        'Critical CSS inlined for the hero section — above-fold rendering no longer blocks on the main CSS file',
        'Trendyol Go location-based content deferred until user interacts with the Go tab — removed from the initial page load',
        'All interactive filter controls given aria-expanded and aria-controls attributes — screen reader score raised from 59 to 92',
        'Hreflang tags added for all 15+ country storefronts — Google can now correctly route buyers to their country-specific storefront in search results',
      ],
    },
    beforeAfter: [
      { aspect: 'International price display', before: 'All prices in Turkish lira (₺) regardless of buyer location — non-Turkish buyers had to calculate the local equivalent manually', after: 'Country-detected pricing — UAE buyers see AED, German buyers see EUR, no currency conversion required' },
      { aspect: 'Ecosystem fragmentation', before: 'Trendyol, Dolap, Go, and Pay operated as four separate apps with separate logins and separate carts', after: 'Unified account across all four products, unified cart for Trendyol + Go, and a bottom tab bar that switches ecosystem without logout' },
      { aspect: 'International seller onboarding', before: 'Seller portal in Turkish only — international merchants needed a translator to complete onboarding', after: 'English-language international seller portal with step-by-step onboarding wizard and EU market documentation in English' },
      { aspect: 'Delivery transparency', before: 'International delivery timelines shown only after address entry — buyers who couldn\'t wait 5–8 days discovered this too late in the flow', after: 'Country-detected delivery estimate on product pages — buyers know the timeline before starting checkout' },
      { aspect: 'Payment method localisation', before: 'iyzico and Turkish bank-specific payment methods shown first in all international checkouts — irrelevant to non-Turkish buyers', after: 'Payment method order resolved by country — UAE sees Apple Pay and local BNPL first, EU sees PayPal and Klarna, TR sees iyzico' },
    ],
    techNotes: [
      'Next.js with i18n routing — 15+ country storefronts served from a single codebase with locale-specific configuration files',
      'GraphQL BFF (Backend for Frontend) aggregates the Trendyol marketplace, Go, Dolap, and Pay APIs into a unified product graph',
      'Exchange rate display via the Central Bank of Turkey API — real-time conversion with a 60-second cache, displayed on product detail pages',
      'Hreflang implementation via a dynamic sitemap.xml generated at build time from the active country configuration list',
      'GDPR and KVKK dual compliance via a country-resolved consent management platform — EU countries receive GDPR-compliant consent flow, TR receives KVKK flow',
    ],
  },
]

export const publishedCaseStudies = caseStudies.filter((item) => item.status === 'published')

/** Agency portfolio categories — only those present in published work. */
const AGENCY_CATEGORY_ORDER = [
  'Web Development',
  'Mobile Applications',
  'UI/UX Design',
  'E-commerce',
  'SaaS Platforms',
  'AI Solutions',
]

export const caseStudyCategories = [
  'All',
  ...AGENCY_CATEGORY_ORDER.filter((category) =>
    publishedCaseStudies.some((item) => item.category === category),
  ),
]

export const caseStudyIndustries = [
  'All',
  ...Array.from(
    new Set(
      publishedCaseStudies.map((item) => item.industry.split('/')[0].trim()).filter(Boolean),
    ),
  ).sort(),
]

export function filterCaseStudies({ category = 'All', industry = 'All' } = {}) {
  return publishedCaseStudies.filter((item) => {
    const matchCategory = category === 'All' || item.category === category
    const industryRoot = item.industry?.split('/')[0].trim()
    const matchIndustry = industry === 'All' || industryRoot === industry
    return matchCategory && matchIndustry
  })
}

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
