import {
    Client
} from "discord.js-selfbot-v13";
import dotenv from "dotenv";
import colors from "colors/safe.js";
dotenv.config();

if (!process.env.token) {
    console.error(colors.red("Token isn't set as an environment variable."));
    process.exit(1);
}

const client = new Client();

import { ready } from "./events/ready.js";
import { messageCreate } from "./events/messageCreate.js";

client.on("ready", async(c) => ready(c));
client.on("messageCreate", async(m) => messageCreate(m));

client.login(process.env.token);