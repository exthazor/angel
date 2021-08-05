import { Command } from "discord-akairo";
import { Message, MessageEmbed } from "discord.js";

export default class PollCommand extends Command {
  public constructor() {
    super("poll", {
      aliases: ["poll"],
      category: "Public Commands",
      description: {
        content:
          "Allow users to survey opinion on a topic by enacting a channel-wide poll",
        usage: '"question" "option1" "option 2" "option 3"... ',
        examples: [
          'ang poll "Why is the sky blue?" "Science, bitch!" "Because god wants it to." "The sky is blue??"',
        ],
      },
      ratelimit: 3,
      args: [
        {
          id: "items",
          match: "content",
          prompt: {
            start: (msg: Message) =>
              `${msg.author}, you must provide a question for your poll!`,
          },
        },
      ],
    });
  }

  public async exec(message, args) {
    const defEmojiList = [
      "\u0031\u20E3",
      "\u0032\u20E3",
      "\u0033\u20E3",
      "\u0034\u20E3",
      "\u0035\u20E3",
      "\u0036\u20E3",
      "\u0037\u20E3",
      "\u0038\u20E3",
      "\u0039\u20E3",
      "\uD83D\uDD1F",
    ];

    const emojiList = defEmojiList.slice();

    if (!message && !message.channel)
      return message.reply("Channel is inaccessible.");

    const items = args.items.split(`"`).filter((str) => {
      return /\S/.test(str);
    });

    const question: string = items[0];
    items.shift();

    if (!question) return message.reply("Poll title is not given.");
    if (!items) return message.reply("Poll options are not given.");

    if (items.length < 2)
      return message.reply("Please provide more than one choice.");
    if (items.length > emojiList.length)
      return message.reply(
        `Please provide ${emojiList.length} or less choices.`
      );

    let text = "";
    const emojiInfo = {};
    for (const item of items) {
      const emoji: any = emojiList.splice(0, 1);
      emojiInfo[emoji] = { option: item, votes: 0 };
      text += `${emoji} : \`${item}\`\n\n`;
    }
    const usedEmojis = Object.keys(emojiInfo);

    const Embed = new MessageEmbed().setColor("#FFC0CB").setDescription(text);

    const poll = await message.channel.send(`:bar_chart: **${question}**`, {
      embed: Embed,
    });

    for (const emoji of usedEmojis) await poll.react(emoji);
  }
}
