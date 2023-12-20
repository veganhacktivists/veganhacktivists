import NextAuth from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { UserRole } from '@prisma/client';

import {
  verificationMail,
  verifyRequestEmail,
} from '../../../components/layout/mail/emailTemplates';
import { OUR_EMAIL_FROM_FORMATTED } from '../../../lib/mail/router';

import emailClient from 'lib/mail';
import prisma from 'lib/db/prisma';

import type { NextApiHandler, NextApiRequest } from 'next';
import type { SendVerificationRequestParams } from 'next-auth/providers/email';
import type { NextAuthOptions } from 'next-auth';

const sendVerificationRequest = async (
  params: SendVerificationRequestParams,
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

const getPrismaAdapter = (req: NextApiRequest) => {
  const adapter = PrismaAdapter(prisma);

  const nextQuery = req.query.nextauth as string | undefined;

  if (!nextQuery) {
    return adapter;
  }

  if (
    nextQuery.includes('callback') &&
    // All this logic can probably be avoided with the profile callback of the other OAuth methods
    // So we're just going to apply it to the email login for now
    nextQuery.includes('email')
  ) {
    const callbackUrl = req.query.callbackUrl
      ? new URL(req.query.callbackUrl as string)
      : undefined;

    if (
      [UserRole.Applicant, UserRole.Requestor].includes(
        callbackUrl?.searchParams.get('role') as Exclude<UserRole, 'Admin'>,
      )
    ) {
      const role = callbackUrl?.searchParams.get('role') as Exclude<
        UserRole,
        'Admin'
      >;
      adapter.createUser = async (data) => {
        return await prisma.user.create({
          data: { ...data, role },
        });
      };
    }
  }

  return adapter;
};

export const getNextAuthOptions = (req: NextApiRequest): NextAuthOptions => ({
  adapter: getPrismaAdapter(req),
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
    jwt: async ({ token }) => {
      const user = await prisma.user.findUnique({
        where: {
          id: token.sub,
        },
      });

      if (user) {
        token.isRequestor =
          user.role === UserRole.Admin || user.role === UserRole.Requestor;
        token.isApplicant =
          user.role === UserRole.Admin || user.role === UserRole.Applicant;
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
        session.user.isApplicant = token.isApplicant;
        session.user.isRequestor = token.isRequestor;
      }

      delete session.user?.image;
      return session;
    },
  },
});

const handle: NextApiHandler = async (req, res) => {
  return await NextAuth(req, res, getNextAuthOptions(req));
};

export default handle;
