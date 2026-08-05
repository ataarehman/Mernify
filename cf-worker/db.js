/**
 * D1 helpers — conversation logging + learned knowledge for Mernify AI.
 */

const SCHEMA_STATEMENTS = [
  `CREATE TABLE IF NOT EXISTS conversations (
    id TEXT PRIMARY KEY,
    started_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL,
    page_url TEXT,
    page_title TEXT,
    intent TEXT,
    lead_submitted INTEGER NOT NULL DEFAULT 0,
    distilled INTEGER NOT NULL DEFAULT 0,
    memory_json TEXT
  )`,
  `ALTER TABLE conversations ADD COLUMN memory_json TEXT`,
  `CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    conversation_id TEXT NOT NULL,
    role TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at INTEGER NOT NULL
  )`,
  `CREATE INDEX IF NOT EXISTS idx_messages_conversation
    ON messages(conversation_id, created_at)`,
  `CREATE TABLE IF NOT EXISTS knowledge_candidates (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    question TEXT NOT NULL,
    answer_draft TEXT NOT NULL,
    source_conversation_id TEXT,
    status TEXT NOT NULL DEFAULT 'pending',
    hit_count INTEGER NOT NULL DEFAULT 1,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
  )`,
  `CREATE INDEX IF NOT EXISTS idx_knowledge_candidates_status
    ON knowledge_candidates(status, hit_count DESC)`,
  `CREATE TABLE IF NOT EXISTS knowledge_approved (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    hit_count INTEGER NOT NULL DEFAULT 1,
    source_candidate_id INTEGER,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
  )`,
  `CREATE INDEX IF NOT EXISTS idx_knowledge_approved_hits
    ON knowledge_approved(hit_count DESC)`,
]

let schemaReady = false

export async function ensureSchema(db) {
  if (!db || schemaReady) return
  for (const sql of SCHEMA_STATEMENTS) {
    try {
      await db.prepare(sql).run()
    } catch {
      // ALTER may fail if column already exists — ignore
    }
  }
  schemaReady = true
}

function now() {
  return Date.now()
}

export async function upsertConversation(db, { id, pageUrl, pageTitle, intent, leadSubmitted }) {
  if (!db || !id) return
  await ensureSchema(db)
  const ts = now()
  const existing = await db.prepare('SELECT id FROM conversations WHERE id = ?').bind(id).first()
  if (existing) {
    await db
      .prepare(
        `UPDATE conversations SET
          updated_at = ?,
          page_url = COALESCE(?, page_url),
          page_title = COALESCE(?, page_title),
          intent = COALESCE(?, intent),
          lead_submitted = CASE WHEN ? = 1 THEN 1 ELSE lead_submitted END
        WHERE id = ?`,
      )
      .bind(ts, pageUrl || null, pageTitle || null, intent || null, leadSubmitted ? 1 : 0, id)
      .run()
    return
  }
  await db
    .prepare(
      `INSERT INTO conversations (id, started_at, updated_at, page_url, page_title, intent, lead_submitted, distilled)
       VALUES (?, ?, ?, ?, ?, ?, ?, 0)`,
    )
    .bind(id, ts, ts, pageUrl || null, pageTitle || null, intent || null, leadSubmitted ? 1 : 0)
    .run()
}

/**
 * Append only the newest user + assistant turn (avoids duplicating full history).
 */
export async function logTurn(db, conversationId, userContent, assistantContent) {
  if (!db || !conversationId) return
  await ensureSchema(db)
  const ts = now()
  if (userContent) {
    await db
      .prepare('INSERT INTO messages (conversation_id, role, content, created_at) VALUES (?, ?, ?, ?)')
      .bind(conversationId, 'user', userContent, ts)
      .run()
  }
  if (assistantContent) {
    await db
      .prepare('INSERT INTO messages (conversation_id, role, content, created_at) VALUES (?, ?, ?, ?)')
      .bind(conversationId, 'assistant', assistantContent, ts + 1)
      .run()
  }
  await db.prepare('UPDATE conversations SET updated_at = ? WHERE id = ?').bind(ts, conversationId).run()
}

export async function getConversationMessages(db, conversationId, limit = 40) {
  if (!db || !conversationId) return []
  await ensureSchema(db)
  const { results } = await db
    .prepare(
      `SELECT role, content FROM messages
       WHERE conversation_id = ?
       ORDER BY created_at ASC
       LIMIT ?`,
    )
    .bind(conversationId, limit)
    .all()
  return results || []
}

