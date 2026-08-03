import { useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Container } from '@/components/ui'
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll'
import styles from './ServiceFaq.module.css'

export function ServiceFaq({ content }) {
  const rootRef = useRef(null)
  const items = content.items || []
  const [openId, setOpenId] = useState(0)

  useRevealOnScroll(rootRef, { selector: '[data-fade-up]', start: 'top 88%', y: 28 })

  if (!items.length) return null

  return (
    <section
      ref={rootRef}
      className={styles.section}
      data-header-theme="light"
      aria-labelledby="service-faq-title"
    >
      <Container width="wide" className={styles.shell}>
        <header className={styles.header} data-fade-up>
          <p className={styles.eyebrow}>{content.eyebrow}</p>
          <h2 id="service-faq-title" className={styles.title}>
            {content.title}
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
                <div
                  className={styles.panel}
                  role="region"
                  hidden={!isOpen}
                >
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
