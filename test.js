const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./auth.json');
const test = require('./test.json');
const talkedRecently = new Set();
const mysql = require('mysql');
 
var conn = mysql.createConnection('mysql://be2b476c9358e7:7c276e3d@us-cdbr-iron-east-04.cleardb.net/heroku_f5ade555c3d61d0?reconnect=true');
 
conn.connect(function(err) {
  if (err) console.log(err)
	else console.log("Connected!");
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
	client.user.setPresence({
        status: "online",
        game: {
            name: "Free Key :3",
            type: "STREAMING"
        }
    }); 
});

client.on('message', message => {

if (message.author.bot) return;
const prefix = auth.prefix;
if (message.content.startsWith(prefix)) {
	
	const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
	
	if (command === 'getkey') {
		if (talkedRecently.has(message.author.id)) {
            message.channel.send("You cant receive free key" + message.author);
    } else {
		message.delete(1);
		var sql = "SELECT `key_value` FROM `key` ORDER BY `id` DESC LIMIT 0,1"
		conn.query(sql, function(err, results) {
			
            if (err) {var ans = err};
            ans = JSON.stringify(results).slice(15,-5);
			console.log(typeof(ans));
		const embed = new Discord.RichEmbed();
			embed.setColor('#7cfc00');
			embed.setDescription('**'+ans+'**');
			embed.setFooter('FreeKey', 'https://media.discordapp.net/attachments/678913388109365251/678920510326833173/shirt-1518262621-717fa1f4d5e416e9eda600d78b8c58ac.png?width=424&height=424');
			embed.setAuthor('Here your key :3');
		client.users.get(message.author.id).send(embed);
        talkedRecently.add(message.author.id);
        setTimeout(() => {
          // Removes the user from the set after a minute
          talkedRecently.delete(message.author.id);
        }, 1000000000);
		});
		var sql2 = "DELETE FROM `key` WHERE status='0' ORDER BY id DESC LIMIT 1";
		conn.query(sql2, function(err, results) {
            if (err) {message.channel.send("Error!")};
            message.channel.send("Success!");
		});
    }
    }

}
});

client.login(auth.token);