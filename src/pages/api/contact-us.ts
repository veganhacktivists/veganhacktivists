// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiHandler } from 'next';
import sendMail, { createFormattedMessage, OUR_EMAIL } from '../../lib/mail';
import HttpCodes from 'http-status-codes';

export type Service = 'Website' | 'Project' | 'Funding' | 'Advice';

export interface ContactUsSubmission {
  name: string;
  email: string;
  service: Service;
  message: string;
}

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(HttpCodes.NOT_IMPLEMENTED).end();
  }

  const { name, email, service, message }: ContactUsSubmission = req.body;

  try {
    await sendMail({
      to: OUR_EMAIL,
      from: email,
      subject: `Contact about ${service} from ${name}`,
      html: createFormattedMessage({
        name,
        email,
        service,
        message,
      }),
    });
  } catch (e) {
    return res.status(e.response.status).end();
  }

  res.status(HttpCodes.OK).end();
};

export default handler;
