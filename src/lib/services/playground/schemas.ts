import {
  BudgetType,
  PlaygroundRequestCategory,
  TimePerWeek,
  Source,
  RequestStatus,
  ApplicationStatus,
  PlaygroundRequestOrganizationType,
  PlaygroundRequestDesignRequestType,
} from '@prisma/client';
import { z } from 'zod';

export const paginationSchema = z.object({
  page: z.number().int().positive(),
  pageSize: z.number().int().positive(),
});

export const getRequestByIdSchema = z.string().cuid();
export const getRequestByIdExtendedSchema = z.object({
  id: getRequestByIdSchema.optional(),
  extended: z.boolean().optional().default(false),
});

const requestFilterSchema = z.object({
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

export const getPlaygroundRequestsSchema = requestFilterSchema
  .partial()
  .and(z.object({ sort: sortSchema.optional() }));

export const applyToRequestSchema = z.object({
  requestId: z.string().cuid(),
  name: z.string().min(1, { message: 'This value is required' }),
  pronouns: z.string().optional(),
  availableTimePerWeek: z.nativeEnum(TimePerWeek),
  estimatedTimeDays: z.number().nonnegative().int(),
  source: z.nativeEnum(Source).optional(),
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

const budgetSchema = z.object({
  quantity: z
    .number()
    .positive()
    .refine((x) => /^\d+((\.|,)\d{1,2})?$/.test(String(x)), {
      message: 'Not a valid monetary value',
    }),
  type: z.nativeEnum(BudgetType),
});

const devRequestSchema = z.object({
  category: z.literal(PlaygroundRequestCategory.Developer),
  devRequestWebsiteExists: z.boolean().optional(),
  devRequestWebsiteUrl: z.string().optional(),
  designRequestType: z.undefined(),
  designRequestCurrentDesignExists: z.undefined(),
});

const designRequestSchema = z.object({
  category: z.literal(PlaygroundRequestCategory.Designer),
  designRequestType: z
    .nativeEnum(PlaygroundRequestDesignRequestType)
    .optional(),
  designRequestCurrentDesignExists: z.boolean().optional(),
  devRequestWebsiteExists: z.undefined(),
  devRequestWebsiteUrl: z.undefined(),
});

const otherRequestCategorySchema = z.object({
  category: z.nativeEnum(PlaygroundRequestCategory),
});

const submitRequestSchemaBase = z.object({
  id: z.string().cuid().optional(),
  name: z.string().trim().min(1, { message: 'This value is required' }),
  pronouns: z.string().trim().optional(),
  providedEmail: z.string().trim().email(),
  phone: z.string().trim().min(1, { message: 'This value is required' }),
  organization: z.string().trim().optional(),
  organizationType: z.nativeEnum(PlaygroundRequestOrganizationType),
  organizationDescription: z.string().trim().min(1),
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
  dueDate: z.date().optional().nullable(),
  estimatedTimeDays: z.number().nonnegative().int().nullish(),
  neededVolunteers: z.number().nonnegative().int(),
  agreeToTerms: z
    .boolean()
    .refine((x) => !!x)
    .transform(() => undefined),
  devRequestWebsiteExists: z.boolean().optional(),
  devRequestWebsiteUrl: z.string().optional(),
  designRequestType: z
    .nativeEnum(PlaygroundRequestDesignRequestType)
    .optional(),
  designRequestCurrentDesignExists: z.boolean().optional(),
});

export const submitRequestSchema = submitRequestSchemaBase.and(
  devRequestSchema.or(designRequestSchema).or(otherRequestCategorySchema)
);

const submitRequestSchemaClientBase = submitRequestSchemaBase.merge(
  z.object({
    requiredSkills: z.string().trim().min(1),
    agreeToTerms: z
      .boolean()
      .refine((x) => !!x, { message: 'You must agree to the terms' }),
  })
);

export const submitRequestSchemaClient = submitRequestSchemaClientBase.and(
  devRequestSchema.or(designRequestSchema).or(otherRequestCategorySchema)
);

export const verifyRequestFormRequestSchema = submitRequestSchemaClientBase
  .extend({
    dueDate: z
      .string()
      .refine((x) => new Date(x).getTime() > Date.now() || x.length === 0, {
        message: 'Due date must be in the future',
      }),
  })
  .refine(
    ({ organizationType, budget }) => {
      return !(
        organizationType === PlaygroundRequestOrganizationType.Profit && !budget
      );
    },
    {
      message: 'Request for for-profit organizations must be paid',
      path: ['budget'],
    }
  );

export const getPendingApplicationsSchema = paginationSchema.optional();

export const getRequestsAdminSchema = z
  .object({
    status: z.nativeEnum(RequestStatus),
    pagination: paginationSchema.optional(),
  })
  .partial();

export const setApplicationStatusSchema = z.object({
  id: z.string().cuid(),
  status: z.nativeEnum(ApplicationStatus),
});

export const deleteRequestSchema = z.object({
  id: z.string().cuid(),
});

export const repostRequestSchema = z.object({
  id: z.string().cuid(),
  lastManuallyPushed: z.date().optional().nullable(),
});

export const setRequestStatusSchema = z.object({
  id: z.string().cuid(),
  status: z.nativeEnum(RequestStatus),
});

export const datagridFilterSchema = z.object({
 column: z.string(), filter: z.object({ filterType: z.string(), type: z.string(), filter: z.string().nullish()  })
});
export type FilterOption = z.infer<typeof datagridFilterSchema>;

export const datagridParamsSchema = z.object({
  sort: z.object({
    column: z.string(),
    order: z.enum(['asc', 'desc']),
  }).nullish(),
  pageSize: z.number().int().positive(),
  page: z.number().int().nonnegative(),
  filters: z.array(datagridFilterSchema),
  search: z.string().nullish(),
});
