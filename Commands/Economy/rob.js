const Discord = require("discord.js");
const ms = require("parse-ms");
const { match } = require("../../functions.js")

module.exports = {
	help: {
		name: "rob",
		description: "Rob someone!",
		category: "Economy"
	},

run: async (client, message, args) => {  

  let user =
    message.mentions.users.first() ||
    client.users.cache.get(args[0]) ||
    match(args.join(" ").toLowerCase(), message.guild);

  let targetuser = await client.db.fetch(`money_${message.guild.id}_${user.id}.pocket`);
  let author     = await client.db.fetch(`rob_${message.guild.id}_${message.author.id}`);
  let author2    = await client.db.fetch(`money_${message.guild.id}_${message.author.id}.pocket`);

  let timeout = 6000000;

if (author !== null && timeout - (Date.now() - author) > 0) {
    
  let time = ms(timeout - (Date.now() - author));

    let timeEmbed = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`<a:false:737764891657633814> You have already robbed someone\n\nTry again in ${time.minutes}m ${time.seconds}s `);
    message.channel.send(timeEmbed)

  } else {

    let moneyEmbed = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`<a:false:737764891657633814> You need at least 200 coins in your wallet to rob someone`);


  if (author2 < 200) {
    return message.channel.send(moneyEmbed)
  }

  let moneyEmbed2 = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`<a:false:737764891657633814> ${user.username} does not have anything you can rob`);

  if (targetuser <= 0 || targetuser === null) {
    return message.channel.send(moneyEmbed2)
  }

  let authorembed = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`<a:false:737764891657633814> You cannot rob yourself!`);

  if(user.id === message.author.id) {
    return message.channel.send(authorembed)
  }

  let vip = await client.db.fetch(`bronze_${user.id}`)

  if(vip === true) random = Math.floor(Math.random() * parseInt(targetuser)) + 1;
  if(vip === null) random = Math.floor(Math.random() * 100) + 1;


  let embed = new Discord.MessageEmbed()
   .setDescription(`<a:yes:739569362440159252> You robbed ${user} and got away with ${random} coins`)
   .setColor("#FFFFFF")

   message.channel.send(embed)

await client.db.subtract(`money_${message.guild.id}_${user.id}.pocket`, random);
await client.db.add(`money_${message.guild.id}_${message.author.id}.pocket`, random);
await client.db.set(`rob_${message.guild.id}_${message.author.id}`, Date.now());
  
		}
	}
};