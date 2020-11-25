const discord = require("discord.js");
const config = require("../../Configuration/config.json");

module.exports = { 
	help: {
		name:"botnick",
		description: "Set's the client's nickname",
		aliases: ["bn", "clientnick", "cn"],
		ownerOnly: true,
		category: "Owner"
	},
 
run: async(client, message, args) => {

    const clientnickname = args.join(" ");
        
    message.guild.members.cache.get(client.user.id)
	.setNickname(clientnickname);

    message.channel.send('Done.');

     }
}