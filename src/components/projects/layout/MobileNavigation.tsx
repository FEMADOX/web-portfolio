import { type RefObject, useEffect } from 'react'
import { useProjectChaptersContext } from '@/contexts/ProjectChaptersContext'
import type { ProjectSlug } from '@/data/projects/types'
import ProjectChaptersComponent from '../ChaptersComponent'
import type { ProjectLabels } from '../types'

type Props = {
  labels: ProjectLabels
  slug: ProjectSlug
  mobileNavRef: RefObject<HTMLDivElement | null>
}

const ProjectMobileNavigation = ({ labels, slug, mobileNavRef }: Props) => {
  const { active } = useProjectChaptersContext()

  useEffect(() => {
    const nav = mobileNavRef.current
    if (!nav) return

    const centerActive = () => {
      const link = nav.querySelector<HTMLElement>(`[href="#${active}"]`)
      if (!nav.clientWidth || !link) return

      nav.scrollTo({
        left: link.offsetLeft - (nav.clientWidth - link.clientWidth) / 2,
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 'instant'
          : 'smooth'
      })
    }
    centerActive()

    const observer = new ResizeObserver(centerActive)
    observer.observe(nav)

    return () => observer.disconnect()
  }, [active, mobileNavRef])

  return (
    <ProjectChaptersComponent
      {...{ labels, slug, mobileNavRef }}
      className="sticky top-16 z-45 isolate flex snap-x snap-proximity scroll-px-3 overflow-x-auto overscroll-x-contain border-b-2 border-border bg-background scrollbar-none lg:hidden"
      dataProjectNavigation="mobile"
      chapterLinkVariant="mobile"
    />
  )
}

export default ProjectMobileNavigation
