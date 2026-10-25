import { getCvLocale } from '@/app/i18n'
import type { Lang } from '@/app/types'
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
import DesktopNavigationDock from '../layout/DesktopNavigationDock'
import CVPageShell from './CVPageShell'
import { NavItems } from './NavItems'

type Props = {
  lang?: Lang
}

const CVPage = ({ lang = 'en' }: Props) => {
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
    <CVPageShell
      mobileHeader={<MobileHeader className="lg:hidden" themeLabels={theme} />}
      sidebar={<Sidebar className="hidden lg:flex" sidebar={sidebar} />}
      desktopNavigation={
        <DesktopNavigationDock>
          <NavItems navLabels={sidebar.navLabels} variant="dock" />
        </DesktopNavigationDock>
      }
      bottomNavigation={
        <MobileNav navigation={navigation} className="lg:hidden" />
      }
    >
      <HeroSection hero={hero} />
      <SkillsSection sectionTitle={skillsTitle} />
      <ProjectsSection
        lang={lang}
        sectionTitle={projectsTitle}
        projects={projects}
        sectionCode={projectsCode}
      />
      <EducationSection
        lang={lang}
        sectionTitle={educationTitle}
        sectionCode={educationCode}
      />
      <ContactSection
        sectionTitle={contactTitle}
        contactForm={contactForm}
        sectionCode={contactCode}
      />
    </CVPageShell>
  )
}

export default CVPage
