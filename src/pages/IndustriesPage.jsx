import { PageHero } from '@/components/layout/PageHero'
import { PageCta } from '@/components/layout/PageCta'
import { PageMeta } from '@/components/seo/PageMeta'
import { Container } from '@/components/ui'
import { homeIndustries, industries } from '@/content/industries'
import { INDUSTRY_IMAGES } from '@/lib/templateMedia'
import styles from './IndustriesPage.module.css'

export function IndustriesPage() {
  return (
    <>
      <PageMeta
        title="Industries"
        description="Domain-aware product patterns for healthcare, logistics, field service, and more—without implied credentials."
        canonicalPath="/industries"
      />
      <PageHero
        title="Industries"
        support={
          <>
            One platform mindset. Every <span className={styles.accent}>industry</span> challenge.
          </>
        }
      />
      <section className={styles.section} data-header-theme="light">
        <Container width="wide">
          <p className={styles.disclaimer}>{homeIndustries.disclaimer}</p>
          <div className={styles.list}>
            {industries.map((item, index) => (
              <article key={item.slug} id={item.slug} className={styles.card}>
                <div className={styles.media}>
                  <img src={INDUSTRY_IMAGES[index % INDUSTRY_IMAGES.length]} alt="" />
                </div>
                <div className={styles.copy}>
                  <h2>{item.title}</h2>
                  <p>{item.summary}</p>
                  <div className={styles.focus}>
                    <p className={styles.focusLabel}>Typical focus areas</p>
                    <ul role="list">
                      {item.focus.map((focus) => (
                        <li key={focus}>{focus}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>
      <PageCta
        title="Ready to build your next digital product? Drop us a message, and let’s start engineering something reliable and scalable."
        accentWords={['message', 'scalable']}
      />
    </>
  )
}
