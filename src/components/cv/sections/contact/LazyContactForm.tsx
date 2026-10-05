'use client'

import type { CvLocale } from '@/app/types'
import { createLazyOnVisible } from '../../LazyOnVisible'

interface ContactFormProps {
  contactForm: CvLocale['contactForm']
}

const ContactFormPlaceholder = () => (
  <div
    aria-hidden="true"
    className="min-h-112 animate-pulse border-2 border-border bg-card"
  />
)

export const LazyContactForm = createLazyOnVisible<ContactFormProps>(
  () =>
    import('./ContactForm').then(({ ContactForm }) => ({
      default: ContactForm
    })),
  <ContactFormPlaceholder />,
  'min-h-112'
)
