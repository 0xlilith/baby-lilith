const Discord = require("discord.js")
const client = new Discord.Client()
const config = require("./config.json")

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interaction', async interaction => {
	if (!interaction.isCommand()) return;
	if (interaction.commandName === 'ping') {
		await interaction.reply('Pong!');
	}
});

client.login(config.token);