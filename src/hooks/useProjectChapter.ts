'use client'

import { useMotionValue } from 'motion/react'
import { useEffect, useMemo, useState } from 'react'
import { PROJECT_CHAPTERS } from '@/components/projects/labels'
import type { ProjectSlug } from '@/data/projects/types'
import type { ProjectChapter } from '@/types/projects'

export function useProjectChapter(slug: ProjectSlug) {
  const [active, setActive] = useState<ProjectChapter>(PROJECT_CHAPTERS[0])
  const challenge = useMotionValue(0)
  const contribution = useMotionValue(0)
  const architecture = useMotionValue(0)
  const decisions = useMotionValue(0)
  const outcomes = useMotionValue(0)

  const progress = useMemo(
    () => ({ challenge, contribution, architecture, decisions, outcomes }),
    [challenge, contribution, architecture, decisions, outcomes]
  )

  useEffect(() => {
    const content = document.querySelector(`[data-project-detail="${slug}"]`)
    let frame: number | null = null

    const update = () => {
      frame = null
      const root = document.scrollingElement ?? document.documentElement
      const maxScroll = Math.max(0, root.scrollHeight - root.clientHeight)
      const scrollTop = Math.min(maxScroll, Math.max(0, root.scrollTop))
      const starts = PROJECT_CHAPTERS.map((id, index) => {
        if (index === 0) return 0

        const element = content?.querySelector(`#${id}`)
        if (!element) return maxScroll

        const top = element.getBoundingClientRect().top + root.scrollTop
        return Math.min(maxScroll, Math.max(0, top - 180))
      })

      let current: (typeof PROJECT_CHAPTERS)[number] = PROJECT_CHAPTERS[0]

      for (const [index, id] of PROJECT_CHAPTERS.entries()) {
        const start = starts[index]
        const end = starts[index + 1] ?? maxScroll
        const distance = end - start
        const percentage =
          maxScroll === 0
            ? 0
            : distance > 0
              ? ((scrollTop - start) / distance) * 100
              : scrollTop >= end
                ? 100
                : 0

        progress[id].set(Math.min(100, Math.max(0, percentage)))
        if (maxScroll > 0 && scrollTop >= start) current = id
      }

      setActive(current)
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
  }, [slug, progress])

  return { active, progress }
}
