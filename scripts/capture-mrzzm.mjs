import { chromium } from 'playwright'
import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const dir = join('public', 'portfolio', 'mrzzm')
mkdirSync(dir, { recursive: true })

const browser = await chromium.launch({ headless: true })
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } })
const page = await context.newPage()

await page.goto('https://mrzzm.mountsol.dev/', {
  waitUntil: 'domcontentloaded',
  timeout: 45000,
})
await page.waitForSelector('text=Browse Categories', { timeout: 45000 }).catch(() => null)
await page.waitForTimeout(3000)
await page.screenshot({ path: join(dir, 'home-desktop.png'), fullPage: false })

const text = (await page.locator('body').innerText()).replace(/\s+/g, ' ').slice(0, 3000)
writeFileSync(join('.tmp', 'mrzzm-text.txt'), text)
console.log(text.slice(0, 900))

await page.setViewportSize({ width: 390, height: 844 })
await page.waitForTimeout(900)
await page.screenshot({ path: join(dir, 'home-mobile.png'), fullPage: false })

await browser.close()
console.log('mrzzm capture complete')
