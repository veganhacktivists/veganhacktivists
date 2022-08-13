import { ChannelType, Client, GatewayIntentBits } from 'discord.js';

const client = new Client({ intents: [GatewayIntentBits.GuildMessages] });
void client.login(process.env.DISCORD_TOKEN);

client.on('ready', () => {
  // eslint-disable-next-line no-console
  console.info('Discord client ready!');
});

export const sendDiscordMessage = async (
  channelId: string,
  message: string
) => {
  // TODO: is the fetch needed? Looks like it
  const channel =
    client.channels.cache.get(channelId) ||
    (await client.channels.fetch(channelId));

  if (!channel || channel.type !== ChannelType.GuildText) {
    return false;
  }
  return await channel.send(message);
};

export const withDiscordClient = async <T>(callback: () => Promise<T>) =>
  new Promise<T>(async (resolve) => {
    if (!client.isReady()) {
      (client as Client<false>).on('ready', async () => {
        resolve(await callback());
      });
    }

    resolve(await callback());
  });

export default client;
