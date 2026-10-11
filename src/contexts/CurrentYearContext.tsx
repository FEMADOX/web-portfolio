'use client'

import { createContext, use } from 'react'
import type { ChildrenProps } from '@/app/types'

interface CurrentYearProviderProps extends ChildrenProps {
  currentYear: number
}

const CurrentYearContext = createContext<number | undefined>(undefined)

export const CurrentYearProvider = ({
  currentYear,
  ...props
}: CurrentYearProviderProps) => (
  <CurrentYearContext value={currentYear} {...props} />
)

export const useCurrentYearContext = () => {
  const context = use(CurrentYearContext)

  if (context === undefined)
    throw new Error(
      'useCurrentYearContext must be used within a CurrentYearProvider'
    )

  return context
}
