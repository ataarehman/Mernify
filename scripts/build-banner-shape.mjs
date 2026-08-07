/**
 * Renders a dark navy→indigo→cyan atmospheric backdrop for the home hero
 * WebGL ripple layer — matches brand tokens without relying on Unsplash.
 */
import { chromium } from 'playwright'
import { writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const OUT = join(process.cwd(), 'public', 'assets', 'images', 'shapes')
const W = 1920
const H = 934

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: W, height: H } })

const dataUrl = await page.evaluate(
  ({ w, h }) => {
    const canvas = document.createElement('canvas')
    canvas.width = w
    canvas.height = h
    const ctx = canvas.getContext('2d')

    // Base navy
    ctx.fillStyle = '#070B16'
    ctx.fillRect(0, 0, w, h)

    // Indigo bloom (upper right)
    let g = ctx.createRadialGradient(w * 0.72, h * 0.22, 0, w * 0.72, h * 0.22, w * 0.55)
    g.addColorStop(0, 'rgba(79, 70, 229, 0.55)')
    g.addColorStop(0.45, 'rgba(79, 70, 229, 0.18)')
    g.addColorStop(1, 'rgba(79, 70, 229, 0)')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, w, h)

    // Cyan bloom (lower left)
    g = ctx.createRadialGradient(w * 0.18, h * 0.78, 0, w * 0.18, h * 0.78, w * 0.42)
    g.addColorStop(0, 'rgba(21, 198, 226, 0.32)')
    g.addColorStop(0.5, 'rgba(21, 198, 226, 0.1)')
    g.addColorStop(1, 'rgba(21, 198, 226, 0)')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, w, h)

    // Soft center lift
    g = ctx.createRadialGradient(w * 0.5, h * 0.45, 0, w * 0.5, h * 0.45, w * 0.35)
    g.addColorStop(0, 'rgba(148, 163, 184, 0.08)')
    g.addColorStop(1, 'rgba(148, 163, 184, 0)')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, w, h)

    // Fine noise for WebGL texture interest
    const img = ctx.getImageData(0, 0, w, h)
    const d = img.data
    for (let i = 0; i < d.length; i += 4) {
      const n = (Math.random() - 0.5) * 12
      d[i] = Math.max(0, Math.min(255, d[i] + n))
      d[i + 1] = Math.max(0, Math.min(255, d[i + 1] + n))
      d[i + 2] = Math.max(0, Math.min(255, d[i + 2] + n))
    }
    ctx.putImageData(img, 0, 0)

    return canvas.toDataURL('image/webp', 0.82)
  },
  { w: W, h: H },
)

const buf = Buffer.from(dataUrl.split(',')[1], 'base64')
await writeFile(join(OUT, 'banner-shape.webp'), buf)

// Mid size for potential srcset
await page.setViewportSize({ width: 1280, height: 622 })
const midUrl = await page.evaluate(() => {
  // re-read isn't available; draw scaled from previous — regenerate smaller
  return null
})
void midUrl

const midPage = await browser.newPage({ viewport: { width: 1280, height: 622 } })
const midData = await midPage.evaluate(() => {
  const w = 1280
  const h = 622
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = '#070B16'
  ctx.fillRect(0, 0, w, h)
  let g = ctx.createRadialGradient(w * 0.72, h * 0.22, 0, w * 0.72, h * 0.22, w * 0.55)
  g.addColorStop(0, 'rgba(79, 70, 229, 0.55)')
  g.addColorStop(0.45, 'rgba(79, 70, 229, 0.18)')
  g.addColorStop(1, 'rgba(79, 70, 229, 0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, w, h)
  g = ctx.createRadialGradient(w * 0.18, h * 0.78, 0, w * 0.18, h * 0.78, w * 0.42)
  g.addColorStop(0, 'rgba(21, 198, 226, 0.32)')
  g.addColorStop(0.5, 'rgba(21, 198, 226, 0.1)')
  g.addColorStop(1, 'rgba(21, 198, 226, 0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, w, h)
  return canvas.toDataURL('image/webp', 0.8)
})
await writeFile(join(OUT, 'banner-shape-md.webp'), Buffer.from(midData.split(',')[1], 'base64'))

await browser.close()
console.log(`banner-shape.webp ${(buf.byteLength / 1024).toFixed(0)}KB`)
