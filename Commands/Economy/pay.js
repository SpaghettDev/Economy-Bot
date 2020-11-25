const Discord = require("discord.js");
const ms = require("parse-ms");
const { match } = require("../../functions.js")

module.exports = {
	help: {
		name: "pay",
		description: "Pay someone!",
		category: "Economy"
	},

run: async(client, message, args) => {

  let user = message.mentions.members.first() ||
    client.users.cache.get(args[0]) ||
    match(args.join(" ").toLowerCase(), message.guild) ||
    message.author;


  let member = await client.db.fetch(`money_${message.guild.id}_${message.author.id}.pocket`);

  let embed1 = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`<a:Cross:618736602901905418> Mention someone to pay`);

  if (!user) {
      return message.channel.send(embed1)
  }
  let embed2 = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`<:Cross:618736602901905418> Specify an amount to pay`);
  
  if (!parseInt(args[1])) {
      return message.channel.send(embed2)
  }
  let embed3 = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`<:Cross:618736602901905418> You can't pay someone negative money`);

  if (message.content.includes('-')) { 
      return message.channel.send(embed3)
  }
  let embed4 = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`<:Cross:618736602901905418> You don't have that much money`);

  if (member < parseInt(args[1])) {
      return message.channel.send(embed4)
  }

  let embed5 = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`<:Check:618736570337591296> You have payed ${user.user.username} ${parseInt(args[1])} coins`);
  
  await client.db.add(`money_${message.guild.id}_${user.id}.pocket`, parseInt(args[1]));
  await client.db.subtract(`money_${message.guild.id}_${message.author.id}.pocket`, parseInt(args[1]));

  message.channel.send(embed5);
  

	}
}

