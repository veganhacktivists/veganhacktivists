import { PlaygroundRequestCategory, Status } from '@prisma/client';
import { TRPCError } from '@trpc/server';

import { bold, codeBlock } from 'discord.js';

import prisma from 'lib/db/prisma';
import { sendDiscordMessage, withDiscordClient } from 'lib/discord';

import emailClient, { OUR_EMAIL } from 'lib/mail';

import type { Message } from 'discord.js';

import type { PlaygroundRequest } from '@prisma/client';

import type { z } from 'zod';
import type {
  getPendingApplicationsSchema,
  getPendingRequestsSchema,
  setApplicationStatusSchema,
  setRequestStatusSchema,
} from './schemas';

export const getPendingApplications = async (
  params: z.infer<typeof getPendingApplicationsSchema>
) => {
  const applications = await prisma.playgroundApplication.findMany({
    where: {
      ...params,
      status: Status.Pending,
    },
    include: {
      request: true,
    },
  });

  return applications;
};

export const getPendingRequests = async (
  params: z.infer<typeof getPendingRequestsSchema>
) => {
  const applications = await prisma.playgroundRequest.findMany({
    where: {
      ...params,
      status: Status.Pending,
    },
    include: {
      requester: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  return applications;
};

export const setApplicationStatus = ({
  id,
  status,
}: z.infer<typeof setApplicationStatusSchema>) =>
  prisma.$transaction(async (prisma) => {
    const application = await prisma.playgroundApplication.findUnique({
      where: { id },
    });

    if (!application) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'The application was not found',
      });
    }

    const updatedApplication = await prisma.playgroundApplication.update({
      where: {
        id,
      },
      data: {
        status,
      },
      include: {
        request: true,
      },
    });

    const shouldNotifyBoth =
      application.status === Status.Pending &&
      updatedApplication.status === Status.Accepted;

    if (shouldNotifyBoth) {
      const optionalMessageParts = (
        (
          [
            ['Website / Portfolio', updatedApplication.portfolioLink],
            ['Twitter', updatedApplication.twitterUrl],
            ['Instagram', updatedApplication.instagramUrl],
            ['LinkedIn', updatedApplication.linkedinUrl],
            ['Message', updatedApplication.moreInfo],
          ] as [string, string | null][]
        ).filter(([, value]) => value !== null) as [string, string][]
      )
        .map(([name, value]) => `<b>${name}:</b> ${value}`)
        .join('<br />');

      await emailClient.sendMail({
        to: [
          'quin.trinanes@gmail.com',
          'hello@veganhacktivists.org',
          // updatedApplication.providedEmail,
          // updatedApplication.request.providedEmail,
        ],
        cc: OUR_EMAIL,
        subject: `We'd like to introduce ${updatedApplication.name}, from VH: Playground!`,

        html: `Hi ${updatedApplication.request.name},
<br />
<br />
We&apos;re excited to let you know that we&apos;ve been able to find someone to help you with &ldquo;${
          updatedApplication.request.title
        }&rdquo;!
<br />
<br />
Meet the person (cc&apos;ed to this email, just reply all!) below that applied to help with your request!
<br />
<br />
<b>Name:</b> ${updatedApplication.name}
<br />
${optionalMessageParts}
<br />
<br />
They have agreed that if selected to help with this project that they will commit a reasonable amount of time that would be needed to help with this project, communicate any status updates and progress, and do their best to meet any deadlines you might have.
<br />
<br />
<b>What&apos;s next?</b>
<br />
<br />
We highly recommend either of you to schedule a call with the other as soon as possible to talk about expectations, needs, and the project. Both of you can do so by scheduling a call using ${
          updatedApplication.request.name
        }&apos;s Calendy link <a href="${
          // TODO: sanitize this and all the other data?
          updatedApplication.request.calendlyUrl
        }">here</a>${
          updatedApplication.calendlyUrl
            ? ` or ${updatedApplication.name}&apos;s Calendy link <a href="${updatedApplication.calendlyUrl}">here</a>`
            : ''
        }.
<br />
<br />
Is someone not responding at all? Or are you having any other issues? Email us to let us know!
<br />
<br />
Thank you so much everyone for helping the animals, and for using Playground.
<br />
<br />
<b>Vegan Hacktivists</b>
`,
      });
    }

    return updatedApplication;
  });

const requestMessage = (request: PlaygroundRequest) => {
  return `${
    request.organization || request.name
  } needs help, if you're interested in taking on this job, please apply to help with your resume, website, or linkedin, your email, and a little bit about you - thanks for your activism! 🐤💕

${bold('Message:')} ${request.website || 'None'}

${bold('Compensation:')} ${
    request.isFree
      ? 'This request is for volunteer work only, not paid. Please help the animals! 🐓'
      : 'Paid'
  }

What's next: Read the request, if interested, apply on the Playground website to be introduced 👉 ${`https://veganhacktivists.org/playground/request/${request.id}`}

${codeBlock(request.description)}`;
};

const playgroundChannelIdByCategory = (request: PlaygroundRequest) => {
  // TODO: remove this and uncomment below code, this is just for testing in production
  const id = (
    Math.random() < 0.5
      ? process.env.DISCORD_CHANNEL1_ID
      : process.env.DISCORD_CHANNEL2_ID
  )!;

  return id;
  // if (!request.isFree) {
  //   return process.env.DISCORD_PLAYGROUND_PAID_CHANNEL_ID!;
  // }

  // switch (request.category) {
  //   case PlaygroundRequestCategory.Website:
  //     return process.env.DISCORD_PLAYGROUND_CODE_CHANNEL_ID!;
  //   case PlaygroundRequestCategory.Design:
  //     return process.env.DISCORD_PLAYGROUND_DESIGN_CHANNEL_ID!;
  //   default:
  //     return process.env.DISCORD_PLAYGROUND_MISC_CHANNEL_ID!;
  // }
};

const postRequestOnDiscord = async (request: PlaygroundRequest) => {
  const playgroundChannelId = playgroundChannelIdByCategory(request);
  const araChannelId = process.env.DISCORD_ARA_CHANNEL_ID!;

  const messages = await withDiscordClient(() =>
    Promise.all([
      sendDiscordMessage(
        playgroundChannelId,
        `Hi @everyone! ${requestMessage(request)}`
      ),
      sendDiscordMessage(
        araChannelId,
        `Hi everyone! ${requestMessage(request)}

${bold(
  'Note:'
)} Please only apply if you're 18+, minors are not currently allowed - sorry!        `
      ),
    ])
  );

  const okMessages = messages.filter((msg) => msg !== false) as Message<true>[];

  if (messages.length !== okMessages.length) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Could not send message to discord',
    });
  }
  return okMessages.map((msg) => msg.id);
};

export const setRequestStatus = async ({
  id,
  status,
}: z.infer<typeof setRequestStatusSchema>) => {
  const updatedApplication = await prisma.$transaction(async (prisma) => {
    const request = await prisma.playgroundRequest.findUnique({
      where: { id },
    });

    if (!request) {
      throw new TRPCError({ code: 'NOT_FOUND' });
    }

    const shouldPost =
      request.discordMessageIds.length === 0 &&
      request.status === Status.Pending &&
      status === Status.Accepted;

    let updatedApplication = await prisma.playgroundRequest.update({
      where: { id },
      data: { status },
    });

    if (shouldPost) {
      const discordMessageIds = await postRequestOnDiscord(updatedApplication);
      updatedApplication = await prisma.playgroundRequest.update({
        where: { id },
        data: {
          discordMessageIds,
        },
      });
    }

    return updatedApplication;
  });

  return updatedApplication;
};
