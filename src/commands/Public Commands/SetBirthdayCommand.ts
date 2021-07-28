import { Command } from "discord-akairo";
import { Message, GuildMember, MessageEmbed, ImageSize } from "discord.js";
import moment from "moment-timezone";
import { Birthdays } from "../../models/Birthdays";
import { Repository } from "typeorm";

export default class SetBirthdayCommand extends Command {
  public constructor() {
    super("setbirthday", {
      aliases: ["setbirthday", "setbday"],
      category: "Public Commands",
      description: {
        content: "Set your birthday",
        usage: "setbirthday [ date ] [ zone ]",
        examples: [
          "setbirthday March 17 zone= Asia/Calcutta",
          "setbirthay 2nd December",
          "setbirthay 29 June zone= America/Los_Angeles",
          "setbirthay 1st August zone= Europe/Berlin",
        ],
      },
      ratelimit: 3,
      args: [
        {
          id: "datestring",
          type: "string",
          match: "rest",
          prompt: {
            start: (msg: Message) =>
              `${msg.author}, you must provide a date. Something alone the lines of "17 August"`,
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
    { datestring, zone }: { datestring: string; zone: string }
  ): Promise<Message> {
    
    let date = moment.tz(datestring, zone)

    let offset = date.utcOffset()

    let newdate = date.subtract(offset, "minutes").subtract(offset, "minutes")

    let newdatee = newdate.format("YYYY-MM-DD hh:mm:ss")

 
//dateString = dateString.split(' ').slice(0, 4).join(' ');
console.log(newdate);
console.log(newdatee);


    const birthdayRepo: Repository<Birthdays> =
      this.client.db.getRepository(Birthdays);
    const birthdays: Birthdays[] = await birthdayRepo.find({
      user: message.author.id,
    });

    if (!birthdays.length) {

        await birthdayRepo.insert({
            user: message.author.id,
            date: newdatee,
          });
          return message.util.send(`Birthday saved!`);
      
    } else {

        await birthdayRepo.createQueryBuilder().update(Birthdays).set({date: newdatee}).where({user: message.author.id}).execute()
            return message.util.send(`Birthday updated!`);
    }
  }
}
