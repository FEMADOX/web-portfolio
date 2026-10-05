import type { ReactNode } from 'react'
import type { ProjectProps } from './types'

interface ProjectLinksFrameProps {
  links: ProjectProps['links']
  title: string
  hoverText: string
  githubIcon: ReactNode
  websiteIcon: ReactNode
}

export const ProjectLinksFrame = ({
  links: { github, website },
  title,
  hoverText,
  githubIcon,
  websiteIcon
}: ProjectLinksFrameProps) => (
  <div className="flex gap-2">
    {github && (
      <a
        href={github}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`GitHub: ${title}`}
        className={`text-muted-foreground ${hoverText} transition-colors`}
      >
        {githubIcon}
      </a>
    )}
    {website && (
      <a
        href={website}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${title}: ${website}`}
        className={`text-muted-foreground ${hoverText} transition-colors`}
      >
        {websiteIcon}
      </a>
    )}
  </div>
)
