import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Briefcase,
  Building2,
  Check,
  Mail,
  User,
} from 'lucide-react'
import { Field, TextInput, TextArea, SelectInput, CharCount } from '@/components/forms/Field'
import { DatePicker, formatTimelineLabel } from '@/components/forms/DatePicker'
import { Button } from '@/components/ui'
import { BookCallCta } from '@/components/cta/BookCallCta'
import { budgetRanges, serviceInterests } from '@/content/pages'
import { homeInquiry } from '@/content/home'
import { SITE } from '@/constants/site'
import {
  MESSAGE_MAX,
  MESSAGE_MIN,
  todayISO,
  validateContactFields,
} from '@/lib/contactValidation'
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
  // Obscure honeypot — avoid name="website" (autofill can fake success).
  mfTrap: '',
}

function validateStep(step, values, minTimeline) {
  if (step === 0) {
    const all = validateContactFields(
      { ...values, message: 'x'.repeat(MESSAGE_MIN), consent: true },
      { minTimeline },
    )
    const errors = {}
    if (all.name) errors.name = all.name
    if (all.email) errors.email = all.email
    return errors
  }
  if (step === 1) {
    const all = validateContactFields(
      { ...values, message: 'x'.repeat(MESSAGE_MIN), consent: true },
      { requireService: true, minTimeline },
    )
    const errors = {}
    if (all.service) errors.service = all.service
    if (all.timeline) errors.timeline = all.timeline
    return errors
  }
  return validateContactFields(values, { requireService: true, minTimeline })
}

