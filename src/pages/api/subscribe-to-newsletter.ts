import HttpCodes from 'http-status-codes';

import { subscribeToNewsletter } from '../../lib/mailchimp';
import { errorBody } from '../../lib/helpers/api';

import type { NextApiHandler } from 'next';

interface NewsletterSubscriptionQuery {
  email: string;
}

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== 'POST') {
    return res
      .status(HttpCodes.NOT_IMPLEMENTED)
      .json(errorBody(HttpCodes.NOT_IMPLEMENTED));
  }

  const email = (req.body as NewsletterSubscriptionQuery).email;

  if (!email) {
    return res
      .status(HttpCodes.BAD_REQUEST)
      .json(errorBody(HttpCodes.BAD_REQUEST));
  }
  try {
    await subscribeToNewsletter(email);
  } catch (e: unknown) {
    const error = e as any;
    return res.status(error.status).json(errorBody(error.status));
  }

  return res.status(HttpCodes.OK).json({});
};

export default handler;
