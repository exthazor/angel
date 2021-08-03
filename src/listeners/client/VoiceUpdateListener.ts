import { Listener } from "discord-akairo";
import { TextChannel, VoiceState } from "discord.js";
import { client } from "../../bot";

export default class VoiceUpdateListener extends Listener {
  public constructor() {
    super("voiceStateUpdate", {
      emitter: "client",
      event: "voiceStateUpdate",
      category: "client",
    });
  }

  public async exec(oldState: VoiceState, newState: VoiceState): Promise<void> {
    const vcTextChannel = client.channels.cache.get("872110391952556062");
    

    if (newState.channel != null) {
      if (
        (newState.channel.id == "869972539449937960" || newState.channel.id == "857786438799851570" || newState.channel.id == "858099988462829598" || newState.channel.id == "858102785736572968" || newState.channel.id == "858104385262452806" || newState.channel.id == "869971483907219537") &&
        oldState.channel == null
      ) {
        let newVoiceChannel = newState.channel;
        newVoiceChannel.members.forEach(async (member) => {
          (vcTextChannel as TextChannel).updateOverwrite(member, {
            SEND_MESSAGES: true,
            VIEW_CHANNEL: true,
          });
        });
      }
    }
    if (oldState.channel != null) {
      if (
        (oldState.channel.id == "869972539449937960" || oldState.channel.id == "857786438799851570" || oldState.channel.id == "858099988462829598" || oldState.channel.id == "858102785736572968" || oldState.channel.id == "858104385262452806" || oldState.channel.id == "869971483907219537") &&
        newState.channel == null
      ) {
        (vcTextChannel as TextChannel).overwritePermissions([{
            id: oldState.member.id,
            deny: ['VIEW_CHANNEL'],
        },])
      }
    }
  }
}
