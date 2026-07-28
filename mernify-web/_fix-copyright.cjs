const fs = require('fs')
const path = require('path')
const ROOT = 'F:/mern.org/mernify-web'
for (const f of fs.readdirSync(ROOT).filter((x) => x.endsWith('.html'))) {
  const fp = path.join(ROOT, f)
  let h = fs.readFileSync(fp, 'utf8')
  const before = h
  h = h.replace(
    /Copyright © 2025\s*<a[^>]*>Mernify<\/a>\s*All Rights Reserved\./g,
    '© 2026 Mernify. All rights reserved.',
  )
  h = h.replace(/Copyright © 2025 Mernify All Rights Reserved\./g, '© 2026 Mernify. All rights reserved.')
  if (h !== before) {
    fs.writeFileSync(fp, h)
    console.log(f)
  }
}
