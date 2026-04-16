'use client'

import { useEffect, useState } from 'react'
import {
  ContactSection,
  EducationSection,
  Footer,
  HeroSection,
  MobileHeader,
  MobileNav,
  ProjectsSection,
  Sidebar,
  SkillsSection
} from '@/components/cv'

const CVPage = () => {
  const [activeSection, setActiveSection] = useState('summary')
  const [, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['summary', 'skills', 'projects', 'education', 'contact']
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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      {/* Mobile Header */}
      <MobileHeader className="lg:hidden" />

      {/* Desktop Sidebar */}
      <Sidebar
        activeSection={activeSection}
        onNavigate={scrollToSection}
        className="hidden lg:flex"
      />

      {/* Main Content */}
      <main className="lg:ml-72 pb-15 lg:pb-0">
        <div className="max-w-5xl mx-auto px-2 sm:px-6 lg:px-10 py-4 lg:py-10">
          <HeroSection />
          <SkillsSection />
          <ProjectsSection />
          <EducationSection />
          <ContactSection />
        </div>
        <Footer />
      </main>

      {/* Mobile Bottom Navigation */}
      <MobileNav
        activeSection={activeSection}
        onNavigate={scrollToSection}
        className="lg:hidden"
      />
    </div>
  )
}

export default CVPage
