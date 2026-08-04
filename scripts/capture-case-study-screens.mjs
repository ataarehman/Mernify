/**
 * Capture desktop + mobile screenshots for case studies missing raster covers.
 * Usage: node scripts/capture-case-study-screens.mjs
 */
import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'

const targets = [
  {
    folder: 'godiva',
    url: 'https://www.godiva.com/',
  },
  {
    folder: 'kinepolis',
    url: 'https://kinepolis.be/',
  },
  {
    folder: 'pathe',
    url: 'https://www.pathe.be/en',
  },
]

async function captureOne(browser, { folder, url }) {
  const dir = path.join('public', 'portfolio', folder)
  await mkdir(dir, { recursive: true })

  const desktopPath = path.join(dir, 'home-desktop.png')
  const mobilePath = path.join(dir, 'home-mobile.png')

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
    locale: 'en-US',
  })
  const page = await context.newPage()
  page.setDefaultTimeout(45000)

  try {
    const res = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 })
    const status = res?.status() ?? 0
    await page.waitForTimeout(3500)
    // Dismiss common cookie banners
    for (const sel of [
      '#onetrust-accept-btn-handler',
      'button:has-text("Accept")',
      'button:has-text("Accept all")',
      'button:has-text("Agree")',
      'button:has-text("I agree")',
      '[aria-label="Accept cookies"]',
    ]) {
      try {
        const btn = page.locator(sel).first()
        if (await btn.isVisible({ timeout: 800 })) await btn.click({ timeout: 1000 })
      } catch {
        /* ignore */
      }
    }
    await page.waitForTimeout(800)
    await page.screenshot({ path: desktopPath, fullPage: false })
    console.log(`✓ ${folder} desktop (${status}) → ${desktopPath}`)

    await page.setViewportSize({ width: 390, height: 844 })
    await page.waitForTimeout(1000)
    await page.screenshot({ path: mobilePath, fullPage: false })
    console.log(`✓ ${folder} mobile → ${mobilePath}`)
    return true
  } catch (err) {
    console.error(`✗ ${folder}: ${err.message}`)
    return false
  } finally {
    await context.close()
  }
}

const browser = await chromium.launch({ headless: true })
const results = []
for (const t of targets) {
  results.push([t.folder, await captureOne(browser, t)])
}
await browser.close()

console.log('\nSummary:', Object.fromEntries(results))
process.exit(results.every(([, ok]) => ok) ? 0 : 1)
