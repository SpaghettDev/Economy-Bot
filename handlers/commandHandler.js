const chalk = require("chalk"),
      fs   = require("fs");

module.exports = async(client) => {


fs.readdirSync(`${process.cwd()}/Commands/`).forEach(dir => {

fs.readdir(`${process.cwd()}/Commands/${dir}/`, (err, files) => {

    if (err) throw new Error(err);

    console.log(chalk.green(`\n\n[Directory-loading-logs] Loading ${files.length} commands of module ${dir} :\n\n`));

files.forEach(file => {

const props = require(`${process.cwd()}/Commands/${dir}/${file}`);

    client.commands.set(props.help.name, props);

    console.log(chalk.white('[Command-loading-logs] Loaded command : ')+chalk.red(`${file}`));

        });
    });
});

}
