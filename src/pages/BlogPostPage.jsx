import { useEffect, useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight, Clock3, UserRound } from 'lucide-react'
import { BlogArticleBody } from '@/components/blog/BlogArticleBody'
import { BlogCard } from '@/components/blog/BlogCard'
import { BlogFaq } from '@/components/blog/BlogFaq'
import { BlogShare } from '@/components/blog/BlogShare'
import { PageCta } from '@/components/layout/PageCta'
import { JsonLd } from '@/components/seo/JsonLd'
import { PageMeta } from '@/components/seo/PageMeta'
import { Button, Container } from '@/components/ui'
import {
  formatBlogDate,
  getAdjacentPosts,
  getBlogPostBySlug,
  getPostToc,
  getRelatedPosts,
} from '@/content/blog'
import { blogPostingSchema, breadcrumbSchema, faqPageSchema } from '@/lib/schema'
import styles from './BlogPostPage.module.css'

function authorInitials(name = '') {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || '')
    .join('')
}

export function BlogPostPage() {
  const { slug } = useParams()
  const post = getBlogPostBySlug(slug)
  const [activeId, setActiveId] = useState('')
  const [progress, setProgress] = useState(0)

  const toc = useMemo(() => (post ? getPostToc(post) : []), [post])
  const related = useMemo(() => (post ? getRelatedPosts(post, 3) : []), [post])
  const adjacent = useMemo(() => (post ? getAdjacentPosts(post.slug) : { previous: null, next: null }), [post])

  const crumbs = useMemo(() => {
    if (!post) return []
    return [
      { name: 'Home', path: '/' },
      { name: 'Blog', path: '/blog' },
      { name: post.title, path: `/blog/${post.slug}` },
    ]
  }, [post])

  const schemas = useMemo(() => {
    if (!post) return []
    const list = [blogPostingSchema(post), breadcrumbSchema(crumbs)]
    const faq = faqPageSchema(post.faq, `/blog/${post.slug}`)
    if (faq) list.push(faq)
    return list
  }, [post, crumbs])

  useEffect(() => {
    if (!post) return undefined

    const onScroll = () => {
      const article = document.getElementById('blog-article')
      if (!article) return
      const rect = article.getBoundingClientRect()
      const total = article.offsetHeight - window.innerHeight
      const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 1))
      setProgress(Math.round((scrolled / Math.max(total, 1)) * 100))

      let current = toc[0]?.id || ''
      for (const item of toc) {
        const el = document.getElementById(item.id)
        if (!el) continue
        if (el.getBoundingClientRect().top <= 140) current = item.id
      }
      setActiveId(current)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [post, toc])

  if (!post) {
    return <Navigate to="/blog" replace />
  }

  return (
    <article className={styles.page}>
      <PageMeta
        title={post.title}
        description={post.excerpt}
        canonicalPath={`/blog/${post.slug}`}
        image={post.image}
        type="article"
        publishedTime={post.publishedAt}
        modifiedTime={post.updatedAt || post.publishedAt}
        authorName={post.author.name}
      />
      {schemas.map((data, index) => (
        <JsonLd key={`blog-schema-${index}`} id={`mf-blog-jsonld-${index}`} data={data} />
      ))}

      <div className={styles.progress} aria-hidden="true">
        <span style={{ width: `${progress}%` }} />
      </div>

      <header className={styles.hero} data-header-theme="dark">
        <Container width="wide" className={styles.heroInner}>
          <nav className={styles.crumbs} aria-label="Breadcrumb">
            <ol>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/blog">Blog</Link>
              </li>
              <li aria-current="page">
                <span>{post.category}</span>
              </li>
            </ol>
          </nav>

          <Link to="/blog" className={styles.back}>
            <ArrowLeft size={16} aria-hidden="true" />
            Back to Blog
          </Link>

          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <span className={styles.category}>{post.category}</span>
              <h1 className={styles.title}>{post.title}</h1>
              <p className={styles.excerpt}>{post.excerpt}</p>

              <div className={styles.metaRow}>
                <div className={styles.authorChip}>
                  <span className={styles.avatar} aria-hidden="true">
                    {authorInitials(post.author.name)}
                  </span>
                  <div>
                    <p className={styles.authorName}>{post.author.name}</p>
                    <p className={styles.authorRole}>{post.author.role}</p>
                  </div>
                </div>
                <div className={styles.metaFacts}>
                  <time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt)}</time>
                  <span className={styles.dot} aria-hidden="true" />
                  <span className={styles.readTime}>
                    <Clock3 size={14} aria-hidden="true" />
                    {post.readingMinutes} min read
                  </span>
                </div>
              </div>
            </div>

            <figure className={styles.heroMedia}>
              <img
                src={post.image}
                srcSet={
                  post.imageSrcSet ||
                  (post.image.includes('-hero.webp')
                    ? `${post.image.replace('-hero.webp', '-hero-md.webp')} 1000w, ${post.image} 2400w`
                    : undefined)
                }
                sizes="(max-width: 959px) 100vw, (max-width: 1439px) 50vw, 720px"
                alt={post.imageAlt}
                width={2400}
                height={1500}
                decoding="async"
                fetchPriority="high"
              />
            </figure>
          </div>
        </Container>
      </header>

      <Container width="wide" className={styles.layout}>
        <aside className={styles.rail} aria-label="Article utilities">
          {toc.length ? (
            <nav className={styles.toc} aria-label="Table of contents">
              <p className={styles.tocLabel}>On this page</p>
              <ol>
                {toc.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className={activeId === item.id ? styles.tocActive : undefined}
                      onClick={(event) => {
                        event.preventDefault()
                        document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                        setActiveId(item.id)
                      }}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          ) : null}
          <BlogShare title={post.title} path={`/blog/${post.slug}`} />
        </aside>

        <div className={styles.main}>
          <div className={styles.mobileTools}>
            <BlogShare title={post.title} path={`/blog/${post.slug}`} />
          </div>

          <div className={styles.articleStack}>
            <div id="blog-article">
              <BlogArticleBody sections={post.sections} />

              <div className={styles.tags}>
                {post.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.articleExtras}>
            <BlogFaq items={post.faq} />

            <section className={styles.authorCard} aria-label="About the author">
              <div className={styles.authorCardAvatar} aria-hidden="true">
                {authorInitials(post.author.name) || <UserRound size={22} />}
              </div>
              <div>
                <p className={styles.authorCardEyebrow}>Written by</p>
                <p className={styles.authorCardName}>{post.author.name}</p>
                <p className={styles.authorCardRole}>{post.author.role}</p>
                <p className={styles.authorCardBio}>
                  Contributing to the Mernify insights series on product engineering, modern web
                  platforms, and practical delivery for growing teams.
                </p>
              </div>
            </section>

            <div className={styles.midCta}>
              <div>
                <p className={styles.midCtaEyebrow}>Next step</p>
                <p className={styles.midCtaTitle}>Building something related?</p>
                <p>Share the challenge — we will help turn it into a reliable product experience.</p>
              </div>
              <Button as={Link} to="/contact" size="md">
                Discuss your project
              </Button>
            </div>

            <nav className={styles.adjacent} aria-label="Adjacent articles">
              {adjacent.previous ? (
                <Link to={`/blog/${adjacent.previous.slug}`} className={styles.adjacentCard}>
                  <span>Previous</span>
                  <strong>{adjacent.previous.title}</strong>
                </Link>
              ) : (
                <span />
              )}
              {adjacent.next ? (
                <Link
                  to={`/blog/${adjacent.next.slug}`}
                  className={`${styles.adjacentCard} ${styles.adjacentNext}`}
                >
                  <span>Next</span>
                  <strong>{adjacent.next.title}</strong>
                </Link>
              ) : null}
            </nav>
          </div>
        </div>
      </Container>

      {related.length ? (
        <section className={styles.related} aria-labelledby="related-blogs-title">
          <Container width="wide">
            <div className={styles.relatedHead}>
              <h2 id="related-blogs-title">Related articles</h2>
              <Link to="/blog" className={styles.viewAll}>
                View all
                <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </div>
            <ul className={styles.relatedGrid} role="list">
              {related.map((item) => (
                <li key={item.slug}>
                  <BlogCard post={item} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}

      <PageCta
        animated
        title="Building something in this space? Share the challenge — we’ll help turn it into a reliable product."
        accentWords={['challenge', 'reliable', 'product']}
      />
    </article>
  )
}
