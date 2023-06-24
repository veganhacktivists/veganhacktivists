/* eslint-disable */
import HttpCodes from 'http-status-codes';
import { faker } from '@faker-js/faker';
import { PlaygroundRequestCategory } from '@prisma/client';

import {
  contactUsEmail,
  grantRequestEmail,
  playgroundApplicantIntroductionEmail,
  playgroundApplicationDenialEmail,
  playgroundRequestApplicationEmail,
  playgroundRequestApprovalEmail,
  playgroundRequestDenialEmail,
  playgroundRequestRejectedDueToInactivity,
  playgroundReviewRequestEmail,
  verificationMail,
  verifyRequestEmail,
} from 'components/layout/mail/emailTemplates';
import emailClient, {
  createFormattedHTMLMessage,
  createFormattedTextMessage,
} from 'lib/mail';
import {
  OUR_EMAIL_FROM,
  OUR_EMAIL_FROM_FORMATTED,
  PLAYGROUND_EMAIL_FORMATTED,
} from 'lib/mail/router';

import type { NextApiHandler } from 'next';

const testEmailAdress = 'mats.email.spam.test.vh@gmail.com';

const emails = [
  {
    name: 'sendVerificationEmail',
    send: () => sendVerificationEmail(),
  },
  {
    name: 'sendVerifyRequestEmail',
    send: () => sendVerifyRequestEmail(),
  },
  {
    name: 'sendGrantRequestEmail',
    send: () => sendGrantRequestEmail(),
  },
  {
    name: 'sendContactUsEmail',
    send: () => sendContactUsEmail(),
  },
  {
    name: 'sendPlaygroundRequestApplicationEmail',
    send: () => sendPlaygroundRequestApplicationEmail(),
  },
  {
    name: 'sendPlaygroundReviewRequestEmail',
    send: () => sendPlaygroundReviewRequestEmail(),
  },
  {
    name: 'sendApplicantIntroductionEmail',
    send: () => sendApplicantIntroductionEmail(),
  },
  {
    name: 'sendApplicationDenialEmail',
    send: () => sendApplicationDenialEmail(),
  },
  {
    name: 'sendDenialEmail',
    send: () => sendDenialEmail(),
  },
  {
    name: 'sendAcceptedEmail',
    send: () => sendAcceptedEmail(),
  },
  {
    name: 'sendAutomaticallyRejectedEmail',
    send: () => sendAutomaticallyRejectedEmail(),
  },
];

let lastSent = 0;

const emailSendTimeout = 1000;

const handler: NextApiHandler = async (_req, res) => {
  if (lastSent + 1000 * 60 * 30 > Date.now()) {
    console.warn("can't send test emails right now");
    return;
  }

  lastSent = Date.now();

  for (const email of emails) {
    try {
      await email.send();
      console.log(`sent spam test email ${email.name}`);
    } catch (error) {
      console.error(`failed to send spam test email ${email.name}`, error);
    }

    await new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, emailSendTimeout);
    });
  }

  return res.status(HttpCodes.OK).end();
};

export default handler;

const sendVerificationEmail = () => {
  const getMailBody = verificationMail;

  return emailClient.sendMail({
    to: testEmailAdress,
    from: OUR_EMAIL_FROM_FORMATTED,
    subject: 'Vegan Hacktivists Playground login',
    text: getMailBody('url', true),
    html: getMailBody('url'),
  });
};

const sendVerifyRequestEmail = () => {
  const getMailBody = verifyRequestEmail;

  return emailClient.sendMail({
    to: testEmailAdress,
    from: OUR_EMAIL_FROM_FORMATTED,
    subject: 'Vegan Hacktivists Playground login',
    text: getMailBody('url', true),
    html: getMailBody('url'),
  });
};

