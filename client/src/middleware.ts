import { routing } from '@/shared/config';
import { jwtDecode } from 'jwt-decode';
import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function middleware(req: NextRequest) {
  const accessToken = req.cookies.get('accessToken');

  const isAuthRoute = req.nextUrl.pathname.includes('/auth');
  const isAdminRoute = req.nextUrl.pathname.includes('/admin');

  if (isAuthRoute && accessToken) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (isAdminRoute) {
    if (!accessToken) {
      return NextResponse.redirect(new URL('/auth', req.url));
    }

    if (
      jwtDecode<{ role: string }>(accessToken.value).role.toUpperCase() !==
      'ADMIN'
    ) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  return intlMiddleware(req);
}
export const config = {
  matcher: ['/((?!api|trpc|_next|_vercel|.*\\..*).*)', '/auth'],
};
