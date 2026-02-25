import { MessageBrokerInterface } from '@risatesole/messagebroker';
import { Client, GatewayIntentBits, Events } from 'discord.js';
export default class discordadapter {
  client;
  private messageBroker:MessageBrokerInterface;
  constructor(messageBroker:MessageBrokerInterface) {

    this.messageBroker = messageBroker

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
    this.client.on(Events.ClientReady, (readyClient) => {
      console.log(`Logged in as ${readyClient.user.tag}`);
    });

    this.client.on(Events.MessageCreate, (message) => {
      if (message.author.bot) return;

      if (!message.inGuild()) return;

      const data = {
        user: {
          id: message.author.id,
          username: message.author.username,
          displayName: message.author.displayName,
          // servernickname: message.member.nickname, // todo show nickname in server
          avatarUrl: message.author.displayAvatarURL({ extension: 'png', size: 1024 }),
        },
        server: {
          id: message.guild.id,
          name: message.guild.name,
        },
        channel: {
          id: message.channel.id,
          name: message.channel.name,
        },
        message: {
          content: message.content,
          id: message.id,
          timestamp: message.createdAt,
        },
        roles: message.member ? message.member.roles.cache.map((role) => role.name) : [],
      };

      console.log(JSON.stringify(data, null, 2));

      if (message.content === 'ping') {
        message.reply('pong');
      }
    });

    this.client.login(process.env.DISCORD_TOKEN);
  }
}
