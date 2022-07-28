import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import superjson from 'superjson';

import {
  getPlaygroundRequests,
  getPlaygroundRequestsSchema,
} from 'lib/services/playground';

export const appRouter = trpc
  .router()
  .transformer(superjson)
  .query('getPlaygroundRequests', {
    input: getPlaygroundRequestsSchema,
    resolve: async ({ input }) => {
      return await getPlaygroundRequests(input);
    },
  });
export type AppRouter = typeof appRouter;

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null,
});
