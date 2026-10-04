import { Github, Linkedin } from '@boxicons/react'
import { Mail, MessageSquare } from 'lucide-react'
import type { ContactFormData, ContactLink } from './types'

export const contactLinks: readonly ContactLink[] = [
  {
    name: 'Email',
    icon: Mail,
    href: 'mailto:leyvagiancarlosgonzalez@gmail.com'
  },
  {
    name: 'WhatsApp',
    icon: MessageSquare,
    href: 'https://wa.me/5541987329409'
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
