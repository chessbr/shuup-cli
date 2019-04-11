const path = require("path");
const inquirer = require("inquirer");

module.exports = {
    askProjectInfo: (projectDir) => {
        const questions = [
            {
                name: "name",
                type: "input",
                message: "Enter the project name:",
                default: path.basename(projectDir)
            },
            {
                name: "version",
                type: "input",
                message: "Enter the project version:",
                default: "1.0.0"
            },
            {
                name: "type",
                type: "list",
                message: "Select the project type you want to create:",
                choices: [
                    { value: "generic", name: "Generic Addon" },
                    { value: "xtheme-theme", name: "Xtheme Theme" },
                ]
            }
        ];
        return inquirer.prompt(questions);
    },
}
