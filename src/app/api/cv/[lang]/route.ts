import { type NextRequest, NextResponse } from 'next/server'
import type { CvProps } from './types'

export const cvByLang = {
  en: {
    path: '/cv/giancarlos-gonzalez-cv-en.pdf'
  },
  pt: {
    path: '/cv/giancarlos-gonzalez-cv-pt.pdf'
  },
  es: {
    path: '/cv/giancarlos-gonzalez-cv-es.pdf'
  }
} as const

type CvLanguage = keyof typeof cvByLang

const isCvLanguage = (value: string): value is CvLanguage =>
  Object.hasOwn(cvByLang, value)

export const GET = async (request: NextRequest, { params }: CvProps) => {
  const { lang } = await params

  if (!isCvLanguage(lang)) {
    return NextResponse.json({ error: 'Invalid language' }, { status: 400 })
  }

  return NextResponse.redirect(new URL(cvByLang[lang].path, request.url), 307)
}

export const HEAD = async (_request: NextRequest, { params }: CvProps) => {
  const { lang } = await params

  if (!isCvLanguage(lang)) {
    return NextResponse.json({ error: 'Invalid language' }, { status: 400 })
  }

  return new NextResponse(null, {
    status: 204,
    headers: {
      'Content-Type': 'application/pdf',
      'Cache-Control': 'public, max-age=300'
    }
  })
}
