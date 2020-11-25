const Discord = require("discord.js");
const { match } = require("../../functions.js")

module.exports = {
	help: {
		name: "profile",
		description: "Get the profile/Inventory of someone!",
		aliases: ["inventory", "inv"],
		category: "Economy"
	},

run: async (client, message, args) => { 

  let user = message.mentions.users.first() ||
  client.users.cache.get(args[0]) ||
  match(args.join(" ").toLowerCase(), message.guild) ||
  message.author;

  let bal = await client.db.fetch(`money_${message.guild.id}_${user.id}.pocket`);
  if (bal === null) bal = 0;

  let bank = await client.db.fetch(`money_${message.guild.id}_${user.id}.bank`);
  if (bank === null) bank = 0;

  let vip = await client.db.fetch(`bronze_${message.guild.id}_${user.id}`);
    if(vip === null) vip = 'None'
    if(vip === true) vip = 'Bronze'

  let shoes = await client.db.fetch(`nikes_${message.guild.id}_${user.id}`);
  if(shoes === null) shoes = 0;

  let newcar = await client.db.fetch(`car_${message.guild.id}_${user.id}`);
  if(newcar === null) newcar = 0;

  let newhouse = await client.db.fetch(`house_${message.guild.id}_${user.id}`);
  if(newhouse === null) newhouse = 0;

  let fish = await client.db.fetch(`fish_${message.guild.id}_${user.id}.fish`);

  let moneyEmbed = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setDescription(`**${user}'s Profile:**\n
  **Net Worth:** ${+bank + +bal}
  **VIP Rank:** ${vip}
  \n**Inventory**
  \n**Nikes:** ${shoes}
  **Cars:** ${newcar}
  **Mansions:** ${newhouse}
  **Fish & Stuff:** ${(fish === null) ? "No Fish." : (fish.join(" ").toString().length > 2000) 
  ? "You have too many fish! Please run the fishes command!" 
  : fish.join(", ")}`);

  message.channel.send(moneyEmbed);
	}
};
