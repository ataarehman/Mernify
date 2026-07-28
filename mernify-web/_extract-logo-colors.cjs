const fs = require('fs')
const path = require('path')
const dir = 'F:/mern.org/mernify-web/assets/images/logo'

for (const f of ['logo-black.svg', 'logo-white.svg', 'favicon.svg']) {
  const s = fs.readFileSync(path.join(dir, f), 'utf8')
  console.log('===', f, 'len', s.length, '===')
  console.log(s.slice(0, 800))
  const fills = [...s.matchAll(/fill=["']([^"']+)["']/gi)].map((m) => m[1])
  const strokes = [...s.matchAll(/stroke=["']([^"']+)["']/gi)].map((m) => m[1])
  const hex = [...s.matchAll(/#([0-9a-fA-F]{3,8})\b/g)].map((m) => '#' + m[1])
  const rgb = [...s.matchAll(/rgba?\([^)]+\)/gi)].map((m) => m[0])
  console.log('fills', [...new Set(fills)].slice(0, 40))
  console.log('strokes', [...new Set(strokes)].slice(0, 20))
  console.log('hex', [...new Set(hex)].slice(0, 50))
  console.log('rgb', [...new Set(rgb)].slice(0, 20))
  const vb = s.match(/viewBox=["']([^"']+)/)
  console.log('viewBox', vb && vb[1])
  console.log('has image/png', s.includes('image/png') || s.includes('data:image'))
}
