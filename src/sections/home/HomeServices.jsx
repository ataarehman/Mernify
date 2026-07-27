import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight } from 'lucide-react'
import { Container, Eyebrow, Heading, Section, Text, TextLink } from '@/components/ui'
import { useReducedMotion } from '@/app/providers/useReducedMotion'
import { homeServices } from '@/content/services'
import { SERVICE_ICONS } from '@/lib/serviceIcons'
import styles from './HomeServices.module.css'

gsap.registerPlugin(ScrollTrigger)

export function HomeServices() {
  const rootRef = useRef(null)
  const { prefersReducedMotion } = useReducedMotion()
  const featured = homeServices.items.filter((item) => item.featured)
  const rest = homeServices.items.filter((item) => !item.featured)

  useEffect(() => {
    const root = rootRef.current
    if (!root || prefersReducedMotion) return undefined
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-svc-enter]',
        { y: 24, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.55,
          stagger: 0.05,
          ease: 'power3.out',
          scrollTrigger: { trigger: root, start: 'top 78%', once: true },
        },
      )
    }, root)
    return () => ctx.revert()
  }, [prefersReducedMotion])

  return (
    <Section
      ref={rootRef}
      tone="light"
      className={styles.section}
      aria-labelledby="home-services-title"
    >
      <Container>
        <div className={styles.header} data-svc-enter>
          <Eyebrow>{homeServices.eyebrow}</Eyebrow>
          <div className={styles.headerRow}>
            <Heading id="home-services-title" level={2}>
              {homeServices.title}
            </Heading>
            <TextLink to={homeServices.viewAll.to} className={styles.viewAll}>
              {homeServices.viewAll.label}
              <ArrowUpRight size={16} aria-hidden="true" />
            </TextLink>
          </div>
          <Text muted className={styles.support}>
            {homeServices.support}
          </Text>
        </div>

        <div className={styles.featured}>
          {featured.map((item) => {
            const Icon = SERVICE_ICONS[item.icon] || SERVICE_ICONS.boxes
            return (
              <Link
                key={item.id}
                to={`/services/${item.slug}`}
                className={styles.featureCard}
                data-svc-enter
              >
                <span className={styles.iconWrap}>
                  <Icon size={22} aria-hidden="true" />
                </span>
                <h3>{item.title}</h3>
                <p className={styles.problem}>{item.problem}</p>
                <p className={styles.outcome}>
                  <strong>Outcome:</strong> {item.outcome}
                </p>
                <p className={styles.desc}>{item.description}</p>
                <span className={styles.cta}>
                  Explore service <ArrowUpRight size={16} aria-hidden="true" />
                </span>
              </Link>
            )
          })}
        </div>

        <div className={styles.grid}>
          {rest.map((item) => {
            const Icon = SERVICE_ICONS[item.icon] || SERVICE_ICONS.boxes
            return (
              <Link
                key={item.id}
                to={`/services/${item.slug}`}
                className={styles.card}
                data-svc-enter
              >
                <span className={styles.iconWrapSm}>
                  <Icon size={18} aria-hidden="true" />
                </span>
                <h3>{item.title}</h3>
                <p>{item.outcome}</p>
                <span className={styles.ctaSm}>Learn more</span>
              </Link>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}
