import { Client, GatewayIntentBits } from "discord.js";

export default class DiscordClient {
  constructor(token) {
    this.client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
      ],
    });

    this.token = token;
  }

  async start() {
    await this.client.login(this.token);

    return this.client;
  }
}
