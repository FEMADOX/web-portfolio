'use client'

import type { MotionValue } from 'motion/react'
import { createContext, type RefObject, useContext, useMemo } from 'react'
import type { ChildrenProps, SectionId } from '@/app/types'
import useActiveSection from '@/hooks/useActiveSection'
import useScrollToSection from '@/hooks/useScrollToSection'
import useSectionProgress from '@/hooks/useSectionProgess'

type CvNavigationContextValue = {
  activeSection: SectionId
  sectionProgress: Record<SectionId, MotionValue<number>>
  scrollToSection: (sectionId: SectionId) => void
}

const CvNavigationContext = createContext<CvNavigationContextValue | null>(null)

interface CvNavigationProviderProps extends ChildrenProps {
  contentRef: RefObject<HTMLElement | null>
}

export const CvNavigationProvider = ({
  children,
  contentRef
}: CvNavigationProviderProps) => {
  const activeSection = useActiveSection(contentRef)
  const sectionProgress = useSectionProgress(contentRef)
  const scrollToSection = useScrollToSection(contentRef)
  const value = useMemo(
    () => ({ activeSection, sectionProgress, scrollToSection }),
    [activeSection, sectionProgress, scrollToSection]
  )

  return (
    <CvNavigationContext.Provider value={value}>
      {children}
    </CvNavigationContext.Provider>
  )
}

export const useCvNavigation = () => {
  const context = useContext(CvNavigationContext)

  if (!context) {
    throw new Error('useCvNavigation must be used within CvNavigationProvider')
  }

  return context
}
