/**
 * Research harness: visit portfolio sites, capture screenshots + public signals.
 * Evidence-only — no auth bypass.
 */
import { chromium } from 'playwright'
import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const ROOT = join(process.cwd(), 'public', 'portfolio')
const REPORT = join(process.cwd(), '.tmp', 'portfolio-research')
mkdirSync(REPORT, { recursive: true })

const projects = [
  {
    id: 'goodbooks-plus',
    name: 'GoodBooks Plus Analytics',
    url: 'https://goodbooksplus.com/analytics/',
    extra: ['https://goodbooksplus.com/', 'https://goodbooksplus.com/analytics/'],
  },
  {
    id: 'medbill-ultra',
    name: 'MedBill Ultra',
    url: 'https://medbillultra.com/',
    extra: ['https://medbillultra.com/', 'https://medbillultra.com/about/', 'https://medbillultra.com/features/', 'https://medbillultra.com/pricing/', 'https://medbillultra.com/contact/'],
  },
  {
    id: 'metro-electric',
    name: 'Metro Electric',
    url: 'https://metroelectric.com.au/',
    extra: ['https://metroelectric.com.au/', 'https://metroelectric.com.au/services/', 'https://metroelectric.com.au/about/', 'https://metroelectric.com.au/contact/'],
  },
  {
    id: 'spaceworx',
    name: 'SpaceWorx',
    url: 'https://www.spaceworx.us/',
    extra: ['https://www.spaceworx.us/', 'https://www.spaceworx.us/about/', 'https://www.spaceworx.us/services/', 'https://www.spaceworx.us/projects/', 'https://www.spaceworx.us/contact/'],
  },
  {
    id: 'mrzzm',
    name: 'MRZZM',
    url: 'https://mrzzm.mountsol.dev/',
    extra: ['https://mrzzm.mountsol.dev/'],
  },
  {
    id: 'tailorize',
    name: 'Tailorize',
    url: 'https://tailorize.blackolives.sa/en',
    extra: ['https://tailorize.blackolives.sa/en', 'https://tailorize.blackolives.sa/en/about', 'https://tailorize.blackolives.sa/en/contact'],
  },
]

function slugify(url) {
  try {
    const u = new URL(url)
    const path = u.pathname.replace(/\/+/g, '-').replace(/^-|-$/g, '') || 'home'
    return path.slice(0, 60) || 'home'
  } catch {
    return 'page'
  }
}

async function probePage(page, url) {
  const consoleErrors = []
  const pageErrors = []
  const onConsole = (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text().slice(0, 200))
  }
  const onPageError = (err) => pageErrors.push(String(err).slice(0, 200))
  page.on('console', onConsole)
  page.on('pageerror', onPageError)

  let status = null
  let title = ''
  let description = ''
  let h1 = []
  let navLinks = []
  let bodySnippet = ''
  let techHints = []
  let ok = false

  try {
    const res = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 })
    status = res?.status() ?? null
    ok = Boolean(res && res.ok())
    await page.waitForTimeout(1800)

    title = await page.title().catch(() => '')
    description = await page
      .locator('meta[name="description"]')
      .first()
      .getAttribute('content')
      .catch(() => '')
    h1 = await page.locator('h1').allTextContents().then((t) => t.map((x) => x.trim()).filter(Boolean).slice(0, 5)).catch(() => [])
    navLinks = await page
      .locator('header a, nav a')
      .evaluateAll((els) =>
        [...new Set(els.map((a) => ({ text: (a.textContent || '').trim(), href: a.href })).filter((x) => x.text && x.href))].slice(0, 20),
      )
      .catch(() => [])
    bodySnippet = await page
      .locator('body')
      .innerText()
      .then((t) => t.replace(/\s+/g, ' ').trim().slice(0, 1800))
      .catch(() => '')

    const html = await page.content()
    const hints = []
    if (/react/i.test(html) || /__NEXT_DATA__/i.test(html)) hints.push('React/Next signals in HTML')
    if (/wp-content|wordpress/i.test(html)) hints.push('WordPress')
    if (/shopify|cdn\.shopify/i.test(html)) hints.push('Shopify')
    if (/webflow/i.test(html)) hints.push('Webflow')
    if (/wix\.com|parastorage/i.test(html)) hints.push('Wix')
    if (/squarespace/i.test(html)) hints.push('Squarespace')
    if (/bootstrap/i.test(html)) hints.push('Bootstrap')
    if (/tailwind/i.test(html)) hints.push('Tailwind-like classnames')
    if (/vue|nuxt/i.test(html)) hints.push('Vue/Nuxt signals')
    if (/angular/i.test(html)) hints.push('Angular signals')
    techHints = hints
  } catch (err) {
    bodySnippet = String(err).slice(0, 300)
  } finally {
    page.off('console', onConsole)
    page.off('pageerror', onPageError)
  }

  return {
    url,
    status,
    ok,
    title,
    description: description || '',
    h1,
    navLinks,
    bodySnippet,
    techHints,
    consoleErrors: consoleErrors.slice(0, 8),
    pageErrors: pageErrors.slice(0, 5),
  }
}

const browser = await chromium.launch({ headless: true })
const findings = []

for (const project of projects) {
  const dir = join(ROOT, project.id)
  mkdirSync(dir, { recursive: true })
  const pages = []
  const urls = [...new Set([project.url, ...(project.extra || [])])]

  for (const url of urls) {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      userAgent:
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    })
    const page = await context.newPage()
    const desktop = await probePage(page, url)
    const shotBase = `${slugify(url)}`
    let desktopShot = null
    let mobileShot = null

    try {
      desktopShot = `${shotBase}-desktop.png`
      await page.screenshot({ path: join(dir, desktopShot), fullPage: false })
    } catch {
      desktopShot = null
    }

    try {
      await page.setViewportSize({ width: 390, height: 844 })
      await page.waitForTimeout(600)
      mobileShot = `${shotBase}-mobile.png`
      await page.screenshot({ path: join(dir, mobileShot), fullPage: false })
    } catch {
      mobileShot = null
    }

    pages.push({
      ...desktop,
      screenshots: { desktop: desktopShot, mobile: mobileShot },
    })
    await context.close()
  }

  findings.push({
    id: project.id,
    name: project.name,
    primaryUrl: project.url,
    pages,
  })
  console.error(`researched ${project.id}: ${pages.length} pages`)
}

await browser.close()
writeFileSync(join(REPORT, 'findings.json'), JSON.stringify(findings, null, 2))
console.log(JSON.stringify({ projects: findings.length, report: join(REPORT, 'findings.json') }, null, 2))
