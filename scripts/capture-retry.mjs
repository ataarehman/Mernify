import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'
import { join } from 'node:path'

const browser = await chromium.launch({ headless: true })

async function shot(id, url, suffix, width, height) {
  mkdirSync(join('public', 'portfolio', id), { recursive: true })
  const ctx = await browser.newContext({
    viewport: { width, height },
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    locale: 'en-US',
  })
  const page = await ctx.newPage()
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 50000 })
    await page.waitForTimeout(5000)
    await page.screenshot({ path: join('public', 'portfolio', id, `${suffix}.png`), fullPage: false })
    const t = (await page.locator('body').innerText()).replace(/\s+/g, ' ').slice(0, 200)
    console.log(`OK  ${id}/${suffix}: ${t.slice(0, 100)}`)
  } catch (e) {
    console.error(`ERR ${id}/${suffix}: ${e.message?.slice(0, 100)}`)
  }
  await ctx.close()
}

await shot('servloom',  'https://servloom.com/',   'home-desktop', 1440, 900)
await shot('servloom',  'https://servloom.com/',   'home-mobile',  390, 844)
await shot('kinepolis', 'https://kinepolis.be/',   'home-desktop', 1440, 900)
await shot('marmot',    'https://www.marmot.com/', 'home-desktop', 1440, 900)

await browser.close()
console.log('done')
