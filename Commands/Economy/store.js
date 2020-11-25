const Discord = require('discord.js')

module.exports = {
	help: {
		name: "store",
		description: "Check the store!",
		category: "Economy"
	},

run: async (client, message, args) => {

    let embed = new Discord.MessageEmbed()
	.setDescription(
		"**VIP Ranks**\n\n\
		Bronze: 3500 Coins [,buy bronze]\n\n\
		**Lifestyle Items**\n\n\
		Fresh Nikes: 600 [,buy nikes]\n\
		Car: 800 [,buy car]\n\
		Mansion: 1200 [,buy mansion]\n\n\
		**Useful items**\n\
		Fishing Rod: 50 [,buy fishing]")
    .setColor("#FFFFFF")
    message.channel.send(embed)

	}
}