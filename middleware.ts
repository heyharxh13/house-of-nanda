import { NextRequest, NextResponse } from 'next/server'

const PROTECTED = ['/cart', '/checkout', '/account/orders', '/account/addresses']

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value

  const isProtected = PROTECTED.some(path => req.nextUrl.pathname.startsWith(path))

  if (isProtected && !token) {
    const loginUrl = new URL('/account', req.url)
    loginUrl.searchParams.set('redirect', req.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/cart', '/checkout/:path*', '/account/orders/:path*', '/account/addresses/:path*'],
}