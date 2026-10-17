import { LANGUAGE_CONFIG, SUPPORTED_LANGUAGES } from '@/app/constants'
import type { Lang } from '@/app/types'
import type { ProjectSlug } from '@/data/projects'
import { getLanguagePath, isLang } from './language'

export const getProjectPath = (lang: Lang, slug: ProjectSlug) =>
  `${getLanguagePath(lang)}/projects/${slug}`

export const getProjectLanguageAlternates = (
  slug: ProjectSlug,
  baseUrl = ''
): Record<string, string> => {
  const normalizedBaseUrl = baseUrl.replace(/\/$/, '')

  return {
    ...Object.fromEntries(
      SUPPORTED_LANGUAGES.map(lang => [
        LANGUAGE_CONFIG[lang].hreflang,
        `${normalizedBaseUrl}${getProjectPath(lang, slug)}`
      ])
    ),
    'x-default': `${normalizedBaseUrl}${getProjectPath('en', slug)}`
  }
}

export const getLocalizedPathname = (pathname: string, lang: Lang) => {
  const segments = pathname.split('/')
  const currentLang = segments[1]
  const suffix = isLang(currentLang)
    ? segments.slice(2).join('/')
    : segments.slice(1).join('/')

  return `${getLanguagePath(lang)}${suffix ? `/${suffix}` : ''}`
}
