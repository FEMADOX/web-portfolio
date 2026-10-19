'use client'

import { createContext, use } from 'react'
import type { ChildrenProps } from '@/app/types'
import type { ProjectSlug } from '@/data/projects/types'
import { useProjectChapter } from '@/hooks/useProjectChapter'

type ProjectChaptersValue = ReturnType<typeof useProjectChapter>

interface ProviderProps extends ChildrenProps {
  slug: ProjectSlug
}

const ProjectChaptersContext = createContext<ProjectChaptersValue | null>(null)

export const ProjectChaptersProvider = ({ slug, children }: ProviderProps) => (
  <ProjectChaptersContext value={useProjectChapter(slug)}>
    {children}
  </ProjectChaptersContext>
)

export const useProjectChaptersContext = () => {
  const context = use(ProjectChaptersContext)

  if (context === null)
    throw new Error(
      'useProjectChapters must be used within a ProjectChaptersProvider'
    )

  return context
}
