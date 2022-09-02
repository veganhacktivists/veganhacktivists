import NextAuth from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

import emailClient, { OUR_EMAIL_FORMATTED } from 'lib/mail';
import prisma from 'lib/db/prisma';

import type { SendVerificationRequestParams } from 'next-auth/providers/email';
import type { NextAuthOptions, Theme } from 'next-auth';

const sendVerificationRequest = async (
  params: SendVerificationRequestParams
) => {
  const { identifier, url, provider, theme } = params;
  const { host } = new URL(url);
  await emailClient.sendMail({
    to: identifier,
    from: OUR_EMAIL_FORMATTED,
    subject: 'Vegan Hacktivists Playground login',
    text: text({ url, host }),
    html: verificationHtml({ url, host, theme }),
  });
};

function verificationHtml(params: { url: string; host: string; theme: Theme }) {
  const { url, host, theme } = params;

  return `
<body style="background: lightgray">
  <table width="100%" border="0" cellspacing="20" cellpadding="0"
    style="background: gray; max-width: 600px; margin: auto; border-radius: 10px;">
    <tr>
      <td align="center"
        style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif;">
        Sign in to <strong>${host}</strong>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center" style="border-radius: 5px;" ><a href="${url}"
                target="_blank"
                style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid display: inline-block; font-weight: bold;">Sign
                in</a></td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td align="center"
        style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif;">
        If you did not request this email you can safely ignore it.
      </td>
    </tr>
  </table>
</body>
`;
}

/** Email Text body (fallback for email clients that don't render HTML, e.g. feature phones) */
function text({ url, host }: { url: string; host: string }) {
  return `Sign in to ${host}\n${url}\n\n`;
}

export const nextAuthOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  providers: [
    EmailProvider({
      name: 'magic link',
      server: process.env.EMAIL_SERVER_URL,
      from: OUR_EMAIL_FORMATTED,
      sendVerificationRequest: sendVerificationRequest,
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
