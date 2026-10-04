import type { Metadata } from 'next'
import type { Lang } from './types'

export const SITE_URL = 'https://giancarlos-portfolio.vercel.app'

const seo = {
  en: {
    title: 'Giancarlos Gonzalez | Web Developer',
    description:
      'Full-Stack Developer focused on Python backend (Django/FastAPI) and modern frontend with TypeScript, React, and Next.js.',
    locale: 'en_US',
    imageAlt: 'Giancarlos Gonzalez portfolio'
  },
  es: {
    title: 'Giancarlos Gonzalez | Desarrollador Web',
    description:
      'Desarrollador Full Stack enfocado en backend con Python (Django/FastAPI) y frontend moderno con TypeScript, React y Next.js.',
    locale: 'es_ES',
    imageAlt: 'Portafolio de Giancarlos Gonzalez'
  },
  pt: {
    title: 'Giancarlos Gonzalez | Desenvolvedor Web',
    description:
      'Desenvolvedor Full Stack com foco em backend Python (Django/FastAPI) e frontend moderno com TypeScript, React e Next.js.',
    locale: 'pt_BR',
    imageAlt: 'Portfólio de Giancarlos Gonzalez'
  }
} satisfies Record<
  Lang,
  { title: string; description: string; locale: string; imageAlt: string }
>

export const getPortfolioMetadata = (lang: Lang): Metadata => {
  const { title, description, locale, imageAlt } = seo[lang]
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
      canonical: `/${lang}`,
      languages: { en: '/en', es: '/es', 'pt-BR': '/pt', 'x-default': '/' }
    },
    openGraph: {
      title,
      description,
      url: `/${lang}`,
      siteName: 'Giancarlos Gonzalez',
      images: [image],
      locale,
      alternateLocale: Object.values(seo)
        .map(entry => entry.locale)
        .filter(value => value !== locale),
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
