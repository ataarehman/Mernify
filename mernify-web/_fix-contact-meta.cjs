const fs = require('fs')
const path = require('path')
const ROOT = 'F:/mern.org/mernify-web'
const reps = [
  [/href="tel:hello@mernify\.com"/g, 'href="mailto:hello@mernify.com"'],
  [/Manchester 21, Zurich, CH/g, 'Remote-first · Global collaboration'],
  [/\(\+00\) 678 345 98568/g, 'hello@mernify.com'],
  [/href="tel:\+48555223224"/g, 'href="mailto:hello@mernify.com"'],
  [/href="tel:2518546308"/g, 'href="mailto:hello@mernify.com"'],
]
for (const f of fs.readdirSync(ROOT).filter((x) => x.endsWith('.html'))) {
  const fp = path.join(ROOT, f)
  let h = fs.readFileSync(fp, 'utf8')
  const before = h
  for (const [re, rep] of reps) h = h.replace(re, rep)
  if (h !== before) {
    fs.writeFileSync(fp, h)
    console.log(f)
  }
}
