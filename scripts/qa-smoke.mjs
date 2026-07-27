import { chromium } from 'playwright'
import fs from 'fs'
import path from 'path'

const outDir = 'Mernify.md/previews/implementation-2026-07-24'
fs.mkdirSync(outDir, { recursive: true })
const base = 'http://localhost:5174'

const viewports = [
  { name: '1440x1000', width: 1440, height: 1000 },
  { name: '1024x768', width: 1024, height: 768 },
  { name: '768x1024', width: 768, height: 1024 },
  { name: '390x844', width: 390, height: 844 },
]

const routes = [
  '/',
  '/services',
  '/services/saas-development',
  '/industries',
  '/case-studies',
  '/case-studies/saas-operations-platform',
  '/process',
  '/about',
  '/contact',
  '/privacy',
  '/terms',
]

const findings = { routes: [], console: [], overflow: [] }
const browser = await chromium.launch({ headless: true })

for (const vp of viewports) {
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
  })
  const page = await context.newPage()
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      findings.console.push({ viewport: vp.name, text: msg.text() })
    }
  })
  await page.goto(`${base}/`, { waitUntil: 'networkidle', timeout: 60000 })
  await page.waitForTimeout(800)
  await page.screenshot({
    path: path.join(outDir, `home-${vp.name}.png`),
    fullPage: false,
  })
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
  )
  findings.overflow.push({ viewport: vp.name, overflow })
  if (vp.width <= 768) {
    const toggle = page.locator('button[aria-expanded]').first()
    if (await toggle.count()) {
      await toggle.click()
      await page.waitForTimeout(400)
      await page.screenshot({
        path: path.join(outDir, `home-${vp.name}-menu.png`),
        fullPage: false,
      })
    }
  }
  await context.close()
}

const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
})
const page = await context.newPage()
for (const route of routes) {
  const res = await page.goto(`${base}${route}`, {
    waitUntil: 'domcontentloaded',
    timeout: 30000,
  })
  const h1 = await page.locator('h1').first().textContent().catch(() => null)
  findings.routes.push({
    route,
    status: res?.status() ?? null,
    title: await page.title(),
    h1: h1?.trim() ?? null,
  })
  const safe = route === '/' ? 'home' : route.replace(/\//g, '_').replace(/^_/, '')
  await page.screenshot({
    path: path.join(outDir, `route-${safe}.png`),
    fullPage: false,
  })
}

// contact form validation smoke
await page.goto(`${base}/contact`, { waitUntil: 'networkidle' })
await page.getByRole('button', { name: /send message/i }).click()
const alertCount = await page.locator('[role="alert"]').count()
findings.formValidationAlerts = alertCount

fs.writeFileSync(path.join(outDir, 'qa.json'), JSON.stringify(findings, null, 2))
console.log(JSON.stringify(findings, null, 2))
await browser.close()
