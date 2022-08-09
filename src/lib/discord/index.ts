import { Client, GatewayIntentBits } from 'discord.js';

const client = new Client({ intents: [GatewayIntentBits.GuildMessages] });
void client.login(process.env.DISCORD_TOKEN);

client.on('ready', () => {
  // console.log('discord client ready!');
});

export default client;
