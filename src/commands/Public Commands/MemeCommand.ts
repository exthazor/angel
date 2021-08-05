import { Command } from "discord-akairo";
import { Message, MessageEmbed } from "discord.js";
import { getRandomMeme } from "@blad3mak3r/reddit-memes";

export default class HoroscopeCommand extends Command {
  public constructor() {
    super("meme", {
      aliases: ["meme"],
      category: "Public Commands",
      description: {
        content: "Get a meme to brighten up your day!",
        usage: "meme",
        examples: ["ang meme"],
      },
      ratelimit: 3,
    });
  }

  public async exec(message: Message):Promise<Message> {
    var memeObject = await getRandomMeme();
    const embed = new MessageEmbed()
    .setTitle(`${memeObject.title}`)
      .setColor(`FFA500`)
      .setImage(`${memeObject.image}`)
      .setFooter(`👍 ${memeObject.ups} | 💬 ${memeObject.comments}`)

      return message.channel.send({embed})
      
  }
}
