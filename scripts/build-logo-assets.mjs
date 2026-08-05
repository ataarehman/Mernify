/**
 * Re-encodes the header/footer wordmark.
 *
 * The source "SVG" files are not vector at all — each is a ~128 KB wrapper
 * around two base64 PNGs, so they cost 256 KB on every page load while gaining
 * nothing from being SVG. This rasterises them once, at 4x the largest rendered
 * size, into alpha WebP.
 *
 * Usage: node scripts/build-logo-assets.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { chromium } from 'playwright'

const DIR = path.join('public', 'assets', 'images', 'logo')

/** Source canvas is 2968x1042; the mark renders at 52px tall, so 4x = 208px. */
const OUT_HEIGHT = 208
const QUALITY = 0.92

const SOURCES = [
  { from: 'logo-black.svg', to: 'logo-black.webp' },
  { from: 'logo-white.svg', to: 'logo-white.webp' },
]

const browser = await chromium.launch()
const page = await browser.newPage()

for (const spec of SOURCES) {
  const srcPath = path.join(DIR, spec.from)
  const svg = fs.readFileSync(srcPath, 'utf8')
  const srcBytes = fs.statSync(srcPath).size

  const vb = svg.match(/viewBox="0 0 (\d+) (\d+)"/)
  const [, vwRaw, vhRaw] = vb
  const aspect = Number(vwRaw) / Number(vhRaw)
  const w = Math.round(OUT_HEIGHT * aspect)

  await page.setViewportSize({ width: w, height: OUT_HEIGHT })
  await page.setContent(`<body style="margin:0">${svg}</body>`)
  await page.evaluate(
    ({ w, h }) => {
      const s = document.querySelector('svg')
      s.setAttribute('width', String(w))
      s.setAttribute('height', String(h))
      s.style.display = 'block'
    },
    { w, h: OUT_HEIGHT },
  )
  const png = await page.screenshot({ omitBackground: true })

  const webp = await page.evaluate(
    async ({ b64, quality }) => {
      const img = new Image()
      img.src = 'data:image/png;base64,' + b64
      await img.decode()
      const c = document.createElement('canvas')
      c.width = img.naturalWidth
      c.height = img.naturalHeight
      c.getContext('2d').drawImage(img, 0, 0)
      return c.toDataURL('image/webp', quality).split(',')[1]
    },
    { b64: png.toString('base64'), quality: QUALITY },
  )

  const buf = Buffer.from(webp, 'base64')
  fs.writeFileSync(path.join(DIR, spec.to), buf)
  fs.unlinkSync(srcPath)
  console.log(
    `${spec.from} ${Math.round(srcBytes / 1024)}KB -> ${spec.to} ${Math.round(
      buf.byteLength / 1024,
    )}KB  ${w}x${OUT_HEIGHT}  (aspect ${aspect.toFixed(3)}, render 52px tall => ${Math.round(
      52 * aspect,
    )}x52)`,
  )
}

await browser.close()
