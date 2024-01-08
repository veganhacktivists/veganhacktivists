import { OrganizationType, RequestStatus } from '@prisma/client';
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
import { ctxInput } from 'server/procedures/middlewares';
import prisma from 'lib/db/prisma';

import type { Context } from 'server/context';

const checkForProfitRequestHasBudgetMiddleware = ctxInput((ctx: Context) =>
  submitRequestSchema.refine(
    async ({ budget }) => {
      const user = await prisma.user.findUniqueOrThrow({
        where: { id: ctx?.user?.id },
        select: { organization: { select: { type: true } } },
      });

      if (user.organization?.type == OrganizationType.Profit) {
        return !!budget;
      }
      return true;
    },
    {
      message: 'Request for for-profit organizations must be paid',
      path: ['budget'],
    }
  )
);

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
        throw new TRPCError({
          code: 'NOT_FOUND',
        });
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
    .use(checkForProfitRequestHasBudgetMiddleware)
    .mutation(async ({ input, ctx }) => {
      if (!input.id) {
        return submitRequest({
          ...input,
          requesterId: ctx.user.id,
        });
      }

      const request = await getRequestById(input.id, ctx.user);

      if (request.status === RequestStatus.Rejected) {
        return submitRequest({
          ...input,
          requesterId: ctx.user.id,
        });
      }

      return updateRequest({
        ...input,
        requesterId: ctx.user.id,
        role: ctx.user.role,
      });
    }),
  getLastUserRequest: protectedProcedure.query(
    async ({ ctx: { user, prisma } }) => {
      const request = await prisma.playgroundRequest.findFirst({
        where: {
          requesterId: user.id,
        },
        select: {
          title: true,
          organization: true,
          requester: {
            select: {
              requestorInformation: {
                select: {
                  contactLink: true,
                  contactEmail: true,
                  phone: true,
                },
              },
              organization: {
                select: {
                  website: true,
                },
              },
            },
          },
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
