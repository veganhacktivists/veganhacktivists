import NextAuth from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

import {
  verificationMail,
  verifyRequestEmail,
} from '../../../components/layout/mail/emailTemplates';
import { OUR_EMAIL_FROM_FORMATTED } from '../../../lib/mail/router';

import emailClient from 'lib/mail';
import prisma from 'lib/db/prisma';

import type { SendVerificationRequestParams } from 'next-auth/providers/email';
import type { NextAuthOptions } from 'next-auth';

const sendVerificationRequest = async (
  params: SendVerificationRequestParams
) => {
  const { identifier, url } = params;
  const { searchParams } = new URL(url);
  // the current url
  const callbackUrl = searchParams.get('callbackUrl');
  const getMailBody = callbackUrl?.includes('signin')
    ? verificationMail
    : verifyRequestEmail;

  await emailClient.sendMail({
    to: identifier,
    from: OUR_EMAIL_FROM_FORMATTED,
    subject: 'Vegan Hacktivists Playground login',
    text: getMailBody(url, true),
    html: getMailBody(url),
  });
};

export const nextAuthOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'database',
    updateAge: 60 * 60,
  },
  providers: [
    EmailProvider({
      name: 'magic link',
      server: process.env.EMAIL_SERVER_URL,
      from: OUR_EMAIL_FROM_FORMATTED,
      sendVerificationRequest,
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    verifyRequest: '/auth/verify-request',
  },
  callbacks: {
    session: ({ session, user: { id, role, name, email } }) => {
      session.user = { id, role, name, email };

      return session;
    },
  },
};

export default NextAuth(nextAuthOptions);