const sendGrantRequestEmail = () => {
  const body = {
    calendlyUrl: faker.internet.url(),
    category: faker.helpers.objectValue(PlaygroundRequestCategory),
    description: `${faker.hacker.phrase()} ${faker.lorem.paragraphs(
      faker.datatype.number(5)
    )}`,
  };
  return emailClient.sendMail({
    to: testEmailAdress,
    from: OUR_EMAIL_FROM,
    subject: 'Grant request from name',
    text: createFormattedTextMessage(body),
    html: grantRequestEmail(createFormattedHTMLMessage(body)),
  });
};

const sendContactUsEmail = () =>
  emailClient.sendMail({
    to: testEmailAdress,
    from: OUR_EMAIL_FROM,
    subject: 'Contact about service from name',
    text: createFormattedTextMessage({
      name: 'name',
      email: testEmailAdress,
      service: 'service',
      message: 'message',
    }),
    html: contactUsEmail(
      createFormattedHTMLMessage({
        name: 'name',
        email: testEmailAdress,
        service: 'service',
        message: 'message',
      })
    ),
  });

const sendPlaygroundRequestApplicationEmail = () =>
  emailClient.sendMail({
    to: testEmailAdress,
    from: PLAYGROUND_EMAIL_FORMATTED,
    subject: 'New Playground Application',
    text: playgroundRequestApplicationEmail(true),
    html: playgroundRequestApplicationEmail(),
  });

const sendPlaygroundReviewRequestEmail = () =>
  emailClient.sendMail({
    to: testEmailAdress,
    from: PLAYGROUND_EMAIL_FORMATTED,
    subject: 'New Playground Request',
    text: playgroundReviewRequestEmail(true),
    html: playgroundReviewRequestEmail(),
  });

const sendApplicantIntroductionEmail = () => {
  const application = {
    calendlyUrl: 'calendlyUrl application',
    name: 'application name',
    request: {
      calendlyUrl: 'calendlyUrl request',
      name: 'request name',
      title: 'request title',
    },
  };

  return emailClient.sendMail({
    to: testEmailAdress,
    from: PLAYGROUND_EMAIL_FORMATTED,
    subject: `We'd like to introduce ${application.name}, from VH: Playground!`,
    text: playgroundApplicantIntroductionEmail(
      application,
      'optionalMessageParts',
      true
    ),
    html: playgroundApplicantIntroductionEmail(
      application,
      'optionalMessageParts'
    ),
  });
};

const sendApplicationDenialEmail = () =>
  emailClient.sendMail({
    to: testEmailAdress,
    from: PLAYGROUND_EMAIL_FORMATTED,
    subject:
      'Thanks so much for submitting your request to support with Playground!',
    text: playgroundApplicationDenialEmail(true),
    html: playgroundApplicationDenialEmail(),
  });

const sendDenialEmail = () => {
  return emailClient.sendMail({
    to: testEmailAdress,
    from: PLAYGROUND_EMAIL_FORMATTED,
    subject: 'Thanks so much for submitting your request to Playground!',
    text: playgroundRequestDenialEmail(true),
    html: playgroundRequestDenialEmail(),
  });
};

const sendAcceptedEmail = () => {
  const request = {
    id: 'test-id',
    name: 'test request name',
    providedEmail: testEmailAdress,
  };
  return emailClient.sendMail({
    to: request.providedEmail,
    from: PLAYGROUND_EMAIL_FORMATTED,
    subject: 'Your request is now live on Playground!',
    text: playgroundRequestApprovalEmail(request, true),
    html: playgroundRequestApprovalEmail(request),
  });
};

const sendAutomaticallyRejectedEmail = () => {
  const request = {
    id: 'test-id',
    name: 'test request name',
    providedEmail: testEmailAdress,
    title: 'request title',
  };
  return emailClient.sendMail({
    to: request.providedEmail,
    from: PLAYGROUND_EMAIL_FORMATTED,
    subject: 'Your request for help in "VH: Playground" has been closed!',
    text: playgroundRequestRejectedDueToInactivity(request, true),
    html: playgroundRequestRejectedDueToInactivity(request),
  });
};
