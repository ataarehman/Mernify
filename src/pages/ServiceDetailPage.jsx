import { useLayoutEffect, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PageMeta } from '@/components/seo/PageMeta'
import { Button, Container } from '@/components/ui'
import { ClipReveal } from '@/components/motion/ClipReveal'
import { MediaStrip } from '@/components/layout/MediaStrip'
import { PageCta } from '@/components/layout/PageCta'
import { TechBrandGrid } from '@/components/layout/TechBrandGrid'
import { getServiceBySlug } from '@/content/services'
import { getServiceImage, PROCESS_ICONS } from '@/lib/templateMedia'
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll'
import { useCharEntrance, splitChars } from '@/hooks/useCharEntrance'
import { splitScrubChars, useScrubTitle } from '@/hooks/useScrubTitle'
import { useReducedMotion } from '@/app/providers/useReducedMotion'
import { NotFoundPage } from '@/pages/NotFoundPage'
import styles from './ServiceDetailPage.module.css'

gsap.registerPlugin(ScrollTrigger)

const HERO_LINES = {
  'product-engineering': 'engineer for scale',
  'saas-development': 'built for tenants',
  'web-development': 'platforms that perform',
  'mobile-app-development': 'apps people keep',
  'ai-integration': 'ai that ships',
  'ui-ux-design': 'design before code',
  'workflow-automation': 'workflows that move',
  'cloud-devops': 'release with confidence',
  'api-development': 'apis that unlock',
  'dedicated-product-teams': 'pods that own it',
}

const DELIVERY_STEPS = [
  {
    title: 'Discover & define',
    body: 'Clarify goals, constraints, and success metrics before architecture decisions lock in.',
  },
  {
    title: 'Design the system',
    body: 'Shape journeys, interfaces, and technical direction so engineering starts with clarity.',
  },
  {
    title: 'Build & integrate',
    body: 'Deliver production-minded increments with reviews, testing, and integration as defaults.',
  },
  {
    title: 'Launch & improve',
    body: 'Ship with monitoring, ownership, and a path to iterate based on real usage.',
  },
]

function ScrubHeading({ id, className, children, accent }) {
  const ref = useRef(null)
  useScrubTitle(ref)

  const text = typeof children === 'string' ? children : ''
  const parts = accent
    ? text.split(new RegExp(`(${accent})`, 'i'))
    : [text]

  return (
    <h2 id={id} ref={ref} className={className}>
      {parts.map((part, index) => {
        const isAccent = accent && part.toLowerCase() === accent.toLowerCase()
        return splitScrubChars(part).map(({ key, char }) => (
          <span
            key={`${index}-${key}`}
            data-scrub-char
            className={isAccent ? styles.accent : undefined}
          >
            {char}
          </span>
        ))
      })}
    </h2>
  )
}

