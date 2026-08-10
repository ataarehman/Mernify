import { SITE } from '@/constants/site'

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.name,
    url: SITE.url,
    email: SITE.email,
    description: SITE.defaultDescription,
    logo: `${SITE.url}/favicon.svg`,
    sameAs: Object.values(SITE.social).filter(Boolean),
  }
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: SITE.url,
    description: SITE.defaultDescription,
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      url: SITE.url,
    },
  }
}

export function serviceSchema({ title, description, slug }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: title,
    description,
    url: `${SITE.url}/services/${slug}`,
    provider: {
      '@type': 'Organization',
      name: SITE.name,
      url: SITE.url,
    },
  }
}

export function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.path.startsWith('http') ? item.path : `${SITE.url}${item.path}`,
    })),
  }
}

export function blogPostingSchema(post) {
  const url = `${SITE.url}/blog/${post.slug}`
  const image = post.image?.startsWith('http')
    ? post.image
    : `${SITE.url}${post.image?.startsWith('/') ? post.image : `/${post.image || SITE.ogImage}`}`

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: [image],
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author?.name,
      jobTitle: post.author?.role,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      url: SITE.url,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE.url}/favicon.svg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    url,
    keywords: post.tags?.join(', '),
    articleSection: post.category,
    wordCount: post.wordCount || undefined,
    timeRequired: post.readingMinutes ? `PT${post.readingMinutes}M` : undefined,
  }
}

export function faqPageSchema(faqs, pageUrl) {
  if (!faqs?.length) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
    ...(pageUrl
      ? {
          url: pageUrl.startsWith('http') ? pageUrl : `${SITE.url}${pageUrl}`,
        }
      : {}),
  }
}
