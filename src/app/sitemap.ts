import type { MetadataRoute } from 'next'
import { SITE_URL } from './metadata'

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = {
    en: `${SITE_URL}/en`,
    es: `${SITE_URL}/es`,
    'pt-BR': `${SITE_URL}/pt`
  }

  return (['en', 'es', 'pt'] as const).map((lang) => ({
    url: `${SITE_URL}/${lang}`,
    alternates: { languages }
  }))
}
