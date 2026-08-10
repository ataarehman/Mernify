import { writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import sharp from 'sharp'

const OUT = join(process.cwd(), 'public', 'assets', 'images', 'blog')
const id = '1485827404703-89b55fcc595e'
const res = await fetch(
  `https://images.unsplash.com/photo-${id}?w=2700&h=1680&fit=crop&crop=entropy&q=90&auto=format`,
)
const buffer = Buffer.from(await res.arrayBuffer())
const BODY = { w: 2000, h: 1250 }
const MID = { w: 1000, h: 625 }
const full = await sharp(buffer)
  .rotate()
  .resize(BODY.w, BODY.h, { fit: 'cover', position: 'attention' })
  .webp({ quality: 82, effort: 6, smartSubsample: true })
  .toBuffer()
const mid = await sharp(buffer)
  .rotate()
  .resize(MID.w, MID.h, { fit: 'cover', position: 'attention' })
  .webp({ quality: 78, effort: 6, smartSubsample: true })
  .toBuffer()
await writeFile(join(OUT, 'ai-integration-body.webp'), full)
await writeFile(join(OUT, 'ai-integration-body-md.webp'), mid)
console.log('ai-integration-body', Math.round(full.length / 1024) + 'KB')
