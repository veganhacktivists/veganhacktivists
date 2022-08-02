import { withAuth } from 'next-auth/middleware';

const middleware = withAuth({
  callbacks: {
    authorized: ({ token }) => token?.isAdmin === true,
  },
});

export default middleware;

export const config = { matcher: ['/playground/admin'] };
