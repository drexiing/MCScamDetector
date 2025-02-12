import {
    Message,
    Guild,
    DMChannel
} from "discord.js-selfbot-v13";
import colors from "colors/safe.js";
import config from "../config/bot-config.json" assert { type: "json" };

const detectedUsers = new Set<string>();

export const messageCreate = async(message: Message) => {
    await scamDetectorInGuilds(message);
}

/**@param {Message} message*/
async function scamDetectorInGuilds(message: Message) {
    if (message.author.bot) return;
    if (!message?.guild) return;

    const allowedGuildsIds = config.guilds.map(guild => guild.id);
    if (!allowedGuildsIds.includes(message.guild.id)) return;

    const guild = config.guilds.find(guild => guild.id === message.guild?.id);
    if (!guild) return;
    
    const allowedChannelsIds: string[] = guild.channelsIds;
    if (!allowedChannelsIds.includes(message.channel.id)) return;
    
    const profile = await message.author.getProfile();
    const mutualScamGuilds = profile.mutual_guilds
        .map((guild: Guild) => message.client.guilds.cache.get(guild.id))
        .filter((guild: Guild): guild is Guild => guild !== undefined && config.scamGuildsIds.includes(guild.id));

    if (mutualScamGuilds.length > 0) {
        if (detectedUsers.has(message.author.id)) return;
        detectedUsers.add(message.author.id);

        console.log([
            `${colors.red(`${message.author.username} (${message.author.id}) has been detected as a potential scammer.`)}`,
            `${colors.red(`- Mutual Guilds:`)}`,
            ...mutualScamGuilds.map((guild: Guild) => colors.red(`  • ${guild.name} (${guild.id})`))
        ].join("\n"));

        const channel = message.client.channels.cache.get(config.loggingChannel) as DMChannel;
        if (!channel) return;

        channel.send({
            content: [
                `${message.author.username} (${message.author.id}) has been detected as a potential scammer.`,
                `- Mutual Guilds:`,
                ...mutualScamGuilds.map((guild: Guild) => `  - ${guild.name} (${guild.id})`)
            ].join("\n")
        }).catch(() => null);
    }
}