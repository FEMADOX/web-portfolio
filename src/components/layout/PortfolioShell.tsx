'use client'

import { cn } from 'cn'
import { type ComponentProps, type ReactNode, ViewTransition } from 'react'
import { getCvLocale } from '@/app/i18n'
import { useLanguageContext } from '@/contexts/LanguageContext'
import { DesktopControlsDock, Footer } from '../cv'

interface PortfolioShellProps extends ComponentProps<'div'> {
  children: ReactNode
  sidebar: ReactNode
  mobileHeader: ReactNode
  mobileNavigation?: ReactNode
  bottomNavigation?: ReactNode
  overlay?: ReactNode
  contentClassName?: string
}

const PortfolioShell = ({
  overlay,
  mobileHeader,
  mobileNavigation,
  bottomNavigation,
  sidebar,
  children,
  className,
  contentClassName,
  ...props
}: PortfolioShellProps) => {
  const lang = useLanguageContext()
  const { controls, theme, footer } = getCvLocale(lang)

  return (
    <ViewTransition
      enter="project-page-enter"
      exit="project-page-exit"
      default="none"
    >
      <div
        {...props}
        className={cn(
          'min-h-screen bg-background text-foreground antialiased',
          className
        )}
      >
        {overlay}
        {mobileHeader}
        {sidebar}

        <DesktopControlsDock controlsLabel={controls} themeLabels={theme} />

        {mobileNavigation}

        <main className={cn('lg:ml-74', contentClassName)}>
          {children}
          <Footer source={footer.source} />
        </main>

        {bottomNavigation}
      </div>
    </ViewTransition>
  )
}

export default PortfolioShell
