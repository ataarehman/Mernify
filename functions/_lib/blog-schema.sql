-- Mernify blog content — D1 database `mernify-content` (binding: CONTENT_DB)
-- Do NOT apply to mernify-ai.

CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS posts (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  category TEXT NOT NULL,
  author_name TEXT NOT NULL,
  author_role TEXT NOT NULL,
  published_at TEXT,
  updated_at TEXT,
  reading_minutes INTEGER,
  featured INTEGER NOT NULL DEFAULT 0,
  image TEXT,
  image_alt TEXT,
  image_src_set TEXT,
  tags_json TEXT NOT NULL DEFAULT '[]',
  sections_json TEXT NOT NULL DEFAULT '[]',
  faq_json TEXT NOT NULL DEFAULT '[]',
  status TEXT NOT NULL CHECK (status IN ('draft', 'published', 'archived')),
  seo_title TEXT,
  seo_description TEXT,
  seo_og_image TEXT,
  created_at INTEGER NOT NULL,
  updated_at_ts INTEGER NOT NULL,
  published_by TEXT
);

CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_status_published
  ON posts(status, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_featured_published
  ON posts(featured)
  WHERE status = 'published' AND featured = 1;

CREATE TABLE IF NOT EXISTS preview_tokens (
  token_hash TEXT PRIMARY KEY,
  post_id TEXT NOT NULL,
  expires_at INTEGER NOT NULL,
  created_by TEXT,
  revoked INTEGER NOT NULL DEFAULT 0,
  FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_preview_tokens_post
  ON preview_tokens(post_id);

CREATE TABLE IF NOT EXISTS media (
  id TEXT PRIMARY KEY,
  r2_key TEXT NOT NULL,
  public_url TEXT NOT NULL,
  content_type TEXT,
  bytes INTEGER,
  alt TEXT,
  post_id TEXT,
  created_at INTEGER NOT NULL,
  FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_media_post ON media(post_id);
