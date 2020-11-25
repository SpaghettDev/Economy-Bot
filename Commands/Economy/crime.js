const Discord = require("discord.js"),
ms_2 = require('parse-ms');

module.exports = {
	help: {
		name: "crime",
		description: "Commit a crime, but is it worth it?",
		category: "Economy"
	},

run: async(client, message, args) => {
   
  let user = message.author;

  let timeout = 60000;
  
    let author = await client.db.fetch(`money_${message.guild.id}_${user.id}.pocket`);
    let multiplier = await client.db.fetch(`multiplier_${message.guild.id}`);
    if(!multiplier) multiplier = 1;
    let randoma = Math.floor(Math.random() * 200) + 1;
    let random = randoma * multiplier;
        
    if (author < 250) {
          return message.channel.send('<a:false:737764891657633814> You need at least 250$ to commit a crime')
      }

      let crime = await client.db.fetch(`crime_${message.author.id}`)

      if (crime !== null && timeout - (Date.now() - crime) > 0) {
        
        let time = ms_2(timeout - (Date.now() - crime));
        
        message.channel.send(`You already commited a crime! Try again in ${time.seconds} seconds!`)

      } else {
       
        const result = [
          "WINWIN",
          "LOOSELOOSE"
        ] 

     let awnser = result[Math.floor(Math.random() * result.length)];
        
     if (awnser === "LOOSELOOSE") {
          
      message.channel.send("You were caught and had to pay `$250` to stay out of jail");
         
      await client.db.subtract(`money_${message.guild.id}_${user.id}.pocket`, 250);
         
      await client.db.set(`crime_${message.author.id}`, Date.now());
        } else {

    let embed = new Discord.MessageEmbed()
      .setAuthor(message.author.tag, message.author.avatarURL())
      .setTitle("You Have Just Commited A Crime!")
      .addField("Amount Robbed:", random)
      .setColor("RANDOM")
      .setTimestamp();
      message.channel.send(embed)
    await client.db.add(`crimecommited_${user.id}`, 1);
    await client.db.add(`money_${message.guild.id}_${user.id}.pocket`, random);
    await client.db.set(`crime_${message.author.id}`, Date.now());

      }
    } 
  }
}