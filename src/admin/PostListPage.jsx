import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import * as api from '@/admin/adminApi'

function statusClass(status) {
  const s = String(status || '').toLowerCase()
  if (s === 'published') return 'admin-badge admin-badge--published'
  if (s === 'archived') return 'admin-badge admin-badge--archived'
  if (s === 'draft') return 'admin-badge admin-badge--draft'
  return 'admin-badge'
}

export function PostListPage() {
  const [posts, setPosts] = useState([])
  const [status, setStatus] = useState('')
  const [q, setQ] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    setError('')
    try {
      const list = await api.listPosts({ status: status || undefined, q: q || undefined })
      setPosts(list)
    } catch (err) {
      setError(err?.body?.error || err.message || 'Failed to load posts')
      setPosts([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentional reload on filter apply via button
  }, [])

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <p className="admin-eyebrow">Content</p>
          <h1 className="admin-page-title">Posts</h1>
        </div>
        <Link className="admin-btn admin-btn-primary" to="/new">
          New post
        </Link>
      </div>

      <div className="admin-panel">
        <div className="admin-row">
          <div className="admin-field" style={{ flex: '0 1 160px' }}>
            <label htmlFor="admin-posts-status">Status</label>
            <select id="admin-posts-status" value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="">All</option>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>
          <div className="admin-field">
            <label htmlFor="admin-posts-search">Search</label>
            <input
              id="admin-posts-search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Title or slug"
              onKeyDown={(e) => {
                if (e.key === 'Enter') load()
              }}
            />
          </div>
          <div className="admin-actions" style={{ alignSelf: 'flex-end' }}>
            <button type="button" className="admin-btn admin-btn-secondary" onClick={load} disabled={loading}>
              {loading ? 'Loading…' : 'Filter'}
            </button>
          </div>
        </div>
      </div>

      {error ? (
        <div className="admin-error" role="alert">
          {error}
        </div>
      ) : null}

      <div className="admin-panel admin-panel--table">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Slug</th>
                <th>Status</th>
                <th>Category</th>
                <th>Published</th>
                <th>
                  <span className="admin-sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id || post.slug}>
                  <td className="admin-table-title">{post.title}</td>
                  <td className="admin-muted">{post.slug}</td>
                  <td>
                    <span className={statusClass(post.status)}>{post.status || '—'}</span>
                  </td>
                  <td>{post.category}</td>
                  <td className="admin-muted">{post.publishedAt || '—'}</td>
                  <td>
                    <Link className="admin-table-link" to={`/edit/${post.id}`}>
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
              {!loading && posts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="admin-empty">
                    No posts found. Create one or wait for the API.
                  </td>
                </tr>
              ) : null}
              {loading && posts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="admin-empty">
                    Loading posts…
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
