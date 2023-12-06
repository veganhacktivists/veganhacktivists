import { User, UserRole } from '@prisma/client';
import { Record } from '@prisma/client/runtime/library';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
import { FetchedUser } from 'pages/api/user';

const middleware = async(req: NextRequest) => {
  await checkForFlushRequest(req);
  const { pathname } = req.nextUrl;
  if (pathname.startsWith('/api')) {
    return NextResponse.next();
  }
  if (pathname.startsWith('/playground/admin') && !(await hasPermission('admin', req))) {
    return NextResponse.redirect(new URL('/auth/signin', req.url));
  }
};

interface CacheUser {
  user?: FetchedUser;
  updatedAt: number;
}

let cache: Record<User['id'], CacheUser> = {};

const checkForFlushRequest = async(req: NextRequest) => {
  if (req.headers.get('x-flush-cache') === 'true') {
    cache = {};
  }
};

//The cache has by default a lifetime of 10 minutes, if not flushed before
const cacheLifetime = 1000 * 60 * 10;

const hasPermission = async(permission: string, req: NextRequest) => {
  const token = await getToken({ req, secret: process.env.JWT_SECRET });
  if (!token?.sub) return false;
  let user;
  if (cache[token.sub] && cache[token.sub].updatedAt > Date.now() - cacheLifetime) {
    user = cache[token.sub].user;
  }

  if (!user) {
    user = await fetch(new URL('/api/user', req.url), { headers: { cookie: req.headers.get('cookie') ?? '', 'Content-Type': 'application/json' } }).then(res => res.json()).then(res => res.user);
    cache[token.sub] = { user, updatedAt: Date.now() };
  }
  if (!user) return false; 
  switch (permission) {
    case 'admin':
      return user.role === UserRole.Admin;
  }

};

export default middleware;
