import { PlaygroundRequestCategory, Status } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { codeBlock, EmbedBuilder, hyperlink, roleMention } from 'discord.js';

import { CATEGORY_COLORS } from '../../../../prisma/constants';

import prisma from 'lib/db/prisma';
import { sendDiscordMessage } from 'lib/discord';
import emailClient, { OUR_EMAIL, PLAYGROUND_EMAIL_FORMATTED } from 'lib/mail';
import { ROLE_ID_BY_CATEGORY } from 'lib/discord/constants';
import { getListFromEnv } from 'lib/helpers/env';
import { postPlaygroundRequestOnReddit } from 'lib/reddit';

import type { Submission } from 'snoowrap';
import type { deleteRequestSchema } from './schemas';
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
    orderBy: {
      createdAt: 'asc',
    },
  });

  return applications;
};

export const getPendingRequests = async (
  params: z.infer<typeof getPendingRequestsSchema>
) => {
  const requestsWithApplications = await prisma.playgroundRequest.findMany({
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
    orderBy: {
      createdAt: 'asc',
    },
  });

  return requestsWithApplications;
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
      process.env.NODE_ENV === 'production' &&
      application.status === Status.Pending &&
      updatedApplication.status === Status.Accepted;

    const shouldNotifyDenialToApplicant =
      process.env.NODE_ENV === 'production' &&
      application.status === Status.Pending &&
      updatedApplication.status === Status.Rejected;

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
        ).filter(([, value]) => !!value) as [string, string][]
      )
        .map(([name, value]) => `<b>${name}:</b> ${value}`)
        .join('<br />');

      await emailClient.sendMail({
        to: [
          updatedApplication.providedEmail,
          updatedApplication.request.providedEmail,
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
Meet the person (cc&apos;ed to this email) below that applied to help with your request!
<br />
<br />
<b>Name:</b> ${updatedApplication.name}
<br />
<br />
${optionalMessageParts}
<br />
<br />
<b>Note:</b> They have agreed that if selected to help with this project that they will commit a reasonable amount of time that would be needed to help with this project, communicate any status updates and progress, and do their best to meet any deadlines you might have.
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
<i>Note that while we try our best to screen all applicants who applied to your request, we cannot guarantee the quality of work done by Playground volunteers.</i>
<br />
<br />
Thank you so much for helping the animals, and for using Playground!
<br />
<br />
<b>Vegan Hacktivists</b>
`,
      });
    } else if (shouldNotifyDenialToApplicant) {
      await emailClient.sendMail({
        to: updatedApplication.providedEmail,
        from: PLAYGROUND_EMAIL_FORMATTED,
        subject:
          'Thanks so much for submitting your request to support with Playground!',
        html: `Thanks so much for submitting your request to support with Playground!
<br />
<br />
Unfortunately someone else who applied to help with this request was chosen. Usually this just means that someone else who applied had more time to contribute or had more relevant qualifications for this specific request.
<br />
<br />
To help improve your chances to volunteer for future tasks, make sure that your application, resume/portfolio, and other materials are both up-to-date and has enough details to help us make an informed decision.
<br />
<br />
If you have any specific questions feel free to contact us here. In the meantime, check out <a href="https://veganhacktivists.org/playground/requests">other pending requests</a>!
<br />
<br />
Thank you so much for considering VH: Playground for your activism!`,
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

const postRequestOnDiscord = async (request: PlaygroundRequest) => {
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
          value: hyperlink(request.website, correctedWebsite),
        },
        {
          name: 'Compensation',
          value: request.isFree
            ? 'This request is for volunteer work only, not paid. Please help the animals! 🐓'
            : 'Paid',
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
    data: { status: Status.Rejected },
  });

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
    request.discordMessages.length === 0 &&
    request.status === Status.Pending &&
    status === Status.Accepted;

  const shouldNotifyDenial =
    request.status === Status.Pending && status === Status.Rejected;

  let discordMessages: Message[] = [];
  let redditSubmissions: Submission[] = [];

  try {
    const updatedRequest = await prisma.$transaction(
      async (prisma) => {
        let updatedRequest = await prisma.playgroundRequest.update({
          where: { id },
          data: { status },
        });

        if (shouldPost) {
          redditSubmissions = await postPlaygroundRequestOnReddit(
            updatedRequest
          );

          discordMessages = await postRequestOnDiscord(updatedRequest);
          updatedRequest = await prisma.playgroundRequest.update({
            where: { id },
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
      { timeout: 10000 }
    );
    if (shouldPost) {
      await sendAcceptedEmail(updatedRequest);
    } else if (shouldNotifyDenial) {
      await sendDenialEmail(updatedRequest);
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

const sendAcceptedEmail = (request: PlaygroundRequest) => {
  if (process.env.NODE_ENV !== 'production') {
    return true;
  }
  return emailClient.sendMail({
    to: request.providedEmail,
    from: PLAYGROUND_EMAIL_FORMATTED,
    subject: 'Your request is now live on Playground!',
    html: `Your request is now live on Playground!
<br /><br />
Hey ${request.name}!
<br /><br />
Thanks for submitting your request to VH: Playground! We're happy to let you know that our team has reviewed and accepted your request to go live, which means you can now view and share it online by <a href="https://veganhacktivists.org/playground/request/${request.id}">clicking this link</a>.
<br /><br />
Note that Playground has just launched and is still growing, it may take longer than usual for requests to be fulfilled by our volunteer community - your patience is appreciated! If you have any questions, feel free to reply to this email for help, or visit our FAQ <a href="https://veganhacktivists.org/playground#faq">in this page</a>.
<br /><br />
Thank you so much!`,
  });
};

const sendDenialEmail = (request: PlaygroundRequest) => {
  if (process.env.NODE_ENV !== 'production') {
    return true;
  }
  return emailClient.sendMail({
    to: request.providedEmail,
    from: PLAYGROUND_EMAIL_FORMATTED,
    subject: 'Thanks so much for submitting your request to Playground!',
    html: `Thanks so much for submitting your request to Playground!
<br />
<br />
Unfortunately your request did not meet the relevant or quality standards needed to go live. Usually this means you didn't include enough details, but can also include other factors such as not being specifically a vegan request, being for-profit, etc.
<br />
<br />
If you have any specific questions, or believe this was a mistake, feel free to contact us here.
<br />
<br />
Thank you so much for considering VH: Playground for your request!`,
  });
};
