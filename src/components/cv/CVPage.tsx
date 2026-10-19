'use client'

import { getCvLocale } from '@/app/i18n'
import {
  ContactSection,
  EducationSection,
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
import PortfolioShell from '../layout/PortfolioShell'

const CVPage = () => {
  const [activeSection, lang] = [useActiveSection(), useLanguageContext()]
  const [
    {
      sidebar,
      navigation,
      sections: {
        skills: skillsTitle,
        projects: projectsTitle,
        education: educationTitle,
        contact: contactTitle
      },
      theme,
      hero,
      sectionCodes: {
        projects: projectsCode,
        education: educationCode,
        contact: contactCode
      },
      contactForm
    },
    projects
  ] = [getCvLocale(lang), getProjects(lang)]

  return (
    <PortfolioShell
      mobileHeader={<MobileHeader className="lg:hidden" themeLabels={theme} />}
      sidebar={
        <Sidebar
          activeSection={activeSection}
          className="hidden lg:flex"
          sidebar={sidebar}
        />
      }
      bottomNavigation={
        <MobileNav
          activeSection={activeSection}
          navigation={navigation}
          className="lg:hidden"
        />
      }
      contentClassName="pb-15 lg:pb-0"
    >
      <div className="mx-auto max-w-5xl px-2 py-4 sm:px-6 lg:px-10 lg:py-10">
        <HeroSection hero={hero} />
        <SkillsSection sectionTitle={skillsTitle} />
        <ProjectsSection
          sectionTitle={projectsTitle}
          projects={projects}
          sectionCode={projectsCode}
        />
        <EducationSection
          sectionTitle={educationTitle}
          sectionCode={educationCode}
        />
        <ContactSection
          sectionTitle={contactTitle}
          contactForm={contactForm}
          sectionCode={contactCode}
        />
      </div>
    </PortfolioShell>
  )
}

export default CVPage
