import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5435,
    username: "admin",
    password: "admin",
    database: "postgres",
    entities: ["./src/entities/*.ts"],
    migrations: ["./src/database/migrations/*.ts"],
})

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })