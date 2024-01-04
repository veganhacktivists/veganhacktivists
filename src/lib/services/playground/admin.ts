import {
  ApplicationStatus,
  PlaygroundRequestCategory,
  RequestStatus,
} from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { codeBlock, EmbedBuilder, hyperlink, roleMention } from 'discord.js';

import { CATEGORY_COLORS } from '../../../../prisma/constants';
import {
  OUR_EMAIL_TO,
  PLAYGROUND_EMAIL_FORMATTED,
  PLAYGROUND_TO_CC,
} from '../../mail/router';
import {
  playgroundApplicantIntroductionEmail,
  playgroundApplicationDenialEmail,
  playgroundRequestApprovalEmail,
  playgroundRequestCompletedSurvey,
  playgroundRequestDenialEmail,
} from '../../../components/layout/mail/emailTemplates';

import prisma from 'lib/db/prisma';
import { sendDiscordMessage } from 'lib/discord';
import emailClient from 'lib/mail';
import { ROLE_ID_BY_CATEGORY } from 'lib/discord/constants';
import { getListFromEnv } from 'lib/helpers/env';
import { postPlaygroundRequestOnReddit } from 'lib/reddit';

import type { Submission } from 'snoowrap';
import type { deleteRequestSchema, repostRequestSchema } from './schemas';
import type { Message } from 'discord.js';
import type { PlaygroundRequest, Prisma } from '@prisma/client';
import type { z } from 'zod';
import type {
  getPendingApplicationsSchema,
  getRequestsAdminSchema,
  setApplicationStatusSchema,
  setRequestStatusSchema,
} from './schemas';

export type RequestWithBudget = Prisma.PlaygroundRequestGetPayload<{
  include: { budget: { select: { quantity: true; type: true } } };
}>;

export const getPendingApplications = async (
  params: z.infer<typeof getPendingApplicationsSchema>
) => {
  const applications = await prisma.playgroundApplication.findMany({
    where: {
      ...params,
      status: ApplicationStatus.Pending,
    },
    include: {
      request: true,
    },
    orderBy: {
      createdAt: 'asc',
    },
  });

  return applications;
};

