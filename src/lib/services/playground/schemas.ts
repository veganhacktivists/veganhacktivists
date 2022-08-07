import { PlaygroundRequestCategory, Status } from '@prisma/client';
import { z } from 'zod';

export const paginationSchema = z
  .object({
    page: z.number().int().positive(),
    limit: z.number().int().positive(),
  })
  .refine(
    (data) => (!!data.page && !!data.limit) || (!data.page && !data.limit),
    "Both or neither of 'page' and 'limit' must be specified"
  );

export const getRequestByIdSchema = z.string().cuid();

const filterSchema = z.object({
  category: z.array(z.nativeEnum(PlaygroundRequestCategory)),
  isFree: z.boolean(),
});

export const filterAndSortRequestsSchema = z
  .object({
    sort: z.object({
      priority: z.enum(['asc', 'desc']).default('desc'),
      createdAt: z.enum(['asc', 'desc']).default('desc'),
    }),
  })
  .and(filterSchema.partial().optional());

export const getPlaygroundRequestsSchema = z
  .object({
    isFree: z.boolean(),
    category: z.nativeEnum(PlaygroundRequestCategory),
  })
  .partial()
  .optional()
  .and(filterAndSortRequestsSchema);

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
