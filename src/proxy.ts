import { type NextRequest, NextResponse } from 'next/server'

export function proxy(request: NextRequest) {
  const lang = request.nextUrl.pathname.split('/')[1]
  const headers = new Headers(request.headers)
  headers.set('x-portfolio-lang', lang)
  return NextResponse.next({ request: { headers } })
}

export const config = { matcher: ['/:lang(en|es|pt)'] }
