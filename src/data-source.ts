import "reflect-metadata"
import { DataSource } from "typeorm"
import { Task } from "./entities/Task"

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    entities : [Task],
    synchronize: true, 
})