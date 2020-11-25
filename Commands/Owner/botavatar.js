const discord = require("discord.js");
const config = require("../../Configuration/config.json");

module.exports = { 
	help: {
		name:"botavatar",
		description: "Set's the client's avatar",
		aliases: ["ba", "clientavatar", "ca"],
		ownerOnly: true,
		category: "Owner"
	},
 
run: async(client, message, args) => {

    const clientavatar = args[0];

    var request = require("request").defaults({ "encoding" : null });

    request(clientavatar, function (err, res, body) {

    if (!err && res.statusCode === 200) {
        
        var data = "data:" + res.headers["content-type"] + ";base64," + new Buffer(body).toString("base64");
        
        client.user.setAvatar(clientavatar)
        
        .catch((error) => {
        
        message.channel.send('BSomething went wrong. Check the console to see the error.'); 
        
        console.log('Error on botavatar command:', error); });

        message.channel.send('Done.');
    }})
  }
}