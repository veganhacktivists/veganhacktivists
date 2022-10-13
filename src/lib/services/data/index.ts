import { TRPCError } from '@trpc/server';

import prisma from 'lib/db/prisma';

import type { getDataDashboardProjectByLabelSchema } from './schemas';
import type { z } from 'zod';

export const getDataDashboardProject = async (
  label: z.infer<typeof getDataDashboardProjectByLabelSchema>
) => {
  const request = await prisma.dataDashboardProject.findFirst({
    where: {
      label,
    },
    select: {
      id: true,
      label: true,
      data: {
        select: {
          timestamp: true,
          category: true,
          subcategory: true,
          values: {
            select: {
              key: true,
              value: true,
            },
          },
        },
      },
    },
  });

  if (!request) {
    throw new TRPCError({ code: 'NOT_FOUND' });
  }

  return request;
};
