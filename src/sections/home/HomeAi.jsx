import { useCallback, useEffect, useRef, useState } from 'react'
import { Container, Section } from '@/components/ui'
import { useReducedMotion } from '@/app/providers/useReducedMotion'
import styles from './HomeAi.module.css'

const SCENARIOS = [
  { id: 'support', label: 'Customer Support' },
  { id: 'docs', label: 'Document Processing' },
  { id: 'sales', label: 'Sales Qualification' },
  { id: 'ops', label: 'Operations Assistant' },
  { id: 'search', label: 'Intelligent Search' },
  { id: 'workflow', label: 'Workflow Automation' },
]

const STEPS = {
  support: [
    { id: 1, title: 'Request arrives', desc: 'Customer message received via web, email, or chat.', type: 'input' },
    { id: 2, title: 'Intent classified', desc: 'AI identifies topic, urgency, and account context.', type: 'ai' },
    { id: 3, title: 'Context retrieved', desc: 'Relevant order history, tickets, and policies retrieved.', type: 'data' },
    { id: 4, title: 'Response drafted', desc: 'AI composes a personalised, accurate response.', type: 'ai' },
    { id: 5, title: 'Human review', desc: 'Agent reviews draft. Approves, edits, or escalates.', type: 'human' },
    { id: 6, title: 'System updated', desc: 'CRM, ticket, and conversation log updated automatically.', type: 'system' },
    { id: 7, title: 'Resolution tracked', desc: 'CSAT, resolution time, and topic data captured.', type: 'output' },
  ],
  docs: [
    { id: 1, title: 'Document received', desc: 'File arrives via upload, email, or API integration.', type: 'input' },
    { id: 2, title: 'Document parsed', desc: 'AI extracts structure, entities, and key data fields.', type: 'ai' },
    { id: 3, title: 'Validation rules applied', desc: 'Extracted data checked against business rules and schema.', type: 'data' },
    { id: 4, title: 'Action recommended', desc: 'AI suggests next step: approve, reject, or escalate.', type: 'ai' },
    { id: 5, title: 'Human decision', desc: 'Operator reviews recommendation and confirms action.', type: 'human' },
    { id: 6, title: 'Systems updated', desc: 'ERP, CRM, or workflow system updated with outcome.', type: 'system' },
    { id: 7, title: 'Audit logged', desc: 'Full decision trail recorded for compliance review.', type: 'output' },
  ],
  sales: [
    { id: 1, title: 'Lead arrives', desc: 'New prospect from form, integration, or import.', type: 'input' },
    { id: 2, title: 'Signal analysis', desc: 'AI evaluates behaviour, company fit, and intent signals.', type: 'ai' },
    { id: 3, title: 'Data enriched', desc: 'Company size, industry, and contact data retrieved.', type: 'data' },
    { id: 4, title: 'Score & route', desc: 'Lead scored and routed to appropriate rep or sequence.', type: 'ai' },
    { id: 5, title: 'Rep confirms', desc: 'Sales rep reviews and confirms the qualification.', type: 'human' },
    { id: 6, title: 'CRM updated', desc: 'Deal stage, owner, and next action set automatically.', type: 'system' },
    { id: 7, title: 'Pipeline tracked', desc: 'Conversion, velocity, and source data captured.', type: 'output' },
  ],
  ops: [
    { id: 1, title: 'Request submitted', desc: 'Internal team member submits operational request.', type: 'input' },
    { id: 2, title: 'Request interpreted', desc: 'AI parses intent, links to relevant process and data.', type: 'ai' },
    { id: 3, title: 'Resources identified', desc: 'Relevant knowledge, availability, and cost data retrieved.', type: 'data' },
    { id: 4, title: 'Action drafted', desc: 'AI prepares response and recommended next step.', type: 'ai' },
    { id: 5, title: 'Manager approves', desc: 'Operations manager reviews and approves or adjusts.', type: 'human' },
    { id: 6, title: 'Workflows triggered', desc: 'Connected systems notified, tasks created, calendar updated.', type: 'system' },
    { id: 7, title: 'Outcome measured', desc: 'Efficiency, cost, and completion metrics recorded.', type: 'output' },
  ],
  search: [
    { id: 1, title: 'Query received', desc: 'User enters a natural language question or search.', type: 'input' },
    { id: 2, title: 'Intent understood', desc: 'AI maps query to knowledge graph and context.', type: 'ai' },
    { id: 3, title: 'Sources searched', desc: 'Relevant documents, databases, and APIs queried.', type: 'data' },
    { id: 4, title: 'Answer composed', desc: 'AI synthesises results into a direct, sourced response.', type: 'ai' },
    { id: 5, title: 'Accuracy verified', desc: 'Sources surfaced for human validation if needed.', type: 'human' },
    { id: 6, title: 'Feedback captured', desc: 'Useful / not useful signals recorded for improvement.', type: 'system' },
    { id: 7, title: 'Knowledge improved', desc: 'Low-confidence answers flagged for knowledge base update.', type: 'output' },
  ],
  workflow: [
    { id: 1, title: 'Trigger fires', desc: 'Event occurs in connected system — new record, status change, or schedule.', type: 'input' },
    { id: 2, title: 'Condition evaluated', desc: 'AI evaluates rules, anomalies, and priority signals.', type: 'ai' },
    { id: 3, title: 'Data gathered', desc: 'Relevant context pulled from connected data sources.', type: 'data' },
    { id: 4, title: 'Automation prepared', desc: 'Next automated action prepared with all required parameters.', type: 'ai' },
    { id: 5, title: 'Exception reviewed', desc: 'Exceptions or uncertain cases routed for human review.', type: 'human' },
    { id: 6, title: 'Action executed', desc: 'Approved automation runs across connected systems.', type: 'system' },
    { id: 7, title: 'Cycle measured', desc: 'Cycle time, error rate, and business impact tracked.', type: 'output' },
  ],
}

