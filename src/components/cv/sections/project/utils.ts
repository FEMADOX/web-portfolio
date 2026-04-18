import type { Lang } from '@/app/types'
import type { ProjectProps } from './types'

export const projectAccents = [
  {
    key: 'main',
    badge: 'bg-accent text-accent-foreground',
    line: 'bg-accent',
    hoverText: 'hover:text-accent',
    hoverLine: 'hover:bg-accent'
  },
  {
    key: 'secondary',
    badge: 'bg-destructive text-white',
    line: 'bg-destructive',
    hoverText: 'hover:text-destructive-foreground',
    hoverLine: 'hover:bg-destructive'
  },
  {
    key: 'third',
    badge: 'bg-blue-700 text-white',
    line: 'bg-blue-700',
    hoverText: 'hover:text-blue-700',
    hoverLine: 'hover:bg-blue-700'
  }
] as const

export const projectsByLang: Record<Lang, readonly ProjectProps[]> = {
  en: [
    {
      title: 'Full Stack - FastAPI Ecosystem Lab',
      period: 'Mar 2026 - Present',
      description:
        'Advanced implementation of a high-performance microservices architecture using FastAPI and asynchronous processing. The project applies clean architecture, advanced validation with Pydantic, full type annotations, SQLAlchemy as ORM, Alembic for migrations, Pytest for testing, PostgreSQL as the database, Docker for deployment, and an integration layer with NextJS.',
      technologies: ['FastAPI', 'NextJS', 'Docker', 'PostgreSQL'],
      links: {
        github: 'https://github.com/FEMADOX/Fastapi-Ecosystem-Lab'
      }
    },
    {
      title: 'Full Stack - Django E-commerce Project',
      period: 'Jan 2025 - Jan 2026',
      description:
        'Robust e-commerce platform featuring inventory management, Stripe payment integration, and customer dashboards. Built with Django, it includes shopping cart flows, order management, authentication, payment processing, and test coverage with Pytest.',
      technologies: ['Django', 'Python', 'PostgreSQL', 'Stripe'],
      links: {
        github: 'https://github.com/FEMADOX/Django-E-commers',
        website: 'https://django-e-commers.vercel.app/'
      }
    },
    {
      title: 'Full Stack - Django Social Website',
      period: 'Oct 2024 - Aug 2025',
      description:
        'Social networking application with real-time updates, user profiles, and media sharing. Built with Django, it includes likes, follows, authentication, bookmark-based image publishing, and OAuth2 sign-in with Google and X.',
      technologies: ['Django', 'Python', 'PostgreSQL'],
      links: {
        github: 'https://github.com/FEMADOX/django-social-website',
        website: 'https://django-social-website-hade.onrender.com/'
      }
    }
  ],
  es: [
    {
      title: 'Full Stack - Laboratorio del Ecosistema FastAPI',
      period: 'Mar 2026 - Actualidad',
      description:
        'Implementacion avanzada de una arquitectura de microservicios de alto rendimiento usando FastAPI y procesamiento asincrono. El proyecto aplica clean architecture, validacion avanzada con Pydantic, anotaciones de tipos completas, SQLAlchemy como ORM, Alembic para migraciones, Pytest para pruebas, PostgreSQL como base de datos, Docker para despliegue y una capa de integracion con NextJS.',
      technologies: ['FastAPI', 'NextJS', 'Docker', 'PostgreSQL'],
      links: {
        github: 'https://github.com/FEMADOX/Fastapi-Ecosystem-Lab'
      }
    },
    {
      title: 'Full Stack - Proyecto E-commerce con Django',
      period: 'Ene 2025 - Ene 2026',
      description:
        'Plataforma de comercio electronico robusta con gestion de inventario, integracion de pagos con Stripe y paneles para clientes. Construida con Django, incluye flujo de carrito, gestion de ordenes, autenticacion, procesamiento de pagos y cobertura de pruebas con Pytest.',
      technologies: ['Django', 'Python', 'PostgreSQL', 'Stripe'],
      links: {
        github: 'https://github.com/FEMADOX/Django-E-commers',
        website: 'https://django-e-commers.vercel.app/'
      }
    },
    {
      title: 'Full Stack - Red Social con Django',
      period: 'Oct 2024 - Ago 2025',
      description:
        'Aplicacion de red social con actualizaciones en tiempo real, perfiles de usuario y comparticion de contenido multimedia. Construida con Django, incluye likes, follows, autenticacion, publicacion de imagenes mediante bookmarks e inicio de sesion con OAuth2 usando Google y X.',
      technologies: ['Django', 'Python', 'PostgreSQL'],
      links: {
        github: 'https://github.com/FEMADOX/django-social-website',
        website: 'https://django-social-website-hade.onrender.com/'
      }
    }
  ]
}

export const getProjects = (lang: Lang) => projectsByLang[lang]
