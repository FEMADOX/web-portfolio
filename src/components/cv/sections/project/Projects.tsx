'use client'

import { useMemo } from 'react'
import { getProjectGalleryCopy } from '@/components/projects/gallery/copy'
import { getProjectGalleryCards } from '@/components/projects/gallery/ProjectGalleryCards'
import ProjectGalleryCollection from '@/components/projects/gallery/ProjectGalleryCollection'
import { useLanguageContext } from '@/contexts/LanguageContext'
import type { ProjectProps } from './types'

export type ProjectsProps = {
  projects: readonly ProjectProps[]
}

export const Projects = ({ projects }: ProjectsProps) => {
  const lang = useLanguageContext()
  const gallery = useMemo(
    () => ({
      cards: getProjectGalleryCards(projects),
      titles: projects.map(project => project.title),
      slugs: projects.map(project => project.slug)
    }),
    [projects]
  )

  return (
    <ProjectGalleryCollection {...gallery} copy={getProjectGalleryCopy(lang)} />
  )
}
