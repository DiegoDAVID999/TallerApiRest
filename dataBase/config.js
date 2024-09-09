import mongoose from "mongoose";

export default async function dbConection() {
    try {
        await mongoose.connect(process.env.MONGO_CNN)
        console.log('Connect to Database')
    } catch (error) {
        console.log(error)
    }
}

