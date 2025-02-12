import {
    Client
} from "discord.js-selfbot-v13";
import colors from "colors/safe.js";

export const ready = async(client: Client) => {
    initialConsole(client);
};

/**@param {Client} client*/
function initialConsole(client: Client) {
    console.log(`${colors.blue(`[${client?.user?.username}] is ready!.`)}`);
}