import type { AxiosResponse } from 'axios';
import axios from 'axios';

const MAILGUN_URL = 'https://api.mailgun.net/v3/veganhacktivists.org/messages';

interface Email {
  to: string;
  from: string;
  subject: string;
  html: string;
}

const sendMail: (data: Email) => Promise<AxiosResponse<Email>> = async (
  data
) => {
  return await axios.request({
    url: MAILGUN_URL,
    method: 'POST',
    auth: {
      username: 'api',
      password: process.env.MAILGUN_API_KEY || '',
    },
    params: data,
  });
};

export const createFormattedMessage: (data: Record<string, string>) => string =
  (data) => {
    return Object.entries(data)
      .map(([field, value]) => {
        return `<b>${
          field.charAt(0).toUpperCase() + field.slice(1)
        }:</b><br/>${`${value}`.split('\n').join('<br/>')}`;
      })
      .join('<br/>');
  };

export const OUR_EMAIL = 'hello@veganhacktivists.org';

export default sendMail;
