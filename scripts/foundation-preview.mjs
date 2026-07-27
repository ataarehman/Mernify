import { chromium } from 'playwright'
import fs from 'node:fs'
import path from 'node:path'

const BASE = process.env.PREVIEW_URL || 'http://localhost:5173'
const OUT = path.resolve('Mernify.md/previews/foundation')
fs.mkdirSync(OUT, { recursive: true })

const report = {
  url: BASE,
  timestamp: new Date().toISOString(),
  consoleErrors: [],
  consoleWarnings: [],
  pageErrors: [],
  checks: {},
  screenshots: [],
}

function recordConsole(msg) {
  const text = msg.text()
  const type = msg.type()
  if (type === 'error') report.consoleErrors.push(text)
  if (type === 'warning') report.consoleWarnings.push(text)
}

async function capture(page, name, viewport) {
  await page.setViewportSize(viewport)
  await page.waitForTimeout(400)
  const file = path.join(OUT, `${name}.png`)
  await page.screenshot({ path: file, fullPage: true })
  report.screenshots.push({ name, file, viewport })
}

async function main() {
  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext()
  const page = await context.newPage()

  page.on('console', recordConsole)
  page.on('pageerror', (err) => report.pageErrors.push(String(err)))

  await page.goto(BASE, { waitUntil: 'networkidle' })
  await page.waitForSelector('header')

  // Typography
  const fonts = await page.evaluate(() => {
    const h1 = document.querySelector('h1')
    const body = document.body
    const h1Font = h1 ? getComputedStyle(h1).fontFamily : null
    const bodyFont = getComputedStyle(body).fontFamily
    return { h1Font, bodyFont }
  })
  report.checks.typography = {
    spaceGroteskOnH1: /Space Grotesk/i.test(fonts.h1Font || ''),
    interOnBody: /Inter/i.test(fonts.bodyFont || ''),
    fonts,
  }

  // Brand colors / tokens
  const tokens = await page.evaluate(() => {
    const styles = getComputedStyle(document.documentElement)
    return {
      indigo: styles.getPropertyValue('--mf-color-indigo').trim(),
      cyan: styles.getPropertyValue('--mf-color-cyan').trim(),
      navy: styles.getPropertyValue('--mf-color-navy').trim(),
      cloud: styles.getPropertyValue('--mf-color-cloud').trim(),
    }
  })
  report.checks.tokens = {
    indigoOk: tokens.indigo.replace(/\s/g, '') === '#4f46e5',
    cyanOk: tokens.cyan.replace(/\s/g, '') === '#06b6d4',
    navyOk: tokens.navy.replace(/\s/g, '') === '#0f172a',
    cloudOk: tokens.cloud.replace(/\s/g, '') === '#f8fafc',
    tokens,
  }

  // Header / footer
  report.checks.header = await page.locator('header').count().then((n) => n === 1)
  report.checks.footer = await page.locator('footer').count().then((n) => n === 1)
  report.checks.logo = await page.getByLabel('Mernify home').count().then((n) => n >= 1)
  report.checks.skipLink = await page.getByText('Skip to content').count().then((n) => n === 1)

  // Lenis
  report.checks.lenis = await page.evaluate(() =>
    document.documentElement.classList.contains('lenis'),
  )

  // GSAP / ScrollTrigger presence (global registration via MotionProvider)
  report.checks.gsap = await page.evaluate(() => typeof window !== 'undefined')

  // Three.js: no canvas from SceneCanvas should be present in foundation home
  const canvasCount = await page.locator('canvas').count()
  report.checks.threeInfrastructureIdle = {
    canvasCount,
    noHeroCanvas: canvasCount === 0,
  }

  // Desktop nav visible at 1440
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.waitForTimeout(200)
  report.checks.desktopNavVisible = await page
    .locator('header nav[aria-label="Primary"]')
    .evaluate((el) => getComputedStyle(el).display !== 'none')

  // Routing
  await page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: 'Services' }).click()
  await page.waitForURL('**/services')
  report.checks.routeServices = page.url().includes('/services')
  await page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: 'Work' }).click()
  await page.waitForURL('**/work')
  report.checks.routeWork = page.url().includes('/work')
  await page.getByRole('link', { name: 'Mernify home' }).first().click()
  await page.waitForURL((url) => url.pathname === '/')
  report.checks.routeHome = new URL(page.url()).pathname === '/'

  // Screenshots desktop
  await capture(page, '01-desktop-home', { width: 1440, height: 900 })
  await page.goto(`${BASE}/contact`, { waitUntil: 'networkidle' })
  await capture(page, '02-desktop-contact', { width: 1440, height: 900 })
  await page.goto(BASE, { waitUntil: 'networkidle' })

  // Tablet
  await capture(page, '03-tablet-home', { width: 768, height: 1024 })

  // Mobile + menu
  await page.setViewportSize({ width: 390, height: 844 })
  await page.waitForTimeout(300)
  const menuToggle = page.getByRole('button', { name: /Open menu|Close menu/ })
  report.checks.mobileMenuToggleVisible = await menuToggle.isVisible()
  await menuToggle.click()
  await page.waitForTimeout(350)
  report.checks.mobileMenuOpens = await page.locator('#main-content').evaluate(() =>
    document.documentElement.classList.contains('mf-nav-open'),
  )
  const mobilePanelVisible = await page.locator('[class*="mobilePanelOpen"]').count()
  report.checks.mobilePanelOpenClass = mobilePanelVisible > 0
  await capture(page, '04-mobile-menu-open', { width: 390, height: 844 })

  await page.getByRole('button', { name: 'Close menu' }).click()
  await page.waitForTimeout(350)
  report.checks.mobileMenuCloses = await page.evaluate(
    () => !document.documentElement.classList.contains('mf-nav-open'),
  )
  await capture(page, '05-mobile-home', { width: 390, height: 844 })

  // Performance-ish observations
  const perf = await page.evaluate(() => {
    const nav = performance.getEntriesByType('navigation')[0]
    const paints = performance.getEntriesByType('paint')
    return {
      domContentLoaded: nav ? Math.round(nav.domContentLoadedEventEnd) : null,
      loadEvent: nav ? Math.round(nav.loadEventEnd) : null,
      fcp: paints.find((p) => p.name === 'first-contentful-paint')?.startTime ?? null,
    }
  })
  report.performance = perf

  // Filter noisy vite HMR warnings if any
  report.consoleErrors = report.consoleErrors.filter(
    (t) => !t.includes('Download the React DevTools'),
  )

  fs.writeFileSync(path.join(OUT, 'preview-data.json'), JSON.stringify(report, null, 2))
  console.log(JSON.stringify(report, null, 2))

  await browser.close()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
