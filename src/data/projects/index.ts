import type { Lang } from '@/app/types'
import { projectsEn } from './en'
import { projectsEs } from './es'
import { projectsPt } from './pt'
import { PROJECT_SLUGS, type ProjectDetail, type ProjectSlug } from './types'

export type { ProjectDetail, ProjectSlug } from './types'
export { PROJECT_SLUGS }

const projectsByLang: Record<Lang, readonly ProjectDetail[]> = {
  en: projectsEn,
  es: projectsEs,
  pt: projectsPt
}

export const getProjectDetails = (lang: Lang): readonly ProjectDetail[] =>
  projectsByLang[lang]

export const getProjectDetail = (
  lang: Lang,
  slug: string
): ProjectDetail | undefined =>
  getProjectDetails(lang).find(project => project.slug === slug)

export const isProjectSlug = (value: string): value is ProjectSlug =>
  PROJECT_SLUGS.some(slug => slug === value)
