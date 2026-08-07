/**
 * Premium Home-page photography — cohesive cool-tone tech/agency set.
 *
 * Each slot downloads a large WebP (2× display) plus an optional mid size
 * for srcset. Candidate Unsplash ids are tried in order so a retired photo
 * falls back instead of writing a 404.
 *
 * Usage: node scripts/fetch-home-images.mjs [slot ...]
 */
import { mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const THUMBS = join(process.cwd(), 'public', 'assets', 'images', 'thumbs')
const SHAPES = join(process.cwd(), 'public', 'assets', 'images', 'shapes')
const MIN_BYTES = 8_000

/**
 * Visual brief: cool neutrals, modern product/engineering craft, clean light.
 * Avoid purple-on-white AI clichés and warm cream/terracotta looks.
 */
const SLOTS = {
  /* Hero inset thumb — product craft, ~3:2 */
  'banner-thumb': {
    dir: THUMBS,
    w: 1600,
    h: 1070,
    mid: { w: 800, h: 535 },
    ids: ['1486312338219-ce68d2c6f44d', '1498050108023-c5249f4df085', '1517694712202-14dd9538aa97'],
  },
  /* Hero WebGL / CSS backdrop — dark atmospheric, wide */
  'banner-shape': {
    dir: SHAPES,
    w: 1920,
    h: 934,
    mid: { w: 1280, h: 622 },
    q: 68,
    ids: ['1557683311-eac922347067', '1579546929518-9e396f3cc809', '1618005182384-a83a8bd57fbe'],
  },
  /* About pair */
  'about-thumb-one': {
    dir: THUMBS,
    w: 1400,
    h: 1040,
    mid: { w: 700, h: 520 },
    ids: ['1521737711867-e3b97375f902', '1556761175-5973dc0f32e8', '1531482615713-2afd69097998'],
  },
  'about-thumb-two': {
    dir: THUMBS,
    w: 1400,
    h: 1040,
    mid: { w: 700, h: 520 },
    ids: ['1519389950473-47ba0277781c', '1581092160562-40aa08e78837', '1551434678-e076c223a1f6'],
  },
  /* Services carousel — one unique image per service, ~7:5 */
  'home-svc-pe': {
    dir: THUMBS,
    w: 1600,
    h: 1140,
    mid: { w: 800, h: 570 },
    ids: ['1553877522-43269d4ea984', '1522071820081-009f0129c71c', '1531482615713-2afd69097998'],
  },
  'home-svc-saas': {
    dir: THUMBS,
    w: 1600,
    h: 1140,
    mid: { w: 800, h: 570 },
    ids: ['1551288049-bebda4e38f71', '1460925895917-afdab827c52f', '1504868584819-f8e8b4b6d7e3'],
  },
  'home-svc-mobile': {
    dir: THUMBS,
    w: 1600,
    h: 1140,
    mid: { w: 800, h: 570 },
    ids: ['1512941937669-90a1b58e7e9c', '1511705170616-9048e71f5dbd', '1556656793-08538906a9f8'],
  },
  'home-svc-ai': {
    dir: THUMBS,
    w: 1600,
    h: 1140,
    mid: { w: 800, h: 570 },
    ids: ['1518186285589-2f7649de83e0', '1558494949-ef010cbdcc31', '1485827404703-89b55fcc595e'],
  },
  'home-svc-web': {
    dir: THUMBS,
    w: 1600,
    h: 1140,
    mid: { w: 800, h: 570 },
    ids: ['1498050108023-c5249f4df085', '1461749280684-dccba630e2f6', '1542831371-29b0f74f9713'],
  },
  'home-svc-uiux': {
    dir: THUMBS,
    w: 1600,
    h: 1140,
    mid: { w: 800, h: 570 },
    ids: ['1561070791-2526d30994b5', '1581291518857-4e27b48ff24e', '1559028012-481c04fa702d'],
  },
  /* Human badge avatars — square faces */
  'team-img1': {
    dir: THUMBS,
    w: 256,
    h: 256,
    crop: 'faces',
    ids: ['1507003211169-0a1dd7228f2d', '1472099645785-5658abf4ff4e', '1500648767791-00dcc994a43e'],
  },
  'team-img2': {
    dir: THUMBS,
    w: 256,
    h: 256,
    crop: 'faces',
    ids: ['1580489944761-15a19d654956', '1494790716321-8e1c8e4c5e8c', '1544005313-94ddf0286df2'],
  },
  'team-img3': {
    dir: THUMBS,
    w: 256,
    h: 256,
    crop: 'faces',
    ids: ['1500648767791-00dcc994a43e', '1506794778202-cad84cf45f1d', '1472099645785-5658abf4ff4e'],
  },
  'team-img4': {
    dir: THUMBS,
    w: 256,
    h: 256,
    crop: 'faces',
    ids: ['1438761681033-6461ffad8d80', '1544005313-94ddf0286df2', '1580489944761-15a19d654956'],
  },
  /* Human principle cards — tall portraits ~559:650 */
  'team-thumb1': {
    dir: THUMBS,
    w: 1120,
    h: 1300,
    mid: { w: 560, h: 650 },
    ids: ['1573497019940-1c28c88b4f3e', '1560250097-0b93528c311a', '1551836022-d5d88e9218df'],
  },
  'team-thumb2': {
    dir: THUMBS,
    w: 1120,
    h: 1300,
    mid: { w: 560, h: 650 },
    ids: ['1522202176988-662fde80e1fd', '1552664730-d307ca884978', '1517048676732-d65bc937f952'],
  },
  'team-thumb3': {
    dir: THUMBS,
    w: 1120,
    h: 1300,
    mid: { w: 560, h: 650 },
    ids: ['1551836022-d5d88e9218df', '1519085360229-c9ffb4689f43', '1560250097-0b93528c311a'],
  },
}

const only = process.argv.slice(2)
const failures = []

const url = (id, w, h, crop = 'entropy', q = 78) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&crop=${crop}&fm=webp&q=${q}&auto=compress`

async function download(id, w, h, crop = 'entropy', q = 78) {
  const res = await fetch(url(id, w, h, crop, q))
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const buffer = Buffer.from(await res.arrayBuffer())
  if (buffer.byteLength < MIN_BYTES) throw new Error(`too small (${buffer.byteLength}B)`)
  return buffer
}

await mkdir(THUMBS, { recursive: true })
await mkdir(SHAPES, { recursive: true })

for (const [slot, spec] of Object.entries(SLOTS)) {
  if (only.length && !only.includes(slot)) continue
  let done = false

  for (const id of spec.ids) {
    try {
      const crop = spec.crop || 'entropy'
      const q = spec.q || 78
      const buffer = await download(id, spec.w, spec.h, crop, q)
      const outName = `${slot}.webp`
      await writeFile(join(spec.dir, outName), buffer)
      console.log(
        `ok   ${outName}  ${spec.w}x${spec.h}  ${(buffer.byteLength / 1024).toFixed(0)}KB  (photo-${id})`,
      )

      if (spec.mid) {
        const midBuf = await download(id, spec.mid.w, spec.mid.h, crop, q)
        const midName = `${slot}-md.webp`
        await writeFile(join(spec.dir, midName), midBuf)
        console.log(
          `ok   ${midName}  ${spec.mid.w}x${spec.mid.h}  ${(midBuf.byteLength / 1024).toFixed(0)}KB`,
        )
      }

      done = true
      break
    } catch (error) {
      console.log(`skip ${slot} <- photo-${id}: ${error.message}`)
    }
  }

  if (!done) failures.push(slot)
}

if (failures.length) {
  console.error(`\nFAILED slots: ${failures.join(', ')}`)
  process.exitCode = 1
}
