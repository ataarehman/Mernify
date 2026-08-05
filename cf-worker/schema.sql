-- Mernify AI — conversation logging + learned knowledge (D1)

CREATE TABLE IF NOT EXISTS conversations (
  id TEXT PRIMARY KEY,
  started_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  page_url TEXT,
  page_title TEXT,
  intent TEXT,
  lead_submitted INTEGER NOT NULL DEFAULT 0,
  distilled INTEGER NOT NULL DEFAULT 0,
  memory_json TEXT
);

CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  conversation_id TEXT NOT NULL,
  role TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  FOREIGN KEY (conversation_id) REFERENCES conversations(id)
);

CREATE INDEX IF NOT EXISTS idx_messages_conversation
  ON messages(conversation_id, created_at);

CREATE TABLE IF NOT EXISTS knowledge_candidates (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  question TEXT NOT NULL,
  answer_draft TEXT NOT NULL,
  source_conversation_id TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  hit_count INTEGER NOT NULL DEFAULT 1,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_knowledge_candidates_status
  ON knowledge_candidates(status, hit_count DESC);

CREATE TABLE IF NOT EXISTS knowledge_approved (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  hit_count INTEGER NOT NULL DEFAULT 1,
  source_candidate_id INTEGER,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_knowledge_approved_hits
  ON knowledge_approved(hit_count DESC);
