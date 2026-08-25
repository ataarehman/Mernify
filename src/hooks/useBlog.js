import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  getBlogPostBySlug,
  getBlogPosts,
  loadBlogPostBySlug,
  loadBlogPostPreview,
  loadBlogPosts,
} from '@/content/blog'

/**
 * Sync static paint first, then refresh from API (static fallback on failure).
 * @returns {{ posts: object[], loading: boolean, error: Error|null }}
 */
export function useBlogPosts() {
  const [posts, setPosts] = useState(() => getBlogPosts())
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    loadBlogPosts()
      .then((next) => {
        if (!cancelled) {
          setPosts(next)
          setError(null)
        }
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err : new Error(String(err)))
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  return { posts, loading, error }
}

/**
 * Sync static post first (when not previewing), then API refresh / preview fetch.
 * New CMS-only posts are not in static data — wait for API before treating as 404.
 * @param {string|undefined} slug
 */
export function useBlogPost(slug) {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token') || ''
  const isPreview =
    Boolean(token) || searchParams.get('preview') === '1' || searchParams.get('preview') === 'true'

  const staticPost = token ? null : getBlogPostBySlug(slug)
  const [post, setPost] = useState(() => staticPost)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  // Existing static posts can paint immediately; API-only / preview wait for fetch.
  const [ready, setReady] = useState(() => Boolean(staticPost))

  useEffect(() => {
    let cancelled = false
    if (!slug) {
      setPost(null)
      setReady(true)
      setLoading(false)
      return undefined
    }

    setLoading(true)
    if (!token) {
      const sync = getBlogPostBySlug(slug)
      setPost(sync)
      if (sync) setReady(true)
    } else {
      setPost(null)
      setReady(false)
    }

    const run = token
      ? loadBlogPostPreview(slug, token)
      : loadBlogPostBySlug(slug)

    run
      .then((next) => {
        if (cancelled) return
        setPost(next)
        setError(null)
        setReady(true)
      })
      .catch((err) => {
        if (cancelled) return
        setError(err instanceof Error ? err : new Error(String(err)))
        if (token) setPost(null)
        // Keep sync static post on API failure; clear only when we never had one
        if (!getBlogPostBySlug(slug)) setPost(null)
        setReady(true)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [slug, token])

  return { post, loading, error, ready, isPreview, token }
}
