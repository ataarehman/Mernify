import { chromium } from 'playwright'
import fs from 'fs'
import path from 'path'

const outDir = path.resolve('docs/screenshots/competitor-audit')
fs.mkdirSync(outDir, { recursive: true })

const competitors = [
  { id: 'narsun', url: 'https://narsunstudios.com/en', name: 'Narsun Studios' },
  { id: 'elytra', url: 'https://elytrastudios.com/', name: 'Elytra Studios' },
  { id: 'tkxel', url: 'https://tkxel.com/', name: 'Tkxel' },
  { id: 'ssi', url: 'https://www.ssidecisions.com/', name: 'SSI Decisions' },
]

const viewports = [
  { w: 1440, h: 900, tag: '1440' },
  { w: 390, h: 844, tag: '390' },
]

const results = {}
const browser = await chromium.launch({ timeout: 30000 })

for (const comp of competitors) {
  results[comp.id] = { name: comp.name, url: comp.url, shots: {} }
  for (const vp of viewports) {
    const page = await browser.newPage({ viewport: { width: vp.w, height: vp.h } })
    try {
      await page.goto(comp.url, { waitUntil: 'domcontentloaded', timeout: 25000 })
      await page.waitForTimeout(2500)
      const above = path.join(outDir, `${comp.id}-${vp.tag}-above.png`)
      const full = path.join(outDir, `${comp.id}-${vp.tag}-full.png`)
      await page.screenshot({ path: above, fullPage: false })
      await page.screenshot({ path: full, fullPage: true, clip: vp.w > 500 ? undefined : undefined })
      results[comp.id].shots[vp.tag] = { above, full }
      console.log(`✓ ${comp.id} @ ${vp.tag}`)
    } catch (e) {
      results[comp.id].shots[vp.tag] = { error: e.message }
      console.warn(`✗ ${comp.id} @ ${vp.tag}: ${e.message}`)
    }
    await page.close()
  }
}

await browser.close()
fs.writeFileSync(path.join(outDir, 'audit-meta.json'), JSON.stringify(results, null, 2))
console.log('\nDone. Results:', Object.keys(results))
