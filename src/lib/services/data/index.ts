import { TRPCError } from '@trpc/server';

import prisma from 'lib/db/prisma';

import type { getDataDashboardProjectByIdSchema } from './schemas';
import type { z } from 'zod';

export const getDataDashboardProject = async (
  id: z.infer<typeof getDataDashboardProjectByIdSchema>
) => {
  const request = await prisma.dataDashboardProject.findFirst({
    where: {
      id,
    },
    include: {
      data: {
        include: {
          values: true,
        },
      },
    },
  });

  if (!request) {
    throw new TRPCError({ code: 'NOT_FOUND' });
  }

  return request;
};

export const getDataDashboardProjects = async () => {
  const request = await prisma.dataDashboardProject.findMany();

  if (!request) {
    throw new TRPCError({ code: 'NOT_FOUND' });
  }

  return request;
};
