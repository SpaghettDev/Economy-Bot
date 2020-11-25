require("moment-duration-format");

const { Client } = require("discord.js");

class economybot extends Client {
  /**
   * @constructor
   * @param {options} options options
   */
   constructor (options) {
        super(options);
	this.commands = new Discord.Collection();
	this.aliases  = new Discord.Collection();
	this.cooldown = new Discord.Collection();
	this.events   = new Discord.Collection();
}


  /**
   *diagramMaker
   *@param {Number} number number
   */
   bar(used, free) {
    const full  = '▰';
    const empty = '▱';
    const total = used + free;
    used = Math.round((used / total) * 10);
    free = Math.round((free / total) * 10);
    return full.repeat(used) + empty.repeat(free);
    };

}

module.exports = economybot;