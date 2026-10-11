import { LANGUAGE_CONFIG, SUPPORTED_LANGUAGES } from '@/app/constants'
import type { Lang } from '@/app/types'

export const isLang = (value: unknown): value is Lang =>
  typeof value === 'string' && Object.hasOwn(LANGUAGE_CONFIG, value)

export const getLanguagePath = (lang: Lang) => `/${lang}`

export const getLanguageAlternates = (baseUrl = ''): Record<string, string> => {
  const normalizedBaseUrl = baseUrl.replace(/\/$/, '')

  return Object.fromEntries(
    SUPPORTED_LANGUAGES.map((lang) => [
      LANGUAGE_CONFIG[lang].hreflang,
      `${normalizedBaseUrl}${getLanguagePath(lang)}`
    ])
  )
}

export const getPreferredLang = (
  savedChoice: string | null,
  browserLanguages: readonly string[],
  legacyLang: string | null = null
): Lang => {
  if (isLang(savedChoice)) return savedChoice

  // Earlier versions saved English automatically, so only legacy ES/PT
  // indicate an explicit selection with reasonable confidence.
  if (legacyLang === 'es' || legacyLang === 'pt') return legacyLang

  for (const language of browserLanguages) {
    const baseLanguage = language.split('-')[0]?.toLowerCase() ?? null
    if (isLang(baseLanguage)) return baseLanguage
  }

  return 'en'
}

export const getDocumentLang = (lang: Lang) =>
  LANGUAGE_CONFIG[lang].documentLang

export const CV_FILES = Object.fromEntries(
  SUPPORTED_LANGUAGES.map((lang) => [lang, LANGUAGE_CONFIG[lang].cvFile])
) as Record<Lang, string>
