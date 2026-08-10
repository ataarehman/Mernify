/**
 * Fetch + optimize premium blog imagery in the Home Services aesthetic:
 * cool-neutral SaaS craft photography, high-res WebP (+ mid variants).
 *
 * Usage: node scripts/fetch-blog-images.mjs
 */
import { mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import sharp from 'sharp'

const OUT = join(process.cwd(), 'public', 'assets', 'images', 'blog')
const MIN = 20_000

/**
 * Unique Unsplash photo IDs per slot (primary + fallbacks).
 * Visual direction matches Home Services: craft desks, product UI, infra, collaboration.
 */
const SLOTS = {
  'ai-integration-hero': ['1677442136019-21780ecad995', '1620712943543-bcc4688e7485', '1555949963-aa79dcee981c'],
  'ai-integration-body': ['1558494949-ef010cbdcc31', '1518186285589-2f7649de83e0', '1485827404703-89b55fcc595e'],
  'mern-architecture-hero': ['1461749280684-dccba630e2f6', '1498050108023-c5249f4df085', '1542831371-29b0f74f9713'],
  'mern-architecture-body': ['1555066931-4365d14bab8c', '1517694712202-14dd9538aa97', '1534972195531-d756b9bfa9f2'],
  'react-performance-hero': ['1633356122544-f134324a6cee', '1516321318423-f06f85e504b3', '1454165804606-c3d57bc86b40'],
  'react-performance-body': ['1551288049-bebda4e38f71', '1460925895917-afdab827c52f', '1504868584819-f8e8b4b6d7e3'],
  'nodejs-apis-hero': ['1451188502541-35893074494f', '1518770660439-4636190af475', '1504639725590-34d0984388bd'],
  'nodejs-apis-body': ['1526374960328-7f5faa57d3df', '1516321497487-e1167a9a0c3f', '1555949963-ff9c90123986'],
  'cloud-tenancy-hero': ['1544197150-b99a41b3ff8f', '1451188502541-35893074494f', '1558494949-ef010cbdcc31'],
  'cloud-tenancy-body': ['1454165804606-c3d57bc86b40', '1460925895917-afdab827c52f', '1553877522-43269d4ea984'],
  'devops-pipelines-hero': ['1516321318423-f06f85e504b3', '1522071820081-009f0129c71c', '1558494949-ef010cbdcc31'],
  'devops-pipelines-body': ['1531482615713-2afd69097998', '1454165804606-c3d57bc86b40', '1498050108023-c5249f4df085'],
  'design-systems-hero': ['1561070791-2526d30994b5', '1581291518857-4e27b48ff24e', '1559028012-481c04fa702d'],
  'design-systems-body': ['1558655146-d09347e92766', '1618005182384-a83a8bd57fbe', '1542744173-8e7e53415bb0'],
  'enterprise-buying-hero': ['1556761175-5973dc0f32e7', '1552664730-d307ca884978', '1542744173-8e7e53415bb0'],
  'enterprise-buying-body': ['1460925895917-afdab827c52f', '1551288049-bebda4e38f71', '1504868584819-f8e8b4b6d7e3'],
  'product-engineering-hero': ['1553877522-43269d4ea984', '1522071820081-009f0129c71c', '1531482615713-2afd69097998'],
  'product-engineering-body': ['1516321497487-e1167a9a0c3f', '1454165804606-c3d57bc86b40', '1498050108023-c5249f4df085'],
  'saas-subscriptions-hero': ['1556740758-90de798b032d', '1563986768609-322da13575f3', '1551288049-bebda4e38f71'],
  'saas-subscriptions-body': ['1460925895917-afdab827c52f', '1504868584819-f8e8b4b6d7e3', '1553729459-efe14ef6055d'],
  'ux-research-hero': ['1586717791821-3f44a563fa4c', '1573164713984-8665ff39b0f0', '1559028012-481c04fa702d'],
  'ux-research-body': ['1561070791-2526d30994b5', '1581291518857-4e27b48ff24e', '1542744173-8e7e53415bb0'],
  'ai-evaluation-hero': ['1677442136019-21780ecad995', '1485827404703-89b55fcc595e', '1620712943543-bcc4688e7485'],
  'ai-evaluation-body': ['1555949963-aa79dcee981c', '1518186285589-2f7649de83e0', '1558494949-ef010cbdcc31'],
}

const HERO = { w: 2400, h: 1500 }
const BODY = { w: 2000, h: 1250 }
const MID = { w: 1000, h: 625 }

function sourceUrl(id, w, h) {
  return `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&crop=entropy&q=90&auto=format`
}

async function fetchFirst(ids, w, h) {
  let lastError = null
  for (const id of ids) {
    try {
      const res = await fetch(sourceUrl(id, w, h), {
        headers: { Accept: 'image/avif,image/webp,image/*,*/*;q=0.8' },
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const buffer = Buffer.from(await res.arrayBuffer())
      if (buffer.byteLength < MIN) throw new Error(`too small (${buffer.byteLength})`)
      return { buffer, id }
    } catch (error) {
      lastError = error
      console.log(`  skip ${id}: ${error.message}`)
    }
  }
  throw lastError || new Error('no candidates')
}

async function encode(buffer, size, quality) {
  return sharp(buffer)
    .rotate()
    .resize(size.w, size.h, { fit: 'cover', position: 'attention' })
    .webp({ quality, effort: 6, smartSubsample: true })
    .toBuffer()
}

await mkdir(OUT, { recursive: true })

let failed = 0
for (const [slot, ids] of Object.entries(SLOTS)) {
  const isHero = slot.endsWith('-hero')
  const size = isHero ? HERO : BODY
  console.log(`fetch ${slot}…`)
  try {
    const { buffer, id } = await fetchFirst(ids, Math.round(size.w * 1.35), Math.round(size.h * 1.35))
    const full = await encode(buffer, size, isHero ? 84 : 82)
    const mid = await encode(buffer, MID, 78)
    await writeFile(join(OUT, `${slot}.webp`), full)
    await writeFile(join(OUT, `${slot}-md.webp`), mid)
    console.log(
      `  ok photo-${id} ${size.w}x${size.h} ${Math.round(full.length / 1024)}KB (+md ${Math.round(mid.length / 1024)}KB)`,
    )
  } catch (error) {
    failed += 1
    console.error(`  FAIL ${slot}: ${error.message}`)
  }
}

if (failed) {
  console.error(`Completed with ${failed} failures`)
  process.exit(1)
}
console.log('done')
