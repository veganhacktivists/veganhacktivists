import { z } from 'zod';

import { adminProcedure } from 'server/procedures/auth';
import { t } from 'server/trpc';
import withDiscordClient, { sendDiscordMessage } from 'lib/discord';

const schema = z.object({
  channelId: z
    .string()
    .min(1)
    // TODO: remove this default, also remove the form in the admin callout
    .default(process.env.DISCORD_PLAYGROUND_CHANNEL_ID || ''),
  message: z.string().default('Olo! Esto es un test'),
});

const discordRouter = t.router({
  sendTestMessage: adminProcedure
    .input(schema)
    .mutation(async ({ input: { channelId, message } }) => {
      await withDiscordClient(() => sendDiscordMessage(channelId, message));
    }),
});

export default discordRouter;
