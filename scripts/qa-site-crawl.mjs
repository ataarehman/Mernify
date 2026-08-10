/**
 * Full-site QA crawl: routes × viewports, console errors, broken images,
 * horizontal overflow, missing titles/h1, dead internal links.
 */
import { chromium } from 'playwright'
import { writeFileSync } from 'node:fs'

const BASE = process.env.QA_BASE || 'http://127.0.0.1:4173'

const ROUTES = [
  '/',
  '/about',
  '/services',
  '/services/product-engineering',
  '/services/saas-development',
  '/services/web-development',
  '/services/mobile-app-development',
  '/services/ai-integration',
  '/services/workflow-automation',
  '/services/ui-ux-design',
  '/services/cloud-devops',
  '/services/api-development',
  '/services/dedicated-product-teams',
  '/services/does-not-exist',
  '/industries',
  '/case-studies',
  '/case-studies/tailorize',
  '/case-studies/servloom',
  '/case-studies/goodbooks-plus-analytics',
  '/case-studies/medbill-ultra',
  '/case-studies/metro-electric',
  '/case-studies/spaceworx',
  '/case-studies/mrzzm',
  '/case-studies/pathe-be',
  '/case-studies/godiva', // hidden — should 404 or empty
  '/process',
  '/blog',
  '/blog/practical-ai-integration-for-saas-products',
  '/blog/mern-stack-architecture-for-growing-teams',
  '/blog/react-performance-checklist-for-enterprise-apps',
  '/contact',
  '/privacy',
  '/terms',
  '/work',
  '/this-route-should-404',
]

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 834, height: 1112 },
  { name: 'mobile', width: 390, height: 844 },
]

const findings = []

function note(severity, route, viewport, issue, detail = '') {
  findings.push({ severity, route, viewport, issue, detail })
}

async function checkPage(page, route, vp) {
  const consoleErrors = []
  const pageErrors = []
  const failedRequests = []

  const onConsole = (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text().slice(0, 300))
  }
  const onPageError = (err) => pageErrors.push(String(err).slice(0, 300))
  const onRequestFailed = (req) => {
    const url = req.url()
    if (/fonts\.gstatic|googletagmanager|google-analytics|facebook|linkedin|doubleclick/i.test(url)) return
    failedRequests.push(`${req.failure()?.errorText || 'fail'} ${url.slice(0, 180)}`)
  }

  page.on('console', onConsole)
  page.on('pageerror', onPageError)
  page.on('requestfailed', onRequestFailed)

  const url = `${BASE}${route}`
  let response
  try {
    response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 })
  } catch (err) {
    note('error', route, vp.name, 'navigation failed', String(err).slice(0, 200))
    page.off('console', onConsole)
    page.off('pageerror', onPageError)
    page.off('requestfailed', onRequestFailed)
    return
  }

  await page.waitForTimeout(900)

  const title = await page.title()
  if (!title || title === 'Mernify' || title.length < 5) {
    note('warn', route, vp.name, 'weak/missing document title', title)
  }

  const metrics = await page.evaluate(() => {
    const docEl = document.documentElement
    const overflowX = docEl.scrollWidth > docEl.clientWidth + 2
    const h1s = [...document.querySelectorAll('h1')].map((el) => el.textContent?.trim()).filter(Boolean)
    const images = [...document.querySelectorAll('img')]
    const brokenImgs = images
      .filter((img) => img.complete && img.naturalWidth === 0 && img.src)
      .map((img) => img.src.slice(0, 160))
    const emptyAlt = images
      .filter((img) => img.src && (!img.hasAttribute('alt') || img.getAttribute('alt') === null))
      .map((img) => img.src.slice(0, 120))
    const metaDesc = document.querySelector('meta[name="description"]')?.getAttribute('content') || ''
    const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href') || ''
    const main = Boolean(document.querySelector('main'))
    const skip = Boolean(document.querySelector('a[href="#main-content"], a[href="#main"]'))
    // visible text that looks like raw overflow markers
    const bodyW = document.body?.scrollWidth || 0
    return {
      overflowX,
      scrollWidth: docEl.scrollWidth,
      clientWidth: docEl.clientWidth,
      bodyW,
      h1Count: h1s.length,
      h1: h1s[0] || '',
      brokenImgs,
      emptyAlt,
      metaDesc: metaDesc.slice(0, 120),
      canonical,
      main,
      skip,
      imgCount: images.length,
    }
  })

  if (metrics.overflowX) {
    note(
      'error',
      route,
      vp.name,
      'horizontal overflow',
      `scrollWidth=${metrics.scrollWidth} clientWidth=${metrics.clientWidth}`,
    )
  }
  if (metrics.h1Count === 0 && !route.includes('404') && route !== '/this-route-should-404') {
    // 404 page should still have h1
    note('warn', route, vp.name, 'missing h1')
  }
  if (metrics.h1Count > 1) {
    note('warn', route, vp.name, 'multiple h1s', String(metrics.h1Count))
  }
  for (const src of metrics.brokenImgs) {
    note('error', route, vp.name, 'broken image', src)
  }
  for (const src of metrics.emptyAlt.slice(0, 5)) {
    note('warn', route, vp.name, 'img missing alt', src)
  }
  if (!metrics.metaDesc && !route.includes('does-not-exist') && route !== '/this-route-should-404') {
    note('warn', route, vp.name, 'missing meta description')
  }
  if (!metrics.main) note('warn', route, vp.name, 'missing <main>')

  for (const e of consoleErrors.slice(0, 8)) {
    if (/favicon|Download the React DevTools/i.test(e)) continue
    note('error', route, vp.name, 'console error', e)
  }
  for (const e of pageErrors.slice(0, 5)) {
    note('error', route, vp.name, 'pageerror', e)
  }
  for (const e of failedRequests.slice(0, 8)) {
    note('warn', route, vp.name, 'failed request', e)
  }

  // Collect internal links for dead-link pass (desktop only once)
  let internalHrefs = []
  if (vp.name === 'desktop') {
    internalHrefs = await page.evaluate(() =>
      [...document.querySelectorAll('a[href^="/"]')]
        .map((a) => a.getAttribute('href'))
        .filter(Boolean),
    )
  }

  page.off('console', onConsole)
  page.off('pageerror', onPageError)
  page.off('requestfailed', onRequestFailed)

  return { status: response?.status(), title, metrics, internalHrefs }
}

