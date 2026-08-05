import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ExternalLink, Monitor } from 'lucide-react'
import { PageMeta } from '@/components/seo/PageMeta'
import { Button, Container, Text } from '@/components/ui'
import { SITE } from '@/constants/site'
import { getCaseStudyBySlug, getNextCaseStudy, publishedCaseStudies } from '@/content/caseStudies'
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll'
import { authorshipLabel, getAuthorship } from '@/lib/authorship'
import { resolveProxyUrl } from '@/lib/env'
import { NotFoundPage } from '@/pages/NotFoundPage'
import styles from './CaseStudyPage.module.css'

const TOC = [
  ['brief', 'Brief'],
  ['personas', 'Personas'],
  ['journeys', 'Journeys'],
  ['ia', 'IA'],
  ['wireframes', 'Wireframes'],
  ['responsive', 'Responsive'],
  ['gallery', 'Visuals'],
  ['audit', 'Audit'],
  ['beforeafter', 'Before / After'],
  ['results', 'Results'],
]

// Sentiment bar: emotion 1–5 → height % and colour (light theme)
const emoColor = (n) =>
  n <= 2
    ? 'rgba(148, 163, 184, 0.85)'
    : n === 3
      ? 'rgba(99, 102, 241, 0.55)'
      : n === 4
        ? 'rgba(79, 70, 229, 0.72)'
        : 'rgba(79, 70, 229, 0.92)'

