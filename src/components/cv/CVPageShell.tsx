'use client'

import { type ReactNode, useRef } from 'react'
import { CvNavigationProvider } from '@/contexts/CvNavigationContext'
import PortfolioShell from '../layout/PortfolioShell'

interface CVPageShellProps {
  children: ReactNode
  mobileHeader: ReactNode
  sidebar: ReactNode
  desktopNavigation: ReactNode
  bottomNavigation: ReactNode
}

export default function CVPageShell({
  children,
  mobileHeader,
  sidebar,
  desktopNavigation,
  bottomNavigation
}: CVPageShellProps) {
  const contentRef = useRef<HTMLDivElement | null>(null)

  return (
    <CvNavigationProvider contentRef={contentRef}>
      <PortfolioShell
        mobileHeader={mobileHeader}
        sidebar={sidebar}
        desktopNavigation={desktopNavigation}
        bottomNavigation={bottomNavigation}
        contentClassName="pb-15 lg:pb-0"
      >
        <div
          ref={contentRef}
          data-cv-content
          className="mx-auto max-w-5xl px-2 py-4 sm:px-6 lg:px-10 lg:py-10 lg:wide:max-w-none lg:wide:pt-28 lg:wide:[&_p]:max-w-prose"
        >
          {children}
        </div>
      </PortfolioShell>
    </CvNavigationProvider>
  )
}
