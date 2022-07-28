import { unstable_getServerSession } from 'next-auth';

import createRouter from './context';

import { nextAuthOptions } from 'pages/api/auth/[...nextauth]';

const authRouter = createRouter().query('getSession', {
  resolve: async ({ ctx: { req, res } }) => {
    const session = await unstable_getServerSession(req, res, nextAuthOptions);
    if (!session) {
      return {
        session,
        loggedIn: false as const,
      };
    }
    return {
      session,
      loggedIn: true as const,
    };
  },
});

export default authRouter;
