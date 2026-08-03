import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'
import { join } from 'node:path'

const sites = [
  { id: 'servloom',  url: 'https://servloom.com/',     waitSel: null },
  { id: 'kinepolis', url: 'https://kinepolis.be/',      waitSel: null },
  { id: 'marmot',    url: 'https://www.marmot.com/',   waitSel: null },
]

const browser = await chromium.launch({ headless: true })

for (const { id, url, waitSel } of sites) {
  const dir = join('public', 'portfolio', id)
  mkdirSync(dir, { recursive: true })

  for (const [vw, vh, suffix] of [[1440, 900, 'home-desktop'], [390, 844, 'home-mobile']]) {
    const ctx = await browser.newContext({
      viewport: { width: vw, height: vh },
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36',
    })
    const page = await ctx.newPage()
    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 })
      if (waitSel) await page.waitForSelector(waitSel, { timeout: 8000 }).catch(() => null)
      await page.waitForTimeout(4000)
      await page.screenshot({ path: join(dir, `${suffix}.png`), fullPage: false })
      console.log(`OK  ${id}/${suffix}`)
    } catch (e) {
      console.error(`ERR ${id}/${suffix}: ${e.message?.slice(0, 80)}`)
    }
    await ctx.close()
  }
}

await browser.close()
console.log('all done')
