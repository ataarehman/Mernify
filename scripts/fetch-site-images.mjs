/**
 * Downloads the unique photography needed to stop sections sharing images.
 *
 * Each slot lists candidate Unsplash ids and takes the first that downloads at
 * a plausible size, so a retired photo falls back instead of writing a 404.
 * Sizes match (or 2x) the slot they fill, so nothing gets upscaled in layout.
 *
 * Usage: node scripts/fetch-site-images.mjs [slot ...]
 */
import { mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const THUMBS = join(process.cwd(), 'public', 'assets', 'images', 'thumbs')
const SERVICES = join(process.cwd(), 'public', 'assets', 'images', 'services')
const MIN_BYTES = 12_000

const SLOTS = {
  /* --- service detail pages ---------------------------------------------
     Each page has six media slots but only shipped two distinct bitmaps, so
     the hero art repeated up to four times per page. These fill the strip,
     methodology and "why" slots for the four services that were affected. */
  'web-strip': { dir: SERVICES, w: 1920, h: 960, ids: ['1498050108023-c5249f4df085', '1517180102446-f3ece451e9d8', '1555066931-4365d14bab8c'] },
  'web-method': { dir: SERVICES, w: 1600, h: 1000, ids: ['1531973576160-7125cd663d86', '1587620962725-abab7fe55159', '1454165804606-c3d57bc86b40'] },
  'web-why': { dir: SERVICES, w: 1600, h: 1000, ids: ['1551288049-bebda4e38f71', '1460925895917-afdab827c52f', '1543286386-713bdd548da4'] },

  'mobile-strip': { dir: SERVICES, w: 1920, h: 960, ids: ['1512941937669-90a1b58e7e9c', '1522125670776-3c7abb882bc2', '1481887328591-3e277f9473dc'] },
  'mobile-method': { dir: SERVICES, w: 1600, h: 1000, ids: ['1526498460520-4c246339dccb', '1555774698-0b77e0d5fac6', '1512941937669-90a1b58e7e9c'] },
  'mobile-why': { dir: SERVICES, w: 1600, h: 1000, ids: ['1556656793-08538906a9f8', '1607252650355-f7fd0460ccdb', '1611262588024-d12430b98920'] },

  'ai-strip': { dir: SERVICES, w: 1920, h: 960, ids: ['1518432031352-d6fc5c10da5a', '1526379095098-d400fd0bf935', '1677442136019-21780ecad995'] },
  'ai-method': { dir: SERVICES, w: 1600, h: 1000, ids: ['1551434678-e076c223a692', '1573164713988-8665fc963095', '1581092160562-40aa08e78837'] },
  'ai-why': { dir: SERVICES, w: 1600, h: 1000, ids: ['1591696205602-2f950c417cb9', '1460925895917-afdab827c52f', '1543286386-713bdd548da4'] },

  'uiux-strip': { dir: SERVICES, w: 1920, h: 960, ids: ['1587440871875-191322ee64b0', '1600607686527-6fb886090705', '1524749292158-7540c2494e83'] },
  'uiux-method': { dir: SERVICES, w: 1600, h: 1000, ids: ['1519389950473-47ba0277781c', '1542626991-cbc4e32524cc', '1553877522-43269d4ea984'] },
  /* Closing CTA art. Previously each page re-showed its own hero bitmap here,
     so the same picture bookended every service page. */
  'web-cta': { dir: SERVICES, w: 1400, h: 1000, ids: ['1600880292203-757bb62b4baf', '1517245386807-bb43f82c33c4', '1517048676732-d65bc937f952'] },
  'mobile-cta': { dir: SERVICES, w: 1400, h: 1000, ids: ['1512486130939-2c4f79935e4f', '1581091226825-a6a2a5aee158', '1573164713988-8665fc963095'] },
  'ai-cta': { dir: SERVICES, w: 1400, h: 1000, ids: ['1573164713988-8665fc963095', '1581092160562-40aa08e78837', '1552664730-d307ca884978'] },
  'uiux-cta': { dir: SERVICES, w: 1400, h: 1000, ids: ['1542626991-cbc4e32524cc', '1581291518857-4e27b48ff24e', '1586717791821-3f44a563fa4c'] },
  'pe-cta': { dir: SERVICES, w: 1400, h: 1000, ids: ['1552664730-d307ca884978', '1517048676732-d65bc937f952', '1531482615713-2afd69097998'] },
  'saas-cta': { dir: SERVICES, w: 1400, h: 1000, ids: ['1517048676732-d65bc937f952', '1454165804606-c3d57bc86b40', '1531482615713-2afd69097998'] },

  'saas-why': { dir: SERVICES, w: 1600, h: 1000, ids: ['1553877522-43269d4ea984', '1600880292203-757bb62b4baf', '1542744173-8e7e53415bb0'] },

  'uiux-why': { dir: SERVICES, w: 1600, h: 1000, ids: ['1559028012-481c04fa702d', '1586717791821-3f44a563fa4c', '1581291518857-4e27b48ff24e'] },

  // Services carousel — the UI/UX slide previously reused the first slide's art.
  'service-slide-uiux': {
    w: 1160,
    h: 828,
    ids: ['1561070791-2526d30994b5', '1586717791821-3f44a563fa4c', '1559028012-481c04fa702d'],
  },
  // Services intro pair — previously borrowed the home page's about thumbs.
  'services-intro-1': {
    w: 1000,
    h: 740,
    ids: ['1522071820081-009f0129c71c', '1531482615713-2afd69097998', '1600880292203-757bb62b4baf'],
  },
  'services-intro-2': {
    w: 1000,
    h: 740,
    ids: ['1461749280684-dccba630e2f6', '1555949963-aa79dcee981c', '1517180102446-f3ece451e9d8'],
  },
  // About "how we work" panels — previously reused the team member portraits.
  'value-communication': {
    w: 780,
    h: 780,
    ids: ['1600880292089-90a7e086ee0c', '1573497491208-6b1acb260507', '1552664730-d307ca884978'],
  },
  'value-craft': {
    w: 780,
    h: 780,
    ids: ['1531403009284-440f080d1e12', '1517245386807-bb43f82c33c4', '1454165804606-c3d57bc86b40'],
  },
  'value-ownership': {
    w: 780,
    h: 780,
    ids: ['1521737604893-d14cc237f11d', '1519389950473-47ba0277781c', '1542744173-8e7e53415bb0'],
  },
}

const only = process.argv.slice(2)

const url = (id, w, h) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&crop=entropy&fm=webp&q=78&auto=compress`

async function download(id, w, h) {
  const res = await fetch(url(id, w, h))
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const buffer = Buffer.from(await res.arrayBuffer())
  if (buffer.byteLength < MIN_BYTES) throw new Error(`too small (${buffer.byteLength}B)`)
  return buffer
}

await mkdir(THUMBS, { recursive: true })
await mkdir(SERVICES, { recursive: true })

const failures = []

for (const [slot, spec] of Object.entries(SLOTS)) {
  if (only.length && !only.includes(slot)) continue
  let done = false

  for (const id of spec.ids) {
    try {
      const buffer = await download(id, spec.w, spec.h)
      await writeFile(join(spec.dir ?? THUMBS, `${slot}.webp`), buffer)
      console.log(
        `ok   ${slot}.webp  ${spec.w}x${spec.h}  ${(buffer.byteLength / 1024).toFixed(0)}KB  (photo-${id})`,
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
  console.error(`\nFAILED slots: ${failures.join(', ')}`)
  process.exitCode = 1
}
