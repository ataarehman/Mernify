import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { PageCta } from '@/components/layout/PageCta'
import { PageHero } from '@/components/layout/PageHero'
import { PageMeta } from '@/components/seo/PageMeta'
import { Button, Container } from '@/components/ui'
import { getFeaturedMobileApp } from '@/content/mobileApps'
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll'
import { FeaturedMobileApp } from '@/sections/mobile-apps/FeaturedMobileApp'
import { MobileAppProcess, MobileAppServices } from '@/sections/mobile-apps/MobileAppExtras'
import { MobileAppsGrid } from '@/sections/mobile-apps/MobileAppsGrid'
import styles from '@/sections/mobile-apps/mobileApps.module.css'

const capabilities = [
  'Android',
  'iOS',
  'React Native',
  'AI / ML',
  'E-Commerce',
  'Marketplaces',
  'HealthTech',
  'Real-Time Systems',
]

export function MobileAppsPage() {
  const rootRef = useRef(null)
  const featured = getFeaturedMobileApp()

  useRevealOnScroll(rootRef, {
    selector: '[data-fade-up]',
    start: 'top 88%',
    duration: 0.85,
    once: true,
  })

  return (
    <div ref={rootRef} className={styles.page}>
      <PageMeta
        title="Mobile App Development & Applications | Mernify"
        description="Explore Android and iOS mobile applications developed by Mernify across AI, e-commerce, healthcare, marketplaces, retail and digital products."
        canonicalPath="/mobile-applications"
      />
      <PageHero
        eyebrow="Mobile app development"
        title="Mobile Applications"
        support="From AI-powered experiences and marketplaces to healthcare, e-commerce and retail applications, explore mobile products engineered by the Mernify team."
        actions={
          <div className={styles.heroActions}>
            <Button as={Link} to="/contact">
              Build Your Mobile App
            </Button>
            <Button as="a" href="#mobile-apps-showcase" variant="secondary">
              Explore Our Apps
            </Button>
          </div>
        }
      />

      <section className={styles.section} data-fade-up>
        <Container width="wide">
          <p className={styles.eyebrow}>Capabilities</p>
          <h2 className={styles.title}>Built for Mobile. Designed for Real Users.</h2>
          <p className={styles.support}>
            Mernify combines product design, mobile engineering and scalable backend development to
            create applications built for real-world business use.
          </p>
          <div className={styles.chips}>
            {capabilities.map((item) => (
              <span key={item} className={styles.chip}>
                {item}
              </span>
            ))}
          </div>
        </Container>
      </section>

      <section className={`${styles.section} ${styles.sectionAlt}`} data-fade-up>
        <Container width="wide">
          <FeaturedMobileApp app={featured} />
        </Container>
      </section>

      <section id="mobile-apps-showcase" className={styles.section} data-fade-up>
        <Container width="wide">
          <p className={styles.eyebrow}>Showcase</p>
          <h2 className={styles.title}>Mobile Applications We&apos;ve Built</h2>
          <p className={styles.support}>
            Android and iOS products across delivery, healthcare, retail, sports, photography, and
            on-demand services.
          </p>
          <MobileAppsGrid />
        </Container>
      </section>

      <section className={`${styles.section} ${styles.sectionAlt}`} data-fade-up>
        <Container width="wide">
          <p className={styles.eyebrow}>Services</p>
          <h2 className={styles.title}>Mobile App Development Services</h2>
          <MobileAppServices />
        </Container>
      </section>

      <section className={styles.section} data-fade-up>
        <Container width="wide">
          <p className={styles.eyebrow}>Process</p>
          <h2 className={styles.title}>From Idea to Launch</h2>
          <MobileAppProcess />
        </Container>
      </section>

      <PageCta
        eyebrow="Next step"
        title="Have a Mobile App Idea?"
        accentWords={['Mobile', 'App']}
        support="From product planning and UI/UX to engineering, launch and scaling, Mernify helps turn mobile app ideas into production-ready products."
        actions={
          <>
            <Button as={Link} to="/contact" variant="ghost" size="lg">
              Discuss Your App
            </Button>
            <Button as={Link} to="/contact" variant="secondary" size="lg">
              Contact Mernify
            </Button>
          </>
        }
      />
    </div>
  )
}
