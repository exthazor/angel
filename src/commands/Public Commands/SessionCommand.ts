import { Command } from "discord-akairo";
import { Message } from "discord.js";

export default class SessionCommand extends Command {
  public constructor() {
    super("sesh", {
      aliases: ["sesh", "session"],
      category: "Public Commands",
      description: {
        content:
          "Create events and sessions to watch a movie with your friends, play a game, or even gossip about drama (unlike me)!  Once an event is created, you'll be able to RSVP to it, convert timezones, or edit it via reaction. Anyone who RSVPs will recieve a DM asking if they would like reminders ",
        usage: 'ang sesh [ topic ] in/at/on [ time ] [ member/s ] [ channel ] ',
        examples: [
          'sesh Valorant in 5 hours @everyone #valorant',
          'sesh Finding Nemo on 5 hours @everyone #valorant',
        ],
      },
      ratelimit: 3,
      args: [
        {
          id: "items",
          match: "content",
          prompt: {
            start: (msg: Message) =>
              `${msg.author}, you must provide a question for your poll!`,
          },
        },
      ],
    });
  }
}
