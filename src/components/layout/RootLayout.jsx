import { Outlet, useLocation } from 'react-router-dom'
import { lazy, Suspense, useCallback, useLayoutEffect } from 'react'
import { SkipLink } from '@/components/ui'
import { SiteHeader } from '@/components/navigation/SiteHeader'
import { SiteFooter } from '@/components/navigation/SiteFooter'
import { CookieConsent } from '@/components/privacy/CookieConsent'
import { Analytics } from '@/components/privacy/Analytics'
import { PageEntranceCurtain } from '@/components/motion/PageEntranceCurtain'
import { SoftCursor } from '@/components/motion/SoftCursor'
import {
  beginPageEntrance,
  notifyPageEntranceComplete,
  shouldPlayPageEntrance,
} from '@/components/motion/pageEntrance'
import { useMotion } from '@/app/providers/useMotion'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  disableBrowserScrollRestoration,
  refreshScrollTriggers,
  scrollDocumentToTop,
} from '@/lib/scrollManager'
import { CHAT_ENABLED } from '@/lib/chat/featureFlag'

const MernifyChat = CHAT_ENABLED
  ? lazy(() => import('@/components/chat/MernifyChat').then((m) => ({ default: m.MernifyChat })))
  : null

function RouteFallback() {
  return <div className="mf-main" aria-hidden="true" />
}

export function RootLayout() {
  const location = useLocation()
  const { lenis } = useMotion()
  const isHome = location.pathname === '/'
  const playEntrance = shouldPlayPageEntrance(location.pathname)

  // Disable browser scroll restoration once for the SPA session.
  useLayoutEffect(() => {
    disableBrowserScrollRestoration()
  }, [])

  // Reset scroll BEFORE paint so new routes never flash mid-page / footer.
  useLayoutEffect(() => {
    scrollDocumentToTop(lenis)

    if (playEntrance) {
      beginPageEntrance()
      return undefined
    }

    notifyPageEntranceComplete()
    return refreshScrollTriggers(ScrollTrigger, { afterMs: 160 })
  }, [location.pathname, location.key, lenis, playEntrance])

  const handleEntranceComplete = useCallback(() => {
    scrollDocumentToTop(lenis)
    notifyPageEntranceComplete()
    refreshScrollTriggers(ScrollTrigger, { afterMs: 200 })
    window.setTimeout(() => {
      try {
        ScrollTrigger.refresh()
      } catch {
        // ignore
      }
    }, 600)
  }, [lenis])

  return (
    <>
      <SkipLink />
      {playEntrance ? (
        <PageEntranceCurtain
          key={location.key}
          onComplete={handleEntranceComplete}
        />
      ) : null}
      <SiteHeader />
      <main
        id="main-content"
        className={['mf-main', isHome ? 'mf-main-home' : 'mf-main-inner'].filter(Boolean).join(' ')}
      >
        {/* Suspense inside layout so header/footer/Lenis scroll state stay mounted */}
        <Suspense fallback={<RouteFallback />}>
          <Outlet />
        </Suspense>
      </main>
      <SiteFooter />
      <CookieConsent />
      <Analytics />
      <SoftCursor />
      {MernifyChat ? (
        <Suspense fallback={null}>
          <MernifyChat />
        </Suspense>
      ) : null}
    </>
  )
}
