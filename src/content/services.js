import webImg from '@/assets/images/services/web-saas.jpg'
import mobileImg from '@/assets/images/services/mobile.jpg'
import aiImg from '@/assets/images/services/ai.jpg'
import designImg from '@/assets/images/services/design.jpg'
import supportImg from '@/assets/images/services/support.jpg'

export const homeServices = {
  eyebrow: 'Capabilities',
  title: 'What we build for growing products',
  support:
    'Focused product engineering across web, mobile, and intelligent systems — from first prototype to long-term reliability.',
  viewAll: {
    label: 'View all services',
    to: '/services',
  },
  items: [
    {
      id: 'web-saas',
      slug: 'web-saas',
      index: '01',
      title: 'Web & SaaS Development',
      summary: 'Scalable platforms, portals, and multi-tenant products built for real usage.',
      description:
        'We design and engineer web products with clean architecture, secure APIs, and interfaces that teams actually adopt — from customer portals to full SaaS systems.',
      capabilities: [
        'SaaS platforms & admin systems',
        'Customer portals & marketplaces',
        'Multi-tenant architecture',
        'API integrations & performance',
      ],
      image: webImg,
      imageAlt: 'Analytics dashboard on a laptop screen',
      icon: 'layoutDashboard',
      glow: 'rgba(79, 70, 229, 0.09)',
    },
    {
      id: 'mobile',
      slug: 'mobile',
      index: '02',
      title: 'Mobile App Development',
      summary: 'Native-quality iOS and Android experiences with shared product velocity.',
      description:
        'From MVP to production apps, we ship mobile products with thoughtful UX, reliable backends, and release pipelines ready for the store.',
      capabilities: [
        'iOS & Android applications',
        'React Native & Flutter',
        'Mobile API design',
        'App Store & Play deployment',
      ],
      image: mobileImg,
      imageAlt: 'Smartphone held in hand showing a mobile interface',
      icon: 'smartphone',
      glow: 'rgba(6, 182, 212, 0.1)',
    },
    {
      id: 'ai',
      slug: 'ai-automation',
      index: '03',
      title: 'AI & Automation',
      summary: 'Practical intelligence that removes friction from real workflows.',
      description:
        'We implement AI assistants, document pipelines, and workflow automation that reduce manual work — grounded in your data and integrated into the products you already run.',
      capabilities: [
        'AI assistants & copilots',
        'Workflow automation',
        'Document intelligence',
        'Third-party model integrations',
      ],
      image: aiImg,
      imageAlt: 'Abstract visualization of artificial intelligence systems',
      icon: 'sparkles',
      glow: 'rgba(99, 102, 241, 0.11)',
    },
    {
      id: 'design',
      slug: 'product-design',
      index: '04',
      title: 'Product Design & Strategy',
      summary: 'Clarity before code — discovery, UX, and architecture that de-risk delivery.',
      description:
        'Workshops, journeys, prototypes, and technical recommendations that align stakeholders and define an MVP worth building.',
      capabilities: [
        'Discovery workshops',
        'UI/UX & prototyping',
        'MVP scoping',
        'Technical architecture',
      ],
      image: designImg,
      imageAlt: 'Design workspace with interface explorations on screen',
      icon: 'penTool',
      glow: 'rgba(14, 165, 233, 0.09)',
    },
    {
      id: 'support',
      slug: 'support-maintenance',
      index: '05',
      title: 'Support & Maintenance',
      summary: 'Ongoing ownership after launch — stability, speed, and continuous improvement.',
      description:
        'Monitoring, fixes, cloud operations, and iterative enhancements so your product stays secure, fast, and ready for the next release.',
      capabilities: [
        'Production monitoring',
        'Performance optimization',
        'Cloud & DevOps support',
        'Continuous improvement',
      ],
      image: supportImg,
      imageAlt: 'Server infrastructure and network hardware',
      icon: 'shieldCheck',
      glow: 'rgba(51, 65, 85, 0.12)',
    },
  ],
}
