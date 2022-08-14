import HttpCodes from 'http-status-codes';

import emailClient, { createFormattedMessage, OUR_EMAIL } from '../../lib/mail';
import { errorBody } from '../../lib/helpers/api';

import { determineEmailRecipients } from 'lib/mail/router';

import type { NextApiHandler } from 'next';

export type Service = 'Website' | 'Project' | 'Funding' | 'Advice';

export interface ContactUsSubmission {
  name: string;
  email: string;
  service: Service;
  message: string;
}

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== 'POST') {
    return res
      .status(HttpCodes.NOT_IMPLEMENTED)
      .json(errorBody(HttpCodes.NOT_IMPLEMENTED));
  }

  const { name, email, service, message } = req.body as ContactUsSubmission;

  try {
    await emailClient.sendMail({
      to: OUR_EMAIL,
      cc: determineEmailRecipients(message).join(','),
      from: email,
      subject: `Contact about ${service} from ${name}`,
      html: createFormattedMessage({
        name,
        email,
        service,
        message,
      }),
    });
  } catch (e: unknown) {
    return res.status((e as Response).status).json({});
  }

  res.status(HttpCodes.OK).json({});
};

export default handler;
