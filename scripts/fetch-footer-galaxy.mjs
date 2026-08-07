/**
 * Fetch + optimize a premium deep-space galaxy background for the site footer.
 * Usage: node scripts/fetch-footer-galaxy.mjs
 *
 * Prefer pure space / nebula frames (no terrain silhouettes). Brand-tint toward
 * indigo + cyan during encode so the asset feels native to Mernify.
 */
import { mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { chromium } from 'playwright'

const OUT_DIR = join(process.cwd(), 'public', 'assets', 'images', 'shapes')
const MIN = 20_000

/** Pure space / nebula first; landscape milky-way last as fallback. */
const candidates = [
  { id: '1615381034338-0ce3a8d47866', w: 2880, h: 1620 }, // purple-blue nebula
  { id: '1464802686167-b939a6910659', w: 2880, h: 1620 }, // milky way deep field
  { id: '1506318137071-a8e063b4bec0', w: 2880, h: 1620 }, // dark starfield
  { id: '1446776811953-b23d57bd21aa', w: 2880, h: 1620 }, // earth / space
  { id: '1419242902214-272b3f66ee7a', w: 2880, h: 1620 }, // night sky (may include terrain)
]

const url = (id, w, h) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&crop=entropy&fm=jpg&q=92`

await mkdir(OUT_DIR, { recursive: true })

let raw = null
let used = null
for (const c of candidates) {
  try {
    const res = await fetch(url(c.id, c.w, c.h))
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const buf = Buffer.from(await res.arrayBuffer())
    if (buf.byteLength < MIN) throw new Error(`too small (${buf.byteLength})`)
    raw = buf
    used = c
    console.log(`ok download photo-${c.id} ${(buf.byteLength / 1024).toFixed(0)}KB`)
    break
  } catch (error) {
    console.log(`skip photo-${c.id}: ${error.message}`)
  }
}

if (!raw) {
  console.error('FAILED: no galaxy candidate downloaded')
  process.exit(1)
}

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 64, height: 64 } })
const b64 = raw.toString('base64')

async function encode({ maxW, quality, name }) {
  const out = await page.evaluate(
    async ({ b64, maxW, quality }) => {
      const img = new Image()
      img.src = `data:image/jpeg;base64,${b64}`
      await img.decode()
      const scale = Math.min(1, maxW / img.naturalWidth)
      const w = Math.round(img.naturalWidth * scale)
      const h = Math.round(img.naturalHeight * scale)
      const c = document.createElement('canvas')
      c.width = w
      c.height = h
      const ctx = c.getContext('2d')
      ctx.drawImage(img, 0, 0, w, h)

      // Soft brand grade: deepen blacks, push indigo/cyan without neon glow.
      ctx.globalCompositeOperation = 'multiply'
      ctx.fillStyle = 'rgba(15, 23, 42, 0.22)'
      ctx.fillRect(0, 0, w, h)
      ctx.globalCompositeOperation = 'screen'
      const wash = ctx.createLinearGradient(0, 0, w, h)
      wash.addColorStop(0, 'rgba(79, 70, 229, 0.16)')
      wash.addColorStop(0.55, 'rgba(15, 23, 42, 0)')
      wash.addColorStop(1, 'rgba(21, 198, 226, 0.1)')
      ctx.fillStyle = wash
      ctx.fillRect(0, 0, w, h)
      ctx.globalCompositeOperation = 'source-over'

      const blob = await new Promise((r) => c.toBlob(r, 'image/webp', quality))
      return { w, h, bytes: Array.from(new Uint8Array(await blob.arrayBuffer())) }
    },
    { b64, maxW, quality },
  )

  const webp = Buffer.from(out.bytes)
  await writeFile(join(OUT_DIR, name), webp)
  console.log(`wrote ${name} ${out.w}x${out.h} ${(webp.byteLength / 1024).toFixed(0)}KB`)
  return out
}

await encode({ maxW: 2400, quality: 0.84, name: 'footer-galaxy-2400.webp' })
await encode({ maxW: 1920, quality: 0.82, name: 'footer-galaxy.webp' })
await encode({ maxW: 1280, quality: 0.8, name: 'footer-galaxy-1280.webp' })

console.log(`source photo-${used.id}`)
await browser.close()