const TYPE_LABELS = {
  input: { label: 'Input', color: 'cyan' },
  ai: { label: 'AI', color: 'indigo' },
  data: { label: 'Data', color: 'purple' },
  human: { label: 'Human', color: 'success' },
  system: { label: 'System', color: 'cyan' },
  output: { label: 'Output', color: 'indigo' },
}

export function HomeAi() {
  const [scenario, setScenario] = useState('support')
  const [activeStep, setActiveStep] = useState(0)
  const [playing, setPlaying] = useState(true)
  const timerRef = useRef(null)
  const { prefersReducedMotion } = useReducedMotion()

  const steps = STEPS[scenario]
  const total = steps.length

  const advance = useCallback(() => {
    setActiveStep((s) => (s + 1) % total)
  }, [total])

  useEffect(() => {
    if (!playing || prefersReducedMotion) return undefined
    timerRef.current = setInterval(advance, 1800)
    return () => clearInterval(timerRef.current)
  }, [playing, advance, prefersReducedMotion])

  // Reset on scenario change
  useEffect(() => {
    setActiveStep(0)
    setPlaying(true)
  }, [scenario])

  // No scrollIntoView — all steps are visible in the panel simultaneously

  const handleStepClick = (i) => {
    setActiveStep(i)
    setPlaying(false)
  }

  return (
    <Section tone="dark" aria-labelledby="ai-title">
      <Container>
        <div className={styles.header}>
          <p className={styles.eyebrow}>AI capabilities</p>
          <h2 id="ai-title" className={styles.title}>
            AI That Works Inside<br />the Business
          </h2>
          <p className={styles.support}>
            Select a workflow to see how Mernify integrates AI into real operational processes —
            with human approval and measurable outcomes at every step.
          </p>
        </div>

        {/* Scenario selector */}
        <div className={styles.scenarios} role="tablist" aria-label="AI scenario">
          {SCENARIOS.map((s) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={scenario === s.id}
              className={[styles.scenarioBtn, scenario === s.id ? styles.scenarioBtnActive : ''].join(' ')}
              onClick={() => setScenario(s.id)}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Workflow pipeline */}
        <div className={styles.pipeline} role="tabpanel" aria-label={`Workflow: ${scenario}`}>
          {/* Step list */}
          <div className={styles.steps}>
            {steps.map((step, i) => {
              const typeInfo = TYPE_LABELS[step.type]
              const isActive = activeStep === i
              const isPast = i < activeStep
              return (
                <button
                  key={`${scenario}-${step.id}`}
                  type="button"
                  data-active={isActive}
                  aria-pressed={isActive}
                  className={[
                    styles.step,
                    isActive ? styles.stepActive : '',
                    isPast ? styles.stepPast : '',
                  ].filter(Boolean).join(' ')}
                  onClick={() => handleStepClick(i)}
                >
                  <div className={styles.stepLeft}>
                    <span className={[styles.stepDot, styles[`dot-${typeInfo.color}`]].join(' ')} />
                    {i < steps.length - 1 && (
                      <span
                        className={[styles.stepConnector, isPast || isActive ? styles.stepConnectorFilled : ''].join(' ')}
                      />
                    )}
                  </div>
                  <div className={styles.stepBody}>
                    <div className={styles.stepMeta}>
                      <span className={styles.stepNum}>Step {step.id}</span>
                      <span className={[styles.stepType, styles[`type-${typeInfo.color}`]].join(' ')}>
                        {typeInfo.label}
                      </span>
                      {step.type === 'human' && (
                        <span className={styles.humanBadge}>Approval required</span>
                      )}
                    </div>
                    <strong className={styles.stepTitle}>{step.title}</strong>
                    {isActive && (
                      <p className={styles.stepDesc}>{step.desc}</p>
                    )}
                  </div>
                </button>
              )
            })}
          </div>

          {/* Controls */}
          <div className={styles.controls}>
            <button
              type="button"
              className={styles.playBtn}
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? 'Pause workflow' : 'Play workflow'}
            >
              {playing ? (
                <PauseIcon />
              ) : (
                <PlayIcon />
              )}
              {playing ? 'Pause' : 'Play'}
            </button>
            <span className={styles.progress}>
              Step {activeStep + 1} of {total}
            </span>
            <p className={styles.disclaimer}>
              Interactive product demonstration — not a live production system.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  )
}

function PlayIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M3 2l9 5-9 5V2z" fill="currentColor" />
    </svg>
  )
}

function PauseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <rect x="3" y="2" width="3" height="10" rx="1" fill="currentColor" />
      <rect x="8" y="2" width="3" height="10" rx="1" fill="currentColor" />
    </svg>
  )
}
