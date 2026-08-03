import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'

mkdirSync('public/portfolio/trendyol', { recursive: true })

const browser = await chromium.launch({ headless: true })
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36',
})
const page = await ctx.newPage()

await page.goto('https://www.trendyol.com/', { waitUntil: 'domcontentloaded', timeout: 50000 })
await page.waitForTimeout(2500)

// Open country dropdown and select Turkey
const dropdown = page.locator('select, [class*="select"], [class*="country"]').first()
if (await dropdown.count() > 0) {
  await dropdown.selectOption({ label: 'Türkiye' }).catch(() => null)
  await page.waitForTimeout(1000)
}

// Click Select/Confirm button
const btn = page.locator('button:has-text("Select"), button:has-text("Seç")')
if (await btn.count() > 0) {
  await btn.first().click()
  await page.waitForTimeout(4000)
}

await page.screenshot({ path: 'public/portfolio/trendyol/home-tr-desktop.png' })
const text = (await page.locator('body').innerText()).replace(/\s+/g, ' ').slice(0, 400)
console.log('body:', text.slice(0, 200))
console.log('url:', page.url())

await ctx.close()
await browser.close()
console.log('done')
