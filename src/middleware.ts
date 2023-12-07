import { UserRole } from '@prisma/client';
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

import type { NextRequestWithAuth } from 'next-auth/middleware';
import type { NextMiddleware } from 'next/server';

const authMiddleware = withAuth({
  callbacks: {
    authorized: ({ token }) => token?.role === UserRole.Admin,
  },
});

const middleware: NextMiddleware = async (request, event) => {
  let res: NextResponse;

  if (
    request.nextUrl.pathname.startsWith('/playground/admin') &&
    typeof authMiddleware === 'function'
  ) {
    const autMwResponse = await authMiddleware(
      request as NextRequestWithAuth,
      event
    );

    if (autMwResponse) {
      res = autMwResponse as NextResponse;
    }
  }

  res ??= NextResponse.next();

  const locale = request.nextUrl.locale ?? request.nextUrl.defaultLocale;
  if (request.cookies.get('NEXT_LOCALE')?.value !== locale) {
    res.cookies.set('NEXT_LOCALE', locale, {
      secure: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 360, // 1 year
    });
  }

  return res;
};

export default middleware;

export const config = {
  matcher: ['/((?!api|fonts|_next/static|_next/image|favicon.ico).*)'],
};
