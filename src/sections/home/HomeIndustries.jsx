import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { Container, Section } from '@/components/ui'
import { useReducedMotion } from '@/app/providers/useReducedMotion'
import styles from './HomeIndustries.module.css'

const INDUSTRIES = [
  {
    id: 'healthcare',
    label: 'Healthcare',
    num: '01',
    challenge: 'Fragmented patient data and manual workflows slow clinical teams.',
    solution: 'Unified patient portals, appointment engines, and secure data pipelines that connect care teams.',
    users: ['Clinicians', 'Administrators', 'Patients'],
    zones: [
      { label: 'Patient Portal', col: 'indigo' },
      { label: 'Appointments', col: 'cyan' },
      { label: 'EHR Sync', col: 'indigo' },
      { label: 'Secure Messaging', col: 'cyan' },
    ],
  },
  {
    id: 'fintech',
    label: 'Financial Services',
    num: '02',
    challenge: 'Compliance overhead and legacy systems block product velocity.',
    solution: 'Modern transaction engines, approval workflows, and risk dashboards built for regulated environments.',
    users: ['Operations', 'Compliance', 'End Customers'],
    zones: [
      { label: 'Transactions', col: 'indigo' },
      { label: 'Approvals', col: 'cyan' },
      { label: 'Risk View', col: 'indigo' },
      { label: 'Audit Trail', col: 'cyan' },
    ],
  },
  {
    id: 'logistics',
    label: 'Logistics',
    num: '03',
    challenge: 'Shipment visibility gaps create costly delays and manual interventions.',
    solution: 'Real-time tracking, warehouse orchestration, and route intelligence delivered as a connected platform.',
    users: ['Dispatchers', 'Drivers', 'Customers'],
    zones: [
      { label: 'Live Tracking', col: 'indigo' },
      { label: 'Warehouse', col: 'cyan' },
      { label: 'Route Engine', col: 'indigo' },
      { label: 'Notifications', col: 'cyan' },
    ],
  },
  {
    id: 'construction',
    label: 'Construction',
    num: '04',
    challenge: 'Site coordination relies on phone calls, spreadsheets, and paper.',
    solution: 'Field-to-office platforms that connect project management, safety, and procurement.',
    users: ['Project Managers', 'Site Teams', 'Procurement'],
    zones: [
      { label: 'Project Board', col: 'indigo' },
      { label: 'Site Reports', col: 'cyan' },
      { label: 'Safety Checks', col: 'indigo' },
      { label: 'Procurement', col: 'cyan' },
    ],
  },
  {
    id: 'realestate',
    label: 'Real Estate',
    num: '05',
    challenge: 'Property lifecycle management is spread across disconnected tools.',
    solution: 'End-to-end platforms for listings, transactions, tenant management, and analytics.',
    users: ['Agents', 'Tenants', 'Asset Managers'],
    zones: [
      { label: 'Listings', col: 'indigo' },
      { label: 'Transactions', col: 'cyan' },
      { label: 'Tenant Hub', col: 'indigo' },
      { label: 'Analytics', col: 'cyan' },
    ],
  },
  {
    id: 'education',
    label: 'Education',
    num: '06',
    challenge: 'Learner engagement drops when digital tools feel generic and disconnected.',
    solution: 'Learning platforms, progress tracking, and content delivery tailored to institutional workflows.',
    users: ['Educators', 'Students', 'Administrators'],
    zones: [
      { label: 'LMS', col: 'indigo' },
      { label: 'Progress', col: 'cyan' },
      { label: 'Content', col: 'indigo' },
      { label: 'Assessments', col: 'cyan' },
    ],
  },
  {
    id: 'retail',
    label: 'Retail',
    num: '07',
    challenge: 'Inventory, orders, and customer experience are siloed across channels.',
    solution: 'Unified commerce platforms connecting inventory, fulfilment, and customer data.',
    users: ['Operations', 'Customers', 'Logistics'],
    zones: [
      { label: 'Inventory', col: 'indigo' },
      { label: 'Orders', col: 'cyan' },
      { label: 'Customer Hub', col: 'indigo' },
      { label: 'Fulfilment', col: 'cyan' },
    ],
  },
  {
    id: 'manufacturing',
    label: 'Manufacturing',
    num: '08',
    challenge: 'Production visibility is reactive — defects and delays surface too late.',
    solution: 'Connected production monitoring, quality control, and supply chain dashboards.',
    users: ['Plant Managers', 'QA Teams', 'Supply Chain'],
    zones: [
      { label: 'Production', col: 'indigo' },
      { label: 'Quality', col: 'cyan' },
      { label: 'Supply Chain', col: 'indigo' },
      { label: 'Alerts', col: 'cyan' },
    ],
  },
  {
    id: 'fieldservice',
    label: 'Field Service',
    num: '09',
    challenge: 'Scheduling, dispatch, and technician data are disconnected.',
    solution: 'Mobile-first field service platforms for scheduling, dispatch, and real-time status.',
    users: ['Dispatchers', 'Technicians', 'Managers'],
    zones: [
      { label: 'Scheduling', col: 'indigo' },
      { label: 'Dispatch', col: 'cyan' },
      { label: 'Mobile App', col: 'indigo' },
      { label: 'Status', col: 'cyan' },
    ],
  },
  {
    id: 'travel',
    label: 'Travel',
    num: '10',
    challenge: 'Fragmented booking and customer experience across touchpoints.',
    solution: 'Booking engines, itinerary management, and service orchestration for modern travel operations.',
    users: ['Travellers', 'Agents', 'Operations'],
    zones: [
      { label: 'Booking', col: 'indigo' },
      { label: 'Itinerary', col: 'cyan' },
      { label: 'Service Hub', col: 'indigo' },
      { label: 'Notifications', col: 'cyan' },
    ],
  },
]

