/**
 * Reports images referenced from more than one place in src/, and images whose
 * bytes are identical to another file (same picture under two names).
 *
 * Usage: node scripts/audit-image-dupes.mjs
 */
import { createHash } from 'node:crypto'
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { extname, join, relative } from 'node:path'

const ASSET = /\.(png|jpe?g|webp|avif|gif|svg)$/i

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) walk(full, out)
    else out.push(full)
  }
  return out
}

// --- references from source ------------------------------------------------
const refs = new Map()
for (const file of walk('src')) {
  if (!/\.(jsx?|css)$/.test(extname(file) ? file : '')) continue
  const text = readFileSync(file, 'utf8')
  for (const [, path] of text.matchAll(/['"(](\/assets\/[^'")\s]+?\.(?:png|jpe?g|webp|avif|gif|svg))/gi)) {
    if (!refs.has(path)) refs.set(path, new Set())
    refs.get(path).add(relative('src', file))
  }
}

const reused = [...refs].filter(([, where]) => where.size > 1)
if (reused.length) {
  console.log(`\n${reused.length} image(s) referenced from multiple files:`)
  for (const [path, where] of reused.sort()) {
    console.log(`  ${path}\n      ${[...where].join('\n      ')}`)
  }
} else {
  console.log('\nNo image is referenced from more than one source file.')
}

// --- byte-identical files --------------------------------------------------
const byHash = new Map()
for (const file of walk(join('public', 'assets'))) {
  if (!ASSET.test(file)) continue
  const hash = createHash('sha1').update(readFileSync(file)).digest('hex')
  if (!byHash.has(hash)) byHash.set(hash, [])
  byHash.get(hash).push('/' + relative('public', file).replaceAll('\\', '/'))
}

const identical = [...byHash.values()].filter((group) => group.length > 1)
if (identical.length) {
  console.log(`\n${identical.length} group(s) of byte-identical images:`)
  for (const group of identical) console.log('  ' + group.join('\n  '))
} else {
  console.log('\nNo byte-identical duplicate images on disk.')
}
