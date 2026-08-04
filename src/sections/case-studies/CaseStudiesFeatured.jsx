import { Link } from 'react-router-dom'
import { ArrowUpRight, ExternalLink } from 'lucide-react'
import { Button, Container, Eyebrow } from '@/components/ui'
import styles from './CaseStudiesFeatured.module.css'

function excerpt(text, max = 118) {
  if (!text) return ''
  const clean = String(text).replace(/\s+/g, ' ').trim()
  if (clean.length <= max) return clean
  return `${clean.slice(0, max).replace(/\s+\S*$/, '')}…`
}

const isRaster = (src) =>
  Boolean(src) && !src.endsWith('.svg') && !src.endsWith('cover.svg')

export function CaseStudiesFeatured({ study }) {
  if (!study) return null

  const quote = study.publicSiteClaims?.[0]
  const metrics = (study.metrics || []).slice(0, 3)
  const outcomes = (study.outcomes || []).slice(0, 2)
  const cover =
    (isRaster(study.featuredImage) && study.featuredImage) ||
    (study.gallery || []).find((item) => isRaster(item.src))?.src ||
    null

  const story = [
    { index: '01', label: 'Challenge', body: excerpt(study.challenge) },
    { index: '02', label: 'Solution', body: excerpt(study.solution) },
    { index: '03', label: 'Results', body: null, list: outcomes },
  ]

  return (
    <section
      className={styles.section}
      data-header-theme="light"
      aria-labelledby="featured-case-title"
    >
      <Container width="wide">
        <div className={styles.head} data-fade-up>
          <Eyebrow rule>Spotlight</Eyebrow>
          <h2 className={styles.headTitle}>Featured engagement</h2>
          <p className={styles.headSupport}>
            Challenge, approach, and outcomes — from public product evidence.
          </p>
        </div>

        <article
          className={styles.spotlight}
          style={{ '--study-accent': study.accent || '#4f46e5' }}
          data-fade-up
          data-delay="60"
        >
          <div className={styles.visual}>
            <Link
              to={`/case-studies/${study.slug}`}
              className={styles.media}
              data-cursor="View"
            >
              {cover ? (
                <img
                  src={cover}
                  alt={`${study.title} product preview`}
                  loading="eager"
                  decoding="async"
                  width={960}
                  height={720}
                  sizes="(min-width: 900px) 42vw, 92vw"
                />
              ) : (
                <span className={styles.brandFallback}>
                  <span className={styles.brandMark}>{study.title.charAt(0)}</span>
                  <span>{study.title}</span>
                </span>
              )}
              <span className={styles.mediaShade} aria-hidden="true" />
              <span className={styles.mediaCue} aria-hidden="true">
                View study <ArrowUpRight size={14} />
              </span>
            </Link>

            {metrics.length ? (
              <ul className={styles.metrics} role="list">
                {metrics.map((metric) => (
                  <li key={`${metric.label}-${metric.value}`}>
                    <strong>{metric.value}</strong>
                    <span>{metric.label}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <div className={styles.content}>
            <div className={styles.meta}>
              <span className={styles.category}>{study.category}</span>
              <span className={styles.industry}>{study.industry.split('/')[0].trim()}</span>
            </div>

            <h3 id="featured-case-title" className={styles.title}>
              <Link to={`/case-studies/${study.slug}`}>{study.title}</Link>
            </h3>
            <p className={styles.tagline}>{study.tagline}</p>

            <ol className={styles.story} role="list">
              {story.map((step) => (
                <li key={step.label} className={styles.step}>
                  <div className={styles.stepHead}>
                    <span className={styles.stepIndex}>{step.index}</span>
                    <h4>{step.label}</h4>
                  </div>
                  {step.body ? <p>{step.body}</p> : null}
                  {step.list?.length ? (
                    <ul>
                      {step.list.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ))}
            </ol>

            {quote ? <blockquote className={styles.quote}>{quote}</blockquote> : null}

            <ul className={styles.badges} role="list">
              {(study.services || []).slice(0, 4).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <div className={styles.actions}>
              <Button as={Link} to={`/case-studies/${study.slug}`} variant="primary" size="md" arrow>
                View full case study
              </Button>
              {study.liveUrl ? (
                <a
                  className={styles.live}
                  href={study.liveUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Live product <ExternalLink size={14} aria-hidden="true" />
                </a>
              ) : (
                <Link to={`/case-studies/${study.slug}`} className={styles.live}>
                  Open study <ArrowUpRight size={14} aria-hidden="true" />
                </Link>
              )}
            </div>
          </div>
        </article>
      </Container>
    </section>
  )
}
