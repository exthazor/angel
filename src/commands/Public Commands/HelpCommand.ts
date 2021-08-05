import { Command } from "discord-akairo";
import { Message, MessageEmbed } from "discord.js";
import { stripIndents } from "common-tags";

export default class HelpCommand extends Command {
  public constructor() {
    super("help", {
      aliases: ["help"],
      category: "Public Commands",
      description: {
        content:
          "Help command to display a list of available commands and functions that the bot can offer.",
        usage: "help [ command ]",
        examples: ["ang help", "ang help ping"],
      },
      ratelimit: 3,
      args: [
        {
          id: "command",
          type: "commandAlias",
          default: null,
        },
      ],
    });
  }

  public exec(
    message: Message,
    { command }: { command: Command }
  ): Promise<Message> {
    if (command) {
      return message.channel.send(
        new MessageEmbed()
          .setAuthor(`Help | ${command}`, this.client.user.displayAvatarURL())
          .setColor("#4caf50").setDescription(stripIndents`
            **Description:**
            ${command.description.content || "No content provided"}
            
            **Usage:**
            ${command.description.usage || "No usage provided"}
            
            **Examples:**
            ${
              command.description.examples
                ? command.description.examples.map((e) => `\`${e}\``).join("\n")
                : "No examples provided."
            }
            `)
      );
    }
    const embed = new MessageEmbed()
    .setAuthor(`Help | ${this.client.user.username}`, this.client.user.displayAvatarURL())
    .setColor("#4caf50")
    .setFooter(`${this.client.commandHandler.prefix} help [ command ] for more information on a command uwu`)

    for(const category of this.handler.categories.values()){
        if(["default"].includes(category.id)) continue

        embed.addField(category.id, category
            .filter(cmd => cmd.aliases.length > 0)
            .map(cmd => `**\`${cmd}\`**`)
            .join(",") || "No commands in this category.")
    }

    return message.channel.send(embed)
  }
}
