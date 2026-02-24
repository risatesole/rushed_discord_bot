import DiscordClient from "./infrastructure/discord/DiscordClient.js";
import MessageListener from "./infrastructure/discord/MessageListener.js";

import SayHey from "./domain/usecases/SayHey.js";
import HeyHandler from "./application/handlers/HeyHandler.js";

import GeminiHandler from "./application/handlers/GeminiHandler.js";
import AnswerGemini from "./domain/usecases/AnswerGemini.js";

const discordToken = process.env.DISCORD_TOKEN;

const sayHey = new SayHey();
const answerGeminiUseCase = new AnswerGemini();

const heyHandler = new HeyHandler(sayHey);
const geminiHandler = new GeminiHandler(answerGeminiUseCase);

const discordClient = new DiscordClient(discordToken);
const client = await discordClient.start();

const listener = new MessageListener(client, heyHandler, geminiHandler);
listener.listen();

console.log("Bot started");