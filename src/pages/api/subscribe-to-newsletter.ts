import type { NextApiHandler } from 'next';
import HttpCodes from 'http-status-codes';
import { subscribeToNewsletter } from '../../lib/mailchimp';
import { errorBody } from '../../lib/helpers/api';

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== 'POST') {
    return res
      .status(HttpCodes.NOT_IMPLEMENTED)
      .json(errorBody(HttpCodes.NOT_IMPLEMENTED));
  }

  const { email } = req.body;

  if (!email) {
    return res
      .status(HttpCodes.BAD_REQUEST)
      .json(errorBody(HttpCodes.BAD_REQUEST));
  }
  try {
    await subscribeToNewsletter(req.body.email);
  } catch (e) {
    return res.status(e.status).json(errorBody(e.status));
  }

  return res.status(HttpCodes.OK).json({});
};

export default handler;
