import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { SkipLink } from '@/components/ui'
import { SiteHeader } from '@/components/navigation/SiteHeader'
import { SiteFooter } from '@/components/navigation/SiteFooter'
import { CookieConsent } from '@/components/privacy/CookieConsent'
import { Analytics } from '@/components/privacy/Analytics'
import {
  PageEntranceCurtain,
  shouldPlayPageEntrance,
} from '@/components/motion/PageEntranceCurtain'
import { useMotion } from '@/app/providers/useMotion'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function RootLayout() {
  const location = useLocation()
  const { lenis } = useMotion()
  const isHome = location.pathname === '/'
  const playEntrance = shouldPlayPageEntrance(location.pathname)

  useEffect(() => {
    const instance = lenis?.current
    if (instance) {
      instance.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo(0, 0)
    }
    // Curtain refreshes ScrollTrigger on complete; skip eager refresh when playing.
    if (!playEntrance) {
      ScrollTrigger.refresh()
    }
  }, [location.pathname, lenis, playEntrance])

  return (
    <>
      <SkipLink />
      {playEntrance ? (
        <PageEntranceCurtain key={location.pathname} label="Mernify" />
      ) : null}
      <SiteHeader />
      <main
        id="main-content"
        className={['mf-main', isHome ? 'mf-main-home' : 'mf-main-inner'].filter(Boolean).join(' ')}
      >
        <Outlet />
      </main>
      <SiteFooter />
      <CookieConsent />
      <Analytics />
    </>
  )
}
