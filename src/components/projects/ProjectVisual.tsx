import { ViewTransition } from 'react'
import type {} from 'react/canary'
import { PROJECT_SLUGS, type ProjectSlug } from '@/data/projects/types'

const visuals = {
  'fastapi-ecosystem-lab': {
    name: 'FASTAPI',
    tag: 'FEATURE-ORIENTED BACKEND',
    nodes: ['CLIENT', 'API / V1', 'USE CASE', 'PORTS'],
    footer: 'PYTHON / SQLALCHEMY / REDIS'
  },
  'django-ecommerce': {
    name: 'COMMERCE',
    tag: 'FROM DISCOVERY TO CHECKOUT',
    nodes: ['CATALOG', 'CART', 'ORDER', 'STRIPE'],
    footer: 'DJANGO / SESSIONS / CHECKOUT'
  },
  'social-bookmarking': {
    name: 'BOOKMARKS',
    tag: 'SAVE. CONNECT. DISCOVER.',
    nodes: ['PROFILE', 'IMAGES', 'SOCIAL', 'FEED'],
    footer: 'DJANGO / AJAX / RELATIONSHIPS'
  },
  'dulces-flares': {
    name: 'PURO DOCE',
    tag: 'FROM SWEET DISCOVERY TO WHATSAPP',
    nodes: ['CATALOG', 'CART', 'PERSIST', 'WHATSAPP'],
    footer: 'NEXT.JS / ZUSTAND / CSS'
  }
} satisfies Record<ProjectSlug, object>

/** An original schematic, never presented as a screenshot of the application. */
export function ProjectVisual({ slug }: { slug: ProjectSlug }) {
  const visual = visuals[slug]
  const code = String(PROJECT_SLUGS.indexOf(slug) + 1).padStart(2, '0')
  return (
    <ViewTransition
      name={`project-visual-${slug}`}
      share="project-morph"
      default="none"
    >
      <div className="project-visual" data-project={slug} aria-hidden="true">
        <div className="project-visual-top">
          <span>BUILD / {code}</span>
          <span className="project-visual-indicator" />
        </div>
        <div className="project-visual-name">
          {visual.name}
          <span>{visual.tag}</span>
        </div>
        <div className="project-visual-flow">
          {visual.nodes.map((node, index) => (
            <div key={node} className="project-visual-node">
              <span>0{index + 1}</span>
              <strong>{node}</strong>
            </div>
          ))}
        </div>
        <div className="project-visual-bottom">
          <span>{visual.footer}</span>
          <span className="project-visual-direction">↗</span>
        </div>
        <span className="project-visual-watermark">{code}</span>
      </div>
    </ViewTransition>
  )
}
