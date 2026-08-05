import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Blocks,
  BookMarked,
  FlaskConical,
  GitBranch,
  GitPullRequest,
  RefreshCw,
  Workflow,
} from 'lucide-react'
import { Container, Eyebrow } from '@/components/ui'
import { processPage } from '@/content/process'
import { getCategoryTools } from '@/lib/techStack'
import { useReducedMotion } from '@/app/providers/useReducedMotion'
import styles from './ProcessMethods.module.css'

gsap.registerPlugin(ScrollTrigger)

const PRACTICE_ICONS = {
  agile: RefreshCw,
  trunk: GitBranch,
  review: GitPullRequest,
  tests: FlaskConical,
  cd: Workflow,
  adr: BookMarked,
}

export function ProcessMethods() {
  const { eyebrow, title, support, practices, categories, note } = processPage.methods
  const sectionRef = useRef(null)
  const { prefersReducedMotion } = useReducedMotion()

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section || prefersReducedMotion) return undefined

    const ctx = gsap.context(() => {
      section.querySelectorAll('[data-tool-grid]').forEach((grid) => {
        gsap.from(grid.children, {
          autoAlpha: 0,
          y: 14,
          scale: 0.94,
          duration: 0.5,
          ease: 'power2.out',
          stagger: 0.04,
          scrollTrigger: { trigger: grid, start: 'top 92%', once: true },
        })
      })

      section.querySelectorAll('[data-drift]').forEach((orb, index) => {
        gsap.to(orb, {
          yPercent: index % 2 === 0 ? -14 : 12,
          ease: 'none',
          scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 1 },
        })
      })
    }, section)

    return () => ctx.revert()
  }, [prefersReducedMotion])

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      data-header-theme="dark"
      aria-labelledby="process-methods-title"
    >
      <div className={styles.atmosphere} aria-hidden="true">
        <span className={styles.mesh} />
        <span className={styles.orbCyan} data-drift />
        <span className={styles.orbIndigo} data-drift />
      </div>

      <Container width="wide" className={styles.inner}>
        <header className={styles.head} data-fade-up>
          <div className={styles.headCopy}>
            <Eyebrow rule className={styles.eyebrow}>
              {eyebrow}
            </Eyebrow>
            <h2 id="process-methods-title" className={styles.title}>
              {title}
            </h2>
          </div>
          <p className={styles.support}>{support}</p>
        </header>

        <div className={styles.bento}>
          <article className={styles.practices} data-fade-up data-delay="80">
            <div className={styles.cardHead}>
              <span className={styles.badge} aria-hidden="true">
                <Blocks size={20} strokeWidth={1.7} />
              </span>
              <div className={styles.cardHeadCopy}>
                <h3 className={styles.cardTitle}>{practices.title}</h3>
                <p className={styles.why}>{practices.why}</p>
              </div>
            </div>

            <ul className={styles.practiceList} role="list">
              {practices.items.map((item) => {
                const Icon = PRACTICE_ICONS[item.id] || Workflow
                return (
                  <li key={item.id} className={styles.practice}>
                    <span className={styles.practiceIcon} aria-hidden="true">
                      <Icon size={16} strokeWidth={1.8} />
                    </span>
                    <h4 className={styles.practiceName}>{item.name}</h4>
                    <p className={styles.practiceNote}>{item.note}</p>
                  </li>
                )
              })}
            </ul>
          </article>

          {categories.map((category, index) => {
            const tools = getCategoryTools(category.id)
            return (
              <article
                key={category.id}
                className={styles.card}
                data-span={String(category.span)}
                data-fade-up
                data-delay={String(120 + index * 60)}
              >
                <div className={styles.cardTop}>
                  <h3 className={styles.cardTitle}>{category.title}</h3>
                  <span className={styles.count}>{tools.length}</span>
                </div>
                <p className={styles.why}>{category.why}</p>

                <ul className={styles.tools} role="list" data-tool-grid>
                  {tools.map((tool) => {
                    const { Icon } = tool
                    return (
                      <li
                        key={tool.name}
                        className={styles.tool}
                        style={{ '--brand': tool.brand }}
                      >
                        <span className={styles.toolMark}>
                          <Icon size={22} aria-hidden="true" focusable="false" />
                        </span>
                        <span className={styles.toolName}>{tool.name}</span>
                      </li>
                    )
                  })}
                </ul>
              </article>
            )
          })}
        </div>

        <p className={styles.note} data-fade-up>
          {note}
        </p>
      </Container>
    </section>
  )
}
