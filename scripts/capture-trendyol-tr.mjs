import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'

mkdirSync('public/portfolio/trendyol', { recursive: true })

const browser = await chromium.launch({ headless: true })
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36',
  locale: 'tr-TR',
})
const page = await ctx.newPage()

await page.goto('https://www.trendyol.com/', { waitUntil: 'domcontentloaded', timeout: 50000 })
await page.waitForTimeout(3000)

// dismiss country selector by pressing Escape or clicking outside
await page.keyboard.press('Escape')
await page.waitForTimeout(1500)

// also try clicking the overlay backdrop
const backdrop = page.locator('[class*="overlay"], [class*="backdrop"], [class*="modal-wrapper"]')
if (await backdrop.count() > 0) {
  await backdrop.first().click({ position: { x: 10, y: 10 } }).catch(() => null)
  await page.waitForTimeout(1000)
}

await page.screenshot({ path: 'public/portfolio/trendyol/home-tr-desktop.png' })
console.log('OK trendyol TR desktop')

const text = (await page.locator('body').innerText()).replace(/\s+/g, ' ').slice(0, 300)
console.log(text.slice(0, 200))

await ctx.close()
await browser.close()
console.log('done')
