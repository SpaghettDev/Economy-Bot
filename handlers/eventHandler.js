const { readdirSync } = require("fs"),
      chalk = require("chalk");

module.exports = async(client) => {

  const events = readdirSync(`${process.cwd()}/events/client`);
  console.log(chalk.green(`\n[Event-loading-logs] Loading ${events.length} Client Events!`));

  for (let event of events) {
    let file = require(`${process.cwd()}/events/client/${event}`);

    console.log(chalk.white('[Event-loading-logs] Successfully Loaded Client Event : ')+chalk.red(`${event}`));

    client.on(event.split(".")[0], (...args) => file(client, ...args));
  };

};