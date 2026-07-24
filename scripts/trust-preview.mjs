import { chromium } from 'playwright'
import fs from 'node:fs'
import path from 'node:path'

const BASE = 'http://localhost:5173'
const OUT = path.resolve('docs/previews/trust')
fs.mkdirSync(OUT, { recursive: true })

const browser = await chromium.launch({ headless: true })
const page = await browser.newPage()
const errors = []
page.on('pageerror', (e) => errors.push(String(e)))
page.on('console', (m) => {
  if (m.type() === 'error') errors.push(m.text())
})

async function shot(name, viewport) {
  await page.setViewportSize(viewport)
  await page.goto(BASE, { waitUntil: 'networkidle' })
  await page.waitForTimeout(900)
  const trust = page.locator('section[aria-labelledby="home-trust-title"]')
  await trust.scrollIntoViewIfNeeded()
  await page.waitForTimeout(500)
  await trust.screenshot({ path: path.join(OUT, `${name}.png`) })
}

await shot('01-desktop-trust', { width: 1440, height: 900 })
await shot('02-tablet-trust', { width: 768, height: 1024 })
await shot('03-mobile-trust', { width: 390, height: 844 })

const checks = await page.evaluate(() => {
  const section = document.querySelector('section[aria-labelledby="home-trust-title"]')
  const marks = [...(section?.querySelectorAll('li') || [])].map((li) =>
    li.textContent.replace(/\s+/g, ' ').trim(),
  )
  return {
    exists: Boolean(section),
    title: document.getElementById('home-trust-title')?.textContent?.trim(),
    markCount: marks.length,
    marks,
  }
})

fs.writeFileSync(path.join(OUT, 'checks.json'), JSON.stringify({ checks, errors }, null, 2))
console.log(JSON.stringify({ checks, errors }, null, 2))
await browser.close()
