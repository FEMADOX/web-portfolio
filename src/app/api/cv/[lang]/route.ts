import { type NextRequest, NextResponse } from 'next/server'
import { CV_FILES, isLang } from '@/lib/language'
import type { CvProps } from './types'

export const GET = async (request: NextRequest, { params }: CvProps) => {
  const { lang } = await params

  if (!isLang(lang)) {
    return NextResponse.json({ error: 'Invalid language' }, { status: 400 })
  }

  return NextResponse.redirect(new URL(CV_FILES[lang], request.url), 307)
}

export const HEAD = async (_request: NextRequest, { params }: CvProps) => {
  const { lang } = await params

  if (!isLang(lang)) {
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
