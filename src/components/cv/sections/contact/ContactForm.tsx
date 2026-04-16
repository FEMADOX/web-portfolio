import { Send } from 'lucide-react'
import type { SubmitEvent } from 'react'
import { useState } from 'react'
import z from 'zod'
import { sendContactEmail } from '@/actions/sendContactEmail'
import { Button, Input, Textarea } from '@/components/ui'
import { useToast } from '@/hooks/use-toast'
import type { ContactFormData, ContactStatus } from './types'
import { initialContactFormData } from './utils'

export const ContactForm = () => {
  const [formData, setFormData] = useState<ContactFormData>(
    initialContactFormData
  )
  const [status, setStatus] = useState<ContactStatus>('idle')
  const { toast } = useToast()

  const updateField = <T extends keyof ContactFormData>(
    field: T,
    value: ContactFormData[T]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    const rawEmail = formData.email.trim()
    const { error, success } = z.string().email().safeParse(rawEmail)

    if (error && !success) {
      toast({
        title: 'Invalid email address.',
        description: 'Please enter a valid routing address.',
        variant: 'destructive'
      })
      return
    }

    setStatus('sending')

    try {
      await sendContactEmail(formData)
      setStatus('sent')
      setFormData(initialContactFormData)
      toast({
        title: 'Message transmitted successfully!',
        description: 'I will get back to you as soon as possible.'
      })
    } catch {
      setStatus('error')
      toast({
        title: 'Transmission failed.',
        description: 'Please try again or contact me directly via email.',
        variant: 'destructive'
      })
    }
  }

  const isSending = status === 'sending'

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-sm font-black text-foreground uppercase tracking-wider mb-3">
        Contact Form
      </h3>
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
          onChange={(event) => updateField('name', event.target.value)}
          disabled={isSending}
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
          onChange={(event) => updateField('email', event.target.value)}
          disabled={isSending}
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
          onChange={(event) => updateField('message', event.target.value)}
          disabled={isSending}
          className="bg-card border-2 border-border rounded-none min-h-30"
        />
      </div>

      <Button
        type="submit"
        disabled={isSending}
        className={`
          rounded-none border-2 border-border bg-accent text-accent-foreground font-black uppercase tracking-widest
          hover:bg-accent/95
          group/send-button
        `}
      >
        <Send className="w-4 h-4 mr-2 group-hover/send-button:translate[-y-0.5_x-1] transition-transform" />
        {isSending ? 'Transmitting...' : 'Transmit Data'}
      </Button>
    </form>
  )
}
