import Mailgun from 'mailgun.js';
import formData from 'form-data';
import nodemailer from 'nodemailer';

import { firstLetterUppercase } from '../helpers/strings';

import { OUR_EMAIL_FROM_FORMATTED } from './router';

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
          from: data.from ?? OUR_EMAIL_FROM_FORMATTED,
        });
      };
    }
  }
}

type EmailDev = nodemailer.SendMailOptions;

type Email = MailgunMessageData &
  Required<Pick<MailgunMessageData, 'html' | 'to' | 'subject'>>;

export const createFormattedHTMLMessage: (
  data: Record<string, string>
) => string = (data) => {
  return Object.entries(data)
    .map(([field, value]) => {
      field = firstLetterUppercase(field);
      return `<b>${
        field.match(/[A-Z][a-z]+|[0-9]+/g)?.join(' ') ?? field
      }:</b> ${String(value).trim().split('\n').join('<br/>')}`;
    })
    .join('<br/>');
};

export const createFormattedTextMessage: (
  data: Record<string, string>
) => string = (data) => {
  return Object.entries(data)
    .map(([field, value]) => {
      field = firstLetterUppercase(field);
      return `${
        field.match(/[A-Z][a-z]+|[0-9]+/g)?.join(' ') ?? field
      }: ${String(value).trim()}`;
    })
    .join('\n');
};

const emailClient = new EmailClient(
  new Mailgun(formData).client({
    username: 'api',
    key: process.env.MAILGUN_API_KEY || '',
    url: process.env.MAILGUN_URL,
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
