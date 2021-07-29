 
import { ConnectionManager } from "typeorm"
import { Warns } from "../models/Warns"
//import { dbName } from "../config" 
import { Giveaways } from "../models/Giveaways"
import { Replies } from "../models/Replies"
import { Birthdays } from "../models/Birthdays"
import { GetBirthdays } from "../models/GetBirthdays"

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
        Replies,
        Birthdays,
        GetBirthdays
    ]
})

export default connectionManager