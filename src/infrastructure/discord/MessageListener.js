function TypingIndicator(message) {
  return message.channel.sendTyping();
}

async function maxLengthCutter(message, response, maxLength) {
  if (response.length > maxLength) {
    const chunks = response.match(/[\s\S]{1,2000}/g);
    for (const chunk of chunks) {
      await message.reply(chunk);
      
    }
  } else {
    await message.reply(response);
  }
}

export default class MessageListener {
  constructor(client, heyHandler, geminiHandler) {
    this.client = client;
    this.heyHandler = heyHandler;
    this.geminiHandler = geminiHandler;
  }

  listen() {
    this.client.on("messageCreate", async (message) => {
      if (message.author.bot) return;

      const username = message.author.username;
      const servername = message.guild.name;
      const serverid = message.guild.id;
      const messagechannelname = message.channel.name;
      const messagechannelid = message.channel.id;
      const messageContent = message.content;

      console.log("username: ", username);
      console.log("server name: ", servername);
      console.log("serverid: ", serverid);
      console.log("server channel name: ", messagechannelname);
      console.log("server channel id: ", messagechannelid);
      console.log("message content: ", messageContent);

      const member = message.guild.members.cache.get(message.author.id);
      if (member) {
        const roles = member.roles.cache.map((role) => role.name);
        console.log("Roles:", roles);
      }

      console.log("#########################################");

      if (message.content.startsWith("bot!")) {
        const question = message.content.slice(4).trim();

        TypingIndicator(message);

        try {
          const geminiResponse = await this.geminiHandler.handle(question);

          console.log(geminiResponse);

          const maxLength = 2000;
          await maxLengthCutter(message, geminiResponse, maxLength);

        } catch (err) {
          console.error("Error replying to message:", err);
          await message.reply("Error in MessageListener.js");
        }
      }
    });
  }
}
