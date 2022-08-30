import { TRPCError } from '@trpc/server';
import { Prisma, Status } from '@prisma/client';

import prisma from 'lib/db/prisma';
import emailClient, { OUR_EMAIL, PLAYGROUND_EMAIL_FORMATTED } from 'lib/mail';

import type { applyToRequestSchema, submitRequestSchema } from './schemas';
import type { Session } from 'next-auth';
import type {
  getPlaygroundRequestsSchema,
  getRequestByIdSchema,
} from './schemas';
import type { z } from 'zod';

export const getPlaygroundRequests = async ({
  sort,
  categories,
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
    },
    where: {
      ...params,
      category: {
        in: categories,
      },
      status: Status.Accepted,
      applications: {
        none: {
          status: Status.Accepted,
        },
      },
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
  try {
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

    await emailClient.sendMail({
      to: OUR_EMAIL,
      from: PLAYGROUND_EMAIL_FORMATTED,
      subject: 'New Playground Request',
      html: `A new applicant has applied to help in Playground!
      <br/><br/>
      Please <a href="https://veganhacktivists.org/playground/admin/applications">click here</a> to review the applicant's request to help in Playground.`,
    });

    return newRequest;
  } catch (e) {
    if (
      e instanceof Prisma.PrismaClientKnownRequestError &&
      e.code === 'P2002'
    ) {
      // Thanks, I hate this https://www.prisma.io/docs/reference/api-reference/error-reference#p2002
      throw new TRPCError({
        code: 'CONFLICT',
        message: 'You have already applied to this request',
        cause: e,
      });
    }
    throw e;
  }
};

export const submitRequest = async (
  params: z.infer<typeof submitRequestSchema> & { requesterId: string }
) => {
  const [newRequest] = await prisma.$transaction([
    prisma.playgroundRequest.create({
      data: {
        ...params,
        requesterId: params.requesterId,
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

  await emailClient.sendMail({
    to: OUR_EMAIL,
    from: PLAYGROUND_EMAIL_FORMATTED,
    subject: 'New Playground Request',
    html: `A new Request has been submitted to Playground for review!
    <br/><br/>
    Please <a href="https://veganhacktivists.org/playground/admin">click here</a> to review the request submitted to Playground.`,
  });

  return newRequest;
};
