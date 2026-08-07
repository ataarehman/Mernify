import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react'
import styles from './DatePicker.module.css'

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

function parseISO(value) {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null
  const date = new Date(`${value}T12:00:00`)
  return Number.isNaN(date.getTime()) ? null : date
}

function toISO(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function formatDisplay(value) {
  const date = parseISO(value)
  if (!date) return ''
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}

function startOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

function buildCells(viewDate) {
  const first = startOfMonth(viewDate)
  const startOffset = first.getDay()
  const daysInMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate()
  const cells = []

  for (let i = 0; i < startOffset; i += 1) cells.push(null)
  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push(new Date(viewDate.getFullYear(), viewDate.getMonth(), day))
  }
  while (cells.length % 7 !== 0) cells.push(null)
  return cells
}

/**
 * Lightweight calendar date picker — no external dependency.
 * Value is ISO `YYYY-MM-DD` (or empty string).
 */
export function DatePicker({
  id,
  name,
  value = '',
  onChange,
  invalid = false,
  placeholder = 'Select a date',
  min,
  className = '',
}) {
  const autoId = useId()
  const fieldId = id || autoId
  const rootRef = useRef(null)
  const [open, setOpen] = useState(false)
  const selected = parseISO(value)
  const [viewDate, setViewDate] = useState(() => selected || new Date())

  const minDate = useMemo(() => parseISO(min) || null, [min])
  const cells = useMemo(() => buildCells(viewDate), [viewDate])
  const monthLabel = useMemo(
    () =>
      new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(viewDate),
    [viewDate],
  )

  useEffect(() => {
    if (!selected) return
    setViewDate(selected)
  }, [selected])

  useEffect(() => {
    if (!open) return undefined

    function onPointerDown(event) {
      if (!rootRef.current?.contains(event.target)) setOpen(false)
    }
    function onKey(event) {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  function emit(next) {
    onChange?.({
      target: { name, value: next, type: 'text' },
    })
  }

  function isDisabled(date) {
    if (!minDate) return false
    const a = new Date(date.getFullYear(), date.getMonth(), date.getDate())
    const b = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate())
    return a < b
  }

  function selectDay(date) {
    if (isDisabled(date)) return
    emit(toISO(date))
    setOpen(false)
  }

  const todayISO = toISO(new Date())
  const display = formatDisplay(value)

  return (
    <div
      ref={rootRef}
      className={[styles.root, className].filter(Boolean).join(' ')}
    >
      <button
        type="button"
        id={fieldId}
        className={styles.trigger}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-invalid={invalid ? 'true' : undefined}
        onClick={() => setOpen((v) => !v)}
      >
        <CalendarDays className={styles.triggerIcon} size={18} aria-hidden="true" />
        <span className={display ? styles.value : styles.placeholder}>
          {display || placeholder}
        </span>
      </button>

      {/* Keep name in the DOM for progressive enhancement / autofill tooling */}
      <input type="hidden" name={name} value={value} readOnly />

      {open ? (
        <div className={styles.pop} role="dialog" aria-label="Choose a date">
          <div className={styles.popHead}>
            <button
              type="button"
              className={styles.navBtn}
              aria-label="Previous month"
              onClick={() =>
                setViewDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1))
              }
            >
              <ChevronLeft size={18} aria-hidden="true" />
            </button>
            <p className={styles.monthLabel}>{monthLabel}</p>
            <button
              type="button"
              className={styles.navBtn}
              aria-label="Next month"
              onClick={() =>
                setViewDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1))
              }
            >
              <ChevronRight size={18} aria-hidden="true" />
            </button>
          </div>

          <div className={styles.weekdays} aria-hidden="true">
            {WEEKDAYS.map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>

          <div className={styles.grid}>
            {cells.map((date, index) => {
              if (!date) {
                return <span key={`e-${index}`} className={styles.empty} />
              }
              const iso = toISO(date)
              const isSelected = value === iso
              const isToday = iso === todayISO
              const disabled = isDisabled(date)
              return (
                <button
                  key={iso}
                  type="button"
                  className={[
                    styles.day,
                    isSelected ? styles.daySelected : '',
                    isToday ? styles.dayToday : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  disabled={disabled}
                  aria-label={formatDisplay(iso)}
                  aria-pressed={isSelected}
                  onClick={() => selectDay(date)}
                >
                  {date.getDate()}
                </button>
              )
            })}
          </div>

          <div className={styles.popFoot}>
            <button
              type="button"
              className={styles.footBtn}
              onClick={() => {
                emit('')
                setOpen(false)
              }}
            >
              Clear
            </button>
            <button
              type="button"
              className={styles.footBtnAccent}
              onClick={() => {
                const now = new Date()
                if (!isDisabled(now)) {
                  emit(toISO(now))
                  setViewDate(now)
                }
                setOpen(false)
              }}
            >
              Today
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export function formatTimelineLabel(iso) {
  return formatDisplay(iso)
}
