import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'
import { PageHero } from '@/components/layout/PageHero'
import { PageCta } from '@/components/layout/PageCta'
import { PageMeta } from '@/components/seo/PageMeta'
import { Button, Container } from '@/components/ui'
import { homeProcess, processSteps } from '@/content/process'
import { PROCESS_ICONS } from '@/lib/templateMedia'
import styles from './ProcessPage.module.css'

export function ProcessPage() {
  return (
    <>
      <PageMeta
        title="Process"
        description="Discover, plan, design, develop, test, launch, and improve—with tangible outputs at every stage."
        canonicalPath="/process"
      />
      <PageHero
        title="Process"
        support={
          <>
            A clear path from discovery to continuous{' '}
            <span className={styles.accent}>improvement</span>
          </>
        }
        actions={
          <Button as={Link} to="/contact?intent=discovery">
            Schedule a discovery call
          </Button>
        }
      />

      <section className={styles.section} data-header-theme="dark">
        <Container width="wide">
          <p className={styles.support}>{homeProcess.support}</p>
          <ol className={styles.timeline}>
            {processSteps.map((step, index) => (
              <li key={step.id} className={styles.step}>
                <span className={styles.badge}>Step {String(index + 1).padStart(2, '0')}</span>
                <div className={styles.icon}>
                  <img
                    src={PROCESS_ICONS[index % PROCESS_ICONS.length]}
                    alt=""
                    width={48}
                    height={48}
                  />
                </div>
                <h2>{step.title}</h2>
                <p className={styles.summary}>{step.summary}</p>
                <div className={styles.outputs}>
                  <p className={styles.outputsLabel}>Outputs</p>
                  <ul role="list">
                    {step.outputs.map((output) => (
                      <li key={output}>
                        <Check size={16} aria-hidden="true" />
                        <span>{output}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <PageCta
        title="Ready to build your next digital product? Drop us a message, and let’s start engineering something reliable and scalable."
        accentWords={['message', 'scalable']}
      />
    </>
  )
}
