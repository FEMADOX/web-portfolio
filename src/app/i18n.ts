import type { Lang } from '@/app/types'
import { CV_FILES } from '@/components/constants'

export type SectionId =
  | 'summary'
  | 'skills'
  | 'projects'
  | 'education'
  | 'contact'

export type CvLocale = {
  mobileHeader: {
    firstName: string
    lastName: string
    role: string
  }
  navigation: Record<SectionId, string>
  sections: {
    summary: string
    skills: string
    projects: string
    education: string
    contact: string
  }
  hero: {
    titleLineOne: string
    titleLineTwo: string
    description: string
    downloadCv: {
      cvLangUrl: string
      downloadName: string
      buttonText: string
    }
  }
  sidebar: {
    jobTitle: string
    navLabels: Record<SectionId, string>
    downloadCv: {
      cvLangUrl: string
      downloadName: string
      buttonText: string
    }
  }
  contactForm: {
    title: string
    nameLabel: string
    namePlaceholder: string
    emailLabel: string
    emailPlaceholder: string
    messageLabel: string
    messagePlaceholder: string
    submit: string
    submitting: string
    toasts: {
      alreadySending: {
        title: string
        description: string
      }
      invalidEmail: {
        title: string
        description: string
      }
      success: {
        title: string
        description: string
      }
      error: {
        title: string
        description: string
      }
    }
  }
}

export const cvI18n: Record<Lang, CvLocale> = {
  en: {
    mobileHeader: {
      firstName: 'GIANCARLOS',
      lastName: 'GONZALEZ',
      role: 'WEB DEVELOPER'
    },
    navigation: {
      summary: 'Summary',
      skills: 'Technical Skills',
      projects: 'Projects',
      education: 'Education',
      contact: 'Contact'
    },
    sections: {
      summary: 'Summary',
      skills: 'Technical Skills',
      projects: 'Projects',
      education: 'Education',
      contact: 'Contact'
    },
    hero: {
      titleLineOne: 'Web',
      titleLineTwo: 'Developer',
      description:
        'Back-end python developer using Django and FastAPI with strong bases in Frontend Dev with TypeScript, React and NextJS focusing on delivering impactful results.',
      downloadCv: {
        cvLangUrl: CV_FILES.en,
        downloadName: 'Giancarlos-Gonzalez-CV-EN.pdf',
        buttonText: 'Download CV'
      }
    },
    sidebar: {
      jobTitle: 'Web Developer',
      navLabels: {
        summary: 'Summary',
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
      nameLabel: 'Target Identity (Name)',
      namePlaceholder: 'Enter identification...',
      emailLabel: 'Routing Address (Email)',
      emailPlaceholder: 'Enter transmission route...',
      messageLabel: 'Payload (Message)',
      messagePlaceholder: 'Construct message payload...',
      submit: 'Send Data',
      submitting: 'Sending...',
      toasts: {
        alreadySending: {
          title: 'Transmission in progress.',
          description: 'Please wait for the current transmission to complete.'
        },
        invalidEmail: {
          title: 'Invalid email address.',
          description: 'Please enter a valid routing address.'
        },
        success: {
          title: 'Message transmitted successfully!',
          description: 'I will get back to you as soon as possible.'
        },
        error: {
          title: 'Transmission failed.',
          description: 'Please try again or contact me directly via email.'
        }
      }
    }
  },
  es: {
    mobileHeader: {
      firstName: 'GIANCARLOS',
      lastName: 'GONZALEZ',
      role: 'DESARROLLADOR WEB'
    },
    navigation: {
      summary: 'Resumen',
      skills: 'Habilidades Tecnicas',
      projects: 'Proyectos',
      education: 'Educacion',
      contact: 'Contacto'
    },
    sections: {
      summary: 'Resumen',
      skills: 'Habilidades Tecnicas',
      projects: 'Proyectos',
      education: 'Educacion',
      contact: 'Contacto'
    },
    hero: {
      titleLineOne: 'Desarrollador',
      titleLineTwo: 'Web',
      description:
        'Desarrollador back-end en Python con Django y FastAPI, con bases solidas en frontend usando TypeScript, React y NextJS, enfocado en entregar resultados de impacto.',
      downloadCv: {
        cvLangUrl: CV_FILES.es,
        downloadName: 'Giancarlos-Gonzalez-CV-ES.pdf',
        buttonText: 'Descargar CV'
      }
    },
    sidebar: {
      jobTitle: 'Desarrollador Web',
      navLabels: {
        summary: 'Resumen',
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
      nameLabel: 'Identidad de destino (Nombre)',
      namePlaceholder: 'Ingresa la identificacion...',
      emailLabel: 'Direccion de enrutamiento (Email)',
      emailPlaceholder: 'Ingresa la ruta de transmision...',
      messageLabel: 'Carga util (Mensaje)',
      messagePlaceholder: 'Construye el mensaje...',
      submit: 'Enviar Datos',
      submitting: 'Enviando...',
      toasts: {
        alreadySending: {
          title: 'Transmision en progreso.',
          description: 'Espera a que termine la transmision actual.'
        },
        invalidEmail: {
          title: 'Correo invalido.',
          description: 'Ingresa una direccion de correo valida.'
        },
        success: {
          title: 'Mensaje transmitido con exito!',
          description: 'Te respondere lo antes posible.'
        },
        error: {
          title: 'Fallo la transmision.',
          description: 'Intenta de nuevo o contactame por email directamente.'
        }
      }
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
