import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ExternalLink, Monitor } from 'lucide-react'
import { PageMeta } from '@/components/seo/PageMeta'
import { Button, Container, Text } from '@/components/ui'
import { SITE } from '@/constants/site'
import { getCaseStudyBySlug, getNextCaseStudy, publishedCaseStudies } from '@/content/caseStudies'
import { NotFoundPage } from '@/pages/NotFoundPage'
import styles from './CaseStudyPage.module.css'

const TOC = [
  ['brief', 'Brief'],
  ['personas', 'Personas'],
  ['journeys', 'Journeys'],
  ['ia', 'IA'],
  ['wireframes', 'Wireframes'],
  ['responsive', 'Responsive'],
  ['audit', 'Audit'],
  ['beforeafter', 'Before / After'],
  ['results', 'Results'],
]

// Sentiment bar: emotion 1–5 → height % and colour (light theme)
const emoColor = (n) =>
  n <= 2
    ? 'rgba(15,23,42,0.12)'
    : n === 3
      ? 'rgba(15,23,42,0.22)'
      : 'rgba(79,70,229,0.55)'

export function CaseStudyPage() {
  const { slug } = useParams()
  const study = getCaseStudyBySlug(slug)
  const [activeSection, setActiveSection] = useState('')
  const [previewDevice, setPreviewDevice] = useState('desktop')
  const [iframeErr, setIframeErr] = useState(false)
  const shellRef = useRef(null)

  // Dev: Vite middleware at /site-preview. Production: Express server at /api/site-preview
  const proxyBase = import.meta.env.DEV ? '/site-preview' : '/api/site-preview'
  const proxyUrl = study?.liveUrl
    ? `${proxyBase}?url=${encodeURIComponent(study.liveUrl)}`
    : null

  const DEVICES = [
    { id: 'mobile',  label: 'Mobile',  width: 390  },
    { id: 'tablet',  label: 'Tablet',  width: 768  },
    { id: 'desktop', label: 'Desktop', width: 1280 },
  ]

  useEffect(() => { setIframeErr(false) }, [previewDevice, study?.slug])

  // JSON-LD
  useEffect(() => {
    if (!study || study.status !== 'published') return
    const id = 'case-study-jsonld'
    let el = document.getElementById(id)
    if (!el) {
      el = document.createElement('script')
      el.type = 'application/ld+json'
      el.id = id
      document.head.appendChild(el)
    }
    el.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: study.title,
      description: study.seo?.description || study.tagline,
      image: `${SITE.url}${study.featuredImage}`,
      author: { '@type': 'Organization', name: SITE.name },
      mainEntityOfPage: `${SITE.url}/case-studies/${study.slug}`,
    })
    return () => { document.getElementById(id)?.remove() }
  }, [study])

  // Scrollspy
  useEffect(() => {
    if (!study || study.status !== 'published') return
    const ids = TOC.map(([id]) => id)
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActiveSection(e.target.id)
        }
      },
      { rootMargin: '-10% 0px -80% 0px' }
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [study])

  if (!study) return <NotFoundPage />

  if (study.status !== 'published') {
    return (
      <>
        <PageMeta
          title="Case study pending publication"
          description="This case study is not publicly available yet."
          canonicalPath={`/case-studies/${study.slug}`}
          noIndex
        />
        <div className={styles.shell}>
          <div className={styles.pending}>
            <div className={styles.pendingInner}>
              <h1>This story is not published yet</h1>
              <p style={{ color: 'var(--cs-muted)' }}>
                We only publish client-approved case studies with verified outcomes.
              </p>
              <div className={styles.pendingActions}>
                <Button as={Link} to="/contact">Discuss a similar project</Button>
                <Button as={Link} to="/case-studies" variant="secondary">Back to case studies</Button>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  const next = getNextCaseStudy(study.slug)
  const prev = (() => {
    const idx = publishedCaseStudies.findIndex((s) => s.slug === study.slug)
    return idx > 0 ? publishedCaseStudies[idx - 1] : publishedCaseStudies[publishedCaseStudies.length - 1]
  })()

  const scrollTo = (id) => (e) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) window.scrollTo({ top: window.scrollY + el.getBoundingClientRect().top - 56, behavior: 'smooth' })
  }

  return (
    <>
      <PageMeta
        title={study.seo?.title || study.title}
        description={study.seo?.description || study.tagline}
        canonicalPath={`/case-studies/${study.slug}`}
        image={study.featuredImage}
      />

      <div className={styles.shell} ref={shellRef}>

        {/* ── Hero ─────────────────────────────────── */}
        <header className={styles.hero}>
          <p className={styles.heroEyebrow}>
            {study.category} · {study.industry}
          </p>
          <h1 className={styles.heroTitle}>{study.title}</h1>
          <p className={styles.heroSummary}>{study.tagline}</p>

          <div className={styles.heroMeta}>
            <div className={styles.heroMetaItem}>
              <span className={styles.heroMetaLabel}>Role</span>
              <span className={styles.heroMetaValue}>{study.services?.join(' · ')}</span>
            </div>
            <div className={styles.heroMetaItem}>
              <span className={styles.heroMetaLabel}>Stack</span>
              <span className={styles.heroMetaValue}>{study.technology?.join(', ')}</span>
            </div>
            {study.liveUrl && (
              <div className={styles.heroMetaItem}>
                <span className={styles.heroMetaLabel}>Live site</span>
                <span className={styles.heroMetaValue}>{new URL(study.liveUrl).hostname}</span>
              </div>
            )}
          </div>

          {/* Hero live site link */}
          {study.liveUrl && (
            <div className={styles.heroActions}>
              <a
                href={study.liveUrl}
                target="_blank"
                rel="noreferrer noopener"
                className={styles.pipTrigger}
              >
                <Monitor size={13} /> Visit live site <ExternalLink size={11} />
              </a>
            </div>
          )}

          {study.metrics?.length ? (
            <div className={styles.heroMetrics}>
              {study.metrics.map((m) => (
                <div key={m.label} className={styles.metricCard}>
                  <div className={styles.metricValue}>{m.value}</div>
                  <div className={styles.metricLabel}>{m.label}</div>
                  {m.note && <div className={styles.metricNote}>{m.note}</div>}
                </div>
              ))}
            </div>
          ) : null}
        </header>

        {/* Featured image */}
        {study.featuredImage && (
          <div className={styles.heroImage}>
            <img
              src={study.featuredImage}
              alt={`${study.title} — featured screenshot`}
              loading="eager"
              decoding="async"
              width={1240}
              height={697}
            />
          </div>
        )}

        {/* ── TOC ─────────────────────────────────── */}
        <nav className={styles.toc} aria-label="Case study sections">
          <div className={styles.tocInner}>
            {TOC.map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                className={styles.tocLink}
                data-active={activeSection === id || undefined}
                onClick={scrollTo(id)}
              >
                {label}
              </a>
            ))}
          </div>
        </nav>

        {/* ── 1. Brief ─────────────────────────────── */}
        {study.brief && (
          <section id="brief" className={styles.section}>
            <div className={styles.briefGrid}>
              <div>
                <h2 className={styles.sectionTitle}>Client brief</h2>
                <p className={styles.briefClient}>{study.brief.client}</p>
              </div>
              <div className={styles.briefCols}>
                {study.brief.problem?.length ? (
                  <div>
                    <h3 className={styles.briefColTitle}>The problem</h3>
                    <ul className={styles.briefList}>
                      {study.brief.problem.map((i) => <li key={i}>{i}</li>)}
                    </ul>
                  </div>
                ) : null}
                {study.brief.goal?.length ? (
                  <div>
                    <h3 className={`${styles.briefColTitle} ${styles.accent}`}>The goal</h3>
                    <ul className={`${styles.briefList} ${styles.accentBorder}`}>
                      {study.brief.goal.map((i) => <li key={i}>{i}</li>)}
                    </ul>
                  </div>
                ) : null}
                {study.brief.constraints?.length ? (
                  <div>
                    <h3 className={styles.briefColTitle}>Constraints</h3>
                    <ul className={styles.briefList}>
                      {study.brief.constraints.map((i) => <li key={i}>{i}</li>)}
                    </ul>
                  </div>
                ) : null}
              </div>
            </div>
          </section>
        )}

        {/* ── 2. Personas ──────────────────────────── */}
        {study.personas?.length ? (
          <section id="personas" className={`${styles.sectionDark}`}>
            <div className={styles.sectionInner}>
              <h2 className={styles.sectionTitle}>Who it is for</h2>
              <p className={styles.sectionSub}>Two primary personas drove every layout decision.</p>
              <div className={styles.personaGrid}>
                {study.personas.map((p) => (
                  <div key={p.name} className={styles.personaCard}>
                    <div className={styles.personaHeader}>
                      <span className={styles.personaName}>{p.name}</span>
                      <span className={styles.personaAge}>{p.age}</span>
                    </div>
                    <p className={styles.personaRole}>{p.role}</p>
                    <blockquote className={styles.personaQuote}>"{p.quote}"</blockquote>
                    <div className={styles.personaCols}>
                      <div>
                        <p className={styles.personaColLabel}>Goals</p>
                        <ul className={styles.personaItems}>
                          {p.goals.map((g) => <li key={g}>{g}</li>)}
                        </ul>
                      </div>
                      <div>
                        <p className={styles.personaColLabel}>Frustrations</p>
                        <ul className={styles.personaItems}>
                          {p.frustrations.map((f) => <li key={f}>{f}</li>)}
                        </ul>
                      </div>
                    </div>
                    <p className={styles.personaTech}>Context — {p.tech}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {/* ── 3. Journeys ──────────────────────────── */}
        {study.journeys?.length ? (
          <section id="journeys" className={styles.section}>
            <h2 className={styles.sectionTitle}>User journeys</h2>
            <p className={styles.sectionSub}>
              Two journeys mapped separately: the end user and the client. Bar height represents sentiment at each stage.
            </p>
            {study.journeys.map((j) => (
              <div key={j.title} className={styles.journeyBlock}>
                <div className={styles.journeyHeader}>
                  <span className={styles.journeyTitle}>{j.title}</span>
                  <span className={styles.journeySubtitle}>{j.subtitle}</span>
                </div>
                <div className={styles.journeySteps}>
                  {j.steps.map((s, i) => (
                    <div key={i} className={styles.stepCard}>
                      <div className={styles.stepTop}>
                        <span>{String(i + 1).padStart(2, '0')}</span>
                        <span>{['', 'frustrated', 'wary', 'neutral', 'confident', 'delighted'][s.emotion] || ''}</span>
                      </div>
                      <div className={styles.stepBar}>
                        <div
                          className={styles.stepBarFill}
                          style={{
                            height: `${20 + s.emotion * 16}%`,
                            background: emoColor(s.emotion),
                          }}
                        />
                      </div>
                      <p className={styles.stepStage}>{s.stage}</p>
                      <p className={styles.stepAction}>{s.action}</p>
                      <p className={styles.stepThought}>"{s.thought}"</p>
                      <div>
                        <p className={styles.stepPainLabel}>Pain</p>
                        <p className={styles.stepPain}>{s.pain}</p>
                      </div>
                      <div>
                        <p className={styles.stepOppLabel}>Design response</p>
                        <p className={styles.stepOpp}>{s.opp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>
        ) : null}

        {/* ── 4. IA ────────────────────────────────── */}
        {study.sitemap?.length ? (
          <section id="ia" className={`${styles.sectionDark}`}>
            <div className={styles.sectionInner}>
              <h2 className={styles.sectionTitle}>Information architecture</h2>
              <p className={styles.sectionSub}>The site map as shipped. Top level is navigation; children are the sections beneath it.</p>
              <div className={styles.sitemapGrid}>
                {study.sitemap.map((n) => (
                  <div key={n.label} className={styles.sitemapCard}>
                    <div className={styles.sitemapCardHead}>{n.label}</div>
                    <ul className={styles.sitemapCardItems}>
                      {n.children.map((c) => <li key={c}>{c}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {/* ── 5. Wireframes ────────────────────────── */}
        {study.wireframes?.length ? (
          <section id="wireframes" className={styles.section}>
            <h2 className={styles.sectionTitle}>Wireframe to final</h2>
            <p className={styles.sectionSub}>What was specified, and what changed once it met real content, real devices, and real testing.</p>
            <div className={styles.wireframeList}>
              {study.wireframes.map((w, i) => (
                <div key={w.screen} className={styles.wireframeCard}>
                  <div>
                    <p className={styles.wireScreen}>{w.screen}</p>
                    <p className={styles.wireNum}>{String(i + 1).padStart(2, '0')}</p>
                  </div>
                  <div>
                    <p className={styles.wireColLabel}>Wireframe spec</p>
                    <ul className={styles.wireItems}>
                      {w.wire.map((item) => (
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
                      {w.final.map((item) => (
                        <li key={item}><span></span><span>{item}</span></li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {/* ── 6. Responsive ────────────────────────── */}
        {study.responsive && (
          <section id="responsive" className={styles.section}>
            <div className={styles.responsiveHead}>
              <div>
                <h2 className={styles.sectionTitle}>Responsive review</h2>
                <p className={styles.sectionSub}>Device frames, a breakpoint pass/fail table, and the annotated findings from testing.</p>
              </div>
              {study.liveUrl && (
                <a
                  href={study.liveUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className={styles.liveSiteBtn}
                >
                  <Monitor size={13} /> Open live site <ExternalLink size={11} />
                </a>
              )}
            </div>

            {/* Device picker */}
            <div className={styles.devicePicker}>
              {DEVICES.map((d) => (
                <button
                  key={d.id}
                  className={[styles.deviceBtn, previewDevice === d.id ? styles.deviceBtnActive : ''].filter(Boolean).join(' ')}
                  onClick={() => setPreviewDevice(d.id)}
                >
                  {d.label} <span className={styles.devicePx}>{d.width}px</span>
                </button>
              ))}
            </div>

            {/* Live site in device frame (proxy strips X-Frame-Options) */}
            <div className={styles.iframeStage}>
              {iframeErr ? (
                <div className={styles.iframeFallback}>
                  <p>This site couldn't load in-page.</p>
                  <a href={study.liveUrl} target="_blank" rel="noreferrer noopener" className={styles.liveSiteBtn}>
                    <Monitor size={13} /> Open live site <ExternalLink size={11} />
                  </a>
                </div>
              ) : previewDevice === 'mobile' ? (
                <div className={styles.phoneFrame}>
                  <div className={styles.phoneTop}><span className={styles.phoneNotch} /></div>
                  <div className={styles.phoneScreen}>
                    <iframe
                      key={`${study.slug}-m`}
                      src={proxyUrl}
                      title={`${study.title} mobile`}
                      sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                      className={styles.phoneIframe}
                      onError={() => setIframeErr(true)}
                    />
                  </div>
                  <div className={styles.phoneBottom}><span className={styles.phoneHomeBar} /></div>
                </div>
              ) : previewDevice === 'tablet' ? (
                <div className={styles.tabletFrame}>
                  <div className={styles.tabletCamera} />
                  <div className={styles.tabletScreen}>
                    <iframe
                      key={`${study.slug}-t`}
                      src={proxyUrl}
                      title={`${study.title} tablet`}
                      sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                      className={styles.tabletIframe}
                      onError={() => setIframeErr(true)}
                    />
                  </div>
                </div>
              ) : (
                <div className={styles.browserFrame}>
                  <div className={styles.browserBar}>
                    <span className={styles.browserDots}><i /><i /><i /></span>
                    <span className={styles.browserUrl}>{study.liveUrl}</span>
                  </div>
                  <div className={styles.browserScreen}>
                    <iframe
                      key={`${study.slug}-d`}
                      src={proxyUrl}
                      title={`${study.title} desktop`}
                      sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                      className={styles.desktopIframe}
                      onError={() => setIframeErr(true)}
                    />
                  </div>
                </div>
              )}
            </div>

            {study.responsive.breakpoints?.length ? (
              <table className={styles.bpTable}>
                <thead>
                  <tr>
                    <th>Breakpoint</th>
                    <th>Width</th>
                    <th>Status</th>
                    <th>Behaviour</th>
                  </tr>
                </thead>
                <tbody>
                  {study.responsive.breakpoints.map((b) => (
                    <tr key={b.name}>
                      <td>{b.name}</td>
                      <td>{b.w}</td>
                      <td><span className={styles.bpPass}>{b.status === 'pass' ? 'Pass' : 'Fixed'}</span></td>
                      <td>{b.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : null}

            {study.responsive.findings?.length ? (
              <div className={styles.findingsList}>
                {study.responsive.findings.map((f) => (
                  <div key={f.num} className={styles.findingItem}>
                    <span className={styles.findingNum}>{f.num}</span>
                    <span>{f.text}</span>
                  </div>
                ))}
              </div>
            ) : null}
          </section>
        )}

        {/* ── 7. Audit ─────────────────────────────── */}
        {study.audit && (
          <section id="audit" className={`${styles.sectionDark}`}>
            <div className={styles.sectionInner}>
              <h2 className={styles.sectionTitle}>Performance &amp; SEO audit</h2>
              <p className={styles.sectionSub}>Mobile, 4G throttled. Before and after optimisation.</p>
              {study.audit.rows?.length ? (
                <div className={styles.auditGrid}>
                  {study.audit.rows.map((r) => (
                    <div key={r.label} className={styles.auditCard}>
                      <p className={styles.auditCardLabel}>{r.label}</p>
                      <div className={styles.auditScores}>
                        <span className={styles.auditBefore}>{r.before}</span>
                        <span className={styles.auditArrow}>→</span>
                        <span className={styles.auditAfter}>{r.after}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}
              {study.audit.fixes?.length ? (
                <ul className={styles.auditFixes}>
                  {study.audit.fixes.map((f) => <li key={f}>{f}</li>)}
                </ul>
              ) : null}
            </div>
          </section>
        )}

        {/* ── 8. Before / After ────────────────────── */}
        {study.beforeAfter?.length ? (
          <section id="beforeafter" className={styles.section}>
            <h2 className={styles.sectionTitle}>Before and after</h2>
            <p className={styles.sectionSub}>The five decisions that carried the project.</p>
            <div className={styles.baList}>
              {study.beforeAfter.map((b) => (
                <div key={b.aspect} className={styles.baCard}>
                  <span className={styles.baAspect}>{b.aspect}</span>
                  <span className={styles.baBefore}>{b.before}</span>
                  <span className={styles.baArrow}>→</span>
                  <span className={styles.baAfter}>{b.after}</span>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {/* ── 9. Results ───────────────────────────── */}
        {(study.metrics?.length || study.techNotes?.length) ? (
          <section id="results" className={`${styles.sectionDark}`}>
            <div className={styles.sectionInner}>
              <h2 className={styles.sectionTitle}>Results</h2>
              <p className={styles.sectionSub}>Outcomes attributed to the live site and public client statements.</p>
              {study.metrics?.length ? (
                <div className={styles.resultsMetrics}>
                  {study.metrics.map((m) => (
                    <div key={m.label} className={styles.resultCard}>
                      <div className={styles.resultValue}>{m.value}</div>
                      <div className={styles.resultLabel}>{m.label}</div>
                      {m.note && <div className={styles.resultNote}>{m.note}</div>}
                    </div>
                  ))}
                </div>
              ) : null}
              {study.techNotes?.length ? (
                <ul className={styles.techNotes} style={{ marginTop: '2rem' }}>
                  {study.techNotes.map((t) => <li key={t}>{t}</li>)}
                </ul>
              ) : null}
            </div>
          </section>
        ) : null}

        {/* ── Gallery fallback (no detailed sections) ─ */}
        {!study.brief && study.gallery?.length ? (
          <div className={styles.heroImage} style={{ marginTop: '2.5rem' }}>
            <div className={styles.galleryGrid}>
              {study.gallery.map((item) => (
                <figure key={item.src}>
                  <img src={item.src} alt={item.alt} loading="lazy" decoding="async" width={960} height={540} />
                  {item.caption && <figcaption>{item.caption}</figcaption>}
                </figure>
              ))}
            </div>
          </div>
        ) : null}

        {/* ── Prev / Next ──────────────────────────── */}
        <div className={styles.prevNext}>
          {prev && (
            <Link to={`/case-studies/${prev.slug}`} className={styles.prevNextLink}>
              <span className={styles.prevNextHint}>← Previous</span>
              <span className={styles.prevNextTitle}>{prev.title}</span>
            </Link>
          )}
          <Link to="/case-studies" className={styles.allBtn}>All projects</Link>
          {next && (
            <Link to={`/case-studies/${next.slug}`} className={`${styles.prevNextLink}`} style={{ textAlign: 'right' }}>
              <span className={styles.prevNextHint}>Next →</span>
              <span className={styles.prevNextTitle}>{next.title}</span>
            </Link>
          )}
        </div>


      </div>
    </>
  )
}
