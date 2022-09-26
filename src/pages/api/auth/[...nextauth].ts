import NextAuth from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

import { verificationMail } from '../../../components/layout/mail/emailTemplates';
import { OUR_EMAIL_FROM_FORMATTED } from '../../../lib/mail/router';

import emailClient from 'lib/mail';
import prisma from 'lib/db/prisma';

import type { SendVerificationRequestParams } from 'next-auth/providers/email';
import type { NextAuthOptions } from 'next-auth';

const sendVerificationRequest = async (
  params: SendVerificationRequestParams
) => {
  const { identifier, url } = params;
  const { host } = new URL(url);
  await emailClient.sendMail({
    to: identifier,
    from: OUR_EMAIL_FROM_FORMATTED,
    subject: 'Vegan Hacktivists Playground login',
    text: verificationMail(host, url, true),
    html: verificationMail(host, url),
  });
};

export const nextAuthOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
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
    jwt: ({ token, user }) => {
      if (user) {
        token.role = user.role;
        token.email = user.email;
        token.name = user.name;
        token.sub = user.id;
      }

      return token;
    },
    session: ({ session, token }) => {
      if (session?.user) {
        if (token.sub) {
          session.user.id = token.sub;
        }
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.role = token.role;
      }

      delete session.user?.image;
      return session;
    },
  },
};

export default NextAuth(nextAuthOptions);
