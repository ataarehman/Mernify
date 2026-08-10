import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { formatBlogDate } from '@/content/blog'
import styles from './BlogCard.module.css'

export function BlogCard({ post, featured = false }) {
  return (
    <article className={[styles.card, featured ? styles.featured : ''].filter(Boolean).join(' ')}>
      <Link to={`/blog/${post.slug}`} className={styles.media} data-cursor="View">
        <img
          src={post.image}
          srcSet={post.imageSrcSet}
          sizes={featured ? '(max-width: 900px) 100vw, 60vw' : '(max-width: 900px) 100vw, 33vw'}
          alt={post.imageAlt}
          loading="lazy"
          decoding="async"
          width={2400}
          height={1500}
        />
        <span className={styles.mediaSheen} aria-hidden="true" />
      </Link>

      <div className={styles.body}>
        <div className={styles.meta}>
          <span className={styles.category}>{post.category}</span>
          <span className={styles.dot} aria-hidden="true" />
          <time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt)}</time>
          <span className={styles.dot} aria-hidden="true" />
          <span>{post.readingMinutes} min read</span>
        </div>

        <h3 className={styles.title}>
          <Link to={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>

        <p className={styles.excerpt}>{post.excerpt}</p>

        <div className={styles.footer}>
          <div className={styles.author}>
            <span className={styles.authorName}>{post.author.name}</span>
            <span className={styles.authorRole}>{post.author.role}</span>
          </div>
          <Link to={`/blog/${post.slug}`} className={styles.readMore}>
            Read More
            <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  )
}
