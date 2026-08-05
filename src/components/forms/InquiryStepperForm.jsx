import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Briefcase,
  Building2,
  CalendarClock,
  Check,
  Mail,
  User,
  Wallet,
} from 'lucide-react'
import { Field, TextInput, TextArea, SelectInput } from '@/components/forms/Field'
import { Button } from '@/components/ui'
import { budgetRanges, serviceInterests } from '@/content/pages'
import { homeInquiry } from '@/content/home'
import { SITE } from '@/constants/site'
import { submitContactForm } from '@/lib/submitContactForm'
import styles from './InquiryStepperForm.module.css'

const STEPS = homeInquiry.steps

const initial = {
  name: '',
  email: '',
  company: '',
  service: '',
  budget: '',
  timeline: '',
  message: '',
  consent: false,
  website: '',
}

function validateStep(step, values) {
  const errors = {}
  if (step === 0) {
    if (!values.name.trim()) errors.name = 'Enter your name.'
    if (!values.email.trim()) errors.email = 'Enter your business email.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      errors.email = 'Enter a valid email address.'
    }
  }
  if (step === 1) {
    if (!values.service) errors.service = 'Select a service interest.'
  }
  if (step === 2) {
    if (!values.message.trim() || values.message.trim().length < 20) {
      errors.message = 'Add a bit more detail — a few sentences help us prepare.'
    }
    if (!values.consent) errors.consent = 'Consent is required to contact you.'
  }
  return errors
}

