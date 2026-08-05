import { CalendarCheck, ClipboardCheck, MessageSquare, Users } from 'lucide-react'
import { Container, Eyebrow } from '@/components/ui'
import { processPage } from '@/content/process'
import styles from './ProcessCollab.module.css'

const ICONS = {
  sync: CalendarCheck,
  async: MessageSquare,
  review: ClipboardCheck,
  access: Users,
}

export function ProcessCollab() {
  const { eyebrow, title, support, channels } = processPage.collaboration

  return (
    <section
      className={styles.section}
      data-header-theme="light"
      aria-labelledby="process-collab-title"
    >
      <Container width="wide" className={styles.inner}>
        <header className={styles.head} data-fade-up>
          <Eyebrow rule className={styles.eyebrow}>
            {eyebrow}
          </Eyebrow>
          <h2 id="process-collab-title" className={styles.title}>
            {title}
          </h2>
          <p className={styles.support}>{support}</p>
        </header>

        <ol className={styles.flow}>
          {channels.map((channel, index) => {
            const Icon = ICONS[channel.id] || MessageSquare
            const isLast = index === channels.length - 1
            return (
              <li
                key={channel.id}
                className={styles.item}
                data-fade-up
                data-delay={String(80 + index * 90)}
              >
                <div className={styles.marker} aria-hidden="true">
                  <span className={styles.node}>
                    <Icon size={18} strokeWidth={1.9} />
                  </span>
                  {!isLast ? <span className={styles.connector} /> : null}
                </div>
                <article className={styles.card}>
                  <span className={styles.step}>{String(index + 1).padStart(2, '0')}</span>
                  <h3 className={styles.cardTitle}>{channel.title}</h3>
                  <p className={styles.cardText}>{channel.text}</p>
                </article>
              </li>
            )
          })}
        </ol>
      </Container>
    </section>
  )
}
