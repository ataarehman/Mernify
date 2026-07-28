import { PageMeta } from '@/components/seo/PageMeta'
import { HomeHero } from '@/sections/home/HomeHero'
import { HomeAbout } from '@/sections/home/HomeAbout'
import { HomeTrust } from '@/sections/home/HomeTrust'
import { HomeWork } from '@/sections/home/HomeWork'
import { HomeServices } from '@/sections/home/HomeServices'
import { HomeMediaStrip } from '@/sections/home/HomeMediaStrip'
import { HomeHuman } from '@/sections/home/HomeHuman'
import { SITE } from '@/constants/site'

export function HomePage() {
  return (
    <>
      <PageMeta title={SITE.defaultTitle} description={SITE.defaultDescription} canonicalPath="/" />
      <HomeHero />
      <HomeAbout />
      <HomeTrust />
      <HomeWork />
      <HomeServices />
      <HomeMediaStrip />
      <HomeHuman />
    </>
  )
}
