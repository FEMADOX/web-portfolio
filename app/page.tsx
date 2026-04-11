"use client"

import { useState, useEffect } from "react"
import { HeroSection } from "@/components/cv/hero-section"
import { SkillsSection } from "@/components/cv/skills-section"
import { ProjectsSection } from "@/components/cv/projects-section"
import { EducationSection } from "@/components/cv/education-section"
import { ContactSection } from "@/components/cv/contact-section"
import { MobileNav } from "@/components/cv/mobile-nav"
import { MobileHeader } from "@/components/cv/mobile-header"

export default function CVPage() {
  const [activeSection, setActiveSection] = useState("summary")

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["summary", "skills", "projects", "education", "contact"]
      const scrollPosition = window.scrollY + 150

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Mobile Header */}
      <MobileHeader />

      {/* Main Content */}
      <main className="pb-20">
        <div className="max-w-md mx-auto px-4 py-4">
          <HeroSection />
          <SkillsSection />
          <ProjectsSection />
          <EducationSection />
          <ContactSection />
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <MobileNav
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />
    </div>
  )
}
