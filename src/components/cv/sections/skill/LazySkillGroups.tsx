'use client'

import type { ReactNode } from 'react'
import { createLazyOnVisible } from '@/components/cv/LazyOnVisible'

export const LazySkillGroups = createLazyOnVisible<{ fallback: ReactNode }>(
  () =>
    import('./SkillsGroups').then(({ SkillGroups }) => ({
      default: SkillGroups
    })),
  props => props.fallback
)
