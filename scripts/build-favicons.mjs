/**
 * Generates the favicon / app-icon suite from one vector source of truth.
 *
 * The mark is an isometric "M" built from four flat faces, so it stays legible
 * down to 16px. Transparent PNGs cover browser tabs; the Apple and Android
 * icons get an opaque navy plate because those platforms composite onto the
 * home screen and mask the corners themselves.
 *
 * Usage: node scripts/build-favicons.mjs
 */
import { writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { chromium } from 'playwright'

const OUT = join(process.cwd(), 'public')

const NAVY = '#0f172a'

/** Face geometry on a 1024 grid — shared by every output size. */
const FACES = [
  { d: 'M176 119 512 314 512 657 176 461Z', fill: 'mfViolet' },
  { d: 'M848 119 512 314 512 657 848 461Z', fill: 'mfCyan' },
  { d: 'M176 509 412 646 412 904 176 767Z', fill: 'mfIndigo' },
  { d: 'M612 599 848 461 848 768 612 905Z', fill: 'mfBlue' },
]

const GRADIENTS = `
  <linearGradient id="mfViolet" x1="0" y1="0" x2="0.35" y2="1">
    <stop offset="0" stop-color="#7c5cf5"/><stop offset="1" stop-color="#4f46e5"/>
  </linearGradient>
  <linearGradient id="mfCyan" x1="0" y1="0" x2="0.2" y2="1">
    <stop offset="0" stop-color="#22d3ee"/><stop offset="1" stop-color="#15c6e2"/>
  </linearGradient>
  <linearGradient id="mfIndigo" x1="0" y1="0" x2="0.4" y2="1">
    <stop offset="0" stop-color="#6a50ed"/><stop offset="1" stop-color="#4f46e5"/>
  </linearGradient>
  <linearGradient id="mfBlue" x1="0.1" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#15c6e2"/><stop offset="1" stop-color="#1f72ea"/>
  </linearGradient>`

/**
 * @param {object} o
 * @param {string} o.viewBox   crop window on the 1024 grid
 * @param {string} [o.bg]      opaque plate colour (Apple / Android icons)
 * @param {number} [o.radius]  plate corner radius, in viewBox units
 */
function markup({ viewBox, bg, radius = 0 }) {
  const [vx, vy, vw, vh] = viewBox.split(' ').map(Number)
  const plate = bg
    ? `<rect x="${vx}" y="${vy}" width="${vw}" height="${vh}" rx="${radius}" fill="${bg}"/>`
    : ''
  const faces = FACES.map(
    (f) =>
      `<path d="${f.d}" fill="url(#${f.fill})" stroke="url(#${f.fill})"/>`,
  ).join('')
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}">
  <defs>${GRADIENTS}</defs>
  ${plate}
  <g stroke-linejoin="round" stroke-width="24">${faces}</g>
</svg>`
}

/** Tight crop for tabs — the mark should very nearly fill the tile. */
const TAB_VIEWBOX = '92 92 840 840'
/** Roomier crop for home-screen icons, which sit on a coloured plate. */
const APP_VIEWBOX = '-24 -24 1072 1072'

const RASTERS = [
  { file: 'favicon-16x16.png', size: 16, viewBox: TAB_VIEWBOX },
  { file: 'favicon-32x32.png', size: 32, viewBox: TAB_VIEWBOX },
  { file: 'favicon-48x48.png', size: 48, viewBox: TAB_VIEWBOX },
  { file: 'favicon-96x96.png', size: 96, viewBox: TAB_VIEWBOX },
  { file: 'apple-touch-icon.png', size: 180, viewBox: APP_VIEWBOX, bg: NAVY },
  { file: 'icon-192.png', size: 192, viewBox: APP_VIEWBOX, bg: NAVY, radius: 160 },
  { file: 'icon-512.png', size: 512, viewBox: APP_VIEWBOX, bg: NAVY, radius: 160 },
  { file: 'icon-maskable-512.png', size: 512, viewBox: '-190 -190 1404 1404', bg: NAVY },
]

const browser = await chromium.launch()
const page = await browser.newPage()
const pngs = new Map()

for (const spec of RASTERS) {
  await page.setViewportSize({ width: spec.size, height: spec.size })
  await page.setContent(
    `<body style="margin:0;width:${spec.size}px;height:${spec.size}px">${markup(spec)}</body>`,
  )
  // Force the SVG to fill the viewport exactly so screenshots are pixel-tight.
  await page.evaluate((size) => {
    const svg = document.querySelector('svg')
    svg.setAttribute('width', String(size))
    svg.setAttribute('height', String(size))
    svg.style.display = 'block'
  }, spec.size)
  const buf = await page.screenshot({ omitBackground: !spec.bg })
  await writeFile(join(OUT, spec.file), buf)
  pngs.set(spec.file, buf)
  console.log(`wrote ${spec.file} (${spec.size}px, ${(buf.byteLength / 1024).toFixed(1)} KB)`)
}

await browser.close()

/* ---- favicon.ico: a PNG-payload icon bundle (16/32/48) ---- */
const icoSizes = [16, 32, 48]
const icoImages = icoSizes.map((s) => ({ size: s, data: pngs.get(`favicon-${s}x${s}.png`) }))

const header = Buffer.alloc(6)
header.writeUInt16LE(0, 0) // reserved
header.writeUInt16LE(1, 2) // type: icon
header.writeUInt16LE(icoImages.length, 4)

let offset = 6 + icoImages.length * 16
const entries = []
for (const img of icoImages) {
  const e = Buffer.alloc(16)
  e.writeUInt8(img.size >= 256 ? 0 : img.size, 0)
  e.writeUInt8(img.size >= 256 ? 0 : img.size, 1)
  e.writeUInt8(0, 2) // palette size
  e.writeUInt8(0, 3) // reserved
  e.writeUInt16LE(1, 4) // colour planes
  e.writeUInt16LE(32, 6) // bits per pixel
  e.writeUInt32LE(img.data.byteLength, 8)
  e.writeUInt32LE(offset, 12)
  entries.push(e)
  offset += img.data.byteLength
}

const ico = Buffer.concat([header, ...entries, ...icoImages.map((i) => i.data)])
await writeFile(join(OUT, 'favicon.ico'), ico)
console.log(`wrote favicon.ico (${icoSizes.join('/')}, ${(ico.byteLength / 1024).toFixed(1)} KB)`)

/* ---- tab favicon.svg ---- */
await writeFile(
  join(OUT, 'favicon.svg'),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${TAB_VIEWBOX}" role="img" aria-label="Mernify">
  <title>Mernify</title>
  <defs>${GRADIENTS}
  </defs>
  <g stroke-linejoin="round" stroke-width="24">
${FACES.map((f) => `    <path d="${f.d}" fill="url(#${f.fill})" stroke="url(#${f.fill})"/>`).join('\n')}
  </g>
</svg>
`,
)
console.log('wrote favicon.svg')

/* ---- web app manifest ---- */
await writeFile(
  join(OUT, 'site.webmanifest'),
  `${JSON.stringify(
    {
      name: 'Mernify — We Design, Engineer & Scale Digital Products',
      short_name: 'Mernify',
      description:
        'Mernify helps startups, growing businesses, and enterprises build reliable web, mobile, SaaS, and AI-powered products.',
      id: '/',
      start_url: '/',
      scope: '/',
      display: 'standalone',
      background_color: NAVY,
      theme_color: NAVY,
      icons: [
        { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
        { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
        { src: '/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
      ],
    },
    null,
    2,
  )}\n`,
)
console.log('wrote site.webmanifest')
