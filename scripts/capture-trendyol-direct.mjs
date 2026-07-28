import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'

mkdirSync('public/portfolio/trendyol', { recursive: true })

const browser = await chromium.launch({ headless: true })
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36',
  locale: 'tr-TR',
  extraHTTPHeaders: { 'Accept-Language': 'tr-TR,tr;q=0.9' },
})
const page = await ctx.newPage()

// set country cookie before loading
await ctx.addCookies([
  { name: 'countryCode', value: 'TR', domain: '.trendyol.com', path: '/' },
  { name: 'storefrontId', value: '1', domain: '.trendyol.com', path: '/' },
])

await page.goto('https://www.trendyol.com/', { waitUntil: 'domcontentloaded', timeout: 50000 })
await page.waitForTimeout(5000)

await page.screenshot({ path: 'public/portfolio/trendyol/home-tr-desktop.png' })
const text = (await page.locator('body').innerText()).replace(/\s+/g, ' ').slice(0, 300)
console.log(text.slice(0, 200))

await ctx.close()
await browser.close()
console.log('done')
