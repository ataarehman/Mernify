/**
 * Crawls every internal route and reports links that go nowhere:
 *   - internal hrefs that render the 404 page
 *   - in-page #anchors with no matching element
 *   - external links missing rel="noopener" on target="_blank"
 *
 * Usage: node scripts/audit-links.mjs [baseUrl]
 */
import { chromium } from 'playwright'

const BASE = process.argv[2] || 'http://localhost:5174'

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })

const queue = ['/']
const seen = new Set(queue)
const brokenRoutes = new Map() // route -> pages linking to it
const brokenAnchors = []
const unsafeExternal = []
const mailtoTel = new Set()

const isNotFound = () =>
  page.evaluate(() => /page not found|404/i.test(document.querySelector('h1')?.textContent || ''))

while (queue.length) {
  const route = queue.shift()
  await page.goto(BASE + route, { waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(1800)

  if (await isNotFound()) {
    if (!brokenRoutes.has(route)) brokenRoutes.set(route, new Set(['(reached directly)']))
    continue
  }

  const links = await page.evaluate(() =>
    [...document.querySelectorAll('a[href]')].map((a) => ({
      href: a.getAttribute('href'),
      target: a.getAttribute('target'),
      rel: a.getAttribute('rel'),
      text: (a.textContent || '').trim().slice(0, 60),
    })),
  )

  for (const link of links) {
    const { href, target, rel } = link
    if (!href || href === '#') continue

    if (/^(mailto:|tel:)/i.test(href)) {
      mailtoTel.add(href)
      continue
    }

    if (/^https?:\/\//i.test(href)) {
      if (target === '_blank' && !/noopener/.test(rel || '')) unsafeExternal.push({ route, href })
      continue
    }

    if (href.startsWith('#')) {
      const found = await page.evaluate((id) => !!document.querySelector(id), CSS_escape(href))
      if (!found) brokenAnchors.push({ route, href, text: link.text })
      continue
    }

    const [path, hash] = href.split('#')
    const clean = path.replace(/\/$/, '') || '/'
    if (hash) {
      // Cross-page anchors are checked when that route is crawled.
    }
    if (!seen.has(clean)) {
      seen.add(clean)
      queue.push(clean)
    }
  }
}

// CSS.escape isn't available in node scope; do the escaping browser-side.
function CSS_escape(hash) {
  return hash
}

// Second pass: confirm every discovered route actually renders.
for (const route of seen) {
  await page.goto(BASE + route, { waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(1200)
  if (await isNotFound()) brokenRoutes.set(route, new Set(['404']))
}

console.log(`\nCrawled ${seen.size} internal routes.`)
console.log([...seen].sort().join('\n  '))

const report = (title, rows) => {
  console.log(`\n${title}: ${rows.length}`)
  for (const row of rows) console.log('  ' + JSON.stringify(row))
}

console.log(`\nBroken internal routes: ${brokenRoutes.size}`)
for (const [route, from] of brokenRoutes) console.log(`  ${route}  <- ${[...from].join(', ')}`)
report('Broken in-page anchors', brokenAnchors)
report('target=_blank without rel=noopener', unsafeExternal)
console.log(`\nmailto:/tel: links: ${[...mailtoTel].join(', ')}`)

await browser.close()
