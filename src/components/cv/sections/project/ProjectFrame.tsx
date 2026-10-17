import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { getProjectLabels } from '@/components/projects/labels'
import { ProjectVisual } from '@/components/projects/ProjectVisual'
import { useLanguageContext } from '@/contexts/LanguageContext'
import { getProjectPath } from '@/lib/projectPaths'
import { Technologies } from './Technologies'
import type { ProjectsComponentProps } from './types'

interface ProjectFrameProps extends ProjectsComponentProps {
  links: ReactNode
}

export const ProjectFrame = ({
  project: { slug, title, period, description, technologies },
  accent,
  links
}: ProjectFrameProps) => {
  const lang = useLanguageContext()
  const labels = getProjectLabels(lang)
  return (
    <article className="project-card" data-project={slug}>
      <div className="project-card-header">
        <span>{period}</span>
        {links}
      </div>
      <Link
        href={getProjectPath(lang, slug)}
        transitionTypes={['project-forward']}
        className="project-card-body"
        aria-label={`${labels.explore}: ${title}`}
      >
        <ProjectVisual slug={slug} />
        <div className="project-card-copy">
          <h3>{title}</h3>
          <p>{description}</p>
          <Technologies technologies={technologies} accent={accent} />
          <div className="project-card-cta">
            <span>
              <strong>{labels.explore}</strong>
              <small>{labels.cardHint}</small>
            </span>
            <span>
              <ArrowUpRight size={22} aria-hidden="true" />
            </span>
          </div>
        </div>
      </Link>
    </article>
  )
}
