import type { Lang } from './types'

export const SITE_URL = 'https://giancarlos-portfolio.vercel.app'

export const LANGUAGE_CHOICE_KEY = 'portfolio-language-choice'

export const LANGUAGE_CONFIG = {
  en: {
    documentLang: 'en-US',
    hreflang: 'en',
    openGraphLocale: 'en_US',
    selectLabel: 'Portfolio language',
    shortLabel: 'EN',
    cvFile: '/cv/giancarlos-gonzalez-cv-en.pdf'
  },
  es: {
    documentLang: 'es-ES',
    hreflang: 'es',
    openGraphLocale: 'es_ES',
    selectLabel: 'Idioma del portafolio',
    shortLabel: 'ES',
    cvFile: '/cv/giancarlos-gonzalez-cv-es.pdf'
  },
  pt: {
    documentLang: 'pt-BR',
    hreflang: 'pt-BR',
    openGraphLocale: 'pt_BR',
    selectLabel: 'Idioma do portfolio',
    shortLabel: 'PT',
    cvFile: '/cv/giancarlos-gonzalez-cv-pt.pdf'
  }
} as const

export const SUPPORTED_LANGUAGES = Object.keys(LANGUAGE_CONFIG) as Lang[]
