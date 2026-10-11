'use client'

import { getCvLocale } from '@/app/i18n'
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
import { useLanguageContext } from '@/contexts/LanguageContext'
import useActiveSection from '@/hooks/useActiveSection'

const CVPage = () => {
  const [activeSection, lang] = [useActiveSection(), useLanguageContext()]
  const [locale, projects] = [getCvLocale(lang), getProjects(lang)]

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      {/* Mobile Header */}
      <MobileHeader className="lg:hidden" themeLabels={locale.theme} />

      {/* Desktop Sidebar */}
      <Sidebar
        activeSection={activeSection}
        className="hidden lg:flex"
        sidebar={locale.sidebar}
      />

      <DesktopControlsDock
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
        navigation={locale.navigation}
        className="lg:hidden"
      />
    </div>
  )
}

export default CVPage
