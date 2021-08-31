import axios from 'axios';

const MAILGUN_URL = 'https://api.mailgun.net/v3/veganhacktivists.org/messages';

interface Email {
  to: string;
  from: string;
  subject: string;
  html: string;
}

const sendMail: (data: Email) => Promise<void> = async (data) => {
  await axios.request({
    url: MAILGUN_URL,
    method: 'POST',
    auth: {
      username: 'api',
      password: process.env.MAILGUN_API_KEY || '',
    },
    params: data,
  });
};

export const OUR_EMAIL = 'quin.trinanes@gmail.com'; //'hello@veganhacktivists.org';

export default sendMail;
