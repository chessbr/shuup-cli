const path = require("path");
const fs = require("fs");
const shell = require("shelljs");
const nunjucks = require("nunjucks");

const { Receipts } = require("../data/receipts");

nunjucks.configure(path.resolve(__dirname, "../templates/"), { autoescape: true });


module.exports = {
    createProject: ({ name, type, outputDir, ...args }) => {
        const context = {
            projectName: name,
            projectType: type,
            moduleName: name.toLowerCase().replace(/\s/g, "_").replace(/\-/g, "_"),
            ...args
        };
        if (!fs.existsSync(outputDir)) {
            shell.mkdir("-p", outputDir);
        }
        Receipts[type].forEach((receipt) => {
            const fileName = nunjucks.renderString(receipt.file, context);
            const fileContent = nunjucks.render(receipt.template, context);
            const filePath = path.resolve(outputDir, fileName);
            const fileDir = path.dirname(filePath);
            if (!fs.existsSync(fileDir)) {
                shell.mkdir("-p", fileDir);
            }
            fs.writeFile(filePath, fileContent, function(err) {
                if(err) {
                    return console.error("Failed to create file: " + filePath);
                }
            });
        });
    }
};
