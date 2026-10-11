import type { MetadataRoute } from 'next'
import { getLanguageAlternates, getLanguagePath } from '../lib/language'
import { SITE_URL, SUPPORTED_LANGUAGES } from './constants'

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = getLanguageAlternates(SITE_URL)

  return SUPPORTED_LANGUAGES.map(lang => ({
    url: `${SITE_URL}${getLanguagePath(lang)}`,
    alternates: { languages }
  }))
}
