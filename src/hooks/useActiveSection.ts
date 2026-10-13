'use client'

import { useEffect, useState } from 'react'

const sections = [
  'summary',
  'skills',
  'projects',
  'education',
  'contact'
] as const

type ActiveSection = (typeof sections)[number]

const useActiveSection = () => {
  const [activeSection, setActiveSection] = useState<ActiveSection>('summary')

  useEffect(() => {
    const handleScroll = () => {
      const root = document.scrollingElement ?? document.documentElement
      const maxScroll = Math.max(0, root.scrollHeight - root.clientHeight)
      const scrollTop = Math.min(maxScroll, Math.max(0, root.scrollTop))

      let nextActive: ActiveSection = 'summary'

      if (maxScroll > 0) {
        for (const section of sections) {
          const element = document.getElementById(section)
          if (!element) continue

          const top = element.getBoundingClientRect().top + root.scrollTop
          const start = Math.min(maxScroll, Math.max(0, top - 200))

          if (scrollTop >= start) {
            nextActive = section
          }
        }
      }

      setActiveSection(nextActive)
    }

    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)

    const observer = new ResizeObserver(handleScroll)
    observer.observe(document.body)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
      observer.disconnect()
    }
  }, [])

  return activeSection
}

export default useActiveSection
