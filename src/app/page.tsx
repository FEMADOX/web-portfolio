'use client'

import { useEffect, useState } from 'react'
import {
  ContactSection,
  DesktopControlsDock,
  EducationSection,
  Footer,
  HeroSection,
  MobileHeader,
  MobileNav,
  ProjectsSection,
  Sidebar,
  SkillsSection
} from '@/components/cv'
import { getProjects } from '@/components/cv/sections/project/utils'
import { getCvLocale } from './i18n'
import type { Lang } from './types'

const CVPage = () => {
  const [activeSection, setActiveSection] = useState('summary')
  const [, setIsMobile] = useState(false)
  const [lang, setLang] = useState<Lang>('en')
  const locale = getCvLocale(lang)
  const projects = getProjects(lang)

  useEffect(() => {
    const storedLang = localStorage.getItem('lang') as Lang
    if (!storedLang) {
      localStorage.setItem('lang', 'en')
    }
    if (storedLang) {
      setLang(storedLang)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('lang', lang)
  }, [lang])

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
      <MobileHeader className="lg:hidden" lang={lang} setLang={setLang} />

      {/* Desktop Sidebar */}
      <Sidebar
        activeSection={activeSection}
        onNavigate={scrollToSection}
        className="hidden lg:flex"
        sidebar={locale.sidebar}
      />

      <DesktopControlsDock lang={lang} setLang={setLang} />

      {/* Main Content */}
      <main className="lg:ml-72 pb-15 lg:pb-0">
        <div className="max-w-5xl mx-auto px-2 sm:px-6 lg:px-10 py-4 lg:py-10">
          <HeroSection hero={locale.hero} />
          <SkillsSection sectionTitle={locale.sections.skills} />
          <ProjectsSection
            sectionTitle={locale.sections.projects}
            projects={projects}
          />
          <EducationSection
            sectionTitle={locale.sections.education}
            lang={lang}
          />
          <ContactSection
            sectionTitle={locale.sections.contact}
            contactForm={locale.contactForm}
          />
        </div>
        <Footer source={locale.footer.source} />
      </main>

      {/* Mobile Bottom Navigation */}
      <MobileNav
        activeSection={activeSection}
        onNavigate={scrollToSection}
        navigation={locale.navigation}
        className="lg:hidden"
      />
    </div>
  )
}

export default CVPage
