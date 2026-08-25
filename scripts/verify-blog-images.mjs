import { access } from 'node:fs/promises'
import { join } from 'node:path'
import { blogPostsData } from '../src/content/blogPostsData.js'

const root = join(process.cwd(), 'public')
const paths = []
for (const post of blogPostsData) {
  paths.push(post.image)
  for (const s of post.sections) {
    if (s.type === 'figure') paths.push(s.src)
  }
}
let missing = 0
for (const p of paths) {
  const rel = p.startsWith('/') ? p.slice(1) : p
  const file = join(root, rel)
  const md = file.replace(/\.webp$/, '-md.webp')
  for (const f of [file, md]) {
    try {
      await access(f)
    } catch {
      console.log('MISSING', f)
      missing += 1
    }
  }
}
console.log(`checked ${paths.length} refs ×2 variants; missing ${missing}; posts ${blogPostsData.length}`)
if (missing) process.exit(1)
