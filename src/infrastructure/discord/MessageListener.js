export default class MessageListener {
  constructor(client, heyHandler) {
    this.client = client;

    this.heyHandler = heyHandler;
  }

  listen() {
    this.client.on("messageCreate", async (message) => {
      if (message.author.bot) return;

      if (message.content === "bot!hey") {
        const response = this.heyHandler.handle();

        await message.reply(response);
      }
    });
  }
}
