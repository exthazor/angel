import { Listener } from "discord-akairo";
import { TextChannel, Message } from "discord.js";
import { Repository } from "typeorm";
import { Giveaways } from "../../models/Giveaways";
import { Birthdays } from "../../models/Birthdays";
import GiveawayManager from "../../structures/giveaways/GiveawayManager";
import BirthdayManager from "../../structures/birthdays/BirthdayManager"
import { client } from "../../bot";
import moment from "moment-timezone";

export default class ReadyListener extends Listener {
  public constructor() {
    super("ready", {
      emitter: "client",
      event: "ready",
      category: "client",
    });
  }

  public exec(): void {
    const giveawayRepo: Repository<Giveaways> =
      this.client.db.getRepository(Giveaways);

    const birthdayRepo: Repository<Birthdays> =
      this.client.db.getRepository(Birthdays);

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

      let datee = moment.utc();
      datee.set({ second: 0, year: 2001 });
      let dinga = datee.format("YYYY-MM-DD hh:mm:ss");
      const birthday: Birthdays[] = await birthdayRepo.find({ date: dinga });
      if(birthday.length>0){

        let greeter = new BirthdayManager()
        greeter.WishBirthday(birthday, client)
       
      }
 
    }, 6e4);
  }
}
