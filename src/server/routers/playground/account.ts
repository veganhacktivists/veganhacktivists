import { TRPCError } from '@trpc/server';
import { requestorSignupSchema } from 'lib/services/playground/schemas';
import { getSession } from 'next-auth/react';
import { protectedProcedure } from 'server/procedures/auth';
import { t } from 'server/trpc';

const accountRouter = t.router(
  {
    signup: protectedProcedure.input(requestorSignupSchema).mutation(async ({input, ctx }) => {
      const session = await getSession({ ctx });
      if (!session?.user) return;
      let user = await prisma.user.findUnique({ where: { id: session.user.id }, include: { requestorInformation: true } });
      if (!!user?.requestorInformation) return { success: false, error: 'You are already signed up' };
      try {
        await prisma.user.update({ where: { id: session.user.id }, data: { name: input.personal.name, pronouns: input.personal.pronouns, requestorInformation: { create: {
          phone: input.personal.phone,
          contactLink: input.personal.calendlyUrl,
          contactEmail: input.personal.contactEmail,
        } }, organization: { create: { name: input.organization.name ?? '', description: input.organization.description, website: input.organization.website } } }, include: { requestorInformation: true, organization: true }});
      } catch {
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Something went wrong' });
      }
      return { success: true };
    }),
  }
);

export default accountRouter;
