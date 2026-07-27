import { chromium } from 'playwright'
import fs from 'fs'
import path from 'path'

const outDir = path.resolve('docs/screenshots/wow-factor')
const desktopDir = path.join(outDir, 'desktop')
const tabletDir = path.join(outDir, 'tablet')
const mobileDir = path.join(outDir, 'mobile')
fs.mkdirSync(desktopDir, { recursive: true })
fs.mkdirSync(tabletDir, { recursive: true })
fs.mkdirSync(mobileDir, { recursive: true })

const BASE = 'http://localhost:5174'

const sizes = [
  { w: 1440, h: 1000, dir: desktopDir, tag: '1440x1000' },
  { w: 1280, h: 800, dir: desktopDir, tag: '1280x800' },
  { w: 1024, h: 768, dir: tabletDir, tag: '1024x768' },
  { w: 768, h: 1024, dir: tabletDir, tag: '768x1024' },
  { w: 390, h: 844, dir: mobileDir, tag: '390x844' },
  { w: 360, h: 800, dir: mobileDir, tag: '360x800' },
]

const routes = [
  { path: '/', name: 'home' },
  { path: '/services', name: 'services' },
  { path: '/industries', name: 'industries' },
  { path: '/case-studies', name: 'case-studies' },
  { path: '/process', name: 'process' },
  { path: '/about', name: 'about' },
  { path: '/contact', name: 'contact' },
]

const browser = await chromium.launch({ args: ['--no-sandbox'] })
const results = []
let errors = 0

for (const size of sizes) {
  const page = await browser.newPage({ viewport: { width: size.w, height: size.h } })

  for (const route of routes) {
    try {
      await page.goto(`${BASE}${route.path}`, { waitUntil: 'domcontentloaded', timeout: 20000 })
      await page.waitForTimeout(3500)
      await page.evaluate(() => window.scrollTo(0, 0))
      await page.waitForTimeout(200)

      const above = path.join(size.dir, `${route.name}-${size.tag}.png`)
      await page.screenshot({ path: above, fullPage: false })

      const overflowX = await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
      )
      const consoleErrors = []
      page.on('console', (msg) => {
        if (msg.type() === 'error') consoleErrors.push(msg.text())
      })

      results.push({ route: route.path, size: size.tag, overflowX, file: above })
      if (overflowX) {
        console.warn(`⚠ Overflow: ${route.path} @ ${size.tag}`)
        errors++
      } else {
        console.log(`✓ ${route.name} @ ${size.tag}`)
      }
    } catch (e) {
      results.push({ route: route.path, size: size.tag, error: e.message })
      console.warn(`✗ ${route.name} @ ${size.tag}: ${e.message}`)
      errors++
    }
  }

  await page.close()
}

await browser.close()
fs.writeFileSync(path.join(outDir, 'qa-results.json'), JSON.stringify({ results, errors }, null, 2))
console.log(`\n=== Done. ${errors} issues. ===`)
