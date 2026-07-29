import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'

const html = readFileSync('C:/Users/MT/Downloads/GQ-Portfolio-Case-Studies.html', 'utf8')
console.log('File size:', html.length)

const tStart = html.indexOf('<script type="__bundler/template">')
const tEnd = html.indexOf('</script>', tStart)

if (tStart === -1) { console.log('No template tag found'); process.exit(1) }

const templateJson = html.slice(tStart + '<script type="__bundler/template">'.length, tEnd).trim()
const template = JSON.parse(templateJson)
const inner = typeof template === 'string' ? template : JSON.stringify(template)

mkdirSync('.tmp', { recursive: true })
writeFileSync('.tmp/gq-template.html', inner, 'utf8')
console.log('Written .tmp/gq-template.html, length:', inner.length)
console.log('Preview:\n', inner.slice(0, 800))
