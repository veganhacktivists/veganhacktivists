import { TRPCError } from '@trpc/server';
import { RequestStatus, UserRole } from '@prisma/client';

import { OUR_EMAIL_TO, PLAYGROUND_TO_CC } from '../../mail/router';
import { PLAYGROUND_EMAIL_FORMATTED } from '../../mail/router';
import {
  playgroundRequestApplicationEmail,
  playgroundReviewRequestEmail,
} from '../../../components/layout/mail/emailTemplates';

import prisma from 'lib/db/prisma';
import emailClient from 'lib/mail';

import type {
  applyToRequestSchema,
  getPlaygroundRequestsSchema,
  getRequestByIdSchema,
  submitRequestSchema,
} from './schemas';
import type { Session } from 'next-auth';
import type { z } from 'zod';

export const getPlaygroundRequests = async ({
  sort: orderBy,
  categories,
  isPaidRequest,
  ...params
}: z.infer<typeof getPlaygroundRequestsSchema>) => {
  const requests = await prisma.playgroundRequest.findMany({
    include: {
      requester: {
        select: {
          id: true,
          name: true,
        },
      },
      budget: {
        select: {
          quantity: true,
          type: true,
        },
      },
    },
    where: {
      ...params,
      ...(isPaidRequest === undefined
        ? {}
        : isPaidRequest
          ? { budget: { isNot: null } }
          : { budget: { is: null } }),
      category: {
        in: categories,
      },
      status: RequestStatus.Accepted,
    },
    orderBy,
  });

  return requests;
};

export const getRequestById = async (
  id: z.infer<typeof getRequestByIdSchema>,
  user?: Session['user'],
  extended = false
) => {
  let ownRequest = false;
  if (extended && user) {
    const authorizedRequest = await prisma.playgroundRequest.findFirst({
      where: {
        id,
        requesterId: user.id,
      },
    });
    ownRequest = !!authorizedRequest;
  }

  const request = await prisma.playgroundRequest.findFirst({
    where: {
      id,
      status: {
        in:
          user?.role === UserRole.Admin
            ? undefined
            : [RequestStatus.Accepted, RequestStatus.Rejected],
      },
    },
    select: {
      category: true,
      createdAt: true,
      dueDate: true,
      description: true,
      id: true,
      neededVolunteers: true,
      organization: true,
      requiredSkills: true,
      title: true,
      status: true,
      updatedAt: true,
      designRequestCurrentDesignExists: true,
      designRequestType: true,
      devRequestWebsiteUrl: true,
      requester:
        user?.role === UserRole.Admin || ownRequest
          ? true
          : {
              select: {
                id: true,
              },
            },
      budget: true,
      _count: {
        select: {
          applications: {
            where: { applicantId: user?.id },
          },
        },
      },
    },
  });

  if (!request) {
    throw new TRPCError({ code: 'NOT_FOUND' });
  }

  const userAlreadyApplied = user ? request._count.applications !== 0 : false;

  const isRequestedByCurrentUser = request.requester.id === user?.id;

  return { ...request, isRequestedByCurrentUser, userAlreadyApplied };
};

export const applyToHelp = async (
  params: z.infer<typeof applyToRequestSchema> & { applicantId: string }
) => {
  const newApplication = await prisma.playgroundApplication.create({
      data: {
        ...params,
      },
    });

  if (process.env.NODE_ENV === 'production') {
    await emailClient.sendMail({
      to: OUR_EMAIL_TO,
      cc: PLAYGROUND_TO_CC,
      from: PLAYGROUND_EMAIL_FORMATTED,
      subject: 'New Playground Application',
      text: playgroundRequestApplicationEmail(true),
      html: playgroundRequestApplicationEmail(),
    });
  }

  return newApplication;
};

export const updateRequest = async ({
  id,
  budget,
  requesterId,
  agreeToTerms,
  role,
  ...params
}: z.infer<typeof submitRequestSchema> & {
  requesterId: string;
  role: string;
}) => {
  const oldRequest = await prisma.playgroundRequest.findUnique({
    where: {
      id: id,
    },
    include: {
      budget: true,
    },
  });
  if (
    !oldRequest ||
    (oldRequest?.requesterId !== requesterId && role !== UserRole.Admin)
  ) {
    return null;
  }

  const shouldUpdate = oldRequest && budget && oldRequest.budget;
  const shouldCreate = oldRequest && budget && !oldRequest.budget;
  const shouldDelete = !shouldUpdate && !shouldCreate;

  const operation = {
    ...(shouldUpdate && {
      update: {
        ...budget,
      },
    }),
    ...(shouldCreate && {
      create: {
        ...budget,
      },
    }),
    ...(shouldDelete && {
      delete: !!oldRequest?.budget,
    }),
  };

  return await prisma.playgroundRequest.update({
    where: {
      id: id,
    },
    data: {
      ...params,
      budget: {
        ...operation,
      },
    },
    include: {
      budget: true,
    },
  });
};

export const submitRequest = async ({
  budget,
  requesterId,
  agreeToTerms,
  ...params
}: z.infer<typeof submitRequestSchema> & { requesterId: string }) => {
  const user = await prisma.user.findUnique({ where: { id: requesterId } });
  if (!user?.organizationId) {
    throw new Error('User does not belong to an organization');
  }
  const [newRequest] = await prisma.$transaction([
    prisma.playgroundRequest.create({
      data: {
        ...params,
        organization: {
          connect: {
            id: user.organizationId,
          },
        },
        requester: {
          connect: {
            id: requesterId,
          },
        },
        budget: {
          create: budget,
        },
      },
    }),
  ]);

  if (process.env.NODE_ENV === 'production') {
    await emailClient.sendMail({
      to: OUR_EMAIL_TO,
      cc: PLAYGROUND_TO_CC,
      from: PLAYGROUND_EMAIL_FORMATTED,
      subject: 'New Playground Request',
      text: playgroundReviewRequestEmail(true),
      html: playgroundReviewRequestEmail(),
    });
  }

  return newRequest;
};
