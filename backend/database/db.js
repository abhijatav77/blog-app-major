import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const main = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Database running successfully")
    } catch (error) {
        console.log(error.message)
    }
}

export default main;