export function InquiryStepperForm() {
  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState(1)
  const [values, setValues] = useState(initial)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [statusMessage, setStatusMessage] = useState('')
  const panelRef = useRef(null)
  const submittingRef = useRef(false)

  const progress = ((step + 1) / STEPS.length) * 100
  const loading = status === 'loading'
  const minTimeline = todayISO()

  useEffect(() => {
    const panel = panelRef.current
    if (!panel) return undefined
    panel.classList.remove(styles.enterForward, styles.enterBack)
    void panel.offsetWidth
    panel.classList.add(direction >= 0 ? styles.enterForward : styles.enterBack)
    return undefined
  }, [step, direction])

  function clearError(name) {
    if (!errors[name]) return
    setErrors((prev) => {
      const next = { ...prev }
      delete next[name]
      return next
    })
  }

  function onChange(event) {
    const { name, type, checked, value } = event.target
    setValues((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    clearError(name)
    if (status === 'error') {
      setStatus('idle')
      setStatusMessage('')
    }
  }

  function setBudget(next) {
    setValues((prev) => ({ ...prev, budget: next }))
    clearError('budget')
  }

  function focusFirstError(nextErrors) {
    const order = ['name', 'email', 'service', 'timeline', 'message', 'consent']
    const key = order.find((k) => nextErrors[k])
    if (!key) return
    const el = document.getElementById(
      key === 'consent' ? 'inq-consent' : key === 'message' ? 'inq-message' : `inq-${key}`,
    )
    el?.focus?.()
  }

  function goNext() {
    const nextErrors = validateStep(step, values, minTimeline)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) {
      focusFirstError(nextErrors)
      return
    }
    setDirection(1)
    setStep((current) => Math.min(current + 1, STEPS.length - 1))
    setStatus('idle')
    setStatusMessage('')
  }

  function goBack() {
    if (loading) return
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

    if (submittingRef.current || loading) return

    const nextErrors = validateStep(step, values, minTimeline)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) {
      setStatus('error')
      setStatusMessage('Please fix the highlighted fields before sending.')
      focusFirstError(nextErrors)
      return
    }

    // Honeypot — bots only (silent success, no API call)
    if (values.mfTrap?.trim()) {
      setStatus('success')
      setStatusMessage(`Thanks — your inquiry was received. ${SITE.responseSla}`)
      return
    }

    submittingRef.current = true
    setStatus('loading')
    setStatusMessage('Sending your inquiry…')
    try {
      await submitContactForm({
        name: values.name.trim(),
        email: values.email.trim(),
        company: values.company.trim(),
        service: values.service,
        budget: values.budget,
        timeline: formatTimelineLabel(values.timeline) || values.timeline.trim(),
        message: values.message.trim(),
        consent: true,
      })
      setStatus('success')
      setStatusMessage(
        `Thank you! Your inquiry was submitted successfully. ${SITE.responseSla}`,
      )
      setValues(initial)
      setErrors({})
    } catch (err) {
      setStatus('error')
      setStatusMessage(
        err?.name === 'AbortError'
          ? `The request timed out. Please try again or email ${SITE.email}.`
          : err?.message || `Something went wrong. Please try again or email ${SITE.email}.`,
      )
    } finally {
      submittingRef.current = false
    }
  }

  function resetForm() {
    setStatus('idle')
    setStatusMessage('')
    setStep(0)
    setDirection(1)
    setErrors({})
  }

  if (status === 'success') {
    return (
      <div className={styles.successPanel} role="status" aria-live="polite">
        <div className={styles.successBadge} aria-hidden="true">
          <Check size={22} strokeWidth={2.5} />
        </div>
        <p className={styles.successEyebrow}>Inquiry received</p>
        <p className={styles.successTitle}>Thanks — we’ll be in touch</p>
        <p className={styles.successText}>{statusMessage}</p>
        <div className={styles.successActions}>
          <Button type="button" variant="inverse" size="md" onClick={resetForm}>
            Send another inquiry
          </Button>
          <BookCallCta variant="secondary" size="md" label="Book a Demo Call" />
        </div>
      </div>
    )
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate aria-busy={loading}>
      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor="inquiry-mf-trap">Website</label>
        <input
          id="inquiry-mf-trap"
          name="mfTrap"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          data-lpignore="true"
          data-1p-ignore="true"
          data-form-type="other"
          value={values.mfTrap}
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
        <div
          className={styles.progressTrack}
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={STEPS.length}
          aria-valuenow={step + 1}
          aria-label={`Step ${step + 1} of ${STEPS.length}`}
        >
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
                    maxLength={120}
                    disabled={loading}
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
                    inputMode="email"
                    value={values.email}
                    onChange={onChange}
                    invalid={Boolean(errors.email)}
                    className={styles.control}
                    placeholder="alex@company.com"
                    maxLength={160}
                    disabled={loading}
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
                    placeholder="Acme Inc. (optional)"
                    maxLength={160}
                    disabled={loading}
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
                    className={`${styles.control} ${styles.select}`}
                    disabled={loading}
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

              <Field
                id="inq-budget"
                label="Budget range"
                hint="Approximate range helps us scope the conversation."
                className={styles.span2}
              >
                <div
                  className={styles.budgetGrid}
                  role="radiogroup"
                  aria-label="Budget range"
                >
                  {budgetRanges.map((item) => {
                    const active = values.budget === item
                    return (
                      <button
                        key={item}
                        type="button"
                        role="radio"
                        aria-checked={active}
                        className={[styles.budgetChip, active ? styles.budgetChipActive : '']
                          .filter(Boolean)
                          .join(' ')}
                        onClick={() => setBudget(active ? '' : item)}
                        disabled={loading}
                      >
                        {item}
                      </button>
                    )
                  })}
                </div>
              </Field>

              <Field
                id="inq-timeline"
                label="Target start date"
                hint="Optional — when do you hope to start or launch?"
                error={errors.timeline}
                className={styles.span2}
              >
                <DatePicker
                  id="inq-timeline"
                  name="timeline"
                  value={values.timeline}
                  onChange={onChange}
                  min={minTimeline}
                  invalid={Boolean(errors.timeline)}
                  placeholder="Pick a target date"
                  disabled={loading}
                />
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
                  maxLength={MESSAGE_MAX}
                  disabled={loading}
                />
                <CharCount value={values.message} min={MESSAGE_MIN} max={MESSAGE_MAX} />
              </Field>

              <label className={styles.consent} htmlFor="inq-consent">
                <input
                  id="inq-consent"
                  type="checkbox"
                  name="consent"
                  checked={values.consent}
                  onChange={onChange}
                  aria-invalid={errors.consent ? 'true' : undefined}
                  disabled={loading}
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
          <Button type="button" variant="secondary" size="md" onClick={goBack} disabled={loading}>
            Back
          </Button>
        ) : (
          <span />
        )}

        {step < STEPS.length - 1 ? (
          <Button type="submit" variant="inverse" size="md" disabled={loading}>
            Continue
          </Button>
        ) : (
          <Button
            type="submit"
            variant="inverse"
            size="md"
            disabled={loading}
            aria-busy={loading}
          >
            {loading ? 'Sending…' : 'Send inquiry'}
          </Button>
        )}
      </div>

      <div className={styles.status} role="status" aria-live="polite" data-state={status}>
        {status !== 'success' ? statusMessage : null}
      </div>
    </form>
  )
}
