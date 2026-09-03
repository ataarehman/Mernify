/**
 * Hero + in-article WebPs for scalable SaaS pillar article.
 * Mix of Unsplash + Pexels; sharp → web-optimized full + -md.
 * Usage: node scripts/fetch-blog-scalable-saas-images.mjs
 */
import { mkdir, writeFile, rename, unlink } from 'node:fs/promises'
import { join } from 'node:path'
import sharp from 'sharp'

const OUT = join(process.cwd(), 'public', 'assets', 'images', 'blog')
const MIN = 20_000
const HERO = { w: 2400, h: 1500 }
const BODY = { w: 2000, h: 1250 }
const MID = { w: 1000, h: 625 }
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

/**
 * Distinct from prior weak reuse (1551288049 analytics laptop, 1498050108023 desk).
 * Direction: premium product/UI/ops craft photography — no lifestyle teen-coder stock.
 */
const SLOTS = {
  'scalable-saas-hero': {
    kind: 'mixed',
    // SaaS admin / analytics product craft — wide editorial hero
    sources: [
      { type: 'unsplash', id: '1771923082503-0a3381c46cef' },
      { type: 'unsplash', id: '1460925895917-afdab827c52f' },
      {
        type: 'pexels',
        url: 'https://images.pexels.com/photos/6476254/pexels-photo-6476254.jpeg?auto=compress&cs=tinysrgb&w=3200',
        label: 'pexels-6476254',
      },
      { type: 'unsplash', id: '1504868584819-f8e8b4b6d7e3' },
      {
        type: 'pexels',
        url: 'https://images.pexels.com/photos/6804079/pexels-photo-6804079.jpeg?auto=compress&cs=tinysrgb&w=3200',
        label: 'pexels-6804079',
      },
    ],
  },
  // Architecture / modular boundaries (existing body path)
  'scalable-saas-body': {
    kind: 'mixed',
    sources: [
      {
        type: 'pexels',
        url: 'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=3200',
        label: 'pexels-1714208',
      },
      { type: 'unsplash', id: '1531297484001-80022131f5a1' },
      { type: 'unsplash', id: '1555066931-4365d14bab8c' },
      {
        type: 'pexels',
        url: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=3200',
        label: 'pexels-1181244',
      },
      { type: 'unsplash', id: '1517694712202-14dd9538aa97' },
    ],
  },
  // Security / reliability / ops
  'scalable-saas-ops': {
    kind: 'mixed',
    sources: [
      { type: 'unsplash', id: '1558494949-ef010cbdcc31' },
      { type: 'unsplash', id: '1667372393119-3d4c48d07fc9' },
      { type: 'unsplash', id: '1544197150-b99a41b3ff8f' },
      {
        type: 'pexels',
        url: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=2800',
        label: 'pexels-1181675',
      },
    ],
  },
  // Roadmap / planning checklist craft
  'scalable-saas-roadmap': {
    kind: 'mixed',
    sources: [
      { type: 'unsplash', id: '1454165804606-c3d57bc86b40' },
      { type: 'unsplash', id: '1486312338219-ce68d2c6f44d' },
      { type: 'unsplash', id: '1611224923853-80b023f02d71' },
      {
        type: 'pexels',
        url: 'https://images.pexels.com/photos/6804079/pexels-photo-6804079.jpeg?auto=compress&cs=tinysrgb&w=2800',
        label: 'pexels-6804079',
      },
    ],
  },
}

function unsplashUrl(id, w, h) {
  return `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&crop=entropy&q=90&auto=format`
}

async function encode(buffer, size, quality) {
  return sharp(buffer)
    .rotate()
    .resize(size.w, size.h, { fit: 'cover', position: 'attention' })
    .webp({ quality, effort: 6, smartSubsample: true })
    .toBuffer()
}

async function writeSafe(path, buf) {
  const tmp = `${path}.tmp`
  await writeFile(tmp, buf)
  for (let i = 0; i < 8; i++) {
    try {
      await rename(tmp, path)
      return
    } catch {
      await sleep(200 * (i + 1))
    }
  }
  await writeFile(path, buf)
  try {
    await unlink(tmp)
  } catch {
    /* ignore */
  }
}

async function fetchSource(source, w, h) {
  let url
  let label
  if (source.type === 'unsplash') {
    url = unsplashUrl(source.id, w, h)
    label = source.id
  } else {
    url = source.url
    label = source.label
  }
  const res = await fetch(url, {
    headers: {
      Accept: 'image/avif,image/webp,image/*,*/*;q=0.8',
      'User-Agent': 'MernifyBlogAssets/1.0',
    },
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const buffer = Buffer.from(await res.arrayBuffer())
  if (buffer.byteLength < MIN) throw new Error(`too small (${buffer.byteLength})`)
  return { buffer, label }
}

async function fetchFirst(sources, w, h) {
  let lastError = null
  for (const source of sources) {
    try {
      return await fetchSource(source, w, h)
    } catch (error) {
      lastError = error
      const id = source.id || source.label || 'unknown'
      console.log(`  skip ${id}: ${error.message}`)
    }
  }
  throw lastError || new Error('no candidates')
}

await mkdir(OUT, { recursive: true })

const used = {}

for (const [slot, cfg] of Object.entries(SLOTS)) {
  const isHero = slot.endsWith('-hero')
  const fullSize = isHero ? HERO : BODY
  console.log(`\n${slot}`)
  const fetchW = Math.round(fullSize.w * 1.35)
  const fetchH = Math.round(fullSize.h * 1.35)
  const { buffer, label } = await fetchFirst(cfg.sources, fetchW, fetchH)
  console.log(`  source: ${label}`)
  const full = await encode(buffer, fullSize, isHero ? 86 : 84)
  const mid = await encode(buffer, MID, 80)
  await writeSafe(join(OUT, `${slot}.webp`), full)
  await writeSafe(join(OUT, `${slot}-md.webp`), mid)
  await sharp(full).resize(1200).jpeg({ quality: 88 }).toFile(join(OUT, `_preview-${slot}.jpg`))
  used[slot] = label
  console.log(`  wrote ${slot}.webp (${Math.round(full.byteLength / 1024)}KB)`)
  console.log(`  wrote ${slot}-md.webp (${Math.round(mid.byteLength / 1024)}KB)`)
}

await writeFile(join(OUT, '_scalable-saas-sources.json'), JSON.stringify(used, null, 2))
console.log('\nDone.', used)