export const getRequests = async ({
  pagination,
  ...where
}: z.infer<typeof getRequestsAdminSchema> = {}) => {
  const { page, pageSize } = pagination ?? {};

  const requests = prisma.playgroundRequest.findMany({
    where,
    ...(page === undefined
      ? {}
      : {
          take: pageSize,
          skip:
            pageSize === undefined || page === undefined
              ? undefined
              : (page - 1) * pageSize,
        }),
    include: {
      applications: {
        where: {
          status: ApplicationStatus.Accepted,
        },
        include: {
          applicant: {
            select: {
              email: true,
            },
          },
        },
      },
      requester: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      budget: {
        select: {
          quantity: true,
          type: true,
        },
      },
      _count: {
        select: {
          applications: {
            where: {
              status: ApplicationStatus.Accepted,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: 'asc',
    },
  });
  return requests;
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

    const acceptedAt = status === ApplicationStatus.Accepted && {
      acceptedAt: new Date(),
    };

    const updatedApplication = await prisma.playgroundApplication.update({
      where: {
        id,
      },
      data: {
        status,
        ...acceptedAt,
      },
      include: {
        request: true,
      },
    });

    const shouldNotifyBoth =
      process.env.NODE_ENV === 'production' &&
      application.status === ApplicationStatus.Pending &&
      updatedApplication.status === ApplicationStatus.Accepted;

    const shouldNotifyDenialToApplicant =
      process.env.NODE_ENV === 'production' &&
      application.status === ApplicationStatus.Pending &&
      updatedApplication.status === ApplicationStatus.Rejected;

    if (shouldNotifyBoth) {
      const optionalMessageParts = (
        [
          ['Website / Portfolio', updatedApplication.portfolioLink],
          ['Twitter', updatedApplication.twitterUrl],
          ['Instagram', updatedApplication.instagramUrl],
          ['LinkedIn', updatedApplication.linkedinUrl],
          ['Message', updatedApplication.moreInfo.replace(/\r?\n/g, '<br/>')],
        ].filter(([, value]) => !!value) as [string, string][]
      )
        .map(([name, value]) => `<b>${name}:</b> ${value}`)
        .join('<br />');

      await emailClient.sendMail({
        to: [
          updatedApplication.providedEmail,
          updatedApplication.request.providedEmail,
        ],
        cc: OUR_EMAIL_TO,
        from: PLAYGROUND_EMAIL_FORMATTED,
        subject: `We'd like to introduce ${updatedApplication.name}, from VH: Playground!`,
        text: playgroundApplicantIntroductionEmail(
          updatedApplication,
          optionalMessageParts,
          true
        ),
        html: playgroundApplicantIntroductionEmail(
          updatedApplication,
          optionalMessageParts
        ),
      });
    } else if (shouldNotifyDenialToApplicant) {
      await emailClient.sendMail({
        to: updatedApplication.providedEmail,
        from: PLAYGROUND_EMAIL_FORMATTED,
        subject:
          'Thanks so much for submitting your request to support with Playground!',
        text: playgroundApplicationDenialEmail(true),
        html: playgroundApplicationDenialEmail(),
      });
    }

    return updatedApplication;
  });

const getMessageDescription = (request: PlaygroundRequest) => {
  const DESCRIPTION_CHAR_LIMIT = 3000;

  const truncatedDescription = request.description.slice(
    0,
    DESCRIPTION_CHAR_LIMIT
  );
  const description =
    truncatedDescription.length < request.description.length
      ? `${truncatedDescription}...`
      : truncatedDescription;

  return `${
    request.organization || request.name
  } needs help, if you're interested in taking on this job, please apply to help with your resume, website, or linkedin, your email, and a little bit about you - thanks for your activism! 🐤

${codeBlock(description)}`;
};

const playgroundChannelIdByCategory = (request: PlaygroundRequest) => {
  switch (request.category) {
    case PlaygroundRequestCategory.Developer:
      return process.env.DISCORD_PLAYGROUND_CODE_CHANNEL_ID;
    case PlaygroundRequestCategory.Designer:
      return process.env.DISCORD_PLAYGROUND_DESIGN_CHANNEL_ID;
    case PlaygroundRequestCategory.Writer:
      return process.env.DISCORD_PLAYGROUND_WRITER_CHANNEL_ID;
    case PlaygroundRequestCategory.Editor:
      return process.env.DISCORD_PLAYGROUND_EDITOR_CHANNEL_ID;
    case PlaygroundRequestCategory.Researcher:
      return process.env.DISCORD_PLAYGROUND_RESEARCH_CHANNEL_ID;
    case PlaygroundRequestCategory.Marketer:
      return process.env.DISCORD_PLAYGROUND_MARKETER_CHANNEL_ID;
    case PlaygroundRequestCategory.Social:
      return process.env.DISCORD_PLAYGROUND_SOCIAL_CHANNEL_ID;
    case PlaygroundRequestCategory.DataScientist:
      return process.env.DISCORD_PLAYGROUND_DATA_CHANNEL_ID;
    case PlaygroundRequestCategory.Security:
      return process.env.DISCORD_PLAYGROUND_SECURITY_CHANNEL_ID;
    default:
      return process.env.DISCORD_PLAYGROUND_OTHER_CHANNEL_ID;
  }
};

const DISCORD_CHANNEL_IDS = getListFromEnv('DISCORD_CHANNEL_IDS');

const postRequestOnDiscord = async (request: RequestWithBudget) => {
  const playgroundChannelId = playgroundChannelIdByCategory(request);

  const roleToMention = ROLE_ID_BY_CATEGORY[request.category];
  const correctedWebsite = /https?:\/\//.test(request.website)
    ? request.website
    : `http://${request.website}`;

  const sentMessages: Message[] = [];

  try {
    const basicEmbed = new EmbedBuilder()
      .setColor(CATEGORY_COLORS[request.category])
      .setURL(`https://veganhacktivists.org/playground/request/${request.id}`)
      .setTitle(request.title)
      .setAuthor({
        name: 'VH Playground Bot',
        url: 'https://veganhacktivists.org/playground',
        iconURL:
          'https://veganhacktivists.org/images/playground/VH_Playground_Avatar_Circle.png',
      })
      .setDescription(getMessageDescription(request))
      .setImage(
        'https://veganhacktivists.org/images/playground/VH_Playground_FullLogoWithBackground.png'
      )
      .addFields([
        {
          name: 'Website',
          value: correctedWebsite,
        },
        {
          name: 'Compensation',
          value: request.budget
            ? 'Paid'
            : 'This request is for volunteer work only, not paid. Please help the animals! 🐓',
        },
        {
          name: "What's next?",
          value: `Read the request, if interested, apply on the Playground website to be introduced 👉 ${hyperlink(
            'Click here!',
            `https://veganhacktivists.org/playground/request/${request.id}`
          )}`,
        },
      ])
      .setFooter({
        text: "Note: Please only apply if you're 18+, minors are not currently allowed - sorry!",
      })
      .toJSON();

    console.info('Trying to send to discord', request.id, Date.now());

    const playgroundMessage = await sendDiscordMessage({
      channelId: playgroundChannelId,
      content: roleToMention ? roleMention(roleToMention) : undefined,
      embeds: [
        new EmbedBuilder(basicEmbed)
          .setDescription(
            `Hi ${roleToMention ? roleMention(roleToMention) : 'everyone'}! ${
              basicEmbed.description || ''
            }`
          )
          .toJSON(),
      ],
    });

    sentMessages.push(playgroundMessage);

    for await (const channelId of DISCORD_CHANNEL_IDS) {
      const message = await sendDiscordMessage({
        channelId,
        embeds: [
          new EmbedBuilder(basicEmbed)
            .setDescription(`Hi everyone! ${basicEmbed.description || ''}`)
            .toJSON(),
        ],
      });
      sentMessages.push(message);
    }
    return sentMessages;
  } catch (err) {
    try {
      sentMessages.forEach((message) => message.delete());
    } finally {
      const cause =
        err instanceof Error
          ? err
          : typeof err === 'string'
          ? new Error(err)
          : new Error(JSON.stringify(err));
      throw new Error(`Failed to send Playground message. ${cause.message}`, {
        cause,
      });
    }
  }
};

export const deleteRequest = ({ id }: z.infer<typeof deleteRequestSchema>) =>
  prisma.playgroundRequest.update({
    where: { id },
    data: { status: RequestStatus.Rejected },
  });

export const repostRequest = async ({
  id,
  lastManuallyPushed,
}: z.infer<typeof repostRequestSchema>) => {
  const request = await prisma.playgroundRequest.findUnique({
    where: { id },
  });
  if (!request) {
    throw new TRPCError({ code: 'NOT_FOUND' });
  }
  const shouldPost =
    process.env.NODE_ENV === 'production' &&
    (request.status === RequestStatus.Accepted ||
      request.status === RequestStatus.Rejected ||
      request.status === RequestStatus.Completed);
  if (!shouldPost) {
    return;
  }
  let discordMessages: Message[] = [];
  let redditSubmissions: Submission[] = [];

  try {
    const updatedRequest = await prisma.$transaction(
      async (prisma) => {
        let updatedRequest = await prisma.playgroundRequest.update({
          where: { id },
          data: { status: RequestStatus.Accepted, lastManuallyPushed },
          include: {
            budget: {
              select: {
                quantity: true,
                type: true,
              },
            },
          },
        });

        redditSubmissions = await postPlaygroundRequestOnReddit(updatedRequest);
        discordMessages = await postRequestOnDiscord(updatedRequest);
        updatedRequest = await prisma.playgroundRequest.update({
          where: { id },
          include: { budget: true },
          data: {
            discordMessages: {
              create: discordMessages.map((msg) => ({
                channelId: msg.channelId,
                messageId: msg.id,
              })),
            },
          },
        });
        return updatedRequest;
      },
      { timeout: 30000 }
    );
    return updatedRequest;
  } catch (e) {
    try {
      for await (const redditSubmission of redditSubmissions) {
        await redditSubmission.delete().catch();
      }
      for await (const discordMessage of discordMessages) {
        await discordMessage.delete().catch();
      }
    } finally {
      const cause =
        e instanceof Error
          ? e
          : typeof e === 'string'
          ? new Error(e)
          : new Error(JSON.stringify(e));
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', cause });
    }
  }
};

export const setRequestStatus = async ({
  id,
  status,
}: z.infer<typeof setRequestStatusSchema>) => {
  const request = await prisma.playgroundRequest.findUnique({
    where: { id },
    include: {
      discordMessages: true,
    },
  });

  if (!request) {
    throw new TRPCError({ code: 'NOT_FOUND' });
  }

  const shouldPost =
    process.env.NODE_ENV === 'production' &&
    request.discordMessages.length === 0 &&
    request.status === RequestStatus.Pending &&
    status === RequestStatus.Accepted;

  const shouldNotifyDenial =
    process.env.NODE_ENV === 'production' &&
    request.status === RequestStatus.Pending &&
    status === RequestStatus.Rejected;

  const shouldConfirmCompletion =
    process.env.NODE_ENV === 'production' &&
    request.status === RequestStatus.Accepted &&
    status === RequestStatus.Completed;

  let discordMessages: Message[] = [];
  let redditSubmissions: Submission[] = [];

  try {
    const updatedRequest = await prisma.$transaction(
      async (prisma) => {
        const acceptedAt = status === RequestStatus.Accepted && {
          acceptedAt: new Date(),
        };

        let updatedRequest = await prisma.playgroundRequest.update({
          where: { id },
          data: {
            status,
            ...acceptedAt,
          },
          include: {
            budget: {
              select: {
                quantity: true,
                type: true,
              },
            },
          },
        });

        if (shouldPost) {
          console.info('Trying to post to reddit and discord', id, Date.now());
          redditSubmissions = await postPlaygroundRequestOnReddit(
            updatedRequest
          );
          console.info('Successfully posted request to reddit', id, Date.now());
          discordMessages = await postRequestOnDiscord(updatedRequest);
          console.info(
            'Successfully posted request to discord',
            id,
            Date.now()
          );

          updatedRequest = await prisma.playgroundRequest.update({
            where: { id },
            include: { budget: true },
            data: {
              discordMessages: {
                create: discordMessages.map((msg) => ({
                  channelId: msg.channelId,
                  messageId: msg.id,
                })),
              },
            },
          });
        }

        return updatedRequest;
      },
      { timeout: 60000 }
    );
    if (shouldPost) {
      await sendAcceptedEmail(updatedRequest);
    } else if (shouldNotifyDenial) {
      await sendDenialEmail(updatedRequest);
    } else if (shouldConfirmCompletion) {
      await sendCompletionEmail(updatedRequest);
    }
    return updatedRequest;
  } catch (e) {
    try {
      for await (const redditSubmission of redditSubmissions) {
        await redditSubmission.delete().catch();
      }
      for await (const discordMessage of discordMessages) {
        await discordMessage.delete().catch();
      }
    } finally {
      const cause =
        e instanceof Error
          ? e
          : typeof e === 'string'
          ? new Error(e)
          : new Error(JSON.stringify(e));
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', cause });
    }
  }
};

const sendAcceptedEmail = (
  request: Pick<PlaygroundRequest, 'providedEmail' | 'name' | 'id'>
) => {
  if (process.env.NODE_ENV !== 'production') {
    return true;
  }
  return emailClient.sendMail({
    to: request.providedEmail,
    from: PLAYGROUND_EMAIL_FORMATTED,
    subject: 'Your request is now live on Playground!',
    text: playgroundRequestApprovalEmail(request, true),
    html: playgroundRequestApprovalEmail(request),
  });
};

const sendDenialEmail = (request: Pick<PlaygroundRequest, 'providedEmail'>) => {
  if (process.env.NODE_ENV !== 'production') {
    return true;
  }
  return emailClient.sendMail({
    to: request.providedEmail,
    from: PLAYGROUND_EMAIL_FORMATTED,
    subject: 'Thanks so much for submitting your request to Playground!',
    text: playgroundRequestDenialEmail(true),
    html: playgroundRequestDenialEmail(),
  });
};

const sendCompletionEmail = (
  request: Pick<PlaygroundRequest, 'providedEmail' | 'name' | 'title'>
) => {
  if (process.env.NODE_ENV !== 'production') {
    return true;
  }
  return emailClient.sendMail({
    to: request.providedEmail,
    from: PLAYGROUND_EMAIL_FORMATTED,
    cc: PLAYGROUND_TO_CC,
    subject: 'Help Us Improve! Rate Your Experience with Playground',
    text: playgroundRequestCompletedSurvey(request, true),
    html: playgroundRequestCompletedSurvey(request),
  });
};
