import { Command } from "discord-akairo";
import { GuildMember, Message } from "discord.js";
import { Repository } from "typeorm";
import { Replies } from "../../models/Replies";

export default class AddReplyCommand extends Command{
    public constructor(){
        super("add", {
            aliases: ["add"],
            category: "Public Commands",
            description: {
                content: "Adds user custom roasts",
                usage: "add [ user ] [ roast ]",
                examples: [
                    "ang add @Host#0001 why do you spread rumour?",
                ]
            },
            ratelimit: 3,
            userPermissions: ["MANAGE_MESSAGES"],
            args: [
                {
                    id: "member",
                    type: "member",
                    prompt: {
                        start: (msg: Message) => `${"<@" + msg.author + ">"}, please provide a member for me to add my special custom roasts you lil shit`,
                        retry: (msg: Message) => `${"<@" + msg.author + ">"}, please provide a valid member for me to add my special custom roasts you lil shin you misogynist`
                    }
                },
                {
                    id: "roast",
                    type: "string",
                    match: "rest",
                    default: "omg why do you like drama so much?"
                }
            ]
            }
        )}

        public async exec (message: Message, {member, roast}: {member: GuildMember, roast: string}): Promise<Message>{
            const replyRepo: Repository<Replies> = this.client.db.getRepository(Replies)

            await replyRepo.insert({
                guild: message.guild.id,
                user: member.id,
                roast: roast
            })
    
            return message.util.send(`Roast saved!`)
        }
    }
