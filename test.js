const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./auth.json');
const test = require('./test.json');
const talkedRecently = new Set();

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
            message.channel.send("You can receive free key" + message.author);
    } else {
		message.delete(1);
		console.log(JSON.stringify(test.id[0]));
		const embed = new Discord.RichEmbed();
			embed.setColor('#7cfc00');
			embed.setDescription('**'+JSON.stringify(test.id[0]).slice(1,-1)+'**');
			embed.setFooter('FreeKey', 'https://media.discordapp.net/attachments/678913388109365251/678920510326833173/shirt-1518262621-717fa1f4d5e416e9eda600d78b8c58ac.png?width=424&height=424')
			embed.setURL('https://www.facebook.com/teemo.love.tristana');
			embed.setAuthor('Here your key :3');
		client.users.get(message.author.id).send(embed);
		test.id.splice(0,1);
        talkedRecently.add(message.author.id);
        setTimeout(() => {
          // Removes the user from the set after a minute
          talkedRecently.delete(message.author.id);
        }, 1000000000);
    }
    }

}
});

client.login(auth.token);