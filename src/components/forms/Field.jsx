import styles from './Field.module.css'

export function Field({
  id,
  label,
  error,
  hint,
  required,
  children,
  className = '',
}) {
  const hintId = hint ? `${id}-hint` : undefined
  const errorId = error ? `${id}-error` : undefined
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined

  return (
    <div className={[styles.field, className].filter(Boolean).join(' ')}>
      <label className={styles.label} htmlFor={id}>
        {label}
        {required ? <span className={styles.req} aria-hidden="true"> *</span> : null}
      </label>
      {hint ? (
        <p id={hintId} className={styles.hint}>
          {hint}
        </p>
      ) : null}
      <div data-describedby={describedBy}>{children}</div>
      {error ? (
        <p id={errorId} className={styles.error} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}

export function TextInput({ id, invalid, className = '', ...props }) {
  return (
    <input
      id={id}
      className={[styles.control, className].filter(Boolean).join(' ')}
      aria-invalid={invalid ? 'true' : undefined}
      {...props}
    />
  )
}

export function TextArea({ id, invalid, className = '', ...props }) {
  return (
    <textarea
      id={id}
      className={[styles.control, styles.textarea, className].filter(Boolean).join(' ')}
      aria-invalid={invalid ? 'true' : undefined}
      {...props}
    />
  )
}

export function SelectInput({ id, invalid, className = '', children, ...props }) {
  return (
    <select
      id={id}
      className={[styles.control, styles.select, className].filter(Boolean).join(' ')}
      aria-invalid={invalid ? 'true' : undefined}
      {...props}
    >
      {children}
    </select>
  )
}
