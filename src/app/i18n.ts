import type { CvLocale, Lang, SectionId } from '@/app/types'
import { CV_FILES } from '@/components/constants'

export const cvI18n: Record<Lang, CvLocale> = {
  en: {
    mobileHeader: {
      firstName: 'GIANCARLOS',
      lastName: 'GONZALEZ',
      role: 'FULL STACK DEVELOPER'
    },
    navigation: {
      summary: 'About Me',
      skills: 'Technical Skills',
      projects: 'Projects',
      education: 'Education',
      contact: 'Contact'
    },
    sections: {
      summary: 'About Me',
      skills: 'Technical Skills',
      projects: 'Projects',
      education: 'Education',
      contact: 'Contact'
    },
    hero: {
      titleLineOne: 'Full Stack',
      titleLineTwo: 'Developer',
      description:
        'Full-Stack Developer focused on Python backend (Django/FastAPI) and modern frontend with TypeScript, React, and Next.js. I build scalable, production-ready web applications.',
      downloadCv: {
        cvLangUrl: CV_FILES.en,
        downloadName: 'Giancarlos-Gonzalez-CV-EN.pdf',
        buttonText: 'Download CV'
      }
    },
    sidebar: {
      jobTitle: 'Full Stack Dev.',
      navLabels: {
        summary: 'About Me',
        skills: 'Technical Skills',
        projects: 'Projects',
        education: 'Education',
        contact: 'Contact'
      },
      downloadCv: {
        cvLangUrl: CV_FILES.en,
        downloadName: 'Giancarlos-Gonzalez-CV-EN.pdf',
        buttonText: 'Download CV'
      }
    },
    contactForm: {
      title: 'Contact Form',
      nameLabel: 'Name',
      namePlaceholder: 'Enter your name...',
      emailLabel: 'Email',
      emailPlaceholder: 'Enter your email...',
      messageLabel: 'Message',
      messagePlaceholder: 'Write your message...',
      submit: 'Send Message',
      submitting: 'Sending...',
      toasts: {
        alreadySending: {
          title: 'Message is already being sent.',
          description: 'Please wait until the current request finishes.'
        },
        invalidEmail: {
          title: 'Invalid email address.',
          description: 'Please enter a valid email address.'
        },
        success: {
          title: 'Message sent successfully!',
          description: 'I will get back to you as soon as possible.'
        },
        error: {
          title: 'Failed to send message.',
          description: 'Please try again or contact me directly via email.'
        }
      }
    },
    footer: {
      source: 'Source'
    }
  },
  es: {
    mobileHeader: {
      firstName: 'GIANCARLOS',
      lastName: 'GONZALEZ',
      role: 'DESARROLLADOR FULL STACK'
    },
    navigation: {
      summary: 'Sobre Mi',
      skills: 'Habilidades Tecnicas',
      projects: 'Proyectos',
      education: 'Educacion',
      contact: 'Contacto'
    },
    sections: {
      summary: 'Sobre Mi',
      skills: 'Habilidades Tecnicas',
      projects: 'Proyectos',
      education: 'Educacion',
      contact: 'Contacto'
    },
    hero: {
      titleLineOne: 'Desarrollador',
      titleLineTwo: 'Full Stack',
      description:
        'Desarrollador Full Stack enfocado en backend con Python (Django/FastAPI) y frontend moderno con TypeScript, React y Next.js. Construyo aplicaciones web escalables listas para produccion.',
      downloadCv: {
        cvLangUrl: CV_FILES.es,
        downloadName: 'Giancarlos-Gonzalez-CV-ES.pdf',
        buttonText: 'Descargar CV'
      }
    },
    sidebar: {
      jobTitle: 'Dev. Full Stack',
      navLabels: {
        summary: 'Sobre Mi',
        skills: 'Habilidades Tecnicas',
        projects: 'Proyectos',
        education: 'Educacion',
        contact: 'Contacto'
      },
      downloadCv: {
        cvLangUrl: CV_FILES.es,
        downloadName: 'Giancarlos-Gonzalez-CV-ES.pdf',
        buttonText: 'Descargar CV'
      }
    },
    contactForm: {
      title: 'Formulario de Contacto',
      nameLabel: 'Nombre',
      namePlaceholder: 'Ingresa tu nombre...',
      emailLabel: 'Correo Electronico',
      emailPlaceholder: 'Ingresa tu correo...',
      messageLabel: 'Mensaje',
      messagePlaceholder: 'Escribe tu mensaje...',
      submit: 'Enviar Mensaje',
      submitting: 'Enviando...',
      toasts: {
        alreadySending: {
          title: 'Ya se esta enviando un mensaje.',
          description: 'Espera a que finalice la solicitud actual.'
        },
        invalidEmail: {
          title: 'Correo electronico invalido.',
          description: 'Ingresa una direccion de correo valida.'
        },
        success: {
          title: 'Mensaje enviado con exito!',
          description: 'Te respondere lo mas pronto posible.'
        },
        error: {
          title: 'No se pudo enviar el mensaje.',
          description: 'Intenta de nuevo o contactame por correo directamente.'
        }
      }
    },
    footer: {
      source: 'Fuente'
    }
  }
}

export const sectionIds: SectionId[] = [
  'summary',
  'skills',
  'projects',
  'education',
  'contact'
] as const

export const getCvLocale = (lang: Lang) => cvI18n[lang]
