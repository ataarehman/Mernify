/**
 * Replace all blog hero/body imagery with premium mockup-style WebPs.
 * Aesthetic: device/UI/dashboard/code-editor product photography (high web res).
 *
 * Usage: node scripts/fetch-blog-mockups.mjs
 */
import { mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import sharp from 'sharp'

const OUT = join(process.cwd(), 'public', 'assets', 'images', 'blog')
const MIN = 20_000

/**
 * Unique Unsplash photo IDs per slot (primary + fallbacks).
 * Direction: laptop/desktop UI mockups, dashboards, code editors, phones, clean product craft.
 */
const SLOTS = {
  // AI → modern product UI / applied systems (not abstract “AI letters”)
  'ai-integration-hero': [
    '1629654297299-c8509421d321',
    '1771923082503-0a3381c46cef',
    '1551288049-bebda4e38f71',
  ],
  'ai-integration-body': [
    '1460925895917-afdab827c52f',
    '1504868584819-f8e8b4b6d7e3',
    '1454165804606-c3d57bc86b40',
  ],
  // MERN → full-stack code / architecture craft
  'mern-architecture-hero': [
    '1461749280684-dccba630e2f6',
    '1498050108023-c5249f4df085',
    '1531297484001-80022131f5a1',
  ],
  'mern-architecture-body': [
    '1555066931-4365d14bab8c',
    '1517694712202-14dd9538aa97',
    '1542831371-29b0f74f9713',
  ],
  // React performance → device / mobile UI mockups
  'react-performance-hero': [
    '1551650975-87deedd944c3',
    '1512941937669-90a1b58e7e9c',
    '1525547719571-a2d4ac89330f',
  ],
  'react-performance-body': [
    '1512941937669-90a1b58e7e9c',
    '1483058712412-4245e9b90234',
    '1531297484001-80022131f5a1',
  ],
  // Node APIs → terminals / API craft screens
  'nodejs-apis-hero': [
    '1526374960328-7f5faa57d3df',
    '1555949963-aa79dcee981c',
    '1504639725590-34d0984388bd',
  ],
  'nodejs-apis-body': [
    '1504639725590-34d0984388bd',
    '1534972195531-d756b9bfa9f2',
    '1518770660439-4636190af475',
  ],
  // Cloud multi-tenancy → infra + admin/control surfaces
  'cloud-tenancy-hero': [
    '1451188502541-35893074494f',
    '1544197150-b99a41b3ff8f',
    '1558494949-ef010cbdcc31',
  ],
  'cloud-tenancy-body': [
    '1771923082503-0a3381c46cef',
    '1551288049-bebda4e38f71',
    '1504868584819-f8e8b4b6d7e3',
  ],
  // DevOps → pipeline / workstation / delivery screens
  'devops-pipelines-hero': [
    '1667372393119-3d4c48d07fc9',
    '1516321318423-f06f85e504b3',
    '1558494949-ef010cbdcc31',
  ],
  'devops-pipelines-body': [
    '1517694712202-14dd9538aa97',
    '1498050108023-c5249f4df085',
    '1454165804606-c3d57bc86b40',
  ],
  // Design systems → UI kits / component craft
  'design-systems-hero': [
    '1561070791-2526d30994b5',
    '1772272935464-2e90d8218987',
    '1581291518857-4e27b48ff24e',
  ],
  'design-systems-body': [
    '1581291518857-4e27b48ff24e',
    '1559028012-481c04fa702d',
    '1558655146-d09347e92766',
  ],
  // Enterprise buying → SaaS admin / product evaluation surfaces
  'enterprise-buying-hero': [
    '1504868584819-f8e8b4b6d7e3',
    '1460925895917-afdab827c52f',
    '1454165804606-c3d57bc86b40',
  ],
  'enterprise-buying-body': [
    '1551288049-bebda4e38f71',
    '1771923082503-0a3381c46cef',
    '1563986768609-322da13575f3',
  ],
  // Product engineering → multi-device desk / delivery craft
  'product-engineering-hero': [
    '1519389950473-47ba0277781c',
    '1486312338219-ce68d2c6f44d',
    '1531482615713-2afd69097998',
  ],
  'product-engineering-body': [
    '1486312338219-ce68d2c6f44d',
    '1611224923853-80b023f02d71',
    '1498050108023-c5249f4df085',
  ],
  // SaaS subscriptions → analytics / billing-adjacent product UI
  'saas-subscriptions-hero': [
    '1551288049-bebda4e38f71',
    '1460925895917-afdab827c52f',
    '1504868584819-f8e8b4b6d7e3',
  ],
  'saas-subscriptions-body': [
    '1563986768609-322da13575f3',
    '1556740758-90de798b032d',
    '1771923082503-0a3381c46cef',
  ],
  // UX research → wireframes / prototype craft (not selfie stock)
  'ux-research-hero': [
    '1586717791821-3f44a563fa4c',
    '1559028012-481c04fa702d',
    '1561070791-2526d30994b5',
  ],
  'ux-research-body': [
    '1559028012-481c04fa702d',
    '1581291518857-4e27b48ff24e',
    '1772272935464-2e90d8218987',
  ],
  // AI evaluation → code/eval dashboards
  'ai-evaluation-hero': [
    '1555949963-aa79dcee981c',
    '1516321318423-f06f85e504b3',
    '1629654297299-c8509421d321',
  ],
  'ai-evaluation-body': [
    '1516321497487-e288fb19713f',
    '1460925895917-afdab827c52f',
    '1551288049-bebda4e38f71',
  ],
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

const used = {}
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
    used[slot] = id
    console.log(
      `  ok photo-${id} ${size.w}x${size.h} ${Math.round(full.length / 1024)}KB (+md ${Math.round(mid.length / 1024)}KB)`,
    )
  } catch (error) {
    failed += 1
    console.error(`  FAIL ${slot}: ${error.message}`)
  }
}

await writeFile(join(OUT, '_mockup-sources.json'), JSON.stringify(used, null, 2))

if (failed) {
  console.error(`Completed with ${failed} failures`)
  process.exit(1)
}
console.log('done', Object.keys(used).length, 'slots')
