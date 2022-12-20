import { UserRole } from '@prisma/client';
import { withAuth } from 'next-auth/middleware';

const middleware = withAuth({
  callbacks: {
    authorized: ({ token }) => token?.role === UserRole.Admin,
  },
});

export default middleware;

export const config = { matcher: ['/playground/admin/:path*'] };
