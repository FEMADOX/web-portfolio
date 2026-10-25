'use client'

import { useRef } from 'react'
import { useProjectChaptersContext } from '@/contexts/ProjectChaptersContext'
import useActiveNavScroll from '@/hooks/useActiveNavScroll'
import ProjectChaptersComponent from '../ChaptersComponent'
import type { ProjectLabels } from '../types'

type Props = {
  labels: ProjectLabels
}

export default function ProjectDesktopNavigation({ labels }: Props) {
  const navigationRef = useRef<HTMLDivElement | null>(null)
  const { active } = useProjectChaptersContext()
  useActiveNavScroll(navigationRef, active)

  return (
    <ProjectChaptersComponent
      labels={labels}
      navigationRef={navigationRef}
      className="flex h-11 min-w-0 flex-1 items-stretch gap-1 overflow-x-auto overscroll-x-contain scrollbar-none"
      dataProjectNavigation="dock"
      chapterLinkVariant="dock"
    />
  )
}
