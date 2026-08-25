/**
 * Spot-fix weak / non-mockup blog slots with device & UI mockups.
 * Usage: node scripts/fetch-blog-mockups-fix.mjs
 */
import { readFile, writeFile, rename, unlink } from 'node:fs/promises'
import { join } from 'node:path'
import sharp from 'sharp'

const OUT = join(process.cwd(), 'public', 'assets', 'images', 'blog')
const MIN = 20_000
const HERO = { w: 2400, h: 1500 }
const BODY = { w: 2000, h: 1250 }
const MID = { w: 1000, h: 625 }
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const redo = {
  'devops-pipelines-hero': {
    kind: 'unsplash',
    ids: [
      '1498050108023-c5249f4df085',
      '1534972195531-d756b9bfa9f2',
      '1558494949-ef010cbdcc31',
      '1483058712412-4245e9b90234',
    ],
  },
  'mern-architecture-hero': {
    kind: 'pexels',
    urls: [
      'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=3200',
      'https://images.pexels.com/photos/4709285/pexels-photo-4709285.jpeg?auto=compress&cs=tinysrgb&w=3200',
      'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=3200',
    ],
  },
  'nodejs-apis-hero': {
    kind: 'pexels',
    urls: [
      'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=3200',
      'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=3200',
      'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=3200',
    ],
  },
  'ai-integration-hero': {
    kind: 'pexels',
    urls: [
      'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=3200',
      'https://images.pexels.com/photos/5483077/pexels-photo-5483077.jpeg?auto=compress&cs=tinysrgb&w=3200',
      'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=3200',
    ],
  },
  'saas-subscriptions-body': {
    kind: 'pexels',
    urls: [
      'https://images.pexels.com/photos/6804079/pexels-photo-6804079.jpeg?auto=compress&cs=tinysrgb&w=2800',
      'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=2800',
      'https://images.pexels.com/photos/6476254/pexels-photo-6476254.jpeg?auto=compress&cs=tinysrgb&w=2800',
    ],
  },
  'ai-evaluation-body': {
    kind: 'pexels',
    urls: [
      'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=2800',
      'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=2800',
      'https://images.pexels.com/photos/5483077/pexels-photo-5483077.jpeg?auto=compress&cs=tinysrgb&w=2800',
    ],
  },
}

function unsplash(id, w, h) {
  return `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&crop=entropy&q=90&auto=format`
}

async function encode(buf, size, q) {
  return sharp(buf)
    .rotate()
    .resize(size.w, size.h, { fit: 'cover', position: 'attention' })
    .webp({ quality: q, effort: 6, smartSubsample: true })
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

const used = JSON.parse(await readFile(join(OUT, '_mockup-sources.json'), 'utf8'))
const taken = new Set(
  Object.values(used).filter((v) => typeof v === 'string' && !v.startsWith('pexels')),
)

for (const [slot, cfg] of Object.entries(redo)) {
  // Allow replacing this slot's own previous Unsplash id
  const prev = used[slot]
  if (typeof prev === 'string' && !prev.startsWith('pexels')) taken.delete(prev)

  const isHero = slot.endsWith('-hero')
  const size = isHero ? HERO : BODY
  let buffer
  let label

  if (cfg.kind === 'unsplash') {
    for (const id of cfg.ids) {
      if (taken.has(id)) continue
      const res = await fetch(unsplash(id, Math.round(size.w * 1.35), Math.round(size.h * 1.35)))
      if (!res.ok) {
        console.log('skip', id, res.status)
        continue
      }
      buffer = Buffer.from(await res.arrayBuffer())
      if (buffer.byteLength < MIN) continue
      label = id
      taken.add(id)
      break
    }
  } else {
    for (const u of cfg.urls) {
      const res = await fetch(u, { headers: { 'User-Agent': 'MernifyBlogAssets/1.0' } })
      if (!res.ok) {
        console.log('skip pexels', u, res.status)
        continue
      }
      buffer = Buffer.from(await res.arrayBuffer())
      if (buffer.byteLength < MIN) continue
      const m = u.match(/photos\/(\d+)/)
      label = `pexels-${m ? m[1] : 'unknown'}`
      break
    }
  }

  if (!buffer) throw new Error(`fail ${slot}`)

  const full = await encode(buffer, size, isHero ? 86 : 84)
  const mid = await encode(buffer, MID, 80)
  await writeSafe(join(OUT, `${slot}.webp`), full)
  await writeSafe(join(OUT, `${slot}-md.webp`), mid)
  used[slot] = label
  console.log(slot, label, `${Math.round(full.length / 1024)}KB`)
  await sharp(join(OUT, `${slot}.webp`))
    .resize(800)
    .jpeg({ quality: 85 })
    .toFile(join(OUT, `_preview-${slot}.jpg`))
}

await writeFile(join(OUT, '_mockup-sources.json'), JSON.stringify(used, null, 2))
console.log('done')
