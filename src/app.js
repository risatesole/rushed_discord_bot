import DiscordClient from "./infrastructure/discord/DiscordClient.js";
import MessageListener from "./infrastructure/discord/MessageListener.js";

import SayHey from "./domain/usecases/SayHey.js";
import HeyHandler from "./application/handlers/HeyHandler.js";

const token = process.env.DISCORD_TOKEN;

const sayHey = new SayHey();
const heyHandler = new HeyHandler(sayHey);
const discordClient = new DiscordClient(token);

const client = await discordClient.start();

const listener = new MessageListener(client, heyHandler);

listener.listen();

console.log("Bot started");
