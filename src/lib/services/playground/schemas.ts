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
