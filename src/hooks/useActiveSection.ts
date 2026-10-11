'use client'

import { useEffect, useState } from 'react'

const sections = ['summary', 'skills', 'projects', 'education', 'contact']

type ActiveSection = (typeof sections)[number]

const useActiveSection = () => {
  const [activeSection, setActiveSection] = useState<ActiveSection>('summary')

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200

      for (const section of sections) {
        const element = document.getElementById(section)

        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return activeSection
}

export default useActiveSection
