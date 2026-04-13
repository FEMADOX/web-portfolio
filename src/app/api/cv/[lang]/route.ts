import { get, head } from '@vercel/blob'
import { type NextRequest, NextResponse } from 'next/server'

const cvByLang = {
  en: {
    envKey: 'NEXT_PUBLIC_CV_EN',
    filename: 'Giancarlos-Gonzalez-CV-EN.pdf'
  },
  es: {
    envKey: 'NEXT_PUBLIC_CV_ES',
    filename: 'Giancarlos-Gonzalez-CV-ES.pdf'
  }
} as const

type Lang = keyof typeof cvByLang
interface CvProps {
  params: Promise<{ lang: Lang }>
}

const isLang = (value: string): value is Lang => value in cvByLang

const resolveCvConfig = async (lang: string) => {
  if (!isLang(lang)) {
    return {
      error: NextResponse.json({ error: 'Invalid language' }, { status: 400 })
    }
  }

  const token = process.env.BLOB_READ_WRITE_TOKEN
  if (!token) {
    return {
      error: NextResponse.json(
        { error: 'Missing BLOB_READ_WRITE_TOKEN' },
        { status: 500 }
      )
    }
  }

  const config = cvByLang[lang]
  const blobUrl = process.env[config.envKey]
  if (!blobUrl) {
    return {
      error: NextResponse.json(
        { error: `Missing ${config.envKey} environment variable` },
        { status: 500 }
      )
    }
  }

  return { token, config, blobUrl }
}

export const GET = async (_request: NextRequest, { params }: CvProps) => {
  const { lang } = await params

  const resolved = await resolveCvConfig(lang)
  if ('error' in resolved) {
    return resolved.error
  }

  const { token, config, blobUrl } = resolved

  try {
    const result = await get(blobUrl, {
      access: 'private',
      token,
      useCache: false
    })

    if (!result || result.statusCode !== 200 || !result.stream) {
      return NextResponse.json({ error: 'CV not found' }, { status: 404 })
    }

    return new NextResponse(result.stream, {
      headers: {
        'Content-Type': result.blob.contentType || 'application/pdf',
        'Content-Disposition': `attachment; filename="${config.filename}"`,
        'Cache-Control': 'private, max-age=300'
      }
    })
  } catch {
    return NextResponse.json(
      { error: 'Could not fetch CV from Blob storage' },
      { status: 500 }
    )
  }
}

export const HEAD = async (_request: NextRequest, { params }: CvProps) => {
  const { lang } = await params
  const resolved = await resolveCvConfig(lang)

  if ('error' in resolved) {
    return resolved.error
  }

  const { token, blobUrl } = resolved

  try {
    const metadata = await head(blobUrl, { token })

    return new NextResponse(null, {
      status: 204,
      headers: {
        'Content-Type': metadata.contentType || 'application/pdf',
        'Cache-Control': 'private, max-age=300'
      }
    })
  } catch {
    return NextResponse.json(
      { error: 'Could not warm up CV download' },
      { status: 500 }
    )
  }
}
