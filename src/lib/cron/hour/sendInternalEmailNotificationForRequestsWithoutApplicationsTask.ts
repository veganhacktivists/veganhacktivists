import { RequestStatus } from '@prisma/client';
import { PlaygroundRequestCategory } from '@prisma/client';

import prisma from '../../db/prisma';

import { playgroundInternalNotificationForRequestsWithoutApplications } from 'components/layout/mail/emailTemplates';
import {
  JAMES_EMAIL_FORMATTED,
  KATE_EMAIL_FORMATTED,
  PLAYGROUND_EMAIL_FORMATTED,
} from 'lib/mail/router';
import emailClient from 'lib/mail';

import type { PlaygroundRequest } from '@prisma/client';

const FOURTEEN_DAYS_IN_MS = 14 * 24 * 60 * 60 * 1000;

export async function sendInternalEmailNotificationForRequestsWithoutApplicationsTask() {
  const startTimeStamp = Date.now();
  console.info(
    'enter sendInternalEmailNotificationForRequestsWithoutApplicationsTask',
    startTimeStamp
  );

  const fourteenDaysAgo = new Date(Date.now() - FOURTEEN_DAYS_IN_MS);

  const activeRequests = await prisma.playgroundRequest.findMany({
    where: {
      acceptedAt: {
        lte: fourteenDaysAgo,
      },
      status: RequestStatus.Accepted,
      noApplicationsNotificationEmailSent: false,
      category: {
        in: [
          PlaygroundRequestCategory.Designer,
          PlaygroundRequestCategory.Developer,
        ],
      },
    },
    include: {
      _count: {
        select: {
          applications: true,
        },
      },
    },
  });

  const activeRequestsWithoutApplications = activeRequests.filter(
    (request) => !request._count.applications
  );

  const results = await Promise.all(
    activeRequestsWithoutApplications.map(async (request) => {
      try {
        const success = await sendInternalEmailForRequestsWithoutApplications(
          request
        );
        if (!success) {
          return false;
        }
      } catch (error) {
        console.error(
          'sendInternalEmailNotificationForRequestsWithoutApplicationsTask: sendInternalEmailForRequestsWithoutApplications failed for request',
          request,
          error
        );

        return false;
      }

      try {
        await prisma.playgroundRequest.update({
          where: {
            id: request.id,
          },
          data: {
            noApplicationsNotificationEmailSent: true,
          },
        });

        return true;
      } catch (error) {
        console.error(
          'sendInternalEmailNotificationForRequestsWithoutApplicationsTask: update db noApplicationsNotificationEmailSent failed for request',
          request,
          error
        );

        return false;
      }
    })
  );

  const successfulRejections = results.filter(Boolean).length;
  const failedRejections = results.length - successfulRejections;

  console.info(
    'exit sendInternalEmailNotificationForRequestsWithoutApplicationsTask',
    `successfully sent ${successfulRejections} emails.`,
    `failed to send ${failedRejections} emails,`,
    startTimeStamp
  );
}

const sendInternalEmailForRequestsWithoutApplications = async (
  request: Pick<
    PlaygroundRequest,
    'id' | 'title' | 'description' | 'category' | 'acceptedAt' | 'createdAt'
  >
) => {
  if (process.env.NODE_ENV !== 'production') {
    return false;
  }

  const sendToMap: Partial<Record<PlaygroundRequestCategory, string>> = {
    Designer: KATE_EMAIL_FORMATTED,
    Developer: JAMES_EMAIL_FORMATTED,
  };

  if (!(request.category in sendToMap)) {
    return false;
  }

  const result = await emailClient.sendMail({
    to: sendToMap[request.category],
    from: PLAYGROUND_EMAIL_FORMATTED,
    subject: 'Reminder for an unanswered playground request',
    text: playgroundInternalNotificationForRequestsWithoutApplications(
      request,
      true
    ),
    html: playgroundInternalNotificationForRequestsWithoutApplications(request),
  });

  return result === true;
};
