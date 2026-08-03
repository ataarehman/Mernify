/**
 * Pass 2: restore broken pages, strip fake proof, Mernify footer/CTA globally.
 * Structure / CSS / JS / images stay Unifex.
 */
const fs = require('fs')
const path = require('path')

const ROOT = 'F:/mern.org/mernify-web'
const ORIG = path.join(ROOT, '_unifex-orig')

const LOGO =
  '<span class="fw-bold text-uppercase" style="font-family:Phudu,sans-serif;font-size:1.35rem;letter-spacing:0.06em;color:inherit">Mernify</span>'

const globalReplacements = [
  [/Unifex - Digital Agency & Creative Portfolio HTML Template/g, 'Mernify — We Design, Engineer & Scale Digital Products'],
  [/Unifex, Social Media, and Digital Marketing Agency HTML Template\. Fully responsive, creative design, and easy to customize\. Ideal for Unifex agencies, marketing firms, and startups\./g, 'Mernify helps startups, growing businesses, and enterprises build reliable web, mobile, SaaS, and AI-powered products that drive growth and create measurable business value.'],
  [/Unifex HTML Template, Digital Marketing, Social Media Agency, Marketing Template, Advertising Agency, Creative Agency, Bootstrap, Responsive/g, 'Mernify, Product Engineering, SaaS, Mobile Apps, AI Integration, Web Development'],
  [/Let’s Talk/g, 'Discuss Your Project'],
  [/Let's Talk/g, 'Discuss Your Project'],
  [/unifexdonin@gmail\.com/g, 'info@mernify.co'],
  [/info\.domin@gmail\.com/g, 'info@mernify.co'],
  [/techubinfo@mail\.com/g, 'info@mernify.co'],
  [/support@example\.com/g, 'info@mernify.co'],
  [/© 2025\s*UNIFEXTheme\.?\s*All right reserved/gi, '© 2026 Mernify. All rights reserved'],
  [/Copyright © 2025 Unifex All Rights Reserved\./gi, '© 2026 Mernify. All rights reserved.'],
  [/Unifex agency/gi, 'Mernify'],
  [/UNIFEX/g, 'MERNIFY'],
  [/Unifex/g, 'Mernify'],
  [
    /Nemo enim ipsam voluptatem quia aut odit aut fugit, magni dolores eos qui voluptatem sequi nesciunt neque porro quisquam est a dolorem ipsum quia\s*/g,
    'Modern technology. Reliable execution. Measurable business value.',
  ],
  [
    /Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed quia consequuntur dolores an ratione voluptatem sequi nesciunt\. Neque porro quisquam est, qui dolorem ipsum quia dolor sit consectetur, in adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem\. Ut enim ad minima veniam,\s*/g,
    'End-to-end product engineering that connects strategy, UX, and full-stack delivery so teams ship reliable software without juggling disconnected vendors.',
  ],
  [/Art Direction/g, 'Product Engineering'],
  [/Brand Guidelines/g, 'SaaS Development'],
  [/Graphic Design/g, 'Web Development'],
  [/Motion Design/g, 'Mobile Apps'],
  [/Generative AI/g, 'AI Integration'],
  [/SEO Blog/g, 'Case Studies'],
  [/href="event-details\.html"/g, 'href="portfolio.html"'],
  [/href="ministrie-details\.html"/g, 'href="service.html"'],
  [/\+8801314986186/g, 'info@mernify.co'],
  [/href="tel:\+8801314986186"/g, 'href="mailto:info@mernify.co"'],
  [/href="tel:\+880[\d]+"/g, 'href="mailto:info@mernify.co"'],
  [
    /a marketing and creative agency based in California, driven by creativity and innovation/gi,
    'a modern software development partner for products that need to last',
  ],
  [
    /Ready to elevate your brand\? Drop us a <span class="text-main-two-600">message<\/span>, and let’s start building something truly amazing and incredible <span class="text-main-two-600">together\.<\/span>/g,
    'Ready to build your next digital product? Drop us a <span class="text-main-two-600">message</span>, and let’s start engineering something reliable and <span class="text-main-two-600">scalable.</span>',
  ],
  [
    /Ready to elevate your brand\? Drop us a <span class="text-main-two-600">message<\/span>, and let’s start building something truly amazing and incredible <span class="text-main-two-600">together\.<\/span>/g,
    'Ready to build your next digital product? Drop us a <span class="text-main-two-600">message</span>, and let’s start engineering something reliable and <span class="text-main-two-600">scalable.</span>',
  ],
  [/Loved by Teams Around the World/g, 'Built with modern product technology'],
  [/Building brands that stand out and connect through strategy, design, and storytelling\./g, 'Modern technology. Reliable execution. Measurable business value.'],
  [/Techub is the partner of choice for many of the world’s leading enterprises\.\s*We help businesses development\./g, 'Focused product-engineering partner for startups, growing businesses, and enterprises.'],
]

function applyGlobal(html) {
  let out = html
  for (const [re, rep] of globalReplacements) out = out.replace(re, rep)
  // Logo images → wordmark (keep layout wrappers)
  out = out.replace(
    /<img([^>]*?)src="assets\/images\/logo\/logo(?:-two)?\.png"([^>]*)>/g,
    LOGO,
  )
  out = out.replace(
    /<img([^>]*?)src="assets\/images\/logo\/white-logo\.png"([^>]*)>/g,
    LOGO,
  )
  return out
}

function brandifyServices(html) {
  let out = applyGlobal(html)
  out = out.replace(/>\s*Capabilities\s*</g, '> Services <')
  out = out.replace(/Illustration Design/g, 'Product Engineering')
  out = out.replace(/Business Branding/g, 'SaaS Development')
  out = out.replace(/UI\/UX Design/g, 'Web Development')
  out = out.replace(/Digital Marketing/g, 'Mobile App Development')
  out = out.replace(/Web Development/g, 'Web Development') // keep
  // Tag chips inside service cards
  out = out.replace(/Creative Direction/g, 'Discovery')
  out = out.replace(/Brand Identity/g, 'Architecture')
  out = out.replace(/Product Strategy/g, 'Product Strategy')
  return out
}

function cleanAbout(html) {
  let out = applyGlobal(html)

  out = out.replace(
    /Unlock <span class="text-main-two-600">growth<\/span> opportunities streamline[\s\S]*?elevate brands/g,
    'A modern software development partner for products that need to <span class="text-main-two-600">last</span> — combining engineering, product thinking, and structured delivery',
  )

  out = out.replace(
    /Why brands choose us to create meaningful digital <span class="text-main-two-600">experiences<\/span> that drive growth/g,
    'How we partner with teams to ship reliable digital <span class="text-main-two-600">products</span> that drive growth',
  )

  // Replace fake counter numbers with qualitative labels (keep Unifex counter layout)
  out = out.replace(
    /<h2 class="service-ip-counter-title tw-text-170 fw-semibold font-heading text-white tw-mb-2 lh-1"><span class="purecounter font-heading" data-purecounter-duration="2" data-purecounter-end="24"><\/span>\+<\/h2>/,
    '<h2 class="service-ip-counter-title tw-text-170 fw-semibold font-heading text-white tw-mb-2 lh-1">Build</h2>',
  )
  out = out.replace(
    /<h2 class="service-ip-counter-title tw-text-170 fw-semibold font-heading text-white tw-mb-2 lh-1"><span class="purecounter font-heading" data-purecounter-duration="3" data-purecounter-end="99"><\/span>%<\/h2>/,
    '<h2 class="service-ip-counter-title tw-text-170 fw-semibold font-heading text-white tw-mb-2 lh-1">Clear</h2>',
  )
  out = out.replace(
    /<h2 class="service-ip-counter-title tw-text-170 fw-semibold font-heading text-white tw-mb-2 lh-1"><span class="purecounter font-heading" data-purecounter-duration="4" data-purecounter-end="301"><\/span>\+<\/h2>/,
    '<h2 class="service-ip-counter-title tw-text-170 fw-semibold font-heading text-white tw-mb-2 lh-1">Focus</h2>',
  )
  out = out.replace(
    /<h2 class="service-ip-counter-title tw-text-170 fw-semibold font-heading text-white tw-mb-2 lh-1">\$<span class="purecounter font-heading" data-purecounter-duration="5" data-purecounter-end="23"><\/span>M<\/h2>/,
    '<h2 class="service-ip-counter-title tw-text-170 fw-semibold font-heading text-white tw-mb-2 lh-1">Scale</h2>',
  )

  // Fix duplicate "Focused Product Pods" on 4th card
  out = out.replace(
    /Focused Product Pods<\/a><\/h3>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/section>/,
    (m) => m.replace(/Focused Product Pods/, 'Scalable Delivery Systems'),
  )
  // Safer: replace 4th occurrence of Focused Product Pods if duplicated
  {
    let n = 0
    out = out.replace(/Focused Product Pods/g, () => {
      n += 1
      return n === 2 ? 'Scalable Delivery Systems' : 'Focused Product Pods'
    })
  }

  // Distinct about service blurbs
  const blurbs = [
    ['Product Engineering', 'End-to-end path from validated scope to maintainable release.'],
    ['SaaS and Web Platforms', 'Multi-tenant platforms, portals, and APIs prepared for growth.'],
    ['AI and Automation', 'Practical AI and workflow automation embedded in real products.'],
    ['Dedicated Product Teams', 'Focused engineering pods with clear ownership after launch.'],
  ]
  for (const [title, blurb] of blurbs) {
    const re = new RegExp(
      `(<h2 class="about-ip-title tw-text-2xl tw-mb-6">${title}<\\/h2>\\s*<p class="about-ip-paragraph tw-text-lg">)[^<]+`,
      'g',
    )
    out = out.replace(re, `$1${blurb}`)
  }

  // Team list → partnership principles (keep hover layout/images)
  const roles = [
    ['Ownership', 'Quality and outcomes'],
    ['Transparency', 'Scope, progress, risks'],
    ['Quality', 'Review and deployment'],
    ['Business understanding', 'Objectives before tech'],
    ['Partnership', 'Long-term delivery'],
  ]
  // Replace "Delivery Partner" titles sequentially
  {
    let i = 0
    out = out.replace(/Delivery Partner/g, () => {
      const r = roles[i] || roles[roles.length - 1]
      i += 1
      return r[0]
    })
  }
  const oldRoles = [
    'Managing Director',
    'Head of Strategy',
    'Brand & Visual Designer',
    'Creative Director',
    'Frontend Architect',
  ]
  oldRoles.forEach((old, i) => {
    out = out.replace(old, roles[i][1])
  })

  // Remove fake awards block (feature-three-area with Awwwards)
  out = out.replace(
    /<div class="feature-three-area py-120 position-relative z-1">[\s\S]*?Awwwards[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/,
    '<!-- Awards removed: no fabricated awards -->',
  )

  // Footer quick links cleanup
  out = out.replace(/>Careers</g, '>Case Studies<')
  out = out.replace(/>Case Studies</g, '>Case Studies<')

  return out
}

function neutralizeFakePage(html, title, message) {
  let out = applyGlobal(html)
  // Replace main content between breadcrumb end and footer/cta with simple honest block
  out = out.replace(
    /<!-- ==================== Breadcrumb End Here ==================== -->[\s\S]*?(?=<section class="cta-two-area|<footer )/,
    `<!-- ==================== Breadcrumb End Here ==================== -->
            <section class="py-120">
                <div class="container tw-container-1800-px">
                    <div class="row justify-content-center">
                        <div class="col-xl-8 text-center">
                            <h2 class="tw-text-15 fw-semibold tw-mb-6">${title}</h2>
                            <p class="tw-text-lg tw-mb-10">${message}</p>
                            <a class="tw-hover-btn bg-main-two-600 text-white fw-bold tw-py-2 tw-px-10 d-inline-flex hover-text-main-two-600 tw-rounded-lg" href="contact.html">
                                Discuss Your Project
                                <span class="tw-hover-btn-circle-dot bg-black"></span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
            `,
  )
  return out
}

function cleanFaq(html) {
  let out = applyGlobal(html)
  out = out.replace(
    /What services does your creative agency offer\?/g,
    'What services does Mernify offer?',
  )
  out = out.replace(
    /How long does a typical branding project take\?/gi,
    'How long does a typical product engagement take?',
  )
  out = out.replace(
    /Do you work with startups or only established brands\?/gi,
    'Do you work with startups or only established companies?',
  )
  return out
}

function cleanFooterServicesEverywhere(html) {
  // After global Art Direction etc already replaced; fix remaining creative footer titles
  return html
    .replace(/>Our Services</g, '>Our Services<')
    .replace(/>Careers</g, '>Case Studies<')
}

// --- Run ---
const files = fs.readdirSync(ROOT).filter((f) => f.endsWith('.html'))

// Restore service from original then brandify
{
  const src = fs.readFileSync(path.join(ORIG, 'service.html'), 'utf8')
  fs.writeFileSync(path.join(ROOT, 'service.html'), brandifyServices(src))
  console.log('restored+migrated service.html')
}

// About: prefer current migrated file if it has Mernify breadcrumb, else restore
{
  let about = fs.readFileSync(path.join(ROOT, 'about.html'), 'utf8')
  if (!about.includes('About Mernify')) {
    about = fs.readFileSync(path.join(ORIG, 'about.html'), 'utf8')
  }
  fs.writeFileSync(path.join(ROOT, 'about.html'), cleanAbout(about))
  console.log('cleaned about.html')
}

// Fake pages
{
  const t = fs.readFileSync(path.join(ORIG, 'testimonial.html'), 'utf8')
  fs.writeFileSync(
    path.join(ROOT, 'testimonial.html'),
    neutralizeFakePage(
      t,
      'Client stories coming soon',
      'We do not publish fabricated testimonials. When we share client feedback, it will be real and attributed with permission.',
    ),
  )
  console.log('neutralized testimonial.html')
}
{
  const p = fs.readFileSync(path.join(ORIG, 'pricing.html'), 'utf8')
  fs.writeFileSync(
    path.join(ROOT, 'pricing.html'),
    neutralizeFakePage(
      p,
      'Custom engagements only',
      'Mernify does not publish fixed package pricing. Share your product goals and we will propose a scoped engagement that fits.',
    ),
  )
  console.log('neutralized pricing.html')
}

// Global cleanup on all HTML
for (const f of files) {
  if (['service.html', 'about.html', 'testimonial.html', 'pricing.html'].includes(f)) continue
  const fp = path.join(ROOT, f)
  let html = fs.readFileSync(fp, 'utf8')
  const next = cleanFooterServicesEverywhere(applyGlobal(html))
  if (next !== html) {
    fs.writeFileSync(fp, next)
    console.log('updated', f)
  }
}

// FAQ
{
  const fp = path.join(ROOT, 'faq.html')
  if (fs.existsSync(fp)) {
    fs.writeFileSync(fp, cleanFaq(fs.readFileSync(fp, 'utf8')))
    console.log('cleaned faq.html')
  }
}

// Service-details light cleanup
{
  const fp = path.join(ROOT, 'service-details.html')
  if (fs.existsSync(fp)) {
    let html = applyGlobal(fs.readFileSync(fp, 'utf8'))
    html = html.replace(/Illustration Design/g, 'Product Engineering')
    html = html.replace(/What services does your creative agency offer\?/g, 'What services does Mernify offer?')
    fs.writeFileSync(fp, html)
    console.log('cleaned service-details.html')
  }
}

console.log('pass2 done')
