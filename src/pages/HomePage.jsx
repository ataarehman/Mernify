import { useMemo } from 'react'
import { PageMeta } from '@/components/seo/PageMeta'
import { JsonLd } from '@/components/seo/JsonLd'
import { Container } from '@/components/ui'
import { HomeHero } from '@/sections/home/HomeHero'
import { HomeAbout } from '@/sections/home/HomeAbout'
import { HomeServicesOverview } from '@/sections/home/HomeServicesOverview'
import { HomeTrust } from '@/sections/home/HomeTrust'
import { HomeWork } from '@/sections/home/HomeWork'
import { HomeJourney } from '@/sections/home/HomeJourney'
import { HomeHuman } from '@/sections/home/HomeHuman'
import { HomeInquiry } from '@/sections/home/HomeInquiry'
import { Testimonials } from '@/components/trust/Testimonials'
import { SITE } from '@/constants/site'
import { organizationSchema, websiteSchema } from '@/lib/schema'
import { getPublishedTestimonials } from '@/content/testimonials'

export function HomePage() {
  const schema = useMemo(() => [organizationSchema(), websiteSchema()], [])
  const hasTestimonials = getPublishedTestimonials().length > 0

  return (
    <>
      <PageMeta title={SITE.defaultTitle} description={SITE.defaultDescription} canonicalPath="/" />
      <JsonLd id="mf-home-schema" data={schema} />
      <HomeHero />
      <HomeAbout />
      <HomeServicesOverview />
      <HomeTrust />
      <HomeWork />
      <HomeJourney />
      <HomeHuman />
      {hasTestimonials ? (
        <Container width="wide">
          <Testimonials />
        </Container>
      ) : null}
      <HomeInquiry />
    </>
  )
}
