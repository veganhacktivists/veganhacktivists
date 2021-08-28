// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiHandler } from 'next';
import sendMail, { OUR_EMAIL } from '../../lib/mail';
import HttpCodes from 'http-status-codes';

export type Service = 'Website' | 'Project' | 'Funding' | 'Advice';

export interface ContactUsSubmission {
  name: string;
  email: string;
  service: Service;
  message: string;
}

const createFormattedMessage: (data: Record<string, string>) => string = (
  data
) => {
  return Object.entries(data)
    .map(
      ([field, value]) =>
        `<b>${field.charAt(0).toUpperCase() + field.slice(1)}:</b><br/>${value
          .split('\n')
          .join('<br/>')}`
    )
    .join('<br/>');
};

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(HttpCodes.NOT_IMPLEMENTED).end();
  }

  const { name, email, service, message }: ContactUsSubmission = req.body;

  try {
    await sendMail({
      to: OUR_EMAIL,
      from: OUR_EMAIL,
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
