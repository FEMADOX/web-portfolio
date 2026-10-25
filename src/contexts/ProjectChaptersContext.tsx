'use client'

import { createContext, type RefObject, use } from 'react'
import type { ChildrenProps } from '@/app/types'
import { useProjectChapter } from '@/hooks/useProjectChapter'

type ProjectChaptersValue = ReturnType<typeof useProjectChapter>

interface ProviderProps extends ChildrenProps {
  contentRef: RefObject<HTMLElement | null>
}

const ProjectChaptersContext = createContext<ProjectChaptersValue | null>(null)

export const ProjectChaptersProvider = ({
  contentRef,
  children
}: ProviderProps) => (
  <ProjectChaptersContext value={useProjectChapter(contentRef)}>
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
