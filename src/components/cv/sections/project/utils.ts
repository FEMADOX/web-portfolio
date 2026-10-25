import type { Lang } from '@/app/types'
import type { ProjectProps } from './types'

export const projectsByLang: Record<Lang, readonly ProjectProps[]> = {
  en: [
    {
      slug: 'dulces-flares',
      title: 'Dulces-Flares · PURO DOCE',
      period: '2026',
      description:
        'A confectionery storefront combining an expressive visual identity with a typed catalog, a persistent cart and order preparation for WhatsApp. Server Components, deferred client features and resource budgets support the browsing experience.',
      technologies: ['Next.js', 'React', 'TypeScript', 'Zustand'],
      links: {
        github: 'https://github.com/FEMADOX/doces',
        website: 'https://doces-flame.vercel.app/'
      }
    },
    {
      slug: 'fastapi-ecosystem-lab',
      title: 'FastAPI Ecosystem Lab',
      period: 'Mar 2026 - Present',
      description:
        'A learning lab for a feature-oriented backend: versioned API, ownership-aware workflows and infrastructure behind ports. Built with FastAPI, SQLAlchemy and Redis, with a Streamlit client and a Next.js frontend in progress.',
      technologies: ['FastAPI', 'SQLAlchemy', 'Redis', 'PostgreSQL'],
      links: {
        github: 'https://github.com/FEMADOX/Fastapi-Ecosystem-Lab'
      }
    },
    {
      slug: 'django-ecommerce',
      title: 'Django E-commerce',
      period: 'Jan 2025 - Jan 2026',
      description:
        'An educational shopping flow connecting a product catalog, session cart, authenticated orders and Stripe Checkout. Explore the modular Django architecture and the decisions behind each step.',
      technologies: ['Django', 'Python', 'PostgreSQL', 'Stripe'],
      links: {
        github: 'https://github.com/FEMADOX/Django-E-commers',
        website: 'https://django-e-commers.vercel.app/'
      }
    },
    {
      slug: 'social-bookmarking',
      title: 'Social Bookmarking',
      period: 'Oct 2024 - Aug 2025',
      description:
        'A Django application for saving images and discovering content through profiles, likes, follows and an activity feed. AJAX interactions connect the interface to server-rendered views.',
      technologies: ['Django', 'Python', 'PostgreSQL'],
      links: {
        github: 'https://github.com/FEMADOX/django-social-website',
        website: 'https://django-social-website-hade.onrender.com/'
      }
    }
  ],
  es: [
    {
      slug: 'dulces-flares',
      title: 'Dulces-Flares · PURO DOCE',
      period: '2026',
      description:
        'Web de confitería que combina identidad visual, catálogo tipado, carrito persistente y preparación de pedidos por WhatsApp. Server Components, funciones cliente diferidas y presupuestos de recursos sostienen la experiencia de navegación.',
      technologies: ['Next.js', 'React', 'TypeScript', 'Zustand'],
      links: {
        github: 'https://github.com/FEMADOX/doces',
        website: 'https://doces-flame.vercel.app/'
      }
    },
    {
      slug: 'fastapi-ecosystem-lab',
      title: 'Laboratorio FastAPI',
      period: 'Mar 2026 - Actualidad',
      description:
        'Laboratorio de aprendizaje para un backend por funcionalidades: API versionada, permisos por propietario e infraestructura detrás de puertos. FastAPI, SQLAlchemy y Redis, con un cliente Streamlit y un frontend Next.js en desarrollo.',
      technologies: ['FastAPI', 'SQLAlchemy', 'Redis', 'PostgreSQL'],
      links: {
        github: 'https://github.com/FEMADOX/Fastapi-Ecosystem-Lab'
      }
    },
    {
      slug: 'django-ecommerce',
      title: 'E-commerce con Django',
      period: 'Ene 2025 - Ene 2026',
      description:
        'Flujo de compra educativo que conecta un catálogo de productos, carrito de sesión, pedidos autenticados y Stripe Checkout. Explora la arquitectura modular de Django y las decisiones detrás de cada paso.',
      technologies: ['Django', 'Python', 'PostgreSQL', 'Stripe'],
      links: {
        github: 'https://github.com/FEMADOX/Django-E-commers',
        website: 'https://django-e-commers.vercel.app/'
      }
    },
    {
      slug: 'social-bookmarking',
      title: 'Plataforma social de marcadores',
      period: 'Oct 2024 - Ago 2025',
      description:
        'Aplicación Django para guardar imágenes y descubrir contenido mediante perfiles, likes, seguidores y un feed de actividad. Las interacciones AJAX conectan la interfaz con vistas renderizadas en el servidor.',
      technologies: ['Django', 'Python', 'PostgreSQL'],
      links: {
        github: 'https://github.com/FEMADOX/django-social-website',
        website: 'https://django-social-website-hade.onrender.com/'
      }
    }
  ],
  pt: [
    {
      slug: 'dulces-flares',
      title: 'Dulces-Flares · PURO DOCE',
      period: '2026',
      description:
        'Site de confeitaria que combina identidade visual, catálogo tipado, carrinho persistente e preparação de pedidos pelo WhatsApp. Server Components, recursos cliente sob demanda e orçamentos de recursos sustentam a navegação.',
      technologies: ['Next.js', 'React', 'TypeScript', 'Zustand'],
      links: {
        github: 'https://github.com/FEMADOX/doces',
        website: 'https://doces-flame.vercel.app/'
      }
    },
    {
      slug: 'fastapi-ecosystem-lab',
      title: 'Laboratório FastAPI',
      period: 'Mar 2026 - Atualmente',
      description:
        'Laboratório de aprendizado para um backend por funcionalidades: API versionada, permissões por proprietário e infraestrutura atrás de portas. FastAPI, SQLAlchemy e Redis, com cliente Streamlit e frontend Next.js em desenvolvimento.',
      technologies: ['FastAPI', 'SQLAlchemy', 'Redis', 'PostgreSQL'],
      links: {
        github: 'https://github.com/FEMADOX/Fastapi-Ecosystem-Lab'
      }
    },
    {
      slug: 'django-ecommerce',
      title: 'E-commerce com Django',
      period: 'Jan 2025 - Jan 2026',
      description:
        'Fluxo de compra educacional que conecta catálogo, carrinho de sessão, pedidos autenticados e Stripe Checkout. Explore a arquitetura modular do Django e as decisões por trás de cada etapa.',
      technologies: ['Django', 'Python', 'PostgreSQL', 'Stripe'],
      links: {
        github: 'https://github.com/FEMADOX/Django-E-commers',
        website: 'https://django-e-commers.vercel.app/'
      }
    },
    {
      slug: 'social-bookmarking',
      title: 'Plataforma social de favoritos',
      period: 'Out 2024 - Ago 2025',
      description:
        'Aplicação Django para salvar imagens e descobrir conteúdo por meio de perfis, curtidas, seguidores e um feed de atividades. Interações AJAX conectam a interface às views renderizadas no servidor.',
      technologies: ['Django', 'Python', 'PostgreSQL'],
      links: {
        github: 'https://github.com/FEMADOX/django-social-website',
        website: 'https://django-social-website-hade.onrender.com/'
      }
    }
  ]
}

export const getProjects = (lang: Lang) => projectsByLang[lang]