async function main() {
  const browser = await chromium.launch({ headless: true })
  const collectedLinks = new Set()

  for (const vp of VIEWPORTS) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 1,
    })
    const page = await context.newPage()

    for (const route of ROUTES) {
      const result = await checkPage(page, route, vp)
      if (result?.internalHrefs) {
        for (const href of result.internalHrefs) {
          const path = href.split('#')[0].split('?')[0]
          if (path) collectedLinks.add(path)
        }
      }
      process.stdout.write('.')
    }

    // Mobile menu open check on home
    if (vp.name === 'mobile') {
      await page.goto(`${BASE}/`, { waitUntil: 'domcontentloaded' })
      await page.waitForTimeout(500)
      const toggles = page.locator('button[aria-label*="menu" i], button[aria-controls]')
      const count = await toggles.count()
      if (count === 0) note('error', '/', 'mobile', 'no mobile menu toggle found')
      else {
        try {
          await toggles.first().click({ timeout: 3000 })
          await page.waitForTimeout(400)
          const open = await page.evaluate(() => {
            const nav = document.querySelector('[data-mobile-nav], nav[aria-hidden="false"], .mobile-nav, [class*="mobile"]')
            return Boolean(nav) || document.body.classList.contains('menu-open')
          })
          // soft check — just ensure click doesn't throw
          note('info', '/', 'mobile', 'mobile menu toggle clicked', open ? 'panel detected' : 'click ok')
        } catch (err) {
          note('error', '/', 'mobile', 'mobile menu toggle failed', String(err).slice(0, 160))
        }
      }
    }

    await context.close()
  }

  // Dead internal link probe (desktop)
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } })
  const page = await context.newPage()
  for (const path of [...collectedLinks].sort()) {
    if (path.startsWith('http') || path.startsWith('mailto') || path.startsWith('tel')) continue
    try {
      const res = await page.goto(`${BASE}${path}`, { waitUntil: 'domcontentloaded', timeout: 30000 })
      await page.waitForTimeout(300)
      const is404 = await page.evaluate(() =>
        /not found|404/i.test(document.title + ' ' + (document.querySelector('h1')?.textContent || '')),
      )
      const status = res?.status()
      // SPA always 200 from preview — detect NotFound UI
      if (is404 && !path.includes('does-not-exist') && path !== '/this-route-should-404') {
        // only flag if we linked to something that shows 404
        const knownMissing = ['/services/does-not-exist']
        if (!ROUTES.includes(path) || knownMissing.includes(path)) {
          note('error', path, 'desktop', 'internal link leads to 404 UI')
        }
      }
      if (status && status >= 400) note('error', path, 'desktop', `HTTP ${status}`)
    } catch (err) {
      note('error', path, 'desktop', 'link navigation failed', String(err).slice(0, 160))
    }
  }
  await context.close()
  await browser.close()

  const summary = {
    base: BASE,
    counts: {
      total: findings.length,
      error: findings.filter((f) => f.severity === 'error').length,
      warn: findings.filter((f) => f.severity === 'warn').length,
      info: findings.filter((f) => f.severity === 'info').length,
    },
    findings,
  }
  writeFileSync('scripts/qa-report.json', JSON.stringify(summary, null, 2))
  console.log('\n' + JSON.stringify(summary.counts))
  const errors = findings.filter((f) => f.severity === 'error')
  console.log('\nERRORS:')
  for (const e of errors.slice(0, 80)) {
    console.log(`- [${e.viewport}] ${e.route}: ${e.issue} ${e.detail}`)
  }
  const warns = findings.filter((f) => f.severity === 'warn')
  console.log('\nWARNS (first 40):')
  for (const e of warns.slice(0, 40)) {
    console.log(`- [${e.viewport}] ${e.route}: ${e.issue} ${e.detail}`)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
