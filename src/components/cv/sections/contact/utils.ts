import { Github, Linkedin } from '@boxicons/react'
import { Mail, MessageSquare } from 'lucide-react'
import type { ContactFormData, ContactLink } from './types'

export const contactLinks: readonly ContactLink[] = [
  {
    name: 'Email',
    icon: Mail,
    href: 'mailto:enmadofenyxz@gmail.com'
  },
  {
    name: 'WhatsApp',
    icon: MessageSquare,
    href: 'https://wa.me/+17865781180'
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    href: 'https://linkedin.com/in/giancarlos-gonzalez-leyva'
  },
  {
    name: 'GitHub',
    icon: Github,
    href: 'https://github.com/FEMADOX'
  }
]

export const initialContactFormData: ContactFormData = {
  name: '',
  email: '',
  message: ''
}
