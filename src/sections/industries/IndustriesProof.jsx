import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { Container, Eyebrow } from '@/components/ui'
import { industries, industriesPage } from '@/content/industries'
import { getCaseStudyBySlug } from '@/content/caseStudies'
import { getIndustryVisual } from '@/lib/industryVisuals'
import styles from './IndustriesProof.module.css'

const proofItems = industries
  .filter((item) => item.proof)
  .map((item) => {
    const study = getCaseStudyBySlug(item.proof)
    if (!study || study.status !== 'published') return null
    return {
      sector: item.title,
      accent: getIndustryVisual(item.slug).accent,
      slug: study.slug,
      title: study.title,
      industry: study.industry,
      image: study.featuredImage,
      metric: study.metrics?.[0] || null,
    }
  })
  .filter(Boolean)

export function IndustriesProof() {
  const { eyebrow, title, support } = industriesPage.proof
  if (!proofItems.length) return null

  return (
    <section
      className={styles.section}
      data-header-theme="light"
      aria-labelledby="industries-proof-title"
    >
      <Container width="wide" className={styles.inner}>
        <header className={styles.head} data-fade-up>
          <div className={styles.headCopy}>
            <Eyebrow rule className={styles.eyebrow}>
              {eyebrow}
            </Eyebrow>
            <h2 id="industries-proof-title" className={styles.title}>
              {title}
            </h2>
            <p className={styles.support}>{support}</p>
          </div>
          <Link to="/case-studies" className={styles.all}>
            View all case studies
            <ArrowUpRight size={17} strokeWidth={2.1} aria-hidden="true" />
          </Link>
        </header>

        <ul className={styles.grid} role="list">
          {proofItems.map((item, index) => (
            <li key={item.slug} data-fade-up data-delay={String((index % 3) * 90)}>
              <Link
                to={`/case-studies/${item.slug}`}
                className={styles.card}
                style={{ '--industry-accent': item.accent }}
                data-cursor="View"
              >
                <span className={styles.media}>
                  <img src={item.image} alt="" loading="lazy" decoding="async" />
                  <span className={styles.sector}>{item.sector}</span>
                </span>
                <span className={styles.body}>
                  <span className={styles.cardTitle}>{item.title}</span>
                  <span className={styles.industry}>{item.industry}</span>
                  {item.metric ? (
                    <span className={styles.metric}>
                      <strong>{item.metric.value}</strong>
                      <span>{item.metric.label}</span>
                    </span>
                  ) : null}
                  <span className={styles.cta}>
                    Read the case study
                    <ArrowUpRight size={15} strokeWidth={2.1} aria-hidden="true" />
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
