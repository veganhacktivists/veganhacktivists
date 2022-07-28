import * as trpcNext from '@trpc/server/adapters/next';

import superjson from 'superjson';

import playgroundRouter from 'lib/trpcServer/playground';
import usersRouter from 'lib/trpcServer/users';
import createRouter, { createContext } from 'lib/trpcServer/context';

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('playground.', playgroundRouter)
  .merge('users.', usersRouter);

export type AppRouter = typeof appRouter;

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
});
