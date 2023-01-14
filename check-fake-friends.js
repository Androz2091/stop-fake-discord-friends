const { config } = require('dotenv');
config();

const { readFileSync, writeFileSync } = require('fs');

const friends = readFileSync('data/friends.txt', 'utf-8').split('\n');
const channelsFriendsUserIds = readFileSync('data/friends-channels.txt', 'utf-8').split('\n').filter(line => friends.includes(line.split(',')[0]));
const checkedFriends = readFileSync('data/checked-friends.txt', 'utf-8').split('\n');

const missingChannelsFriendsUserIds = channelsFriendsUserIds.filter(channelData => !checkedFriends.includes(channelData.split(',')[0]));

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const token = process.env.DISCORD_USER_TOKEN;

(async () => {

    for (const channelData of missingChannelsFriendsUserIds) {

        const friendUserId = channelData.split(',')[0];
        const channelId = channelData.split(',')[1];

        const response = await fetch(`https://discord.com/api/v9/channels/${channelId}/messages?limit=50`, {
            headers: {
                Authorization: `${token}`
            }
        });
        const json = await response.json();
        const hasReplied = json.filter(message => message.author.id === process.env.DISCORD_USER_ID);
        const otherHasReplied = json.filter(message => message.author.id !== process.env.DISCORD_USER_ID);
        const username = otherHasReplied.length ? otherHasReplied[0].author.username : 'unknown';

        if (hasReplied.length === 0) {
            writeFileSync('data/fake-friends.txt', `\n${friendUserId} (${hasReplied.length}/${otherHasReplied.length}) named ${username}`, { flag: 'a' });
        } else {
            writeFileSync('data/real-friends.txt', `\n${friendUserId} (${hasReplied.length}/${otherHasReplied.length}) named ${username}`, { flag: 'a' });
        }
        writeFileSync('data/checked-friends.txt', `\n${friendUserId}`, { flag: 'a' });

        await sleep(1000);
        
        console.log(`[progress] ${friendUserId} [${channelsFriendsUserIds.indexOf(channelData) + 1}/${channelsFriendsUserIds.length}]`)
    }

})();


