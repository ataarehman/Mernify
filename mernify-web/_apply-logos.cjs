/**
 * Apply Mernify logos + favicon across all HTML pages.
 */
const fs = require('fs')
const path = require('path')
const ROOT = 'F:/mern.org/mernify-web'

const WORDMARK_RE =
  /<span class="fw-bold text-uppercase" style="font-family:Phudu,sans-serif;font-size:1\.35rem;letter-spacing:0\.06em;color:inherit">Mernify<\/span>/g

const LOGO_DUAL = `<span class="mernify-logo">
                        <img src="assets/images/logo/logo-black.svg" alt="Mernify" class="mernify-logo__dark" width="140" height="49">
                        <img src="assets/images/logo/logo-white.svg" alt="Mernify" class="mernify-logo__light" width="140" height="49">
                    </span>`

const LOGO_BLACK = `<img src="assets/images/logo/logo-black.svg" alt="Mernify" class="mernify-logo__dark" width="140" height="49" style="height:36px;width:auto">`
const LOGO_WHITE = `<img src="assets/images/logo/logo-white.svg" alt="Mernify" class="mernify-logo__light" width="140" height="49" style="height:36px;width:auto">`

const FAVICON_OLD = [
  /<link rel="icon" href="assets\/images\/logo\/favicon\.png"[^>]*>/g,
  /<link rel="shortcut icon"[^>]*>/g,
]
const FAVICON_NEW =
  '<link rel="icon" href="assets/images/logo/favicon.svg" type="image/svg+xml">\n    <link rel="alternate icon" href="assets/images/logo/favicon.svg">'

const BRAND_CSS =
  '    <link rel="stylesheet" href="assets/css/mernify-brand.css">'

function processFile(file) {
  let html = fs.readFileSync(file, 'utf8')
  const before = html

  // Favicon
  let favDone = false
  for (const re of FAVICON_OLD) {
    if (re.test(html)) {
      html = html.replace(re, () => {
        if (favDone) return ''
        favDone = true
        return FAVICON_NEW
      })
    }
  }
  if (!favDone && html.includes('</title>')) {
    html = html.replace('</title>', '</title>\n    ' + FAVICON_NEW)
  }

  // Brand CSS once after main.css
  if (!html.includes('mernify-brand.css')) {
    if (html.includes('assets/css/main.css')) {
      html = html.replace(
        /(<link[^>]+assets\/css\/main\.css[^>]*>)/,
        `$1\n${BRAND_CSS}`,
      )
    } else if (html.includes('</head>')) {
      html = html.replace('</head>', `${BRAND_CSS}\n</head>`)
    }
  }

  // Replace text wordmarks with dual logo (header/offcanvas/footer adapt via CSS)
  html = html.replace(WORDMARK_RE, LOGO_DUAL)

  // Any remaining old logo png refs
  html = html.replace(
    /src="assets\/images\/logo\/logo(?:-two|-secendary)?\.png"/g,
    'src="assets/images/logo/logo-black.svg"',
  )
  html = html.replace(
    /src="assets\/images\/logo\/white-logo\.png"/g,
    'src="assets/images/logo/logo-white.svg"',
  )
  html = html.replace(
    /src="assets\/images\/logo\/logo-secendary\.png"/g,
    'src="assets/images/logo/logo-black.svg"',
  )

  // about-ip-logo small mark → favicon mark
  html = html.replace(
    /src="assets\/images\/logo\/about-ip-logo\.png"/g,
    'src="assets/images/logo/favicon.svg"',
  )

  if (html !== before) {
    fs.writeFileSync(file, html)
    return true
  }
  return false
}

let n = 0
for (const f of fs.readdirSync(ROOT).filter((x) => x.endsWith('.html'))) {
  if (processFile(path.join(ROOT, f))) {
    console.log('updated', f)
    n++
  }
}
console.log('done', n)
