import { Command } from "discord-akairo";
import { Message, GuildMember } from "discord.js";

export default class BanCommand extends Command {
  public constructor() {
    super("ban", {
      aliases: ["ban"],
      category: "Moderation Commands",
      description: {
        content: "Ban a member in the server",
        usage: "Ban [ member ] < reason> ",
        examples: [
          "Ban @Host#0001 swearing",
          "Ban host swearing",
          "Ban @Captain Entropy$8973 defaming",
        ],
      },
      ratelimit: 3,
      userPermissions: ["BAN_MEMBERS"],
      args: [
        {
          id: "member",
          type: "member",
          prompt: {
            start: (msg: Message) =>
              `${"<@" + msg.author + ">"}, provide a member to ban.`,
            retry: (msg: Message) =>
              `${"<@" + msg.author + ">"}, provide a valid member to ban.`,
          },
        },
        {
          id: "reason",
          type: "string",
          match: "rest",
          default: "creating trouble",
        },
      ],
    });
  }

  public async exec(
    message: Message,
    { member, reason }: { member: GuildMember; reason: string }
  ): Promise<void> {
    if (
      member.roles.highest.position >= message.member.roles.highest.position &&
      message.author.id !== message.guild.ownerID
    ) {
      console.log(message.guild.ownerID);
      return null;
    }

    member
      .ban({ reason })
      .then(() =>
        message.util.send(
          `**${
            "<@" + member.user.id + ">"
          }** has been banned because of ${reason}.`
        )
      )
      .catch((err) => {
        message.util.send(`I was unable to ban the person`);
        console.error(err)
      });

  }
}
