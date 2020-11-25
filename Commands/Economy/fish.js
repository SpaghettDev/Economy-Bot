const Discord = require("discord.js");
const ms = require("parse-ms");

module.exports = {
	help: {
		name: "fish",
		description: "Fish some fish.",
		category: "Economy"
	},

run: async(client, message, args) => {

  const rand = (min, max) => {
    return Math.floor(Math.random() * (max - min) ) + min;
  };

  let user = message.author;
  let timeout = 60000;
  let fish = 
    ["Yellow Fish :tropical_fish:", 
    "Fat Fish :blowfish:", 
    "Blue Fish :fish:",
    "Coconut :coconut:",
    "Dolphin :dolphin:",
    "Lobster :lobster:",
    "Shark :shark:",
    "Crab :crab:",
    "Squid :squid:",
    "Whale :whale2:",
    "Shrimp :shrimp:",
    "Octopus :octopus:",
    //"Duck :duck:",
    "Diamond :gem:"];

  let randn = rand(0, parseInt(fish.length));
  let randrod = rand(15, 30);

  let fishToWin = fish[randn];


  let fishdb = await client.db.fetch(`fish_${message.guild.id}_${user.id}`);
  let rod = await client.db.get(`fish_${message.guild.id}_${user.id}.rod`);
  let rodusage = await client.db.get(`fish_${message.guild.id}_${user.id}.rodusage`);
  let wait = await client.db.fetch(`fish_${message.guild.id}_${user.id}.wait`);


  if(!rod) return message.channel.send(`You have to buy a fishing rod!`);

 if(rodusage) {
   if(fishdb.rodusage >= randrod) {
     await client.db.delete(`fish_${message.guild.id}_${user.id}.rod`);
     return message.reply("Your fishing rod has broken! Go buy a new one!")
   }
 }

  

  if (wait !== null && timeout - (Date.now() - wait) > 0) {
    let time = ms(timeout - (Date.now() - wait));

    message.channel.send(`<a:false:737764891657633814> You have already fished!\nFish it again in ${time.seconds}s`);

  } else {

  message.channel.send(`<a:yes:739569362440159252> You've fished and gotten a ${fishToWin}`);

  await client.db.push(`fish_${message.guild.id}_${user.id}.fish`, fishToWin);
  await client.db.set(`fish_${message.guild.id}_${user.id}.wait`, Date.now());
  await client.db.add(`fish_${message.guild.id}_${user.id}.rodusage`, 1);

    }
	}
};


