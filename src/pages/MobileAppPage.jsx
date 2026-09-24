import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ExternalLink } from 'lucide-react'
import { PageMeta } from '@/components/seo/PageMeta'
import { getMobileAppDetail } from '@/content/mobileAppDetails'
import { getMobileApp } from '@/content/mobileApps'
import { NotFoundPage } from '@/pages/NotFoundPage'
import styles from './CaseStudyPage.module.css'

const TOC = [
  ['brief', 'Brief'],
  ['personas', 'Personas'],
  ['journeys', 'Journeys'],
  ['ia', 'IA'],
  ['wireframes', 'Wireframes'],
  ['gallery', 'Visuals'],
]

const emoColor = (n) =>
  n <= 2 ? 'rgba(148, 163, 184, 0.85)' : n === 3 ? 'rgba(99, 102, 241, 0.55)' : n === 4 ? 'rgba(79, 70, 229, 0.72)' : 'rgba(79, 70, 229, 0.92)'

function storeLinks(app) {
  return [
    app.playStoreUrl ? { label: 'Google Play', href: app.playStoreUrl } : null,
    app.appStoreUrl ? { label: 'App Store', href: app.appStoreUrl } : null,
    app.websiteUrl ? { label: 'Website', href: app.websiteUrl } : null,
  ].filter(Boolean)
}

