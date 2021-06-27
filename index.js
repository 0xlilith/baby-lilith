const Discord = require("discord.js");
const client = new Discord.Client();

const config = require("./config.json");
const command = require("./command");
//const fMessage = require("./fMessage")
const pmessage = require("./pmessage")

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);

  // test command
  command(client, "test", (message) => {
    message.channel.send("testing...");
  });

  // info command
  command()

  // counts total members
  command(client, "server", (message) => {
    client.guilds.cache.forEach((guild) => {
      message.channel.send(
        `Name: ${guild.name} Members: ${guild.memberCount}`
      );
    });
  });

  // clear chat
  command(client, ['cc', 'clearchat'], message => {
    if (message.member.hasPermission('ADMINISTRATOR')) {
      message.channel.messages.fetch().then((results) => {
        message.channel.bulkDelete(results)
      })
    }
  })

  // to update the bot status
  command(client, 'status', message => {
    const content = message.content.replace('+status', '')

    client.user.setPresence({
      activity: {
        name: content,
        type: 0,
      },
    })
  })

  // reaction message
  //fMessage(client, '858399914803200020', "test test!!", ['🇯🇵','👽'])

  // private message to user
  pmessage(client, "baby-lilith pm", "hello")

  // create text channel
  command(client, 'crtch', (message) => {
    const name = message.content.replace('+crtch ', '')
    //const user = message.

    message.guild.channels.create(name, {
      type: 'text'
    }).then(channel => {
      //console.log(channel)
      message.channel.send(`<@${message.author.id}> \`Created Text Channel:\` <#${channel.id}>`)
    })
  })

  // create voice channel
  command(client, 'crtvc', (message) => {
    const name = message.content.replace('+crtvc ', '')
    const user = message.author

    message.guild.channels.create(name, {
      type: 'voice'
    }).then(channel => {
      message.channel.send(`<@${message.author.id}> \`Created Voice Channel:\` <#${channel.id}>`)
    })
  })
})

//client.login(process.env.TOKEN);
client.login(config.token);
