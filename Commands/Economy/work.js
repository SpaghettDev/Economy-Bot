const Discord = require('discord.js');
const ms = require("parse-ms");

module.exports = {
	help: {
		name: "work",
		description: "Work to get some money!",
		category: "Economy"
	},
	
run: async (client, message, args) => {

    let user = message.author;
    
    let author = await client.db.fetch(`work_${message.guild.id}_${user.id}`)

    let timeout = 300000;
    
    if (author !== null && timeout - (Date.now() - author) > 0) {
        let time = ms(timeout - (Date.now() - author));
    
        let timeEmbed = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`<a:false:737764891657633814> You have already worked recently\n\nTry again in ${time.minutes}m ${time.seconds}s `);
        message.channel.send(timeEmbed)
      } else {

        let replies = ['Programmer','Builder','Waiter','Busboy','Chief','Mechanic']

        let result = Math.floor((Math.random() * replies.length));
        let amounta = Math.floor(Math.random() * 80) + 1;
        let multiplier = await client.db.fetch(`multiplier_${message.guild.id}`);
        if(!multiplier) multiplier = 1;
        let amount =  amounta * multiplier;

        let embed1 = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`<a:yes:739569362440159252> You worked as a ${replies[result]} and earned ${amount} coins`);
        message.channel.send(embed1)
        
        await client.db.add(`money_${message.guild.id}_${user.id}.pocket`, amount)
        await client.db.set(`work_${message.guild.id}_${user.id}`, Date.now())
		};
	}
}
