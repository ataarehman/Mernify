import { chromium } from 'playwright'
import fs from 'node:fs'
import path from 'node:path'

const BASE = 'http://localhost:5173'
const OUT = path.resolve('docs/previews/services')
fs.mkdirSync(OUT, { recursive: true })

const browser = await chromium.launch({ headless: true })
const page = await browser.newPage()
const errors = []
page.on('pageerror', (e) => errors.push(String(e)))
page.on('console', (m) => {
  if (m.type() === 'error') errors.push(m.text())
})

async function capture(name, viewport, activateMobile = false) {
  await page.setViewportSize(viewport)
  await page.goto(BASE, { waitUntil: 'networkidle' })
  await page.waitForTimeout(900)
  const section = page.locator('section[aria-labelledby="home-services-title"]')
  await section.waitFor({ state: 'visible', timeout: 15000 })
  await section.scrollIntoViewIfNeeded()
  // Offset past fixed header so intro isn't clipped
  await page.evaluate(() => {
    const header = document.querySelector('header')
    const h = header?.getBoundingClientRect().height || 72
    window.scrollBy(0, -h - 8)
  })
  await page.waitForTimeout(800)

  if (viewport.width >= 1024 || activateMobile) {
    const mobileBtn = page.getByRole('button', { name: /Mobile App Development/i })
    await mobileBtn.waitFor({ state: 'visible', timeout: 10000 })
    if (viewport.width >= 1024) {
      await mobileBtn.hover()
    } else {
      await mobileBtn.click()
    }
    await page.waitForTimeout(500)
  }

  await section.screenshot({ path: path.join(OUT, `${name}.png`) })
}

await capture('01-desktop-services', { width: 1440, height: 900 })
await capture('02-tablet-services', { width: 768, height: 1024 }, true)
await capture('03-mobile-services', { width: 390, height: 844 }, true)

const checks = await page.evaluate(() => {
  const section = document.querySelector('section[aria-labelledby="home-services-title"]')
  const buttons = [...(section?.querySelectorAll('button[aria-pressed]') || [])].map((b) => ({
    text: b.querySelector('[class*="rowTitle"]')?.textContent?.trim(),
    pressed: b.getAttribute('aria-pressed'),
  }))
  const img = section?.querySelector('[class*="media"] img')
  return {
    exists: Boolean(section),
    title: document.getElementById('home-services-title')?.textContent?.trim(),
    serviceCount: buttons.length,
    buttons,
    hasImage: Boolean(img?.getAttribute('src')),
  }
})

fs.writeFileSync(path.join(OUT, 'checks.json'), JSON.stringify({ checks, errors }, null, 2))
console.log(JSON.stringify({ checks, errors }, null, 2))
await browser.close()
