import type { ProjectDetail, ProjectSlug } from './types'

type ProjectSources = Pick<
  ProjectDetail,
  'slug' | 'technologies' | 'links' | 'evidence'
>

const docesSource =
  'https://github.com/FEMADOX/doces/blob/97723d3af6d6c51ddfbbeb9a8b4e75171e7ee8e3'

export const projectSources: Record<ProjectSlug, ProjectSources> = {
  'fastapi-ecosystem-lab': {
    slug: 'fastapi-ecosystem-lab',
    technologies: [
      'Python',
      'FastAPI',
      'SQLAlchemy',
      'PostgreSQL',
      'Redis',
      'Streamlit',
      'Next.js'
    ],
    links: { github: 'https://github.com/FEMADOX/Fastapi-Ecosystem-Lab' },
    evidence: [
      {
        label: 'README · FastAPI Ecosystem Lab',
        url: 'https://github.com/FEMADOX/Fastapi-Ecosystem-Lab/blob/main/README.md'
      },
      {
        label: 'learn_fastapi/README.md',
        url: 'https://github.com/FEMADOX/Fastapi-Ecosystem-Lab/blob/main/learn_fastapi/README.md'
      },
      {
        label: 'items/application/use_cases.py',
        url: 'https://github.com/FEMADOX/Fastapi-Ecosystem-Lab/blob/main/learn_fastapi/src/items/application/use_cases.py'
      },
      {
        label: 'items/presentation/dependencies.py',
        url: 'https://github.com/FEMADOX/Fastapi-Ecosystem-Lab/blob/main/learn_fastapi/src/items/presentation/dependencies.py'
      }
    ]
  },
  'django-ecommerce': {
    slug: 'django-ecommerce',
    technologies: ['Python', 'Django', 'PostgreSQL', 'Stripe', 'JavaScript'],
    links: {
      github: 'https://github.com/FEMADOX/Django-E-commers',
      website: 'https://django-e-commers.vercel.app/'
    },
    evidence: [
      {
        label: 'README · Django E-commerce',
        url: 'https://github.com/FEMADOX/Django-E-commers/blob/main/README.md'
      },
      {
        label: 'cart/cart.py',
        url: 'https://github.com/FEMADOX/Django-E-commers/blob/main/cart/cart.py'
      },
      {
        label: 'payment/views.py',
        url: 'https://github.com/FEMADOX/Django-E-commers/blob/main/payment/views.py'
      },
      {
        label: 'web/models.py',
        url: 'https://github.com/FEMADOX/Django-E-commers/blob/main/web/models.py'
      },
      {
        label: 'order/models.py',
        url: 'https://github.com/FEMADOX/Django-E-commers/blob/main/order/models.py'
      }
    ]
  },
  'dulces-flares': {
    slug: 'dulces-flares',
    technologies: [
      'Next.js',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Zustand',
      'CSS Animations',
      'IntersectionObserver',
      'WebP'
    ],
    links: {
      github: 'https://github.com/FEMADOX/doces',
      website: 'https://doces-flame.vercel.app/'
    },
    evidence: [
      { label: 'README · PURO DOCE', url: `${docesSource}/README.md` },
      {
        label: 'docs/architecture.md',
        url: `${docesSource}/docs/architecture.md`
      },
      { label: 'docs/design.md', url: `${docesSource}/docs/design.md` },
      { label: 'lib/products.ts', url: `${docesSource}/lib/products.ts` },
      { label: 'lib/cart-store.ts', url: `${docesSource}/lib/cart-store.ts` },
      { label: 'lib/order.ts', url: `${docesSource}/lib/order.ts` },
      {
        label: 'components/cart/CartDrawer.tsx',
        url: `${docesSource}/components/cart/CartDrawer.tsx`
      },
      {
        label: 'components/cart/DeferredCartDrawer.tsx',
        url: `${docesSource}/components/cart/DeferredCartDrawer.tsx`
      },
      {
        label: 'components/RevealObserver.tsx',
        url: `${docesSource}/components/RevealObserver.tsx`
      },
      {
        label: 'tests/performance-contract.test.mjs',
        url: `${docesSource}/tests/performance-contract.test.mjs`
      },
      {
        label: 'tests/build-performance.test.mjs',
        url: `${docesSource}/tests/build-performance.test.mjs`
      }
    ]
  },
  'social-bookmarking': {
    slug: 'social-bookmarking',
    technologies: ['Python', 'Django', 'PostgreSQL', 'JavaScript', 'AJAX'],
    links: {
      github: 'https://github.com/FEMADOX/django-social-website',
      website: 'https://django-social-website-hade.onrender.com/'
    },
    evidence: [
      {
        label: 'README · Social Bookmarking',
        url: 'https://github.com/FEMADOX/django-social-website/blob/main/README.md'
      },
      {
        label: 'images/views.py',
        url: 'https://github.com/FEMADOX/django-social-website/blob/main/images/views.py'
      },
      {
        label: 'accounts/views.py',
        url: 'https://github.com/FEMADOX/django-social-website/blob/main/accounts/views.py'
      },
      {
        label: 'action/models.py',
        url: 'https://github.com/FEMADOX/django-social-website/blob/main/action/models.py'
      }
    ]
  }
}
