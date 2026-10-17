import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SUPPORTED_LANGUAGES } from '@/app/constants'
import { ProjectDetailPage } from '@/components/projects/ProjectDetailPage'
import CurrentYearServerProvider from '@/contexts/CurrentYearServerContext'
import LanguageServerProvider from '@/contexts/LanguageServerContext'
import {
  getProjectDetail,
  getProjectDetails,
  PROJECT_SLUGS
} from '@/data/projects'
import getProjectMetadata from '@/lib/getProjectMetadata'
import { isLang } from '@/lib/language'

type Props = { params: Promise<{ lang: string; slug: string }> }

export const generateStaticParams = () =>
  SUPPORTED_LANGUAGES.flatMap(lang =>
    PROJECT_SLUGS.map(slug => ({ lang, slug }))
  )

const getLanguageSlugProject = async ({ params }: Props) => {
  const { lang, slug } = await params
  if (!isLang(lang)) notFound()

  const project = getProjectDetail(lang, slug)
  if (!project) notFound()

  return { lang, slug, project }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, project } = await getLanguageSlugProject({ params })
  return getProjectMetadata(lang, project)
}

export default async function LocalizedProjectPage({ params }: Props) {
  const { lang, project } = await getLanguageSlugProject({ params })

  const projects = getProjectDetails(lang)
  const index = projects.findIndex(item => item.slug === project.slug)
  const nextProject = projects[(index + 1) % projects.length]

  return (
    <LanguageServerProvider lang={lang}>
      <CurrentYearServerProvider>
        <ProjectDetailPage
          lang={lang}
          project={project}
          nextProject={nextProject}
          index={index}
        />
      </CurrentYearServerProvider>
    </LanguageServerProvider>
  )
}
