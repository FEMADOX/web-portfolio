import { get } from '@vercel/blob'
import { type NextRequest, NextResponse } from 'next/server'
import type { Logo, LogoProps } from './types'

export const logoByColor = {
  white: {
    envKey: 'NEXT_PUBLIC_LOGO_WHITE',
    filename: 'Giancarlos_Brand_Logo_White.png'
  },
  black: {
    envKey: 'NEXT_PUBLIC_LOGO_BLACK',
    filename: 'Giancarlos_Brand_Logo_Black.png'
  }
} as const

const isLogo = (value: string): value is Logo => value in logoByColor

const resolveLogoConfig = async (logo: string) => {
  if (!isLogo(logo)) {
    return {
      error: NextResponse.json({ error: 'Invalid logo' }, { status: 400 })
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

  const config = logoByColor[logo]
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

export const GET = async (_request: NextRequest, { params }: LogoProps) => {
  const { color } = await params

  const resolved = await resolveLogoConfig(color)
  if ('error' in resolved) {
    return resolved.error
  }

  const { token, config, blobUrl } = resolved

  try {
    const result = await get(blobUrl, {
      access: 'private',
      token,
      useCache: true
    })

    if (!result || result.statusCode !== 200 || !result.stream) {
      return NextResponse.json({ error: 'CV not found' }, { status: 404 })
    }

    return new NextResponse(result.stream, {
      headers: {
        'Content-Type': result.blob.contentType || 'image/png',
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
