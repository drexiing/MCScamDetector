import {
    Client
} from "discord.js-selfbot-v13";
import dotenv from "dotenv";
dotenv.config();

const client = new Client();

import { ready } from "./events/ready.js";
import { messageCreate } from "./events/messageCreate.js";

client.on("ready", async(c) => ready(c));
client.on("messageCreate", async(m) => messageCreate(m));

client.login(process.env.token);