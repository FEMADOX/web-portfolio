import type { Lang } from './types'

export const LANGUAGE_CHOICE_KEY = 'portfolio-language-choice'

const isLang = (value: string | null): value is Lang =>
  value === 'en' || value === 'es' || value === 'pt'

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
