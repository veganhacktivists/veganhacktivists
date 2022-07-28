import * as trpcNext from '@trpc/server/adapters/next';

import superjson from 'superjson';

import playgroundRouter from 'lib/trpcServer/playground';
import usersRouter from 'lib/trpcServer/users';
import createRouter, { createContext } from 'lib/trpcServer/context';
import authRouter from 'lib/trpcServer/auth';

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('playground.', playgroundRouter)
  .merge('users.', usersRouter)
  .merge('auth.', authRouter);

export type AppRouter = typeof appRouter;

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
});
