import { projectAccents } from './accents'
import { Project } from './Project'
import type { ProjectProps } from './types'

export interface ProjectsProps {
  projects: readonly ProjectProps[]
}

export const Projects = ({ projects }: ProjectsProps) => (
  <div className="space-y-5">
    {projects.map((project, index) => {
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
