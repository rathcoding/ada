import { DataSource } from "typeorm"

export const AppDataSeeder = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5435,
    username: "admin",
    password: "admin",
    database: "postgres",
    entities: ["./src/entities/*.ts"],
    migrations: ["./src/database/seeders/3/*.ts"],
})

AppDataSeeder.initialize()
    .then(() => {
        console.log("Database Seeded: job_skill, application")
    })
    .catch((err) => {
        console.error("Error during Data Seeders 3...", err)
    })