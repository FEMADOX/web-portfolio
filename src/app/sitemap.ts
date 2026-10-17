import type { MetadataRoute } from 'next'
import { PROJECT_SLUGS } from '@/data/projects'
import {
  getProjectLanguageAlternates,
  getProjectPath
} from '@/lib/projectPaths'
import { getLanguageAlternates, getLanguagePath } from '../lib/language'
import { SITE_URL, SUPPORTED_LANGUAGES } from './constants'

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = getLanguageAlternates(SITE_URL)

  const homePages = SUPPORTED_LANGUAGES.map(lang => ({
    url: `${SITE_URL}${getLanguagePath(lang)}`,
    alternates: { languages }
  }))

  const projectPages = PROJECT_SLUGS.flatMap(slug =>
    SUPPORTED_LANGUAGES.map(lang => ({
      url: `${SITE_URL}${getProjectPath(lang, slug)}`,
      alternates: {
        languages: getProjectLanguageAlternates(slug, SITE_URL)
      }
    }))
  )

  return [...homePages, ...projectPages]
}
