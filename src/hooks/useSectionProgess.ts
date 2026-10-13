import { useMotionValue } from 'motion/react'
import { useEffect, useMemo } from 'react'
import type { SectionId } from '@/app/types'

const sectionIds: SectionId[] = [
  'summary',
  'skills',
  'projects',
  'education',
  'contact'
]

const initialProgress: Record<SectionId, number> = {
  summary: 0,
  skills: 0,
  projects: 0,
  education: 0,
  contact: 0
}

const useSectionProgress = () => {
  const summary = useMotionValue(0)
  const skills = useMotionValue(0)
  const projects = useMotionValue(0)
  const education = useMotionValue(0)
  const contact = useMotionValue(0)

  const progress = useMemo(
    () => ({ summary, skills, projects, education, contact }),
    [summary, skills, projects, education, contact]
  )

  useEffect(() => {
    let frame: number | null = null

    const update = () => {
      frame = null

      const root = document.scrollingElement ?? document.documentElement
      const maxScroll = Math.max(0, root.scrollHeight - root.clientHeight)
      const scrollTop = Math.min(maxScroll, Math.max(0, root.scrollTop))
      const next = { ...initialProgress }

      const getSectionStart = (id: SectionId) => {
        const element = document.getElementById(id)
        if (!element) return maxScroll

        const top = element.getBoundingClientRect().top + root.scrollTop

        return Math.min(maxScroll, Math.max(0, top - 200))
      }

      for (const [index, id] of sectionIds.entries()) {
        if (!document.getElementById(id)) continue

        const nextId = sectionIds[index + 1]
        const start = index === 0 ? 0 : getSectionStart(id)
        const end = nextId ? getSectionStart(nextId) : maxScroll
        const distance = end - start

        const percentage =
          maxScroll === 0
            ? 0
            : distance > 0
              ? ((scrollTop - start) / distance) * 100
              : scrollTop >= end
                ? 100
                : 0

        next[id] = Math.min(100, Math.max(0, percentage))
      }

      for (const id of sectionIds) {
        const value = next[id]

        if (progress[id].get() !== value) progress[id].set(value)
      }
    }

    const schedule = () => (frame ??= requestAnimationFrame(update))

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
  }, [progress])

  return progress
}

export default useSectionProgress
