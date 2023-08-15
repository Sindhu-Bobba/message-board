/* eslint-disable no-console */
import { connection } from "../boot.js"
import MessageSeeder from "./seeders/MessageSeeder.js"

class Seeder {
  static async seed() {
    console.log("Seeding Messages")
    await MessageSeeder.seed() 

    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder