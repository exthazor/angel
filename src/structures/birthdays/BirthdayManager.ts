import { TextChannel } from "discord.js";
import BotClient from "../../client/BotClient";
import { Birthdays } from "../../models/Birthdays";
//import { guildID } from "../../config";

export default class BirthdayManager {
  static arr = new Array();

  async WishBirthday(birthdays: Birthdays[], client: BotClient) {
    let textStrings: string[] = [
      "Come on everyone! Let's wish a very happy birthday to ",
      "Alright guys instead of spewing drama all the time why don't you wish a very happy birthday to ",
      "Nico is an asshole he forgets everyone's birthdays because he is busy idolising fascism but you guys should definitely wish a happy birthday to  ",
      "Entropy is so dumb that he forgets everyone's birthdays but I remember them all because I am so smart hehe. So c'mon everyone let's wish a veryy happy birthday to  ",
      "Roses are red, violets are Blue, there's no one as cute and fun as you! Happy Birthday to ",
      "Berry might be a master manipulator but she could not succeed in making me not remind everyone to wish a very happy birthday to ",
      "Hey cuties!! Let's wish a very happy birthday to  ",
    ];

    let randomNumber = Math.floor(Math.random() * textStrings.length);

    BirthdayManager.arr.push(randomNumber);

    if (
      BirthdayManager.arr.length > 1 &&
      BirthdayManager.arr[BirthdayManager.arr.length - 1] ==
        BirthdayManager.arr[BirthdayManager.arr.length - 2]
    ) {
      BirthdayManager.arr.pop();
      randomNumber += Math.floor(Math.random() * textStrings.length) + 1;
      randomNumber %= BirthdayManager.arr.length;
    }
    if (BirthdayManager.arr.length > 3) {
      BirthdayManager.arr.shift();
    }

    let text = textStrings[randomNumber];

    for (var birthday of birthdays) {
      let date = birthday.date;
      let userid = birthday.user;

      await client.users.fetch(userid, false).then((user) => {
        const guild = client.guilds.cache.get(process.env.guildID);
        const member = guild.member(user);
        var role = member.guild.roles.cache.find(
          (role) => role.name === "Birthday"
        );
        member.roles.add(role);
        user.send(
          `Happy birthday ${user.username}! All of us from the Facade server hope that the day treats you well and gives you plenty to smile about.` +
            ` ❤️`
        );

        text += `${"<@" + member.user.id + ">"}  `;
      });
    }
    const channel = client.channels.cache.get(`794298702403076128`);
    text += "!!!";
    if (channel.isText()) {
      (<TextChannel>channel).send(`${text}`);
    }

    setTimeout((async) => {
      for (var birthday of birthdays) {
        let date = birthday.date;
        let userid = birthday.user;

        client.users.fetch(userid, false).then((user) => {
          const guild = client.guilds.cache.get(process.env.guildID);
          const member = guild.member(user);
          var role = member.guild.roles.cache.find(
            (role) => role.name === "Birthday"
          );
          member.roles.remove(role);
        });
      }
    }, 8.64e7);
  }
}
