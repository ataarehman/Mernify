import { useState } from 'react'
import { Container, Section } from '@/components/ui'
import styles from './HomeTechnology.module.css'

const LAYERS = [
  {
    id: 'ux',
    num: '01',
    title: 'User Experience',
    desc: 'Design systems, interaction patterns, and interface components that make products intuitive and accessible.',
    value: 'Every product decision starts with how users will interact with it — not with technology choices.',
    connects: ['web', 'mobile'],
    techs: ['Figma', 'React', 'Storybook', 'Accessibility'],
    color: 'cyan',
  },
  {
    id: 'web',
    num: '02',
    title: 'Web & Mobile',
    desc: 'Production-grade web applications, mobile apps, and cross-platform products built for performance.',
    value: 'What users touch. Rendered fast, works offline, loads on any device.',
    connects: ['ux', 'api'],
    techs: ['React', 'Next.js', 'React Native', 'TypeScript'],
    color: 'indigo',
  },
  {
    id: 'api',
    num: '03',
    title: 'Application Services',
    desc: 'APIs, business logic, and service orchestration that power your product from the inside out.',
    value: 'The rules engine of the product. Every business decision is code that can be tested, audited, and scaled.',
    connects: ['web', 'data', 'ai'],
    techs: ['Node.js', 'GraphQL', 'REST', 'gRPC'],
    color: 'indigo',
  },
  {
    id: 'integrations',
    num: '04',
    title: 'APIs & Integrations',
    desc: 'Connections to third-party systems, partner APIs, webhooks, and event streams.',
    value: 'No product operates in isolation. Clean integrations prevent technical debt from accumulating at the boundary.',
    connects: ['api'],
    techs: ['Stripe', 'Twilio', 'Salesforce', 'Custom APIs'],
    color: 'purple',
  },
  {
    id: 'data',
    num: '05',
    title: 'Data Layer',
    desc: 'Relational databases, document stores, caching, search, and event-driven pipelines.',
    value: 'Data is the product\'s memory. Structured correctly from day one, it becomes a competitive advantage.',
    connects: ['api', 'ai'],
    techs: ['PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch'],
    color: 'cyan',
  },
  {
    id: 'ai',
    num: '06',
    title: 'AI Layer',
    desc: 'Language models, computer vision, predictive analytics, and automation pipelines integrated into business workflows.',
    value: 'AI works when it is embedded in the right process — not bolted on as a separate tool.',
    connects: ['api', 'data'],
    techs: ['OpenAI', 'LangChain', 'HuggingFace', 'Vector DBs'],
    color: 'indigo',
  },
  {
    id: 'cloud',
    num: '07',
    title: 'Cloud & Infrastructure',
    desc: 'Container orchestration, CI/CD pipelines, cloud-native deployments, and infrastructure as code.',
    value: 'Infrastructure is the product\'s reliability contract. Built right, it becomes invisible to end users.',
    connects: ['api', 'data', 'ai', 'security'],
    techs: ['AWS', 'Kubernetes', 'Docker', 'Terraform'],
    color: 'cyan',
  },
  {
    id: 'security',
    num: '08',
    title: 'Security & Quality',
    desc: 'Authentication, authorisation, encryption, automated testing, and continuous quality assurance.',
    value: 'Security is not a feature — it is the foundation. Quality gates prevent technical debt from compounding.',
    connects: ['cloud', 'api'],
    techs: ['Auth0', 'Playwright', 'Jest', 'OWASP'],
    color: 'success',
  },
]

export function HomeTechnology() {
  const [active, setActive] = useState(null)

  const layer = active != null ? LAYERS.find((l) => l.id === active) : null

  return (
    <Section tone="light" aria-labelledby="arch-title">
      <Container>
        <div className={styles.header}>
          <p className={styles.eyebrow}>Engineering architecture</p>
          <h2 id="arch-title" className={styles.title}>
            Engineered as One<br />Connected System
          </h2>
          <p className={styles.support}>
            Select a layer to understand its role, the technologies it uses, and how it connects to the rest of your product.
          </p>
        </div>

        <div className={styles.layout}>
          {/* Layer stack */}
          <div className={styles.stack} role="list">
            {LAYERS.map((l) => (
              <button
                key={l.id}
                type="button"
                role="listitem"
                aria-expanded={active === l.id}
                aria-controls={`layer-detail-${l.id}`}
                className={[
                  styles.layer,
                  styles[`layer-${l.color}`],
                  active === l.id ? styles.layerActive : '',
                ].filter(Boolean).join(' ')}
                onClick={() => setActive((prev) => (prev === l.id ? null : l.id))}
              >
                <span className={styles.layerNum}>{l.num}</span>
                <span className={styles.layerTitle}>{l.title}</span>
                <span className={styles.layerArrow} aria-hidden="true">
                  {active === l.id ? '↑' : '↓'}
                </span>

                {active === l.id && (
                  <div
                    id={`layer-detail-${l.id}`}
                    className={styles.layerDetail}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <p className={styles.layerDesc}>{l.desc}</p>
                    <div className={styles.layerValue}>
                      <span className={styles.valueLabel}>Why it matters</span>
                      <p>{l.value}</p>
                    </div>
                    <div className={styles.layerTechs}>
                      {l.techs.map((t) => (
                        <span key={t} className={styles.techPill}>{t}</span>
                      ))}
                    </div>
                    {l.connects.length > 0 && (
                      <div className={styles.layerConnects}>
                        <span className={styles.connectsLabel}>Connects to:</span>
                        {l.connects.map((c) => {
                          const connected = LAYERS.find((lx) => lx.id === c)
                          return connected ? (
                            <span key={c} className={styles.connectPill}>
                              {connected.title}
                            </span>
                          ) : null
                        })}
                      </div>
                    )}
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Side panel (desktop) */}
          <div className={styles.sidePanel} aria-live="polite">
            {layer ? (
              <div className={styles.sidePanelContent}>
                <span className={styles.sideNum}>{layer.num}</span>
                <h3 className={styles.sideTitle}>{layer.title}</h3>
                <p className={styles.sideDesc}>{layer.desc}</p>
                <div className={styles.sideValue}>
                  <span className={styles.valueLabel}>Why it matters</span>
                  <p>{layer.value}</p>
                </div>
                <div className={styles.sideTechs}>
                  {layer.techs.map((t) => (
                    <span key={t} className={styles.techPill}>{t}</span>
                  ))}
                </div>
                {layer.connects.length > 0 && (
                  <div className={styles.sideConnects}>
                    <span className={styles.connectsLabel}>Connects to:</span>
                    <div className={styles.connectPills}>
                      {layer.connects.map((c) => {
                        const connected = LAYERS.find((lx) => lx.id === c)
                        return connected ? (
                          <button
                            key={c}
                            type="button"
                            className={styles.connectPill}
                            onClick={() => setActive(c)}
                          >
                            {connected.title}
                          </button>
                        ) : null
                      })}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className={styles.sidePanelEmpty}>
                <p>Select a layer to explore its role in the architecture.</p>
              </div>
            )}
          </div>
        </div>
      </Container>
    </Section>
  )
}
