import { Command } from "discord-akairo";
import { Message, TextChannel } from "discord.js";

export default class MessageCommand extends Command {
  public constructor() {
    super("message", {
      aliases: ["message", "msg"],
      category: "Moderation Commands",
      ratelimit: 3,
      userPermissions: ["ADMINISTRATOR"],
      args: [
        {
          id: "channel_id",
          type: "string",
          prompt: {
            start: (msg: Message) =>
              `${"<@" + msg.author + ">"}, provide a channel id.`,
            retry: (msg: Message) =>
              `${"<@" + msg.author + ">"}, provide a valid channel id.`,
          },
        },
        {
          id: "msg",
          type: "string",
          match: "rest",
          prompt: {
            start: (msg: Message) =>
              `${"<@" + msg.author + ">"}, provide a message for me to send.`,
            retry: (msg: Message) =>
              `${"<@" + msg.author + ">"}, provide a message for me to send.`,
          },
        },
      ],
    });
  }

  public async exec(
    message: Message,
    { channel_id, msg }: { channel_id: string; msg: string }
  ): Promise<void> {
    const channel = this.client.channels.cache.get(channel_id);
    if (channel.isText()) {
      (<TextChannel>channel).send(`${msg}`);
    }
  }
}
