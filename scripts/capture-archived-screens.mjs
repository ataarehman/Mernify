/**
 * Archive capture with CSS intact (non-id_ mode), toolbar stripped.
 */
import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'

const jobs = [
  {
    folder: 'kinepolis',
    file: 'home',
    url: 'https://web.archive.org/web/20240614235959/https://kinepolis.be/',
  },
  {
    folder: 'kinepolis',
    file: 'cinema',
    url: 'https://web.archive.org/web/20240501000000/https://kinepolis.be/fr/films',
  },
  {
    folder: 'pathe',
    file: 'home',
    url: 'https://web.archive.org/web/20240601000000/https://www.pathe.be/en',
  },
]

const browser = await chromium.launch({ headless: true })

for (const job of jobs) {
  await mkdir(`public/portfolio/${job.folder}`, { recursive: true })
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
  })
  const page = await context.newPage()
  try {
    console.log('TRY', job.folder, job.file)
    await page.goto(job.url, { waitUntil: 'networkidle', timeout: 90000 }).catch(() =>
      page.goto(job.url, { waitUntil: 'domcontentloaded', timeout: 60000 })
    )
    await page.waitForTimeout(5000)

    // Remove Wayback chrome
    await page.evaluate(() => {
      for (const sel of ['#wm-ipp-base', '#donato', '#wm-ipp', 'wmtb']) {
        document.querySelectorAll(sel).forEach((el) => el.remove())
      }
      document.documentElement.style.setProperty('margin-top', '0', 'important')
      document.body.style.setProperty('margin-top', '0', 'important')
    })
    await page.addStyleTag({
      content: `
        #wm-ipp-base, #donato, #wm-ipp { display:none !important; }
        html, body { margin-top: 0 !important; padding-top: 0 !important; }
      `,
    })
    await page.waitForTimeout(500)

    const text = await page.locator('body').innerText()
    if (/Access Denied|Allo Houston|permission to access/i.test(text)) {
      console.log('  blocked')
      continue
    }

    // Prefer clipping below leftover archive UI (~0) after removal
    await page.screenshot({
      path: `public/portfolio/${job.folder}/${job.file}-desktop.png`,
      fullPage: false,
      clip: { x: 0, y: 0, width: 1440, height: 900 },
    })
    await page.setViewportSize({ width: 390, height: 844 })
    await page.waitForTimeout(800)
    await page.evaluate(() => {
      document.querySelectorAll('#wm-ipp-base, #donato').forEach((el) => el.remove())
    })
    await page.screenshot({
      path: `public/portfolio/${job.folder}/${job.file}-mobile.png`,
      fullPage: false,
    })
    console.log('  saved', job.folder, job.file)
  } catch (err) {
    console.error('  ERR', err.message)
  } finally {
    await context.close()
  }
}

await browser.close()
console.log('done')
