import { useMemo, useRef, useState } from 'react'
import { Search } from 'lucide-react'
import { PageCta } from '@/components/layout/PageCta'
import { PageHero } from '@/components/layout/PageHero'
import { PageMeta } from '@/components/seo/PageMeta'
import { Button, Container, Eyebrow } from '@/components/ui'
import { BlogCard } from '@/components/blog/BlogCard'
import {
  blogCategories,
  filterBlogPosts,
  getFeaturedPosts,
} from '@/content/blog'
import { useBlogPosts } from '@/hooks/useBlog'
import { useCharEntrance, splitChars } from '@/hooks/useCharEntrance'
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll'
import styles from './BlogPage.module.css'

const PAGE_SIZE = 6

function BlogHero() {
  const titleRef = useRef(null)
  useCharEntrance(titleRef, {
    start: 'top 90%',
    duration: 1,
    delay: 0.45,
    stagger: 0.05,
  })

  return (
    <PageHero
      className={styles.hero}
      title={
        <span ref={titleRef} className={styles.heroTitle}>
          {splitChars('Insights').map(({ key, char }) => (
            <span key={key} data-char className={styles.heroChar}>
              {char}
            </span>
          ))}
        </span>
      }
      support={
        <>
          Practical notes on product engineering, AI, cloud, and delivery — written for teams who
          ship <span className={styles.accent}>real software</span>
        </>
      }
    />
  )
}

export function BlogPage() {
  const rootRef = useRef(null)
  const [category, setCategory] = useState('All')
  const [query, setQuery] = useState('')
  const [visible, setVisible] = useState(PAGE_SIZE)
  const { posts } = useBlogPosts()

  const featured = useMemo(() => getFeaturedPosts(1, posts)[0], [posts])
  const filtered = useMemo(
    () => filterBlogPosts({ category, query, posts }),
    [category, query, posts],
  )

  const list = useMemo(() => {
    if (!featured) return filtered
    return filtered.filter((post) => post.slug !== featured.slug)
  }, [filtered, featured])

  const shown = list.slice(0, visible)
  const canLoadMore = visible < list.length

  useRevealOnScroll(rootRef, {
    selector: '[data-fade-up]',
    start: 'top 88%',
    duration: 0.85,
    once: true,
    ease: 'power3.out',
    deps: [category, query, visible, list.length],
  })

  const reset = () => {
    setCategory('All')
    setQuery('')
    setVisible(PAGE_SIZE)
  }

  return (
    <div ref={rootRef} className={styles.page}>
      <PageMeta
        title="Blog | Product Engineering Insights"
        description="Practical insights on AI integration, MERN architecture, cloud multi-tenancy, DevOps, design systems, and SaaS product engineering from the Mernify team."
        canonicalPath="/blog"
        image={featured?.image}
      />
      <BlogHero />

      {featured ? (
        <section className={styles.featuredSection} data-header-theme="light" aria-labelledby="blog-featured-title">
          <Container width="wide">
            <div className={styles.featuredHead} data-fade-up>
              <Eyebrow rule>Featured</Eyebrow>
              <h2 id="blog-featured-title" className={styles.sectionTitle}>
                Editor&apos;s pick
              </h2>
            </div>
            <div data-fade-up>
              <BlogCard post={featured} featured />
            </div>
          </Container>
        </section>
      ) : null}

      <section
        id="articles"
        className={styles.browse}
        data-header-theme="light"
        aria-labelledby="blog-grid-title"
      >
        <Container width="wide" className={styles.browseShell}>
          <div className={styles.toolbar} data-fade-up>
            <div className={styles.toolbarCopy}>
              <Eyebrow rule>Library</Eyebrow>
              <h2 id="blog-grid-title" className={styles.sectionTitle}>
                All articles
              </h2>
              <p className={styles.support}>
                Filter by topic or search titles, tags, and authors.
              </p>
            </div>

            <label className={styles.search}>
              <Search size={18} aria-hidden="true" />
              <input
                type="search"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value)
                  setVisible(PAGE_SIZE)
                }}
                placeholder="Search articles…"
                autoComplete="off"
                aria-label="Search articles"
              />
            </label>
          </div>

          <div className={styles.filters} role="tablist" aria-label="Blog categories" data-fade-up>
            {blogCategories.map((item) => {
              const active = item === category
              return (
                <button
                  key={item}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  className={[styles.filter, active ? styles.filterActive : ''].filter(Boolean).join(' ')}
                  onClick={() => {
                    setCategory(item)
                    setVisible(PAGE_SIZE)
                  }}
                >
                  {item}
                </button>
              )
            })}
          </div>

          <p className={styles.count} data-fade-up>
            Showing <strong>{shown.length}</strong> of <strong>{list.length}</strong> articles
            {category !== 'All' ? ` in ${category}` : ''}
            {query.trim() ? ` matching “${query.trim()}”` : ''}
          </p>

          {list.length === 0 ? (
            <div className={styles.empty} role="status" data-fade-up>
              <h3>No articles match</h3>
              <p>Try another category or clear your search.</p>
              <Button type="button" size="md" onClick={reset}>
                Reset filters
              </Button>
            </div>
          ) : (
            <>
              <ul className={styles.grid} role="list">
                {shown.map((post, index) => (
                  <li key={post.slug} data-fade-up data-delay={String(Math.min(index * 40, 200))}>
                    <BlogCard post={post} />
                  </li>
                ))}
              </ul>

              {canLoadMore ? (
                <div className={styles.more} data-fade-up>
                  <Button type="button" size="md" onClick={() => setVisible((n) => n + PAGE_SIZE)}>
                    Load more articles
                  </Button>
                </div>
              ) : null}
            </>
          )}
        </Container>
      </section>

      <PageCta
        animated
        title="Have a product challenge worth writing about? Tell us what you’re building and we’ll help engineer the next chapter."
        accentWords={['product', 'engineer', 'chapter']}
      />
    </div>
  )
}