export function CaseStudyPage() {
  const { slug } = useParams()
  const study = getCaseStudyBySlug(slug)
  const [activeSection, setActiveSection] = useState('')
  const [previewDevice, setPreviewDevice] = useState('desktop')
  const [iframeErr, setIframeErr] = useState(null) // null=probing, true=failed, false=ready
  const shellRef = useRef(null)

  // Same-origin /site-preview in dev + Cloudflare Pages; optional absolute Worker via VITE_PROXY_URL
  const proxyBase = resolveProxyUrl()
  const proxyUrl = study?.liveUrl
    ? `${proxyBase}?url=${encodeURIComponent(study.liveUrl)}`
    : null

  const DEVICES = [
    { id: 'mobile',  label: 'Mobile',  width: 390  },
    { id: 'tablet',  label: 'Tablet',  width: 768  },
    { id: 'desktop', label: 'Desktop', width: 1280 },
  ]

  // Probe the preview proxy. Uses ?probe=1 JSON so SPA fallbacks don't look healthy.
  useEffect(() => {
    if (!proxyUrl || !study?.liveUrl) {
      setIframeErr(true)
      return undefined
    }

    let cancelled = false
    setIframeErr(null)
    const controller = new AbortController()
    const timer = window.setTimeout(() => controller.abort(), 10000)
    const probeUrl = `${proxyUrl}${proxyUrl.includes('?') ? '&' : '?'}probe=1`

    ;(async () => {
      try {
        const res = await fetch(probeUrl, {
          method: 'GET',
          signal: controller.signal,
          credentials: 'omit',
          headers: { Accept: 'application/json' },
        })
        if (cancelled) return
        if (!res.ok) {
          setIframeErr(true)
          return
        }
        const ct = res.headers.get('content-type') || ''
        if (!ct.includes('application/json')) {
          // SPA host rewrote /site-preview → index.html
          setIframeErr(true)
          return
        }
        const data = await res.json()
        if (!cancelled) setIframeErr(!(data && data.ok === true))
      } catch (err) {
        if (!cancelled && err?.name !== 'AbortError') setIframeErr(true)
      } finally {
        window.clearTimeout(timer)
      }
    })()

    return () => {
      cancelled = true
      controller.abort()
      window.clearTimeout(timer)
    }
  }, [proxyUrl, study?.liveUrl, study?.slug])

  useRevealOnScroll(shellRef, {
    selector: '[data-fade-up]',
    start: 'top 88%',
    duration: 0.85,
    once: true,
    ease: 'power3.out',
    deps: [study?.slug],
  })

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
      { rootMargin: '-18% 0px -70% 0px' }
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
  const authorship = getAuthorship(study)
  const prev = (() => {
    const idx = publishedCaseStudies.findIndex((s) => s.slug === study.slug)
    return idx > 0 ? publishedCaseStudies[idx - 1] : publishedCaseStudies[publishedCaseStudies.length - 1]
  })()

  const tocItems = TOC.filter(([id]) => {
    if (id === 'brief') return Boolean(study.brief)
    if (id === 'personas') return Boolean(study.personas?.length)
    if (id === 'journeys') return Boolean(study.journeys?.length)
    if (id === 'ia') return Boolean(study.sitemap?.length)
    if (id === 'wireframes') return Boolean(study.wireframes?.length)
    if (id === 'responsive') return Boolean(study.responsive)
    if (id === 'gallery') return Boolean(study.gallery?.length)
    if (id === 'audit') return Boolean(study.audit)
    if (id === 'beforeafter') return Boolean(study.beforeAfter?.length)
    if (id === 'results') return Boolean(study.metrics?.length || study.techNotes?.length)
    return true
  })

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

      <div
        className={styles.shell}
        ref={shellRef}
        style={{ '--study-accent': study.accent || '#4f46e5' }}
      >

        {/* ── Hero ─────────────────────────────────── */}
        <header className={styles.hero} data-header-theme="light">
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy} data-fade-up>
              <p className={styles.heroEyebrow}>
                {study.category} · {study.industry}
              </p>
              <h1 className={styles.heroTitle}>{study.title}</h1>
              <p className={styles.heroSummary}>{study.tagline}</p>

              <div className={styles.authorshipBlock}>
                <p
                  className={styles.authorship}
                  data-mode={authorship.mode}
                  title={authorship.note}
                >
                  {authorshipLabel(authorship.mode)}
                  {authorship.clientApproved ? ' · Client-approved' : null}
                </p>
                {authorship.mode !== 'delivered' ? (
                  <p className={styles.authorshipNote}>{authorship.note}</p>
                ) : null}
              </div>

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
            </div>

            {study.featuredImage ? (
              <div className={styles.heroImage} data-fade-up data-delay="80">
                <div className={styles.heroImageGlow} aria-hidden="true" />
                <div className={styles.heroImageFrame}>
                  <img
                    src={study.featuredImage}
                    alt={`${study.title} — featured screenshot`}
                    loading="eager"
                    decoding="async"
                    width={1240}
                    height={697}
                  />
                </div>
              </div>
            ) : null}
          </div>

          {study.metrics?.length ? (
            <div className={styles.heroMetrics} data-fade-up data-delay="120">
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

        {/* ── TOC ─────────────────────────────────── */}
        <nav className={styles.toc} aria-label="Case study sections" data-header-theme="light">
          <div className={styles.tocInner}>
            {tocItems.map(([id, label]) => (
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
          <section id="brief" className={styles.section} data-header-theme="light" data-fade-up>
            <div className={styles.briefGrid}>
              <div className={styles.sectionIntro}>
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
          <section id="personas" className={`${styles.sectionDark}`} data-header-theme="light" data-fade-up>
            <div className={styles.sectionInner}>
              <div className={styles.sectionIntro}>
                <h2 className={styles.sectionTitle}>Who it is for</h2>
                <p className={styles.sectionSub}>Two primary personas drove every layout decision.</p>
              </div>
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
          <section
            id="journeys"
            className={`${styles.section} ${styles.journeysSection}`}
            data-header-theme="light"
            data-fade-up
          >
            <div className={styles.sectionIntro}>
              <h2 className={styles.sectionTitle}>User journeys</h2>
              <p className={styles.sectionSub}>
                Two journeys mapped separately: the end user and the client. Bar height represents sentiment at each stage.
              </p>
            </div>
            {study.journeys.map((j) => (
              <div key={j.title} className={styles.journeyBlock}>
                <div className={styles.journeyHeader}>
                  <span className={styles.journeyTitle}>{j.title}</span>
                  <span className={styles.journeySubtitle}>{j.subtitle}</span>
                </div>
                <ol className={styles.journeyTimeline}>
                  {j.steps.map((s, i) => (
                    <li
                      key={i}
                      className={styles.journeyStep}
                      style={{ '--step-emotion': s.emotion }}
                      data-fade-up
                    >
                      <div className={styles.stepRail} aria-hidden="true">
                        <span className={styles.stepNum}>{String(i + 1).padStart(2, '0')}</span>
                        <span className={styles.stepNode} />
                      </div>
                      <div className={styles.stepPanel}>
                        <div className={styles.stepMeta}>
                          <p className={styles.stepStage}>{s.stage}</p>
                          <span className={styles.stepEmotion}>
                            {['', 'frustrated', 'wary', 'neutral', 'confident', 'delighted'][s.emotion] || ''}
                          </span>
                          <div className={styles.stepBar}>
                            <div
                              className={styles.stepBarFill}
                              style={{
                                height: `${20 + s.emotion * 16}%`,
                                background: emoColor(s.emotion),
                              }}
                            />
                          </div>
                        </div>
                        <div className={styles.stepContent}>
                          <p className={styles.stepAction}>{s.action}</p>
                          <p className={styles.stepThought}>"{s.thought}"</p>
                          <div className={styles.stepSplit}>
                            <div className={styles.stepPainBlock}>
                              <p className={styles.stepPainLabel}>Pain</p>
                              <p className={styles.stepPain}>{s.pain}</p>
                            </div>
                            <div className={styles.stepOppBlock}>
                              <p className={styles.stepOppLabel}>Design response</p>
                              <p className={styles.stepOpp}>{s.opp}</p>
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
        ) : null}

        {/* ── 4. IA ────────────────────────────────── */}
        {study.sitemap?.length ? (
          <section id="ia" className={`${styles.sectionDark}`} data-header-theme="light" data-fade-up>
            <div className={styles.sectionInner}>
              <div className={styles.sectionIntro}>
                <h2 className={styles.sectionTitle}>Information architecture</h2>
                <p className={styles.sectionSub}>The site map as shipped. Top level is navigation; children are the sections beneath it.</p>
              </div>
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
          <section id="wireframes" className={styles.section} data-header-theme="light" data-fade-up>
            <div className={styles.sectionIntro}>
              <h2 className={styles.sectionTitle}>Wireframe to final</h2>
              <p className={styles.sectionSub}>What was specified, and what changed once it met real content, real devices, and real testing.</p>
            </div>
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
          <section id="responsive" className={`${styles.section} ${styles.sectionAlt}`} data-header-theme="light" data-fade-up>
            <div className={styles.responsiveHead}>
              <div className={styles.sectionIntro}>
                <h2 className={styles.sectionTitle}>Responsive review</h2>
                <p className={styles.sectionSub}>Device frames, a breakpoint pass/fail table, and the annotated findings from testing.</p>
              </div>
              {study.liveUrl && (
                <Button
                  as="a"
                  href={study.liveUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  variant="secondary"
                  size="sm"
                >
                  Open live site
                </Button>
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
              {iframeErr === null ? (
                <div className={styles.iframeFallback} aria-busy="true">
                  <p>Loading live preview…</p>
                </div>
              ) : iframeErr ? (
                <div className={styles.iframeFallback}>
                  <p>This site couldn&apos;t load in-page. Open it live, or ensure the /site-preview proxy is deployed.</p>
                  <Button
                    as="a"
                    href={study.liveUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    variant="secondary"
                    size="sm"
                  >
                    Open live site
                  </Button>
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
                      referrerPolicy="no-referrer"
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
                      referrerPolicy="no-referrer"
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
                      referrerPolicy="no-referrer"
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

        {/* ── Gallery / visuals ─────────────────────── */}
        {study.gallery?.length ? (
          <section id="gallery" className={styles.section} data-header-theme="light" data-fade-up>
            <div className={styles.sectionIntro}>
              <h2 className={styles.sectionTitle}>Screenshots &amp; visuals</h2>
              <p className={styles.sectionSub}>
                Product surfaces from the live experience — layout, hierarchy, and brand presence across key breakpoints.
              </p>
            </div>
            <div className={styles.galleryGrid}>
              {study.gallery.map((item) => (
                <figure key={item.src} className={styles.galleryItem} data-fade-up>
                  <div className={styles.galleryFrame}>
                    <img
                      src={item.src}
                      alt={item.alt}
                      loading="lazy"
                      decoding="async"
                      width={960}
                      height={540}
                    />
                  </div>
                  {item.caption ? <figcaption>{item.caption}</figcaption> : null}
                </figure>
              ))}
            </div>
          </section>
        ) : null}

        {/* ── 7. Audit ─────────────────────────────── */}
        {study.audit && (
          <section id="audit" className={`${styles.sectionDark}`} data-header-theme="light" data-fade-up>
            <div className={styles.sectionInner}>
              <div className={styles.sectionIntro}>
                <h2 className={styles.sectionTitle}>Performance &amp; SEO audit</h2>
                <p className={styles.sectionSub}>Mobile, 4G throttled. Before and after optimisation.</p>
              </div>
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
          <section id="beforeafter" className={styles.section} data-header-theme="light" data-fade-up>
            <div className={styles.sectionIntro}>
              <h2 className={styles.sectionTitle}>Before and after</h2>
              <p className={styles.sectionSub}>The five decisions that carried the project.</p>
            </div>
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
          <section id="results" className={`${styles.sectionDark} ${styles.resultsSection}`} data-header-theme="light" data-fade-up>
            <div className={styles.sectionInner}>
              <div className={styles.sectionIntro}>
                <h2 className={styles.sectionTitle}>Results</h2>
                <p className={styles.sectionSub}>Outcomes attributed to the live site and public client statements.</p>
              </div>
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

        {/* ── Prev / Next ──────────────────────────── */}
        <div className={styles.prevNext}>
          {prev && (
            <Link to={`/case-studies/${prev.slug}`} className={styles.prevNextLink}>
              <span className={styles.prevNextHint}>← Previous</span>
              <span className={styles.prevNextTitle}>{prev.title}</span>
            </Link>
          )}
          <Button as={Link} to="/case-studies" variant="secondary" size="sm">
            All projects
          </Button>
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
