import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'
import { join } from 'node:path'

const dir = join('public', 'portfolio', 'mrzzm')
mkdirSync(dir, { recursive: true })

const browser = await chromium.launch({ headless: true })
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  userAgent:
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36',
})
const page = await ctx.newPage()

await page.goto('https://mrzzm.mountsol.dev/', {
  waitUntil: 'domcontentloaded',
  timeout: 30000,
})

// wait up to 12s for something that looks like a product grid to appear
const productSelectors = [
  '[class*="Product"]',
  '[class*="product"]',
  '[class*="card"]',
  '[class*="Card"]',
  '.item',
]

let rendered = false
for (let i = 0; i < 6; i++) {
  await page.waitForTimeout(2000)
  for (const sel of productSelectors) {
    const count = await page.locator(sel).count()
    if (count >= 4) {
      console.log(`Products found via "${sel}": ${count}`)
      rendered = true
      break
    }
  }
  if (rendered) break
  const text = await page.locator('body').innerText().catch(() => '')
  if (!text.includes('Loading')) {
    console.log('Loading spinner gone')
    rendered = true
    break
  }
  console.log(`Attempt ${i + 1}: still loading...`)
}

// body text
const text = (await page.locator('body').innerText()).replace(/\s+/g, ' ').slice(0, 600)
console.log('Body:', text)

await page.screenshot({ path: join(dir, 'home-desktop.png'), fullPage: false })

// scroll to show products section
await page.evaluate(() => window.scrollBy(0, 350))
await page.waitForTimeout(1000)
await page.screenshot({ path: join(dir, 'home-products.png'), fullPage: false })

await page.setViewportSize({ width: 390, height: 844 })
await page.waitForTimeout(1000)
await page.screenshot({ path: join(dir, 'home-mobile.png'), fullPage: false })

await ctx.close()
await browser.close()
console.log('done')
