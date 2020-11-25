const Discord = require("discord.js");
const { match } = require("../../functions.js")

module.exports = {
	help: {
		name: "balance",
		description: "Check's your balance!",
		aliases: ["bal"],
		category: "Economy"
	},

run: async(client, message, args) => {

  let user = message.mentions.users.first() ||
  client.users.cache.get(args[0]) ||
  match(args.join(" ").toLowerCase(), message.guild) || 
  message.author;

  let bal = await client.db.fetch(`money_${message.guild.id}_${user.id}.pocket`);
  if (bal === null) bal = 0;

  let bank = await client.db.fetch(`money_${message.guild.id}_${user.id}.bank`);
  if (bank === null) bank = 0;

  let TotalMoney = bank + bal;

  let moneyEmbed = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`**${user}'s Balance**\n
  **Pocket:** ${bal}
  **Bank:** ${bank}
  **Total:** ${TotalMoney}`);
  message.channel.send(moneyEmbed)
	}
}