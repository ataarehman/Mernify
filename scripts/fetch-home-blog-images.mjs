/**
 * Premium feature images for the home Latest Insights section.
 * Usage: node scripts/fetch-home-blog-images.mjs
 */
import { mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const THUMBS = join(process.cwd(), 'public', 'assets', 'images', 'thumbs')
const MIN = 12_000

const slots = {
  'home-blog-ai': {
    w: 1920,
    h: 1200,
    ids: [
      '1677442136019-21780ecad995',
      '1620712943543-bcc4688e7485',
      '1555949963-aa79dcee981c',
      '1518432031352-d6fc5c10da5a',
    ],
  },
  'home-blog-mern': {
    w: 1600,
    h: 1000,
    ids: [
      '1461749280684-dccba630e2f6',
      '1555066931-4365d14bab8c',
      '1498050108023-c5249f4df085',
      '1517180102446-f3ece451e9d8',
    ],
  },
  'home-blog-react': {
    w: 1600,
    h: 1000,
    ids: [
      '1551650975-87deedd944c3',
      '1512941937669-90a1b58e7e9c',
      '1587620962725-abab7fe55159',
      '1559028012-481c04fa702d',
    ],
  },
}

const url = (id, w, h) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&crop=entropy&fm=webp&q=82&auto=compress`

await mkdir(THUMBS, { recursive: true })

for (const [slot, spec] of Object.entries(slots)) {
  let ok = false
  for (const id of spec.ids) {
    try {
      const res = await fetch(url(id, spec.w, spec.h))
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const buf = Buffer.from(await res.arrayBuffer())
      if (buf.byteLength < MIN) throw new Error(`too small (${buf.byteLength}B)`)
      await writeFile(join(THUMBS, `${slot}.webp`), buf)
      console.log(`ok   ${slot}.webp  ${spec.w}x${spec.h}  ${(buf.byteLength / 1024).toFixed(0)}KB  (photo-${id})`)
      ok = true
      break
    } catch (error) {
      console.log(`skip ${slot} <- photo-${id}: ${error.message}`)
    }
  }
  if (!ok) {
    console.error(`FAILED ${slot}`)
    process.exitCode = 1
  }
}
