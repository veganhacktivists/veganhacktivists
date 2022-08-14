import Mailgun from 'mailgun.js';
import formData from 'form-data';

import { firstLetterUppercase } from '../helpers/strings';

import type { MailgunMessageData } from 'mailgun.js/interfaces/Messages';

import type MailgunClient from 'mailgun.js/client';

const DOMAIN = 'veganhacktivists.org';

class EmailClient {
  private mg: MailgunClient;
  constructor(mg: MailgunClient) {
    this.mg = mg;
  }

  async sendMail(data: Email) {
    return await this.mg.messages.create(DOMAIN, {
      ...data,
      from: data.from ?? OUR_EMAIL_FORMATTED,
    });
  }
}

type Email = MailgunMessageData & {
  to: string | string[];
  subject: string;
  html: string;
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

export const OUR_EMAIL = 'hello@veganhacktivists.org' as const;
export const OUR_EMAIL_FORMATTED = `Vegan Hacktivists <${OUR_EMAIL}>` as const;

const emailClient = new EmailClient(
  new Mailgun(formData).client({
    username: 'api',
    key: process.env.MAILGUN_API_KEY || '',
  })
);

export default emailClient;
