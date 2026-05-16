'use client'

import type { CvLocale } from '@/app/types'
import { ContactForm } from './ContactForm'
import { ContactLinks } from './ContactLinks'

interface ContactSectionProps {
  sectionTitle: CvLocale['sections']['education']
  contactForm: CvLocale['contactForm']
}

export const ContactSection = ({
  sectionTitle,
  contactForm
}: ContactSectionProps) => (
  <section id="contact" className="my-20 group/contact-section md:mb-52">
    <div className="flex items-center justify-between mb-5">
      <h2
        className="
          inline-block border-2 border-border bg-foreground px-4 py-1 text-lg font-black uppercase tracking-wider text-background shadow-sm
          group-hover/contact-section:bg-accent group-hover/contact-section:text-accent-foreground transition-colors
        "
      >
        {sectionTitle}
      </h2>
      <span className="text-xs text-accent font-mono hidden sm:block">
        CONTACT.04
      </span>
    </div>

    <div className="grid lg:grid-cols-2 gap-8">
      <ContactLinks />
      <ContactForm contactForm={contactForm} />
    </div>
  </section>
)
