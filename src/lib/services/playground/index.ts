import prisma from 'lib/db/prisma';

import type { getPlaygroundRequestsSchema } from './schemas';

import type { z } from 'zod';

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
