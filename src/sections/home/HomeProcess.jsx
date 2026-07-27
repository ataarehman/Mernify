import { useCallback, useState } from 'react'
import { Check } from 'lucide-react'
import { Container, Eyebrow, Heading, Section, Text } from '@/components/ui'
import { homeProcess } from '@/content/process'
import styles from './HomeProcess.module.css'

export function HomeProcess() {
  const [activeIndex, setActiveIndex] = useState(0)
  const steps = homeProcess.steps
  const activeStep = steps[activeIndex]

  const onTabKeyDown = useCallback(
    (event, index) => {
      let next = index
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        event.preventDefault()
        next = (index + 1) % steps.length
      } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        event.preventDefault()
        next = (index - 1 + steps.length) % steps.length
      } else if (event.key === 'Home') {
        event.preventDefault()
        next = 0
      } else if (event.key === 'End') {
        event.preventDefault()
        next = steps.length - 1
      } else {
        return
      }
      setActiveIndex(next)
      document.getElementById(`process-tab-${steps[next].id}`)?.focus()
    },
    [steps],
  )

  return (
    <Section tone="dark" className={styles.section} aria-labelledby="home-process-title">
      <Container>
        <div className={styles.header}>
          <Eyebrow className={styles.eyebrow}>{homeProcess.eyebrow}</Eyebrow>
          <Heading id="home-process-title" level={2}>
            {homeProcess.title}
          </Heading>
          <Text className={styles.support}>{homeProcess.support}</Text>
        </div>

        <div className={styles.layout}>
          <div
            role="tablist"
            aria-label="Process stages"
            className={styles.tabs}
          >
            {steps.map((step, index) => {
              const selected = activeIndex === index
              return (
                <button
                  key={step.id}
                  type="button"
                  role="tab"
                  id={`process-tab-${step.id}`}
                  aria-selected={selected}
                  aria-controls={`process-panel-${step.id}`}
                  tabIndex={selected ? 0 : -1}
                  className={[styles.tab, selected ? styles.tabActive : ''].filter(Boolean).join(' ')}
                  onClick={() => setActiveIndex(index)}
                  onKeyDown={(event) => onTabKeyDown(event, index)}
                >
                  <span className={styles.tabIndex}>{String(index + 1).padStart(2, '0')}</span>
                  <span className={styles.tabLabel}>{step.title}</span>
                </button>
              )
            })}
          </div>

          {steps.map((step, index) => (
            <div
              key={step.id}
              role="tabpanel"
              id={`process-panel-${step.id}`}
              aria-labelledby={`process-tab-${step.id}`}
              hidden={activeIndex !== index}
              className={styles.panel}
            >
              <p className={styles.summary}>{step.summary}</p>
              <div className={styles.outputs}>
                <p className={styles.outputsLabel}>Stage outputs</p>
                <ul role="list">
                  {step.outputs.map((output) => (
                    <li key={output}>
                      <Check size={16} aria-hidden="true" />
                      <span>{output}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <p className={styles.mobileHint} aria-hidden="true">
          Currently viewing: {activeStep.title}
        </p>
      </Container>
    </Section>
  )
}
