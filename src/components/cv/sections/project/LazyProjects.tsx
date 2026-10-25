'use client'

import type { ReactNode } from 'react'
import { createLazyOnVisible } from '@/components/cv/LazyOnVisible'
import type { ProjectsProps } from './Projects'

type LazyProjectsProps = ProjectsProps & { fallback: ReactNode }

export const LazyProjects = createLazyOnVisible<LazyProjectsProps>(
  () => import('./Projects').then(({ Projects }) => ({ default: Projects })),
  ({ fallback }) => fallback
)
