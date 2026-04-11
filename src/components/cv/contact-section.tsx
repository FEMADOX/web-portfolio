'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Mail,
  MessageSquare,
  Linkedin,
  Github,
  ArrowRight,
  Send
} from 'lucide-react'

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

export function ContactSection() {
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
    <section id="contact" className="py-16">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="inline-block bg-accent text-accent-foreground px-4 py-2 text-lg font-bold uppercase tracking-wider">
          Contact
        </h2>
        <span className="text-xs text-accent font-mono hidden sm:block">
          COMM.03
        </span>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
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
                className="flex items-center justify-between p-4 bg-card border border-border rounded-lg hover:border-accent/50 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
                  <span className="font-medium text-foreground">
                    {link.name}
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
              </a>
            )
          })}
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
              Target Identity (Name)
            </label>
            <Input
              placeholder="Enter identification..."
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="bg-card border-border"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
              Routing Address (Email)
            </label>
            <Input
              type="email"
              placeholder="Enter transmission route..."
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="bg-card border-border"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
              Payload (Message)
            </label>
            <Textarea
              placeholder="Construct message payload..."
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              className="bg-card border-border min-h-[120px]"
            />
          </div>
          <Button
            type="submit"
            className="bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            <Send className="w-4 h-4 mr-2" />
            Transmit Data
          </Button>
        </form>
      </div>

      {/* Footer */}
      <footer className="mt-16 pt-8 border-t border-border">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 Giancarlos Gonzalez
          </p>
          <div className="flex items-center gap-6">
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
        </div>
      </footer>
    </section>
  )
}
