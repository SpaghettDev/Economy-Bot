const Discord = require("discord.js");
const config = require("../../Configuration/config.json");

module.exports = { 
	help: {
		name:"exec",
		description: "Eexecute something in the powershell window",
		aliases: ["execute"],
		ownerOnly: true,
		category: "Owner"
	},
 
run: async(client, message, args) => {

var exec = require("child_process").exec;
        
        (function () {
            var code = args.join(" ");
            var t0 = Date.now();
            exec(code, (error, stdout, stderr) => {
              var t1 = Date.now();
              if (!error) {
                if (stdout) {
                  if (stdout.length > 1300) {
                    stdout = stdout.substr(stdout.length - 1299, stdout.length)
                  }
                }

var cleanedContent = clean(stdout);
var timeExec = (t1 - t0);

const embed1 = new Discord.MessageEmbed()
	.setColor(0x00FF00)
	.setAuthor(message.author.username, message.author.avatarURL())
	.addField(" :inbox_tray: Input: ", "```js\n" + code + "```", false)
	.addField(" :outbox_tray: Output: ", "```xl\n" + cleanedContent + "```", false)
	.setFooter(`Success | In ${timeExec} Miliseconds.`, client.user.avatarURL());
	
                message.channel.send(embed1);

  } else {

var cleanedContent = clean(error);
let timeExec = (t1 - t0);

const embed2 = new Discord.MessageEmbed()
	.setColor(0xff0000)
	.setAuthor(message.author.username, message.author.avatarURL())
	.addField(" :inbox_tray: Input: ", "```js\n" + code + "```", false)
	.addField(" :outbox_tray: Output: ", "```xl\n" + cleanedContent + "```", false)
	.setFooter(`Error | In ${timeExec} Miliseconds.`, client.user.avatarURL());

                message.channel.send(embed2);
                console.error(stderr);
              }
            });
          })();
          return;
        }
    };


function clean(text) {
  if (typeof(text) === "string") {
    return text.replace(/``/g, "`" + String.fromCharCode(8203) + "`").replace(/@/g, "@" + String.fromCharCode(8203));
  } else if (text !== null && text !== undefined) {
    return text.toString().replace(/``/g, "`" + String.fromCharCode(8203) + "`").replace(/@/g, "@" + String.fromCharCode(8203))
  } else {
    return text;
  }
}