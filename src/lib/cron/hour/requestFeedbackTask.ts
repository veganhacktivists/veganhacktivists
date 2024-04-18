import { ApplicationStatus, RequestStatus } from '@prisma/client';

import prisma from '../../db/prisma';

import { playgroundRequestFeedbackAboutVolunteerAfter1Week } from 'components/layout/mail/emailTemplates';
import emailClient from 'lib/mail';
import { PLAYGROUND_EMAIL_FORMATTED } from 'lib/mail/router';

import type { PlaygroundRequest } from '@prisma/client';

const WEEK_IN_MS = 7 * 24 * 60 * 60 * 1000;

export async function requestPlaygroundApplicantFeedbackTask() {
  const oneWeekAgo = new Date(Date.now() - WEEK_IN_MS);

  const applicationsReadyForFeedback =
    await prisma.playgroundApplication.findMany({
      where: {
        acceptedAt: {
          lte: oneWeekAgo,
        },
        status: ApplicationStatus.Accepted,
        feedbackRequested: false,
        request: {
          status: RequestStatus.Accepted,
        },
      },
      select: {
        id: true,
        name: true,
        request: {
          select: {
            id: true,
            name: true,
            title: true,
            providedEmail: true,
          },
        },
      },
    });

  const result = await Promise.allSettled(
    applicationsReadyForFeedback.map(async (application) => {
      await sendFeedbackRequestEmail(application.request, application.name);

      await prisma.playgroundApplication.update({
        where: {
          id: application.id,
        },
        data: {
          feedbackRequested: true,
        },
      });
    }),
  );

  const successfulFeedbackRequests = result.filter(
    (promise) => promise.status === 'fulfilled',
  ).length;
  const failedFeedbackRequests =
    applicationsReadyForFeedback.length - successfulFeedbackRequests;

  if (failedFeedbackRequests > 0) {
    // eslint-disable-next-line no-console
    console.error(
      `requestPlaygroundApplicantFeedbackTask: failed to send ${failedFeedbackRequests} emails`,
    );
  }
}

const sendFeedbackRequestEmail = (
  request: Pick<PlaygroundRequest, 'name' | 'title' | 'providedEmail'>,
  applicantName: string,
) => {
  if (process.env.NODE_ENV !== 'production') {
    return false;
  }
  return emailClient.sendMail({
    to: request.providedEmail,
    from: PLAYGROUND_EMAIL_FORMATTED,
    subject: 'Please let us know how it’s going with the Playground volunteer!',
    text: playgroundRequestFeedbackAboutVolunteerAfter1Week(
      request,
      applicantName,
      true,
    ),
    html: playgroundRequestFeedbackAboutVolunteerAfter1Week(
      request,
      applicantName,
    ),
  });
};
