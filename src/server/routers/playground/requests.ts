import { TRPCError } from '@trpc/server';

import {
  getPlaygroundRequests,
  getRequestById,
  submitRequest,
  updateRequest,
} from 'lib/services/playground';
import {
  getPlaygroundRequestsSchema,
  getRequestByIdExtendedSchema,
  getRequestByIdSchema,
  submitRequestSchema,
} from 'lib/services/playground/schemas';
import { baseProcedure } from 'server/procedures';
import { protectedProcedure } from 'server/procedures/auth';
import { t } from 'server/trpc';

const requestsRouter = t.router({
  getAllRequests: baseProcedure
    .input(getPlaygroundRequestsSchema)
    .query(async ({ input }) => {
      return await getPlaygroundRequests(input);
    }),
  getRequest: baseProcedure
    .input(getRequestByIdSchema.or(getRequestByIdExtendedSchema).optional())
    .query(({ input, ctx: { user } }) => {
      const id = typeof input === 'object' ? input.id : input;
      const extended = typeof input === 'object' ? input.extended : false;
      if (!id) {
        return;
      }
      try {
        return getRequestById(id, user, extended);
      } catch {
        throw new TRPCError({
          code: 'NOT_FOUND',
        });
      }
    }),

  // auth procedures
  submitRequest: protectedProcedure
    .input(submitRequestSchema)
    .mutation(({ input, ctx }) => {
      if (input.id) {
        return updateRequest({
          ...input,
          requesterId: ctx.user.id,
          role: ctx.user.role,
        });
      }
      return submitRequest({
        ...input,
        requesterId: ctx.user.id,
      });
    }),
  getLastUserRequest: protectedProcedure.query(
    async ({ ctx: { user, prisma } }) => {
      const request = await prisma.playgroundRequest.findFirst({
        where: {
          requesterId: user.id,
        },
        select: {
          name: true,
          organization: true,
          calendlyUrl: true,
          phone: true,
          providedEmail: true,
          website: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      if (!request) {
        throw new TRPCError({ code: 'NOT_FOUND' });
      }

      return request;
    }
  ),
});

export default requestsRouter;
