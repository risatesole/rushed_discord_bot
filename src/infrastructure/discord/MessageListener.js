export default class MessageListener {
  constructor(client, heyHandler) {
    this.client = client;

    this.heyHandler = heyHandler;
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
      if (message.content === "bot!") {
        const response = this.heyHandler.handle();

        await message.reply(response);
      }
    });
  }
}
