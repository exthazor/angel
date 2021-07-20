import { time } from 'console'
import { Command } from 'discord-akairo'
import { Message, MessageEmbed } from 'discord.js'
import { ms } from 'ms'
import { Repository } from 'typeorm'
import { Giveaways } from '../../models/Giveaways'
import GiveawayManager from '../../structures/giveaways/GiveawayManager'

export default class GiveawayCommand extends Command {
    public constructor() {
        super('giveaway', {
            aliases: ['giveaway', 'gift', 'competition'],
            category: 'Public Commands',
            description: {
                content: 'Start a giveaway',
                usage: 'giveaway [ time ] [ item ]',
                examples: [
                    'giveaway 10m Discord Nitro'
                ]
            },
            ratelimit: 3,
            args: [
                {
                    id: 'time',
                    type: (msg: Message, str: string) => {
                        return Number(ms(str))      //returns a time in ms, if not then goes to prompt
                    },
                    prompt: {
                        start: (msg: Message) => `${"<@" + msg.author + ">"}, you must provide a time!`,
                        retry: (msg: Message) => `${"<@" + msg.author + ">"}, you must provide a valid time!`
                    }
                },
                {

                }
            ]
        })
    }
}