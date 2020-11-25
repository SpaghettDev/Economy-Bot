const Discord = require('discord.js');
const { ReactionCollector } = require('discord.js-collector');

module.exports = {
	help: {
		name:"leaderboard",
    description: "Get the leaderboard!",
    aliases: ["lb"],
		category: "Utility"
	},

run: async (client, message, args) => {


let money = await client.db.startsWith(`money_${message.guild.id}`, { sort: '.data'});
let contentm = "";

for (let i = 0; i < money.length; i++) {
    let user = client.users.cache.get(money[i].ID.split('_')[2]) || "Unregistered user";
      contentm += `${i+1}. ${user} ~ ${money[i].data.pocket}\n`
}

let bank = await client.db.startsWith(`money_${message.guild.id}`, { sort: '.data'});
let contentb = "";

for (let i = 0; i < bank.length; i++) {
    let user = client.users.cache.get(bank[i].ID.split('_')[2]) || "Unregistered user";
      contentb += `${i+1}. ${user} ~ ${money[i].data.bank}\n`
}

let nike = await client.db.startsWith(`nikes_${message.guild.id}`, { sort: '.data'});
let contentn = "";

for (let i = 0; i < nike.length; i++) {
    let user = client.users.cache.get(nike[i].ID.split('_')[2]) || "Unregistered user";
      contentn += `${i+1}. ${user} ~ ${nike[i].data}\n`
}

let car = await client.db.startsWith(`car_${message.guild.id}`, { sort: '.data'});
let contentc = "";

for (let i = 0; i < car.length; i++) {
    let user = client.users.cache.get(car[i].ID.split('_')[2]) || "Unregistered user";
      contentm += `${i+1}. ${user} ~ ${car[i].data}\n`
}

let house = await client.db.startsWith(`house_${message.guild.id}`, { sort: '.data'});
let contentma = "";

for (let i = 0; i < house.length; i++) {
    let user = client.users.cache.get(house[i].ID.split('_')[2]) || "Unregistered user";
      contentma += `${i+1}. ${user} ~ ${house[i].data}\n`
}


const pages = {
      "741742588998058074": {
          id: 'money',
          clearReactions: true,
          content: '',
          embed: {
            description: `**${message.guild.name}'s Coin Leaderboard**\n\n${contentm}`
          },
          onMessage: (controller, message) => {
            controller.stop();
          }
        },

      '🏧': {
        id: 'bank',
        clearReactions: true,
        content: '',
        embed: {
          description: `**${message.guild.name}'s Bank Leaderboard**\n\n${contentb}`
        },
        onMessage: (controller, message) => {
          controller.stop();
        }
      },

      '👟': {
        id: 'nike',
        clearReactions: true,
        content: '',
        embed: {
          description: `**${message.guild.name}'s Nike Leaderboard**\n\n${contentn}`
        },
        onMessage: (controller, message) => {
          controller.stop();
        }
      },

      '🚙': {
        id: 'car',
        clearReactions: true,
        content: '',
        embed: {
          description: `**${message.guild.name}'s Car Leaderboard**\n\n${contentc}`
        },
        onMessage: (controller, message) => {
          controller.stop();
        }
      },

      '🏠': {
        id: 'mansion',
        clearReactions: true,
        content: '',
        embed: {
          description: `**${message.guild.name}'s Mansion Leaderboard**\n\n${contentma}`
        },
        onMessage: (controller, message) => {
          controller.stop();
        }
      }

};

  const botMessage = await message.reply(
    `React with ${client.emojis.money} to see the coins leaderboard. 
    React with 👟 to see nikes leaderboard. 
    React with 🚙 to see car leaderboard. 
    React with 🏠 mansion to see mansion leaderboard`
    );

  ReactionCollector.menu({ botMessage, user: message.author, pages });

  //   const embed = new Discord.MessageEmbed()
  //   .setDescription(`**Input a Leaderboard Option**\n\n
  //   Coin Leaderboard: ,leaderboard coins\n
  //   Bank Leaderboard: 
  //   Fresh Nikes Leaderboard: ,leaderboard nikes\n
  //   Car Leaderboard: ,leaderboard car\n
  //   Mansion Leaderboard: ,leaderboard mansion
  //   `)
  //   .setColor("#FFFFFF")

  // if(!args[0]) return message.channel.send(embed);

  // switch(args[0]) {

  //   case "coins":
  //   case "money":
  //   let money = await client.db.startsWith(`money_${message.guild.id}`, { sort: '.data'});
  //   let content = "";

  //   for (let i = 0; i < money.length; i++) {
  //       let user = client.users.cache.get(money[i].ID.split('_')[2]) || "Unregistered user";

  //       content += `${i+1}. ${user} ~ ${money[i].data}\n`
    
  //     }

  //   const embed = new Discord.MessageEmbed()
  //   .setDescription(`**${message.guild.name}'s Coin Leaderboard**\n\n${content}`)
  //   .setColor("#FFFFFF")

  //   message.channel.send(embed);

  //   case "bank":
  //     let bank = await client.db.startsWith(`bank_${message.guild.id}`, { sort: '.data'});
  //     let content = "";
  
  //     for (let i = 0; i < bank.length; i++) {
  //         let user = client.users.cache.get(bank[i].ID.split('_')[2]) || "Unregistered user";

  //         content += `${i+1}. ${user} ~ ${bank[i].data}\n`

  //       }
  
  //     const embed = new Discord.MessageEmbed()
  //     .setDescription(`**${message.guild.name}'s Coin Leaderboard**\n\n${content}`)
  //     .setColor("#FFFFFF");
  
  //     message.channel.send(embed);

  // case "nikes":
  //   let nike = await client.db.startsWith(`nikes_${message.guild.id}`, { sort: '.data'})
  //   let content = "";

  //   for (let i = 0; i < nike.length; i++) {
  //       let user = client.users.cache.get(nike[i].ID.split('_')[2]) || "Unregistered user";

  //       content += `${i+1}. ${user} ~ ${nike[i].data}\n`
  //   }

  //   const embed = new Discord.MessageEmbed()
  //   .setDescription(`**${message.guild.name}'s Fresh Nikes Leaderboard**\n\n${content}`)
  //   .setColor("#FFFFFF")

  //   message.channel.send(embed);

  // case "car":
  //   let cars = await client.db.startsWith(`car_${message.guild.id}`, { sort: '.data'})
  //   let content = "";

  //   for (let i = 0; i < cars.length; i++) {
  //       let user = client.users.cache.get(cars[i].ID.split('_')[2]) || "Unregistered user";

  //       content += `${i+1}. ${user} ~ ${cars[i].data}\n`
  //   }

  //   const embed = new Discord.MessageEmbed()
  //   .setDescription(`**${message.guild.name}'s Car Leaderboard**\n\n${content}`)
  //   .setColor("#FFFFFF")

  //   message.channel.send(embed);

  // case "mansion":
  //   let mansions = await client.db.startsWith(`house_${message.guild.id}`, { sort: '.data'})
  //   let content = "";

  //   for (let i = 0; i < mansions.length; i++) {
  //       let user = client.users.cache.get(mansions[i].ID.split('_')[2]) || "Unregistered user";

  //       content += `${i+1}. ${user} ~ ${mansions[i].data}\n`
  //   }

  //   const embed = new Discord.MessageEmbed()
  //   .setDescription(`**${message.guild.name}'s Mansion Leaderboard**\n\n${content}`)
  //   .setColor("#FFFFFF")

  //   message.channel.send(embed);

  //   }
  }
}