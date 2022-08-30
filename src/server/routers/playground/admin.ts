import { Status } from '@prisma/client';
import { z } from 'zod';

import {
  deleteRequest,
  getPendingApplications,
  getPendingRequests,
  setApplicationStatus,
  setRequestStatus,
} from 'lib/services/playground/admin';
import {
  deleteRequestSchema,
  paginationSchema,
  setApplicationStatusSchema,
  setRequestStatusSchema,
} from 'lib/services/playground/schemas';
import { adminProcedure } from 'server/procedures/auth';
import { t } from 'server/trpc';

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
  deleteApplication: adminProcedure
    .input(z.string().cuid())
    .mutation(({ input: id, ctx: { prisma } }) =>
      prisma.playgroundApplication.update({
        where: { id },
        data: { status: Status.Rejected },
      })
    ),

  pendingRequests: adminProcedure
    .input(paginationSchema.optional())
    .query(({ input }) => {
      return getPendingRequests(input);
    }),
  deleteRequest: adminProcedure
    .input(deleteRequestSchema)
    .mutation(async ({ input }) => {
      const request = await deleteRequest(input);
      return request;
    }),
  setRequestStatus: adminProcedure
    .input(setRequestStatusSchema)
    .mutation(async ({ input }) => {
      const request = await setRequestStatus(input);

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

export default adminRouter;
