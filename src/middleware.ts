import { UserRole } from '@prisma/client';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

const middleware = async(req: NextRequest) => {
  const { pathname } = req.nextUrl;
  const token = await getToken({ req, secret: process.env.JWT_SECRET });
  if (pathname.startsWith('/api')) {
    return NextResponse.next();
  }
  const user = await fetch(new URL('/api/user', req.url), { headers: { cookie: req.headers.get('cookie') ?? '', 'Content-Type': 'application/json' } }).then(res => res.json()).then(res => res.user);
  if (pathname.startsWith('/playground/admin') && user?.role !== UserRole.Admin) {
    return NextResponse.redirect(new URL('/auth/signin', req.url));
  }
};

export default middleware;
