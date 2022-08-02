import { TRPCError } from '@trpc/server';

import createRouter, {
  createAdminOnlyRouter,
  createProtectedRouter,
} from './context';

import {
  applyToHelp,
  getPlaygroundRequests,
  getRequestById,
} from 'lib/services/playground';
import {
  applyToRequestSchema,
  getPlaygroundRequestsSchema,
  getRequestByIdSchema,
  paginationSchema,
  setApplicationStatusSchema,
  setRequestStatusSchema,
} from 'lib/services/playground/schemas';
import {
  getPendingApplications,
  getPendingRequests,
  setApplicationStatus,
  setRequestStatus,
} from 'lib/services/playground/admin';

const adminPlaygroundRouter = createAdminOnlyRouter()
  .query('pendingApplications', {
    input: paginationSchema.optional(),
    resolve: async ({ input }) => {
      return await getPendingApplications(input);
    },
  })
  .mutation('setApplicationStatus', {
    input: setApplicationStatusSchema,
    resolve: async ({ input }) => {
      return await setApplicationStatus(input);
    },
  })
  .query('pendingRequests', {
    input: paginationSchema.optional(),
    resolve: async ({ input }) => {
      return await getPendingRequests(input);
    },
  })
  .mutation('setRequestStatus', {
    input: setRequestStatusSchema,
    resolve: async ({ input }) => {
      return await setRequestStatus(input);
    },
  });

const protectedPlaygroundRouter = createProtectedRouter().mutation('apply', {
  input: applyToRequestSchema,
  resolve: async ({ input, ctx: { user } }) => {
    const newApplication = await applyToHelp({
      ...input,
      applicantId: user.id,
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

export default playgroundRouter
  .merge(protectedPlaygroundRouter)
  .merge('admin.', adminPlaygroundRouter);
