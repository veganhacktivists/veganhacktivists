import NextAuth from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import mjml2html from 'mjml';

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

  return mjml2html(`
<mjml>
    <mj-body background-color="#161919">
    <mj-section background-color="#161919">
      <mj-image alt="Vegan Hacktivists" src="https://veganhacktivists.org/images/VH-logo-web-white.png"></mj-image>
    </mj-section>
    <mj-section background-color="#ffffff">
    <mj-column>
    <mj-text align="left" font-weight="bold" font-family="-apple-system,BlinkMacSystemFont,Segoe UI, Roboto, Helvetica, Arial" font-size="16px" color="#161919">Hey there!</mj-text>
    <mj-text align="left" font-family="-apple-system,BlinkMacSystemFont,Segoe UI, Roboto, Helvetica, Arial" font-size="16px" color="#161919">Someone tried to login to ${host} with your email address.<br>If this was you, you're able to login here:</mj-text>
    <mj-button border-left="10px solid #64BC46" background-color="#292929" href="${url}" border-radius="0px" font-family="Rajdhani, monospace" font-size="18px" color="#ffffff">Login</mj-button>
    <mj-text align="left" font-family="-apple-system,BlinkMacSystemFont,Segoe UI, Roboto, Helvetica, Arial" font-size="16px" color="#161919">Otherwise you can safely ignore this mail.</mj-texta>
</mj-column>
    </mj-section>
<mj-section>
<mj-text align="center" font-family="-apple-system,BlinkMacSystemFont,Segoe UI, Roboto, Helvetica, Arial" color="#ffffff">© 2022 Vegan Hacktivists. All rights reserved.</mj-text>
</mj-section>
</mj-body>
</mjml>
  `)?.html;
}

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
