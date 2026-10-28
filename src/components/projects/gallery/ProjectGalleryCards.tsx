import type { ReactNode } from 'react'
import { projectAccents } from '@/components/cv/sections/project/accents'
import { Project } from '@/components/cv/sections/project/Project'
import type { ProjectProps } from '@/components/cv/sections/project/types'

export const getProjectGalleryCards = (
  projects: readonly ProjectProps[]
): ReactNode[] =>
  projects.map((project, index) => (
    <Project
      key={project.slug}
      project={project}
      accent={projectAccents[index % projectAccents.length]}
      isLeftLine={index % 2 === 0}
    />
  ))
