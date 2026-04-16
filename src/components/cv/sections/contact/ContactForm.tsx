import type { SubmitEvent } from 'react'
import { useRef, useState } from 'react'
import { toast } from 'sonner'
import z from 'zod'
import { sendContactEmail } from '@/actions/sendContactEmail'
import {
  Button,
  Input,
  SendIcon,
  type SendIconHandle,
  Textarea
} from '@/components/ui'
import type { ContactFormData, ContactStatus } from './types'
import { initialContactFormData } from './utils'

export const ContactForm = () => {
  const [formData, setFormData] = useState<ContactFormData>(
    initialContactFormData
  )
  const [status, setStatus] = useState<ContactStatus>('idle')
  const sendIconRef = useRef<SendIconHandle>(null)

  const updateField = <T extends keyof ContactFormData>(
    field: T,
    value: ContactFormData[T]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (isSending) {
      toast.warning('Transmission in progress.', {
        description: 'Please wait for the current transmission to complete.'
      })
      return
    }

    const rawEmail = formData.email.trim()
    const { error, success } = z.email().safeParse(rawEmail)

    if (error && !success) {
      toast.error('Invalid email address.', {
        description: 'Please enter a valid routing address.'
      })
      return
    }

    setStatus('sending')
    sendIconRef.current?.startAnimation()

    try {
      await sendContactEmail(formData)
      setStatus('sent')
      setFormData(initialContactFormData)
      toast.success('Message transmitted successfully!', {
        description: 'I will get back to you as soon as possible.'
      })
    } catch {
      setStatus('error')
      toast.error('Transmission failed.', {
        description: 'Please try again or contact me directly via email.'
      })
    } finally {
      sendIconRef.current?.stopAnimation()
    }
  }

  const isSending = status === 'sending'

  return (
    <form onSubmit={handleSubmit} className="space-y-4 md:order-first">
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
          required
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
          required
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
          required
        />
      </div>

      <Button
        type="submit"
        onMouseEnter={() => sendIconRef.current?.startAnimation()}
        className={`
          rounded-none border-2 border-border bg-accent text-accent-foreground font-black uppercase tracking-widest
          hover:bg-accent/95
        `}
      >
        <SendIcon className="w-4 h-4 mr-2" ref={sendIconRef} />
        {isSending ? 'Transmitting...' : 'Transmit Data'}
      </Button>
    </form>
  )
}
