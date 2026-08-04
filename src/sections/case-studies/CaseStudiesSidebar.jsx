import {
  Cloud,
  Globe,
  LayoutGrid,
  Palette,
  ShoppingBag,
  Smartphone,
  Sparkles,
} from 'lucide-react'
import { caseStudyCategories, caseStudyIndustries } from '@/content/caseStudies'
import styles from './CaseStudiesSidebar.module.css'

const CATEGORY_ICONS = {
  All: LayoutGrid,
  'Web Development': Globe,
  'Mobile Applications': Smartphone,
  'UI/UX Design': Palette,
  'E-commerce': ShoppingBag,
  'SaaS Platforms': Cloud,
  'AI Solutions': Sparkles,
}

export function CaseStudiesSidebar({
  category,
  industry,
  resultCount,
  onCategoryChange,
  onIndustryChange,
  onReset,
}) {
  const filtered = category !== 'All' || industry !== 'All'

  return (
    <aside className={styles.sidebar} aria-label="Portfolio filters">
      <div className={styles.panel}>
        <header className={styles.head}>
          <div className={styles.headRow}>
            <p className={styles.kicker}>Browse work</p>
            {filtered ? (
              <button type="button" className={styles.reset} onClick={onReset}>
                Clear
              </button>
            ) : null}
          </div>
          <p className={styles.count} aria-live="polite">
            <strong>{resultCount}</strong>
            <span>{resultCount === 1 ? 'project' : 'projects'}</span>
          </p>
        </header>

        <nav className={styles.nav} aria-label="Filter by category">
          <ul className={styles.list} role="list">
            {caseStudyCategories.map((option) => {
              const selected = option === category
              const Icon = CATEGORY_ICONS[option] || LayoutGrid
              return (
                <li key={option}>
                  <button
                    type="button"
                    className={[styles.item, selected ? styles.itemActive : '']
                      .filter(Boolean)
                      .join(' ')}
                    aria-pressed={selected}
                    onClick={() => onCategoryChange(option)}
                  >
                    <span className={styles.indicator} aria-hidden="true" />
                    <Icon className={styles.icon} size={16} strokeWidth={1.75} aria-hidden="true" />
                    <span className={styles.label}>{option}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className={styles.footer}>
          <label className={styles.selectLabel} htmlFor="filter-industry">
            Industry
          </label>
          <select
            id="filter-industry"
            className={styles.select}
            value={industry}
            onChange={(event) => onIndustryChange(event.target.value)}
          >
            {caseStudyIndustries.map((option) => (
              <option key={option} value={option}>
                {option === 'All' ? 'All industries' : option}
              </option>
            ))}
          </select>
        </div>
      </div>
    </aside>
  )
}
