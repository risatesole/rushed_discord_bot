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

      console.log("username: ", username);
      console.log("server name: ", servername);
      console.log("serverid: ", serverid);
      console.log("server channel name: ", messagechannelname);
      console.log("server channel id: ", messagechannelid);

      const member = message.guild.members.cache.get(message.author.id);
      if (member) {
        const roles = member.roles.cache.map((role) => role.name);
        console.log("Roles:", roles);
      }

      console.log("#########################################");

      if (message.content.startsWith("bot!")) {
        const question = message.content.slice(4).trim();
        const response = await this.geminiHandler.handle(question);

        await message.reply(response);
      }
    });
  }
}
