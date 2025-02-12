# MCScamDetector for Discord

## About

**MCScamDetector** is a self-bot for Discord designed to combat the growing wave of Minecraft verification scams. These scams typically involve fake verification systems that first ask for a Minecraft username to grant access to a server. Next, they request an email address and send a verification code. If the victim enters that code into the Discord modal, scammers can hijack their account, change all credentials, and ultimately take full control, resulting in the loss of access to both their Outlook email and Minecraft account.

> [!WARNING]
> **I don't take any responsibility for blocked Discord accounts that used this module.**

> [!CAUTION]
> **Using this on a user account is prohibited by the [Discord TOS](https://discord.com/terms) and can lead to the account block.**

## How the self-bot works

> [!IMPORTANT]
> **For this self-bot to function properly, it is extremely important that it is a member of scam servers, as this is required to send alerts about potential scammers.**

- The self-bot monitors messages from users in a server, retrieves their profiles, and checks if any of their mutual guilds match known scam servers. If a match is found, it sends an alert to a designated channel with information about the detected potential scammer and the scam servers they have in common.

## Usage

> [!IMPORTANT]
> **The bot must also be a member of the servers you want to monitor.**

## Setup

### Install Dependencies

```sh-session
npm install  # Install dependencies (if not already installed)
```

### Configure bot-config.json

- Set "loggingChannel" to the channel ID where scam detection logs should be sent.
- Define "guilds" with the server and channel IDs to monitor.
- List scam-related server IDs under "scamGuildsIds" to identify potential scammers.

```json
{   
    "loggingChannel": "1234567891011",
    "guilds": [
        {
            "id": "1234567891011",
            "channelsIds": ["1234567891011"]
        }
    ],
    "scamGuildsIds": ["1234567891011", "1234567891011"]
}
```

### Running the Bot

```sh-session
node .
```

## Credits

- [Discord.js](https://github.com/discordjs/discord.js)
- [Discord.js-selfbot](https://github.com/aiko-chan-ai/discord.js-selfbot-v13)