import { TRPCError } from '@trpc/server';
import { getSession } from 'next-auth/react';

import {
  applicantSignupSchema,
  requestorSignupSchema,
} from 'lib/services/playground/schemas';
import { protectedProcedure } from 'server/procedures/auth';
import { t } from 'server/trpc';

import type { z } from 'zod';

type ApplicantSignupInput = z.infer<typeof applicantSignupSchema>;
type RequestorSignupInput = z.infer<typeof requestorSignupSchema>;

const accountRouter = t.router({
  signup: protectedProcedure
    .input(requestorSignupSchema.or(applicantSignupSchema))
    .mutation(async ({ input, ctx }) => {
      const session = await getSession({ ctx });
      if (!session?.user) return;
      const isRequestor =
        session.user?.role === 'Requestor' || session.user?.role === 'Admin';
      if (requestorSignupSchema.safeParse(input).success && !isRequestor)
        return;
      if (isRequestor) {
        input = input as RequestorSignupInput;
        const user = await prisma.user.findUnique({
          where: { id: session.user.id },
          include: { requestorInformation: true },
        });
        if (!!user?.requestorInformation)
          return { success: false, error: 'You are already signed up' };
        try {
          await prisma.user.update({
            where: { id: session.user.id },
            data: {
              name: input.personal.name,
              pronouns: input.personal.pronouns,
              requestorInformation: {
                create: {
                  phone: input.personal.phone,
                  contactLink: input.personal.calendlyUrl,
                  contactEmail: input.personal.contactEmail,
                },
              },
              organization: {
                create: {
                  name: input.organization.name ?? '',
                  description: input.organization.description,
                  website: input.organization.website,
                  type: input.organization.organizationType,
                },
              },
            },
            include: { requestorInformation: true, organization: true },
          });
        } catch {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Something went wrong',
          });
        }
      } else {
        input = input as ApplicantSignupInput;
        const user = await prisma.user.findUnique({
          where: { id: session.user.id },
          include: { applicantInformation: true },
        });
        if (!!user?.applicantInformation)
          return { success: false, error: 'You are already signed up' };
        try {
          await prisma.user.update({
            where: { id: session.user.id },
            data: {
              name: input.name,
              pronouns: input.pronouns,
              applicantInformation: {
                create: {
                  contactEmail: input.contactEmail,
                  website: input.website,
                  socialMedia: {
                    twitter: input.twitter,
                    instagram: input.instagram,
                    linkedin: input.linkedin,
                  },
                  contactLink: input.calendlyUrl,
                  availableTimePerWeek: input.availableTimePerWeek,
                  origin: input.source,
                },
              },
            },
            include: { applicantInformation: true },
          });
        } catch {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Something went wrong',
          });
        }
      }
      return { success: true };
    }),
});

export default accountRouter;
