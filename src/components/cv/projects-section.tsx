'use client'

import { ProjectsList } from './ProjectsList'

export const ProjectsSection = () => (
  <section id="projects" className="py-10 group">
    {/* Section Header */}
    <div className="flex items-center justify-between mb-5">
      <h2
        className={`
          inline-block border-2 border-border bg-blue-700 px-4 py-1 text-lg font-black uppercase tracking-wider text-white shadow-sm
          group-hover:bg-accent group-hover:text-accent-foreground transition-colors
        `}
      >
        Projects
      </h2>
      <span className="text-xs text-accent font-mono hidden sm:block">
        DEPLOYMENTS.02
      </span>
    </div>

    <ProjectsList />
  </section>
)
