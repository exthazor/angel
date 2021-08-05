import { Command } from "discord-akairo";
import { GuildMember, Message, MessageEmbed } from "discord.js";
import moment from "moment";

const status = {
    online: "Online",
    idle: "Idle",
    dnd: "Do Not Disturb",
    offline: "Offline/Invisible"
};

export default class UserInfoCommand extends Command{
    public constructor(){
        super("userinfo", {
            aliases: ["userinfo", "info"],
            category: "Public Commands",
            description: {
              content:
                "Get information about any member, including yourself!",
              usage: 'ang userinfo @Entropy#0049 ',
              examples: [
                'ang userinfo @Cleeboos#7250', 'ang userinfo'
              ],
            },
            ratelimit: 3,
            args: [
              {
                id: "member",
                type: "member",
                match: "rest",
                    default: (msg: Message) => msg.member
              },
            ],
          });
    }

    public exec(message: Message, {member}: {member: GuildMember}): Promise<Message> {

        var permissions = [];


    if(member.hasPermission("KICK_MEMBERS")){
        permissions.push("Kick Members");
    }
    
    if(member.hasPermission("BAN_MEMBERS")){
        permissions.push("Ban Members");
    }
    
    

    if(member.hasPermission("MANAGE_MESSAGES")){
        permissions.push("Manage Messages");
    }
    
    if(member.hasPermission("MANAGE_CHANNELS")){
        permissions.push("Manage Channels");
    }
    
    if(member.hasPermission("MENTION_EVERYONE")){
        permissions.push("Mention Everyone");
    }

    if(member.hasPermission("MANAGE_NICKNAMES")){
        permissions.push("Manage Nicknames");
    }

    if(member.hasPermission("MANAGE_ROLES")){
        permissions.push("Manage Roles");
    }

    if(member.hasPermission("MANAGE_WEBHOOKS")){
        permissions.push("Manage Webhooks");
    }

    if(member.hasPermission("MANAGE_EMOJIS")){
        permissions.push("Manage Emojis");
    }

    if(permissions.length == 0){
        permissions.push("No Key Permissions Found");
    }
    if(member.hasPermission("ADMINISTRATOR")){
        permissions = []
        permissions.push(`👑 Administrator (all permissions)`)
    }

    if(member.user.id == message.guild.ownerID){
        permissions = []
        permissions.push(`👑 Server Owner (all permissions)`)
    }

    let convertBool = (x: Boolean) => {
        if(x){
            return "Yes"
        }
        return "No"
      };

    const embed = new MessageEmbed()
        .setDescription(`**\:busts_in_silhouette: USER INFORMATION \:busts_in_silhouette:**`)
        .setColor(`#800080`)
        .setThumbnail(member.user.displayAvatarURL())
        .setTimestamp()
        .addFields(
            { name: 'Username', value: `\`\`\`${member.user.username}\`\`\``, inline: true },
            { name: 'User ID', value: `\`\`\`${member.user.id}\`\`\``, inline: true }
        )
        .addField(`Roles [${member.roles.cache.filter(r => r.id !== message.author.id).map(roles => `\`${roles.name}\``).length - 1}]`,`\`\`\`${member.roles.cache.filter(r => r.id !== member.guild.id).map(roles => `${roles.name }`).join(", ") || "No Roles"}\`\`\``)
        .addFields(
            { name: 'Nickname', value: `\`\`\`${member.nickname}\`\`\``, inline: true },
            { name: 'Is a bot', value: `\`\`\`${convertBool(member.user.bot)}\`\`\``, inline: true }
        )
        .addField("Permissions ", `\`\`\`${permissions.join(', ')}\`\`\``)
        .addField("Joined this server on (DD/MM/YYYY)",`\`\`\`${moment(member.joinedAt).format("DD/MM/YYYY HH:mm")} (${moment(member.joinedAt, 'ddd MMM DD YYYY HH:mm').fromNow()})\`\`\``)
        .addField("Account created on (DD/MM/YYYY)",`\`\`\`${moment(member.user.createdAt).format("DD/MM/YYYY HH:mm")} (${moment(member.user.createdAt, 'ddd MMM DD YYYY HH:mm').fromNow()}) \`\`\``)
        
    return message.channel.send({embed});
    }
}