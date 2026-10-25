'use client'

import { type ReactNode, useRef } from 'react'
import { getCvLocale } from '@/app/i18n'
import DesktopNavigationDock from '@/components/layout/DesktopNavigationDock'
import PortfolioShell from '@/components/layout/PortfolioShell'
import { useLanguageContext } from '@/contexts/LanguageContext'
import { ProjectChaptersProvider } from '@/contexts/ProjectChaptersContext'
import type { ProjectSlug } from '@/data/projects/types'
import { getProjectLabels } from './labels'
import ProjectDesktopNavigation from './layout/DesktopNavigation'
import ProjectMobileHeader from './layout/MobileHeader'
import ProjectShellMobileNavigation from './layout/MobileNavigation'
import ProjectSidebar from './layout/Sidebar'
import { getProjectThemeClasses } from './theme'

type Props = {
  children: ReactNode
  slug: ProjectSlug
  title: string
  index: number
}

const ProjectShell = ({ children, slug, title, index }: Props) => {
  const lang = useLanguageContext()
  const labels = getProjectLabels(lang)
  const locale = getCvLocale(lang)
  const mobileNavRef = useRef<HTMLDivElement | null>(null)
  const contentRef = useRef<HTMLElement | null>(null)
  const backHref = `/${lang}#projects`

  return (
    <ProjectChaptersProvider key={slug} contentRef={contentRef}>
      <PortfolioShell
        className={`[&_:is(a,summary)]:[-webkit-tap-highlight-color:transparent] [&_:is(a,summary):focus-visible]:outline-3 [&_:is(a,summary):focus-visible]:outline-ring [&_:is(a,summary):focus-visible]:outline-offset-[5px] ${getProjectThemeClasses(slug)}`}
        data-project-detail={slug}
        mainProps={{ id: 'case-study', tabIndex: -1, ref: contentRef }}
        overlay={
          <a
            href="#case-study"
            className="fixed top-2 left-4 z-100 translate-y-[-150%] bg-accent p-4 font-extrabold text-accent-foreground focus-visible:translate-y-0"
          >
            {labels.skip}
          </a>
        }
        sidebar={
          <ProjectSidebar
            {...{
              locale,
              labels,
              backHref,
              index,
              title
            }}
          />
        }
        desktopNavigation={
          <DesktopNavigationDock backHref={backHref} backLabel={labels.back}>
            <ProjectDesktopNavigation labels={labels} />
          </DesktopNavigationDock>
        }
        mobileHeader={<ProjectMobileHeader {...{ locale, labels, backHref }} />}
        mobileNavigation={
          <ProjectShellMobileNavigation {...{ labels, slug, mobileNavRef }} />
        }
      >
        {children}
      </PortfolioShell>
    </ProjectChaptersProvider>
  )
}

export default ProjectShell
