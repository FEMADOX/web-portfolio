import type { Lang } from '@/app/types'
import type { EducationProps, LanguageProps } from './types'

const educationsByLang: Record<Lang, readonly EducationProps[]> = {
  en: [
    {
      degree: 'IPU Eduardo Garcia Delgado',
      period: 'Jan 2018 - Jun 2021',
      description:
        'Academic foundation in programming, mathematics, and technical problem solving.'
    }
  ],
  es: [
    {
      degree: 'IPU Eduardo Garcia Delgado',
      period: 'Ene 2018 - Jun 2021',
      description:
        'Formacion academica en programacion, matematicas y resolucion de problemas tecnicos.'
    }
  ]
}

const languagesByLang: Record<Lang, readonly LanguageProps[]> = {
  en: [
    { name: 'Spanish', level: 'Native' },
    { name: 'English', level: 'B2 (Upper-Intermediate)' }
  ],
  es: [
    { name: 'Espanol', level: 'Nativo' },
    { name: 'Ingles', level: 'B2 (Intermedio-Alto)' }
  ]
}

export const getEducations = (lang: Lang) => educationsByLang[lang]
export const getLanguages = (lang: Lang) => languagesByLang[lang]
