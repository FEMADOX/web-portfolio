import { projectAccents, projects } from '@/components/cv/utils/projects'
import type { ProjectProps } from '@/types/root'
import { Project } from './Project'

export const Projects = () => (
  <div className="space-y-5">
    {projects.map((project: ProjectProps, index) => {
      const accent = projectAccents[index % projectAccents.length]
      const isLeftLine = index % 2 === 0

      return (
        <Project
          key={project.title}
          project={project}
          accent={accent}
          isLeftLine={isLeftLine}
        />
      )
    })}
  </div>
)
