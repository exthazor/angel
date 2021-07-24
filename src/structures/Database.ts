import { ConnectionManager } from "typeorm"
import { Warns } from "../models/Warns"
//import { dbName } from "../config" 
import { Giveaways } from "../models/Giveaways"
import { Replies } from "../models/Replies"

const connectionManager: ConnectionManager = new ConnectionManager()
connectionManager.create({
    name: process.env.dbName,
    type: "postgres",
    url: process.env.DATABASE_URL,
    extra:{
        ssl: true
    },
    entities: [
        Warns,   //each of our database models
        Giveaways,
        Replies
    ]
})

export default connectionManager
