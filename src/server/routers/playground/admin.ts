import { ApplicationStatus, RequestStatus, UserRole } from '@prisma/client';
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
    OrganizationSchema,
  PlaygroundApplicationSchema,
  PlaygroundRequestSchema,
  RequestorInformationSchema,
  UserSchema,
} from 'generated/schemas';
import {
  buildFilterQuery,
  buildSearchQuery,
  buildSortingQuery,
  buildUpdateQuery,
  transformZodNullables,
} from 'lib/helpers/datagrid';
import prisma from 'lib/db/prisma';

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

const requestSchema = PlaygroundRequestSchema.extend({ requester: UserSchema.partial(), organization: OrganizationSchema.partial() }).partial();
const requestorSchema = UserSchema.extend({ organization: OrganizationSchema.partial().nullish(), requestorInformation: RequestorInformationSchema.partial().nullish() }).partial();

export type RequestEntry = z.infer<typeof requestSchema>;
export type RequestorEntry = z.infer<typeof requestorSchema>;
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
    .input(datagridParamsSchema.partial())
    .query(async ({ input, ctx: { prisma } }) => {
      const total: number = await prisma.playgroundRequest.count();
      const skip = (input.page ?? 0) * (input.pageSize ?? 20);
      const filters =
        input.filters && input.filters.length > 0
          ? buildFilterQuery(input.filters)
          : undefined;
      const search =
        input.search && input.search.length > 0
          ? buildSearchQuery(input.search, [
              'title',
              'organization.name',
              'requester.name',
            ])
          : undefined;
      const where =
        filters && input.search && input.search.length > 0
          ? { AND: [filters, search] }
          : filters
            ? filters
            : search;
      const data: RequestEntry[] =
        await prisma.playgroundRequest.findMany({
          select: {
            id: true,
            title: true,
            category: true,
            requiredSkills: true,
            status: true,
            dueDate: true,
            neededVolunteers: true,
            requester: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
            organization: {
              select: {
                id: true,
                name: true,
              },
            },
            createdAt: true,
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
  updateRequest: adminProcedure
    .input(
      transformZodNullables(requestSchema.omit({ organization: true, requester: true, requiredSkills: true }).partial())
    )
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      const dataQuery = buildUpdateQuery(data);
      await prisma.playgroundRequest.update({
        where: { id },
        data: dataQuery,
      });
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
      // eslint-disable-next-line no-console
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
  getRequestors: adminProcedure
    .input(datagridParamsSchema.partial())
    .query(async ({ input, ctx: { prisma } }) => {
      const total: number = await prisma.user.count({ where: { role: UserRole.Requestor }});
      const skip = (input.page ?? 0) * (input.pageSize ?? 20);
      const filters =
        input.filters && input.filters.length > 0
          ? buildFilterQuery(input.filters)
          : undefined;
      // const search =
      //   input.search && input.search.length > 0
      //     ? buildSearchQuery(input.search, [
      //         'title',
      //         'organization.name',
      //         'requester.name',
      //       ])
      //     : undefined;
      const search = undefined;
      const where =
        filters && input.search && input.search.length > 0
          ? { AND: [filters, search] }
          : filters
            ? filters
            : search;
      const data: RequestorEntry[] =
        await prisma.user.findMany({
          select: {
            id: true,
            name: true, 
            email: true,
            requestorInformation: true,
            organization: {
              select: {
                name: true,
                type: true,
                website: true,
              },
            },
            createdAt: true,
          },
          take: input.pageSize ?? 20,
          skip: skip,
          orderBy: input.sort
            ? buildSortingQuery(input.sort.column, input.sort.order)
            : undefined,
          where: !!where ? { AND: [{ role: UserRole.Requestor }, where] } : { role: UserRole.Requestor }
        });
      return { total, content: data };
    }),
  updateRequestor: adminProcedure
    .input(
      transformZodNullables(requestorSchema.partial())
    )
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      const dataQuery = buildUpdateQuery(data);
      await prisma.user.update({
        where: { id },
        data: dataQuery,
      });
    }),
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
    .input(
      transformZodNullables(applicationSchema.omit({ request: true }).partial())
    )
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      const dataQuery = buildUpdateQuery(data);
      await prisma.playgroundApplication.update({
        where: { id },
        data: dataQuery,
      });
    }),
});

export default adminRouter;
