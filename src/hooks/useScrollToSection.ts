import { useCallback } from 'react'
import type { SectionId } from '@/app/types'

const useScrollToSection = () =>
  useCallback(
    (sectionId: SectionId) =>
      document
        .getElementById(sectionId)
        ?.scrollIntoView({ behavior: 'smooth' }),
    []
  )

export default useScrollToSection
