import { MetadataRoute } from 'next'
import { LOCALES } from '@/lib/dictionaries'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://spacesorganizers.com'
  const pages = ['', '/about', '/services', '/spaces', '/portfolio', '/testimonials', '/blog', '/faq', '/contact']
  
  const sitemapEntries: MetadataRoute.Sitemap = []

  // Create entries for each language and each page
  for (const lang of LOCALES) {
    for (const page of pages) {
      sitemapEntries.push({
        url: `${baseUrl}/${lang}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '/blog' ? 'weekly' : 'monthly',
        priority: page === '' ? 1.0 : 0.8,
      })
    }
  }

  // Add the root redirect as well
  sitemapEntries.push({
    url: `${baseUrl}/`,
    lastModified: new Date(),
    priority: 0.5,
  })

  return sitemapEntries
}
