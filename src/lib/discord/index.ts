import { ChannelType, Client, GatewayIntentBits } from 'discord.js';

const client = new Client({ intents: [GatewayIntentBits.GuildMessages] });
void client.login(process.env.DISCORD_TOKEN);

client.on('ready', () => {
  // eslint-disable-next-line no-console
  console.info('Discord client ready!');
});

const getChannel = async (id: string) =>
  client.channels.cache.get(id) || (await client.channels.fetch(id));

export const sendDiscordMessage = async (
  channelId: string,
  message: string
) => {
  const channel = await getChannel(channelId);

  if (!channel || channel.type !== ChannelType.GuildText) {
    return false;
  }
  return await channel.send(message);
};

export const withDiscordClient = async <T>(callback: () => Promise<T> | T) =>
  new Promise<T>(async (resolve) => {
    if (!client.isReady()) {
      (client as Client<false>).on('ready', async () => {
        resolve(await callback());
      });
    }

    resolve(await callback());
  });

export default client;
