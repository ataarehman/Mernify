import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Container, Eyebrow } from '@/components/ui'
import { formatBlogDate, getLatestPosts } from '@/content/blog'
import { useReducedMotion } from '@/app/providers/useReducedMotion'
import styles from './HomeLatestBlogs.module.css'

gsap.registerPlugin(ScrollTrigger)

/** Home-only premium imagery — keeps /blog listing assets unchanged. */
const HOME_IMAGES = {
  'practical-ai-integration-for-saas-products': {
    src: '/assets/images/thumbs/home-blog-ai.webp',
    alt: 'Abstract AI neural network visualization in deep indigo light',
  },
  'mern-stack-architecture-for-growing-teams': {
    src: '/assets/images/thumbs/home-blog-mern.webp',
    alt: 'Engineer working on full-stack application code on a laptop',
  },
  'react-performance-checklist-for-enterprise-apps': {
    src: '/assets/images/thumbs/home-blog-react.webp',
    alt: 'Modern product interface on a smartphone with crisp UI detail',
  },
}

function resolveImage(post) {
  return HOME_IMAGES[post.slug] ?? { src: post.image, alt: post.imageAlt }
}

function PostMeta({ post }) {
  return (
    <div className={styles.meta}>
      <span className={styles.category}>{post.category}</span>
      <span className={styles.metaSep} aria-hidden="true" />
      <time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt)}</time>
      <span className={styles.metaSep} aria-hidden="true" />
      <span>{post.readingMinutes} min read</span>
    </div>
  )
}

export function HomeLatestBlogs() {
  const posts = getLatestPosts(3)
  const rootRef = useRef(null)
  const { prefersReducedMotion } = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion || !rootRef.current || !posts.length) return undefined

    const ctx = gsap.context(() => {
      gsap.fromTo(
        rootRef.current.querySelectorAll('[data-insight-fade]'),
        { autoAlpha: 0, y: 22 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.09,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top 78%',
            once: true,
          },
        },
      )
    }, rootRef)

    return () => ctx.revert()
  }, [prefersReducedMotion, posts.length])

  if (!posts.length) return null

  const [featured, ...rest] = posts

  return (
    <section
      ref={rootRef}
      className={styles.section}
      data-header-theme="light"
      aria-labelledby="home-latest-blogs-title"
    >
      <div className={styles.atmosphere} aria-hidden="true" />
      <Container width="wide" className={styles.inner}>
        <header className={styles.head} data-insight-fade>
          <div className={styles.copy}>
            <Eyebrow rule>From the blog</Eyebrow>
            <h2 id="home-latest-blogs-title" className={styles.title}>
              Latest insights
            </h2>
            <p className={styles.support}>
              Fresh notes on AI, product engineering, cloud, and the craft of shipping reliable
              software.
            </p>
          </div>
          <Link to="/blog" className={styles.viewAll}>
            <span>View all blogs</span>
            <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </header>

        <div className={styles.stage}>
          <article className={styles.card} data-insight-fade>
            <Link to={`/blog/${featured.slug}`} className={styles.cardLink}>
              <div className={`${styles.media} ${styles.mediaFeatured}`}>
                <img
                  src={resolveImage(featured).src}
                  alt={resolveImage(featured).alt}
                  width={1920}
                  height={1200}
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div className={styles.body}>
                <span className={styles.index} aria-hidden="true">
                  01
                </span>
                <PostMeta post={featured} />
                <h3 className={`${styles.cardTitle} ${styles.cardTitleFeatured}`}>
                  {featured.title}
                </h3>
                <p className={`${styles.excerpt} ${styles.excerptFeatured}`}>{featured.excerpt}</p>
                <div className={styles.footer}>
                  <div className={styles.author}>
                    <span className={styles.authorName}>{featured.author.name}</span>
                    <span className={styles.authorRole}>{featured.author.role}</span>
                  </div>
                  <span className={styles.readCue}>
                    Read article
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </span>
                </div>
              </div>
            </Link>
          </article>

          <ul className={styles.rail} role="list">
            {rest.map((post, i) => {
              const image = resolveImage(post)
              const n = String(i + 2).padStart(2, '0')
              return (
                <li key={post.slug} className={styles.railItem} data-insight-fade>
                  <article className={styles.card}>
                    <Link to={`/blog/${post.slug}`} className={styles.cardLink}>
                      <div className={`${styles.media} ${styles.mediaRail}`}>
                        <img
                          src={image.src}
                          alt={image.alt}
                          width={1600}
                          height={1000}
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                      <div className={styles.body}>
                        <span className={styles.index} aria-hidden="true">
                          {n}
                        </span>
                        <PostMeta post={post} />
                        <h3 className={styles.cardTitle}>{post.title}</h3>
                        <p className={styles.excerpt}>{post.excerpt}</p>
                        <div className={styles.footer}>
                          <div className={styles.author}>
                            <span className={styles.authorName}>{post.author.name}</span>
                            <span className={styles.authorRole}>{post.author.role}</span>
                          </div>
                          <span className={styles.readCue}>
                            Read
                            <ArrowUpRight size={15} aria-hidden="true" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </article>
                </li>
              )
            })}
          </ul>
        </div>
      </Container>
    </section>
  )
}
