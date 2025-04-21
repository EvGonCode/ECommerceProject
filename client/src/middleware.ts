import { routing } from '@/shared/config';
import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function middleware(req: NextRequest) {
  const accessToken = req.cookies.get('accessToken');

  const isAuthRoute = req.nextUrl.pathname.includes('/auth');

  if (isAuthRoute && accessToken) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return intlMiddleware(req);
}
export const config = {
  matcher: ['/((?!api|trpc|_next|_vercel|.*\\..*).*)', '/auth'],
};
