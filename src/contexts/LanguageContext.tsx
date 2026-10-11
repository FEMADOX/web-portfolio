'use client'

import { createContext, use } from 'react'
import type { Lang } from '@/app/types'
import type { LanguageChildrenProps } from '@/types/language'

const LanguageContext = createContext<Lang | undefined>(undefined)

export const LanguageProvider = ({ lang, children }: LanguageChildrenProps) => (
  <LanguageContext value={lang}>{children}</LanguageContext>
)

export const useLanguageContext = () => {
  const context = use(LanguageContext)

  if (context === undefined)
    throw new Error('useLanguageContext must be used within a LanguageProvider')

  return context
}
