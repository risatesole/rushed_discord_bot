import { Client, GatewayIntentBits, Events } from 'discord.js';

export default class discordadapter {
  client;
  constructor() {
    this.client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
      ],
    });
  }
  hello() {
    console.log('Hello from discordadapter package');
  }
  async run() {
    // fires when bot starts
    this.client.on(Events.ClientReady, (readyClient) => {
      console.log(`Logged in as ${readyClient.user.tag}`);
    });

    // fires when message is received
    this.client.on(Events.MessageCreate, (message) => {
      if (message.author.bot) return;

      console.log(`Message received: ${message.content}`);

      if (message.content === 'ping') {
        message.reply('pong');
      }
    });

    this.client.login(process.env.DISCORD_TOKEN);
  }
}
