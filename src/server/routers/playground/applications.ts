import { TRPCError } from '@trpc/server';

import { applyToRequestSchema } from 'lib/services/playground/schemas';
import { protectedProcedure } from 'server/procedures/auth';
import { t } from 'server/trpc';
import { applyToHelp } from 'lib/services/playground';

const applicationsRouter = t.router({
  apply: protectedProcedure
    .input(applyToRequestSchema)
    .mutation(async ({ input, ctx: { user } }) => {
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
});

export default applicationsRouter;
