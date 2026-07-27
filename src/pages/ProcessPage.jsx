import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'
import { PageHero } from '@/components/layout/PageHero'
import { PageMeta } from '@/components/seo/PageMeta'
import { Button, Container, Section, Text } from '@/components/ui'
import { homeProcess, processSteps } from '@/content/process'
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
        eyebrow={homeProcess.eyebrow}
        title={homeProcess.title}
        support={homeProcess.support}
        actions={
          <Button as={Link} to="/contact?intent=discovery">
            Schedule a discovery call
          </Button>
        }
      />
      <Section tone="light" className={styles.section}>
        <Container>
          <ol className={styles.timeline}>
            {processSteps.map((step, index) => (
              <li key={step.id} className={styles.step}>
                <div className={styles.stepHead}>
                  <span className={styles.index}>{String(index + 1).padStart(2, '0')}</span>
                  <h2>{step.title}</h2>
                </div>
                <Text muted className={styles.summary}>
                  {step.summary}
                </Text>
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
      </Section>
    </>
  )
}
