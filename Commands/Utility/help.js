const Discord = require('discord.js');
const config = require("../../Configuration/config.json");

module.exports = {
  	help: {
      		name: "help",
      		description: "The basic Help command",
      		aliases: ["commands", "halp"],
		      usage: "(command)",
      		category: "Utility"
},

/**
 * Big thanks to Androz2091 for his beutiful help command, i couldn't get it to work...
 * but Androz's help command is just, perfect, be sure to check him out at 
 * @link https://github.com/Androz2091
 */

run: async(client, message, args) => {

const data = [];
const commands = client.commands;

const categories = [];

if(!args[0]) {

	commands.forEach((command) => {
		if(!categories.includes(command.help.category)){

			if(command.help.category === "Owner" && message.author.id !== config.creatorID) {
				return;
			}
				categories.push(command.help.category);
			}
	});

		const embed = new Discord.MessageEmbed()
			.setColor("RANDOM")
      .setFooter(`To get help on a specific command type "!help <command>" !`, client.user.avatarURL());

		categories.sort().forEach((cat) => {

      const tCommands = commands.filter((cmd) => cmd.help.category === cat);

			embed.addField(`${cat} - (${tCommands.size})`, tCommands.map((cmd) => ` \`${cmd.help.name}\` `).join(" | "));

    });

    embed.setAuthor(message.author.username, message.author.displayAvatarURL());

		message.channel.send(embed);

    } else {

    const name = args[0].toLowerCase();

		const command = client.commands.get(name) || client.commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			return message.reply("that's not a valid command!");
		}

    const embedcommandinfo = new Discord.MessageEmbed();

		embedcommandinfo.setTitle(`**Name:** ${command.help.name}`)
		    .setColor("BLUE")
		    .setDescription(`**Description:**\n${command.help.description}`)
		    .addField(`**Category:**`, `${command.help.category}`, true);

    if (command.help.aliases) embedcommandinfo.addField(`**Aliases:**`, ` \`${command.help.aliases.join(', ') || "None"}\` `, true);
    if (command.help.usage) 	embedcommandinfo.addField(`**Usage:**`, `!${command.help.name} ${command.help.usage}`).setFooter(`"<>" is required, while "()" is optional`);

		message.channel.send(embedcommandinfo);
    }
  }
};