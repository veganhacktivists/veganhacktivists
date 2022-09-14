import {
  BudgetType,
  PlaygroundRequestCategory,
  Status,
  TimePerWeek,
} from '@prisma/client';
import { z } from 'zod';

export const paginationSchema = z
  .object({
    page: z.number().int().positive(),
    pageSize: z.number().int().positive(),
  })
  .optional();

export const getRequestByIdSchema = z.string().cuid();

const filterSchema = z.object({
  categories: z
    .array(z.nativeEnum(PlaygroundRequestCategory))
    .transform((input) => {
      if (input.length === 0) return undefined;
      return input;
    })
    .optional(),
  isPaidRequest: z.boolean(),
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
  providedEmail: z.string().trim().email(),
  portfolioLink: z
    .string()
    .trim()
    .min(1, { message: 'This value is required' }),
  twitterUrl: z.string().trim().optional(),
  instagramUrl: z.string().trim().optional(),
  linkedinUrl: z.string().trim().optional(),
  hasAppliedInThePast: z.boolean(),
  isVegan: z.boolean(),
  calendlyUrl: z.string().trim().optional(),
  moreInfo: z.string().trim().min(1, { message: 'This value is required' }),

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

<<<<<<< HEAD
const budgetSchema = z.object({
  quantity: z
    .number()
    .positive()
    .refine((x) => /^\d+((\.|,)\d{1,2})?$/.test(String(x)), {
      message: 'Not a valid monetary value',
    }),
  type: z.nativeEnum(BudgetType),
});

export const submitRequestSchema = z.object({
=======
const unsafeSubmitRequestSchema = z.object({
  id: z.string().cuid().optional(),
>>>>>>> 3a3309f1 (adds update-request functionality)
  name: z.string().trim().min(1, { message: 'This value is required' }),
  providedEmail: z.string().trim().email(),
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
  title: z.string().trim().min(1).max(200),
  category: z.nativeEnum(PlaygroundRequestCategory),
  // Transform the string of skills separated by a comma in an array of strings
  requiredSkills: z.string().transform((x) =>
    x
      .split(',')
      .map((x) => x.trim())
      .filter((x) => x.length > 0)
  ),
  description: z.string().trim().min(1),
  budget: budgetSchema.optional(),
  dueDate: z
    .date()
    .min(new Date(), { message: 'Due date must be in the future' }),
  estimatedTimeDays: z.number().nonnegative().int(),
  qualityAgreement: z
    .boolean()
    .optional()
    .refine((x) => !!x)
    .transform(() => undefined),
  agreeToTerms: z
    .boolean()
    .optional()
    .refine((x) => !!x)
    .transform(() => undefined),
});

<<<<<<< HEAD
export const submitRequestSchemaClient = submitRequestSchema.merge(
  z.object({
    requiredSkills: z.string().trim().min(1),
=======
export const editRequestSchema = unsafeSubmitRequestSchema
  .omit({ agreeToTerms: true, qualityAgreement: true })
  .transform((data) => {
    if (data.isFree) {
      return {
        ...data,
        budget: undefined,
      };
    }
    return {
      ...data,
      budget: undefined,
    };
  });

export const submitRequestSchema = unsafeSubmitRequestSchema.transform(
  (data) => {
    if (data.isFree) {
      return { ...data, budget: undefined };
    }
>>>>>>> 3a3309f1 (adds update-request functionality)

    // Require both of these values to be true
    qualityAgreement: z.boolean().refine((x) => !!x, { message: 'Required' }),
    agreeToTerms: z
      .boolean()
      .refine((x) => !!x, { message: 'You must agree to the terms' }),
  })
);

<<<<<<< HEAD
export const getPendingApplicationsSchema = paginationSchema;
=======
export const submitRequestSchemaClient = unsafeSubmitRequestSchema
  .merge(
    z.object({
      id: z.string().cuid().optional(),
      requiredSkills: z.string().trim().min(1),
      // Require both of these values to be true
      qualityAgreement: z.boolean().refine((x) => !!x, { message: 'Required' }),
      /* Todo: Need to check wheter or not that should be optional for editing requests */
      agreeToTerms: z
        .boolean()
        .refine((x) => !!x, { message: 'You must agree to the terms' }),
    })
  )
  .transform((data) => {
    if (data.isFree) {
      return { ...data, budget: undefined };
    }
>>>>>>> 3a3309f1 (adds update-request functionality)

export const getPendingRequestsSchema = paginationSchema;

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
