import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PageMeta } from '@/components/seo/PageMeta'
import { JsonLd } from '@/components/seo/JsonLd'
import { Button, Container } from '@/components/ui'
import { BookCallCta } from '@/components/cta/BookCallCta'
import { ClipReveal } from '@/components/motion/ClipReveal'
import { MediaStrip } from '@/components/layout/MediaStrip'
import { PageCta } from '@/components/layout/PageCta'
import { TechBrandGrid } from '@/components/layout/TechBrandGrid'
import { getServiceBySlug } from '@/content/services'
import { getServiceDetail } from '@/content/serviceDetails'
import { getServiceImage } from '@/lib/templateMedia'
import { SERVICE_ICONS } from '@/lib/serviceIcons'
import { breadcrumbSchema, serviceSchema } from '@/lib/schema'
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll'
import { useCharEntrance, splitChars } from '@/hooks/useCharEntrance'
import { splitScrubChars, useScrubTitle } from '@/hooks/useScrubTitle'
import { useReducedMotion } from '@/app/providers/useReducedMotion'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { ServiceWhy } from '@/sections/service-detail/ServiceWhy'
import { ServiceMethodology } from '@/sections/service-detail/ServiceMethodology'
import { ServiceLifecycle } from '@/sections/service-detail/ServiceLifecycle'
import { ServiceIndustries } from '@/sections/service-detail/ServiceIndustries'
import { ServiceEngagement } from '@/sections/service-detail/ServiceEngagement'
import { ServiceFaq } from '@/sections/service-detail/ServiceFaq'
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

const CAP_ICON_KEYS = ['target', 'layers', 'shield', 'checkCircle', 'sparkles', 'workflow', 'sliders', 'users']

const LOOP_STAGE_LABELS = ['Scope', 'Assemble', 'Scale', 'Own', 'Refine', 'Operate']

function ScrubHeading({ id, className, children, accent }) {
  const ref = useRef(null)
  useScrubTitle(ref)

  const text = typeof children === 'string' ? children : ''
  const chunks = accent ? text.split(new RegExp(`(${accent})`, 'i')) : [text]

  return (
    <h2 id={id} ref={ref} className={className}>
      {chunks.map((chunk, chunkIndex) => {
        const isAccent = accent && chunk.toLowerCase() === accent.toLowerCase()
        const words = chunk.match(/\S+/g) || []

        return words.map((word, wordIndex) => (
          <span key={`${chunkIndex}-${wordIndex}-${word}`} className={styles.word}>
            {splitScrubChars(word).map(({ key, char }) => (
              <span
                key={`${chunkIndex}-${wordIndex}-${key}`}
                data-scrub-char
                className={[styles.char, isAccent ? styles.accent : ''].filter(Boolean).join(' ')}
              >
                {char}
              </span>
            ))}
            {'\u00A0'}
          </span>
        ))
      })}
    </h2>
  )
}

function isLightMotion() {
  return (
    window.matchMedia('(pointer: coarse)').matches ||
    window.matchMedia('(max-width: 900px)').matches
  )
}

