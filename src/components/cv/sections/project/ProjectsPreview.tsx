import { ProjectFrame } from './ProjectFrame'
import { ProjectLinksFrame } from './ProjectLinksFrame'
import type { ProjectsProps } from './Projects'
import { projectAccents } from './utils'

export const ProjectsPreview = ({ projects }: ProjectsProps) => (
  <div className="space-y-5">
    {projects.map((project, index) => {
      const accent = projectAccents[index % projectAccents.length]

      return (
        <ProjectFrame
          key={project.title}
          project={project}
          accent={accent}
          isLeftLine={index % 2 === 0}
          links={
            <ProjectLinksFrame
              links={project.links}
              title={project.title}
              hoverText={accent.hoverText}
              githubIcon={
                <span
                  aria-hidden="true"
                  className="flex size-5 items-center justify-center text-[10px] font-bold"
                >
                  GH
                </span>
              }
              websiteIcon={
                <span
                  aria-hidden="true"
                  className="flex size-5 items-center justify-center text-lg leading-none"
                >
                  ↗
                </span>
              }
            />
          }
        />
      )
    })}
  </div>
)
