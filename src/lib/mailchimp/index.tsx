import * as mailchimp from '@mailchimp/mailchimp_marketing';
import { MD5 } from 'crypto-js';

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_ID,
});

const LIST_ID = process.env.MAILCHIMP_AUDIENCE_ID || '';
const TAG = 'VH Newsletter';

export const subscribeToNewsletter: (email: string) => Promise<void> = async (
  email
) => {
  const hash = MD5(email.toLowerCase()).toString();

  await mailchimp.lists.setListMember(LIST_ID, hash, {
    email_address: email,
    status_if_new: 'subscribed',
  });

  await mailchimp.lists.updateListMemberTags(LIST_ID, hash, {
    tags: [{ name: TAG, status: 'active' }],
  });
};
