import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { Container, Eyebrow } from '@/components/ui'
import { publishedCaseStudies } from '@/content/caseStudies'
import styles from './CaseStudiesProof.module.css'

function cleanQuote(text) {
  return String(text || '')
    .replace(/^[\s"“]+|[\s"”]+$/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

const quotes = publishedCaseStudies
  .filter((item) => item.publicSiteClaims?.length)
  .slice(0, 3)
  .map((item) => ({
    slug: item.slug,
    title: item.title,
    quote: cleanQuote(item.publicSiteClaims[0]),
    accent: item.accent,
    category: item.category,
  }))

export function CaseStudiesProof() {
  if (!quotes.length) return null

  return (
    <section
      className={styles.section}
      data-header-theme="dark"
      aria-labelledby="proof-title"
    >
      <div className={styles.glowA} aria-hidden="true" />
      <div className={styles.glowB} aria-hidden="true" />

      <Container width="wide" className={styles.inner}>
        <div className={styles.head} data-fade-up>
          <Eyebrow rule className={styles.eyebrow}>
            In their words
          </Eyebrow>
          <h2 id="proof-title" className={styles.title}>
            How the products speak for themselves
          </h2>
          <p className={styles.support}>
            Live-site messaging pulled from public product pages — not invented testimonials.
          </p>
        </div>

        <ul className={styles.grid} role="list">
          {quotes.map((item, index) => (
            <li key={item.slug} data-fade-up data-delay={String(index * 90)}>
              <Link
                to={`/case-studies/${item.slug}`}
                className={styles.card}
                style={{ '--study-accent': item.accent || '#4f46e5' }}
                data-cursor="View"
              >
                <span className={styles.mark} aria-hidden="true">
                  “
                </span>
                <span className={styles.category}>{item.category}</span>
                <blockquote className={styles.quote}>{item.quote}</blockquote>
                <span className={styles.footer}>
                  <span className={styles.source}>{item.title}</span>
                  <span className={styles.cta}>
                    View study
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
