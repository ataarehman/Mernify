import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { SkipLink } from '@/components/ui'
import { SiteHeader } from '@/components/navigation/SiteHeader'
import { SiteFooter } from '@/components/navigation/SiteFooter'
import { useMotion } from '@/app/providers/useMotion'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function RootLayout() {
  const location = useLocation()
  const { lenis } = useMotion()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const instance = lenis?.current
    if (instance) {
      instance.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo(0, 0)
    }
    ScrollTrigger.refresh()
  }, [location.pathname, lenis])

  return (
    <>
      <SkipLink />
      <SiteHeader />
      <main
        id="main-content"
        className={['mf-main', isHome ? 'mf-main-home' : 'mf-main-inner'].filter(Boolean).join(' ')}
      >
        <Outlet />
      </main>
      <SiteFooter />
    </>
  )
}
