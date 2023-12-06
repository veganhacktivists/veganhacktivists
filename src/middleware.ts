import { UserRole } from '@prisma/client';
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

import type { User } from '@prisma/client';
import type { Record } from '@prisma/client/runtime/library';
import type { NextRequest } from 'next/server';
import type { FetchedUser } from 'pages/api/user';

/*
 *  Here are the routes defined that are checked in the middleware for the right user permissions.
 *  All routes on the same level are seen as equal, so if you have a child-route and a parent-route in the same level, then
 *  based on the order of the routes, they will be checked top to bottom.
 *
 *  If there is a child route defined and it applies for the current path, the parents will be ignored.
 *
 *  Example:  /playground/ <-- redirect to signin if not logged in
 *                /playground/account   ... <-- redirect to details page if not filled out
 *
 *  This will only check if the details page is filled out, but not if the user is logged in.
 *
 *            /playground/ <-- redirect to signin if not logged in
 *            /playground/account   ... <-- redirect to signin if not logged in
 *
 *  This will check if the user is logged in and if the details page is filled out.
 *
 */
const routes: MiddlewareRoute[] = [
  {
    path: '/playground/admin',
    check: 'admin',
    redirect: '/playground/signin',
  },
  {
    path: '/playground',
    check: 'initialised',
    redirect: '/playground/signup',
  },
];

const checkRoutes = async (
  req: NextRequest,
  path: string,
  routes: MiddlewareRoute[]
): Promise<NextResponse | null> => {
  for (const route of routes) {
    if (path.startsWith(route.path) && path !== route.redirect) {
      if (route.children) {
        const response = checkRoutes(req, path, route.children);
        if (response !== null) return response;
      }
      if (Array.isArray(route.check)) {
        for (const check of route.check) {
          if (!(await hasPermission(check, req))) {
            return NextResponse.redirect(new URL(route.redirect, req.url));
          }
        }
      } else {
        if (!(await hasPermission(route.check, req))) {
          return NextResponse.redirect(new URL(route.redirect, req.url));
        }
      }
    }
  }
  return null;
};

const middleware = async (req: NextRequest) => {
  checkForFlushRequest(req);
  const { pathname } = req.nextUrl;
  if (pathname.startsWith('/api')) {
    return NextResponse.next();
  }
  const redirect = await checkRoutes(req, pathname, routes);
  if (redirect !== null) return redirect;
};

interface MiddlewareRoute {
  path: string;
  redirect: string;
  check: string | string[];
  children?: MiddlewareRoute[];
}

interface CacheUser {
  user?: FetchedUser;
  updatedAt: number;
}

let cache: Record<User['id'], CacheUser> = {};

const checkForFlushRequest = (req: NextRequest) => {
  if (req.headers.get('x-flush-cache') === 'true') {
    cache = {};
  }
};

//The cache has by default a lifetime of 10 minutes, if not flushed before
const cacheLifetime = 1000 * 60 * 10;

const hasPermission = async (permission: string, req: NextRequest) => {
  const token = await getToken({ req, secret: process.env.JWT_SECRET });
  if (!token?.sub) return false;
  let user;
  if (
    cache[token.sub] &&
    cache[token.sub].updatedAt > Date.now() - cacheLifetime
  ) {
    user = cache[token.sub].user;
  }

  if (!user) {
    user = await fetch(new URL('/api/user', req.url), {
      headers: {
        cookie: req.headers.get('cookie') ?? '',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json() as Promise<{ user: FetchedUser }>)
      .then((res) => res.user);
    cache[token.sub] = { user, updatedAt: Date.now() };
  }
  if (!user) return false;
  switch (permission) {
    case 'admin':
      return user.role === UserRole.Admin;
    case 'initialised':
      return !(
        (user.role === UserRole.Requestor && !user.requestorInformation) ||
        (user.role === UserRole.User && !user.applicantInformation)
      );
  }
};

export default middleware;
