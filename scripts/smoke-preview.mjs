import { chromium } from 'playwright'

const base = 'http://127.0.0.1:4173'
const routes = [
  '/',
  '/services',
  '/services/saas-development',
  '/industries',
  '/case-studies',
  '/case-studies/tailorize',
  '/case-studies/kinepolis',
  '/process',
  '/about',
  '/contact',
  '/privacy',
  '/terms',
  '/work',
  '/not-a-real-page',
]

const browser = await chromium.launch()
const page = await browser.newPage()
const results = []

for (const route of routes) {
  const res = await page.goto(base + route, { waitUntil: 'networkidle' })
  results.push({
    route,
    status: res?.status(),
    title: await page.title(),
  })
}

await page.goto(base + '/contact', { waitUntil: 'networkidle' })
const book = page.getByRole('link', { name: /book a demo call/i }).first()
const href = await book.getAttribute('href')
const booking = await book.getAttribute('data-booking')

// Form validation smoke
await page.getByRole('button', { name: /send message|submit|get in touch/i }).first().click()
const alert = await page.locator('[role="alert"]').count()

console.log(JSON.stringify({ results, href, booking, validationAlerts: alert }, null, 2))
await browser.close()
