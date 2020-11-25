const Discord = require("discord.js");
const ms = require("parse-ms");

module.exports = {
	help: {
		name: "deposit",
		description: "Deposit some money to your local bank!",
		aliases: ["dep"],
		category: "Economy"
	},

run: async(client, message, args) => {

  let user = message.author;

  let member = await client.db.fetch(`money_${message.guild.id}_${user.id}.pocket`)

  if (args[0] == 'all') {
    let money = await client.db.fetch(`money_${message.guild.id}_${user.id}.pocket`)

    let embedbank = new Discord.MessageEmbed()
    .setColor('#FFFFFF')
    .setDescription("<a:false:737764891657633814> You don't have any money to deposit")

    if(money === 0 || money === null) return message.channel.send(embedbank)

    await client.db.add(`money_${message.guild.id}_${user.id}.bank`, money)
    await client.db.subtract(`money_${message.guild.id}_${user.id}.pocket`, money)
    let embed5 = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`<a:yes:739569362440159252> You have deposited ${args[0]} coins into your bank`);
  message.channel.send(embed5)
  
  } else {

  let embed2 = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`<a:false:737764891657633814> Specify an amount to deposit`);
  
  if (!args[0]) {
      return message.channel.send(embed2)
      .catch(err => console.log(err))
  }
  let embed3 = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`<a:false:737764891657633814> You can't deposit negative money`);

  if (message.content.includes('-')) { 
      return message.channel.send(embed3)
  }
  let embed4 = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`<a:false:737764891657633814> You don't have that much money`);

  if (member < args[0]) {
      return message.channel.send(embed4)
  }

  let embed5 = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`<a:yes:739569362440159252> You have deposited ${parseInt(args[0])} coins into your bank`);

  await client.db.subtract(`money_${message.guild.id}_${user.id}.pocket`, parseInt(args[0]));
  await client.db.add(`money_${message.guild.id}_${user.id}.bank`, parseInt(args[0]));
  

  message.channel.send(embed5);
  
  
		}
	}
}