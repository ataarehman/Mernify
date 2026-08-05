/**
 * Downloads editorial industry photography into public/assets/images/industries.
 *
 * Two WebP widths per industry (1280 / 2400) so the stack panels can ship a
 * srcset instead of one oversized hero file. Candidates are tried in order and
 * validated, so a retired Unsplash photo falls back instead of writing a 404.
 *
 * Usage: node scripts/fetch-industry-images.mjs
 */
import { mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const OUT_DIR = join(process.cwd(), 'public', 'assets', 'images', 'industries')
const WIDTHS = [1280, 2400]
const MIN_BYTES = 20_000

/** Ordered Unsplash photo ids per industry — first one that downloads wins. */
const CANDIDATES = {
  healthcare: ['1666214280557-f1b5022eb634', '1584982751601-97dcc096659c', '1551076805-e1869033e561'],
  'financial-services': ['1590283603385-17ffb3a7f29f', '1579621970563-ebec7560ff3e', '1565514020179-026b92b2d70b'],
  logistics: ['1586528116311-ad8dd3c8310d', '1601584115197-04ecc0da31d7', '1494412574643-ff11b0a5c1c3'],
  construction: ['1541888946425-d81bb19240f5', '1504307651254-35680f356dfd', '1503387762-592deb58ef4e'],
  'real-estate': ['1512917774080-9991f1c4c750', '1560518883-ce09059eeffa', '1486406146926-c627a92ad1ab'],
  education: ['1523240795612-9a054b0db644', '1541339907198-e08756dedf3f', '1517486808906-6ca8b3f04846'],
  retail: ['1441986300917-64674bd600d8', '1472851294608-062f824d29cc', '1483985988355-763728e1935b'],
  manufacturing: ['1581092160562-40aa08e78837', '1516937941344-00b4e0337589'],
  'field-service': ['1621905251189-08b45d6a269e', '1504328345606-18bbc8c9d7d1', '1567789884554-0b844b597180'],
  travel: ['1436491865332-7a61a109cc05', '1488646953014-85cb44e25828', '1502920917128-1aa500764cbd'],
}

/** Optional slug filter: `node scripts/fetch-industry-images.mjs healthcare retail` */
const only = process.argv.slice(2)

function url(id, width) {
  const height = Math.round((width * 9) / 16)
  return `https://images.unsplash.com/photo-${id}?w=${width}&h=${height}&fit=crop&crop=entropy&fm=webp&q=76&auto=compress`
}

async function download(id, width) {
  const res = await fetch(url(id, width))
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const buffer = Buffer.from(await res.arrayBuffer())
  if (buffer.byteLength < MIN_BYTES) throw new Error(`too small (${buffer.byteLength}B)`)
  return buffer
}

await mkdir(OUT_DIR, { recursive: true })

const results = []

for (const [slug, ids] of Object.entries(CANDIDATES)) {
  if (only.length && !only.includes(slug)) continue
  let done = false

  for (const id of ids) {
    try {
      const files = await Promise.all(WIDTHS.map((width) => download(id, width)))
      await Promise.all(
        files.map((buffer, index) =>
          writeFile(join(OUT_DIR, `${slug}-${WIDTHS[index]}.webp`), buffer),
        ),
      )
      const kb = files.reduce((total, buffer) => total + buffer.byteLength, 0) / 1024
      results.push(`OK    ${slug.padEnd(20)} ${id}  ${kb.toFixed(0)} KB total`)
      done = true
      break
    } catch (error) {
      results.push(`retry ${slug.padEnd(20)} ${id}  ${error.message}`)
    }
  }

  if (!done) results.push(`FAIL  ${slug}`)
}

console.log(results.join('\n'))
