import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from "../config/env";

if(!DB_URI) {
    throw new Error("DB_URI is not defined in environment variable inside .env<development/production>.local");
}
const connectionToDatabase = async () => {
    try {
        await mongoose.connect(DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`Connected to MongoDB database in ${NODE_ENV} mode.`);
    } catch (error) {
        console.error("Error connecting to MongoDB database:", error);
        process.exit(1); // Exit the process with failure
    }
}