import { RequestStatus } from '@prisma/client';

import prisma from '../../db/prisma';

import { playgroundRequestRejectedDueToInactivity } from 'components/layout/mail/emailTemplates';
import emailClient from 'lib/mail';
import { PLAYGROUND_EMAIL_FORMATTED } from 'lib/mail/router';

import type { PlaygroundRequest } from '@prisma/client';

const THIRTY_DAYS_IN_MS = 30 * 24 * 60 * 60 * 1000;

export async function rejectOldRequestsWithoutApplicantsTask() {
  const oldRequests = await prisma.playgroundRequest.findMany({
    where: {
      createdAt: {
        lte: new Date(Date.now() - THIRTY_DAYS_IN_MS),
      },
      status: {
        equals: RequestStatus.Accepted,
      },
    },
    select: {
      id: true,
      name: true,
      title: true,
      providedEmail: true,
      _count: {
        select: {
          applications: true,
        },
      },
    },
  });

  const oldRequestsWithoutApplications = oldRequests.filter(
    (request) => !request._count.applications
  );

  oldRequestsWithoutApplications.forEach(async (request) => {
    await sendAutomaticallyRejectedEmail(request);

    await prisma.playgroundRequest.update({
      where: {
        id: request.id,
      },
      data: {
        status: RequestStatus.Rejected,
      },
    });
  });
}

const sendAutomaticallyRejectedEmail = (
  request: Pick<PlaygroundRequest, 'id' | 'name' | 'title' | 'providedEmail'>
) => {
  if (process.env.NODE_ENV !== 'production') {
    return true;
  }
  return emailClient.sendMail({
    to: request.providedEmail,
    from: PLAYGROUND_EMAIL_FORMATTED,
    subject: 'Your request for help in "VH: Playground" has been closed!',
    text: playgroundRequestRejectedDueToInactivity(request, true),
    html: playgroundRequestRejectedDueToInactivity(request),
  });
};
