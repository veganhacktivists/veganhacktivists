import { TRPCError } from '@trpc/server';

import createRouter, { createProtectedRouter } from './context';

import {
  applyToHelp,
  getPlaygroundRequests,
  getRequestById,
} from 'lib/services/playground';
import {
  applyToRequestSchema,
  getPlaygroundRequestsSchema,
  getRequestByIdSchema,
} from 'lib/services/playground/schemas';

const protectedPlaygroundRouter = createProtectedRouter().mutation('apply', {
  input: applyToRequestSchema,
  resolve: async ({ input, ctx: { user } }) => {
    const newApplication = await applyToHelp({
      ...input,
      requesterId: user.id,
    });
    return newApplication;
  },
});

const playgroundRouter = createRouter()
  .query('requests', {
    input: getPlaygroundRequestsSchema,
    resolve: async ({ input }) => {
      return await getPlaygroundRequests(input);
    },
  })
  .query('request', {
    input: getRequestByIdSchema,
    resolve: async ({ input, ctx: { user } }) => {
      const userId = user?.id;

      try {
        const request = await getRequestById(input, userId);
        return request;
      } catch {
        throw new TRPCError({
          code: 'NOT_FOUND',
        });
      }
    },
  });

export default playgroundRouter.merge(protectedPlaygroundRouter);
