import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { PageHero } from '@/components/layout/PageHero'
import { PageCta } from '@/components/layout/PageCta'
import { MediaStrip } from '@/components/layout/MediaStrip'
import { TechBrandGrid } from '@/components/layout/TechBrandGrid'
import { PageMeta } from '@/components/seo/PageMeta'
import { Container } from '@/components/ui'
import { aboutContent } from '@/content/pages'
import styles from './AboutPage.module.css'

const CAPABILITIES = [
  {
    title: 'Product Engineering',
    text: 'End-to-end path from validated scope to maintainable release.',
  },
  {
    title: 'SaaS and Web Platforms',
    text: 'Multi-tenant platforms, portals, and APIs prepared for growth.',
  },
  {
    title: 'AI and Automation',
    text: 'Practical AI and workflow automation embedded in real products.',
  },
  {
    title: 'Dedicated Product Teams',
    text: 'Focused engineering pods with clear ownership after launch.',
  },
]

const PRINCIPLES = [
  { title: 'Build', text: 'Ship reliable software with clear ownership.' },
  { title: 'Clear', text: 'Communicate scope, risks, and progress plainly.' },
  { title: 'Focus', text: 'Prioritize outcomes over busywork and vanity tech.' },
  { title: 'Scale', text: 'Design for users, features, and integrations ahead.' },
]

export function AboutPage() {
  return (
    <>
      <PageMeta title="About" description={aboutContent.lead} canonicalPath="/about" />
      <PageHero
        title="About Mernify"
        support={
          <>
            We are <span className={styles.accent}>“Mernify”</span> — a modern software development
            partner for products that need to last
          </>
        }
      />

      <MediaStrip src="/assets/images/thumbs/thumbnail-bg.jpg" height="tall" />

      <section className={styles.about} data-header-theme="light">
        <Container width="wide">
          <div className={styles.topRow}>
            <div className={styles.markWrap}>
              <img src="/assets/images/logo/favicon.svg" alt="" className={styles.mark} />
            </div>
            <h2 className={styles.leadTitle}>
              A modern software development partner for products that need to{' '}
              <span className={styles.accent}>last</span> — combining engineering, product thinking,
              and structured delivery
            </h2>
          </div>

          <div className={styles.lowerRow}>
            <div className={styles.thumb}>
              <img src="/assets/images/thumbs/about-ip-thumb.jpg" alt="" />
            </div>
            <ul className={styles.capList} role="list">
              {CAPABILITIES.map((item, index) => (
                <li key={item.title} className={styles.capItem}>
                  <span className={styles.capIndex}>{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                  <Link to="/services" className={styles.capLink} aria-label={item.title}>
                    <ArrowUpRight size={22} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className={styles.principles} data-header-theme="dark">
        <Container width="wide">
          <h2 className={styles.principlesTitle}>
            How we partner with teams to ship reliable digital{' '}
            <span className={styles.accent}>products</span> that drive growth
          </h2>
          <div className={styles.principlesGrid}>
            {PRINCIPLES.map((item) => (
              <article key={item.title} className={styles.principleCard}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className={styles.values} data-header-theme="light">
        <Container width="wide">
          <div className={styles.valuesIntro}>
            <h2>Mission, vision & values</h2>
            <p>{aboutContent.promise}</p>
          </div>
          <div className={styles.mvGrid}>
            <article>
              <h3>Mission</h3>
              <p>{aboutContent.mission}</p>
            </article>
            <article>
              <h3>Vision</h3>
              <p>{aboutContent.vision}</p>
            </article>
          </div>
          <ul className={styles.valueList} role="list">
            {aboutContent.values.map((item, index) => (
              <li key={item.title}>
                <img
                  src={`/assets/images/thumbs/team-ip-thumb${(index % 6) + 1}.png`}
                  alt=""
                />
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className={styles.audiences}>
            <h3>Who we work with</h3>
            <ul role="list">
              {aboutContent.audiences.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <MediaStrip src="/assets/images/thumbs/thumbnail-ab-bg.jpg" />
      <TechBrandGrid />
      <PageCta
        title="Ready to build your next digital product? Drop us a message, and let’s start engineering something reliable and scalable."
        accentWords={['message', 'scalable']}
      />
    </>
  )
}
