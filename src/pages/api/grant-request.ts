// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import HttpCodes from 'http-status-codes';

import sendMail, { createFormattedMessage, OUR_EMAIL } from '../../lib/mail';
import { errorBody } from '../../lib/helpers/api';

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
    await sendMail({
      to: OUR_EMAIL,
      from: email,
      subject: `Grant request from ${name}`,
      html: createFormattedMessage(req.body as Record<string, string>),
    });
  } catch (e: unknown) {
    return res.status((e as Response).status).json({});
  }

  res.status(HttpCodes.OK).json({});
};

export default handler;
