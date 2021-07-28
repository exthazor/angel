import { Message, MessageEmbed } from "discord.js";
import { Command } from "discord-akairo";
import { Repository, ILike } from "typeorm";
import { Birthdays } from "../../models/Birthdays";
import moment from "moment";

export default class RecentBirthdayCommand extends Command{
    public constructor(){
        super("recentbirthday", {
            aliases: ["recentbirthday", "recentbirthdays", "recentbday", "recentbdays", "resentbirthday", "resentbirthdays", "resentbday", "resentbdays", "recent", "resent"],
            category: "Public Commands",
            description: {
                content: "See all the upcoming birthdays for the current month",
                usage: "recentbirthdays",
                examples: [
                "ang recentbirthdays"
               ],
            },
            ratelimit: 3,
        })
    }

    public async exec(message: Message){
        const birthdayRepo: Repository<Birthdays> =
        this.client.db.getRepository(Birthdays);

        let currentMonth = moment.utc().format("MM")
        console.log(currentMonth)

        const birthdays: Birthdays[] = await birthdayRepo.find({
            date: ILike(`_____%${currentMonth}%____________`)
        });
        
        // let users = birthdayRepo
        // .createQueryBuilder("user")
        // .where("birthdays.date like :date", { date:`_____%${currentMonth}%____________` })
        // .getMany();

        let text = ""

        for (const birthday of birthdays) {

            let birthdate = moment(birthday.date.toString(), "YYYY-MM-DD hh:mm:ss")
            let hehe = birthdate.format("MMMM Do")

            text += ` ${"<@" + birthday.user + ">"}  : \`${hehe}\`\n\n`;
          }


        const Embed = new MessageEmbed()
            .setColor("#FF1493")
            .setDescription(`${text}`)


          let desc:string = "Birthdays for this month are:" 
            const poll = await message.channel.send(`🎁 ${desc}`, {
                embed: Embed
            })





    } 
} 