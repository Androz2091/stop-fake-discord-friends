// create txt files if not existing
const fs = require('fs');

if (!fs.existsSync('data')) {
  fs.mkdirSync('data');
}

if (!fs.existsSync('data/friends.txt')) {
  fs.writeFileSync('data/friends.txt', '');
}

if (!fs.existsSync('data/friends-channels.txt')) {
  fs.writeFileSync('data/friends-channels.txt', '');
}

if (!fs.existsSync('data/checked-friends.txt')) {
  fs.writeFileSync('data/checked-friends.txt', '');
}

if (!fs.existsSync('data/fake-friends.txt')) {
  fs.writeFileSync('data/fake-friends.txt', '');
}

if (!fs.existsSync('data/real-friends.txt')) {
  fs.writeFileSync('data/real-friends.txt', '');
}
