import { z } from 'zod';

import { adminProcedure } from 'server/procedures/auth';
import { t } from 'server/trpc';
import client, { sendDiscordMessage } from 'lib/discord';

import type { Client } from 'discord.js';

const schema = z.object({
  channelId: z
    .string()
    .min(1)
    .default(process.env.DISCORD_PLAYGROUND_CHANNEL_ID || ''),
  message: z.string().default('Olo! Esto es un test'),
});

const discordRouter = t.router({
  sendTestMessage: adminProcedure
    .input(schema)
    .mutation(async ({ input: { channelId, message } }) => {
      if (client.isReady()) {
        await sendDiscordMessage(channelId, message);
      } else {
        (client as Client<false>).once('ready', async () => {
          await sendDiscordMessage(channelId, message);
        });
      }
    }),
});

export default discordRouter;
