import { Command } from "discord-akairo";
import { GuildMember, Message } from "discord.js";
import { Repository } from "typeorm";
import { Replies } from "../../models/Replies";

export default class ReplyCommand extends Command{
    public constructor(){
        super("roast", {
            aliases: ["roast"],
            category: "Fun Commands",
            description: {
                content: "Respond to user custom roasts",
                usage: "roast [ member ]",
                examples: [
                    "roast",
                    "roast @Host#0001",
                    "roast @Captain Entropy#8973",
                    "roast host"
                ]
            },
            ratelimit: 3,
            args: [
                {
                    id: "member",
                    type: "member",
                    default: (msg: Message) => msg.member
                }
            ]
        })
    }

    public async exec (message: Message, { member }: { member: GuildMember }): Promise<Message>{
        const roastRepo: Repository<Replies> = this.client.db.getRepository(Replies);
        const replies: Replies[] = await roastRepo.find({ user: member.id, guild: message.guild.id });
        
        if(!replies.length) return message.util.reply("Alice and I love this person, we will try to get them to join our server and feed them with lies.");

        let randomNumber = Math.floor(Math.random() * replies.length)
            var arr = new Array
            arr.push(randomNumber)
            if((arr.length > 1) && (arr[arr.length-1] == arr[arr.length-2])){
                (randomNumber+=1)%replies.length
                arr.shift()
            }

        const randomReply = replies[randomNumber];
        return message.util.send(randomReply.roast)
    }
}