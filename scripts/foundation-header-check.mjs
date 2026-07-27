import { chromium } from 'playwright'

const browser = await chromium.launch({ headless: true })
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' })

const desktop = await page.evaluate(() => {
  const header = document.querySelector('header')
  const nav = document.querySelector('header nav[aria-label="Primary"]')
  const links = [...(nav?.querySelectorAll('a') || [])].map((a) => a.textContent.trim())
  const cs = getComputedStyle(header)
  const navCs = nav ? getComputedStyle(nav) : null
  return {
    headerClass: header.className,
    headerBg: cs.backgroundColor,
    headerColor: cs.color,
    navDisplay: navCs?.display,
    links,
    sectionTheme: document.querySelector('[data-header-theme]')?.getAttribute('data-header-theme'),
    lenis: document.documentElement.classList.contains('lenis'),
  }
})

await page.screenshot({
  path: 'Mernify.md/previews/foundation/06-desktop-header-crop.png',
  clip: { x: 0, y: 0, width: 1440, height: 90 },
})

await page.setViewportSize({ width: 768, height: 1024 })
await page.waitForTimeout(250)

const tablet = await page.evaluate(() => {
  const toggle = document.querySelector('header button[aria-expanded]')
  const cs = toggle ? getComputedStyle(toggle) : null
  const rect = toggle?.getBoundingClientRect()
  return {
    toggleExists: Boolean(toggle),
    toggleDisplay: cs?.display,
    toggleVisibility: cs?.visibility,
    toggleOpacity: cs?.opacity,
    toggleLabel: toggle?.getAttribute('aria-label'),
    toggleColor: cs?.color,
    rect: rect ? { x: rect.x, y: rect.y, w: rect.width, h: rect.height } : null,
  }
})

await page.screenshot({
  path: 'Mernify.md/previews/foundation/07-tablet-header-crop.png',
  clip: { x: 0, y: 0, width: 768, height: 80 },
})

console.log(JSON.stringify({ desktop, tablet }, null, 2))
await browser.close()
