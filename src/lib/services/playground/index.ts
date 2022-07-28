import prisma from 'lib/db/prisma';

import type { User } from '@prisma/client';

import type {
  applyToRequestSchema,
  getPlaygroundRequestsSchema,
  getRequestByIdSchema,
} from './schemas';

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
      ...params,
      isApproved: true,
    },
  });

  return requests;
};

export const getRequestById = async (
  id: z.infer<typeof getRequestByIdSchema>,
  userId?: User['id']
) => {
  const [request, userAlreadyApplied] = await Promise.all([
    prisma.playgroundRequest.findFirstOrThrow({
      where: {
        id,
        isApproved: true,
      },
      include: {
        requester: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    }),
    !!userId &&
      prisma.playgroundApplication
        .count({
          where: {
            applicantId: userId,
          },
        })
        .then((count) => count > 0),
  ]);

  const isRequestedByCurrentUser = request.requester.id === userId;

  return { ...request, isRequestedByCurrentUser, userAlreadyApplied };
};

export const applyToHelp = async (
  params: z.infer<typeof applyToRequestSchema> & { requesterId: string }
) => {
  const newRequest = await prisma.playgroundApplication.create({
    data: {
      ...params,
      applicantId: params.requesterId,
    },
  });
  return newRequest;
};
