import type { ComponentType } from 'react'

export interface ContactLink {
  name: string
  href: string
  icon: ComponentType<{ className?: string }>
}

export interface ContactFormData {
  name: string
  email: string
  message: string
}

export type ContactStatus = 'idle' | 'sending' | 'sent' | 'error'
