import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()
const errors = []
const warnings = []

function check(cond, msg, level = 'error') {
  if (!cond) (level === 'warn' ? warnings : errors).push(msg)
}

check(existsSync(join(root, 'dist', 'index.html')), 'dist/index.html missing — run npm run build first')
check(existsSync(join(root, 'public', 'og-image.jpg')), 'public/og-image.jpg missing')
check(existsSync(join(root, 'public', 'sitemap.xml')), 'public/sitemap.xml missing')
check(existsSync(join(root, 'public', 'robots.txt')), 'public/robots.txt missing')
check(existsSync(join(root, 'public', '_headers')), 'public/_headers missing')
check(existsSync(join(root, 'deploy', 'nginx.conf.example')), 'deploy/nginx.conf.example missing')
check(existsSync(join(root, 'deploy', 'DEPLOYMENT.md')), 'deploy/DEPLOYMENT.md missing')
check(existsSync(join(root, 'cf-worker', 'contact.js')), 'cf-worker/contact.js missing')
check(existsSync(join(root, 'cf-worker', 'site-preview.js')), 'cf-worker/site-preview.js missing')
check(existsSync(join(root, 'functions', 'site-preview.js')), 'functions/site-preview.js missing (Cloudflare Pages preview proxy)')
check(existsSync(join(root, 'functions', '_lib', 'preview.js')), 'functions/_lib/preview.js missing')

const sitemap = readFileSync(join(root, 'public', 'sitemap.xml'), 'utf8')
check(!sitemap.includes('mernify.com'), 'sitemap still references mernify.com')
check(sitemap.includes('mernify.co'), 'sitemap should use mernify.co')

const robots = readFileSync(join(root, 'public', 'robots.txt'), 'utf8')
check(robots.includes('https://mernify.co/sitemap.xml'), 'robots.txt needs absolute sitemap URL')

const vite = readFileSync(join(root, 'vite.config.js'), 'utf8')
check(/sourcemap:\s*false/.test(vite), 'vite production sourcemaps must be disabled')

const indexHtml = readFileSync(join(root, 'dist', 'index.html'), 'utf8')
check(indexHtml.includes('og-image.jpg') || indexHtml.includes('og:image'), 'dist index should include OG image meta')
check(!indexHtml.includes('.map'), 'dist index should not reference source maps')

const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'))
const rr = pkg.dependencies?.['react-router-dom'] || ''
check(/7\.18\.2|8\.3/.test(rr), `react-router-dom should be >=7.18.2 (found ${rr})`, 'warn')

const maps = []
function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    const st = statSync(p)
    if (st.isDirectory()) walk(p)
    else if (name.endsWith('.map')) maps.push(p)
  }
}
if (existsSync(join(root, 'dist'))) walk(join(root, 'dist'))
check(maps.length === 0, `Found ${maps.length} source map(s) in dist`)

const envExample = readFileSync(join(root, '.env.example'), 'utf8')
check(envExample.includes('VITE_CONTACT_ENDPOINT'), '.env.example missing VITE_CONTACT_ENDPOINT')
check(envExample.includes('VITE_WEB3FORMS_ACCESS_KEY'), '.env.example missing VITE_WEB3FORMS_ACCESS_KEY')
check(envExample.includes('VITE_CALENDLY_URL'), '.env.example missing VITE_CALENDLY_URL')
check(envExample.includes('VITE_GA_MEASUREMENT_ID'), '.env.example missing VITE_GA_MEASUREMENT_ID')
check(envExample.includes('Never put private secrets') || envExample.includes('PUBLIC'), '.env.example should warn that VITE_* is public', 'warn')

const team = readFileSync(join(root, 'src', 'content', 'team.js'), 'utf8')
check(!/published:\s*true/.test(team) || /published:\s*false/.test(team), 'team content review needed', 'warn')

const testimonials = readFileSync(join(root, 'src', 'content', 'testimonials.js'), 'utf8')
const publishedTestimonials = (testimonials.match(/published:\s*true/g) || []).length
if (publishedTestimonials > 0) {
  warnings.push(`${publishedTestimonials} testimonial(s) marked published — confirm client approval`)
}

const envPath = join(root, '.env')
const prodEnvPath = join(root, '.env.production')
const envFile = existsSync(prodEnvPath) ? prodEnvPath : existsSync(envPath) ? envPath : null
if (envFile) {
  const env = readFileSync(envFile, 'utf8')
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#'))
    .join('\n')
  if (!/VITE_CONTACT_ENDPOINT\s*=\s*\S+/.test(env) && !/VITE_WEB3FORMS_ACCESS_KEY\s*=\s*\S+/.test(env)) {
    warnings.push('No contact delivery key configured — form will fall back to mailto')
  }
  if (!/VITE_CALENDLY_URL\s*=\s*\S+/.test(env)) {
    warnings.push('VITE_CALENDLY_URL not set — booking CTA falls back to /contact?intent=discovery')
  }
  if (!/VITE_GA_MEASUREMENT_ID\s*=\s*\S+/.test(env)) {
    warnings.push('VITE_GA_MEASUREMENT_ID not set — analytics will not load')
  }
  if (/RESEND_API_KEY\s*=/.test(env)) {
    errors.push('RESEND_API_KEY must not be in frontend .env — keep it on the Cloudflare Worker only')
  }
} else {
  warnings.push('.env / .env.production not found — set VITE_* values before production build')
}

console.log('\nMernify deployment readiness\n')
if (errors.length) {
  console.log('ERRORS:')
  errors.forEach((e) => console.log(`  x ${e}`))
}
if (warnings.length) {
  console.log('WARNINGS (manual steps before go-live):')
  warnings.forEach((w) => console.log(`  ! ${w}`))
}
if (!errors.length && !warnings.length) {
  console.log('  OK — all checks passed')
}
console.log('')
process.exit(errors.length ? 1 : 0)
