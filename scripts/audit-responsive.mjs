/**
 * Responsive overflow / layout sweep.
 * Visits every primary route at several viewports and reports:
 *   - document scrollWidth > clientWidth (horizontal overflow)
 *   - elements protruding past the viewport
 *   - hamburger visible on desktop (>=1024)
 *
 * Usage: node scripts/audit-responsive.mjs [baseUrl]
 */
import { chromium } from 'playwright'

const BASE = process.argv[2] || 'http://localhost:5174'
const ROUTES = [
  '/',
  '/about',
  '/services',
  '/services/web-development',
  '/services/product-engineering',
  '/process',
  '/industries',
  '/case-studies',
  '/case-studies/goodbooks-plus-analytics',
  '/contact',
  '/privacy',
  '/terms',
]
const VIEWPORTS = [
  { name: 'mobile-360', width: 360, height: 740 },
  { name: 'mobile-390', width: 390, height: 844 },
  { name: 'tablet-768', width: 768, height: 1024 },
  { name: 'laptop-1024', width: 1024, height: 768 },
  { name: 'laptop-1366', width: 1366, height: 768 },
  { name: 'desktop-1440', width: 1440, height: 900 },
  { name: 'desktop-1920', width: 1920, height: 1080 },
]

const browser = await chromium.launch()
const findings = []

for (const vp of VIEWPORTS) {
  const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } })
  for (const route of ROUTES) {
    await page.goto(BASE + route, { waitUntil: 'domcontentloaded' })
    await page.waitForTimeout(2200)

    const result = await page.evaluate(() => {
      const docW = document.documentElement.clientWidth
      const scrollW = document.documentElement.scrollWidth
      const overflow = scrollW > docW + 1

      const protruding = []
      if (overflow) {
        const all = document.body.querySelectorAll('*')
        for (const el of all) {
          const r = el.getBoundingClientRect()
          if (r.width < 2 || r.height < 2) continue
          if (r.right > docW + 2 || r.left < -2) {
            const style = getComputedStyle(el)
            // Off-canvas menus intentionally sit off-screen.
            if (style.position === 'fixed' || style.position === 'absolute') {
              if (r.left >= docW || r.right <= 0) continue
            }
            const sel =
              el.id
                ? `#${el.id}`
                : el.className && typeof el.className === 'string'
                  ? `.${el.className.trim().split(/\s+/).slice(0, 2).join('.')}`
                  : el.tagName.toLowerCase()
            protruding.push({
              sel: sel.slice(0, 80),
              left: Math.round(r.left),
              right: Math.round(r.right),
              w: Math.round(r.width),
            })
            if (protruding.length >= 8) break
          }
        }
      }

      const toggle = document.querySelector('[aria-label*="menu" i], button[class*="menuToggle"], button[class*="MenuToggle"]')
      let hamburgerVisible = false
      if (toggle) {
        const r = toggle.getBoundingClientRect()
        const s = getComputedStyle(toggle)
        hamburgerVisible =
          s.display !== 'none' &&
          s.visibility !== 'hidden' &&
          Number(s.opacity) > 0 &&
          r.width > 0 &&
          r.height > 0
      }

      const navLinks = document.querySelector('nav, [class*="primaryNav"], [class*="PrimaryNav"]')
      let navVisible = false
      if (navLinks) {
        const r = navLinks.getBoundingClientRect()
        const s = getComputedStyle(navLinks)
        navVisible =
          s.display !== 'none' &&
          s.visibility !== 'hidden' &&
          r.width > 0 &&
          r.height > 0
      }

      return {
        overflow,
        scrollW,
        docW,
        protruding,
        hamburgerVisible,
        navVisible,
      }
    })

    if (result.overflow) {
      findings.push({
        type: 'overflow',
        vp: vp.name,
        route,
        scrollW: result.scrollW,
        docW: result.docW,
        protruding: result.protruding,
      })
    }
    if (vp.width >= 1024 && result.hamburgerVisible) {
      findings.push({ type: 'hamburger-on-desktop', vp: vp.name, route })
    }
    if (vp.width >= 1024 && !result.navVisible) {
      findings.push({ type: 'nav-hidden-on-desktop', vp: vp.name, route })
    }
    if (vp.width < 1024 && !result.hamburgerVisible) {
      findings.push({ type: 'hamburger-missing-mobile', vp: vp.name, route })
    }
  }
  await page.close()
}

console.log(`\nFindings: ${findings.length}`)
for (const f of findings) {
  console.log(JSON.stringify(f))
}
if (!findings.length) console.log('All clear across routes × viewports.')

await browser.close()