export function ServiceDetailPage() {
  const { slug } = useParams()
  const service = getServiceBySlug(slug)
  const detail = useMemo(() => getServiceDetail(slug), [slug])
  const pageRef = useRef(null)
  const giantRef = useRef(null)
  const bannerThumbRef = useRef(null)
  const overviewMediaRef = useRef(null)
  const overviewLoopRef = useRef(null)
  const outcomesRef = useRef(null)
  const [activeLoop, setActiveLoop] = useState(0)
  const { prefersReducedMotion } = useReducedMotion()

  useRevealOnScroll(pageRef, {
    selector: '[data-fade-up]',
    start: 'top 88%',
    y: 36,
    duration: 1,
    deps: [slug],
  })

  useRevealOnScroll(pageRef, {
    selector: '[data-fade-left],[data-fade-right]',
    start: 'top 88%',
    duration: 1.25,
    once: true,
    ease: 'power2.out',
    deps: [slug],
  })

  useCharEntrance(giantRef, { deps: [slug], delay: 0.2, stagger: 0.04 })

  // Subtle parallax on hero + overview media (desktop only)
  useLayoutEffect(() => {
    if (!service || prefersReducedMotion) return undefined

    const targets = [
      { el: bannerThumbRef.current, amount: 10 },
      { el: overviewMediaRef.current, amount: 8 },
    ].filter((item) => item.el)

    if (!targets.length) return undefined

    let ctx

    const build = () => {
      ctx?.revert()
      if (isLightMotion()) return

      ctx = gsap.context(() => {
        targets.forEach(({ el, amount }) => {
          gsap.fromTo(
            el,
            { yPercent: -amount },
            {
              yPercent: amount,
              ease: 'none',
              force3D: true,
              scrollTrigger: {
                trigger: el,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.85,
              },
            },
          )
        })
      }, pageRef.current)
    }

    build()
    ScrollTrigger.refresh()

    const coarse = window.matchMedia('(pointer: coarse)')
    const narrow = window.matchMedia('(max-width: 900px)')
    const onChange = () => {
      build()
      ScrollTrigger.refresh()
    }
    coarse.addEventListener('change', onChange)
    narrow.addEventListener('change', onChange)

    return () => {
      coarse.removeEventListener('change', onChange)
      narrow.removeEventListener('change', onChange)
      ctx?.revert()
    }
  }, [service, slug, prefersReducedMotion])

  // Overview process-loop: progress bar follows the active step
  useLayoutEffect(() => {
    if (!service) return undefined
    const root = overviewLoopRef.current
    if (!root) return undefined

    const progress = root.querySelector('[data-loop-progress]')
    const steps = Array.from(root.querySelectorAll('[data-loop-step]'))
    if (!progress || !steps.length) return undefined

    const ratio = steps.length <= 1 ? 1 : activeLoop / (steps.length - 1)
    const target = Math.max(ratio, 0.08)

    if (prefersReducedMotion) {
      progress.style.transform = `scaleY(${target})`
      return undefined
    }

    const ctx = gsap.context(() => {
      gsap.to(progress, {
        scaleY: target,
        duration: 0.45,
        ease: 'power2.out',
        transformOrigin: 'top center',
        overwrite: 'auto',
      })
    }, root)

    return () => ctx.revert()
  }, [service, slug, activeLoop, prefersReducedMotion])

  // Reset loop focus when navigating between services
  useLayoutEffect(() => {
    setActiveLoop(0)
  }, [slug])

  // Metric reveal pulse when outcomes enter view
  useLayoutEffect(() => {
    if (!service || prefersReducedMotion) return undefined
    const root = outcomesRef.current
    if (!root) return undefined

    const metrics = root.querySelectorAll('[data-metric]')
    if (!metrics.length) return undefined

    const ctx = gsap.context(() => {
      metrics.forEach((el, index) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 24, scale: 0.92 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              once: true,
            },
          },
        )
      })
    }, root)

    return () => ctx.revert()
  }, [service, slug, prefersReducedMotion])

  useLayoutEffect(() => {
    if (prefersReducedMotion) return undefined
    ScrollTrigger.refresh()
    return undefined
  }, [slug, prefersReducedMotion])

  const structuredData = useMemo(() => {
    if (!service) return null
    return [
      serviceSchema({
        title: service.title,
        description: service.description,
        slug: service.slug,
      }),
      breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services' },
        { name: service.title, path: `/services/${service.slug}` },
      ]),
    ]
  }, [service])

  if (!service) {
    return <NotFoundPage />
  }

  const heroLine = detail.heroLine || HERO_LINES[service.slug] || service.shortTitle || service.title
  const tags = [...service.capabilities.slice(0, 4)]
  const overviewTitle = `${service.problem.replace(/\.$/, '')} — solved with a clear outcome`
  const heroImage = getServiceImage(service.slug)
  const capabilityItems =
    detail.capabilityDetails ||
    service.capabilities.map((title, index) => ({
      title,
      text: 'Scoped delivery with clear ownership and production-minded engineering.',
      icon: CAP_ICON_KEYS[index % CAP_ICON_KEYS.length],
    }))
  const benefitItems = detail.benefits.items || []
  const bannerLead = detail.bannerSupport || service.description

  return (
    <div ref={pageRef} className={styles.page}>
      <PageMeta
        title={service.title}
        description={service.description}
        canonicalPath={`/services/${service.slug}`}
      />
      {structuredData ? <JsonLd id="mf-service-schema" data={structuredData} /> : null}

      <section className={styles.banner} data-header-theme="light" aria-labelledby="service-title">
        <div className={styles.bannerAtmosphere} aria-hidden="true">
          <span className={styles.orbOne} />
          <span className={styles.orbTwo} />
        </div>

        <Container width="wide" className={styles.bannerInner}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb" data-fade-up>
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link to="/services">Services</Link>
            <span aria-hidden="true">/</span>
            <span>{service.title}</span>
          </nav>

          <div className={styles.bannerTop}>
            <div className={styles.bannerLeft} data-fade-up data-delay="120">
              <p className={styles.eyebrow}>( {service.title} )</p>
              <h1 id="service-title" className={styles.srOnly}>
                {service.title}
              </h1>
              <p className={styles.lead}>{bannerLead}</p>
              <div className={styles.actions}>
                <Button as={Link} to="/contact">
                  Discuss Your Project
                </Button>
                <Button as="a" href="#capabilities" variant="secondary">
                  Explore capabilities
                </Button>
                <BookCallCta variant="secondary" size="md" />
              </div>
            </div>

            <div className={styles.bannerThumbWrap} data-fade-up data-delay="180">
              <div ref={bannerThumbRef} className={styles.bannerThumb}>
                <ClipReveal
                  src={heroImage}
                  alt={`${service.title} visual`}
                  className={styles.thumbClip}
                  start="top 85%"
                />
              </div>
            </div>

            <div className={styles.bannerTags} data-fade-up data-delay="240">
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

      <MediaStrip src={detail.strip} height="tall" speed={0.1} />

      <section className={styles.overview} data-header-theme="light" aria-labelledby="service-overview-title">
        <div className={styles.sectionGlow} aria-hidden="true" />
        <Container width="wide" className={styles.overviewShell}>
          <div className={styles.overviewGrid}>
            <div
              className={styles.overviewMedia}
              data-fade-right
              data-delay="80"
              data-duration="1400"
            >
              <div ref={overviewMediaRef} className={styles.overviewMediaInner}>
                <div className={styles.overviewStage}>
                  <img
                    src={detail.overviewMedia.src}
                    alt={detail.overviewMedia.alt}
                    width={1800}
                    height={1800}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <span className={styles.overviewBadge}>{detail.overviewBadge}</span>
              </div>
            </div>

            <div className={styles.overviewCopy} data-fade-left data-delay="140" data-duration="1400">
              <header className={styles.overviewHeader}>
                <p className={styles.eyebrow}>( Why {service.shortTitle || service.title} )</p>
                <ScrubHeading
                  id="service-overview-title"
                  className={styles.overviewTitle}
                  accent="outcome"
                >
                  {overviewTitle}
                </ScrubHeading>
              </header>

              <p className={styles.overviewLead}>{service.description}</p>

              <div ref={overviewLoopRef} className={styles.loop}>
                <div className={styles.loopRail} aria-hidden="true">
                  <span className={styles.loopTrack} />
                  <span className={styles.loopProgress} data-loop-progress />
                </div>

                <ol className={styles.loopSteps} aria-label={`${service.title} delivery loop`}>
                  {service.capabilities.map((item, index) => {
                    const isActive = activeLoop === index
                    const isComplete = index < activeLoop
                    const iconKey = CAP_ICON_KEYS[index % CAP_ICON_KEYS.length]
                    const Icon = SERVICE_ICONS[iconKey] || SERVICE_ICONS.target
                    const stageLabel = LOOP_STAGE_LABELS[index % LOOP_STAGE_LABELS.length]

                    return (
                      <li key={item} className={styles.loopItem}>
                        <button
                          type="button"
                          className={[
                            styles.loopStep,
                            isActive ? styles.loopStepActive : '',
                            isComplete ? styles.loopStepComplete : '',
                          ]
                            .filter(Boolean)
                            .join(' ')}
                          data-loop-step
                          data-fade-up
                          data-delay={String(90 + index * 80)}
                          aria-current={isActive ? 'step' : undefined}
                          onMouseEnter={() => setActiveLoop(index)}
                          onFocus={() => setActiveLoop(index)}
                          onClick={() => setActiveLoop(index)}
                        >
                          <span className={styles.loopNode} aria-hidden="true">
                            <span className={styles.loopNodeRing} />
                            <span className={styles.loopNodeCore}>
                              {String(index + 1).padStart(2, '0')}
                            </span>
                          </span>

                          <span className={styles.loopBody}>
                            <span className={styles.loopMeta}>
                              <span className={styles.loopLabel}>
                                Stage · {stageLabel}
                              </span>
                              <span className={styles.loopIcon} aria-hidden="true">
                                <Icon size={16} strokeWidth={2.2} />
                              </span>
                            </span>
                            <span className={styles.loopTitle}>{item}</span>
                            <span className={styles.loopHint}>
                              {isActive
                                ? 'In focus in the delivery loop'
                                : isComplete
                                  ? 'Completed in the loop'
                                  : 'Next in the delivery loop'}
                            </span>
                          </span>
                        </button>
                      </li>
                    )
                  })}
                </ol>
              </div>

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
            <p className={styles.sectionSupport}>
              Concrete delivery areas—scoped with ownership so engineering stays connected to outcomes.
            </p>
          </div>
          <div className={styles.capGrid}>
            {capabilityItems.map((item, index) => {
              const iconKey = item.icon || CAP_ICON_KEYS[index % CAP_ICON_KEYS.length]
              const Icon = SERVICE_ICONS[iconKey] || SERVICE_ICONS.target
              return (
                <article
                  key={item.title}
                  className={styles.capCard}
                  data-fade-up
                  data-delay={String(index * 90)}
                >
                  <div className={styles.capHead}>
                    <span className={styles.capIcon} aria-hidden="true">
                      <Icon size={22} strokeWidth={2.1} />
                    </span>
                    <h3>{item.title}</h3>
                  </div>
                  <div className={styles.capFoot}>
                    <p>{item.text}</p>
                    <Link to="/contact" className={styles.capArrow} aria-label={`Discuss ${item.title}`}>
                      <ArrowUpRight size={20} />
                    </Link>
                  </div>
                </article>
              )
            })}
          </div>
        </Container>
      </section>

      <ServiceMethodology
        content={detail.methodology}
        serviceTitle={service.shortTitle || service.title}
      />

      <ServiceWhy content={detail.why} />

      <ServiceLifecycle content={detail.lifecycle} />

      <ServiceIndustries content={detail.industries} />

      <ServiceEngagement content={detail.engagement} />

      <section
        ref={outcomesRef}
        className={styles.outcomes}
        data-header-theme="light"
      >
        <Container width="wide">
          <div className={styles.overviewIntro} data-fade-up>
            <p className={styles.eyebrow}>({detail.benefits.eyebrow})</p>
            <ScrubHeading className={styles.sectionTitle}>{detail.benefits.title}</ScrubHeading>
          </div>
          <div className={styles.outcomeGrid}>
            {benefitItems.map((item, index) => (
              <article
                key={item.title}
                className={styles.outcomeCard}
                data-fade-up
                data-delay={String(index * 100)}
              >
                <p className={styles.metric} data-metric>
                  {String(index + 1).padStart(2, '0')}
                </p>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <ServiceFaq content={detail.faq} />

      <TechBrandGrid
        title={`Selected work relevant to ${service.title}`}
        support="Published case studies from products and brands we’ve helped design, build, and scale."
        animated
        aos
      />

      <PageCta
        title="Ready to build your next digital product? Drop us a message, and let’s start engineering something reliable and scalable."
        accentWords={['message', 'scalable']}
        mediaSrc={detail.ctaMedia.src}
        mediaAlt={detail.ctaMedia.alt}
        animated
        scrub={{ scrub: 1, stagger: 0.12 }}
      />
    </div>
  )
}
