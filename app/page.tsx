"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "@/components/cv/sidebar"
import { HeroSection } from "@/components/cv/hero-section"
import { SkillsSection } from "@/components/cv/skills-section"
import { ProjectsSection } from "@/components/cv/projects-section"
import { EducationSection } from "@/components/cv/education-section"
import { ContactSection } from "@/components/cv/contact-section"
import { MobileNav } from "@/components/cv/mobile-nav"
import { MobileHeader } from "@/components/cv/mobile-header"

export default function CVPage() {
  const [activeSection, setActiveSection] = useState("summary")
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["summary", "skills", "projects", "education", "contact"]
      const scrollPosition = window.scrollY + 200

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
      <MobileHeader className="lg:hidden" />

      {/* Desktop Sidebar */}
      <Sidebar
        activeSection={activeSection}
        onNavigate={scrollToSection}
        className="hidden lg:flex"
      />

      {/* Main Content */}
      <main className="lg:ml-64 pb-20 lg:pb-0">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
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
        className="lg:hidden"
      />
    </div>
  )
}
