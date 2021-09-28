// lists.addListMember

import mailchimp from '@mailchimp/mailchimp_marketing';

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_ID,
});

const LIST_ID = process.env.MAILCHIMP_LIST_ID || '';

export const subscribeToNewsletter: (email: string) => Promise<void> = async (
  email
) => {
  mailchimp.lists.addListMember(LIST_ID, { email_address: email });
};
