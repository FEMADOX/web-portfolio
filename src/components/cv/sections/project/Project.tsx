import { ProjectFrame } from './ProjectFrame'
import { ProjectLinks } from './ProjectLinks'
import type { ProjectsComponentProps } from './types'

export const Project = (props: ProjectsComponentProps) => (
  <ProjectFrame
    {...props}
    links={
      <ProjectLinks
        links={props.project.links}
        title={props.project.title}
        accent={{ hoverText: props.accent.hoverText }}
      />
    }
  />
)
