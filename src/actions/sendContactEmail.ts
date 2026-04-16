'use server'

import { Resend } from 'resend'
import type { ContactFormData } from '@/components/cv/sections/contact/types'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendContactEmail(data: ContactFormData): Promise<void> {
  const { name, email, message } = data

  const { error } = await resend.emails.send({
    from: 'Portfolio Contact <onboarding@resend.dev>',
    to: 'enmadofenyxz@gmail.com',
    replyTo: email,
    subject: `[Portfolio] New message from ${name}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="border-bottom: 2px solid #e5e7eb; padding-bottom: 8px;">
          New Contact Form Submission
        </h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Message:</strong></p>
        <blockquote style="border-left: 4px solid #e5e7eb; margin: 0; padding: 8px 16px; color: #374151;">
          ${message.replace(/\n/g, '<br />')}
        </blockquote>
      </div>
    `,
  })

  if (error) {
    throw new Error(error.message)
  }
}
