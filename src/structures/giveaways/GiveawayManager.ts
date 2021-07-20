import { UserFlags } from 'discord.js'
import { Message, MessageEmbed, MessageReaction, User } from 'discord.js'
import { endianness } from 'os'
import { Repository } from 'typeorm'
import { Giveaways } from '../../models/Giveaways'

export default {
    async end(giveawayRepo: Repository<Giveaways>, msg: Message) {
        await msg.fetch() //fetch the message in case it is not cached when you restart the bot during the giveaway example 
        giveawayRepo.delete({ message: msg.id }) //delete the giveaway when the event has ended. You delete it by message.id which is our unique key in a way

        const reaction: MessageReaction = await msg.reactions.cache.filter(r => r.emoji.name === '🎉').first().fetch() //fetch it just in case it is not cached
        await reaction.users.fetch()  //fetch all the users who have reacted
        const winner: User = reaction.users.cache.filter(w => !w.bot).random()  //filter out bots and pick a user at random

        const embed: MessageEmbed = msg.embeds[0]
        embed.setFooter("Giveaway Ended.")  //edit the embed
        embed.setColor('#f44336')  //red
        embed.addField('Winner:', winner ? `${winner} (${winner.tag})` : "No winners this time everyone's a loser LMAO! :joy: ")
        msg.edit(embed) //place newly edited embed in the message to edit the message to show our winner!
    }
}