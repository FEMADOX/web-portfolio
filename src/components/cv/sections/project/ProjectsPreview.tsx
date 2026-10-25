import { projectAccents } from './accents'
import { ProjectCardFrame } from './ProjectCardFrame'
import { ProjectLinksFrame } from './ProjectLinksFrame'
import type { ProjectsProps } from './Projects'

export const ProjectsPreview = ({
  projects,
  lang
}: ProjectsProps & { lang: Lang }) => (
  <div className="space-y-5">
    {projects.map((project, index) => {
      const accent = projectAccents[index % projectAccents.length]

      return (
        <ProjectCardFrame
          key={project.title}
          lang={lang}
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

import type { Lang } from '@/app/types'
