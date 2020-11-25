const Discord = require("discord.js");
const ms = require("parse-ms");

module.exports = {
	help: {
		name: "weekly",
		description: "Get your weekly money!",
		category: "Economy"
	},
	
run: async (client, message, args) => {

  let user = message.author;
  let timeout = 604800000;
  let am = 500;
  let multiplier = await client.db.fetch(`multiplier_${message.guild.id}`);
  if(!multiplier) multiplier = 1;
  let amount = 500 * multiplier;

  let weekly = await client.db.fetch(`weekly_${message.guild.id}_${user.id}`);

  if (weekly !== null && timeout - (Date.now() - weekly) > 0) {
    let time = ms(timeout - (Date.now() - weekly));
  
    let timeEmbed = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`<a:false:737764891657633814> You have already collected your weekly reward\n\nCollect it again in ${time.days}d ${time.hours}h ${time.minutes}m ${time.seconds}s `);
    message.channel.send(timeEmbed)
  } else {
    let moneyEmbed = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`<a:yes:739569362440159252> You've collected your weekly reward of ${amount} coins`);
  message.channel.send(moneyEmbed);

  await client.db.add(`money_${message.guild.id}_${user.id}.pocket`, amount);
  await client.db.set(`weekly_${message.guild.id}_${user.id}`, Date.now());


		}
	}
}