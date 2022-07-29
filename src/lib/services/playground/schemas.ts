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
        free: z.boolean(),
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

const urlValidator = () =>
  z.preprocess((val) => {
    const toStr = String(val);
    if (toStr.startsWith('http://') || toStr.startsWith('https://')) {
      return toStr;
    }
    return `http://${toStr}`;
  }, z.string().url().optional());

export const applyToRequestSchema = z.object({
  requestId: z.string().cuid(),
  name: z.string().min(1),
  providedEmail: z.string().email(),
  portfolioLink: urlValidator().optional(),
  twitterUrl: z.string().optional(),
  instagramUrl: z.string().optional(),
  linkedinUrl: z.string().optional(),
  hasAppliedInThePast: z.boolean(),
  isVegan: z.boolean(),
  calendlyUrl: urlValidator().optional(),
  moreInfo: z.string().optional(),
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
    // check those parameters are set, and delete them from the request aferwards
    commitToHelping: z.boolean().refine((x) => !!x),
    agreeToTerms: z.boolean().refine((x) => !!x),
  })
);
