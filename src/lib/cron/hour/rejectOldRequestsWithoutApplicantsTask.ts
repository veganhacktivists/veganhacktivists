import { RequestStatus } from '@prisma/client';

import prisma from '../../db/prisma';

import { playgroundRequestRejectedDueToInactivity } from 'components/layout/mail/emailTemplates';
import emailClient from 'lib/mail';
import {
  FLAVIA_EMAIL_FORMATTED,
  PLAYGROUND_EMAIL_FORMATTED,
} from 'lib/mail/router';

import type { PlaygroundRequest } from '@prisma/client';

const THIRTY_DAYS_IN_MS = 30 * 24 * 60 * 60 * 1000;

export async function rejectOldRequestsWithoutApplicantsTask() {
  const startTimeStamp = Date.now();
  console.info('enter rejectOldRequestsWithoutApplicantsTask', startTimeStamp);

  const thirtyDaysAgo = new Date(Date.now() - THIRTY_DAYS_IN_MS);

  const oldRequests = await prisma.playgroundRequest.findMany({
    where: {
      OR: [
        {
          // TODO: remove in >30days
          // temporarily check updatedAt for backwards compatability
          updatedAt: {
            lte: thirtyDaysAgo,
          },
        },
        {
          acceptedAt: {
            lte: thirtyDaysAgo,
          },
        },
      ],
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
    try {
      await sendAutomaticallyRejectedEmail(request);
    } catch (error) {
      console.error(
        'rejectOldRequestsWithoutApplicantsTask: sendAutomaticallyRejectedEmail failed for request',
        request,
        error
      );
    }

    try {
      await prisma.playgroundRequest.update({
        where: {
          id: request.id,
        },
        data: {
          status: RequestStatus.Rejected,
        },
      });
    } catch (error) {
      console.error(
        'rejectOldRequestsWithoutApplicantsTask: status update failed for request',
        request,
        error
      );
    }
  });

  console.info('exit rejectOldRequestsWithoutApplicantsTask', startTimeStamp);
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
    cc: FLAVIA_EMAIL_FORMATTED,
    subject: 'Your request for help in "VH: Playground" has been closed!',
    text: playgroundRequestRejectedDueToInactivity(request, true),
    html: playgroundRequestRejectedDueToInactivity(request),
  });
};
