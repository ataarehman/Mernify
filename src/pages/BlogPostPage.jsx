import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { PageCta } from '@/components/layout/PageCta'
import { PageMeta } from '@/components/seo/PageMeta'
import { Container } from '@/components/ui'
import { formatBlogDate, getBlogPostBySlug, getLatestPosts } from '@/content/blog'
import { BlogCard } from '@/components/blog/BlogCard'
import styles from './BlogPostPage.module.css'

export function BlogPostPage() {
  const { slug } = useParams()
  const post = getBlogPostBySlug(slug)

  if (!post) {
    return <Navigate to="/blog" replace />
  }

  const related = getLatestPosts(4).filter((item) => item.slug !== post.slug).slice(0, 3)

  return (
    <article className={styles.page}>
      <PageMeta
        title={post.title}
        description={post.excerpt}
        canonicalPath={`/blog/${post.slug}`}
        image={post.image}
      />

      <header className={styles.hero} data-header-theme="dark">
        <Container width="wide" className={styles.heroInner}>
          <Link to="/blog" className={styles.back}>
            <ArrowLeft size={16} aria-hidden="true" />
            Back to Blog
          </Link>
          <span className={styles.category}>{post.category}</span>
          <h1 className={styles.title}>{post.title}</h1>
          <p className={styles.excerpt}>{post.excerpt}</p>
          <div className={styles.meta}>
            <span>{post.author.name}</span>
            <span className={styles.dot} aria-hidden="true" />
            <time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt)}</time>
            <span className={styles.dot} aria-hidden="true" />
            <span>{post.readingMinutes} min read</span>
          </div>
        </Container>
      </header>

      <div className={styles.mediaWrap}>
        <Container width="wide">
          <figure className={styles.media}>
            <img
              src={post.image}
              alt={post.imageAlt}
              width={1600}
              height={900}
              decoding="async"
              fetchPriority="high"
            />
          </figure>
        </Container>
      </div>

      <Container width="narrow" className={styles.content}>
        {post.body.map((paragraph) => (
          <p key={paragraph.slice(0, 48)}>{paragraph}</p>
        ))}
        <div className={styles.tags}>
          {post.tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
        <Link to="/contact" className={styles.ctaLink}>
          Discuss a related project
          <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
      </Container>

      {related.length ? (
        <section className={styles.related} aria-labelledby="related-blogs-title">
          <Container width="wide">
            <div className={styles.relatedHead}>
              <h2 id="related-blogs-title">More from the blog</h2>
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
