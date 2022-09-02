import { PlaygroundRequestCategory, Status, TimePerWeek } from '@prisma/client';
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
  categories: z
    .array(z.nativeEnum(PlaygroundRequestCategory))
    .transform((input) => {
      if (input.length === 0) return undefined;
      return input;
    })
    .optional(),
  isFree: z.boolean(),
});

export const sortSchema = z.object({
  dueDate: z.enum(['asc', 'desc']).optional(),
  createdAt: z.enum(['asc', 'desc']).optional(),
});

export type Sorting = z.infer<typeof sortSchema>;

export const getPlaygroundRequestsSchema = filterSchema
  .partial()
  .and(z.object({ sort: sortSchema.optional() }));

export const applyToRequestSchema = z.object({
  requestId: z.string().cuid(),
  name: z.string().min(1, { message: 'This value is required' }),
  availableTimePerWeek: z.nativeEnum(TimePerWeek),
  providedEmail: z.string().email(),
  portfolioLink: z.string().optional(),
  twitterUrl: z.string().optional(),
  instagramUrl: z.string().optional(),
  linkedinUrl: z.string().optional(),
  hasAppliedInThePast: z.boolean(),
  isVegan: z.boolean(),
  calendlyUrl: z.string().optional(),
  moreInfo: z.string().min(1, { message: 'This value is required' }),

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

const unsafeSubmitRequestSchema = z.object({
  name: z.string().trim().min(1, { message: 'This value is required' }),
  providedEmail: z.string().email(),
  phone: z.string().trim().optional(),
  organization: z.string().trim().optional(),
  website: z
    .string()
    .trim()
    .min(1)
    .refine((url) => !url.includes(' '), {
      message: "The URL can't contain spaces",
    })
    .transform((url) => (url.match(/^https?:\/\//) ? url : `http://${url}`)),
  calendlyUrl: z.string().trim().min(1, { message: 'This value is required' }),
  title: z.string().trim().min(1),
  category: z.nativeEnum(PlaygroundRequestCategory),
  // Transform the string of skills separated by a comma in an array of strings
  requiredSkills: z
    .string()
    .min(1)
    .transform((x) =>
      x
        .split(',')
        .map((item) => item.trim())
        .filter((x) => !!x)
    ),
  isFree: z.boolean(),
  budget: z
    .number()
    .nonnegative()
    .refine((x) => /^\d+((\.|,)\d{1,2})?$/.test(String(x)), {
      message: 'Not a valid monetary value',
    })
    .optional(),
  description: z.string().trim().min(1),
  dueDate: z
    .date()
    .min(new Date(), { message: 'Due date must be in the future' }),
  estimatedTimeDays: z.number().nonnegative().int(),
  qualityAgreement: z
    .boolean()
    .refine((x) => !!x)
    .transform(() => undefined),
  agreeToTerms: z
    .boolean()
    .refine((x) => !!x)
    .transform(() => undefined),
});

export const submitRequestSchema = unsafeSubmitRequestSchema.transform(
  (data) => {
    if (data.isFree) {
      return { ...data, budget: undefined };
    }

    return data;
  }
);

export const submitRequestSchemaClient = unsafeSubmitRequestSchema
  .merge(
    z.object({
      // Require both of these values to be true
      requiredSkills: z.string().min(1),
      qualityAgreement: z.boolean().refine((x) => !!x, { message: 'Required' }),
      agreeToTerms: z
        .boolean()
        .refine((x) => !!x, { message: 'You must agree to the terms' }),
    })
  )
  .transform((data) => {
    if (data.isFree) {
      return { ...data, budget: undefined };
    }

    return data;
  });

export const getPendingApplicationsSchema = paginationSchema.optional();

export const getPendingRequestsSchema = paginationSchema.optional();

export const setApplicationStatusSchema = z.object({
  id: z.string().cuid(),
  status: z.nativeEnum(Status),
});

export const deleteRequestSchema = z.object({
  id: z.string().cuid(),
});

export const setRequestStatusSchema = z.object({
  id: z.string().cuid(),
  status: z.nativeEnum(Status),
});
