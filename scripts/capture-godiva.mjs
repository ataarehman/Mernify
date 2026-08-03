import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'
import { join } from 'node:path'

mkdirSync('public/portfolio/godiva', { recursive: true })

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'

const browser = await chromium.launch({ headless: true })

async function shot(suffix, w, h, scrollY = 0) {
  const ctx = await browser.newContext({
    viewport: { width: w, height: h },
    userAgent: UA,
    locale: 'en-US',
    extraHTTPHeaders: { 'Accept-Language': 'en-US,en;q=0.9' },
  })
  const page = await ctx.newPage()
  try {
    await page.goto('https://www.godiva.com/', { waitUntil: 'domcontentloaded', timeout: 50000 })
    // dismiss any cookie/popup
    await page.keyboard.press('Escape')
    await page.waitForTimeout(4000)
    if (scrollY) await page.evaluate((y) => window.scrollTo(0, y), scrollY)
    await page.waitForTimeout(800)
    await page.screenshot({ path: join('public/portfolio/godiva', `${suffix}.png`), fullPage: false })
    const text = (await page.locator('body').innerText()).replace(/\s+/g, ' ').slice(0, 400)
    console.log(`OK ${suffix}: ${text.slice(0, 200)}`)
  } catch (e) {
    console.error(`ERR ${suffix}: ${e.message?.slice(0, 120)}`)
  }
  await ctx.close()
}

await shot('home-desktop', 1440, 900)
await shot('home-mobile', 390, 844)

await browser.close()
console.log('done')
