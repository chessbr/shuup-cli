#!/usr/bin/env node
const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");
const Inquirer = require("./lib/inquirer");
const Receipts = require("./lib/receipts");
const argv = require("minimist")(process.argv.slice(1));
const projectDir = argv._[1] || process.cwd();

clear();
console.log(chalk.blueBright(figlet.textSync("Shuup", { horizontalLayout: "full" })));
Inquirer.askProjectInfo(projectDir).then((projectInfo) => {
    Receipts.createProject({
        name: projectInfo.name,
        type: projectInfo.type,
        version: projectInfo.version,
        outputDir: projectDir
    });
    console.log(chalk.greenBright("Done!"));
});
