export const projectAccents = [
  {
    key: 'main',
    badge: 'bg-accent text-accent-foreground',
    line: 'bg-accent',
    hoverText: 'hover:text-accent'
  },
  {
    key: 'secondary',
    badge: 'bg-secondary text-white',
    line: 'bg-secondary',
    hoverText: 'hover:text-secondary'
  },
  {
    key: 'third',
    badge: 'bg-blue-700 text-white',
    line: 'bg-blue-700',
    hoverText: 'hover:text-blue-700'
  }
] as const

export const projects = [
  {
    title: 'Full Stack - FastAPI Ecosystem Lab',
    period: 'Mar 2026 - Present',
    description:
      'Advanced implementation of high-performance microservices architecture using FastAPI and asynchronous processing. Implementing clean architecture, Pydantic for advance validation and full type annotation on the entire project, SQLAlchemy as ORM with Alembic as migrations manager, Pytest as testing framework, using Postgres DB, Docker for the API deploying and a integration with the NextJS framework.',
    technologies: ['FastAPI', 'NextJS', 'Docker', 'PostgreSQL'],
    links: {
      github: 'https://github.com/FEMADOX/Fastapi-Ecosystem-Lab'
    }
  },
  {
    title: 'Full Stack - Django E-commers Project',
    period: 'Jan 2025 - Jan 2026',
    description:
      'Robust e-commerce platform featuring complex inventory management, payment gateway integration with Stripe, and customer dashboards. E-commerce created with Django. Cart, orders management and payments in Stripe included. With Django as a python web framework, user authentication, shopping cart logic, order validator, Stripe for payments and test using the Pytest framework.',
    technologies: ['Django', 'Stripe', 'Python', 'PostgreSQL'],
    links: {
      github: 'https://github.com/FEMADOX/Django-E-commers',
      website: 'https://django-e-commers.vercel.app/'
    }
  },
  {
    title: 'Full Stack - Django Social Website',
    period: 'Oct 2024 - Aug 2025',
    description:
      'Social networking application with real-time updates, user profiles, and media sharing capabilities. Social website clone with Django. Like, follow and user authentications implementation. Django used as the main technology to craft this social website clone where users can upload from internet images to the website using bookmarks, user basic authentication and OAuth2 with Google and X.',
    technologies: ['Django', 'Python', 'PostgreSQL'],
    links: {
      github: 'https://github.com/FEMADOX/django-social-website',
      website: 'https://django-social-website-hade.onrender.com/'
    }
  }
]
