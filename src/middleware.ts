import { UserRole } from '@prisma/client';
import { withAuth } from 'next-auth/middleware';
import { i18nRouter } from 'next-i18n-router';
import { NextResponse } from 'next/server';
import { StatusCodes } from 'http-status-codes';

import i18nConfig from '../i18nConfig';
import { createRedirectMap } from '../redirects';

import type { NextRequestWithAuth } from 'next-auth/middleware';
import type { NextMiddleware } from 'next/server';

const authMiddleware = withAuth({
  callbacks: {
    authorized: ({ token }) => token?.role === UserRole.Admin,
  },
});

const redirectMap = createRedirectMap();

const middleware: NextMiddleware = async (request, event) => {
  const redirect = redirectMap[request.nextUrl.pathname];
  if (redirect) {
    return NextResponse.redirect(redirect.destination, {
      status: redirect.permanent
        ? StatusCodes.MOVED_PERMANENTLY
        : StatusCodes.MOVED_TEMPORARILY,
    });
  }

  if (request.nextUrl.pathname.startsWith('/handbook')) {
    return NextResponse.next();
  }

  // There are no translations for the playground pages,
  // so the i18n router middleware is not needed there but runs on all other pages.
  // Is there a clean way to run multiple middlewares?
  if (
    request.nextUrl.pathname.startsWith('/playground/admin') &&
    typeof authMiddleware === 'function'
  ) {
    const autMwResponse = await authMiddleware(
      request as NextRequestWithAuth,
      event,
    );

    if (autMwResponse) {
      return autMwResponse as NextResponse;
    }
    return NextResponse.next();
  }

  return i18nRouter(request, i18nConfig);
};

export default middleware;

export const config = {
  matcher: [
    '/((?!api|fonts|_next/static|_next/image|favicon.ico|apple-touch-icon.png|favicon-32x32.png|favicon-16x16.png|robots.txt|handbook).*)',
  ],
};
