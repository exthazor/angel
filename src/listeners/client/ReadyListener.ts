import { Listener } from "discord-akairo";
import { TextChannel, Message } from "discord.js";
import { Repository } from "typeorm";
import { Giveaways } from "../../models/Giveaways";
import { Birthdays } from "../../models/Birthdays";
import GiveawayManager from "../../structures/giveaways/GiveawayManager";
import BirthdayManager from "../../structures/birthdays/BirthdayManager"
import BotClient from "../../client/BotClient";
import {client} from "../../bot" 

export default class ReadyListener extends Listener {

  public constructor() {
    super("ready", {
      emitter: "client",
      event: "ready",
      category: "client",
    })

  }

  public exec(): void {
    

    const giveawayRepo: Repository<Giveaways> =
      this.client.db.getRepository(Giveaways);

    const birthdayRepo: Repository<Birthdays> = this.client.db.getRepository(Birthdays)

    console.log(`*${this.client.user.tag}* is now online and ready!`);

    setInterval(async () => {
      const giveaways: Giveaways[] = await giveawayRepo.find();
      giveaways
        .filter((g) => g.end <= Date.now())
        .map(async (g) => {
          const msg: Message = await (
            this.client.channels.cache.get(g.channel) as TextChannel
          ).messages
            .fetch()
            .catch(() => null);

          if (!msg) return giveawayRepo.delete(g);

          GiveawayManager.end(giveawayRepo, msg);
        });

        const birthday: Birthdays[] = await birthdayRepo.find({date: new Date()});
        console.log(birthday)
        if(birthday.length == 1){
          BirthdayManager.WishBirthday(birthday, client)
        }
        if(birthday.length > 1){
          //kinda sus bro ngl
        }
    }, 3e3); 

  }


}
