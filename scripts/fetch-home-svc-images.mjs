/**
 * Re-fetch + sharp-optimize Home services carousel thumbs.
 * Downloads large Unsplash sources, then encodes exact WebP (+ optional AVIF)
 * sized for the carousel thumb (1600×1140 / 800×570).
 *
 * Usage: node scripts/fetch-home-svc-images.mjs
 */
import { mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import sharp from 'sharp'

const THUMBS = join(process.cwd(), 'public', 'assets', 'images', 'thumbs')
const MIN_BYTES = 12_000

/** Premium product / workspace visuals — cool neutrals, SaaS craft, no purple clichés. */
const SLOTS = {
  'home-svc-pe': {
    // Product strategy workshop / engineering collaboration
    ids: ['1553877522-43269d4ea984', '1522071820081-009f0129c71c', '1531482615713-2afd69097998'],
  },
  'home-svc-saas': {
    // Analytics dashboard on laptop — multi-tenant SaaS feel
    ids: ['1551288049-bebda4e38f71', '1460925895917-afdab827c52f', '1504868584819-f8e8b4b6d7e3'],
  },
  'home-svc-mobile': {
    // Premium handheld product UI
    ids: ['1512941937669-90a1b58e7e9c', '1511705170616-9048e71f5dbd', '1556656793-08538906a9f8'],
  },
  'home-svc-ai': {
    // Data center / applied ML infrastructure (practical, not stock-robot)
    ids: ['1558494949-ef010cbdcc31', '1518186285589-2f7649de83e0', '1485827404703-89b55fcc595e'],
  },
  'home-svc-web': {
    // Modern frontend craft / clean developer workspace
    ids: ['1498050108023-c5249f4df085', '1461749280684-dccba630e2f6', '1542831371-29b0f74f9713'],
  },
  'home-svc-uiux': {
    // Design systems / interface craft desk
    ids: ['1561070791-2526d30994b5', '1581291518857-4e27b48ff24e', '1559028012-481c04fa702d'],
  },
}

const FULL = { w: 1600, h: 1140 }
const MID = { w: 800, h: 570 }

function sourceUrl(id) {
  // Request a very large source; sharp crops to the exact container ratio.
  return `https://images.unsplash.com/photo-${id}?w=3200&h=2280&fit=crop&crop=entropy&q=90&auto=format`
}

async function fetchBuffer(id) {
  const res = await fetch(sourceUrl(id), {
    headers: { 'Accept': 'image/avif,image/webp,image/*,*/*;q=0.8' },
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const buffer = Buffer.from(await res.arrayBuffer())
  if (buffer.byteLength < MIN_BYTES) throw new Error(`too small (${buffer.byteLength}B)`)
  return buffer
}

async function encodePair(buffer, slot) {
  const pipeline = sharp(buffer).rotate()

  const fullWebp = await pipeline
    .clone()
    .resize(FULL.w, FULL.h, { fit: 'cover', position: 'attention' })
    .webp({ quality: 82, effort: 6, smartSubsample: true })
    .toBuffer()

  const midWebp = await pipeline
    .clone()
    .resize(MID.w, MID.h, { fit: 'cover', position: 'attention' })
    .webp({ quality: 78, effort: 6, smartSubsample: true })
    .toBuffer()

  // AVIF companions for browsers that prefer them (optional; WebP remains primary).
  const fullAvif = await pipeline
    .clone()
    .resize(FULL.w, FULL.h, { fit: 'cover', position: 'attention' })
    .avif({ quality: 58, effort: 6 })
    .toBuffer()

  const midAvif = await pipeline
    .clone()
    .resize(MID.w, MID.h, { fit: 'cover', position: 'attention' })
    .avif({ quality: 52, effort: 6 })
    .toBuffer()

  await writeFile(join(THUMBS, `${slot}.webp`), fullWebp)
  await writeFile(join(THUMBS, `${slot}-md.webp`), midWebp)
  await writeFile(join(THUMBS, `${slot}.avif`), fullAvif)
  await writeFile(join(THUMBS, `${slot}-md.avif`), midAvif)

  return {
    webpKb: Math.round(fullWebp.length / 1024),
    midKb: Math.round(midWebp.length / 1024),
    avifKb: Math.round(fullAvif.length / 1024),
  }
}

await mkdir(THUMBS, { recursive: true })
const failures = []

for (const [slot, spec] of Object.entries(SLOTS)) {
  let done = false
  for (const id of spec.ids) {
    try {
      const buffer = await fetchBuffer(id)
      const sizes = await encodePair(buffer, slot)
      console.log(
        `ok  ${slot}  photo-${id}  webp ${sizes.webpKb}KB / md ${sizes.midKb}KB / avif ${sizes.avifKb}KB`,
      )
      done = true
      break
    } catch (error) {
      console.log(`skip ${slot} <- photo-${id}: ${error.message}`)
    }
  }
  if (!done) failures.push(slot)
}

if (failures.length) {
  console.error(`\nFAILED: ${failures.join(', ')}`)
  process.exitCode = 1
}
