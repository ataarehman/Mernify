import { readFileSync, writeFileSync } from 'node:fs'

const content = readFileSync('src/content/caseStudies.js', 'utf8')

// Find where the array starts and ends
// Normalize to LF for processing
const normalized = content.replace(/\r\n/g, '\n')
const arrayOpenIdx = normalized.indexOf('export const caseStudies = [\n')
const contentToUse = normalized
if (arrayOpenIdx === -1) throw new Error('Array start not found')

// Find the closing bracket at depth 0
let depth = 0
let arrayCloseIdx = -1
let i = arrayOpenIdx + 'export const caseStudies = ['.length

for (; i < contentToUse.length; i++) {
  if (contentToUse[i] === '[') depth++
  else if (contentToUse[i] === ']') {
    if (depth === 0) {
      arrayCloseIdx = i
      break
    }
    depth--
  }
}
if (arrayCloseIdx === -1) throw new Error('Array close not found')

// Extract inner array content (between '[' and ']')
const innerStart = arrayOpenIdx + 'export const caseStudies = ['.length
const innerContent = contentToUse.slice(innerStart, arrayCloseIdx)

// Split entries: each entry is a top-level {...} block
const entries = []
let entryStart = -1
let braceDepth = 0

for (let j = 0; j < innerContent.length; j++) {
  const ch = innerContent[j]
  if (ch === '{' && braceDepth === 0) {
    entryStart = j
    braceDepth = 1
  } else if (ch === '{') {
    braceDepth++
  } else if (ch === '}') {
    braceDepth--
    if (braceDepth === 0 && entryStart !== -1) {
      entries.push(innerContent.slice(entryStart, j + 1))
      entryStart = -1
    }
  }
}

console.log('Total entries:', entries.length)
entries.forEach((e, idx) => {
  const m = e.match(/slug: '([^']+)'/)
  console.log(idx, m ? m[1] : 'unknown')
})

// Move servloom to index 0
const sIdx = entries.findIndex(e => e.includes("slug: 'servloom'"))
if (sIdx < 0) throw new Error('servloom not found')

const [servloom] = entries.splice(sIdx, 1)
entries.unshift(servloom)

console.log('\nNew order:')
entries.forEach((e, idx) => {
  const m = e.match(/slug: '([^']+)'/)
  console.log(idx, m ? m[1] : 'unknown')
})

// Rebuild: join entries with ',\n  ' separator, wrap with proper formatting
const rejoined = '\n  ' + entries.join(',\n  ') + ',\n'

const newContent =
  contentToUse.slice(0, innerStart) +
  rejoined +
  contentToUse.slice(arrayCloseIdx)

writeFileSync('src/content/caseStudies.js', newContent, 'utf8')
console.log('\nDone.')
