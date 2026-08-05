/**
 * Cross-references static assets in public/ against every reference in src/
 * (plus index.html and the web manifest) and reports both directions:
 *
 *   missing  — referenced but not on disk (broken image at runtime)
 *   orphaned — on disk but never referenced (dead weight in the bundle)
 *
 * Template-literal paths such as `/assets/images/industries/${slug}-1280.webp`
 * are treated as prefix globs, so any file under that prefix counts as used.
 *
 * Usage: node scripts/audit-assets.mjs [--json]
 */
import fs from 'node:fs'
import path from 'node:path'

const PUBLIC_DIR = 'public'
const ASSET_EXT = /\.(jpe?g|png|webp|avif|gif|svg|ico|woff2?|mp4|webm)$/i

/** Files that are fetched by convention rather than by an explicit reference. */
const CONVENTION = new Set([
  'favicon.ico',
  'favicon.svg',
  'favicon-16x16.png',
  'favicon-32x32.png',
  'favicon-48x48.png',
  'favicon-96x96.png',
  'apple-touch-icon.png',
  'icon-192.png',
  'icon-512.png',
  'icon-maskable-512.png',
  'og-image.jpg',
  'robots.txt',
  'sitemap.xml',
  'site.webmanifest',
  '_headers',
])

function walk(dir, test, acc = []) {
  if (!fs.existsSync(dir)) return acc
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) walk(p, test, acc)
    else if (test(e.name)) acc.push(p)
  }
  return acc
}

const sourceFiles = walk('src', (n) => /\.(js|jsx|ts|tsx|css|html)$/.test(n)).concat(
  ['index.html', 'public/site.webmanifest'].filter((f) => fs.existsSync(f)),
)

const exact = new Set()
const prefixes = new Set()

// Any quoted string starting with a root-relative asset-ish path.
const REF = /["'`](\/(?:assets|portfolio|fonts)\/[^"'`\n]*|\/[\w.-]+\.(?:png|jpe?g|webp|avif|svg|ico))/gi

for (const file of sourceFiles) {
  const text = fs.readFileSync(file, 'utf8')
  let m
  while ((m = REF.exec(text))) {
    let ref = m[1]
    const interp = ref.indexOf('${')
    if (interp >= 0) {
      prefixes.add(ref.slice(0, interp))
    } else {
      exact.add(ref.split(/[?#]/)[0])
    }
  }
}

const onDisk = walk(PUBLIC_DIR, (n) => ASSET_EXT.test(n) || CONVENTION.has(n)).map((p) =>
  '/' + path.relative(PUBLIC_DIR, p).split(path.sep).join('/'),
)

const isUsed = (rel) =>
  exact.has(rel) ||
  CONVENTION.has(rel.slice(1)) ||
  [...prefixes].some((p) => rel.startsWith(p))

const orphaned = onDisk.filter((rel) => !isUsed(rel))
const missing = [...exact].filter((rel) => !fs.existsSync(path.join(PUBLIC_DIR, rel.slice(1))))

const sizeOf = (rel) => {
  try {
    return fs.statSync(path.join(PUBLIC_DIR, rel.slice(1))).size
  } catch {
    return 0
  }
}
const orphanBytes = orphaned.reduce((n, rel) => n + sizeOf(rel), 0)

if (process.argv.includes('--json')) {
  console.log(JSON.stringify({ missing, orphaned, orphanBytes }, null, 2))
} else {
  console.log(`assets on disk : ${onDisk.length}`)
  console.log(`exact refs     : ${exact.size}`)
  console.log(`prefix refs    : ${prefixes.size}  ${[...prefixes].join(', ')}`)
  console.log(`\nMISSING (${missing.length}):`)
  missing.forEach((r) => console.log('  ' + r))
  console.log(
    `\nORPHANED (${orphaned.length}, ${(orphanBytes / 1024 / 1024).toFixed(2)} MB):`,
  )
  orphaned
    .map((r) => [r, sizeOf(r)])
    .sort((a, b) => b[1] - a[1])
    .forEach(([r, s]) => console.log(`  ${(s / 1024).toFixed(0).padStart(6)} KB  ${r}`))
}

if (process.argv.includes('--prune')) {
  let count = 0
  let bytes = 0
  for (const rel of orphaned) {
    const file = path.join(PUBLIC_DIR, rel.slice(1))
    bytes += sizeOf(rel)
    fs.unlinkSync(file)
    count += 1
  }
  // Drop directories the prune emptied out.
  const dirs = walk(PUBLIC_DIR, () => true).length
  for (const dir of fs
    .readdirSync(PUBLIC_DIR, { recursive: true, withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => path.join(e.parentPath ?? e.path, e.name))
    .sort((a, b) => b.length - a.length)) {
    if (fs.existsSync(dir) && fs.readdirSync(dir).length === 0) fs.rmdirSync(dir)
  }
  console.log(
    `\npruned ${count} files (${(bytes / 1024 / 1024).toFixed(2)} MB), ${dirs} assets remain`,
  )
}

if (missing.length) process.exitCode = 1
