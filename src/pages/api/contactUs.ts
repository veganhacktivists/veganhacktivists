// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiHandler } from 'next';
import { createTransport } from 'nodemailer';

// This will only work if and only if the machine running it has sendmail binary and is configured properly
// Alternatively, we can use an SMTP server and set up credentials, or something like AWS SES as alternative
// transports. This in theory should all work though based on the above assumption.
const transporter = createTransport({
  sendmail: true,
  newline: 'unix',
  path: '/usr/sbin/sendmail',
});

export type Service = 'Website' | 'Project' | 'Funding' | 'Advice';

export type ContactUsSubmission = {
  name: string;
  email: string;
  service: Service;
  message: string;
};

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(501).end('Not Implemented'); // Not Implemented
    return;
  }

  const { name, email, service, message }: ContactUsSubmission = req.body;

  // TODO: Find out if we have any logging or error infrastructure to which we should explicitly catch and handle in some way?
  // If yes, then we can add a try-catch here and capture any error appropriately.
  await transporter.sendMail({
    from: `${name} <${email}>`,
    to: 'hello@veganhacktivists.org',
    subject: `New Contact about ${service} from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nService: ${service}\nMessage: ${message}`,
  });

  res.status(200).end();
};

export default handler;
