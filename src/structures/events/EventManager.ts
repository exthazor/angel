import { Message, MessageEmbed } from "discord.js";

export default {
  async end(members: string[], message: Message, topic: string) {
    let embed = new MessageEmbed()
      .setColor("#8AC7DB")
      .setDescription(`**${topic} is starting now!** \n\n `)
      .setTitle(`Event Details`)
      .setURL(`${message.url}`);

    const event = await message.channel.send(`${members}`, {
      embed: embed,
    });
  },
};
