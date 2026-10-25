'use client'

import { type RefObject, useEffect } from 'react'
import { useMotionPreferences } from '@/contexts/MotionPreferencesContext'

export default function useActiveNavScroll(
  navRef: RefObject<HTMLElement | null>,
  active: string,
  enabled = true
) {
  const { canAnimate } = useMotionPreferences()

  useEffect(() => {
    const nav = navRef.current
    if (!enabled || !nav) return
    let frame: number | null = null

    const keepVisible = () => {
      frame = null
      if (!nav.clientWidth) return
      const focused = document.activeElement
      const target =
        focused instanceof HTMLElement && nav.contains(focused)
          ? focused.closest<HTMLElement>('a,button')
          : nav.querySelector<HTMLElement>(
              `[data-navigation-item="${CSS.escape(active)}"],a[href="#${CSS.escape(active)}"]`
            )
      if (!target) return

      const bounds = nav.getBoundingClientRect()
      const item = target.getBoundingClientRect()
      const gap = 4
      let left = nav.scrollLeft
      if (item.left < bounds.left + gap) {
        left += item.left - bounds.left - gap
      } else if (item.right > bounds.right - gap) {
        left += item.right - bounds.right + gap
      } else {
        return
      }
      nav.scrollTo({
        left: Math.max(0, left),
        behavior: canAnimate ? 'smooth' : 'instant'
      })
    }

    const schedule = () => {
      frame ??= requestAnimationFrame(keepVisible)
    }
    schedule()
    nav.addEventListener('focusin', schedule)
    nav.addEventListener('focusout', schedule)
    const observer = new ResizeObserver(schedule)
    observer.observe(nav)

    return () => {
      nav.removeEventListener('focusin', schedule)
      nav.removeEventListener('focusout', schedule)
      observer.disconnect()
      if (frame !== null) cancelAnimationFrame(frame)
    }
  }, [navRef, active, enabled, canAnimate])
}
