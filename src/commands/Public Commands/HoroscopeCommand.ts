import { Command } from "discord-akairo";
import { Message } from "discord.js";
import { Repository } from "typeorm";
import { GetBirthdays } from "../../models/GetBirthdays";
import HoroscopeManager from "../../structures/birthdays/HoroscopeManager";
const fetch = require("node-fetch");

export default class HoroscopeCommand extends Command{
    public constructor(){
        super("horoscope", {
            aliases: ["horoscope", "hor"],
            category: "Public Commands",
            description: {
              content: "Get your daily horoscope for the day!",
              usage: 'horoscope',
              examples: ['ang horoscope']
            },
            ratelimit: 3
          });
        }

        public async exec(message: Message):Promise<Message>{

          const userid = message.author.id

          const getBirthdayRepo: Repository<GetBirthdays> =
      this.client.db.getRepository(GetBirthdays);

      const birthday: GetBirthdays[] = await getBirthdayRepo.find({
        user: userid
    });

    if(!birthday){
      return message.util.send("Oops! It looks like you haven't entered your birthday using the setbirthday command. For help with it, use 'ang help setbirthday'.")
    }

      const string: string[] = birthday[0].date.split(" ")
      let month = string[0]
      let day = string[1].replace(/[a-z]/g, '')
      const sign = HoroscopeManager.Zodiac_Sign(day, month)


      const url = "https://www.horoscopes-and-astrology.com/json";
      let arr = new Array
      arr.push(sign)

      const response = await fetch(url).then(res => res.json()).then( res => {
        let str:string = JSON.stringify(res.dailyhoroscope)
        const start:number = str.toString().indexOf(`${sign}`)
        str = str.substring(start, 200+start).split("<")[0].split('"')[2]

        message.util.send(`${str}`)

      })       
        }
    }