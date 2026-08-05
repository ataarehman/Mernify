import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Container, Eyebrow } from '@/components/ui'
import { processPage } from '@/content/process'
import styles from './ProcessFaq.module.css'

export function ProcessFaq() {
  const { eyebrow, title, items } = processPage.faq
  const [openId, setOpenId] = useState(0)

  return (
    <section
      className={styles.section}
      data-header-theme="light"
      aria-labelledby="process-faq-title"
    >
      <Container width="wide" className={styles.shell}>
        <header className={styles.header} data-fade-up>
          <Eyebrow rule className={styles.eyebrow}>
            {eyebrow}
          </Eyebrow>
          <h2 id="process-faq-title" className={styles.title}>
            {title}
          </h2>
        </header>

        <div className={styles.list} data-fade-up data-delay="80">
          {items.map((item, index) => {
            const isOpen = openId === index
            return (
              <div
                key={item.q}
                className={[styles.item, isOpen ? styles.itemOpen : ''].filter(Boolean).join(' ')}
              >
                <button
                  type="button"
                  className={styles.trigger}
                  aria-expanded={isOpen}
                  onClick={() => setOpenId(isOpen ? -1 : index)}
                >
                  <span>{item.q}</span>
                  <ChevronDown size={20} className={styles.chevron} aria-hidden="true" />
                </button>
                <div className={styles.panel} role="region" hidden={!isOpen}>
                  <p>{item.a}</p>
                </div>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
