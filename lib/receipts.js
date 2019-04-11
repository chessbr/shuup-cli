const path = require("path");
const fs = require("fs");
const shell = require("shelljs");
const nunjucks = require("nunjucks");

nunjucks.configure(path.resolve(__dirname, "../templates/"), { autoescape: true });

const CommonReceipts = [
    {
        file: "setup.cfg",
        template: "generic/setup.cfg"
    },
    {
        file: "setup.py",
        template: "generic/setup.py"
    },
    {
        file: "README.md",
        template: "generic/README.md"
    },
    {
        file: "MANIFEST.in",
        template: "generic/MANIFEST.in"
    },
    {
        file: "{{ moduleName }}/apps.py",
        template: "generic/app/apps.py"
    },
    {
        file: "{{ moduleName }}/__init__.py",
        template: "generic/app/__init__.py"
    },
];

const Receipts = {
    "generic": [
        ...CommonReceipts
    ],
    "xtheme-theme": [
        ...CommonReceipts,
        {
            file: "{{ moduleName }}/apps.py",
            template: "xtheme-theme/app/apps.py"
        },
        {
            file: "{{ moduleName }}/templates/shuup/front/base.jinja",
            template: "xtheme-theme/templates/base.jinja"
        },
        {
            file: "{{ moduleName }}/templates/shuup/front/index.jinja",
            template: "xtheme-theme/templates/index.jinja"
        }
    ]
};

module.exports = {
    createProject: ({ name, type, outputDir, ...args }) => {
        const context = {
            projectName: name,
            projectType: type,
            moduleName: name.toLowerCase().replace("-", "_"),
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
