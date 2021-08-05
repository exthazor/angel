import { Command } from "discord-akairo";
import { Message, MessageEmbed, MessageAttachment } from "discord.js";
let fetch = require("node-fetch")
let gamedig = require("gamedig")
let Sentry = require("@sentry/node")

export default class MinecraftCommand extends Command {
  public constructor() {
    super("minecraft", {
      aliases: ["minecraft", "mc"],
      category: "Public Commands",
      description: {
        content: "Shows information about the Facade Minecraft server",
        usage: "minecraft",
        examples: ["ang minecraft"],
      },
      ratelimit: 3,
    });
  }

  public async exec(message: Message){
    const ip = "51.210.223.125:25624";
    const seed = '1678699387508013518'

    const favicon = `https://eu.mc-api.net/v3/server/favicon/${ip}`;
    let options = {
        type: "minecraft",
        host: ip,
        port: ""
    };

    if(ip.split(":").length > 1){
        options = {
            type: "minecraft",
            host: ip.split(":")[0],
            port: ip.split(":")[1]
        }
    }

    const m = await message.channel.send(`<a:loading:872930514212909097> Loading`);

    let json = null;
    
    await gamedig.query(options).then((res) => {
        json = res;
    }).catch((err) => {
        Sentry.captureException(err);
    });

    if(!json){
        options.type = "minecraftpe";
        await gamedig.query(options).then((res) => {
            json = res;
        }).catch((err) => {
            Sentry.captureException(err);
        });
    }
    const imgRes = await fetch("https://www.minecraftskinstealer.com/achievement/a.php?i=2&h=Success&t="+ip);
    const imgAttachment = new MessageAttachment(await imgRes.buffer(), "success.png");

    let players: Player[] = json.players

    let string_players:string = ""
    console.log("0")
    console.log(string_players)
    if (players == null){
        string_players += ["Nobody..it's lonely on the server"]
        console.log("1")
        console.log(string_players)
    }
    else{
        var i = 0
        for(var player of players){
            string_players += player.name.toString()
            string_players += "\n"
            i++
        }
    }
    


    const embed = new MessageEmbed()
        .setDescription(`⛏️ **FACADE MINECRAFT SERVER** ⛏️`)
        .addField("Minecraft Version", `\`\`\`${json.raw.vanilla.raw.version.name}\`\`\``)
        .addField(`Seed`, `\`\`\`${seed}\`\`\``)
        .addField(`Players online (${i})`, `\`\`\` ${string_players} \`\`\``)
        .addField("Maximum Players allowed", `\`\`\`${json.maxplayers}\`\`\``)
        .addField("Ping", `\`\`\`${json.raw.vanilla.ping}\`\`\``)
        .setColor(`#5b8731`)
        .setThumbnail(favicon)
        .setFooter(`${json.connect}`)
        .setThumbnail(`https://www.nicepng.com/png/full/21-212187_view-samegoogleiqdbsaucenao-steve-minecraft-steve-with-pickaxe.png`)
    m.delete()
    m.channel.send({ embed, files: [imgAttachment] });
  }

}