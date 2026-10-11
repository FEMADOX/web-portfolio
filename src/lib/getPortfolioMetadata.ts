import type { Lang } from '@/app/types'
import { getLanguageAlternates, getLanguagePath } from './language'
import type { Metadata } from 'next'
import { LANGUAGE_CONFIG } from '@/app/constants'

const seo = {
  en: {
    title: 'Giancarlos Gonzalez | Web Developer',
    description:
      'Full-Stack Developer focused on Python backend (Django/FastAPI) and modern frontend with TypeScript, React, and Next.js.',
    imageAlt: 'Giancarlos Gonzalez portfolio'
  },
  es: {
    title: 'Giancarlos Gonzalez | Desarrollador Web',
    description:
      'Desarrollador Full Stack enfocado en backend con Python (Django/FastAPI) y frontend moderno con TypeScript, React y Next.js.',
    imageAlt: 'Portafolio de Giancarlos Gonzalez'
  },
  pt: {
    title: 'Giancarlos Gonzalez | Desenvolvedor Web',
    description:
      'Desenvolvedor Full Stack com foco em backend Python (Django/FastAPI) e frontend moderno com TypeScript, React e Next.js.',
    imageAlt: 'Portfólio de Giancarlos Gonzalez'
  }
} satisfies Record<
  Lang,
  { title: string; description: string; imageAlt: string }
>

const getPortfolioMetadata = (lang: Lang): Metadata => {
  const { title, description, imageAlt } = seo[lang]
  const image = {
    url: '/thumbnail.jpg',
    width: 1200,
    height: 630,
    alt: imageAlt
  }
  return {
    title,
    description,
    manifest: `/api/manifest/${lang}`,
    alternates: {
      canonical: getLanguagePath(lang),
      languages: { ...getLanguageAlternates(), 'x-default': '/' }
    },
    openGraph: {
      title,
      description,
      url: getLanguagePath(lang),
      siteName: 'Giancarlos Gonzalez',
      images: [image],
      locale: LANGUAGE_CONFIG[lang].openGraphLocale,
      alternateLocale: Object.values(LANGUAGE_CONFIG)
        .map(entry => entry.openGraphLocale)
        .filter(value => value !== LANGUAGE_CONFIG[lang].openGraphLocale),
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image]
    }
  }
}

export default getPortfolioMetadata
