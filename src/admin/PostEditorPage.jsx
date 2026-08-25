import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import * as api from '@/admin/adminApi'
import { SectionBuilder } from '@/admin/SectionBuilder'
import { blogCategories } from '@/content/blog'

const CATEGORY_OPTIONS = blogCategories.filter((c) => c !== 'All')

function emptyPost() {
  return {
    slug: '',
    title: '',
    excerpt: '',
    category: CATEGORY_OPTIONS[0] || 'AI',
    author: { name: '', role: '' },
    publishedAt: '',
    updatedAt: '',
    readingMinutes: '',
    featured: false,
    image: '',
    imageAlt: '',
    tags: [],
    sections: [{ type: 'p', text: '' }],
    faq: [],
    seoTitle: '',
    seoDescription: '',
    seoOgImage: '',
    status: 'draft',
  }
}

function toPayload(form) {
  const tags =
    typeof form.tags === 'string'
      ? form.tags
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean)
      : form.tags || []

  return {
    slug: form.slug.trim(),
    title: form.title.trim(),
    excerpt: form.excerpt.trim(),
    category: form.category,
    author: {
      name: form.author?.name?.trim() || '',
      role: form.author?.role?.trim() || '',
    },
    publishedAt: form.publishedAt || null,
    updatedAt: form.updatedAt || null,
    readingMinutes: form.readingMinutes ? Number(form.readingMinutes) : null,
    featured: Boolean(form.featured),
    image: form.image.trim(),
    imageAlt: form.imageAlt.trim(),
    tags,
    sections: form.sections || [],
    faq: (form.faq || []).filter((f) => f.question?.trim() || f.answer?.trim()),
    seoTitle: form.seoTitle?.trim() || null,
    seoDescription: form.seoDescription?.trim() || null,
    seoOgImage: form.seoOgImage?.trim() || null,
  }
}

function fromApi(post) {
  if (!post) return emptyPost()
  return {
    ...emptyPost(),
    ...post,
    author: post.author || { name: '', role: '' },
    tags: Array.isArray(post.tags) ? post.tags : [],
    sections: post.sections?.length ? post.sections : [{ type: 'p', text: '' }],
    faq: post.faq || [],
    readingMinutes: post.readingMinutes ?? '',
    seoTitle: post.seoTitle || '',
    seoDescription: post.seoDescription || '',
    seoOgImage: post.seoOgImage || '',
  }
}

function statusClass(status) {
  const s = String(status || 'draft').toLowerCase()
  if (s === 'published') return 'admin-badge admin-badge--published'
  if (s === 'archived') return 'admin-badge admin-badge--archived'
  return 'admin-badge admin-badge--draft'
}

