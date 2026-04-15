import { ExternalLink } from 'lucide-react'
import { GithubIcon } from '@/components/icons'

export interface ProjectLinksProps {
  links: {
    github?: string
    website?: string
  }
  accent: {
    hoverText: string
  }
}

export const ProjectLinks = ({
  links: { github, website },
  accent: { hoverText }
}: ProjectLinksProps) => (
  <div className="flex gap-2">
    {github && (
      <a
        href={github}
        target="_blank"
        rel="noopener noreferrer"
        className={`text-muted-foreground ${hoverText} transition-colors`}
      >
        <GithubIcon size={20} />
      </a>
    )}
    {website ? (
      <a
        href={website}
        target="_blank"
        rel="noopener noreferrer"
        className={`text-muted-foreground ${hoverText} transition-colors`}
      >
        <ExternalLink className="link-icon" size={20} />
      </a>
    ): null}
  </div>
)
