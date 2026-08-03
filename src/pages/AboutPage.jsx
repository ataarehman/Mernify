import { PageCta } from '@/components/layout/PageCta'
import { MediaStrip } from '@/components/layout/MediaStrip'
import { TechBrandGrid } from '@/components/layout/TechBrandGrid'
import { PageMeta } from '@/components/seo/PageMeta'
import { aboutContent } from '@/content/pages'
import { AboutHero } from '@/sections/about/AboutHero'
import { AboutWho } from '@/sections/about/AboutWho'
import { AboutMission } from '@/sections/about/AboutMission'
import { AboutProcess } from '@/sections/about/AboutProcess'
import { AboutWhy } from '@/sections/about/AboutWhy'
import { AboutTeam } from '@/sections/about/AboutTeam'

export function AboutPage() {
  return (
    <>
      <PageMeta title="About" description={aboutContent.lead} canonicalPath="/about" />

      <AboutHero />
      <MediaStrip src="/assets/images/thumbs/thumbnail-bg.jpg" height="tall" />
      <AboutWho />
      <AboutMission />
      <AboutProcess />
      <AboutWhy />
      <AboutTeam />
      <MediaStrip src="/assets/images/thumbs/thumbnail-ab-bg.jpg" />
      <TechBrandGrid animated />
      <PageCta
        title={aboutContent.cta.title}
        support={aboutContent.cta.support}
        accentWords={aboutContent.cta.accentWords}
        cta={aboutContent.cta.cta}
        animated
      />
    </>
  )
}
