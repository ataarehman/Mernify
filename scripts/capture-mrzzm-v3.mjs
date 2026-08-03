import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'
import { join } from 'node:path'

const dir = join('public', 'portfolio', 'mrzzm')
mkdirSync(dir, { recursive: true })

const browser = await chromium.launch({ headless: true })

async function capture(url, filename, viewport = { width: 1440, height: 900 }, scrollY = 0) {
  const ctx = await browser.newContext({
    viewport,
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36',
  })
  const page = await ctx.newPage()
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 })
    // wait for products selector
    await page.waitForSelector('[class*="product"], .card, [class*="card"]', { timeout: 12000 }).catch(() => null)
    await page.waitForTimeout(2500)
    if (scrollY) await page.evaluate((y) => window.scrollTo(0, y), scrollY)
    await page.waitForTimeout(800)
    await page.screenshot({ path: join(dir, filename), fullPage: false })
    console.log(`Captured: ${filename}`)
  } catch (e) {
    console.error(`Fail ${filename}: ${e.message?.slice(0, 80)}`)
  }
  await ctx.close()
}

// Hero / storefront view — scroll just past initial spinner
await capture('https://mrzzm.mountsol.dev/', 'home-desktop.png', { width: 1440, height: 900 }, 0)
await capture('https://mrzzm.mountsol.dev/', 'home-hero.png', { width: 1440, height: 900 }, 100)
await capture('https://mrzzm.mountsol.dev/', 'home-mobile.png', { width: 390, height: 844 }, 0)

await browser.close()
console.log('all done')
