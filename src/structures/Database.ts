import { ConnectionManager } from "typeorm"
import { Warns } from "../models/Warns"
import { dbName } from "../config" 
import { Giveaways } from "../models/Giveaways"

const connectionManager: ConnectionManager = new ConnectionManager()
connectionManager.create({
    name: dbName,
    type: "sqlite",
    database: "./db.sqlite",
    entities: [
        Warns,   //each of our database models
        Giveaways
    ]
})

export default connectionManager