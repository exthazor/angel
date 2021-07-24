import { ConnectionManager } from "typeorm"
import { Warns } from "../models/Warns"
import { dbName } from "../config" 
import { Giveaways } from "../models/Giveaways"
import { Replies } from "../models/Replies"

const connectionManager: ConnectionManager = new ConnectionManager()
connectionManager.create({
    name: dbName,
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "entropy",
    password: "kEYBOARDS7!",
    database: "AngDB",
    entities: [
        Warns,   //each of our database models
        Giveaways,
        Replies
    ]
})

export default connectionManager