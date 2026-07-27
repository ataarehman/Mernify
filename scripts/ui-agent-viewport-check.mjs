import { chromium } from 'playwright'
import fs from 'fs'
import path from 'path'

const outDir = path.resolve('Mernify.md/screenshots/ui-agent')
fs.mkdirSync(outDir, { recursive: true })

const sizes = [
  [375, 812, '375'],
  [768, 1024, '768'],
  [1280, 800, '1280'],
  [1920, 1080, '1920'],
]

const browser = await chromium.launch()
const results = []

for (const [w, h, label] of sizes) {
  const page = await browser.newPage({ viewport: { width: w, height: h } })
  await page.goto('http://localhost:5174/', { waitUntil: 'networkidle' })
  const metrics = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
    overflowX: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
  }))
  const file = path.join(outDir, `home-${label}.png`)
  await page.screenshot({ path: file, fullPage: false })
  results.push({ label, ...metrics, file })
  await page.close()
}

await browser.close()
fs.writeFileSync(path.join(outDir, 'viewport-check.json'), JSON.stringify(results, null, 2))
console.log(JSON.stringify(results, null, 2))
