import "reflect-metadata"
import { DataSource } from "typeorm"
import { Task } from "./entities/Task"
import * as dotenv from 'dotenv'

dotenv.config()

export const AppDataSource = new DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    },
    entities: [Task],
    synchronize: true, 
    logging: true
})