import { type RefObject, useCallback } from 'react'
import type { SectionId } from '@/app/types'
import { useMotionPreferences } from '@/contexts/MotionPreferencesContext'

const useScrollToSection = (contentRef: RefObject<HTMLElement | null>) => {
  const { motionEnabled } = useMotionPreferences()
  return useCallback(
    (sectionId: SectionId) =>
      contentRef.current
        ?.querySelector(`#${sectionId}`)
        ?.scrollIntoView({ behavior: motionEnabled ? 'smooth' : 'instant' }),
    [contentRef, motionEnabled]
  )
}

export default useScrollToSection
