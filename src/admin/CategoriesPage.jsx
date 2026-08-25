import { useEffect, useState } from 'react'
import * as api from '@/admin/adminApi'

function emptyCategory() {
  return { name: '', slug: '', sortOrder: 0 }
}

export function CategoriesPage() {
  const [categories, setCategories] = useState([])
  const [form, setForm] = useState(emptyCategory())
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    setError('')
    try {
      setCategories(await api.listCategories())
    } catch (err) {
      setError(err?.body?.error || err.message || 'Failed to load categories')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const create = async (event) => {
    event.preventDefault()
    setError('')
    setMessage('')
    try {
      await api.createCategory({
        name: form.name.trim(),
        slug: form.slug.trim() || undefined,
        sortOrder: Number(form.sortOrder) || 0,
      })
      setForm(emptyCategory())
      setMessage('Category created.')
      await load()
    } catch (err) {
      setError(err?.body?.error || err.message || 'Create failed')
    }
  }

  const remove = async (id) => {
    if (!window.confirm('Delete this category?')) return
    setError('')
    try {
      await api.deleteCategory(id)
      await load()
    } catch (err) {
      setError(err?.body?.error || err.message || 'Delete failed')
    }
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <p className="admin-eyebrow">Taxonomy</p>
          <h1 className="admin-page-title">Categories</h1>
        </div>
      </div>

      {error ? (
        <div className="admin-error" role="alert">
          {error}
        </div>
      ) : null}
      {message ? (
        <div className="admin-ok" role="status">
          {message}
        </div>
      ) : null}

      <form className="admin-panel" onSubmit={create}>
        <div className="admin-panel-head">
          <h2 className="admin-panel-title">Add category</h2>
        </div>
        <div className="admin-row">
          <div className="admin-field">
            <label htmlFor="admin-cat-name">Name</label>
            <input
              id="admin-cat-name"
              required
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            />
          </div>
          <div className="admin-field">
            <label htmlFor="admin-cat-slug">Slug (optional)</label>
            <input
              id="admin-cat-slug"
              value={form.slug}
              onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
            />
          </div>
          <div className="admin-field" style={{ flex: '0 1 120px' }}>
            <label htmlFor="admin-cat-sort">Sort</label>
            <input
              id="admin-cat-sort"
              type="number"
              value={form.sortOrder}
              onChange={(e) => setForm((f) => ({ ...f, sortOrder: e.target.value }))}
            />
          </div>
          <div className="admin-actions" style={{ alignSelf: 'flex-end' }}>
            <button type="submit" className="admin-btn admin-btn-primary">
              Add
            </button>
          </div>
        </div>
      </form>

      <div className="admin-panel admin-panel--table">
        <div className="admin-panel-head">
          <h2 className="admin-panel-title">All categories</h2>
          {loading ? <span className="admin-muted">Loading…</span> : null}
        </div>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Slug</th>
                <th>Sort</th>
                <th>
                  <span className="admin-sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat.id || cat.slug}>
                  <td className="admin-table-title">{cat.name}</td>
                  <td className="admin-muted">{cat.slug}</td>
                  <td>{cat.sortOrder ?? cat.sort_order ?? '—'}</td>
                  <td>
                    <button
                      type="button"
                      className="admin-btn admin-btn-danger admin-btn-sm"
                      onClick={() => remove(cat.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {!loading && categories.length === 0 ? (
                <tr>
                  <td colSpan={4} className="admin-empty">
                    No categories yet.
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
