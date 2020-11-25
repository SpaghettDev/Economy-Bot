const slotItems = [":Grape:", ":Watermelon:", "🍊", ":Apple:", ":slot_machine:", ":Strawberry:", ":cherries:"];
const Discord = require('discord.js');

module.exports = {
	help: {
		name: "slots",
		description: "Play slots!",
		aliases: ["sl"],
		category: "Economy"
	},

run: async (client, message, args) => {

    let user = message.author;

    let moneydb = await client.db.fetch(`money_${message.guild.id}_${user.id}.pocket`)

    let money = parseInt(args[0]);

    let win = false;

    let moneymore = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`<a:false:737764891657633814> You are betting more than you have`);

    let moneyhelp = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`<a:false:737764891657633814> Specify an amount`);

    if (!money) return message.channel.send(moneyhelp);
    if (money > moneydb) return message.channel.send(moneymore);

    let number = []
    for (i = 0; i < 3; i++) { number[i] = Math.floor(Math.random() * slotItems.length); }

    if (number[0] == number[1] && number[1] == number[2]) { 
        money *= 9
        win = true;
    } else if (number[0] == number[1] || number[0] == number[2] || number[1] == number[2]) { 
        money *= 2
        win = true;
    }
    if (win) {
        let slotsEmbed1 = new Discord.MessageEmbed()
            .setDescription(`${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}\n\nYou won ${money} coins`)
            .setColor("#FFFFFF")
        message.channel.send(slotsEmbed1)
        await client.db.add(`money_${message.guild.id}_${user.id}.pocket`, money)
    } else {
        let slotsEmbed = new Discord.MessageEmbed()
            .setDescription(`${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}\n\nYou lost ${money} coins`)
            .setColor("#FFFFFF")
        message.channel.send(slotsEmbed)
        await client.db.subtract(`money_${message.guild.id}_${user.id}.pocket`, money)
		}

	}
}