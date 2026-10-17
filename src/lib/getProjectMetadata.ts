import type { Metadata } from 'next'
import { LANGUAGE_CONFIG } from '@/app/constants'
import type { Lang } from '@/app/types'
import type { ProjectDetail } from '@/data/projects'
import { getProjectLanguageAlternates, getProjectPath } from './projectPaths'

const getProjectMetadata = (lang: Lang, project: ProjectDetail): Metadata => {
  const title = `${project.title} | Giancarlos Gonzalez`
  const description = project.summary
  const path = getProjectPath(lang, project.slug)
  const image = {
    url: '/thumbnail.jpg',
    width: 1200,
    height: 630,
    alt: `${project.title} | Giancarlos Gonzalez`
  }

  return {
    title,
    description,
    manifest: `/api/manifest/${lang}`,
    alternates: {
      canonical: path,
      languages: getProjectLanguageAlternates(project.slug)
    },
    openGraph: {
      title,
      description,
      url: path,
      siteName: 'Giancarlos Gonzalez',
      locale: LANGUAGE_CONFIG[lang].openGraphLocale,
      alternateLocale: SUPPORTED_OPEN_GRAPH_LOCALES.filter(
        locale => locale !== LANGUAGE_CONFIG[lang].openGraphLocale
      ),
      images: [image],
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

const SUPPORTED_OPEN_GRAPH_LOCALES = Object.values(LANGUAGE_CONFIG).map(
  entry => entry.openGraphLocale
)

export default getProjectMetadata
