'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Suspense } from 'react'
import type { Lang } from '@/app/types'
import { getLanguagePath, isLang } from '@/lib/language'

const messages = {
  en: {
    title: 'Project not found',
    description:
      'This project is unavailable. Explore the other projects in my portfolio.',
    back: 'Back to projects'
  },
  es: {
    title: 'Proyecto no encontrado',
    description:
      'Este proyecto no está disponible. Explora los otros proyectos de mi portafolio.',
    back: 'Volver a los proyectos'
  },
  pt: {
    title: 'Projeto não encontrado',
    description:
      'Este projeto não está disponível. Explore os outros projetos do meu portfólio.',
    back: 'Voltar aos projetos'
  }
}

function ProjectNotFoundContent({ lang }: { lang: Lang }) {
  const message = messages[lang]

  return (
    <main className="mx-auto flex min-h-dvh max-w-3xl flex-col items-start justify-center gap-6 px-6 py-24">
      <p className="font-mono text-sm text-muted-foreground">404</p>
      <h1 className="text-4xl font-semibold tracking-tight">{message.title}</h1>
      <p className="max-w-xl text-muted-foreground">{message.description}</p>
      <Link
        href={`${getLanguagePath(lang)}#projects`}
        className="rounded-md border border-current px-5 py-3 text-sm font-medium transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
      >
        {message.back}
      </Link>
    </main>
  )
}

function LocalizedProjectNotFound() {
  const { lang } = useParams<{ lang: string }>()
  return <ProjectNotFoundContent lang={isLang(lang) ? lang : 'en'} />
}

export default function ProjectNotFound() {
  return (
    <Suspense fallback={<ProjectNotFoundContent lang="en" />}>
      <LocalizedProjectNotFound />
    </Suspense>
  )
}
