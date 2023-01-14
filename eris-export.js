const Eris = require("eris");

const { config } = require("dotenv");
config();

const { writeFileSync } = require("fs");

const bot = new Eris(process.env.DISCORD_USER_TOKEN);

bot.on("ready", () => {
    console.log("Exporting channels...");
    writeFileSync('data/friends-channels.txt', Object.keys(bot.privateChannelMap).map(friendUserId => `${friendUserId},${bot.privateChannelMap[friendUserId]}`).join('\n'));
    process.exit(0);
});

bot.connect();
