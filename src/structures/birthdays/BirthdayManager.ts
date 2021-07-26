import { memory } from "console"
import { TextChannel } from "discord.js"
import { Message, MessageEmbed, MessageReaction, Client, Guild, GuildMember, UserManager} from "discord.js"
import { Repository } from "typeorm"
import BotClient from "../../client/BotClient"
import { Birthdays } from "../../models/Birthdays"

export default{
    async WishBirthday(birthday: Birthdays[], client: BotClient){
        let date = birthday[0].date
        let userid = birthday[0].user

        client.users.fetch(userid, false).then((user) => {
            const guild = client.guilds.cache.get('857786438313443348')
            const member = guild.member(user)
            var role = member.guild.roles.cache.find(role => role.name === "Birthday");
            member.roles.add(role);
            user.send('Happy birthday! All of us from the Facade hope that the day treats you well and gives you plenty to smile about.' + `❤️`);

            client.channels.cache.get(`channelID`)

            const channel = client.channels.cache.get(`857786438313443351`)

            if (channel.isText()) {
              (<TextChannel> channel).send(`Come on everyone! Let's wish ${member.user.id} a happy birthday!`)
            }
        })
    }
}