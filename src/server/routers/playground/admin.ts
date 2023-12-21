import { ApplicationStatus, RequestStatus } from '@prisma/client';
import { z } from 'zod';

import {
  deleteRequest,
  getPendingApplications,
  getRequests,
  repostRequest,
  setApplicationStatus,
  setRequestStatus,
} from 'lib/services/playground/admin';
import {
  deleteRequestSchema,
  getPendingApplicationsSchema,
  getRequestsAdminSchema,
  repostRequestSchema,
  setApplicationStatusSchema,
  setRequestStatusSchema,
  datagridParamsSchema,
} from 'lib/services/playground/schemas';
import { adminProcedure } from 'server/procedures/auth';
import { t } from 'server/trpc';
import {
  PlaygroundApplicationSchema,
  PlaygroundRequestSchema,
  UserSchema,
} from 'generated/schemas';
import {
  buildFilterQuery,
  buildSearchQuery,
  buildSortingQuery,
  buildUpdateQuery,
  transformZodNullables,
} from 'lib/helpers/datagrid';

const applicationSchema = PlaygroundApplicationSchema.omit({
  applicantId: true,
  requestId: true,
})
  .extend({
    request: PlaygroundRequestSchema.omit({ requesterId: true })
      .extend({ requester: UserSchema.partial() })
      .partial(),
    applicant: UserSchema.partial(),
  })
  .partial();

export type ApplicationEntry = z.infer<typeof applicationSchema>;

const adminRouter = t.router({
  pendingApplications: adminProcedure
    .input(getPendingApplicationsSchema)
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
        data: { status: ApplicationStatus.Rejected },
      })
    ),

  getRequests: adminProcedure
    .input(getRequestsAdminSchema)
    .query(async ({ input }) => {
      const result = await getRequests(input);
      return result;
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
      console.info('setRequestStatus', JSON.stringify(input), Date.now());
      const request = await setRequestStatus(input);

      return request;
    }),
  repostRequest: adminProcedure
    .input(repostRequestSchema)
    .mutation(async ({ input }) => {
      const request = await repostRequest(input);
      return request;
    }),

  requestsWithPendingApplications: adminProcedure.query(
    ({ ctx: { prisma } }) => {
      return prisma.playgroundRequest.findMany({
        where: {
          status: RequestStatus.Accepted,
          applications: {
            some: {
              status: ApplicationStatus.Pending,
            },
          },
        },
        include: {
          applications: {
            where: {
              status: ApplicationStatus.Pending,
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
              email: true,
            },
          },
          budget: {
            select: {
              quantity: true,
              type: true,
            },
          },
          _count: {
            select: {
              applications: {
                where: {
                  status: ApplicationStatus.Accepted,
                },
              },
            },
          },
        },
      });
    }
  ),
  allApplications: adminProcedure
    .input(datagridParamsSchema.partial())
    .query(async ({ input, ctx: { prisma } }) => {
      const total: number = await prisma.playgroundApplication.count();
      const skip = (input.page ?? 0) * (input.pageSize ?? 20);
      const filters =
        input.filters && input.filters.length > 0
          ? buildFilterQuery(input.filters)
          : undefined;
      const search =
        input.search && input.search.length > 0
          ? buildSearchQuery(input.search, [
              'applicant.name',
              'request.title',
              'moreInfo',
            ])
          : undefined;
      const where =
        filters && input.search && input.search.length > 0
          ? { AND: [filters, search] }
          : filters
          ? filters
          : search;
      const data: ApplicationEntry[] =
        await prisma.playgroundApplication.findMany({
          select: {
            id: true,
            status: true,
            estimatedTimeDays: true,
            moreInfo: true,
            createdAt: true,
            applicant: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
            request: {
              select: {
                id: true,
                title: true,
                category: true,
                requiredSkills: true,
                status: true,
                requester: {
                  select: {
                    id: true,
                    name: true,
                    email: true,
                  },
                },
              },
            },
          },
          take: input.pageSize ?? 20,
          skip: skip,
          orderBy: input.sort
            ? buildSortingQuery(input.sort.column, input.sort.order)
            : undefined,
          where,
        });
      return { total, content: data };
    }),
  updateApplication: adminProcedure
    .input(transformZodNullables(applicationSchema.omit({ request: true }).partial()))
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      const dataQuery = buildUpdateQuery(data);
      await prisma.playgroundApplication.update({
        where: { id: id as string },
        data: dataQuery,
      });
    }),
});

export default adminRouter;
