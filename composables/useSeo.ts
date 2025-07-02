import { useHead, useRequestURL, useRuntimeConfig } from 'nuxt/app'

interface SeoOptions {
  title: string
  description: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  ogType?: string
  twitterTitle?: string
  twitterDescription?: string
  twitterImage?: string
  other?: Array<Record<string, string>>
  twitterCard?: string
}

export function useSeo(options: SeoOptions) {
  const url = useRequestURL()
  const config = useRuntimeConfig()
  const baseUrl = config.public.baseUrl || url.origin
  const fullUrl = `${baseUrl}${url.pathname}`
  // 去除最后面的斜杠
  const fullUrlWithoutSlash = fullUrl.replace(/\/$/, '')
  
  // 确保标题不超过60个字符
  const title = options.title.length > 60 ? options.title.substring(0, 57) + '...' : options.title
  
  // 确保描述在140-160个字符之间
  let description = options.description
  if (description.length > 160) {
    description = description.substring(0, 157) + '...'
  }

  useHead({
    title: title,
    meta: [
      {
        name: 'description',
        content: description,
      },
      // Open Graph
      {
        property: 'og:title',
        content: options.ogTitle || title,
      },
      {
        property: 'og:description',
        content: options.ogDescription || description,
      },
      { property: 'og:type', content: options.ogType || 'website' },
      { property: 'og:url', content: fullUrlWithoutSlash },
      { property: 'og:image', content: options.ogImage || `${baseUrl}/logo.png` },
      { property: 'og:site_name', content: 'hailuo2' },
      ...(options.other || []),

      // Twitter Card
      { name: 'twitter:card', content:  options.twitterCard || 'summary_large_image' },
      {
        name: 'twitter:title',
        content: options.twitterTitle || title,
      },
      {
        name: 'twitter:description',
        content: options.twitterDescription || description,
      },
      { name: 'twitter:image', content: options.twitterImage || `${baseUrl}/logo.png` },
    ],
    link: [{ rel: 'canonical', href: fullUrlWithoutSlash }],
  })
} 