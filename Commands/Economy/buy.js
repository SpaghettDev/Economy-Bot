const Discord = require('discord.js');

module.exports = {
	help: {
		name: "buy",
		description: "Buy something from the store!",
		category: "Economy"
	},


run: async(client, message, args) => {

    let user = message.author;

    let author = await client.db.fetch(`money_${message.guild.id}_${user.id}.pocket`)

    let Embed = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(` You need 2000 coins to purchase Bronze VIP`);

    switch(args[0]) {
    case 'bronze':
        if (author < 3500) return message.channel.send(Embed)
        
        await client.db.fetch(`bronze_${message.guild.id}_${user.id}`);
        await client.db.set(`bronze_${message.guild.id}_${user.id}`, true)

        let Embed2 = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(` Purchased Bronze VIP For 3500 Coins`);

        await client.db.subtract(`money_${message.guild.id}_${user.id}.pocket`, 3500)
        message.channel.send(Embed2)
    break;

    case 'nikes':
        let Embedn = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(` You need 600 coins to purchase some Nikes`);

        if (author < 600) return message.channel.send(Embedn)
       
        await client.db.fetch(`nikes_${message.guild.id}_${user.id}`)
        await client.db.add(`nikes_${message.guild.id}_${user.id}`, 1)

        let Embed3 = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(` Purchased Fresh Nikes For 600 Coins`);

        await client.db.subtract(`money_${message.guild.id}_${user.id}.pocket`, 600)
        message.channel.send(Embed3)
    break;

    case 'car':
        let Embed4 = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(` You need 800 coins to purchase a new car`);

        if (author < 800) return message.channel.send(Embed4)
       
        await client.db.fetch(`car_${message.guild.id}_${user.id}`)
        await client.db.add(`car_${message.guild.id}_${user.id}`, 1)

        let Embed5 = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(` Purchased a New Car For 800 Coins`);

        await client.db.subtract(`money_${message.guild.id}_${user.id}.pocket`, 800)
        message.channel.send(Embed5)
    break;

    case "fish":
    case "fishing":
        let Embed6 = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(` You need 50 coins to purchase a fishing rod`);

        if (author < 50) return message.channel.send(Embed6);
        let iffish = await client.db.get(`fish_${message.guild.id}_${user.id}`);
        if(iffish !== null) {
            if(iffish.rod === 1) return message.channel.send("You already have a fishing rod!");
        }
        //await client.db.fetch(`fish_${message.guild.id}_${user.id}`)
        await client.db.add(`fish_${message.guild.id}_${user.id}.rod`, 1);
        await client.db.set(`fish_${message.guild.id}_${user.id}.fish`, [])

        let Embed7 = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(` Purchased a Fishing rod For 50 Coins`);

        await client.db.subtract(`money_${message.guild.id}_${user.id}.pocket`, 50)
        message.channel.send(Embed7)
    break;

    case 'mansion':
        let Embed8 = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(` You need 1200 coins to purchase a Mansion`);

        if (author < 1200) return message.channel.send(Embed8)
       
        await client.db.fetch(`house_${message.guild.id}_${user.id}`)
        await client.db.add(`house_${message.guild.id}_${user.id}`, 1)

        let Embed9 = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(` Purchased a Mansion For 1200 Coins`);

        await client.db.subtract(`money_${message.guild.id}_${user.id}.pocket`, 1200)
        message.channel.send(Embed9)
    break;

    default:
        let embed3 = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(' Enter an item to buy')
        message.channel.send(embed3)
    break;

        }
	}
}