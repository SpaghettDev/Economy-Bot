const Discord = require("discord.js");

module.exports = { 
	help: {
		name:"eval",
		description: "Evaluate some code",
		aliases: ["ev"],
		ownerOnly: true,
		category: "Owner"
	},

run: async(client, message, args) => {

  const code = args.join(" ");


 const no = new Discord.MessageEmbed()
    .setImage(`https://media.giphy.com/media/nR4L10XlJcSeQ/giphy.gif`)
    .setColor(0xffa500);


if(message.content.includes(client.token || config.token || child.process || config)) {
  message.channel.send(no);
}

if(code.length === 0) {
    return message.channel.send("**Gimme something to work with!**");
}
    try {

      let evaled = eval(code);
      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);
        message.channel.send(evaled, { split: true, code: true });

    } catch (err) {
      message.channel.send(err, { split: true, code: true });

    }
}};