export function ServiceDetailPage() {
  const { slug } = useParams()
  const service = getServiceBySlug(slug)
  const pageRef = useRef(null)
  const giantRef = useRef(null)
  const { prefersReducedMotion } = useReducedMotion()

  useRevealOnScroll(pageRef, {
    selector: '[data-fade-up]',
    start: 'top 88%',
    deps: [slug],
  })

  useCharEntrance(giantRef, { deps: [slug] })

  useLayoutEffect(() => {
    if (prefersReducedMotion) return undefined
    ScrollTrigger.refresh()
    return undefined
  }, [slug, prefersReducedMotion])

  if (!service) {
    return <NotFoundPage />
  }

  const heroLine = HERO_LINES[service.slug] || service.shortTitle || service.title
  const tags = [...service.capabilities, service.outcome.split(' ').slice(0, 3).join(' ')]
  const overviewTitle = `${service.problem.replace(/\.$/, '')} — solved with a clear outcome`

  return (
    <div ref={pageRef}>
      <PageMeta
        title={service.title}
        description={service.description}
        canonicalPath={`/services/${service.slug}`}
      />

      <section className={styles.banner} data-header-theme="light" aria-labelledby="service-title">
        <Container width="wide">
          <div className={styles.bannerTop}>
            <div className={styles.bannerLeft} data-fade-up data-delay="200">
              <p className={styles.eyebrow}>( {service.title} )</p>
              <h1 id="service-title" className={styles.srOnly}>
                {service.title}
              </h1>
              <p className={styles.lead}>{service.description}</p>
              <div className={styles.actions}>
                <Button as={Link} to="/contact">
                  Discuss Your Project
                </Button>
                <Button as="a" href="#capabilities" variant="ghost">
                  Explore capabilities
                </Button>
              </div>
            </div>

            <div className={styles.bannerThumb}>
              <ClipReveal
                src={getServiceImage(service.slug)}
                alt=""
                className={styles.thumbClip}
                start="top 80%"
              />
            </div>

            <div className={styles.bannerTags} data-fade-up data-delay="300">
              <ul role="list">
                {tags.map((tag) => (
                  <li key={tag}>
                    <a href="#capabilities">{tag}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p ref={giantRef} className={styles.giant} aria-hidden="true">
            {splitChars(heroLine).map(({ key, char }) => (
              <span key={key} data-char className={styles.giantChar}>
                {char}
              </span>
            ))}
          </p>
        </Container>
      </section>

      <MediaStrip src="/assets/images/thumbs/thumbnail-ab-bg.jpg" height="tall" />

      <section className={styles.overview} data-header-theme="light">
        <Container width="wide">
          <div className={styles.overviewIntro} data-fade-up>
            <p className={styles.eyebrow}>( Why {service.shortTitle || service.title} )</p>
            <ScrubHeading className={styles.sectionTitle} accent="outcome">
              {overviewTitle}
            </ScrubHeading>
          </div>
          <div className={styles.overviewGrid}>
            <div className={styles.overviewMedia} data-fade-up data-delay="200">
              <ClipReveal
                src="/assets/images/thumbs/banner-two-thumb.jpg"
                alt=""
                className={styles.thumbClip}
              />
            </div>
            <div className={styles.overviewCopy} data-fade-up data-delay="300">
              <p>{service.description}</p>
              <ul className={styles.checks} role="list">
                {service.capabilities.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className={styles.outcomeLine}>
                <strong>Outcome:</strong> {service.outcome}
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section id="capabilities" className={styles.capabilities} data-header-theme="light">
        <Container width="wide">
          <div className={styles.overviewIntro} data-fade-up>
            <p className={styles.eyebrow}>( Capabilities )</p>
            <ScrubHeading className={styles.sectionTitle}>
              {`What ${service.title} includes`}
            </ScrubHeading>
          </div>
          <div className={styles.capGrid}>
            {service.capabilities.map((item, index) => (
              <article
                key={item}
                className={styles.capCard}
                data-fade-up
                data-delay={String(index * 100)}
              >
                <div className={styles.capHead}>
                  <span className={styles.capIcon} aria-hidden="true">
                    ◆
                  </span>
                  <h3>{item}</h3>
                </div>
                <div className={styles.capFoot}>
                  <p>Scoped delivery with clear ownership and production-minded engineering.</p>
                  <Link to="/contact" className={styles.capArrow} aria-label={`Discuss ${item}`}>
                    <ArrowUpRight size={22} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section id="process" className={styles.process} data-header-theme="dark">
        <Container width="wide">
          <div className={styles.overviewIntro} data-fade-up>
            <p className={styles.eyebrowLight}>( Process )</p>
            <ScrubHeading className={styles.sectionTitleLight}>
              {`How we deliver ${service.shortTitle || service.title}`}
            </ScrubHeading>
          </div>
          <div className={styles.stepGrid}>
            {DELIVERY_STEPS.map((step, index) => (
              <article
                key={step.title}
                className={styles.stepCard}
                data-fade-up
                data-delay={String(200 + index * 100)}
              >
                <span className={styles.stepBadge}>Step {String(index + 1).padStart(2, '0')}</span>
                <div className={styles.stepIcon}>
                  <img src={PROCESS_ICONS[index % PROCESS_ICONS.length]} alt="" />
                </div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className={styles.outcomes} data-header-theme="light">
        <Container width="wide">
          <div className={styles.overviewIntro} data-fade-up>
            <p className={styles.eyebrow}>( Outcomes )</p>
            <ScrubHeading className={styles.sectionTitle}>What you can expect</ScrubHeading>
          </div>
          <div className={styles.outcomeGrid}>
            <article className={styles.outcomeCard} data-fade-up data-delay="0">
              <p className={styles.metric} data-count-to="1">
                01
              </p>
              <h3>Clear scope</h3>
              <p>Decisions and deliverables stay visible from discovery through launch.</p>
            </article>
            <article className={styles.outcomeCard} data-fade-up data-delay="100">
              <p className={styles.metric} data-count-to="2">
                02
              </p>
              <h3>Reliable release</h3>
              <p>Production-minded engineering, reviews, and handover — not a demo dump.</p>
            </article>
            <article className={styles.outcomeCard} data-fade-up data-delay="200">
              <p className={styles.metric} data-count-to="3">
                03
              </p>
              <h3>Room to grow</h3>
              <p>Architecture and process prepared for users, features, and integrations ahead.</p>
            </article>
          </div>
        </Container>
      </section>

      <TechBrandGrid title={`Technology & tools behind ${service.title}`} animated />

      <PageCta
        title="Ready to build your next digital product? Drop us a message, and let’s start engineering something reliable and scalable."
        accentWords={['message', 'scalable']}
        animated
      />
    </div>
  )
}
