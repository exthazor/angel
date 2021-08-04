import { Command } from "discord-akairo";
import { Message, GuildMember } from "discord.js";

export default class BaneCommand extends Command{
    static arr = new Array
    public constructor(){
        super("bane", {
            aliases: ["bane", "adam"],
            category: "Fun Commands",
            description:{
                content: "Miss Adam from Angela' server? Not anymore! Now you can have him on your server. If you don't know who those are, just imagine a very drunk Bane from The Dark Knight Rises.",
                usage: "bane [ sentence ]",
                examples: [
                    "bane my life has been a lie",
                    "bane is this the real life?"
                ]
            },
            ratelimit: 69,
            args:[
                {
                    id: "sentence",
                    type: "string",
                    match: "rest",
                }
            ]
        })
         
    }

    public exec(message: Message, {sentence}: {sentence: string}): Promise<Message>{

        
        if(sentence == null){

             
            let replies: string[] = ["Creeeeboooos why did you change the song", "I raav you Creeeboooos", "it fucking hurts everybody ignores me on the server", "You guys are hiding. When I go offline you jump in lmao", "Creeeeboooos don't change the song for fuck's sake!", "msst will you be my girfriend", "guys you want to phasmophobia", "Creeboooos show your face", "Turn on the camera Cleebooooos", "I boosted this server give me mod", "Make me DJ I boost server", "I am Angel's favourite singer I sing for her"]

            let randomNumber = Math.floor(Math.random() * replies.length)
            
            BaneCommand.arr.push(randomNumber)

            if(( BaneCommand.arr.length > 1) && (BaneCommand.arr[BaneCommand.arr.length-1] == BaneCommand.arr[BaneCommand.arr.length-2])){
                BaneCommand.arr.pop()
                randomNumber+=Math.floor(Math.random() * replies.length) + 1
                randomNumber%=BaneCommand.arr.length     
            }
            if(BaneCommand.arr.length > 3){
                BaneCommand.arr.shift()
            }


            return message.util.send(replies[randomNumber] + ` <:baneemoji:863137506786017301>`)

        }
        else {
            let output_text = sentence.replace(/l/g,"r").replace(/e/g, "eeeeee").replace(/o/g, "oooooooo")
            output_text+=" <:baneemoji:863137506786017301>"
            return message.util.send(output_text)
            }
    }
}
