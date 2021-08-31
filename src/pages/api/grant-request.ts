// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiHandler } from 'next';
import sendMail, { OUR_EMAIL } from '../../lib/mail';
import HttpCodes from 'http-status-codes';

export interface GrantsForm {
  // Section A - About you
  over18: boolean;
  gender?: string;
  location: string;
  info: string;
  name: string;
  email: string;

  // Section B - Your Project
  projectName: string;
  projectInfo: string;
  projectLocation: string;
  projectSteps: string;
  targetAudience: string;

  // Section C - Success
  howSuccessful: string;
  otherOrgs: string;

  // Section D - Budget
  totalBudget: number;
  appliedBudget: number;
  fundsUsage: string;
  canAcceptFunding: boolean;
}

const createFormattedMessage: (data: Record<string, string>) => string = (
  data
) => {
  return Object.entries(data)
    .map(([field, value]) =>
      value.split
        ? `<b>${field.charAt(0).toUpperCase() + field.slice(1)}:</b><br/>${value
            .split('\n')
            .join('<br/>')}`
        : value
    )
    .join('<br/>');
};

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(HttpCodes.NOT_IMPLEMENTED).end();
  }

  const { name, email }: GrantsForm = req.body;

  try {
    await sendMail({
      to: OUR_EMAIL,
      from: email,
      subject: `Grant request from ${name}`,
      html: createFormattedMessage(req.body),
    });
  } catch (e) {
    return res.status(e.response.status).json({});
  }

  res.status(HttpCodes.OK).end();
};

export default handler;
