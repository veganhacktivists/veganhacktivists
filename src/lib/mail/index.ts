import Mailgun from 'mailgun.js';
import formData from 'form-data';
import nodemailer from 'nodemailer';

import { firstLetterUppercase } from '../helpers/strings';

import type { Transporter } from 'nodemailer';
import type {
  MailgunMessageData,
  MessagesSendResult,
} from 'mailgun.js/interfaces/Messages';
import type MailgunClient from 'mailgun.js/client';

const DOMAIN = 'veganhacktivists.org';

class EmailClient {
  private mg: MailgunClient;
  private nm: Transporter;
  sendMail: (options: EmailDev | Email) => Promise<true | MessagesSendResult>;
  constructor(mg: MailgunClient, nm: Transporter) {
    this.mg = mg;
    this.nm = nm;
    if (process.env.NODE_ENV !== 'production') {
      this.sendMail = async (options) => {
        const data = options as EmailDev;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return await this.nm.sendMail(data);
      };
    } else {
      this.sendMail = async (options) => {
        const data = options as Email;
        return await this.mg.messages.create(DOMAIN, {
          ...data,
          from: data.from ?? OUR_EMAIL_FORMATTED,
        });
      };
    }
  }
}

type EmailDev = nodemailer.SendMailOptions;

type Email = MailgunMessageData &
  Required<Pick<MailgunMessageData, 'html' | 'to' | 'subject'>>;

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
export const PLAYGROUND_EMAIL = 'playground@veganhacktivists.org' as const;
export const PLAYGROUND_EMAIL_FORMATTED =
  `VH Playground <${PLAYGROUND_EMAIL}>` as const;

const emailClient = new EmailClient(
  new Mailgun(formData).client({
    username: 'api',
    key: process.env.MAILGUN_API_KEY || '',
  }),
  nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: parseInt(process.env.EMAIL_SERVER_PORT ?? '25'),
    secure: process.env.EMAIL_SERVER_TLS?.toLowerCase() === 'true',
    tls: {
      rejectUnauthorized: false,
    },
  })
);

export default emailClient;
