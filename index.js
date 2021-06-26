const Discord = require("discord.js");
const client = new Discord.Client();

const config = require("./config.json");
const command = require("./command");

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);

  // test command
  command(client, "test", (message) => {
    message.channel.send("testing..");
  });

  // counts total members
  command(client, "servers", (message) => {
    client.guilds.cache.forEach((guild) => {
      message.channel.send(
		  `Name: ${guild.name} Members: ${guild.memberCount}`
		);
    });
  });

  command(client, ['cc', 'clearchannel'], message => {
	  if (message.member.hasPermission('ADMINISTRATOR')) {
		  message.channel.messages.fetch().then((results) => {
			  message.channel.bulkDelete(results)
		  })
	  }
  })

  // to update the bot status
  command(client, 'status', message => {
	  const content = message.content.replace('!status', '')

	  client.user.setPresence({
		activity: {
			name: content,
			type: 0,
		},
	  })
  })
})

//client.login(process.env.TOKEN);
client.login(config.token);
