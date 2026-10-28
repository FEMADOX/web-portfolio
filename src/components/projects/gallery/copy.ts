import type { Lang } from '@/app/types'
import type ProjectGalleryCopy from './types'

const galleryCopy: Record<Lang, ProjectGalleryCopy> = {
  en: {
    initialCount: '{visible} of {total} projects',
    showMore: 'Show more projects ({count})',
    galleryTitle: 'Project gallery',
    galleryLabel: 'Project room',
    galleryDescription:
      'Every project has a story. Explore the work, then step inside its details.',
    galleryHint: 'Scroll to explore · Swipe or use the arrow keys',
    goToProject: 'Go to project {index}: {title}',
    close: 'Close gallery',
    previous: 'Previous project',
    next: 'Next project',
    projectAnnouncement: 'Project {index} of {total}: {title}'
  },
  es: {
    initialCount: '{visible} de {total} proyectos',
    showMore: 'Ver más proyectos ({count})',
    galleryTitle: 'Galería de proyectos',
    galleryLabel: 'Sala de proyectos',
    galleryDescription:
      'Cada proyecto tiene una historia. Explora el trabajo y descubre sus detalles.',
    galleryHint: 'Rueda para explorar · Desliza o usa las flechas',
    goToProject: 'Ir al proyecto {index}: {title}',
    close: 'Cerrar la galería',
    previous: 'Proyecto anterior',
    next: 'Proyecto siguiente',
    projectAnnouncement: 'Proyecto {index} de {total}: {title}'
  },
  pt: {
    initialCount: '{visible} de {total} projetos',
    showMore: 'Ver mais projetos ({count})',
    galleryTitle: 'Galeria de projetos',
    galleryLabel: 'Sala de projetos',
    galleryDescription:
      'Cada projeto tem uma história. Explore o trabalho e descubra seus detalhes.',
    galleryHint: 'Role para explorar · Deslize ou use as setas',
    goToProject: 'Ir para o projeto {index}: {title}',
    close: 'Fechar a galeria',
    previous: 'Projeto anterior',
    next: 'Próximo projeto',
    projectAnnouncement: 'Projeto {index} de {total}: {title}'
  }
}

export const getProjectGalleryCopy = (lang: Lang): ProjectGalleryCopy =>
  galleryCopy[lang]
