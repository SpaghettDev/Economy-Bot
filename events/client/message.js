const Discord = require("discord.js"),
      db = require("discord.js"),
      chalk = require("chalk"),
      config = require(`${process.cwd()}/Configuration/config.json`);

module.exports = async(client, message) => {


//----------------------------------------------------------------------------------
//|                               Start of XP area                                 |
//----------------------------------------------------------------------------------
/*

    xp(message);

function xp(message) {
    if (!message.guild || message.author.bot) return;

    if (!client.cooldown.has(`${message.author.id}`) || !(Date.now() - client.cooldown.get(`${message.author.id}`) > client.config.cooldown)) {
    let xp = db.add(`xp_${message.author.id}`, 1);

    let level = Math.floor(0.3 * Math.sqrt(xp));

    let lvl = db.get(`level_${message.author.id}`) || db.set(`level_${message.author.id}`, 1);

    if (level > lvl) {
            let newLevel = db.set(`level_${message.author.id}`, level);

            message.channel.send(`:tada: ${message.author.toString()}, You just advanced to level ${newLevel}!`)
	    .then(m => m.delete({ timeout: 5000 }));
    }

        client.cooldown.set(`${message.author.id}`, Date.now());

        }
}
*/
//----------------------------------------------------------------------------------
//|                               Player Events                                    |
//----------------------------------------------------------------------------------
const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(",")})\\s*`);
if (!prefixRegex.test(message.content)) return;
if (!message.guild || message.author.bot) return;

const [, matchedPrefix] = message.content.match(prefixRegex);

const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);

const commandName = args.shift().toLowerCase();

const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(commandName));

if(!command) return;


if(command) {

    try {
	
	if(command.help.ownerOnly && message.author.id !== config.creatorID) {
	
		const noPerms = new Discord.MessageEmbed()
         		.setAuthor(client.user.username, client.user.avatarURL())
         		.setDescription(`:no_entry_sign: ${message.author.username}, you don't have the permission to run this command`)
         		.setColor(0xff0000)
         		.setFooter(`Contact a developer if you believe this isn't right`);

		message.reply(noPerms);
		return console.log(chalk.greenBright(command.help.name+".js")+chalk.reset(" : ")+chalk.yellowBright(message.author.tag)+chalk.reset(` has tried to execute the command ${chalk.cyanBright(command.help.name)} on the guild ${chalk.magenta(message.guild.name)}.`));
	}

        command.run(client, message, args);

    } catch (err) {
            
        console.error(err);
        message.reply("Error Code 500, Status Code 021. Please Contact A Developer For Help!");

    } finally {
            
        console.log(chalk.white(`[command-execute] The command: `)+chalk.red(`${commandName}`)+chalk.white(` has been executed by: `)+chalk.blue(`${message.author.tag} (${message.author.id})`)+chalk.white(` in `)+chalk.green(`${message.guild.name}.`));

        }
    };


	
}