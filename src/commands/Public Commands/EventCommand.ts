import { Command } from "discord-akairo";
import { Message, MessageEmbed } from "discord.js";
import ms from "ms"
import moment from "moment";
import EventManager from "../../structures/events/EventManager";

export default class EventCommand extends Command {
  public constructor() {
    super("event", {
      aliases: ["event", "session", "sesh"],
      category: "Public Commands",
      description: {
        content:
          "Create events and sessions to watch a movie with your friends, play a game, or even gossip about drama (unlike me)!  Once an event is created, you'll be able to RSVP to it, convert timezones, or edit it via reaction. Anyone who RSVPs will recieve a DM asking if they would like reminders ",
        usage: 'ang sesh [ topic ] in/at/on [ time ] [ member/s ]',
        examples: [
          'ang event Valorant in 5 hours @Valorant',
          'ang event create drama in 3 minutes @Cleeboos @Nico',
        ],
      },
      ratelimit: 3,
      args: [
        {
          id: "items",
          match: "content",
          prompt: {
            start: (msg: Message) =>
              `${msg.author}, you must provide session information.`,
          },
        },
      ],
    });
  }

  public async exec(message: Message, args){

    let member = message.member
    let nickname = member ? member.displayName : null;

    if (!message && !message.channel)
      return message.reply("Channel is inaccessible.");

      
      const items = args.items.split(/\sin\s|\sIN\s|\sIn\s|\siN\s|\son\s|\sON\s|\sOn\s|\soN\s|\sat\s|\sAT\s|\saT\s|At/)
      
      const topic = items[0]

      const time:string = items[1].split("<")[0].trim()
      const end: number = Date.now() + Number(ms(time));
   
     let embed = new MessageEmbed()
            .setColor("#8AC7DB")
            .setDescription(`**\:calendar_spiral:   ${topic}**`)
            .addFields(
              { name: 'Time', value: `${moment(end).format('LLLL')}` },
              { name: 'Attendees', value: '-' },
        )
        .setFooter(
          `✅ RSVP | Created by ${nickname}`
        )

        let sentEmbed = new MessageEmbed()
             .setColor("#8AC7DB")
             .setTitle("RSVP Confirmation")
             .setDescription(`Hello kind sir/ma'am! You have joined \:white_check_mark: **Attendees** for ${topic}`)
             .addFields(
               { name: "Event Time", value: `<t:${Math.round(end/1000)}:F>`},
             )
            

        const botMessage: Message = await message.channel.send(embed)

        let text:string = ""

        botMessage.react("✅")

        const rsvpFilter = (reaction, user) => {
          return ['✅'].includes(reaction.emoji.name) && !user.bot;
        };

        const rsvpCollector = botMessage.createReactionCollector(rsvpFilter, { time: ms(time), dispose: true });

        rsvpCollector.on('collect', (reactions, user) => {
            text+= user.toString()
            text+=`\n`
            embed.fields[1] = {name: `✅Attendees (${reactions.count - 1})`, value: `${text}`, inline: false}
            botMessage.edit(embed)
            user.send(
              sentEmbed
            );
       });

       rsvpCollector.on('remove', (reactions, user) => {
          let attendees = `✅Attendees (${reactions.count - 1})`
          text = text.replace(user.toString(), "")
          if(!text.replace(/(^[ \t]*\n)/gm, "")){
            text+="-"
          }
          if(reactions.count = 1){
            attendees = 'Attendees'
          }
          embed.fields[1] = {name: attendees, value: `${text}`, inline: false}
          botMessage.edit(embed)
       });

       
       let str:string = items[1]
       str = str.substring(str.indexOf('<') - 1)
       const members:string[] = str.split(' ').filter((str)=>{
        return /\S/.test(str)
       })

      setTimeout(() => {
        EventManager.end(members, botMessage, topic)
      }, Number(ms(time)))

  }
}
