'use client'

import {
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  MessageSquare,
  Send
} from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const contactLinks = [
  {
    name: 'Email',
    icon: Mail,
    href: 'mailto:contact@giancarlos.dev'
  },
  {
    name: 'WhatsApp',
    icon: MessageSquare,
    href: 'https://wa.me/'
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    href: 'https://linkedin.com/in/'
  },
  {
    name: 'GitHub',
    icon: Github,
    href: 'https://github.com/'
  }
]

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
  }

  return (
    <section id="contact" className="py-10">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="inline-block border-2 border-border bg-foreground px-4 py-1 text-lg font-black uppercase tracking-wider text-background shadow-[2px_2px_0_0_#000]">
          Contact
        </h2>
        <span className="text-xs text-accent font-mono hidden sm:block">
          COMM.03
        </span>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
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
                className="flex items-center justify-between p-4 bg-card border-2 border-border shadow-[2px_2px_0_0_#000] transition-all group hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
                  <span className="font-medium text-foreground">
                    {link.name}
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-all" />
              </a>
            )
          })}
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="contact-name"
              className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2"
            >
              Target Identity (Name)
            </label>
            <Input
              id="contact-name"
              placeholder="Enter identification..."
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="bg-card border-2 border-border rounded-none"
            />
          </div>
          <div>
            <label
              htmlFor="contact-email"
              className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2"
            >
              Routing Address (Email)
            </label>
            <Input
              id="contact-email"
              type="email"
              placeholder="Enter transmission route..."
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="bg-card border-2 border-border rounded-none"
            />
          </div>
          <div>
            <label
              htmlFor="contact-message"
              className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2"
            >
              Payload (Message)
            </label>
            <Textarea
              id="contact-message"
              placeholder="Construct message payload..."
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              className="bg-card border-2 border-border rounded-none min-h-30"
            />
          </div>
          <Button
            type="submit"
            className="rounded-none border-2 border-border bg-accent hover:bg-accent/95 text-accent-foreground font-black uppercase tracking-widest"
          >
            <Send className="w-4 h-4 mr-2" />
            Transmit Data
          </Button>
        </form>
      </div>

      {/* Footer */}
      <footer className="mt-12 pt-6 border-t-4 border-border bg-foreground text-background px-4 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-bold text-accent uppercase tracking-wider">
            © {new Date().getFullYear()} Giancarlos Gonzalez
          </p>
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/"
              className="text-[10px] text-background hover:text-accent transition-colors uppercase tracking-wider"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/"
              className="text-[10px] text-background hover:text-accent transition-colors uppercase tracking-wider"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/FEMADOX/web-portfolio"
              className="text-[10px] text-background hover:text-accent transition-colors uppercase tracking-wider"
            >
              Source
            </a>
          </div>
        </div>
      </footer>
    </section>
  )
}
