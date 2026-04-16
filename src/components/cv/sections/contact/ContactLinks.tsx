import { ArrowRight } from 'lucide-react'
import { contactLinks } from './utils'

export const ContactLinks = () => (
  <div className="space-y-3 md:my-auto">
    {contactLinks.map((link) => {
      const Icon = link.icon

      return (
        <a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between p-4 bg-card border-2 border-border shadow-sm transition-all group hover:-translate-y-0.5 button-animation-short"
        >
          <div className="flex items-center gap-3">
            <Icon className="w-5 h-5 text-muted-foreground group-hover:text-accent group-hover:color-accent transition-colors" />
            <span className="font-medium text-foreground group-hover:text-accent transition-colors">
              {link.name}
            </span>
          </div>
          <ArrowRight className="w-4 h-4 text-muted-foreground mr-2 group-hover:text-accent group-hover:color-accent group-hover:translate-x-1 transition-all" />
        </a>
      )
    })}
  </div>
)
