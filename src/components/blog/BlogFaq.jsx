import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import styles from './BlogFaq.module.css'

export function BlogFaq({ items, title = 'Frequently asked questions' }) {
  const [openId, setOpenId] = useState(0)

  if (!items?.length) return null

  return (
    <section className={styles.section} aria-labelledby="blog-faq-title">
      <h2 id="blog-faq-title" className={styles.title}>
        {title}
      </h2>
      <div className={styles.list}>
        {items.map((item, index) => {
          const isOpen = openId === index
          return (
            <div
              key={item.question}
              className={[styles.item, isOpen ? styles.itemOpen : ''].filter(Boolean).join(' ')}
            >
              <button
                type="button"
                className={styles.trigger}
                aria-expanded={isOpen}
                onClick={() => setOpenId(isOpen ? -1 : index)}
              >
                <span>{item.question}</span>
                <ChevronDown size={18} className={styles.chevron} aria-hidden="true" />
              </button>
              <div className={styles.panel} role="region" hidden={!isOpen}>
                <p>{item.answer}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
