import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'
import { join } from 'node:path'

const sites = [
  { id: 'servloom',  url: 'https://servloom.com/' },
  { id: 'pathe',     url: 'https://www.pathe.be/en' },
  { id: 'trendyol',  url: 'https://www.trendyol.com/en' },
]

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'

const browser = await chromium.launch({ headless: true })

async function shot(id, url, suffix, w, h) {
  mkdirSync(join('public', 'portfolio', id), { recursive: true })
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, userAgent: UA, locale: 'en-US' })
  const page = await ctx.newPage()
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 50000 })
    await page.waitForTimeout(4500)
    await page.screenshot({ path: join('public', 'portfolio', id, `${suffix}.png`) })
    const text = (await page.locator('body').innerText()).replace(/\s+/g, ' ').slice(0, 300)
    console.log(`OK  ${id}/${suffix}: ${text.slice(0, 120)}`)
  } catch (e) {
    console.error(`ERR ${id}/${suffix}: ${e.message?.slice(0, 90)}`)
  }
  await ctx.close()
}

for (const { id, url } of sites) {
  await shot(id, url, 'home-desktop', 1440, 900)
  await shot(id, url, 'home-mobile',   390, 844)
}

await browser.close()
console.log('all done')
