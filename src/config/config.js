import dotenv from "dotenv";
import path from "node:path";

dotenv.config({path:process.env.NODE_ENV=="PROD"
    ?path.resolve("./.env.prod")
:path.resolve("src/.env.dev")});


export const PORT = Number(process.env.PORT||3000);
export const DB_URI = process.env.DB_ATLAS || "";
export const SALT_ROUND = Number(process.env.SALT_ROUND) || 12;
export const ENCRYP_KEY = process.env.ENCRYP_KEY || "";
