const { config } = require('dotenv');
config();

const { writeFileSync } = require('fs');

const token = process.env.DISCORD_USER_TOKEN;

fetch('https://discord.com/api/v9/users/@me/relationships', {
    method: 'GET',
    headers: {
        Authorization: `${token}`
    }
}).then(res => res.json()).then((friends) => {
    writeFileSync('data/friends.txt', friends.map(friend => friend.user.id).join('\n'));
});
