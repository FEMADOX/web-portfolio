import { Project } from './Project'
import { projectAccents, projects } from './utils'

export const Projects = () => (
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
