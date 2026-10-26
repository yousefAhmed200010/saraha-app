import mongoose from "mongoose";
import { DB_URI } from "../../config/config.js";
import dns from 'node:dns'
export async function dbConnection() {
    try {

        console.log(DB_URI);

        dns.setServers(["1.1.1.1", "1.0.0.1"]);

        await mongoose.connect(DB_URI);
        console.log("db connected ");
    }


    catch (err) {
        console.log("db connection failed");
        console.log(err);


    }
}