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
import styles from './ServicesPage.module.css'

export function ServicesPage() {
  const listRef = useRef(null)
  useRevealOnScroll(listRef, { selector: '[data-fade-up]', start: 'top 90%' })

  return (
    <>
      <PageMeta
        title="Services"
        description="Product engineering, SaaS, web, mobile, AI integration, and dedicated delivery—organized by commercial outcomes."
        canonicalPath="/services"
      />
      <PageHero
        title="Services"
        support={
          <>
            We are <span className={styles.accent}>“Mernify”</span> — a modern software development
            partner for products that need to last
          </>
        }
      />

      <section className={styles.section} data-header-theme="dark" ref={listRef}>
        <Container width="wide">
          <ul className={styles.list} role="list">
            {services.map((item, index) => (
              <li
                key={item.slug}
                className={[styles.single, index % 2 === 1 ? styles.singleAlt : ''].join(' ')}
                data-fade-up
                data-delay={String((index % 4) * 80)}
              >
                <Link to={`/services/${item.slug}`} className={styles.item}>
                  <div className={styles.content}>
                    <span className={styles.number}>
                      {String(index + 1).padStart(2, '0')}
                      <img
                        src="/assets/images/icons/service-three-arrow.svg"
                        alt=""
                        aria-hidden="true"
                      />
                    </span>
                    <div className={styles.copy}>
                      <h2 className={styles.title}>{item.title}</h2>
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
                    <img src={getServiceImage(item.slug)} alt="" />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <MediaStrip src="/assets/images/thumbs/thumbnail-ab-bg.jpg" height="tall" />
      <TechBrandGrid animated />
      <PageCta
        title="Ready to build your next digital product? Drop us a message, and let’s start engineering something reliable and scalable."
        accentWords={['message', 'scalable']}
        animated
      />
    </>
  )
}
