import { PageMeta } from '@/components/seo/PageMeta'
import { HomeHero } from '@/sections/home/HomeHero'
import { HomeTrust } from '@/sections/home/HomeTrust'
import { HomeProductStory } from '@/sections/home/HomeProductStory'
import { HomeServices } from '@/sections/home/HomeServices'
import { HomeWork } from '@/sections/home/HomeWork'
import { HomeIndustries } from '@/sections/home/HomeIndustries'
import { HomeAi } from '@/sections/home/HomeAi'
import { HomeTechnology } from '@/sections/home/HomeTechnology'
import { HomeProcess } from '@/sections/home/HomeProcess'
import { HomeHuman } from '@/sections/home/HomeHuman'
import { HomeFaq } from '@/sections/home/HomeFaq'
import { HomeFinalCta } from '@/sections/home/HomeFinalCta'
import { SITE } from '@/constants/site'

export function HomePage() {
  return (
    <>
      <PageMeta title={SITE.defaultTitle} description={SITE.defaultDescription} canonicalPath="/" />
      <HomeHero />
      <HomeTrust />
      <HomeProductStory />
      <HomeServices />
      <HomeWork />
      <HomeIndustries />
      <HomeAi />
      <HomeTechnology />
      <HomeProcess />
      <HomeHuman />
      <HomeFaq />
      <HomeFinalCta />
    </>
  )
}
