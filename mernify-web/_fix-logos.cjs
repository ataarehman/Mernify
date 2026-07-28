const fs = require('fs')
const path = require('path')
const ROOT = 'F:/mern.org/mernify-web'
const LOGO =
  '<span class="fw-bold text-uppercase" style="font-family:Phudu,sans-serif;font-size:1.35rem;letter-spacing:0.06em;color:inherit">Mernify</span>'

for (const f of fs.readdirSync(ROOT).filter((x) => x.endsWith('.html'))) {
  const fp = path.join(ROOT, f)
  let h = fs.readFileSync(fp, 'utf8')
  const before = h
  h = h.replace(/<img([^>]*?)src="assets\/images\/logo\/logo-secendary\.png"([^>]*)>/g, LOGO)
  h = h.replace(/<img([^>]*?)src="assets\/images\/logo\/logo(?:-two)?\.png"([^>]*)>/g, LOGO)
  h = h.replace(/<img([^>]*?)src="assets\/images\/logo\/white-logo\.png"([^>]*)>/g, LOGO)
  if (h !== before) {
    fs.writeFileSync(fp, h)
    console.log('logo', f)
  }
}
console.log('done')
