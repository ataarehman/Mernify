import { chromium } from 'playwright'
import fs from 'node:fs'
import path from 'node:path'

const BASE = 'http://localhost:5173'
const OUT = path.resolve('docs/previews/hero')
fs.mkdirSync(OUT, { recursive: true })

const browser = await chromium.launch({ headless: true })
const page = await browser.newPage()
const errors = []
page.on('pageerror', (e) => errors.push(String(e)))
page.on('console', (m) => {
  if (m.type() === 'error') errors.push(m.text())
})

await page.setViewportSize({ width: 1440, height: 900 })
await page.goto(BASE, { waitUntil: 'networkidle' })
await page.waitForTimeout(1800)

const checks = await page.evaluate(() => {
  const nav = document.querySelector('header nav[aria-label="Primary"]')
  const h1 = document.querySelector('h1')
  const canvas = document.querySelector('canvas')
  const header = document.querySelector('header')
  return {
    navLinks: [...(nav?.querySelectorAll('a') || [])].map((a) => a.textContent.trim()),
    navDisplay: nav ? getComputedStyle(nav).display : null,
    h1: h1?.innerText?.replace(/\s+/g, ' ').trim(),
    hasCanvas: Boolean(canvas),
    headerBg: header ? getComputedStyle(header).backgroundColor : null,
    brand: document.querySelector('[class*="brandMark"]')?.textContent || null,
  }
})

await page.screenshot({ path: path.join(OUT, '01-desktop-hero.png'), fullPage: false })
await page.setViewportSize({ width: 768, height: 1024 })
await page.waitForTimeout(400)
await page.screenshot({ path: path.join(OUT, '02-tablet-hero.png'), fullPage: false })
await page.setViewportSize({ width: 390, height: 844 })
await page.waitForTimeout(300)
await page.getByRole('button', { name: 'Open menu' }).click()
await page.waitForTimeout(500)
await page.screenshot({ path: path.join(OUT, '03-mobile-menu.png'), fullPage: false })
await page.getByRole('button', { name: 'Close menu' }).click({ force: true })
await page.waitForTimeout(300)
await page.screenshot({ path: path.join(OUT, '04-mobile-hero.png'), fullPage: false })

fs.writeFileSync(
  path.join(OUT, 'checks.json'),
  JSON.stringify({ checks, errors }, null, 2),
)
console.log(JSON.stringify({ checks, errors }, null, 2))
await browser.close()
