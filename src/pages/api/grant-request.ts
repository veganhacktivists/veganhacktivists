// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import HttpCodes from 'http-status-codes';

import emailClient, {
  createFormattedHTMLMessage,
  createFormattedTextMessage,
} from '../../lib/mail';
import { OUR_EMAIL_TO } from '../../lib/mail/router';
import { errorBody } from '../../lib/helpers/api';
import { grantRequestEmail } from '../../components/layout/mail/emailTemplates';

import type { NextApiHandler } from 'next';

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

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== 'POST') {
    return res
      .status(HttpCodes.NOT_IMPLEMENTED)
      .json(errorBody(HttpCodes.NOT_IMPLEMENTED));
  }

  const { name, email } = req.body as GrantsForm;

  try {
    await emailClient.sendMail({
      to: OUR_EMAIL_TO,
      from: email,
      subject: `Grant request from ${name}`,
      text: createFormattedTextMessage(req.body as Record<string, string>),
      html: grantRequestEmail(
        createFormattedHTMLMessage(req.body as Record<string, string>),
      ),
    });
  } catch (e: unknown) {
    return res.status((e as Response).status).json({});
  }

  res.status(HttpCodes.OK).json({});
};

export default handler;
