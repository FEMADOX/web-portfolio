'use client'

import type { CvLocale } from '@/app/types'
import { createLazyOnVisible } from '@/components/cv/LazyOnVisible'
import type { ProjectsProps } from './Projects'
import { ProjectsPreview } from './ProjectsPreview'
import type { ProjectProps } from './types'

const LazyProjects = createLazyOnVisible<ProjectsProps>(
  () => import('./Projects').then(({ Projects }) => ({ default: Projects })),
  props => <ProjectsPreview {...props} />
)

interface ProjectsSectionProps {
  sectionTitle: CvLocale['sections']['projects']
  projects: readonly ProjectProps[]
  sectionCode: string
}

export const ProjectsSection = ({
  sectionTitle,
  projects,
  sectionCode
}: ProjectsSectionProps) => (
  <section id="projects" className="my-20 group">
    {/* Section Header */}
    <div className="flex items-center justify-between mb-5">
      <h2
        className={`
          inline-block border-2 border-border bg-blue-700 px-4 py-1 text-lg font-black uppercase tracking-wider text-white shadow-sm
          group-hover:bg-accent group-hover:text-accent-foreground transition-colors
        `}
      >
        {sectionTitle}
      </h2>
      <span className="text-xs text-accent font-mono hidden sm:block">
        {sectionCode}
      </span>
    </div>

    <LazyProjects projects={projects} />
  </section>
)
