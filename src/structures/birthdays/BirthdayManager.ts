import { memory } from "console"
import { TextChannel } from "discord.js"
import { Message, MessageEmbed, MessageReaction, Client, Guild, GuildMember, UserManager} from "discord.js"
import { Repository } from "typeorm"
import BotClient from "../../client/BotClient"
import { Birthdays } from "../../models/Birthdays"
import { guildID } from "../../config"

export default{
    async WishBirthday(birthdays: Birthdays[], client: BotClient){

        let text = "Come on everyone! Let's wish a very happy birthday to "

        for(var birthday of birthdays){

            let date = birthday.date
            let userid = birthday.user
           

            client.users.fetch(userid, false).then((user) => {
                const guild = client.guilds.cache.get(guildID)
                const member = guild.member(user)
                var role = member.guild.roles.cache.find(role => role.name === "Birthday");
                member.roles.add(role);
                user.send(`Happy birthday ${user.username}! All of us from the Facade server hope that the day treats you well and gives you plenty to smile about.` + ` ❤️`);
                const channel = client.channels.cache.get(`794298702403076128`)
                text.concat(`${"<@" + member.user.id + ">"}  `)

                // if (channel.isText()) {
                // (<TextChannel> channel).send(`Come on everyone! Let's wish ${"<@" + member.user.id + ">"} a happy birthday!`)
                // }
            })
           
        }
        text.concat("!!!")  

        setTimeout(async => {
            for(var birthday of birthdays){

                let date = birthday.date
                let userid = birthday.user

                client.users.fetch(userid, false).then((user) => {
                    const guild = client.guilds.cache.get(guildID)
                    const member = guild.member(user)
                    var role = member.guild.roles.cache.find(role => role.name === "Birthday");
                    member.roles.remove(role)
                })
            }
        }, 8.64e7)
        
    }
}