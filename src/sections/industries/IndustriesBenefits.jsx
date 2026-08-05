import { GitBranch, KeyRound, LifeBuoy, ScanSearch, ShieldCheck, UsersRound } from 'lucide-react'
import { Container, Eyebrow } from '@/components/ui'
import { industriesPage } from '@/content/industries'
import styles from './IndustriesBenefits.module.css'

const BENEFIT_ICONS = {
  senior: UsersRound,
  discovery: ScanSearch,
  cadence: GitBranch,
  scale: ShieldCheck,
  ownership: KeyRound,
  aftercare: LifeBuoy,
}

export function IndustriesBenefits() {
  const { eyebrow, title, support, items } = industriesPage.benefits

  return (
    <section
      className={styles.section}
      data-header-theme="light"
      aria-labelledby="industries-benefits-title"
    >
      <Container width="wide" className={styles.inner}>
        <header className={styles.head} data-fade-up>
          <Eyebrow rule className={styles.eyebrow}>
            {eyebrow}
          </Eyebrow>
          <h2 id="industries-benefits-title" className={styles.title}>
            {title}
          </h2>
          <p className={styles.support}>{support}</p>
        </header>

        <ul className={styles.grid} role="list">
          {items.map((item, index) => {
            const Icon = BENEFIT_ICONS[item.icon] || ShieldCheck
            return (
              <li
                key={item.id}
                className={styles.card}
                data-fade-up
                data-delay={String((index % 3) * 90)}
              >
                <span className={styles.icon} aria-hidden="true">
                  <Icon size={20} strokeWidth={1.9} />
                </span>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardText}>{item.text}</p>
              </li>
            )
          })}
        </ul>
      </Container>
    </section>
  )
}
