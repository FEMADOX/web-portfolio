'use client'

import { lazy, type ReactNode, Suspense } from 'react'
import { LazyOnVisible } from '@/components/cv/LazyOnVisible'
import { useGalleryLocation } from '@/hooks/useGalleryLocation'
import type { ProjectsProps } from './Projects'

type LazyProjectsProps = ProjectsProps & { fallback: ReactNode }

const Projects = lazy(() =>
  import('./Projects').then(({ Projects }) => ({ default: Projects }))
)

const ProjectsLoader = ({ fallback, ...props }: LazyProjectsProps) => {
  const requestedSlug = useGalleryLocation()
  const restoreGallery = props.projects.some(
    project => project.slug === requestedSlug
  )

  return (
    <LazyOnVisible fallback={fallback} forceLoad={restoreGallery}>
      <Projects {...props} />
    </LazyOnVisible>
  )
}

export const LazyProjects = (props: LazyProjectsProps) => (
  <Suspense fallback={<div>{props.fallback}</div>}>
    <ProjectsLoader {...props} />
  </Suspense>
)
