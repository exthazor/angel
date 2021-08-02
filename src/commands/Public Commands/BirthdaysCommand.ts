import { Message, MessageEmbed } from "discord.js";
import { Command } from "discord-akairo";
import { Repository, ILike } from "typeorm";
import moment from "moment";
import { GetBirthdays } from "../../models/GetBirthdays";

export default class RecentBirthdayCommand extends Command {
  public constructor() {
    super("birthdays", {
      aliases: ["birthdays", "birthday"],
      category: "Public Commands",
      description: {
        content: "See all the birthdays for the current month",
        usage: "recentbirthdays",
        examples: ["ang recentbirthdays"],
      },
      ratelimit: 3,
    });
  }

  public async exec(message: Message) {
    const getBirthdayRepo: Repository<GetBirthdays> =
      this.client.db.getRepository(GetBirthdays);

    let currentMonth = parseInt(moment.utc().format("MM"));
    const birthdays: GetBirthdays[] = await getBirthdayRepo.find({
      month: currentMonth,
    });

    let text = "";

    for (const birthday of birthdays) {
      text += ` ${"<@" + birthday.user + ">"}  : \`${birthday.date}\`\n\n`;
    }

    const Embed = new MessageEmbed()
      .setColor("#FF1493")
      .setDescription(`${text}`);

    let desc: string = "Birthdays for this month are:";
    const poll = await message.channel.send(`🎁 ${desc}`, {
      embed: Embed,
    });
  }
}
