'use client'

import { type ReactNode, useRef, ViewTransition } from 'react'
import { getCvLocale } from '@/app/i18n'
import { DesktopControlsDock } from '@/components/cv/DesktopControlsDock'
import { Footer } from '@/components/cv/Footer'
import { useLanguageContext } from '@/contexts/LanguageContext'
import { ProjectChaptersProvider } from '@/contexts/ProjectChaptersContext'
import type { ProjectSlug } from '@/data/projects/types'
import { getProjectLabels } from './labels'
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
  const backHref = `/${lang}#projects`

  return (
    <ProjectChaptersProvider slug={slug}>
      <ViewTransition
        enter="project-page-enter"
        exit="project-page-exit"
        default="none"
      >
        <div
          className={`min-h-screen [&_:is(a,summary)]:[-webkit-tap-highlight-color:transparent] [&_:is(a,summary):focus-visible]:outline-3 [&_:is(a,summary):focus-visible]:outline-ring [&_:is(a,summary):focus-visible]:outline-offset-[5px] ${getProjectThemeClasses(slug)}`}
          data-project-detail={slug}
        >
          <a
            href="#case-study"
            className="fixed top-2 left-4 z-100 translate-y-[-150%] bg-accent p-4 font-extrabold text-accent-foreground focus-visible:translate-y-0"
          >
            {labels.skip}
          </a>
          <ProjectSidebar
            {...{
              locale,
              labels,
              backHref,
              index,
              title
            }}
          />

          <ProjectMobileHeader {...{ locale, labels, backHref }} />

          <DesktopControlsDock
            controlsLabel={locale.controls}
            themeLabels={locale.theme}
          />

          <ProjectShellMobileNavigation {...{ labels, slug, mobileNavRef }} />

          <div className="lg:ml-74">
            <main id="case-study" tabIndex={-1}>
              {children}
            </main>
            <Footer source={locale.footer.source} />
          </div>
        </div>
      </ViewTransition>
    </ProjectChaptersProvider>
  )
}

export default ProjectShell
