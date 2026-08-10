import { mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import sharp from 'sharp'

const OUT = join(process.cwd(), 'public', 'assets', 'images', 'blog')
const MIN = 20_000
const redo = {
  'nodejs-apis-body': ['1517694712202-14dd9538aa97', '1534972195531-d756b9bfa9f2', '1498050108023-c5249f4df085'],
  'ai-evaluation-hero': ['1620712943543-bcc4688e7485', '1555949963-aa79dcee981c', '1485827404703-89b55fcc595e'],
  'cloud-tenancy-hero': ['1518770660439-4636190af475', '1544197150-b99a41b3ff8f', '1454165804606-c3d57bc86b40'],
  'product-engineering-body': ['1498050108023-c5249f4df085', '1542831371-29b0f74f9713', '1517694712202-14dd9538aa97'],
  'saas-subscriptions-body': ['1551288049-bebda4e38f71', '1504868584819-f8e8b4b6d7e3', '1553729459-efe14ef6055d'],
  'ux-research-body': ['1581291518857-4e27b48ff24e', '1559028012-481c04fa702d', '1542744173-8e7e53415bb0'],
}

const HERO = { w: 2400, h: 1500 }
const BODY = { w: 2000, h: 1250 }
const MID = { w: 1000, h: 625 }

const sourceUrl = (id, w, h) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&crop=entropy&q=90&auto=format`

async function fetchFirst(ids, w, h) {
  for (const id of ids) {
    try {
      const res = await fetch(sourceUrl(id, w, h))
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const buffer = Buffer.from(await res.arrayBuffer())
      if (buffer.byteLength < MIN) throw new Error('small')
      return { buffer, id }
    } catch (error) {
      console.log(' skip', id, error.message)
    }
  }
  throw new Error('fail')
}

async function encode(buffer, size, q) {
  return sharp(buffer)
    .rotate()
    .resize(size.w, size.h, { fit: 'cover', position: 'attention' })
    .webp({ quality: q, effort: 6, smartSubsample: true })
    .toBuffer()
}

await mkdir(OUT, { recursive: true })
for (const [slot, ids] of Object.entries(redo)) {
  const isHero = slot.endsWith('-hero')
  const size = isHero ? HERO : BODY
  console.log('redo', slot)
  const { buffer, id } = await fetchFirst(ids, Math.round(size.w * 1.35), Math.round(size.h * 1.35))
  const full = await encode(buffer, size, isHero ? 84 : 82)
  const mid = await encode(buffer, MID, 78)
  await writeFile(join(OUT, `${slot}.webp`), full)
  await writeFile(join(OUT, `${slot}-md.webp`), mid)
  console.log(' ok', id, `${Math.round(full.length / 1024)}KB`)
}
