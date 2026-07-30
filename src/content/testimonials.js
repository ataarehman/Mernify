/**
 * Client testimonials.
 * Keep `published: false` until the quote is client-approved in writing.
 * Never invent quotes or attribute unverified outcomes.
 */

export const testimonialsContent = {
  eyebrow: 'Client voices',
  title: 'What partners say',
  support: 'Published only with explicit client approval.',
  items: [
    {
      id: 'sample-slot-1',
      published: false,
      quote: '',
      name: '',
      role: '',
      company: '',
      avatar: '/assets/images/thumbs/testimonial-img1.png',
      caseStudySlug: '',
    },
    {
      id: 'sample-slot-2',
      published: false,
      quote: '',
      name: '',
      role: '',
      company: '',
      avatar: '/assets/images/thumbs/testimonial-img2.png',
      caseStudySlug: '',
    },
  ],
}

export function getPublishedTestimonials() {
  return testimonialsContent.items.filter(
    (item) => item.published && item.quote?.trim() && item.name?.trim(),
  )
}
