import "reflect-metadata"
import { DataSource } from "typeorm"
import { Book } from "./entity/Book"

const env = process.env

export const AppDataSource = new DataSource({
    type: "postgres",
    host: env.POSTGRES_HOST,
    port: env.POSTGRES_PORT as unknown as number,
    username: env.POSTGRES_USER,
    password: env.POSTGRES_PASSWORD,
    database: env.POSTGRES_DB,
    synchronize: true,
    logging: false,
    entities: [Book],
    migrations: [],
    subscribers: [],
})
