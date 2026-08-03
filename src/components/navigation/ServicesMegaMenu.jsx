import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import {
  ArrowUpRight,
  ChevronRight,
  Cuboid,
  LayoutDashboard,
  Globe,
  Smartphone,
  Sparkles,
  PenTool,
} from 'lucide-react'
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
  const ActiveIcon = ICONS[active?.slug] || Cuboid

  // Reset highlight to the first service whenever the panel re-opens.
  useEffect(() => {
    if (!open) return
    const first = megaServiceSlugs.map((slug) => getServiceBySlug(slug)).find(Boolean)
    if (first?.slug) setActiveSlug(first.slug)
  }, [open])

  if (!items.length || !active) return null

  return (
    <div
      className={[styles.mega, open ? styles.open : ''].join(' ')}
      role="dialog"
      aria-label="Services"
    >
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.inner} data-mernify-svc-mega>
        <ul className={styles.nav} role="tablist" aria-label="Service categories">
          {items.map((item, index) => {
            const Icon = ICONS[item.slug] || Cuboid
            const isActive = item.slug === active.slug
            const isFeatured = index === 0
            return (
              <li
                key={item.slug}
                className={styles.navItem}
                style={{ '--i': String(index) }}
              >
                <Link
                  to={`/services/${item.slug}`}
                  className={[
                    styles.cat,
                    isActive ? styles.catActive : '',
                    isFeatured ? styles.catFeatured : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  role="tab"
                  aria-selected={isActive}
                  onMouseEnter={() => setActiveSlug(item.slug)}
                  onFocus={() => setActiveSlug(item.slug)}
                  onClick={onClose}
                >
                  <span className={styles.catIconWrap} aria-hidden="true">
                    <Icon size={17} strokeWidth={2} className={styles.catIcon} />
                  </span>
                  <span className={styles.catCopy}>
                    {isFeatured ? <span className={styles.featuredTag}>Featured</span> : null}
                    <span className={styles.catTitle}>{item.title}</span>
                  </span>
                  <ChevronRight size={16} strokeWidth={2.2} className={styles.catArrow} aria-hidden="true" />
                </Link>
              </li>
            )
          })}
        </ul>

        <div className={styles.panel} role="tabpanel">
          <div key={active.slug} className={styles.panelBody}>
            <div className={styles.panelHead}>
              <span className={styles.panelIcon} aria-hidden="true">
                <ActiveIcon size={22} strokeWidth={1.8} />
              </span>
              <span className={styles.eyebrow}>Capabilities</span>
            </div>
            <h3 className={styles.title}>{active.title}</h3>
            <p className={styles.desc}>{active.description}</p>
            <ul className={styles.caps} role="list">
              {active.capabilities.map((cap, index) => (
                <li key={cap} style={{ '--i': String(index) }}>
                  {cap}
                </li>
              ))}
            </ul>
            <NavLink to={`/services/${active.slug}`} className={styles.cta} onClick={onClose}>
              <span>Explore service</span>
              <ArrowUpRight size={16} aria-hidden="true" />
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  )
}
