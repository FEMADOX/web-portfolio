'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getCvLocale } from '@/app/i18n'
import { getPreferredLang, LANGUAGE_CHOICE_KEY } from '@/app/language'
import type { Lang } from '@/app/types'
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

const CVPage = ({ initialLang = 'en' }: { initialLang?: Lang }) => {
  const router = useRouter()
  const pathname = usePathname()
  const [activeSection, setActiveSection] = useState('summary')
  const lang = initialLang
  const locale = getCvLocale(lang)
  const projects = getProjects(lang)

  useEffect(() => {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : lang
  }, [lang])

  useEffect(() => {
    if (pathname === '/') {
      let savedChoice: string | null = null
      let legacyLang: string | null = null
      try {
        savedChoice = localStorage.getItem(LANGUAGE_CHOICE_KEY)
        legacyLang = localStorage.getItem('lang')
      } catch {
        // Browser storage can be unavailable in private or restricted contexts.
      }

      const browserLanguages = navigator.languages?.length
        ? navigator.languages
        : [navigator.language]
      const nextLang = getPreferredLang(
        savedChoice,
        browserLanguages,
        legacyLang
      )
      router.replace(`/${nextLang}`)
    }
  }, [pathname, router])

  const setLang = (nextLang: Lang) => {
    try {
      localStorage.setItem(LANGUAGE_CHOICE_KEY, nextLang)
    } catch {
      // Navigation still works when browser storage is unavailable.
    }
    router.push(`/${nextLang}`)
  }

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
      <MobileHeader
        className="lg:hidden"
        lang={lang}
        setLang={setLang}
        themeLabels={locale.theme}
      />

      {/* Desktop Sidebar */}
      <Sidebar
        activeSection={activeSection}
        onNavigate={scrollToSection}
        className="hidden lg:flex"
        sidebar={locale.sidebar}
      />

      <DesktopControlsDock
        lang={lang}
        setLang={setLang}
        controlsLabel={locale.controls}
        themeLabels={locale.theme}
      />

      {/* Main Content */}
      <main className="lg:ml-72 pb-15 lg:pb-0">
        <div className="max-w-5xl mx-auto px-2 sm:px-6 lg:px-10 py-4 lg:py-10">
          <HeroSection hero={locale.hero} />
          <SkillsSection sectionTitle={locale.sections.skills} />
          <ProjectsSection
            sectionTitle={locale.sections.projects}
            projects={projects}
            sectionCode={locale.sectionCodes.projects}
          />
          <EducationSection
            sectionTitle={locale.sections.education}
            lang={lang}
            sectionCode={locale.sectionCodes.education}
          />
          <ContactSection
            sectionTitle={locale.sections.contact}
            contactForm={locale.contactForm}
            sectionCode={locale.sectionCodes.contact}
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