export async function getApprovedKnowledge(db, limit = 20) {
  if (!db) return []
  await ensureSchema(db)
  const { results } = await db
    .prepare(
      `SELECT question, answer, hit_count FROM knowledge_approved
       ORDER BY hit_count DESC, updated_at DESC
       LIMIT ?`,
    )
    .bind(limit)
    .all()
  return results || []
}

const RISK_PATTERNS = [
  /\d+\s*%/,
  /\d+\s*x\b/i,
  /\$\s*\d/,
  /\b\d{2,}\s*(weeks?|months?|days?)\b/i,
  /\b(client|customer)\s+[A-Z][a-z]+/,
  /\bguarantee/i,
  /\bwe always\b/i,
]

const SAFE_QUESTION_HINTS = [
  'service',
  'services',
  'saas',
  'website',
  'mobile',
  'ai',
  'process',
  'engagement',
  'contact',
  'book',
  'consultation',
  'what does mernify',
  'how do you',
  'portfolio',
  'case study',
]

export function isLowRiskCandidate(question, answer) {
  const q = String(question || '').toLowerCase()
  const a = String(answer || '')
  if (!q || !a || a.length < 40 || a.length > 900) return false
  if (RISK_PATTERNS.some((re) => re.test(a))) return false
  return SAFE_QUESTION_HINTS.some((h) => q.includes(h))
}

export async function insertKnowledgeCandidates(db, conversationId, pairs) {
  if (!db || !Array.isArray(pairs) || pairs.length === 0) return []
  await ensureSchema(db)
  const ts = now()
  const inserted = []

  for (const pair of pairs.slice(0, 2)) {
    const question = String(pair.question || '').trim().slice(0, 400)
    const answer = String(pair.answer || pair.answer_draft || '').trim().slice(0, 2000)
    if (!question || !answer) continue

    const existing = await db
      .prepare(
        `SELECT id, hit_count, status FROM knowledge_candidates
         WHERE lower(question) = lower(?) LIMIT 1`,
      )
      .bind(question)
      .first()

    if (existing) {
      await db
        .prepare('UPDATE knowledge_candidates SET hit_count = hit_count + 1, updated_at = ? WHERE id = ?')
        .bind(ts, existing.id)
        .run()
      inserted.push({ id: existing.id, status: existing.status, question, answer })
      continue
    }

    const status = isLowRiskCandidate(question, answer) ? 'approved' : 'pending'
    const result = await db
      .prepare(
        `INSERT INTO knowledge_candidates
          (question, answer_draft, source_conversation_id, status, hit_count, created_at, updated_at)
         VALUES (?, ?, ?, ?, 1, ?, ?)`,
      )
      .bind(question, answer, conversationId || null, status, ts, ts)
      .run()

    const candidateId = result.meta?.last_row_id
    if (status === 'approved' && candidateId) {
      await promoteCandidate(db, candidateId)
    }
    inserted.push({ id: candidateId, status, question, answer })
  }
  return inserted
}

export async function promoteCandidate(db, candidateId) {
  if (!db || !candidateId) return null
  await ensureSchema(db)
  const row = await db
    .prepare('SELECT id, question, answer_draft FROM knowledge_candidates WHERE id = ?')
    .bind(candidateId)
    .first()
  if (!row) return null

  const ts = now()
  const existing = await db
    .prepare('SELECT id FROM knowledge_approved WHERE lower(question) = lower(?) LIMIT 1')
    .bind(row.question)
    .first()

  if (existing) {
    await db
      .prepare(
        `UPDATE knowledge_approved SET answer = ?, hit_count = hit_count + 1, updated_at = ?, source_candidate_id = ?
         WHERE id = ?`,
      )
      .bind(row.answer_draft, ts, row.id, existing.id)
      .run()
  } else {
    await db
      .prepare(
        `INSERT INTO knowledge_approved (question, answer, hit_count, source_candidate_id, created_at, updated_at)
         VALUES (?, ?, 1, ?, ?, ?)`,
      )
      .bind(row.question, row.answer_draft, row.id, ts, ts)
      .run()
  }

  await db
    .prepare(`UPDATE knowledge_candidates SET status = 'approved', updated_at = ? WHERE id = ?`)
    .bind(ts, candidateId)
    .run()

  return row
}

export async function rejectCandidate(db, candidateId) {
  if (!db || !candidateId) return false
  await ensureSchema(db)
  const ts = now()
  await db
    .prepare(`UPDATE knowledge_candidates SET status = 'rejected', updated_at = ? WHERE id = ?`)
    .bind(ts, candidateId)
    .run()
  return true
}

