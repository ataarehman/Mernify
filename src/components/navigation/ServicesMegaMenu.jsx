import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ArrowUpRight, Cuboid, LayoutDashboard, Globe, Smartphone, Sparkles, PenTool } from 'lucide-react'
import { getServiceBySlug } from '@/content/services'
import { megaServiceSlugs } from '@/content/navigation'
import styles from './ServicesMegaMenu.module.css'

const ICONS = {
  'product-engineering': Cuboid,
  'saas-development': LayoutDashboard,
  'web-development': Globe,
  'mobile-app-development': Smartphone,
  'ai-integration': Sparkles,
  'ui-ux-design': PenTool,
}

export function ServicesMegaMenu({ open, onClose }) {
  const items = megaServiceSlugs.map((slug) => getServiceBySlug(slug)).filter(Boolean)
  const [activeSlug, setActiveSlug] = useState(items[0]?.slug || '')
  const active = items.find((item) => item.slug === activeSlug) || items[0]

  if (!items.length || !active) return null

  return (
    <div
      className={[styles.mega, open ? styles.open : ''].join(' ')}
      role="dialog"
      aria-label="Services"
    >
      <div className={styles.inner} data-mernify-svc-mega>
        <ul className={styles.nav} role="tablist" aria-label="Service categories">
          {items.map((item) => {
            const Icon = ICONS[item.slug] || Cuboid
            const isActive = item.slug === active.slug
            return (
              <li key={item.slug}>
                <Link
                  to={`/services/${item.slug}`}
                  className={[styles.cat, isActive ? styles.catActive : ''].join(' ')}
                  role="tab"
                  aria-selected={isActive}
                  onMouseEnter={() => setActiveSlug(item.slug)}
                  onFocus={() => setActiveSlug(item.slug)}
                  onClick={onClose}
                >
                  <span className={styles.catLabel}>
                    <Icon size={18} aria-hidden="true" className={styles.catIcon} />
                    <span>{item.title}</span>
                  </span>
                  <span className={styles.catArrow} aria-hidden="true">
                    ›
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>

        <div className={styles.panel} role="tabpanel">
          <span className={styles.eyebrow}>Capabilities</span>
          <h3 className={styles.title}>{active.title}</h3>
          <p className={styles.desc}>{active.description}</p>
          <ul className={styles.caps} role="list">
            {active.capabilities.map((cap) => (
              <li key={cap}>{cap}</li>
            ))}
          </ul>
          <NavLink to={`/services/${active.slug}`} className={styles.cta} onClick={onClose}>
            Explore service <ArrowUpRight size={16} aria-hidden="true" />
          </NavLink>
        </div>
      </div>
    </div>
  )
}
