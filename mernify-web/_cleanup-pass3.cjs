const fs = require('fs')
const path = require('path')
const ROOT = 'F:/mern.org/mernify-web'

const global = [
  [/1st Floor, Afroza Tower, Uposhohor New Market, Rajshahi 6202/g, 'Remote-first · Global collaboration'],
  [/Book A Call/g, 'Discuss Your Project'],
  [/Copyright © 2025 Mernify All Rights Reserved\./g, '© 2026 Mernify. All rights reserved.'],
  [/>Careers</g, '>Portfolio<'],
  [/href="pricing\.html"/g, 'href="contact.html"'],
]

for (const f of fs.readdirSync(ROOT).filter((x) => x.endsWith('.html'))) {
  const fp = path.join(ROOT, f)
  let h = fs.readFileSync(fp, 'utf8')
  const before = h
  for (const [re, rep] of global) h = h.replace(re, rep)

  // Strip pricing sections (fake package prices)
  h = h.replace(
    /<section class="pricing-area[\s\S]*?<\/section>/g,
    '<!-- Pricing removed: custom engagements only -->',
  )

  if (h !== before) {
    fs.writeFileSync(fp, h)
    console.log('cleaned', f)
  }
}

// Fix service logo if empty (re-apply wordmark if logo img still there without replace)
{
  const fp = path.join(ROOT, 'service.html')
  let h = fs.readFileSync(fp, 'utf8')
  const LOGO =
    '<span class="fw-bold text-uppercase" style="font-family:Phudu,sans-serif;font-size:1.35rem;letter-spacing:0.06em;color:inherit">Mernify</span>'
  if (!h.includes('>Mernify</span>') && h.includes('logo/logo')) {
    h = h.replace(/<img([^>]*?)src="assets\/images\/logo\/logo(?:-two)?\.png"([^>]*)>/g, LOGO)
    fs.writeFileSync(fp, h)
    console.log('fixed service logo')
  }
  // Tag chips: third chip shouldn't all say Web Development
  h = fs.readFileSync(fp, 'utf8')
  // Within each service card, third tag was Graphic Design → Web Development; diversify by service order is hard; set common capability tags
  h = h.replace(
    /(<ul class="d-flex tw-gap-205 flex-wrap">\s*<li><a[^>]*>Discovery<\/a><\/li>\s*<li><a[^>]*>Architecture<\/a><\/li>\s*<li><a[^>]*>)Web Development(<\/a><\/li>)/g,
    '$1Delivery$2',
  )
  fs.writeFileSync(fp, h)
  console.log('service tags refined')
}

console.log('done')
