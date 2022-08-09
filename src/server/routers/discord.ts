import { z } from 'zod';

import { ChannelType } from 'discord.js';

import { TRPCError } from '@trpc/server';

import { adminProcedure } from 'server/procedures/auth';
import { t } from 'server/trpc';
import client from 'lib/discord';

const schema = z.object({
  channelId: z
    .string()
    .min(1)
    .default(process.env.DISCORD_PLAYGROUND_CHANNEL_ID || ''),
  message: z.string().default('Olo! Esto es un test'),
});

// type x = z.output<typeof schema>;

const discordRouter = t.router({
  sendTestMessage: adminProcedure
    .input(schema)
    .mutation(async ({ input: { channelId, message } }) => {
      const channel =
        client.channels.cache.get(channelId) ||
        (await client.channels.fetch(channelId));

      if (!channel || channel.type !== ChannelType.GuildText) {
        throw new TRPCError({ code: 'NOT_FOUND' });
      }
      await channel.send(message);
    }),
});

export default discordRouter;
