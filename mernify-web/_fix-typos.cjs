const fs = require('fs')
const path = require('path')
const ROOT = 'F:/mern.org/mernify-web'

const fixes = [
  [/Transparent Ownershipships/g, 'Transparent Partnerships'],
  [/Focused Ownership Pods/g, 'Focused Product Pods'],
  [/Application Design/g, 'Mobile App Development'],
  [/Ready to elevate your brand\?/g, 'Ready to build your next digital product?'],
]

for (const f of fs.readdirSync(ROOT).filter((x) => x.endsWith('.html'))) {
  const fp = path.join(ROOT, f)
  let h = fs.readFileSync(fp, 'utf8')
  const before = h
  for (const [re, rep] of fixes) h = h.replace(re, rep)
  // CTA body (unicode apostrophe)
  h = h.replace(
    /let[\u2019']s start building something truly amazing and incredible/gi,
    "let's start engineering something reliable and scalable",
  )
  if (h !== before) {
    fs.writeFileSync(fp, h)
    console.log('fixed', f)
  }
}
console.log('done')
