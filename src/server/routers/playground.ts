import { TRPCError } from '@trpc/server';

import { Status } from '@prisma/client';

import {
  applyToRequestSchema,
  getPlaygroundRequestsSchema,
  getRequestByIdSchema,
  paginationSchema,
  setApplicationStatusSchema,
  setRequestStatusSchema,
  submitRequestSchema,
} from 'lib/services/playground/schemas';
import { adminProcedure, protectedProcedure } from 'server/procedures/auth';
import { t } from 'server/trpc';
import {
  applyToHelp,
  getPlaygroundRequests,
  getRequestById,
  submitRequest,
} from 'lib/services/playground';
import {
  getPendingApplications,
  getPendingRequests,
  setApplicationStatus,
  setRequestStatus,
} from 'lib/services/playground/admin';

const adminRouter = t.router({
  pendingApplications: adminProcedure
    .input(paginationSchema.optional())
    .query(({ input }) => {
      return getPendingApplications(input);
    }),
  setApplicationStatus: adminProcedure
    .input(setApplicationStatusSchema)
    .mutation(({ input }) => {
      return setApplicationStatus(input);
    }),

  pendingRequests: adminProcedure
    .input(paginationSchema.optional())
    .query(({ input }) => {
      return getPendingRequests(input);
    }),
  setRequestStatus: adminProcedure
    .input(setRequestStatusSchema)
    .mutation(async ({ input }) => {
      const request = await setRequestStatus(input);

      if (input.status === Status.Accepted) {
      }

      return request;
    }),

  requestsWithPendingApplications: adminProcedure.query(
    ({ ctx: { prisma } }) => {
      return prisma.playgroundRequest.findMany({
        where: {
          status: Status.Accepted,
          applications: {
            some: {
              status: Status.Pending,
            },
          },
        },
        include: {
          applications: {
            where: {
              status: Status.Pending,
            },
            include: {
              applicant: {
                select: {
                  email: true,
                },
              },
            },
          },
          requester: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
    }
  ),
});

const playgroundRouter = t.router({
  admin: adminRouter,
  requests: t.procedure
    .input(getPlaygroundRequestsSchema)
    .query(async ({ input }) => {
      return await getPlaygroundRequests(input);
    }),
  request: t.procedure
    .input(getRequestByIdSchema)
    .query(({ input, ctx: { user } }) => {
      try {
        return getRequestById(input, user);
      } catch {
        throw new TRPCError({
          code: 'NOT_FOUND',
        });
      }
    }),

  apply: protectedProcedure
    .input(applyToRequestSchema)
    .mutation(async ({ input, ctx: { user } }) => {
      return applyToHelp({
        ...input,
        applicantId: user.id,
      });
    }),

  submitRequest: protectedProcedure
    .input(submitRequestSchema)
    .mutation(({ input, ctx }) => {
      return submitRequest({
        ...input,
        requesterId: ctx.user.id,
      });
    }),

  lastApplication: protectedProcedure.query(
    async ({ ctx: { user, prisma } }) => {
      const application = await prisma.playgroundApplication.findFirst({
        where: {
          applicantId: user.id,
        },
        select: {
          name: true,
          portfolioLink: true,
          twitterUrl: true,
          instagramUrl: true,
          linkedinUrl: true,
          isVegan: true,
          calendlyUrl: true,
          providedEmail: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      if (!application) {
        throw new TRPCError({
          code: 'NOT_FOUND',
        });
      }

      return application;
    }
  ),

  lastRequest: protectedProcedure.query(({ ctx: { user, prisma } }) => {
    return prisma.playgroundRequest.findFirstOrThrow({
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
  }),
});

export default playgroundRouter;
