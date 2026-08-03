import fs from 'node:fs'
import path from 'node:path'

function walk(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) walk(p, acc)
    else if (/\.(js|jsx|css|html)$/.test(e.name)) acc.push(p)
  }
  return acc
}

const files = walk('src').concat(['index.html'])
const re = /["'`](\/assets\/[^"'`?#]+)/g
const refs = new Set()
for (const f of files) {
  const t = fs.readFileSync(f, 'utf8')
  let m
  while ((m = re.exec(t))) refs.add(m[1])
}

const missing = [...refs].filter((r) => !fs.existsSync(path.join('public', r.slice(1))))
console.log(JSON.stringify({ total: refs.size, missing }, null, 2))
