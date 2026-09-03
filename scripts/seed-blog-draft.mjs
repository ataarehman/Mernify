/**
 * Upsert draft posts from src/content/blogDraftPosts.js into local CMS store.
 * Usage: node scripts/seed-blog-draft.mjs
 */
import { randomUUID } from 'node:crypto'
import { blogDraftPosts } from '../src/content/blogDraftPosts.js'
import { postToRowFields } from '../functions/_lib/blogNormalize.js'
import { createLocalStore, resolveRepoRoot } from '../functions/_lib/blogLocalStore.js'

const store = createLocalStore(resolveRepoRoot())
await store.ensureSeeded()

const now = Date.now()
let created = 0
let updated = 0

for (const post of blogDraftPosts) {
  const existing = (await store.listAdmin({ limit: 500 })).posts.find((p) => p.slug === post.slug)
  const fields = postToRowFields(post, {
    status: 'draft',
    publishedBy: null,
    nowTs: now,
  })

  if (existing) {
    await store.update(existing.id, { ...post, status: 'draft' }, { email: 'seed@mernify.local' })
    updated += 1
    console.log(`Updated draft: ${post.slug} (${existing.id})`)
  } else {
    const row = await store.create({ ...post, status: 'draft' }, { email: 'seed@mernify.local' })
    created += 1
    console.log(`Created draft: ${post.slug} (${row?.id || randomUUID()})`)
  }
}

console.log(`\nDraft seed complete: ${created} created, ${updated} updated`)
console.log(`Store: ${store.storePath}`)
console.log(`Admin: http://localhost:5173/admin/`)
