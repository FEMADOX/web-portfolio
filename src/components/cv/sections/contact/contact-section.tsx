'use client'

import { ContactForm } from './ContactForm'
import { ContactLinks } from './ContactLinks'

export const ContactSection = () => (
  <section id="contact" className="my-20 group/contact-section">
    <div className="flex items-center justify-between mb-5">
      <h2
        className="
          inline-block border-2 border-border bg-foreground px-4 py-1 text-lg font-black uppercase tracking-wider text-background shadow-sm
          group-hover/contact-section:bg-accent group-hover/contact-section:text-accent-foreground transition-colors
        "
      >
        Contact
      </h2>
      <span className="text-xs text-accent font-mono hidden sm:block">
        COMM.03
      </span>
    </div>

    <div className="grid lg:grid-cols-2 gap-8">
      <ContactLinks />
      <ContactForm />
    </div>
  </section>
)