export function PostEditorPage() {
  const { id } = useParams()
  const isNew = !id || id === 'new'
  const navigate = useNavigate()
  const [form, setForm] = useState(emptyPost)
  const [postId, setPostId] = useState(isNew ? null : id)
  const [categories, setCategories] = useState(CATEGORY_OPTIONS)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [busy, setBusy] = useState(false)
  const [loading, setLoading] = useState(!isNew)

  const tagsText = useMemo(
    () => (Array.isArray(form.tags) ? form.tags.join(', ') : String(form.tags || '')),
    [form.tags],
  )

  useEffect(() => {
    api
      .listCategories()
      .then((list) => {
        const names = list.map((c) => c.name).filter(Boolean)
        if (names.length) setCategories(names)
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    if (isNew) return undefined
    let cancelled = false
    setLoading(true)
    api
      .getPost(id)
      .then((post) => {
        if (cancelled) return
        setForm(fromApi(post))
        setPostId(post.id || id)
      })
      .catch((err) => {
        if (!cancelled) setError(err?.body?.error || err.message || 'Failed to load post')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [id, isNew])

  const setField = (key, value) => setForm((f) => ({ ...f, [key]: value }))
  const setAuthor = (key, value) =>
    setForm((f) => ({ ...f, author: { ...f.author, [key]: value } }))

  const run = async (fn, okMsg) => {
    setBusy(true)
    setError('')
    setMessage('')
    try {
      const result = await fn()
      if (okMsg) setMessage(okMsg)
      return result
    } catch (err) {
      setError(err?.body?.error || err.message || 'Request failed')
      return null
    } finally {
      setBusy(false)
    }
  }

  const saveDraft = () =>
    run(async () => {
      const payload = { ...toPayload(form), status: 'draft' }
      if (postId) {
        const updated = await api.updatePost(postId, payload)
        setForm(fromApi(updated))
        return updated
      }
      const created = await api.createPost(payload)
      setPostId(created.id)
      setForm(fromApi(created))
      navigate(`/edit/${created.id}`, { replace: true })
      return created
    }, 'Draft saved.')

  const publish = () =>
    run(async () => {
      let currentId = postId
      if (!currentId) {
        const created = await api.createPost({ ...toPayload(form), status: 'draft' })
        currentId = created.id
        setPostId(currentId)
      } else {
        await api.updatePost(currentId, toPayload(form))
      }
      const published = await api.publishPost(currentId)
      setForm(fromApi(published))
      if (isNew) navigate(`/edit/${currentId}`, { replace: true })
      return published
    }, 'Published.')

  const unpublish = () =>
    run(async () => {
      if (!postId) throw new Error('Save the post first')
      const next = await api.unpublishPost(postId)
      setForm(fromApi(next))
      return next
    }, 'Unpublished (draft).')

  const archive = () =>
    run(async () => {
      if (!postId) throw new Error('Save the post first')
      const next = await api.archivePost(postId)
      setForm(fromApi(next))
      return next
    }, 'Archived.')

  const remove = async () => {
    if (!postId) return
    if (!window.confirm('Permanently delete this post?')) return
    const ok = await run(async () => {
      await api.deletePost(postId)
      return true
    }, 'Deleted.')
    if (ok) navigate('/')
  }

  const preview = () =>
    run(async () => {
      if (!postId) throw new Error('Save the post before preview')
      await api.updatePost(postId, toPayload(form))
      const tokenRes = await api.createPreviewToken(postId)
      const token = tokenRes?.token || tokenRes?.previewToken
      if (!token) throw new Error('Preview token missing from API response')
      const slug = form.slug || tokenRes?.slug
      const url = `/blog/${encodeURIComponent(slug)}?preview=1&token=${encodeURIComponent(token)}`
      window.open(url, '_blank', 'noopener,noreferrer')
      return tokenRes
    }, 'Preview opened.')

  const onUpload = async (event) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return
    await run(async () => {
      const result = await api.uploadFeaturedImage(file, {
        slug: form.slug,
        alt: form.imageAlt,
      })
      const url = result?.url || result?.publicUrl || result?.image
      if (!url) throw new Error('Upload response missing url')
      setForm((f) => ({
        ...f,
        image: url,
        imageAlt: result.alt || f.imageAlt,
        imageSrcSet: result.imageSrcSet || f.imageSrcSet,
      }))
      return result
    }, 'Image uploaded.')
  }

  if (loading) {
    return (
      <div className="admin-page">
        <div className="admin-panel admin-panel--loading">
          <p className="admin-muted" style={{ margin: 0 }}>
            Loading post…
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-page admin-page--editor">
      <div className="admin-page-header">
        <div>
          <p className="admin-eyebrow">{isNew ? 'Create' : 'Edit'}</p>
          <h1 className="admin-page-title">{isNew ? 'New post' : 'Edit post'}</h1>
          <p className="admin-page-meta">
            <span className={statusClass(form.status)}>{form.status || 'draft'}</span>
            {postId ? <span className="admin-muted">ID {postId}</span> : null}
          </p>
        </div>
        <Link className="admin-back-link" to="/">
          ← Back to list
        </Link>
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

      <div className="admin-sticky-bar">
        <div className="admin-actions">
          <button type="button" className="admin-btn admin-btn-primary" disabled={busy} onClick={saveDraft}>
            Save draft
          </button>
          <button type="button" className="admin-btn admin-btn-secondary" disabled={busy} onClick={publish}>
            Publish
          </button>
          <button type="button" className="admin-btn admin-btn-ghost" disabled={busy || !postId} onClick={unpublish}>
            Unpublish
          </button>
          <button type="button" className="admin-btn admin-btn-ghost" disabled={busy || !postId} onClick={archive}>
            Archive
          </button>
          <button type="button" className="admin-btn admin-btn-ghost" disabled={busy || !postId} onClick={preview}>
            Preview
          </button>
          <button
            type="button"
            className="admin-btn admin-btn-danger"
            disabled={busy || !postId}
            onClick={remove}
          >
            Delete
          </button>
        </div>
      </div>

      <div className="admin-panel">
        <div className="admin-panel-head">
          <h2 className="admin-panel-title">Basics</h2>
        </div>

        <div className="admin-row">
          <div className="admin-field">
            <label htmlFor="admin-post-title">Title</label>
            <input id="admin-post-title" value={form.title} onChange={(e) => setField('title', e.target.value)} />
          </div>
          <div className="admin-field">
            <label htmlFor="admin-post-slug">Slug</label>
            <input id="admin-post-slug" value={form.slug} onChange={(e) => setField('slug', e.target.value)} />
          </div>
        </div>

        <div className="admin-field" style={{ marginBottom: '0.85rem' }}>
          <label htmlFor="admin-post-excerpt">Excerpt</label>
          <textarea
            id="admin-post-excerpt"
            value={form.excerpt}
            onChange={(e) => setField('excerpt', e.target.value)}
          />
        </div>

        <div className="admin-row">
          <div className="admin-field">
            <label htmlFor="admin-post-category">Category</label>
            <select
              id="admin-post-category"
              value={form.category}
              onChange={(e) => setField('category', e.target.value)}
            >
              {categories.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
          <div className="admin-field">
            <label htmlFor="admin-post-author">Author name</label>
            <input
              id="admin-post-author"
              value={form.author.name}
              onChange={(e) => setAuthor('name', e.target.value)}
            />
          </div>
          <div className="admin-field">
            <label htmlFor="admin-post-role">Author role</label>
            <input
              id="admin-post-role"
              value={form.author.role}
              onChange={(e) => setAuthor('role', e.target.value)}
            />
          </div>
        </div>

        <div className="admin-row">
          <div className="admin-field">
            <label htmlFor="admin-post-tags">Tags (comma-separated)</label>
            <input id="admin-post-tags" value={tagsText} onChange={(e) => setField('tags', e.target.value)} />
          </div>
          <div className="admin-field" style={{ flex: '0 1 140px' }}>
            <label htmlFor="admin-post-minutes">Reading minutes</label>
            <input
              id="admin-post-minutes"
              type="number"
              min="1"
              value={form.readingMinutes}
              onChange={(e) => setField('readingMinutes', e.target.value)}
            />
          </div>
          <label className="admin-check" style={{ alignSelf: 'flex-end', marginBottom: '0.35rem' }}>
            <input
              type="checkbox"
              checked={Boolean(form.featured)}
              onChange={(e) => setField('featured', e.target.checked)}
            />
            Featured
          </label>
        </div>
      </div>

      <div className="admin-panel">
        <div className="admin-panel-head">
          <h2 className="admin-panel-title">Media</h2>
        </div>
        <div className="admin-row">
          <div className="admin-field">
            <label htmlFor="admin-post-image">Featured image URL</label>
            <input id="admin-post-image" value={form.image} onChange={(e) => setField('image', e.target.value)} />
          </div>
          <div className="admin-field">
            <label htmlFor="admin-post-alt">Image alt</label>
            <input
              id="admin-post-alt"
              value={form.imageAlt}
              onChange={(e) => setField('imageAlt', e.target.value)}
            />
          </div>
          <div className="admin-field" style={{ flex: '0 1 220px' }}>
            <label htmlFor="admin-post-upload">Upload featured image</label>
            <input
              id="admin-post-upload"
              type="file"
              accept="image/webp,image/jpeg,image/png"
              onChange={onUpload}
              disabled={busy}
            />
          </div>
        </div>
      </div>

      <div className="admin-panel">
        <div className="admin-panel-head">
          <h2 className="admin-panel-title">SEO</h2>
        </div>
        <div className="admin-row">
          <div className="admin-field">
            <label htmlFor="admin-post-seo-title">SEO title</label>
            <input
              id="admin-post-seo-title"
              value={form.seoTitle}
              onChange={(e) => setField('seoTitle', e.target.value)}
            />
          </div>
          <div className="admin-field">
            <label htmlFor="admin-post-seo-desc">SEO description</label>
            <input
              id="admin-post-seo-desc"
              value={form.seoDescription}
              onChange={(e) => setField('seoDescription', e.target.value)}
            />
          </div>
          <div className="admin-field">
            <label htmlFor="admin-post-seo-og">SEO OG image URL</label>
            <input
              id="admin-post-seo-og"
              value={form.seoOgImage}
              onChange={(e) => setField('seoOgImage', e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="admin-panel">
        <SectionBuilder sections={form.sections} onChange={(sections) => setField('sections', sections)} />
      </div>

      <div className="admin-panel admin-faq">
        <div className="admin-panel-head">
          <h2 className="admin-panel-title">FAQ</h2>
          <button
            type="button"
            className="admin-btn admin-btn-secondary"
            onClick={() => setField('faq', [...(form.faq || []), { question: '', answer: '' }])}
          >
            Add FAQ
          </button>
        </div>
        {(form.faq || []).map((item, index) => (
          <div key={index} className="admin-section">
            <div className="admin-field">
              <label htmlFor={`admin-faq-q-${index}`}>Question</label>
              <input
                id={`admin-faq-q-${index}`}
                value={item.question || ''}
                onChange={(e) => {
                  const faq = [...form.faq]
                  faq[index] = { ...faq[index], question: e.target.value }
                  setField('faq', faq)
                }}
              />
            </div>
            <div className="admin-field">
              <label htmlFor={`admin-faq-a-${index}`}>Answer</label>
              <textarea
                id={`admin-faq-a-${index}`}
                value={item.answer || ''}
                onChange={(e) => {
                  const faq = [...form.faq]
                  faq[index] = { ...faq[index], answer: e.target.value }
                  setField('faq', faq)
                }}
              />
            </div>
            <button
              type="button"
              className="admin-btn admin-btn-danger admin-btn-sm"
              onClick={() => setField('faq', form.faq.filter((_, i) => i !== index))}
            >
              Remove FAQ
            </button>
          </div>
        ))}
        {(form.faq || []).length === 0 ? (
          <p className="admin-muted" style={{ margin: 0 }}>
            No FAQ items yet.
          </p>
        ) : null}
      </div>
    </div>
  )
}
