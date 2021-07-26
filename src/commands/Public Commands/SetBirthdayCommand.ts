import { Command } from "discord-akairo";
import { Message, GuildMember, MessageEmbed, ImageSize } from "discord.js";
import moment from "moment";
import { Birthdays } from "../../models/Birthdays";
import { Repository } from "typeorm";

export default class SetBirthdayCommand extends Command {
  public constructor() {
    super("setbirthday", {
      aliases: ["setbirthday"],
      category: "Public Commands",
      description: {
        content: "Set your birthday",
        usage: "setbirthday [ date ] [ zone ]",
        examples: [
          "setbirthday March 17 2004 zone= Asia/Calcutta",
          "setbirthay 2nd December 1981",
          "setbirthay 29 June 2012 zone= America/Los_Angeles",
          "setbirthay 1st August 1998 zone= Europe/Berlin",
        ],
      },
      ratelimit: 3,
      args: [
        {
          id: "date",
          type: (msg: Message, str: string) => {
            var date = moment(str);
            return date.format("YYYY-MM-DD");
          },
          match: "rest",
          prompt: {
            start: (msg: Message) =>
              `${msg.author}, you must provide a date. Something alone the lines of "17 August 2011"`,
            retry: (msg: Message) =>
              `${msg.author}, you must provide a valid date!`,
          },
        },
        {
          id: "zone",
          type: "string",
          match: "option",
          flag: ["zone="],
          default: "Europe/London",
        },
      ],
    });
  }

  public async exec(
    message: Message,
    { date, zone }: { date: Date; zone: string }
  ): Promise<Message> {
    const birthdayRepo: Repository<Birthdays> =
      this.client.db.getRepository(Birthdays);
    const birthdays: Birthdays[] = await birthdayRepo.find({
      user: message.author.id,
    });
    date.toLocaleString("en-US", { timeZone: zone });
    if (!birthdays.length) {

        await birthdayRepo.insert({
            user: message.author.id,
            date: date,
          });
          return message.util.send(`Birthday saved!`);
      
    } else {

        await birthdayRepo.createQueryBuilder().update(Birthdays).set({date: date}).where({user: message.author.id}).execute()
            return message.util.send(`Birthday updated!`);
    }
  }
}
