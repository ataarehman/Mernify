import { readFileSync, writeFileSync } from 'node:fs'

const path = 'src/content/blogPostsData.js'
let src = readFileSync(path, 'utf8')

const map = [
  ['practical-ai-integration-for-saas-products', 'ai-integration'],
  ['mern-stack-architecture-for-growing-teams', 'mern-architecture'],
  ['react-performance-checklist-for-enterprise-apps', 'react-performance'],
  ['nodejs-apis-that-operators-can-trust', 'nodejs-apis'],
  ['cloud-foundations-for-saas-multi-tenancy', 'cloud-tenancy'],
  ['devops-pipelines-that-ship-with-confidence', 'devops-pipelines'],
  ['design-systems-that-engineers-actually-use', 'design-systems'],
  ['enterprise-software-buying-what-teams-miss', 'enterprise-buying'],
  ['product-engineering-from-discovery-to-delivery', 'product-engineering'],
  ['saas-subscription-foundations-done-right', 'saas-subscriptions'],
  ['ux-research-that-survives-sprint-pressure', 'ux-research'],
  ['ai-evaluation-before-you-ship-the-copilot', 'ai-evaluation'],
]

for (const [slug, key] of map) {
  const hero = `/assets/images/blog/${key}-hero.webp`
  const body = `/assets/images/blog/${key}-body.webp`
  const slugIdx = src.indexOf(`slug: '${slug}'`)
  if (slugIdx < 0) {
    console.error('missing slug', slug)
    continue
  }
  const nextSlug = src.indexOf(`slug: '`, slugIdx + 10)
  const end = nextSlug < 0 ? src.length : nextSlug
  let chunk = src.slice(slugIdx, end)
  let replaced = 0
  chunk = chunk.replace(/image: '[^']+'/, () => {
    replaced += 1
    return `image: '${hero}'`
  })
  chunk = chunk.replace(/src: '\/assets\/images\/[^']+'/, () => {
    replaced += 1
    return `src: '${body}'`
  })
  src = src.slice(0, slugIdx) + chunk + src.slice(end)
  console.log(slug, 'replacements', replaced)
}

writeFileSync(path, src)
console.log('updated')