export function HomeIndustries() {
  const [active, setActive] = useState(0)
  const canvasRef = useRef(null)
  const { prefersReducedMotion } = useReducedMotion()

  useEffect(() => {
    const el = canvasRef.current
    if (!el || prefersReducedMotion) return
    gsap.fromTo(
      el.querySelectorAll('[data-ani]'),
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: 'power3.out' },
    )
  }, [active, prefersReducedMotion])

  const ind = INDUSTRIES[active]

  return (
    <Section tone="dark" aria-labelledby="industries-title">
      <Container>
        <div className={styles.header}>
          <p className={styles.eyebrow}>Solutions in motion</p>
          <h2 id="industries-title" className={styles.title}>
            One Platform.<br />Every Industry.
          </h2>
          <p className={styles.support}>
            Select an industry to see how Mernify approaches its operational challenges.
          </p>
        </div>

        <div className={styles.layout}>
          {/* ── Selector ── */}
          <nav className={styles.selector} aria-label="Industry selector">
            {INDUSTRIES.map((ind2, i) => (
              <button
                key={ind2.id}
                type="button"
                aria-pressed={active === i}
                className={[styles.selectorBtn, active === i ? styles.selectorBtnActive : ''].join(' ')}
                onClick={() => setActive(i)}
              >
                <span className={styles.selectorNum}>{ind2.num}</span>
                <span className={styles.selectorLabel}>{ind2.label}</span>
              </button>
            ))}
          </nav>

          {/* ── Canvas ── */}
          <div ref={canvasRef} className={styles.canvas} aria-live="polite">
            <div className={styles.canvasBg} aria-hidden="true" />
            <div className={styles.canvasGrid} aria-hidden="true" />

            <div className={styles.canvasContent}>
              <div className={styles.canvasHeader} data-ani>
                <span className={styles.canvasNum}>{ind.num}</span>
                <h3 className={styles.canvasTitle}>{ind.label}</h3>
              </div>

              <div className={styles.canvasChallenge} data-ani>
                <span className={styles.challengeLabel}>Challenge</span>
                <p>{ind.challenge}</p>
              </div>

              <div className={styles.canvasSolution} data-ani>
                <span className={styles.solutionLabel}>Solution</span>
                <p>{ind.solution}</p>
              </div>

              <div className={styles.canvasZones} data-ani>
                {ind.zones.map((z) => (
                  <div
                    key={z.label}
                    className={[styles.zone, styles[`zone-${z.col}`]].join(' ')}
                  >
                    <span className={styles.zoneDot} />
                    {z.label}
                  </div>
                ))}
              </div>

              <div className={styles.canvasUsers} data-ani>
                <span className={styles.usersLabel}>Users</span>
                {ind.users.map((u) => (
                  <span key={u} className={styles.userPill}>{u}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
