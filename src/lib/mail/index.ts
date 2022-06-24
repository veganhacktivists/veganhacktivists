import Mailgun from 'mailgun.js';
import { firstLetterUppercase } from '../helpers/strings';
import formData from 'form-data';
import type { MessagesSendResult } from 'mailgun.js/interfaces/Messages';

const DOMAIN = 'veganhacktivists.org';

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY || '',
});

interface Email {
  to: string;
  from: string;
  subject: string;
  html: string;
}

const sendMail: (data: Email) => Promise<MessagesSendResult> = async (data) => {
  return await mg.messages.create(DOMAIN, data);
};

export const createFormattedMessage: (
  data: Record<string, string>
) => string = (data) => {
  return Object.entries(data)
    .map(([field, value]) => {
      return `<b>${firstLetterUppercase(field)}:</b><br/>${`${value}`
        .split('\n')
        .join('<br/>')}`;
    })
    .join('<br/>');
};

export const OUR_EMAIL = 'hello@veganhacktivists.org';

export default sendMail;
