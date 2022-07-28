import { PlaygroundRequestCategory } from '@prisma/client';

import { z } from 'zod';

import prisma from 'lib/db/prisma';

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
        category: z.nativeEnum(PlaygroundRequestCategory),
      })
      .partial()
  )
  .optional();

export const getPlaygroundRequests = async (
  params: z.infer<typeof getPlaygroundRequestsSchema>
) => {
  const requests = await prisma.playgroundRequest.findMany({
    include: {
      requester: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    where: {
      isApproved: true,
      ...params,
    },
  });

  return requests;
};
