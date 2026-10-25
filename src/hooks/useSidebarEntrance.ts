'use client'

import { animate } from 'motion/react'
import { type RefObject, useLayoutEffect, useRef } from 'react'
import { useMotionPreferences } from '@/contexts/MotionPreferencesContext'
import { useSidebarPreferences } from '@/contexts/SidebarPreferencesContext'

export default function useSidebarEntrance(
  elementRef: RefObject<HTMLElement | null>,
  variant: 'sidebar' | 'dock'
) {
  const { mode } = useSidebarPreferences()
  const { canAnimate } = useMotionPreferences()
  const previousMode = useRef<string | null>(null)

  useLayoutEffect(() => {
    const previous = previousMode.current
    const actualMode = document.documentElement.dataset.sidebarState
    previousMode.current = actualMode ?? 'expanded'
    const element = elementRef.current
    const visibleMode = variant === 'sidebar' ? 'expanded' : 'collapsed'

    if (
      previous === null ||
      previous === mode ||
      mode !== actualMode ||
      mode !== visibleMode ||
      !canAnimate ||
      !window.matchMedia('(min-width: 64rem)').matches ||
      !element
    )
      return

    const animation = animate(
      element,
      variant === 'sidebar'
        ? { opacity: [0, 1], x: ['-100%', '0%'] }
        : { opacity: [0, 1], y: [-6, 0] },
      { duration: variant === 'sidebar' ? 0.26 : 0.18, ease: 'easeOut' }
    )

    return () => {
      animation.stop()
      element.style.removeProperty('opacity')
      element.style.removeProperty('transform')
    }
  }, [elementRef, variant, mode, canAnimate])
}
