import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://luistriana.dev',
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://luistriana.dev/tutoriales',
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ]
}
