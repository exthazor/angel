import { Command } from "discord-akairo";
import { Message, GuildMember } from "discord.js";

export default class KickCommand extends Command{
    public constructor(){
        super("kick", {
            aliases: ["kick"],
            category: "Moderation Commands",
            description: {
                content: "Kick a member in the server",
                usage: "Kick [ member ] < reason> ",
                examples: [
                    "kick @Host#0001 swearing",
                    "kick host swearing",
                    "kick @Captain Entropy$8973 defaming"
                ]
            },
            ratelimit: 3,
            userPermissions: ["KICK_MEMBERS"],
            args: [
                {
                    id: "member",
                    type: "member",
                    prompt: {
                        start: (msg: Message) => `${"<@" + msg.author + ">"}, provide a member to kick.`,
                        retry: (msg: Message) => `${"<@" + msg.author + ">"}, provide a valid member to kick.`
                    }
                },
                {
                    id: "reason",
                    type: "string",
                    match: "rest",
                    default: "creating trouble"
                }
            ]
        })
    }

    public async exec (message: Message, { member, reason }: { member: GuildMember, reason: string }): Promise<Message>{
       
        if(member.roles.highest.position >= message.member.roles.highest.position && message.author.id !== message.guild.ownerID) {
            console.log(message.guild.ownerID);
            return null
        }  

        member.kick(reason).catch(()=>null)
        return message.util.send(`**${"<@" + member.user.id + ">"}** has been kicked because of ${reason}.`)
    }
}