/**
 * Content migration: Unifex HTML → Mernify copy (structure/CSS/JS unchanged)
 */
const fs = require('fs')
const path = require('path')

const ROOT = 'F:/mern.org/mernify-web'

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
  [/Techub is the partner of choice for many of the world’s leading enterprises\.\s*We help businesses development\./g, 'Focused product-engineering partner for startups, growing businesses, and enterprises.'],
  [/Building brands that stand out and connect through strategy, design, and storytelling\./g, 'Modern technology. Reliable execution. Measurable business value.'],
  [/Ready to kick start a discovery session\?/g, 'Ready to discuss your next product?'],
  [/Share your ideas with us, & we’ll begin turning your vision into reality today/g, 'Share the idea, operational challenge, or existing product. We’ll help turn it into a scalable digital experience.'],
  [/Discover More/g, 'Explore Services'],
  [/View All Projects/g, 'View Case Studies'],
  [/View All Services/g, 'View All Services'],
  [/View All Team Member/g, 'About Mernify'],
  [/Book A Call/g, 'Discuss Your Project'],
]

function applyGlobal(html) {
  let out = html
  for (const [re, rep] of globalReplacements) out = out.replace(re, rep)
  return out
}

function migrateIndex(html) {
  let out = applyGlobal(html)

  // Hero headline
  out = out.replace(
    /WE CREATED DIGITAL EXPERIENCES\s*,\s*PRODUCTS AND SERVICES WITH PROPOSAL[\s\S]*?For what comes\s*\./,
    'WE DESIGN, ENGINEER &amp; SCALE DIGITAL PRODUCTS FOR STARTUPS AND GROWING BUSINESSES.',
  )

  // About section titles / copy
  out = out.replace(
    /Mernify is a creative agency built for real exploration - a private space where ideas strategy, and beautifully crafted digital design come together\./g,
    'Mernify is a focused product-engineering partner — helping businesses transform ideas, workflows, and operational challenges into reliable digital products.',
  )
  out = out.replace(
    /A curated selection of projects where strategy, creativity, and digital craftsmanship come together\. Each work reflects our commitments design, meaningful experiences and measurable impact for modern brands\. From innovative digital products and immersive websites to brand identities that tell a story,/g,
    'We combine modern engineering, product thinking, and structured delivery so teams can launch faster, operate efficiently, and grow confidently.',
  )

  // Portfolio heading area
  out = out.replace(/>PORTFOLIO</g, '>CASE STUDIES<')
  out = out.replace(/>THINKING THE</g, '>SELECTED<')

  // Fake project titles → honest pending placeholders (keep layout/images)
  const projectMap = [
    ['Digital Web Interface', 'SaaS Operations Platform'],
    ['Web Craft', 'Field Service Mobile'],
    ['Design', 'AI Document Workflow'],
  ]
  // Only replace first occurrences carefully via sequential unique patterns
  out = out.replace(/\(01\. Project\)[\s\S]*?<h4[^>]*>[\s\S]*?<\/h4>/, (m) =>
    m.replace(/Digital Web Interface/, 'SaaS Operations Platform'),
  )

  // Service titles (first pass - brand identity demo copy)
  out = out.replace(/Brand Identity Design/g, 'Product Engineering')
  out = out.replace(/Brand Identity Creation/g, 'SaaS Development')
  out = out.replace(/Visual Brand Identity/g, 'Mobile App Development')
  out = out.replace(/Creative Brand Identity/g, 'AI Integration')
  out = out.replace(/Corporate Brand Identity/g, 'Web Development')
  out = out.replace(/Creative Direction/g, 'Discovery & Architecture')
  out = out.replace(/Brand Identity/g, 'Full-Stack Delivery')
  out = out.replace(/Branding Strategy/g, 'Product Strategy')
  out = out.replace(/Graphic Design/g, 'UI/UX Systems')
  out = out.replace(
    /We craft distinctive brand identities that make your business stand out from logos and color palettes to typography and visual systems,/g,
    'Outcome-led product engineering organized by commercial needs—not programming languages.',
  )

  // REMOVE fake testimonials section
  out = out.replace(
    /<section class="testimonial-area[\s\S]*?<\/section>/,
    '<!-- Testimonials removed: no fabricated client reviews -->',
  )

  // REMOVE fake awards feature section
  out = out.replace(
    /<section class="feature-area[\s\S]*?<\/section>/,
    '<!-- Awards removed: no fabricated awards or ratings -->',
  )

  // Team section → partnership principles (keep structure, replace people names)
  out = out.replace(
    /Meet the talented squad, behind the creativity driving every project we deliver successfully\./g,
    'Complex technology. Clear partnership — how we work with product teams.',
  )
  out = out.replace(/\(4\.8 Rated worldwide\)/g, 'Senior-led delivery')
  out = out.replace(/Julian Miles/g, 'Direct Communication')
  out = out.replace(/Adrian Miles/g, 'Transparent Delivery')
  out = out.replace(/James Hayes/g, 'Product Ownership')
  out = out.replace(/Design Director &amp; CEO/g, 'Delivery principle')
  out = out.replace(/Design Director & CEO/g, 'Delivery principle')

  // Offcanvas contact bits
  out = out.replace(/Manchester 21, Zurich, CH/g, 'Remote-first · Global collaboration')
  out = out.replace(/\(\+00\) 678 345 98568/g, 'info@mernify.co')
  out = out.replace(/Get UPdate/g, 'Get Updates')

  return out
}

const files = fs.readdirSync(ROOT).filter((f) => f.endsWith('.html'))
for (const file of files) {
  const full = path.join(ROOT, file)
  let html = fs.readFileSync(full, 'utf8')
  if (file === 'index.html') html = migrateIndex(html)
  else html = applyGlobal(html)
  fs.writeFileSync(full, html, 'utf8')
  console.log('migrated', file)
}
console.log('done', files.length)
