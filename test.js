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
            name: "Phát mã dùng thử nè :3",
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
	
	if (command === 'getkey' && message.channel.id === '678429357798326365') {
		if (talkedRecently.has(message.author.id)) {
            message.channel.send("Bạn đã từng nhận mã dùng thử rồi " + message.author);
    } else {
		message.delete(1);
		console.log(JSON.stringify(test.id[0]));
		const embed = new Discord.RichEmbed();
			embed.setColor('#7cfc00');
			embed.setDescription(JSON.stringify(test.id[0]).slice(1,-1));
			embed.setFooter('Bot nhận mã dùng thử', 'https://cdn.discordapp.com/avatars/440183187071565847/9c8af7e6708187fff54df15f291a2cee.png?size=2048')
			embed.setURL('https://www.facebook.com/teemo.love.tristana');
			embed.setAuthor('Mã dùng thử của bạn');
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