import { PlaygroundRequestCategory, Status } from '@prisma/client';
import { TRPCError } from '@trpc/server';

import { bold, codeBlock } from 'discord.js';

import prisma from 'lib/db/prisma';
import { sendDiscordMessage, withDiscordClient } from 'lib/discord';

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
  return `${
    request.organization || request.name
  } needs help, if you're interested in taking on this job, please apply to help with your resume, website, or linkedin, your email, and a little bit about you - thanks for your activism! 🐤💕

${bold('Message:')} ${request.website || 'None'}

${bold('Compensation:')} ${
    request.isFree
      ? 'This request is for volunteer work only, not paid. Please help the animals! 🐓'
      : 'Hell yeah'
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

    const updatedApplication = await prisma.playgroundRequest.update({
      where: { id },
      data: { status },
    });

    if (shouldPost) {
      const discordMessageIds = await postRequestOnDiscord(updatedApplication);
      await prisma.playgroundRequest.update({
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
