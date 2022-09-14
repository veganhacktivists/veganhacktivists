import { TRPCError } from '@trpc/server';
import { Status } from '@prisma/client';

import prisma from 'lib/db/prisma';
import emailClient, { OUR_EMAIL, PLAYGROUND_EMAIL_FORMATTED } from 'lib/mail';

<<<<<<< HEAD
import type { applyToRequestSchema, submitRequestSchema } from './schemas';
=======
import type { editRequestSchema } from './schemas';

import type { submitRequestSchema } from './schemas';
>>>>>>> 3a3309f1 (adds update-request functionality)
import type { Session } from 'next-auth';
import type {
  getPlaygroundRequestsSchema,
  getRequestByIdSchema,
} from './schemas';
import type { z } from 'zod';

export const getPlaygroundRequests = async ({
  sort,
  categories,
  isPaidRequest,
  ...params
}: z.infer<typeof getPlaygroundRequestsSchema>) => {
  const orderBy = sort
    ? Object.entries(sort).map(([key, value]) => ({
        [key]: value,
      }))
    : undefined;
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
      status: Status.Accepted,
    },
    orderBy,
  });

  return requests;
};

export const getRequestById = async (
  id: z.infer<typeof getRequestByIdSchema>,
  user?: Session['user']
) => {
  const request = await prisma.playgroundRequest.findFirst({
    where: {
      id,
      status: user?.role === 'Admin' ? undefined : Status.Accepted,
      applications: {
        ...(user?.role === 'Admin'
          ? {}
          : {
              none: {
                status: Status.Accepted,
              },
            }),
      },
    },
    include: {
      requester: true,
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

  const isRequestedByCurrentUser = request?.requester.id === user?.id;

  if (!request || (!isRequestedByCurrentUser && user?.role !== 'Admin')) {
    throw new TRPCError({ code: 'NOT_FOUND' });
  }

  const userAlreadyApplied = user ? request._count.applications !== 0 : false;

  return { ...request, isRequestedByCurrentUser, userAlreadyApplied };
};

export const applyToHelp = async (
  params: z.infer<typeof applyToRequestSchema> & { applicantId: string }
) => {
  const [newRequest] = await prisma.$transaction([
    prisma.playgroundApplication.create({
      data: {
        ...params,
        applicantId: params.applicantId,
      },
    }),
    prisma.user.update({
      where: {
        id: params.applicantId,
      },
      data: {
        name: params.name,
      },
    }),
  ]);

  if (process.env.NODE_ENV === 'production') {
    await emailClient.sendMail({
      to: OUR_EMAIL,
      from: PLAYGROUND_EMAIL_FORMATTED,
      subject: 'New Playground Application',
      html: `A new applicant has applied to help in Playground!
      <br/><br/>
      Please <a href="https://veganhacktivists.org/playground/admin/applications">click here</a> to review the applicant's request to help in Playground.`,
    });
  }

  return newRequest;
};

<<<<<<< HEAD
export const submitRequest = async ({
  budget,
  ...params
}: z.infer<typeof submitRequestSchema> & { requesterId: string }) => {
=======
export const editRequest = async (
  params: z.infer<typeof editRequestSchema> & { requesterId: string }
  // eslint-disable-next-line @typescript-eslint/require-await
) => {
  const [request] = await prisma.$transaction([
    prisma.playgroundRequest.update({
      where: {
        id: params.id,
      },
      data: {
        ...params,
      },
    }),
  ]);
  return request;
};

export const submitRequest = async (
  params: z.infer<typeof submitRequestSchema> & { requesterId: string }
) => {
>>>>>>> 3a3309f1 (adds update-request functionality)
  const [newRequest] = await prisma.$transaction([
    prisma.playgroundRequest.create({
      data: {
        ...params,
        requesterId: params.requesterId,
        budget: {
          create: budget,
        },
      },
    }),
    prisma.user.update({
      where: {
        id: params.requesterId,
      },
      data: {
        name: params.name,
      },
    }),
  ]);

  if (process.env.NODE_ENV === 'production') {
    await emailClient.sendMail({
      to: OUR_EMAIL,
      from: PLAYGROUND_EMAIL_FORMATTED,
      subject: 'New Playground Request',
      html: `A new Request has been submitted to Playground for review!
    <br/><br/>
    Please <a href="https://veganhacktivists.org/playground/admin">click here</a> to review the request submitted to Playground.`,
    });
  }

  return newRequest;
};
