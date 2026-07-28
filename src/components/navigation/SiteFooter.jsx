import { Link } from 'react-router-dom'
import { Button, Container, LogoMark, Text } from '@/components/ui'
import { industries } from '@/content/industries'
import { footerCompany, footerLegal, primaryCta } from '@/content/navigation'
import { services } from '@/content/services'
import { SITE } from '@/constants/site'
import styles from './SiteFooter.module.css'

const footerIndustries = industries.slice(0, 6)
const featuredServices = services.slice(0, 6)

function ChevronIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M5 3L9 7L5 11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer} data-header-theme="dark">
      <Container>
        <div className={styles.ctaBand}>
          <div className={styles.ctaCopy}>
            <p className={styles.ctaEyebrow}>Start a conversation</p>
            <h2 className={styles.ctaTitle}>Ready to discuss your next product?</h2>
            <Text className={styles.ctaSupport}>
              Share the idea, operational challenge, or existing product. We’ll help turn it into a
              scalable digital experience.
            </Text>
          </div>
          <div className={styles.ctaActions}>
            <Button as={Link} to={primaryCta.to} size="lg" arrow magnetic>
              {primaryCta.label}
            </Button>
            <a className={styles.emailLink} href={`mailto:${SITE.email}`}>
              {SITE.email}
            </a>
          </div>
        </div>

        <div className={styles.top}>
          <div className={styles.brand}>
            <LogoMark inverted />
            <Text className={styles.positioning}>{SITE.positioning}</Text>
            <Text className={styles.promise}>{SITE.promise}</Text>
          </div>

          <div className={styles.columns}>
            <div>
              <p className={styles.columnTitle}>Services</p>
              <ul className={styles.list}>
                {featuredServices.map((item) => (
                  <li key={item.slug}>
                    <Link to={`/services/${item.slug}`} className={styles.columnLink}>
                      <span>{item.shortTitle || item.title}</span>
                      <ChevronIcon />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className={styles.columnTitle}>Industries</p>
              <ul className={styles.list}>
                {footerIndustries.map((item) => (
                  <li key={item.slug}>
                    <Link to={`/industries#${item.slug}`} className={styles.columnLink}>
                      <span>{item.title}</span>
                      <ChevronIcon />
                    </Link>
                  </li>
                ))}
                <li>
                  <Link to="/industries" className={styles.columnLink}>
                    <span>All industries</span>
                    <ChevronIcon />
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className={styles.columnTitle}>Company</p>
              <ul className={styles.list}>
                {footerCompany.map((item) => (
                  <li key={item.to}>
                    <Link to={item.to} className={styles.columnLink}>
                      <span>{item.label}</span>
                      <ChevronIcon />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.markRow} aria-hidden="true">
          <p className={styles.displayMark}>{SITE.name}</p>
        </div>

        <div className={styles.bottom}>
          <p>
            © {year} {SITE.name}
          </p>
          <div className={styles.legal}>
            {footerLegal.map((item) => (
              <Link key={item.to} to={item.to}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  )
}
