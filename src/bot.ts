//import {token, owners} from "./config";
import BotClient from "./client/BotClient"

let token = process.env.token
let owners = process.env.owners

const client: BotClient = new BotClient({ token, owners })
client.on('ready', () => {
    client.user.setActivity('ang help')
  })
client.start()