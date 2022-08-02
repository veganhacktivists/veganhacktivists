import NextAuth from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

import { OUR_EMAIL } from 'lib/mail';
import prisma from 'lib/db/prisma';

import type { NextAuthOptions } from 'next-auth';

export const nextAuthOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  providers: [
    EmailProvider({
      name: 'magic link',
      server: process.env.EMAIL_SERVER_URL,
      from: `Vegan Hacktivists <${OUR_EMAIL}>`,
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    verifyRequest: '/auth/verify-request',
  },
  callbacks: {
    session: async ({ session, token }) => {
      // TODO: maybe don't use JWT. Or add conditionals to avoid doing this DB access
      const user = await prisma.user.findUniqueOrThrow({
        where: { id: token.sub },
        select: {
          isAdmin: true,
          name: true,
          email: true,
        },
      });
      if (session?.user) {
        if (token.sub) {
          session.user.id = token.sub;
        }
        session.user.name = user.name;
        session.user.email = user.email;
        session.user.isAdmin = user.isAdmin;
      }

      delete session.user?.image;
      return session;
    },
    jwt: ({ token, user }) => {
      if (user) {
        token.isAdmin = user.isAdmin;
      }

      return token;
    },
  },
};

export default NextAuth(nextAuthOptions);
