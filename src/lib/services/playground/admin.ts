import { PlaygroundRequestCategory, Status } from '@prisma/client';
import { TRPCError } from '@trpc/server';

import { bold, codeBlock } from 'discord.js';

import prisma from 'lib/db/prisma';
import { sendDiscordMessage, withDiscordClient } from 'lib/discord';

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

export const setApplicationStatus = async ({
  id,
  status,
}: z.infer<typeof setApplicationStatusSchema>) => {
  const updatedApplication = await prisma.playgroundApplication.update({
    where: {
      id,
    },
    data: {
      status,
    },
  });
  return updatedApplication;
};

const requestMessage = (request: PlaygroundRequest) => {
  return `Hi @everyone! ${
    request.organization || request.name
  } needs help, if you're interested in taking on this job, please apply to help with your resume, website, or linkedin, your email, and a little bit about you - thanks for your activism! 🐤💕

${bold('Message:')} ${request.website || 'None'}

${bold('Compensation:')} ${
    request.isFree
      ? 'This request is for volunteer work only, not paid. Please help the animals! 🐓'
      : 'Hell yeah'
  }

What's next: Read the request, if interested, apply on the Playground website to be introduced 👉 ${`https://veganhacktivists.org/playground/requests/${request.id}`}

${codeBlock(request.description)}
`;
};

const channelIdByCategory = (request: PlaygroundRequest) => {
  if (!request.isFree) {
    return process.env.DISCORD_PLAYGROUND_PAID_CHANNEL_ID!;
  }

  switch (request.category) {
    case PlaygroundRequestCategory.Website:
      return process.env.DISCORD_PLAYGROUND_CODE_CHANNEL_ID!;
    case PlaygroundRequestCategory.Design:
      return process.env.DISCORD_PLAYGROUND_DESIGN_CHANNEL_ID!;
    default:
      return process.env.DISCORD_PLAYGROUND_MISC_CHANNEL_ID!;
  }
};

const postRequestOnDiscord = async (request: PlaygroundRequest) => {
  const channelId = channelIdByCategory(request);

  const message = await withDiscordClient(() =>
    sendDiscordMessage(channelId, requestMessage(request))
  );
  if (!message) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Could not send message to discord',
    });
  }
  return message.id;
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
      !!request.discordMessageId &&
      request.status === Status.Pending &&
      status === Status.Accepted;

    const updatedApplication = await prisma.playgroundRequest.update({
      where: { id },
      data: { status },
    });

    if (shouldPost) {
      const discordMessageId = await postRequestOnDiscord(updatedApplication);
      await prisma.playgroundRequest.update({
        where: { id },
        data: {
          discordMessageId,
        },
      });
    }

    return updatedApplication;
  });

  return updatedApplication;
};
