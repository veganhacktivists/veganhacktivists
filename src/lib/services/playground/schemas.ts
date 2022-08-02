import { Status } from '@prisma/client';
import { z } from 'zod';

export const paginationSchema = z
  .object({
    page: z.number().int().positive(),
    limit: z.number().int().positive(),
    sort: z.array(z.string()).optional(),
  })
  .refine(
    (data) => (!!data.page && !!data.limit) || (!data.page && !data.limit),
    "Both or neither of 'page' and 'limit' must be specified"
  );

export const getRequestByIdSchema = z.string().cuid();

export const getPlaygroundRequestsSchema = paginationSchema
  .and(
    z
      .object({
        isFree: z.boolean(),
        category: z.enum([
          'Design',
          'Website',
          'Marketing',
          'VideoProduction',
          'SocialMedia',
        ]),
      })
      .partial()
  )
  .optional();

export const applyToRequestSchema = z.object({
  requestId: z.string().cuid(),
  name: z.string().min(1),
  providedEmail: z.string().email(),
  portfolioLink: z.string().optional(),
  twitterUrl: z.string().optional(),
  instagramUrl: z.string().optional(),
  linkedinUrl: z.string().optional(),
  hasAppliedInThePast: z.boolean(),
  isVegan: z.boolean(),
  calendlyUrl: z.string().optional(),
  moreInfo: z.string().optional(),

  // Check those parameters are set, and delete them from the request aferwards
  commitToHelping: z
    .boolean()
    .refine((x) => !!x)
    .transform(() => undefined),
  agreeToTerms: z
    .boolean()
    .refine((x) => !!x)
    .transform(() => undefined),
});

export const applyToRequestSchemaClient = applyToRequestSchema.merge(
  z.object({
    // Require both of these values to be true
    commitToHelping: z.boolean().refine((x) => !!x, { message: 'Required' }),
    agreeToTerms: z
      .boolean()
      .refine((x) => !!x, { message: 'You must agree to the terms' }),
  })
);

export const getPendingApplicationsSchema = paginationSchema.optional();
export const getPendingRequestsSchema = paginationSchema.optional();

export const setApplicationStatusSchema = z.object({
  id: z.string().cuid(),
  status: z.nativeEnum(Status),
});

export const setRequestStatusSchema = z.object({
  id: z.string().cuid(),
  status: z.nativeEnum(Status),
});
