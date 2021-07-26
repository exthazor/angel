import {token, owners} from "./config";
import BotClient from "./client/BotClient"
import ReadyListener from "./listeners/client/ReadyListener"

export const client: BotClient = new BotClient({ token, owners })
client.on('ready', () => {
    client.user.setActivity('ang help')
  })

client.start()