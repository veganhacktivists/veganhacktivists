import { TRPCError } from '@trpc/server';
import { RequestStatus } from '@prisma/client';

import { applyToRequestSchema } from 'lib/services/playground/schemas';
import { protectedProcedure } from 'server/procedures/auth';
import { t } from 'server/trpc';
import { applyToHelp } from 'lib/services/playground';

const applicationsRouter = t.router({
  apply: protectedProcedure
    .input(applyToRequestSchema)
    .mutation(async ({ input, ctx: { user, prisma } }) => {
      const request = await prisma.playgroundRequest.findFirst({
        where: { id: input.requestId, status: RequestStatus.Accepted },
      });

      if (!request) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Request not found',
        });
      }

      return applyToHelp({
        ...input,
        applicantId: user.id,
      });
    }),
  getLastUserApplication: protectedProcedure.query(
    async ({ ctx: { user, prisma } }) => {
      const application = await prisma.playgroundApplication.findFirst({
        where: {
          applicantId: user.id,
        },
        select: {
          applicant: {
            select: {
              name: true,
              applicantInformation: {
                select: {
                  website: true,
                  socialMedia: true,
                  contactLink: true,
                  contactEmail: true,
                },
              },
            },
          },
          status: true,
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
});

export default applicationsRouter;
