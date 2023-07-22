import { ApplicationStatus } from '@prisma/client';

import prisma from '../../db/prisma';

import { playgroundRequestFeedbackAboutVolunteerAfter1Week } from 'components/layout/mail/emailTemplates';
import emailClient from 'lib/mail';
import {
  FLAVIA_EMAIL_FORMATTED,
  PLAYGROUND_EMAIL_FORMATTED,
} from 'lib/mail/router';

import type { PlaygroundRequest } from '@prisma/client';

const WEEK_IN_MS = 7 * 24 * 60 * 60 * 1000;

export async function requestPlaygroundApplicantFeedbackTask() {
  const startTimeStamp = Date.now();
  console.info('enter requestPlaygroundApplicantFeedbackTask', startTimeStamp);

  const oneWeekAgo = new Date(Date.now() - WEEK_IN_MS);

  const applicationsReadyForFeedback =
    await prisma.playgroundApplication.findMany({
      where: {
        acceptedAt: {
          lte: oneWeekAgo,
        },
        status: ApplicationStatus.Accepted,
        feedbackRequested: false,
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
    })
  );

  const successfulFeedbackRequests = result.filter(
    (promise) => promise.status === 'fulfilled'
  ).length;
  const failedFeedbackRequests =
    applicationsReadyForFeedback.length - successfulFeedbackRequests;

  console.info(
    'exit requestPlaygroundApplicantFeedbackTask',
    `successfully sent ${successfulFeedbackRequests} emails.`,
    `failed to send ${failedFeedbackRequests} emails,`,
    startTimeStamp
  );
}

const sendFeedbackRequestEmail = (
  request: Pick<PlaygroundRequest, 'name' | 'title' | 'providedEmail'>,
  applicantName: string
) => {
  if (process.env.NODE_ENV !== 'production') {
    return false;
  }
  return emailClient.sendMail({
    to: request.providedEmail,
    from: PLAYGROUND_EMAIL_FORMATTED,
    cc: FLAVIA_EMAIL_FORMATTED,
    subject: 'Please let us know how it’s going with the Playground volunteer!',
    text: playgroundRequestFeedbackAboutVolunteerAfter1Week(
      request,
      applicantName,
      true
    ),
    html: playgroundRequestFeedbackAboutVolunteerAfter1Week(
      request,
      applicantName
    ),
  });
};