export function MobileAppPage() {
  const { slug } = useParams()
  const app = getMobileApp(slug)
  const detail = app ? getMobileAppDetail(app.slug) : null
  const [activeSection, setActiveSection] = useState('brief')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        }
      },
      { rootMargin: '-18% 0px -70% 0px' },
    )
    TOC.forEach(([id]) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [slug])

  if (!app || !detail) return <NotFoundPage />

  const links = storeLinks(app)
  const shots = app.screenshots || []
  const metrics = [
    { value: app.platforms.join(' · '), label: 'Platforms', note: app.company || 'Public store listing' },
    { value: String(app.categories.length), label: app.categories.slice(0, 2).join(' · '), note: 'Product categories' },
    { value: String(detail.personas.length), label: 'Personas', note: 'Primary users of the app' },
    { value: String(detail.journeys[0]?.steps.length || 0), label: 'Journey stages', note: detail.journeys[0]?.title },
  ]

  const scrollTo = (id) => (event) => {
    event.preventDefault()
    const el = document.getElementById(id)
    if (el) window.scrollTo({ top: window.scrollY + el.getBoundingClientRect().top - 56, behavior: 'smooth' })
  }

  return (
    <>
      <PageMeta
        title={`${app.name} | Mobile Applications | Mernify`}
        description={app.shortDescription}
        canonicalPath={`/mobile-applications/${app.slug}`}
        image={shots[0]}
      />
      <div className={styles.shell} style={{ '--study-accent': app.accent || '#4f46e5' }}>
        <header className={styles.hero} data-header-theme="light">
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <p className={styles.heroEyebrow}>
                {app.categories[0]}
                {app.company ? ` · ${app.company}` : ''}
              </p>
              <h1 className={styles.heroTitle}>{app.name}</h1>
              <p className={styles.heroSummary}>{app.description}</p>
              <div className={styles.authorshipBlock}>
                <p className={styles.authorship} data-mode="observed">Public store listing</p>
                <p className={styles.authorshipNote}>
                  Personas, journeys, and screens below describe the product shown on its live store listing.
                </p>
              </div>
              <div className={styles.heroMeta}>
                <div className={styles.heroMetaItem}>
                  <span className={styles.heroMetaLabel}>Role</span>
                  <span className={styles.heroMetaValue}>Mobile App Development</span>
                </div>
                <div className={styles.heroMetaItem}>
                  <span className={styles.heroMetaLabel}>Stack</span>
                  <span className={styles.heroMetaValue}>{[...app.platforms, ...app.technologies].join(', ')}</span>
                </div>
                <div className={styles.heroMetaItem}>
                  <span className={styles.heroMetaLabel}>Stores</span>
                  <span className={styles.heroMetaValue}>{links.map((link) => link.label).join(' · ')}</span>
                </div>
              </div>
              <div className={styles.heroActions}>
                {links.map((link) => (
                  <a key={link.href} href={link.href} target="_blank" rel="noreferrer noopener" className={styles.pipTrigger}>
                    {link.label} <ExternalLink size={11} />
                  </a>
                ))}
              </div>
            </div>
            {shots[0] ? (
              <div className={styles.heroImage}>
                <div className={styles.heroImageGlow} aria-hidden="true" />
                <div className={styles.heroImageFrame}>
                  <img src={shots[0]} alt={`${app.name} store screenshot`} width={1240} height={697} />
                </div>
              </div>
            ) : null}
          </div>
          <div className={styles.heroMetrics}>
            {metrics.map((metric) => (
              <div key={metric.label} className={styles.metricCard}>
                <div className={styles.metricValue}>{metric.value}</div>
                <div className={styles.metricLabel}>{metric.label}</div>
                <div className={styles.metricNote}>{metric.note}</div>
              </div>
            ))}
          </div>
        </header>

        <nav className={styles.toc} aria-label="Application sections" data-header-theme="light">
          <div className={styles.tocInner}>
            {TOC.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={styles.tocLink} data-active={activeSection === id || undefined} onClick={scrollTo(id)}>
                {label}
              </a>
            ))}
          </div>
        </nav>

        <section id="brief" className={styles.section} data-header-theme="light">
          <div className={styles.briefGrid}>
            <div className={styles.sectionIntro}>
              <h2 className={styles.sectionTitle}>Product brief</h2>
              <p className={styles.briefClient}>{app.description}</p>
            </div>
            <div className={styles.briefCols}>
              <div>
                <h3 className={styles.briefColTitle}>The problem</h3>
                <ul className={styles.briefList}>
                  {detail.personas.flatMap((persona) => persona.frustrations).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className={`${styles.briefColTitle} ${styles.accent}`}>The goal</h3>
                <ul className={`${styles.briefList} ${styles.accentBorder}`}>
                  {app.features.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className={styles.briefColTitle}>Constraints</h3>
                <ul className={styles.briefList}>
                  {app.platforms.map((item) => (
                    <li key={item}>Ships on {item}</li>
                  ))}
                  <li>Public store screenshots are the visual source for this page.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="personas" className={styles.sectionDark} data-header-theme="light">
          <div className={styles.sectionInner}>
            <div className={styles.sectionIntro}>
              <h2 className={styles.sectionTitle}>Who it is for</h2>
              <p className={styles.sectionSub}>Personas taken from the jobs the store listing describes.</p>
            </div>
            <div className={styles.personaGrid}>
              {detail.personas.map((persona) => (
                <div key={persona.name} className={styles.personaCard}>
                  <div className={styles.personaHeader}>
                    <span className={styles.personaName}>{persona.name}</span>
                  </div>
                  <p className={styles.personaRole}>{persona.role}</p>
                  <blockquote className={styles.personaQuote}>&ldquo;{persona.quote}&rdquo;</blockquote>
                  <div className={styles.personaCols}>
                    <div>
                      <p className={styles.personaColLabel}>Goals</p>
                      <ul className={styles.personaItems}>
                        {persona.goals.map((goal) => (
                          <li key={goal}>{goal}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className={styles.personaColLabel}>Frustrations</p>
                      <ul className={styles.personaItems}>
                        {persona.frustrations.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <p className={styles.personaTech}>Context — {persona.tech}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="journeys" className={`${styles.section} ${styles.journeysSection}`} data-header-theme="light">
          <div className={styles.sectionIntro}>
            <h2 className={styles.sectionTitle}>User journeys</h2>
            <p className={styles.sectionSub}>Bar height is the sentiment at that stage of the listing&apos;s main flow.</p>
          </div>
          {detail.journeys.map((journey) => (
            <div key={journey.title} className={styles.journeyBlock}>
              <div className={styles.journeyHeader}>
                <span className={styles.journeyTitle}>{journey.title}</span>
                <span className={styles.journeySubtitle}>{journey.subtitle}</span>
              </div>
              <ol className={styles.journeyTimeline}>
                {journey.steps.map((step, index) => (
                  <li key={step.stage} className={styles.journeyStep}>
                    <div className={styles.stepRail} aria-hidden="true">
                      <span className={styles.stepNum}>{String(index + 1).padStart(2, '0')}</span>
                      <span className={styles.stepNode} />
                    </div>
                    <div className={styles.stepPanel}>
                      <div className={styles.stepMeta}>
                        <p className={styles.stepStage}>{step.stage}</p>
                        <span className={styles.stepEmotion}>
                          {['', 'frustrated', 'wary', 'neutral', 'confident', 'delighted'][step.emotion]}
                        </span>
                        <div className={styles.stepBar}>
                          <div className={styles.stepBarFill} style={{ height: `${20 + step.emotion * 16}%`, background: emoColor(step.emotion) }} />
                        </div>
                      </div>
                      <div className={styles.stepContent}>
                        <p className={styles.stepAction}>{step.action}</p>
                        <p className={styles.stepThought}>&ldquo;{step.thought}&rdquo;</p>
                        <div className={styles.stepSplit}>
                          <div className={styles.stepPainBlock}>
                            <p className={styles.stepPainLabel}>Pain</p>
                            <p className={styles.stepPain}>{step.pain}</p>
                          </div>
                          <div className={styles.stepOppBlock}>
                            <p className={styles.stepOppLabel}>Design response</p>
                            <p className={styles.stepOpp}>{step.opp}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </section>

        <section id="ia" className={styles.sectionDark} data-header-theme="light">
          <div className={styles.sectionInner}>
            <div className={styles.sectionIntro}>
              <h2 className={styles.sectionTitle}>Information architecture</h2>
              <p className={styles.sectionSub}>Top level is the app structure. Children are the screens beneath it.</p>
            </div>
            <div className={styles.sitemapGrid}>
              {detail.sitemap.map((node) => (
                <div key={node.label} className={styles.sitemapCard}>
                  <div className={styles.sitemapCardHead}>{node.label}</div>
                  <ul className={styles.sitemapCardItems}>
                    {node.children.map((child) => (
                      <li key={child}>{child}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="wireframes" className={styles.section} data-header-theme="light">
          <div className={styles.sectionIntro}>
            <h2 className={styles.sectionTitle}>Wireframe to final</h2>
            <p className={styles.sectionSub}>The screen structure, and what the store listing shows as shipped.</p>
          </div>
          <div className={styles.wireframeList}>
            {detail.wireframes.map((frame, index) => (
              <div key={frame.screen} className={styles.wireframeCard}>
                <div>
                  <p className={styles.wireScreen}>{frame.screen}</p>
                  <p className={styles.wireNum}>{String(index + 1).padStart(2, '0')}</p>
                </div>
                <div>
                  <p className={styles.wireColLabel}>Wireframe spec</p>
                  <ul className={styles.wireItems}>
                    {frame.wire.map((item) => (
                      <li key={item.n}>
                        <span>{item.n}</span>
                        <span>{item.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className={`${styles.wireColLabel} ${styles.accent}`}>Shipped, and why</p>
                  <ul className={`${styles.wireItems} ${styles.wireShipped}`}>
                    {frame.final.map((item) => (
                      <li key={item}>
                        <span />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {shots.length ? (
          <section id="gallery" className={styles.section} data-header-theme="light">
            <div className={styles.sectionIntro}>
              <h2 className={styles.sectionTitle}>Screenshots & visuals</h2>
              <p className={styles.sectionSub}>Images published on the Google Play or App Store listing.</p>
            </div>
            <div className={styles.galleryGrid}>
              {shots.map((src, index) => (
                <figure key={src} className={styles.galleryItem}>
                  <div className={styles.galleryFrame}>
                    <img src={src} alt={`${app.name} screenshot ${index + 1}`} loading="lazy" decoding="async" />
                  </div>
                  <figcaption>Store screenshot {index + 1}</figcaption>
                </figure>
              ))}
            </div>
          </section>
        ) : null}

        <section className={styles.section}>
          <div className={styles.sectionIntro}>
            <Link to="/mobile-applications" className={styles.pipTrigger}>
              All mobile apps
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}
