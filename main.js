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

client.on('guildMemberAdd', msg => {
msg => )
msg.guild.channels.get('484648408372740099').send({embed: {
color: 3447003,
author: {
  name: client.user.username,
  icon_url: client.user.avatarURL
},
title: "Welcome To ()!",
url: "https://districtservices.net",
description: "@MEMBER",
fields: [{
    name: "Fields",
    value: "They can have different fields with small headlines."
  },
  {
    name: "Masked links",
    value: "You can put [masked links](http://google.com) inside of rich embeds."
  },
  {
    name: "Markdown",
    value: "You can put all the *usual* **__Markdown__** inside of them."
  }
],
timestamp: new Date(),
footer: {
  icon_url: client.user.avatarURL,
  text: "© Example"
}
}}))

client.login(auth.token);