const Discord = require("discord.js");
const ms = require("parse-ms");

module.exports = {
	help: {
		name: "beg",
		description: "Beg on the streets for some money!",
		category: "Economy"
	},


run: async(client, message, args) => {

  let user = message.author;
  let timeout = 60000;

  let multiplier = await client.db.fetch(`multiplier_${message.guild.id}`);
  if(!multiplier) multiplier = 1;
  let amounta = Math.floor(Math.random() * 30) + 1;

  let amounts = amounta * multiplier;

  let beg = await client.db.fetch(`beg_${message.guild.id}_${user.id}`);

  if (beg !== null && timeout - (Date.now() - beg) > 0) {
    let time = ms(timeout - (Date.now() - beg));
  
    let timeEmbed = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`<a:false:737764891657633814> You've already begged recently\n\nBeg again in ${time.minutes}m ${time.seconds}s `);
    message.channel.send(timeEmbed)
  } else {

  await client.db.add(`money_${message.guild.id}_${user.id}.pocket`, amounts);
  await client.db.set(`beg_${message.guild.id}_${user.id}`, Date.now());

   message.channel.send(`<a:yes:739569362440159252> You've begged on the streets and received ${amounts} coins`)
  

		}
	}
}