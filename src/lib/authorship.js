import { SITE } from '@/constants/site'

/**
 * Authorship / attribution for case studies.
 * - delivered: Mernify built the product (client-confirmed)
 * - observed: Public-site research only — do not imply delivery without confirmation
 * - pending: Awaiting client approval to publish delivery claim
 */
export function getAuthorship(study) {
  if (study?.authorship) return study.authorship
  return {
    mode: 'observed',
    clientApproved: false,
    note: 'This case study describes publicly observable product capabilities. Delivery authorship should be confirmed before claiming Mernify built the product.',
  }
}

export function authorshipLabel(mode) {
  if (mode === 'delivered') return 'Delivered by Mernify'
  if (mode === 'pending') return 'Authorship pending confirmation'
  return 'Public product observation'
}

export function organizationWithSameAs() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.name,
    url: SITE.url,
    email: SITE.email,
    logo: `${SITE.url}/favicon.svg`,
    sameAs: Object.values(SITE.social || {}),
  }
}
