import { PageMeta } from '@/components/seo/PageMeta'
import { HomeHero } from '@/sections/home/HomeHero'
import { HomeAbout } from '@/sections/home/HomeAbout'
import { HomeServicesOverview } from '@/sections/home/HomeServicesOverview'
import { HomeTrust } from '@/sections/home/HomeTrust'
import { HomeWork } from '@/sections/home/HomeWork'
import { HomeJourney } from '@/sections/home/HomeJourney'
import { HomeHuman } from '@/sections/home/HomeHuman'
import { HomeInquiry } from '@/sections/home/HomeInquiry'
import { SITE } from '@/constants/site'

export function HomePage() {
  return (
    <>
      <PageMeta title={SITE.defaultTitle} description={SITE.defaultDescription} canonicalPath="/" />
      <HomeHero />
      <HomeAbout />
      <HomeServicesOverview />
      <HomeTrust />
      <HomeWork />
      <HomeJourney />
      <HomeHuman />
      <HomeInquiry />
    </>
  )
}
