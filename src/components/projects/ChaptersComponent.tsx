import type { RefObject } from 'react'
import { useProjectChaptersContext } from '@/contexts/ProjectChaptersContext'
import ProjectChapterLink from './ChapterLink'
import { PROJECT_CHAPTERS } from './labels'
import type { ProjectLabels } from './types'

type Props = {
  labels: ProjectLabels
  className: string
  dataProjectNavigation: string
  chapterLinkVariant: 'mobile' | 'desktop'
  mobileNavRef?: RefObject<HTMLDivElement | null>
}

const ProjectChaptersComponent = ({
  labels,
  className,
  dataProjectNavigation,
  chapterLinkVariant,
  mobileNavRef
}: Props) => {
  const { active, progress } = useProjectChaptersContext()

  return (
    <nav
      ref={mobileNavRef}
      aria-label={labels.contents}
      className={className}
      data-project-navigation={dataProjectNavigation}
    >
      {PROJECT_CHAPTERS.map((id, i) => (
        <ProjectChapterLink
          key={id}
          id={id}
          index={i}
          label={labels.chapters[i]}
          active={active === id}
          progress={progress[id]}
          variant={chapterLinkVariant}
        />
      ))}
    </nav>
  )
}
export default ProjectChaptersComponent
