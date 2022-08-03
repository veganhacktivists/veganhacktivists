import { Status } from '@prisma/client';

import prisma from 'lib/db/prisma';

import type { z } from 'zod';
import type {
  getPendingApplicationsSchema,
  getPendingRequestsSchema,
  setApplicationStatusSchema,
  setRequestStatusSchema,
} from './schemas';

export const getPendingApplications = async (
  params: z.infer<typeof getPendingApplicationsSchema>
) => {
  const applications = await prisma.playgroundApplication.findMany({
    where: {
      ...params,
      status: Status.Pending,
    },
    include: {
      request: true,
    },
  });

  return applications;
};

export const getPendingRequests = async (
  params: z.infer<typeof getPendingRequestsSchema>
) => {
  const applications = await prisma.playgroundRequest.findMany({
    where: {
      ...params,
      status: Status.Pending,
    },
    include: {
      requester: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  return applications;
};

export const setApplicationStatus = async ({
  id,
  status,
}: z.infer<typeof setApplicationStatusSchema>) => {
  const updatedApplication = await prisma.playgroundApplication.update({
    where: {
      id,
    },
    data: {
      status,
    },
  });
  return updatedApplication;
};

export const setRequestStatus = async ({
  id,
  status,
}: z.infer<typeof setRequestStatusSchema>) => {
  const updatedApplication = await prisma.playgroundApplication.update({
    where: {
      id,
    },
    data: {
      status,
    },
  });
  return updatedApplication;
};
