import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'
import { join } from 'node:path'

const captures = [
  { id: 'tailorize', url: 'https://tailorize.sa/en', waitFor: null },
  { id: 'mrzzm', url: 'https://mrzzm.mountsol.dev/', waitFor: 'text=Browse' },
]

const browser = await chromium.launch({ headless: true })

for (const { id, url, waitFor } of captures) {
  const dir = join('public', 'portfolio', id)
  mkdirSync(dir, { recursive: true })

  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36',
  })
  const page = await ctx.newPage()

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 })
    if (waitFor) {
      await page.waitForSelector(waitFor, { timeout: 12000 }).catch(() => null)
    }
    await page.waitForTimeout(3500)

    await page.screenshot({ path: join(dir, 'home-desktop.png'), fullPage: false })

    await page.setViewportSize({ width: 390, height: 844 })
    await page.waitForTimeout(800)
    await page.screenshot({ path: join(dir, 'home-mobile.png'), fullPage: false })

    const text = (await page.locator('body').innerText()).replace(/\s+/g, ' ').slice(0, 400)
    console.log(`OK ${id}: ${text.slice(0, 200)}`)
  } catch (e) {
    console.error(`FAIL ${id}: ${e.message?.slice(0, 120)}`)
  }
  await ctx.close()
}

await browser.close()
console.log('capture complete')
