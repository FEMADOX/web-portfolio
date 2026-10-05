import { ExternalLink } from 'lucide-react'
import { GithubIcon } from '@/components/icons'
import { ProjectLinksFrame } from './ProjectLinksFrame'

export interface ProjectLinksProps {
  title: string
  links: {
    github?: string
    website?: string
  }
  accent: {
    hoverText: string
  }
}

export const ProjectLinks = ({
  links,
  title,
  accent: { hoverText }
}: ProjectLinksProps) => (
  <ProjectLinksFrame
    links={links}
    title={title}
    hoverText={hoverText}
    githubIcon={<GithubIcon size={20} />}
    websiteIcon={<ExternalLink className="link-icon" size={20} />}
  />
)
