import { Link } from 'react-router-dom'
import { Container, LogoMark, Text } from '@/components/ui'
import { navigation } from '@/content/navigation'
import { SITE } from '@/constants/site'
import styles from './SiteFooter.module.css'

const serviceLinks = [
  { label: 'Web & SaaS', to: '/services' },
  { label: 'Mobile Apps', to: '/services' },
  { label: 'AI & Automation', to: '/services' },
  { label: 'Product Design', to: '/services' },
  { label: 'Support', to: '/services' },
]

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer} data-header-theme="dark">
      <Container>
        <div className={styles.top}>
          <div className={styles.brand}>
            <LogoMark inverted />
            <Text className={styles.promise}>{SITE.promise}</Text>
          </div>

          <div className={styles.columns}>
            <div>
              <p className={styles.columnTitle}>Company</p>
              <ul className={styles.list}>
                {navigation.map((item) => (
                  <li key={item.to}>
                    <Link to={item.to}>{item.label}</Link>
                  </li>
                ))}
                <li>
                  <Link to="/process">Process</Link>
                </li>
              </ul>
            </div>
            <div>
              <p className={styles.columnTitle}>Services</p>
              <ul className={styles.list}>
                {serviceLinks.map((item) => (
                  <li key={item.label}>
                    <Link to={item.to}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>© {year} {SITE.name}</p>
          <div className={styles.legal}>
            <span>Privacy</span>
            <span>Terms</span>
          </div>
        </div>
      </Container>
    </footer>
  )
}
