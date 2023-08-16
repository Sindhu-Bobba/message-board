/* eslint-disable no-console */
import { connection } from "../boot.js"
import MessageSeeder from "./seeders/MessageSeeder.js"
import UserSeeder from "./seeders/UserSeeder.js"


class Seeder {
  static async seed() {
    console.log("Seeding users")
    await UserSeeder.seed()
    
    console.log("Seeding Messages")
    await MessageSeeder.seed()

    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder