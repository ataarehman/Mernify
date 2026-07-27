import { Link } from 'react-router-dom'
import { Container, LogoMark, Text } from '@/components/ui'
import { industries } from '@/content/industries'
import { footerCompany, footerLegal } from '@/content/navigation'
import { services } from '@/content/services'
import { SITE } from '@/constants/site'
import styles from './SiteFooter.module.css'

const footerIndustries = industries.slice(0, 6)

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer} data-header-theme="dark">
      <Container>
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
                {services.map((item) => (
                  <li key={item.slug}>
                    <Link to={`/services/${item.slug}`}>{item.shortTitle || item.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className={styles.columnTitle}>Industries</p>
              <ul className={styles.list}>
                {footerIndustries.map((item) => (
                  <li key={item.slug}>
                    <Link to={`/industries#${item.slug}`}>{item.title}</Link>
                  </li>
                ))}
                <li>
                  <Link to="/industries">All industries</Link>
                </li>
              </ul>
            </div>
            <div>
              <p className={styles.columnTitle}>Company</p>
              <ul className={styles.list}>
                {footerCompany.map((item) => (
                  <li key={item.to}>
                    <Link to={item.to}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className={styles.columnTitle}>Contact</p>
              <ul className={styles.list}>
                <li>
                  <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
                </li>
                <li>
                  <Link to="/contact">Contact form</Link>
                </li>
              </ul>
            </div>
          </div>
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
