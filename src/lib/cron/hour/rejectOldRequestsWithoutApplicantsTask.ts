import { ApplicationStatus, RequestStatus } from '@prisma/client';

import prisma from '../../db/prisma';

import { playgroundRequestRejectedDueToInactivity } from 'components/layout/mail/emailTemplates';
import emailClient from 'lib/mail';
import { PLAYGROUND_EMAIL_FORMATTED, PLAYGROUND_TO_CC } from 'lib/mail/router';

import type { PlaygroundRequest } from '@prisma/client';

const THIRTY_DAYS_IN_MS = 30 * 24 * 60 * 60 * 1000;

export async function rejectOldRequestsWithoutApplicantsTask() {
  const thirtyDaysAgo = new Date(Date.now() - THIRTY_DAYS_IN_MS);

  const oldRequests = await prisma.playgroundRequest.findMany({
    where: {
      acceptedAt: {
        lte: thirtyDaysAgo,
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
          applications: {
            where: {
              status: {
                equals: ApplicationStatus.Accepted,
              },
            },
          },
        },
      },
    },
  });

  const oldRequestsWithoutApplications = oldRequests.filter(
    (request) => !request._count.applications,
  );

  await Promise.all(
    oldRequestsWithoutApplications.map(async (request) => {
      const success = await sendAutomaticallyRejectedEmail(request);
      if (!success) {
        return false;
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

        return true;
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(
          'rejectOldRequestsWithoutApplicantsTask: status update failed for request',
          request,
          error,
        );

        return false;
      }
    }),
  );
}

const sendAutomaticallyRejectedEmail = async (
  request: Pick<PlaygroundRequest, 'id' | 'name' | 'title' | 'providedEmail'>,
) => {
  if (process.env.NODE_ENV !== 'production') {
    return false;
  }

  try {
    await emailClient.sendMail({
      to: request.providedEmail,
      from: PLAYGROUND_EMAIL_FORMATTED,
      cc: PLAYGROUND_TO_CC,
      subject: 'Your request for help in "VH: Playground" has been closed!',
      text: playgroundRequestRejectedDueToInactivity(request, true),
      html: playgroundRequestRejectedDueToInactivity(request),
    });

    return true;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(
      'rejectOldRequestsWithoutApplicantsTask: sendAutomaticallyRejectedEmail failed for request',
      request,
      error,
    );

    return false;
  }
};
