import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { PageHero } from '@/components/layout/PageHero'
import { PageCta } from '@/components/layout/PageCta'
import { MediaStrip } from '@/components/layout/MediaStrip'
import { TechBrandGrid } from '@/components/layout/TechBrandGrid'
import { PageMeta } from '@/components/seo/PageMeta'
import { Container } from '@/components/ui'
import { services } from '@/content/services'
import { getServiceImage } from '@/lib/templateMedia'
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll'
import { useCharEntrance, splitChars } from '@/hooks/useCharEntrance'
import { ServicesIntro } from '@/sections/services/ServicesIntro'
import { ServicesTwo } from '@/sections/services/ServicesTwo'
import { ServicesMarquee } from '@/sections/services/ServicesMarquee'
import { ServicesEngagement } from '@/sections/services/ServicesEngagement'
import { ServicesDelivery } from '@/sections/services/ServicesDelivery'
import styles from './ServicesPage.module.css'

const FEATURED_SLUGS = new Set([
  'product-engineering',
  'saas-development',
  'web-development',
  'mobile-app-development',
  'ai-integration',
])

function ServicesHero() {
  const titleRef = useRef(null)
  useCharEntrance(titleRef, {
    start: 'top 90%',
    duration: 1,
    delay: 0.5,
    stagger: 0.05,
  })

  return (
    <PageHero
      title={
        <span ref={titleRef} className={styles.heroTitle}>
          {splitChars('Services').map(({ key, char }) => (
            <span key={key} data-char className={styles.heroChar}>
              {char}
            </span>
          ))}
        </span>
      }
      support={
        <>
          We are <span className={styles.accent}>“Mernify”</span> — a modern software development
          partner for products that need to last
        </>
      }
    />
  )
}

function MoreServices() {
  const listRef = useRef(null)
  const rest = services.filter((item) => !FEATURED_SLUGS.has(item.slug))

  useRevealOnScroll(listRef, {
    selector: '[data-fade-up]',
    start: 'top bottom',
    duration: 1,
    once: false,
    ease: 'power1.out',
    y: 40,
  })

  // Remaining catalogue: service.html-style horizontal reveals
  useRevealOnScroll(listRef, {
    selector: '[data-fade-left],[data-fade-right]',
    start: 'top 88%',
    duration: 2,
    once: false,
    ease: 'power2.out',
  })

  if (!rest.length) return null

  return (
    <section className={styles.more} data-header-theme="dark" ref={listRef}>
      <Container width="wide" className={styles.moreInner}>
        <header className={styles.moreHeader} data-fade-up data-delay="200" data-duration="1000">
          <p className={styles.moreEyebrow}>( More capabilities )</p>
          <h2 className={styles.moreTitle}>Additional services</h2>
        </header>
        <ul className={styles.list} role="list">
          {rest.map((item, index) => {
            const fromRight = index % 2 === 1
            return (
              <li
                key={item.slug}
                className={[styles.single, fromRight ? styles.singleAlt : ''].join(' ')}
                {...(fromRight ? { 'data-fade-left': true } : { 'data-fade-right': true })}
                data-delay={String(200 + index * 100)}
                data-duration="2000"
              >
                <Link to={`/services/${item.slug}`} className={styles.item}>
                  <div className={styles.content}>
                    <span className={styles.number}>
                      {String(index + 1).padStart(2, '0')}
                      <img
                        className={styles.arrow}
                        src="/assets/images/icons/service-three-arrow.svg"
                        alt=""
                        aria-hidden="true"
                        width={45}
                        height={9}
                        loading="lazy"
                        decoding="async"
                      />
                    </span>
                    <div className={styles.copy}>
                      <h3 className={styles.title}>{item.title}</h3>
                      {item.outcome ? <p className={styles.outcome}>{item.outcome}</p> : null}
                      <ul className={styles.tags} role="list">
                        {item.capabilities.slice(0, 3).map((cap) => (
                          <li key={cap}>
                            <span>{cap}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className={styles.thumb}>
                    <img src={getServiceImage(item.slug)} alt="" loading="lazy" decoding="async" />
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>
      </Container>
    </section>
  )
}

export function ServicesPage() {
  return (
    <>
      <PageMeta
        title="Services"
        description="Product engineering, SaaS, web, mobile, AI integration, and dedicated delivery—organized by commercial outcomes."
        canonicalPath="/services"
      />
      <ServicesHero />
      <ServicesIntro />
      <ServicesTwo />
      <ServicesMarquee />
      <MoreServices />
      <ServicesEngagement />
      <MediaStrip src="/assets/images/services/strip-wide.webp" height="tall" speed={0.1} />
      <ServicesDelivery />
      <TechBrandGrid animated aos />
      <PageCta
        title="Ready to build your next digital product? Drop us a message, and let’s start engineering something reliable and scalable."
        accentWords={['message', 'scalable']}
        mediaSrc="/assets/images/services/cta-media.webp"
        mediaAlt="Designer reviewing a polished product interface on a tablet"
        animated
        scrub={{ scrub: 1, stagger: 0.2 }}
      />
    </>
  )
}
