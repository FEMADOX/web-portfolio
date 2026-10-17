'use client'

import { useEffect, useState } from 'react'
import { PROJECT_CHAPTERS } from '@/components/projects/labels'
import type { ProjectSlug } from '@/data/projects/types'

export function useProjectChapter(slug: ProjectSlug) {
  const [active, setActive] = useState<string>(PROJECT_CHAPTERS[0])

  useEffect(() => {
    const content = document.querySelector(
      `.project-detail[data-project="${slug}"]`
    )
    let frame: number | null = null

    const update = () => {
      frame = null
      const root = document.documentElement
      const atBottom =
        root.scrollHeight - root.clientHeight - window.scrollY < 3
      const current = [...PROJECT_CHAPTERS].reverse().find(id => {
        const element = content?.querySelector(`#${id}`)
        return element && element.getBoundingClientRect().top <= 180
      })
      setActive(atBottom ? 'outcomes' : (current ?? PROJECT_CHAPTERS[0]))
    }

    const schedule = () => {
      frame ??= requestAnimationFrame(update)
    }

    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)

    const observer = new ResizeObserver(schedule)
    observer.observe(document.body)
    schedule()

    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      observer.disconnect()
      if (frame !== null) cancelAnimationFrame(frame)
    }
  }, [slug])

  return active
}
