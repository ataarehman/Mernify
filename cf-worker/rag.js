/**
 * Lightweight RAG retrieval for Cloudflare Workers (no external vector DB).
 * Token-overlap + tag boost scoring over the static corpus + D1 approved FAQs.
 */

import { KNOWLEDGE_CHUNKS } from './knowledge-corpus.js'

const STOP = new Set([
  'a', 'an', 'the', 'and', 'or', 'but', 'if', 'in', 'on', 'at', 'to', 'for', 'of', 'is', 'are',
  'was', 'were', 'be', 'been', 'with', 'as', 'by', 'from', 'that', 'this', 'it', 'we', 'you',
  'your', 'our', 'their', 'my', 'i', 'me', 'do', 'does', 'did', 'can', 'could', 'would', 'should',
  'what', 'how', 'when', 'where', 'who', 'which', 'why', 'about', 'into', 'than', 'then', 'so',
  'not', 'no', 'yes', 'just', 'also', 'very', 'more', 'most', 'some', 'any', 'all',
])

function tokenize(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s/+.-]/g, ' ')
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOP.has(t))
}

function unique(arr) {
  return [...new Set(arr)]
}

/**
 * @param {string} query
 * @param {{ id: string, source: string, title: string, url?: string, text: string, tags?: string[] }[]} docs
 * @param {number} topK
 */
export function retrieveFromDocs(query, docs, topK = 6) {
  const qTokens = unique(tokenize(query))
  if (!qTokens.length || !docs?.length) return []

  const scored = docs.map((doc) => {
    const hay = `${doc.title} ${doc.text} ${(doc.tags || []).join(' ')}`.toLowerCase()
    const dTokens = unique(tokenize(hay))
    const dSet = new Set(dTokens)
    let overlap = 0
    for (const t of qTokens) {
      if (dSet.has(t)) overlap += 1
      else if (hay.includes(t)) overlap += 0.5
    }
    let tagBoost = 0
    for (const tag of doc.tags || []) {
      if (qTokens.some((t) => tag.includes(t) || t.includes(tag))) tagBoost += 0.75
    }
    // Prefer shorter precise FAQ/service chunks slightly
    const lengthPenalty = Math.min(doc.text.length / 2000, 0.4)
    const score = overlap + tagBoost - lengthPenalty
    return { doc, score }
  })

  return scored
    .filter((s) => s.score > 0.5)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .map((s) => s.doc)
}

/**
 * Build retrieval context string for the system prompt.
 * @param {string} query
 * @param {{ question: string, answer: string }[]} [approvedFaqs]
 * @param {number} [topK]
 */
export function buildRetrievalContext(query, approvedFaqs = [], topK = 6) {
  const learnedDocs = (approvedFaqs || []).map((f, i) => ({
    id: `learned-${i}`,
    source: 'approved-knowledge',
    title: f.question,
    text: `Q: ${f.question}\nA: ${f.answer}`,
    tags: ['faq', 'learned'],
  }))

  const pool = [...KNOWLEDGE_CHUNKS, ...learnedDocs]
  let hits = retrieveFromDocs(query, pool, topK)

  // Portfolio / case-study asks: ensure multiple case studies are in context
  const q = String(query || '').toLowerCase()
  if (/(case\s*stud|cases\s+stud|portfolio|our work|examples?|projects?\s+you)/i.test(q)) {
    const portfolio = KNOWLEDGE_CHUNKS.filter((c) => c.source === 'portfolio')
    const merged = [...hits]
    for (const doc of portfolio) {
      if (!merged.some((h) => h.id === doc.id)) merged.push(doc)
    }
    hits = merged.slice(0, Math.max(topK, 8))
  }

  if (!hits.length) {
    const fallback = KNOWLEDGE_CHUNKS.filter((c) =>
      ['company-overview', 'svc-saas', 'svc-web', 'svc-mobile', 'svc-ai', 'pricing-policy'].includes(c.id),
    )
    return formatChunks(fallback)
  }

  return formatChunks(hits)
}

/**
 * Grounded reply when the LLM is unavailable — uses retrieved chunks only.
 */
export function buildRagFallbackReply(query, retrievalBlock) {
  const q = String(query || '').toLowerCase()
  const block = String(retrievalBlock || '')

  if (/(case\s*stud|cases\s+stud|portfolio|our work)/i.test(q)) {
    const titles = [...block.matchAll(/Case study:\s*([^\n(]+)/gi)].map((m) => m[1].trim())
    const urls = [...block.matchAll(/\((\/case-studies\/[a-z0-9-]+)\)/gi)].map((m) => m[1])
    const unique = []
    for (let i = 0; i < titles.length; i++) {
      const line = urls[i] ? `${titles[i]} (${urls[i]})` : titles[i]
      if (!unique.includes(line)) unique.push(line)
    }
    if (unique.length) {
      const list = unique
        .slice(0, 6)
        .map((t, i) => `${i + 1}. ${t}`)
        .join('\n')
      return `Here are some published case studies from our portfolio:\n\n${list}\n\nWhich one would you like to explore — or tell me your industry and I’ll point you to the closest match.`
    }
  }

  // Pull first retrieved chunk summary
  const first = block.split('\n\n')[0]
  if (first && first.length > 40) {
    const cleaned = first.replace(/^\[\d+\]\s*\([^)]+\)\s*/, '').trim()
    return `${cleaned.slice(0, 420)}\n\nWould you like me to go deeper on this, or share how it relates to your project?`
  }

  return "I can help with Mernify's services, portfolio, process, and next steps. What are you looking to build or improve?"
}

function formatChunks(chunks) {
  return chunks
    .map((c, i) => {
      const loc = c.url ? ` (${c.url})` : ''
      return `[${i + 1}] (${c.source}) ${c.title}${loc}\n${c.text}`
    })
    .join('\n\n')
}

/**
 * Heuristic buying-intent when model metadata is missing.
 * @param {string} text
 * @param {object} memory
 */
export function detectBuyingIntent(text, memory = {}) {
  const t = String(text || '').toLowerCase()
  const highSignals = [
    'book a call', 'book a meeting', 'schedule', 'calendly', 'talk to', 'speak to',
    'get a quote', 'request a quote', 'estimate', 'proposal', 'hire you', 'start a project',
    'ready to start', 'want to proceed', 'sign up', 'engage', 'budget is', 'our budget',
    'send proposal', 'next steps', 'contact sales', 'submit inquiry', 'get in touch',
  ]
  const mediumSignals = [
    'timeline', 'how much', 'pricing', 'cost', 'price', 'how long', 'when can you',
    'looking to build', 'need a team', 'mvp', 'launch in', 'dedicated team',
  ]

  if (highSignals.some((s) => t.includes(s))) return 'high'
  const filled =
    [memory.projectType, memory.businessProblem, memory.timeline, memory.budget].filter(Boolean)
      .length
  if (filled >= 3) return 'high'
  if (mediumSignals.some((s) => t.includes(s))) return 'medium'
  if (filled >= 2) return 'medium'
  return 'low'
}
