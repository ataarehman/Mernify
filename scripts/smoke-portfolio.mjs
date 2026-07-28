import { chromium } from 'playwright'

const BASE = process.env.BASE_URL || 'http://localhost:5173'
const routes = [
  '/case-studies',
  '/case-studies/goodbooks-plus-analytics',
  '/case-studies/medbill-ultra',
  '/case-studies/metro-electric',
  '/case-studies/spaceworx',
  '/case-studies/mrzzm',
  '/case-studies/tailorize',
  '/work',
]

const browser = await chromium.launch({ headless: true })
const page = await browser.newPage()
const results = []

for (const route of routes) {
  const errors = []
  page.once('pageerror', (err) => errors.push(String(err)))
  const res = await page.goto(`${BASE}${route}`, { waitUntil: 'domcontentloaded', timeout: 30000 })
  await page.waitForTimeout(900)
  const title = await page.title()
  const text = (await page.locator('body').innerText()).replace(/\s+/g, ' ').slice(0, 160)
  results.push({
    route,
    ok: Boolean(res?.ok()),
    status: res?.status(),
    title,
    hasCaseCopy: /case study|portfolio|challenge|overview/i.test(text),
    errors,
  })
}

await browser.close()
console.log(JSON.stringify(results, null, 2))
const failed = results.filter((r) => !r.ok || r.errors.length || !r.hasCaseCopy)
process.exit(failed.length ? 1 : 0)
