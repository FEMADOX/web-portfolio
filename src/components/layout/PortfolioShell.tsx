'use client'

import {
  type ComponentProps,
  type ReactNode,
  useId,
  useRef,
  ViewTransition
} from 'react'
import { getCvLocale } from '@/app/i18n'
import { DesktopControlsDock } from '@/components/cv/DesktopControlsDock'
import { Footer } from '@/components/cv/Footer'
import { useLanguageContext } from '@/contexts/LanguageContext'
import useSidebarEntrance from '@/hooks/useSidebarEntrance'
import { cn } from '@/lib/utils'
import SidebarToggle from './SidebarToggle'

interface PortfolioShellProps extends ComponentProps<'div'> {
  children: ReactNode
  sidebar: ReactNode
  desktopNavigation?: ReactNode
  mobileHeader: ReactNode
  mobileNavigation?: ReactNode
  bottomNavigation?: ReactNode
  overlay?: ReactNode
  contentClassName?: string
  mainProps?: Omit<ComponentProps<'main'>, 'children' | 'className'>
}

const PortfolioShell = ({
  overlay,
  mobileHeader,
  mobileNavigation,
  bottomNavigation,
  sidebar,
  desktopNavigation,
  children,
  className,
  contentClassName,
  mainProps,
  ...props
}: PortfolioShellProps) => {
  const lang = useLanguageContext()
  const { controls, theme, footer } = getCvLocale(lang)
  const sidebarId = `portfolio-sidebar-${useId()}`
  const sidebarRef = useRef<HTMLDivElement>(null)
  useSidebarEntrance(sidebarRef, 'sidebar')

  return (
    <ViewTransition
      enter={{
        default: 'none',
        'project-forward': 'project-page-enter',
        'project-back': 'project-page-enter'
      }}
      exit={{
        default: 'none',
        'project-forward': 'project-page-exit',
        'project-back': 'project-page-exit'
      }}
      default="none"
    >
      <div
        {...props}
        className={cn('min-h-screen text-foreground antialiased', className)}
      >
        {overlay}
        {mobileHeader}
        <div
          ref={sidebarRef}
          id={sidebarId}
          data-portfolio-sidebar
          className="fixed inset-y-0 left-0 z-50 hidden w-74 lg:block lg:wide:hidden"
        >
          {sidebar}
        </div>

        <div
          data-desktop-docks
          className="pointer-events-none fixed inset-x-4 top-4 z-60 hidden h-17 items-start gap-4 lg:flex"
        >
          {desktopNavigation && (
            <div className="hidden h-17 min-w-0 flex-1 lg:wide:flex">
              {desktopNavigation}
            </div>
          )}
          <DesktopControlsDock
            controlsLabel={controls}
            themeLabels={theme}
            placement="header"
          >
            <SidebarToggle controlsId={sidebarId} />
          </DesktopControlsDock>
        </div>

        {mobileNavigation}

        <main
          {...mainProps}
          data-sidebar-content
          className={cn(
            'lg:ml-74 lg:wide:ml-0 lg:wide:scroll-mt-28 lg:wide:**:[[id]]:scroll-mt-28',
            contentClassName
          )}
        >
          {children}
          <Footer source={footer.source} />
        </main>

        {bottomNavigation}
      </div>
    </ViewTransition>
  )
}

export default PortfolioShell
