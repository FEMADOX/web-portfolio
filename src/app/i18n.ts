import type { CvLocale, Lang, SectionId } from '@/app/types'
import { CV_FILES } from '@/components/constants'

export const cvI18n: Record<Lang, CvLocale> = {
  en: {
    controls: 'Controls',
    theme: {
      change: 'Change theme',
      light: 'Switch to light mode',
      dark: 'Switch to dark mode'
    },
    sectionCodes: {
      projects: 'DEPLOYMENTS.02',
      education: 'EDUCATION.03',
      contact: 'CONTACT.04'
    },
    mobileHeader: {
      firstName: 'GIANCARLOS',
      lastName: 'GONZALEZ'
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
        buttonText: 'Download CV',
        downloadNotice: 'Downloading CV...',
        downloadDescription: 'Your download should start shortly.'
      }
    },
    sidebar: {
      jobTitle: 'Full Stack Developer',
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
        buttonText: 'Download CV',
        downloadNotice: 'Downloading CV...',
        downloadDescription: 'Your download should start shortly.'
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
    controls: 'Controles',
    theme: {
      change: 'Cambiar tema',
      light: 'Cambiar a modo claro',
      dark: 'Cambiar a modo oscuro'
    },
    sectionCodes: {
      projects: 'DESPLIEGUES.02',
      education: 'EDUCACIÓN.03',
      contact: 'CONTACTO.04'
    },
    mobileHeader: {
      firstName: 'GIANCARLOS',
      lastName: 'GONZALEZ'
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
        buttonText: 'Descargar CV',
        downloadNotice: 'Descargando CV...',
        downloadDescription: 'La descarga comenzará en breve.'
      }
    },
    sidebar: {
      jobTitle: 'Desarrollador Full Stack',
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
        buttonText: 'Descargar CV',
        downloadNotice: 'Descargando CV...',
        downloadDescription: 'La descarga comenzará en breve.'
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
  },
  pt: {
    controls: 'Controles',
    theme: {
      change: 'Mudar tema',
      light: 'Mudar para o modo claro',
      dark: 'Mudar para o modo escuro'
    },
    sectionCodes: {
      projects: 'PROJETOS.02',
      education: 'FORMAÇÃO.03',
      contact: 'CONTATO.04'
    },
    mobileHeader: { firstName: 'GIANCARLOS', lastName: 'GONZALEZ' },
    navigation: {
      summary: 'Sobre mim',
      skills: 'Habilidades',
      projects: 'Projetos',
      education: 'Formação',
      contact: 'Contato'
    },
    sections: {
      summary: 'Sobre mim',
      skills: 'Habilidades técnicas',
      projects: 'Projetos',
      education: 'Formação',
      contact: 'Contato'
    },
    hero: {
      titleLineOne: 'Desenvolvedor',
      titleLineTwo: 'Full Stack',
      description:
        'Desenvolvedor Full Stack com foco em backend Python (Django/FastAPI) e frontend moderno com TypeScript, React e Next.js. Desenvolvo aplicações web escaláveis e prontas para produção.',
      downloadCv: {
        cvLangUrl: CV_FILES.pt,
        downloadName: 'Giancarlos-Gonzalez-CV-PT.pdf',
        buttonText: 'Baixar currículo',
        downloadNotice: 'Baixando currículo...',
        downloadDescription: 'O download começará em instantes.'
      }
    },
    sidebar: {
      jobTitle: 'Desenvolvedor Full Stack',
      navLabels: {
        summary: 'Sobre mim',
        skills: 'Habilidades técnicas',
        projects: 'Projetos',
        education: 'Formação',
        contact: 'Contato'
      },
      downloadCv: {
        cvLangUrl: CV_FILES.pt,
        downloadName: 'Giancarlos-Gonzalez-CV-PT.pdf',
        buttonText: 'Baixar currículo',
        downloadNotice: 'Baixando currículo...',
        downloadDescription: 'O download começará em instantes.'
      }
    },
    contactForm: {
      title: 'Formulário de contato',
      nameLabel: 'Nome',
      namePlaceholder: 'Digite seu nome...',
      emailLabel: 'E-mail',
      emailPlaceholder: 'Digite seu e-mail...',
      messageLabel: 'Mensagem',
      messagePlaceholder: 'Escreva sua mensagem...',
      submit: 'Enviar mensagem',
      submitting: 'Enviando...',
      toasts: {
        alreadySending: {
          title: 'A mensagem já está sendo enviada.',
          description: 'Aguarde a conclusão do envio atual.'
        },
        invalidEmail: {
          title: 'Endereço de e-mail inválido.',
          description: 'Digite um endereço de e-mail válido.'
        },
        success: {
          title: 'Mensagem enviada com sucesso!',
          description: 'Responderei assim que possível.'
        },
        error: {
          title: 'Não foi possível enviar a mensagem.',
          description:
            'Tente novamente ou entre em contato diretamente por e-mail.'
        }
      }
    },
    footer: { source: 'Código-fonte' }
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
