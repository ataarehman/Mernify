import { readFileSync, writeFileSync } from 'fs'

const file = 'src/content/caseStudies.js'
const src = readFileSync(file, 'utf8')

// Everything before the first entry object
const arrayOpen = 'export const caseStudies = [\n'
const arrayClose = '\n]\n'
const arrayStart = src.indexOf(arrayOpen) + arrayOpen.length
const arrayEnd = src.indexOf(arrayClose, arrayStart)

const header = src.slice(0, arrayStart)
const footer = src.slice(arrayEnd + arrayClose.length)
const body = src.slice(arrayStart, arrayEnd) // raw entries joined by ",\n  "

// Split on entry boundaries: each entry starts with "  {" at column 0
// The body has entries like: "  {\n    slug: ...\n  }" separated by ",\n"
// Split by "\n  {" but re-attach the "  {" to each piece
const raw = body.split(/\n  (?=\{)/)
// raw[0] starts with "  {" (from the original),  rest start with "{"
const entries = raw.map((e, i) => (i === 0 ? e : '  ' + e))

// Find tailorize
const tailorizeIdx = entries.findIndex(e => e.includes("slug: 'tailorize'"))
if (tailorizeIdx < 0) { console.error('tailorize not found'); process.exit(1) }

const tailorize = entries[tailorizeIdx]
const rest = entries.filter((_, i) => i !== tailorizeIdx)

const reordered = [tailorize, ...rest]

// Rejoin — entries are separated by ",\n" except the last has no trailing comma
// Each entry already ends with "  }" so join with ",\n"
const newBody = reordered.join(',\n')

const newSrc = header + newBody + arrayClose + footer
writeFileSync(file, newSrc, 'utf8')

// Verify order
const slugs = [...newSrc.matchAll(/^\s+slug:\s*'([^']+)'/gm)].map(m => m[1])
console.log('New order:', slugs.slice(0, 12).join(', '))
