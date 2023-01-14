const { config } = require('dotenv');
config();

const { readFileSync, writeFileSync } = require('fs');

const existingChannelsFriendsUserIds = readFileSync('data/friends-channels.txt', 'utf-8').split('\n').map(line => line.split(',')[0]);
const friendsUserIds = readFileSync('data/friends.txt', 'utf-8').split('\n');

const missingFriendsUserIds = friendsUserIds.filter(friendUserId => !existingChannelsFriendsUserIds.includes(friendUserId));

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const token = process.env.DISCORD_USER_TOKEN;

(async () => {

    for (const friendUserId of missingFriendsUserIds) {
        const response = await fetch(`https://discord.com/api/v9/users/@me/channels`, {
            method: 'POST',
            headers: {
                Authorization: `${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                recipients: [friendUserId],
                type: 1
            })
        });
        const json = await response.json();
        const channelId = json.id;
        writeFileSync('data/friends-channels.txt', `\n${friendUserId},${channelId}`, { flag: 'a' });

        await sleep(1000);
        
        console.log(`[progress] ${friendUserId} [${missingFriendsUserIds.indexOf(friendUserId) + 1}/${missingFriendsUserIds.length}]`)
    }

})();


