import { chromium } from 'playwright'
import fs from 'fs'
import path from 'path'

const outDir = 'Mernify.md/previews/audit-2026-07-24'
fs.mkdirSync(outDir, { recursive: true })

const viewports = [
  { name: '1440x1000', width: 1440, height: 1000 },
  { name: '1024x768', width: 1024, height: 768 },
  { name: '768x1024', width: 768, height: 1024 },
  { name: '390x844', width: 390, height: 844 },
]

const routes = [
  '/',
  '/services',
  '/work',
  '/about',
  '/process',
  '/contact',
  '/privacy',
  '/terms',
  '/does-not-exist',
]

const base = 'http://localhost:5174'
const findings = {
  console: [],
  networkFails: [],
  linkChecks: [],
  pages: [],
  a11yNotes: null,
  perf: null,
}

const browser = await chromium.launch({ headless: true })

for (const vp of viewports) {
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
  })
  const page = await context.newPage()

  page.on('console', (msg) => {
    if (['error', 'warning'].includes(msg.type())) {
      findings.console.push({
        viewport: vp.name,
        type: msg.type(),
        text: msg.text(),
      })
    }
  })

  page.on('response', (res) => {
    if (res.status() >= 400) {
      findings.networkFails.push({
        viewport: vp.name,
        url: res.url(),
        status: res.status(),
      })
    }
  })

  await page.goto(`${base}/`, { waitUntil: 'networkidle', timeout: 60000 })
  await page.waitForTimeout(1500)
  await page.screenshot({
    path: path.join(outDir, `home-${vp.name}.png`),
    fullPage: false,
  })
  await page.screenshot({
    path: path.join(outDir, `home-${vp.name}-full.png`),
    fullPage: true,
  })

  const overflow = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
    bodyOverflow: document.body.scrollWidth > window.innerWidth,
  }))
  findings.pages.push({ viewport: vp.name, route: '/', overflow })

  if (vp.width <= 768) {
    const toggle = page.locator('button[aria-expanded]').first()
    if ((await toggle.count()) > 0) {
      await toggle.click()
      await page.waitForTimeout(500)
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
  const title = await page.title()
  const h1 = await page
    .locator('h1')
    .first()
    .textContent()
    .catch(() => null)
  const mainText = await page
    .locator('main')
    .innerText()
    .catch(() => '')
  findings.linkChecks.push({
    route,
    status: res ? res.status() : null,
    title,
    h1: h1 ? h1.trim() : null,
    mainSnippet: mainText.trim().slice(0, 220),
  })
  const safe =
    route === '/'
      ? 'home'
      : route.replace(/\//g, '').replace(/[^a-z0-9-]/gi, '_') || 'root'
  await page.screenshot({
    path: path.join(outDir, `route-${safe}.png`),
    fullPage: false,
  })
}

await page.goto(`${base}/`, { waitUntil: 'networkidle' })
findings.a11yNotes = await page.evaluate(() => {
  const headings = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map(
    (h) => ({
      tag: h.tagName,
      text: h.textContent.trim().slice(0, 100),
    }),
  )
  const images = [...document.querySelectorAll('img')].map((img) => ({
    alt: img.getAttribute('alt'),
    hasSrc: Boolean(img.getAttribute('src')),
  }))
  const links = [...document.querySelectorAll('a')].map((a) => ({
    text: a.textContent.trim().slice(0, 80),
    href: a.getAttribute('href'),
  }))
  const buttons = [...document.querySelectorAll('button')].map((b) => ({
    text: b.textContent.trim().slice(0, 80),
    ariaExpanded: b.getAttribute('aria-expanded'),
    ariaLabel: b.getAttribute('aria-label'),
  }))
  return {
    headings,
    images,
    links,
    buttons,
    skip: Boolean(document.querySelector('a[href="#main-content"]')),
    main: Boolean(document.querySelector('main#main-content')),
    metaDesc:
      document.querySelector('meta[name="description"]')?.content ?? null,
    og: Boolean(document.querySelector('meta[property^="og:"]')),
    canonical:
      document.querySelector('link[rel="canonical"]')?.href ?? null,
    sectionCount: document.querySelectorAll(
      'section,[data-header-theme]',
    ).length,
  }
})

findings.perf = await page.evaluate(() => {
  const nav = performance.getEntriesByType('navigation')[0]
  if (!nav) return null
  return {
    domContentLoaded: Math.round(nav.domContentLoadedEventEnd),
    loadEvent: Math.round(nav.loadEventEnd),
    transferSize: nav.transferSize,
    encodedBodySize: nav.encodedBodySize,
  }
})

fs.writeFileSync(
  path.join(outDir, 'audit-findings.json'),
  JSON.stringify(findings, null, 2),
)

console.log(
  JSON.stringify(
    {
      outDir,
      consoleIssues: findings.console.length,
      networkFails: findings.networkFails.length,
      routes: findings.linkChecks,
      overflow: findings.pages,
      a11ySummary: {
        skip: findings.a11yNotes.skip,
        main: findings.a11yNotes.main,
        og: findings.a11yNotes.og,
        canonical: findings.a11yNotes.canonical,
        headingCount: findings.a11yNotes.headings.length,
        imageAlts: findings.a11yNotes.images,
      },
      perf: findings.perf,
      consoleSample: findings.console.slice(0, 12),
    },
    null,
    2,
  ),
)

await browser.close()
