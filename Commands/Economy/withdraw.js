const Discord = require("discord.js");
const ms = require("parse-ms");

module.exports = {
	help: {
		name: "withdraw",
		description: "Withdraw your money from the bank!",
		category: "Economy",
		aliases: ["with"]
	},
	
run: async (client, message, args) => {

  let user = message.author;

  let member = await client.db.fetch(`money_${message.guild.id}_${user.id}.pocket`)
  
  let member2 = await client.db.fetch(`money_${message.guild.id}_${user.id}.bank`)

  if (args[0] == 'all') {
    let money = await client.db.fetch(`money_${message.guild.id}_${user.id}.bank`)
    
    await client.db.subtract(`money_${message.guild.id}_${user.id}.bank`, money)
    await client.db.add(`money_${message.guild.id}_${user.id}.pocket`, money)
    
    let embed5 = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`<a:yes:739569362440159252> You have withdrawn ${args[0]} your coins from your bank`);
  message.channel.send(embed5)
  
  } else {

  let embed2 = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`<a:false:737764891657633814> Specify an amount to withdraw`);
  
  if (!args[0]) {
      return message.channel.send(embed2)
  }
  let embed3 = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`<a:false:737764891657633814> You can't withdraw negative money`);

  if (message.content.includes('-')) { 
      return message.channel.send(embed3)
  }
  let embed4 = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`<a:false:737764891657633814> You don't have that much money in the bank`);

  if (member2 < args[0]) {
      return message.channel.send(embed4)
  }

  let embed5 = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`<a:yes:739569362440159252> You have withdrawn ${args[0]} coins from your bank`);

  message.channel.send(embed5)
  await client.db.subtract(`money_${message.guild.id}_${user.id}.bank`, parseInt(args[0]))
  await client.db.add(`money_${message.guild.id}_${user.id}.pocket`, parseInt(args[0]))
		}
	}
}
