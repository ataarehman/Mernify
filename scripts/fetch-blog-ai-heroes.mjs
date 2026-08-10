import { writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import sharp from 'sharp'

const OUT = join(process.cwd(), 'public', 'assets', 'images', 'blog')
const redo = {
  // Match Home Services AI craft: infra / applied ML environments (not stock 3D letters)
  'ai-integration-hero': ['1518186285589-2f7649de83e0', '1485827404703-89b55fcc595e', '1558494949-ef010cbdcc31'],
  'ai-evaluation-hero': ['1558494949-ef010cbdcc31', '1518770660439-4636190af475', '1454165804606-c3d57bc86b40'],
}

const HERO = { w: 2400, h: 1500 }
const MID = { w: 1000, h: 625 }
const url = (id, w, h) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&crop=entropy&q=90&auto=format`

for (const [slot, ids] of Object.entries(redo)) {
  let buffer
  let used
  for (const id of ids) {
    const res = await fetch(url(id, 3200, 2000))
    if (!res.ok) continue
    buffer = Buffer.from(await res.arrayBuffer())
    if (buffer.byteLength < 20000) continue
    used = id
    break
  }
  if (!buffer) throw new Error(`fail ${slot}`)
  const full = await sharp(buffer)
    .rotate()
    .resize(HERO.w, HERO.h, { fit: 'cover', position: 'attention' })
    .webp({ quality: 82, effort: 6, smartSubsample: true })
    .toBuffer()
  const mid = await sharp(buffer)
    .rotate()
    .resize(MID.w, MID.h, { fit: 'cover', position: 'attention' })
    .webp({ quality: 78, effort: 6, smartSubsample: true })
    .toBuffer()
  await writeFile(join(OUT, `${slot}.webp`), full)
  await writeFile(join(OUT, `${slot}-md.webp`), mid)
  console.log(slot, used, Math.round(full.length / 1024) + 'KB')
}
