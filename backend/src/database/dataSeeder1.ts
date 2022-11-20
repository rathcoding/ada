import { DataSource } from "typeorm"

export const AppDataSeeder = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5435,
    username: "admin",
    password: "admin",
    database: "postgres",
    entities: ["./src/entities/*.ts"],
    migrations: ["./src/database/seeders/1/*.ts"],
})

AppDataSeeder.initialize()
    .then(() => {
        console.log("Database Seeded: level, skill, stage, professional, company")
    })
    .catch((err) => {
        console.error("Error during Data Seeders 1...", err)
    })