export async function listKnowledgeCandidates(db, status = 'pending', limit = 50) {
  if (!db) return []
  await ensureSchema(db)
  const { results } = await db
    .prepare(
      `SELECT id, question, answer_draft, source_conversation_id, status, hit_count, created_at, updated_at
       FROM knowledge_candidates
       WHERE status = ?
       ORDER BY hit_count DESC, created_at DESC
       LIMIT ?`,
    )
    .bind(status, limit)
    .all()
  return results || []
}

export async function markDistilled(db, conversationId) {
  if (!db || !conversationId) return
  await ensureSchema(db)
  await db
    .prepare('UPDATE conversations SET distilled = 1, updated_at = ? WHERE id = ?')
    .bind(now(), conversationId)
    .run()
}

export async function isDistilled(db, conversationId) {
  if (!db || !conversationId) return true
  await ensureSchema(db)
  const row = await db
    .prepare('SELECT distilled FROM conversations WHERE id = ?')
    .bind(conversationId)
    .first()
  return Boolean(row?.distilled)
}

export function formatLearnedFaq(entries) {
  if (!entries?.length) return ''
  const lines = entries.map(
    (e, i) => `### Learned Q${i + 1}\nQ: ${e.question}\nA: ${e.answer}`,
  )
  return `\n\n## Learned FAQ (from prior approved conversations)\nUse these only when relevant. Prefer static Knowledge Base if there is any conflict. Never invent metrics or client names.\n\n${lines.join('\n\n')}`
}

const EMPTY_MEMORY = {
  projectType: null,
  businessProblem: null,
  targetUsers: null,
  features: null,
  techStack: null,
  timeline: null,
  budget: null,
  intent: null,
  recommendedService: null,
  company: null,
}

export async function getConversationMemory(db, conversationId) {
  if (!db || !conversationId) return { ...EMPTY_MEMORY }
  await ensureSchema(db)
  const row = await db
    .prepare('SELECT memory_json, intent FROM conversations WHERE id = ?')
    .bind(conversationId)
    .first()
  if (!row?.memory_json) {
    return { ...EMPTY_MEMORY, intent: row?.intent || null }
  }
  try {
    const parsed = JSON.parse(row.memory_json)
    return { ...EMPTY_MEMORY, ...parsed, intent: parsed.intent || row.intent || null }
  } catch {
    return { ...EMPTY_MEMORY, intent: row?.intent || null }
  }
}

export async function saveConversationMemory(db, conversationId, memory) {
  if (!db || !conversationId || !memory) return
  await ensureSchema(db)
  const ts = now()
  const merged = { ...EMPTY_MEMORY, ...memory }
  const json = JSON.stringify(merged)
  const existing = await db.prepare('SELECT id FROM conversations WHERE id = ?').bind(conversationId).first()
  if (existing) {
    await db
      .prepare(
        `UPDATE conversations SET memory_json = ?, intent = COALESCE(?, intent), updated_at = ? WHERE id = ?`,
      )
      .bind(json, merged.intent || null, ts, conversationId)
      .run()
    return
  }
  await db
    .prepare(
      `INSERT INTO conversations (id, started_at, updated_at, intent, lead_submitted, distilled, memory_json)
       VALUES (?, ?, ?, ?, 0, 0, ?)`,
    )
    .bind(conversationId, ts, ts, merged.intent || null, json)
    .run()
}

export function mergeMemory(existing, updates) {
  const base = { ...EMPTY_MEMORY, ...(existing || {}) }
  if (!updates || typeof updates !== 'object') return base
  for (const key of Object.keys(EMPTY_MEMORY)) {
    const next = updates[key]
    if (next === undefined || next === null) continue
    const text = String(next).trim()
    if (!text || text.toLowerCase() === 'null' || text.toLowerCase() === 'unknown') continue
    base[key] = text.slice(0, 400)
  }
  return base
}

export function formatMemoryBlock(memory) {
  if (!memory) return 'No project details captured yet.'
  const lines = []
  const map = [
    ['projectType', 'Project type'],
    ['businessProblem', 'Business problem'],
    ['targetUsers', 'Target users'],
    ['features', 'Core features'],
    ['techStack', 'Existing tech'],
    ['timeline', 'Timeline'],
    ['budget', 'Budget'],
    ['intent', 'Intent'],
    ['recommendedService', 'Recommended service'],
    ['company', 'Company'],
  ]
  for (const [key, label] of map) {
    if (memory[key]) lines.push(`- ${label}: ${memory[key]}`)
  }
  return lines.length ? lines.join('\n') : 'No project details captured yet.'
}