export function InquiryStepperForm() {
  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState(1)
  const [values, setValues] = useState(initial)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [statusMessage, setStatusMessage] = useState('')
  const panelRef = useRef(null)

  const progress = ((step + 1) / STEPS.length) * 100
  const canSubmit = useMemo(() => status !== 'loading', [status])

  useEffect(() => {
    const panel = panelRef.current
    if (!panel) return undefined
    panel.classList.remove(styles.enterForward, styles.enterBack)
    // Force reflow so the enter animation restarts on step change.
    void panel.offsetWidth
    panel.classList.add(direction >= 0 ? styles.enterForward : styles.enterBack)
    return undefined
  }, [step, direction])

  function onChange(event) {
    const { name, type, checked, value } = event.target
    setValues((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[name]
        return next
      })
    }
  }

  function goNext() {
    const nextErrors = validateStep(step, values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return
    setDirection(1)
    setStep((current) => Math.min(current + 1, STEPS.length - 1))
    setStatus('idle')
    setStatusMessage('')
  }

  function goBack() {
    setDirection(-1)
    setStep((current) => Math.max(current - 1, 0))
    setErrors({})
    setStatus('idle')
    setStatusMessage('')
  }

  async function onSubmit(event) {
    event.preventDefault()
    if (step < STEPS.length - 1) {
      goNext()
      return
    }

    const nextErrors = validateStep(step, values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) {
      setStatus('error')
      setStatusMessage('Please fix the highlighted fields.')
      return
    }

    if (values.website?.trim()) {
      setStatus('success')
      setStatusMessage(`Thanks — your message was sent. ${SITE.responseSla}`)
      setValues(initial)
      setErrors({})
      setStep(0)
      return
    }

    setStatus('loading')
    setStatusMessage('Sending...')
    try {
      const result = await submitContactForm({
        name: values.name.trim(),
        email: values.email.trim(),
        company: values.company.trim(),
        service: values.service,
        budget: values.budget,
        timeline: values.timeline.trim(),
        message: values.message.trim(),
        consent: true,
      })
      setStatus('success')
      setStatusMessage(
        result.mode === 'mailto'
          ? `Opening your email client with a draft message. If nothing opens, email ${SITE.email} directly. ${SITE.responseSla}`
          : `Thanks — your message was sent. ${SITE.responseSla}`,
      )
      setValues(initial)
      setErrors({})
      setStep(0)
    } catch (err) {
      setStatus('error')
      setStatusMessage(err?.message || `Something went wrong. Please email ${SITE.email}.`)
    }
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor="inquiry-website">Website</label>
        <input
          id="inquiry-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={onChange}
        />
      </div>
      <div className={styles.progressBlock}>
        <div className={styles.progressMeta}>
          <p className={styles.stepLabel}>
            Step {String(step + 1).padStart(2, '0')}
            <span> / {String(STEPS.length).padStart(2, '0')}</span>
          </p>
          <p className={styles.stepHint}>{STEPS[step].hint}</p>
        </div>
        <div className={styles.progressTrack} aria-hidden="true">
          <span className={styles.progressFill} style={{ width: `${progress}%` }} />
        </div>
        <ol className={styles.stepper} role="list">
          {STEPS.map((item, index) => {
            const done = index < step
            const current = index === step
            return (
              <li
                key={item.id}
                className={[
                  styles.stepItem,
                  done ? styles.stepDone : '',
                  current ? styles.stepCurrent : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                aria-current={current ? 'step' : undefined}
              >
                <span className={styles.stepDot}>
                  {done ? <Check size={14} strokeWidth={2.5} aria-hidden="true" /> : index + 1}
                </span>
                <span className={styles.stepName}>{item.label}</span>
              </li>
            )
          })}
        </ol>
      </div>

      <div className={styles.panelWrap}>
        <div ref={panelRef} className={styles.panel} key={step}>
          {step === 0 ? (
            <div className={styles.fields}>
              <Field id="inq-name" label="Full name" required error={errors.name}>
                <div className={styles.controlWrap}>
                  <User className={styles.icon} size={18} aria-hidden="true" />
                  <TextInput
                    id="inq-name"
                    name="name"
                    autoComplete="name"
                    value={values.name}
                    onChange={onChange}
                    invalid={Boolean(errors.name)}
                    className={styles.control}
                    placeholder="Alex Rivera"
                  />
                </div>
              </Field>
              <Field id="inq-email" label="Business email" required error={errors.email}>
                <div className={styles.controlWrap}>
                  <Mail className={styles.icon} size={18} aria-hidden="true" />
                  <TextInput
                    id="inq-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={values.email}
                    onChange={onChange}
                    invalid={Boolean(errors.email)}
                    className={styles.control}
                    placeholder="alex@company.com"
                  />
                </div>
              </Field>
              <Field id="inq-company" label="Company" className={styles.span2}>
                <div className={styles.controlWrap}>
                  <Building2 className={styles.icon} size={18} aria-hidden="true" />
                  <TextInput
                    id="inq-company"
                    name="company"
                    autoComplete="organization"
                    value={values.company}
                    onChange={onChange}
                    className={styles.control}
                    placeholder="Optional"
                  />
                </div>
              </Field>
            </div>
          ) : null}

          {step === 1 ? (
            <div className={styles.fields}>
              <Field
                id="inq-service"
                label="Service interest"
                required
                error={errors.service}
                className={styles.span2}
              >
                <div className={styles.controlWrap}>
                  <Briefcase className={styles.icon} size={18} aria-hidden="true" />
                  <SelectInput
                    id="inq-service"
                    name="service"
                    value={values.service}
                    onChange={onChange}
                    invalid={Boolean(errors.service)}
                    className={styles.control}
                  >
                    <option value="">Select a service...</option>
                    {serviceInterests.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </SelectInput>
                </div>
              </Field>
              <Field id="inq-budget" label="Budget range">
                <div className={styles.controlWrap}>
                  <Wallet className={styles.icon} size={18} aria-hidden="true" />
                  <SelectInput
                    id="inq-budget"
                    name="budget"
                    value={values.budget}
                    onChange={onChange}
                    className={styles.control}
                  >
                    <option value="">Select...</option>
                    {budgetRanges.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </SelectInput>
                </div>
              </Field>
              <Field
                id="inq-timeline"
                label="Timeline"
                hint="When do you hope to start or launch?"
              >
                <div className={styles.controlWrap}>
                  <CalendarClock className={styles.icon} size={18} aria-hidden="true" />
                  <TextInput
                    id="inq-timeline"
                    name="timeline"
                    value={values.timeline}
                    onChange={onChange}
                    className={styles.control}
                    placeholder="e.g. discovery this month"
                  />
                </div>
              </Field>
            </div>
          ) : null}

          {step === 2 ? (
            <div className={styles.fieldsSingle}>
              <Field id="inq-message" label="Project description" required error={errors.message}>
                <TextArea
                  id="inq-message"
                  name="message"
                  value={values.message}
                  onChange={onChange}
                  invalid={Boolean(errors.message)}
                  className={styles.textarea}
                  placeholder="Goals, users, current state, and what success looks like."
                />
              </Field>

              <label className={styles.consent}>
                <input
                  type="checkbox"
                  name="consent"
                  checked={values.consent}
                  onChange={onChange}
                  aria-invalid={errors.consent ? 'true' : undefined}
                />
                <span>
                  I agree to be contacted about this inquiry. See the{' '}
                  <Link to="/privacy">Privacy Policy</Link>.
                </span>
              </label>
              {errors.consent ? (
                <p className={styles.consentError} role="alert">
                  {errors.consent}
                </p>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>

      <div className={styles.actions}>
        {step > 0 ? (
          <Button type="button" variant="secondary" size="md" onClick={goBack}>
            Back
          </Button>
        ) : (
          <span />
        )}

        {step < STEPS.length - 1 ? (
          <Button type="submit" variant="inverse" size="md">
            Continue
          </Button>
        ) : (
          <Button type="submit" variant="inverse" size="md" disabled={!canSubmit}>
            {status === 'loading' ? 'Sending...' : 'Send inquiry'}
          </Button>
        )}
      </div>

      <div className={styles.status} role="status" aria-live="polite" data-state={status}>
        {statusMessage}
      </div>
    </form>
  )
}
