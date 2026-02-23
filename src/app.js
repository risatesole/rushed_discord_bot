import { Client, GatewayIntentBits } from "discord.js";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent, // REQUIRED to read message content
  ],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("messageCreate", (message) => {
  // Ignore bot messages
  if (message.author.bot) return;

  console.log(`[${message.guild.name}] #${message.channel.name}`);
  console.log(`${message.author.username}: ${message.content}`);
});

client.login(process.env.DISCORD_TOKEN);
