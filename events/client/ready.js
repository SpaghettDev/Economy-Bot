const Discord = require("discord.js"),
      config = require(`${process.cwd()}/Configuration/config.json`);

module.exports = async(client, args) => {

    console.log(`[INFO] Started the best Discord bot! Running...`);
    console.log(
      `[INFO] Connected to Discord as: ${client.user.tag} with the id: ${client.user.id}! 
      Prefix: ${config.prefix}, 
      branch: ${config.branch}, 
      version: ${config.version}
      `);

    const mabe = [
      `${config.prefix}help | ${client.user.username} Version: ${config.version}`,
      `your commands! | ${client.user.username} Version: ${config.version}`
    ];

    setInterval(function() {
    let awnser = mabe[Math.floor(Math.random() * mabe.length)];  
    
    client.user.setActivity(awnser, { type: "LISTENING" });
    
   }, 8000);

} //jeff was here