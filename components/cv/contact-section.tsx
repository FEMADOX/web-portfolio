"use client"

import { Mail, MessageSquare, Linkedin, ArrowRight } from "lucide-react"

const contactLinks = [
  {
    name: "Email",
    icon: Mail,
    href: "mailto:contact@giancarlos.dev",
  },
  {
    name: "WhatsApp",
    icon: MessageSquare,
    href: "https://wa.me/",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: "https://linkedin.com/in/",
  },
]

export function ContactSection() {
  return (
    <section id="contact" className="py-12">
      {/* Section Header */}
      <div className="mb-6">
        <h2 className="inline-block bg-accent text-accent-foreground px-4 py-2 text-sm font-bold uppercase tracking-wider">
          Contact
        </h2>
      </div>

      {/* Contact Links */}
      <div className="space-y-3">
        {contactLinks.map((link) => {
          const Icon = link.icon
          return (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 bg-card border border-border rounded-lg hover:border-muted-foreground transition-all group"
            >
              <div className="flex items-center gap-3">
                <Icon className="w-5 h-5 text-muted-foreground" />
                <span className="font-medium text-foreground text-sm">{link.name}</span>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
            </a>
          )
        })}
      </div>

      {/* Footer */}
      <footer className="mt-12 pt-6 border-t border-border">
        <div className="text-center mb-4">
          <p className="text-xs text-muted-foreground">
            © 2024 GIANCARLOS GONZALEZ
          </p>
        </div>
        <div className="flex items-center justify-center gap-8">
          <a
            href="https://github.com/"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider"
          >
            LinkedIn
          </a>
          <a
            href="#"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider"
          >
            Source
          </a>
        </div>
      </footer>
    </section>
  )
}
