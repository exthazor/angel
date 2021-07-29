import { ConnectionManager } from "typeorm"
import { Warns } from "../models/Warns"
import { dbName } from "../config" 
import { Giveaways } from "../models/Giveaways"
import { Replies } from "../models/Replies"
import { Birthdays } from "../models/Birthdays"
import { GetBirthdays } from "../models/GetBirthdays"

const connectionManager: ConnectionManager = new ConnectionManager()
connectionManager.create({
    name: dbName,
    type: "sqlite",
    database: "./db.sqlite",
    entities: [
        Warns,   //each of our database models
        Giveaways,
        Replies,
        Birthdays,
        GetBirthdays
    ]
})

export default connectionManager