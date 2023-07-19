/* eslint-disable no-console */
import HttpCodes from 'http-status-codes';

import emailClient from '../../lib/mail';
import { playgroundRequestApprovalEmail } from '../../components/layout/mail/emailTemplates';

import type { NextApiHandler } from 'next';

const handler: NextApiHandler = async (_req, res) => {
  await emailClient.sendMail({
    to: 'nolmesilme@gufum.com',
    from: 'test@localhost',
    subject: 'Your request is now live on Playground!',
    text: playgroundRequestApprovalEmail(
      { id: 'testid', name: 'testName' },
      true
    ),
    html: playgroundRequestApprovalEmail({ id: 'testid', name: 'testName' }),
  });

  return res.status(HttpCodes.OK).end();
};

export default handler;
