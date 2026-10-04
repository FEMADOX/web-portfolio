import { NextResponse } from 'next/server'
import type { Lang } from '@/app/types'

const labels: Record<
  Lang,
  { name: string; shortName: string; description: string }
> = {
  en: {
    name: 'Giancarlos Gonzalez | Web Developer',
    shortName: 'GG Portfolio',
    description: 'Full Stack developer portfolio by Giancarlos Gonzalez.'
  },
  es: {
    name: 'Giancarlos Gonzalez | Desarrollador Web',
    shortName: 'Portafolio GG',
    description: 'Portafolio de desarrollo Full Stack de Giancarlos Gonzalez.'
  },
  pt: {
    name: 'Giancarlos Gonzalez | Desenvolvedor Web',
    shortName: 'Portfólio GG',
    description:
      'Portfólio de desenvolvimento Full Stack de Giancarlos Gonzalez.'
  }
}

export async function GET(
  _: Request,
  { params }: { params: Promise<{ lang: string }> }
) {
  const { lang } = await params
  if (lang !== 'en' && lang !== 'es' && lang !== 'pt') {
    return new Response(null, { status: 404 })
  }
  const { name, shortName, description } = labels[lang]
  return NextResponse.json(
    {
      name,
      short_name: shortName,
      description,
      lang: lang === 'pt' ? 'pt-BR' : lang,
      start_url: `/${lang}`,
      display: 'standalone',
      background_color: '#ffffff',
      theme_color: '#000000',
      icons: [
        {
          src: '/favicon-white.svg',
          sizes: 'any',
          type: 'image/svg+xml',
          purpose: 'any maskable'
        }
      ]
    },
    { headers: { 'Content-Type': 'application/manifest+json' } }
  )
}
