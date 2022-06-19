import NextAuth from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import GithubProvider from 'next-auth/providers/github';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '../../../lib/db/prisma';

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    // GithubProvider({}),
    EmailProvider({}),
  ],
  pages: {
    signIn: '/auth/signin',
  },
});
