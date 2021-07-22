import { Command } from "discord-akairo"
import { Message, GuildMember } from "discord.js"
import { Repository } from "typeorm"
import { Warns } from "../../models/Warns"

export default class WarnCommand extends Command{
    public constructor(){
        super("warn", {
            aliases: ["warn"],
            category: "Moderation Commands",
            description: {
                content: "Warn a member in the server",
                usage: "warn [ member ] < reason> ",
                examples: [
                    "warn @Host#0001 swearing",
                    "warn host swearing",
                    "warn @Captain Entropy$8973 defaming"
                ]
            },
            ratelimit: 3,
            userPermissions: ["MANAGE_MESSAGES"],
            args: [
                {
                    id: "member",
                    type: "member",
                    prompt: {
                        start: (msg: Message) => `${"<@" + msg.author + ">"}, please provide a member to warn you lil shit`,
                        retry: (msg: Message) => `${"<@" + msg.author + ">"}, please provide a valid member to warn you misogynist`
                    }
                },
                {
                    id: "reason",
                    type: "string",
                    match: "rest",
                    default: "being a drama creator"
                }
            ]
        })    
    }

    public async exec(message: Message, { member, reason }: {member: GuildMember, reason: string }): Promise<Message>{
        const warnRepo: Repository<Warns> = this.client.db.getRepository(Warns)

        if(member.roles.highest.position >= message.member.roles.highest.position && message.author.id !== message.guild.ownerID) {
            console.log(message.guild.ownerID);
            return message.util.reply(`OMG **${"<@" + member.user.id + ">"}** has a higher role than you, you litle drama creator. I hate drama please don't do something like this anymore or I delete my discord bye.`)
        }
        await warnRepo.insert({
            guild: message.guild.id,
            user: member.id,
            moderator: message.author.id,
            reason: reason
        })

        return message.util.send(`Drama alert! **${"<@" + member.user.id + ">"}** has been warned by **${"<@" + message.author.id + ">"}** for *${reason}*`)
    }
}
